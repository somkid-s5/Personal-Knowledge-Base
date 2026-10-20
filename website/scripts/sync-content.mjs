import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, copyFileSync, statSync } from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const web = path.join(root, 'website');
const docs = path.join(web, 'src/content/docs');
const assets = path.join(web, 'public/kb-assets');
const base = '/Personal-Knowledge-Base';
const courses = [
  { dir: 'AWS-SAA-C03', name: 'AWS SAA-C03', icon: '☁️', desc: 'Architecture, HA, Security และ Hands-on Projects' },
  { dir: 'Azure-AZ-104', name: 'Azure AZ-104', icon: '🔷', desc: 'Azure Administration และ Cloud Operations' },
  { dir: 'GCP-ACE', name: 'GCP ACE', icon: '🌤️', desc: 'Google Cloud และ Infrastructure Labs' },
  { dir: 'ISC2-CC', name: 'ISC2 CC', icon: '🛡️', desc: 'พื้นฐาน Cybersecurity และสถานการณ์สอบ' },
  { dir: 'Oracle-Database', name: 'Oracle Database', icon: '🗄️', desc: 'DBA, Listener, CDB/PDB และ Troubleshooting' },
];
const markdown = [];
const assetPaths = new Set();
const assetExt = /\.(svg|png|jpe?g|gif|webp)$/i;
const metadata = /(^|\/)(?:SOURCE[-_].*|.*[-_]QA(?:[-_].*)?|.*AUDIT.*|.*PROVENANCE.*|.*COVERAGE.*|.*GAP[-_](?:MAP|AUDIT).*|.*CURRENTNESS.*|.*TRACKER.*)\.md$/i;
const normalize = (file) => file.replaceAll('\\', '/').toLowerCase();
const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

function walk(directory) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.isFile()) {
      const rel = normalize(path.relative(root, absolute));
      if (entry.name.toLowerCase().endsWith('.md')) markdown.push({ absolute, rel });
      else if (assetExt.test(entry.name)) {
        assetPaths.add(rel);
        const target = path.join(assets, rel);
        mkdirSync(path.dirname(target), { recursive: true });
        copyFileSync(absolute, target);
      }
    }
  }
}

rmSync(docs, { recursive: true, force: true });
rmSync(assets, { recursive: true, force: true });
mkdirSync(docs, { recursive: true });
mkdirSync(assets, { recursive: true });
for (const c of courses) walk(path.join(root, c.dir));

function pageSlug(rel) {
  let value = normalize(rel).replace(/\.md$/i, '');
  if (value.endsWith('/readme') || value.endsWith('/index')) value = value.slice(0, value.lastIndexOf('/'));
  return value;
}
const all = new Set(markdown.map((f) => f.rel));
const slugFor = (file) => pageSlug(file).split('/').map(encodeURIComponent).join('/');
const publicUrl = (slug) => base + '/' + slug + (slug ? '/' : '');

function linkTo(current, url) {
  if (!url || /^(#|\/|[a-z][a-z0-9+.-]*:)/i.test(url)) return url;
  const match = url.match(/^([^?#]*)([?#].*)?$/);
  if (!match) return url;
  const pathname = match[1];
  const suffix = match[2] || '';
  const cleanPath = pathname.replace(/^<|>$/g, '');
  let rel;
  try { rel = decodeURIComponent(cleanPath); } catch { rel = cleanPath; }
  const resolved = path.resolve(path.dirname(path.join(root, current)), rel);
  const relative = normalize(path.relative(root, resolved));
  if (relative.startsWith('../') || relative === '..') return url;
  if (assetExt.test(relative) && assetPaths.has(relative)) {
    return base + '/kb-assets/' + relative.split('/').map(encodeURIComponent).join('/') + suffix;
  }
  let target = relative;
  if (target.endsWith('/')) target += 'readme.md';
  if (all.has(target)) return publicUrl(slugFor(target)) + suffix;
  if (all.has(target + '/readme.md')) return publicUrl(slugFor(target + '/readme.md')) + suffix;
  if (all.has(target + '/index.md')) return publicUrl(slugFor(target + '/index.md')) + suffix;
  return url;
}
function rewrite(body, current) {
  // Keep existing external references intact; only resolve local links for the website.
  return body.replace(/(!?\[[^\]]*\])\((<?[^)\s]+>?)([^)]*)\)/g, (_all, label, url, trail) =>
    label + '(' + linkTo(current, url) + trail + ')');
}
function getTitle(input, fallback) {
  return (input.match(/^#\s+(.+)\s*$/m)?.[1] || fallback)
    .replace(/[*_]/g, '').trim().slice(0, 180);
}
function orderFor(rel) {
  const part = path.basename(rel);
  const match = part.match(/(?:^|[-_])(module|lesson|lab|chapter|project|activity|path-activity)[-_]?0*(\d+)/i) ||
    part.match(/^0*(\d+)[-_]/);
  return match ? Number(match[2] || match[1]) : 300;
}
function frontmatter(title, rel, hidden) {
  const order = rel.endsWith('/readme.md') ? 0 : orderFor(rel);
  return '---\ntitle: ' + JSON.stringify(title) + '\nsidebar:\n  order: ' + order +
    (hidden ? '\n  hidden: true' : '') + '\n---\n\n';
}

for (const { absolute, rel } of markdown) {
  if (courses.some(c => normalize(c.dir) + '/readme.md' === rel)) continue;
  let body = readFileSync(absolute, 'utf8').replace(/^\uFEFF/, '');
  body = body.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const title = getTitle(body, path.basename(rel, '.md').replaceAll('-', ' '));
  body = body.replace(/^#\s+.+\r?\n/, '');
  body = rewrite(body, rel);
  const hidden = metadata.test(rel);
  const dest = path.join(docs, rel.replace(/readme\.md$/i, 'index.md'));
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, frontmatter(title, rel, hidden) + body, 'utf8');
}

const learningPaths = {};
function studyRank(file) {
  const name = path.basename(file.rel);
  if (/^(module|lesson)[-_]/i.test(name)) return 0;
  if (/^path-activity[-_]/i.test(name)) return 1;
  if (/lab/i.test(name)) return 2;
  if (/project/i.test(name)) return 3;
  return 4;
}
for (const c of courses) {
  const prefix = normalize(c.dir) + '/';
  const notes = markdown.filter(f => f.rel.startsWith(prefix) && f.rel !== prefix + 'readme.md' && !metadata.test(f.rel));
  const main = notes.filter(f => /(?:module|lesson|lab|project|path-activity|^0*\d+[-_])/i.test(path.basename(f.rel)))
    .sort((a,b) => studyRank(a) - studyRank(b) || a.rel.localeCompare(b.rel, 'en', { numeric: true }));
  const picked = (main.length ? main : notes).slice(0, 70);
  learningPaths[normalize(c.dir)] = picked.map(f => ({
    id: pageSlug(f.rel),
    url: publicUrl(slugFor(f.rel)),
    title: getTitle(readFileSync(f.absolute, 'utf8'), path.basename(f.rel, '.md').replaceAll('-', ' ')),
  }));
  const lines = [
    c.icon + ' ' + c.name + ' — Personal Study Notes',
    '',
    '> 📘 สมุดโน้ตสำหรับอ่านและฝึกทำด้วยตัวเอง',
    '',
    '## 🗺️ เริ่มเรียนตามลำดับ',
    '',
    'อ่านแนวคิด → ดูภาพจำ → ทดลองทำ Lab → ทบทวน และกด “เรียนจบแล้ว” ที่ท้ายบท',
    '',
    '<div class="course-resume" data-learning-course="' + normalize(c.dir) + '"><span>📍 พร้อมเริ่มเรียน</span> <a data-course-next href="' + publicUrl(normalize(c.dir)) + '">เริ่มบทแรก →</a></div>',
    '',
    ...picked.map((f, index) => (index + 1) + '. [' +
      getTitle(readFileSync(f.absolute, 'utf8'), path.basename(f.rel, '.md').replaceAll('-', ' ')) +
      '](' + publicUrl(slugFor(f.rel)) + ')'),
    '',
    '## 📖 เนื้อหาทั้งหมด',
    '',
    'เลือกหัวข้อเพิ่มเติมจาก Sidebar ด้านซ้าย หรือใช้ช่อง Search ด้านบน',
    '',
    'ความคืบหน้าจะบันทึกไว้ใน Browser นี้เท่านั้น ยังไม่ Sync ข้ามอุปกรณ์',
  ];
  const target = path.join(docs, prefix, 'index.md');
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, frontmatter(c.icon + ' ' + c.name, prefix + 'readme.md', false) + lines.join('\n'), 'utf8');
}

const courseCards = courses.map((c) => {
  const href = publicUrl(normalize(c.dir));
  return '<article class="course-card" data-learning-course="' + normalize(c.dir) + '"><span class="emoji">' + c.icon +
    '</span><a href="' + href + '"><strong>' + escapeHtml(c.name) + '</strong></a><small>' + escapeHtml(c.desc) + '</small>' +
    '<div class="course-resume"><span>📍 พร้อมเริ่มเรียน</span> <a data-course-next href="' + href + '">เริ่มบทแรก →</a></div></article>';
}).join('\n');
const home = [
  '---',
  'title: Smart Learning Hub',
  'template: splash',
  'hero:',
  '  title: 📚 Smart Learning Hub',
  '  tagline: สมุดโน้ตและเส้นทางการเรียนของฉัน — เลือกวิชา อ่านให้เข้าใจ และลงมือทำ',
  '---',
  '',
  '## 👋 วันนี้จะเรียนอะไรดี?',
  '',
  'เลือกวิชาที่สนใจ แล้วเริ่มเรียนตามลำดับในแต่ละวิชาได้เลย',
  '',
  '<div class="course-grid">',
  courseCards,
  '</div>',
  '',
  '### 🧠 วิธีเรียนในเว็บนี้',
  '',
  '1. 📖 เปิดโน้ตและดู Diagram เพื่อเข้าใจภาพรวม',
  '2. 🧪 ลงมือทำ Lab และตรวจผลลัพธ์',
  '3. ✅ กดทำเครื่องหมายเรียนจบ แล้วไปบทถัดไป',
  '4. 🔎 ใช้ Search เมื่ออยากทบทวนหัวข้อที่ลืม',
  '',
  '> ความคืบหน้าถูกเก็บใน Browser นี้เท่านั้น ถ้าเปลี่ยนอุปกรณ์หรือล้างข้อมูลอาจสูญหาย',
  '',
];
writeFileSync(path.join(docs, 'index.md'), home.join('\n'), 'utf8');
writeFileSync(path.join(web, 'public/learning-paths.json'), JSON.stringify(learningPaths), 'utf8');
console.log('Learning website prepared:', markdown.length, 'Markdown files in 5 learning systems');
