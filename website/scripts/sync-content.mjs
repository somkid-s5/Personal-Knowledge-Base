import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { courses, mainFiles, extraFiles, slug, lessonId } from '../learning-plan.mjs';
import { isInternalDoc } from '../content-policy.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const web = path.join(root, 'website');
const docs = path.join(web, 'src/content/docs');
const assets = path.join(web, 'public/kb-assets');
const base = '/Personal-Knowledge-Base';
const markdown = [];
const assetPaths = new Set();
const assetExt = /\.(svg|png|jpe?g|gif|webp)$/i;
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

function pageSlug(rel) { return slug(rel); }
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
  if (all.has(target)) return isInternalDoc(target) ? 'https://github.com/somkid-s5/Personal-Knowledge-Base/blob/main/' + target + suffix : publicUrl(slugFor(target)) + suffix;
  if (all.has(target + '/readme.md')) return publicUrl(slugFor(target + '/readme.md')) + suffix;
  if (all.has(target + '/index.md')) return publicUrl(slugFor(target + '/index.md')) + suffix;
  if (relative === 'readme.md') return base + '/' + suffix;
  if (relative.startsWith('docs/') || relative.startsWith('skills/') || relative.startsWith('templates/')) return 'https://github.com/somkid-s5/Personal-Knowledge-Base/blob/main/' + relative + suffix;
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
  if (isInternalDoc(rel) || courses.some(c => normalize(c.dir) + '/readme.md' === rel)) continue;
  let body = readFileSync(absolute, 'utf8').replace(/^\uFEFF/, '');
  body = body.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const title = getTitle(body, path.basename(rel, '.md').replaceAll('-', ' '));
  body = body.replace(/^#\s+.+\r?\n/, '');
  body = rewrite(body, rel);
  const hidden = !courses.some(c => [...mainFiles(c), ...extraFiles(c)].map(normalize).includes(rel));
  const destName = rel.replace(/readme\.md$/i, 'index.md').replace(/(\d)\.(\d)(?=[^/]*\.md$)/g, '$1-$2');
  const dest = path.join(docs, destName);
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, frontmatter(title, rel, hidden) + body, 'utf8');
}

// Fail at build time if any manually curated step was renamed or deleted.
const inputIndex = new Map(markdown.map(file => [file.rel, file]));
const learningPaths = {};
const labels = new Map();
function infoFor(filePath) {
  const key = normalize(filePath);
  const entry = inputIndex.get(key);
  if (isInternalDoc(key)) throw new Error('Internal-only file cannot be part of a learning path: ' + filePath);
  if (!entry) throw new Error('Learning plan points to a missing Markdown file: ' + filePath);
  if (!labels.has(key)) {
    labels.set(key, getTitle(readFileSync(entry.absolute, 'utf8'), path.basename(filePath, '.md').replaceAll('-', ' ')));
  }
  return {
    id: lessonId(filePath) ?? slug(filePath),
    legacyId: slug(filePath),
    url: publicUrl(slugFor(key)),
    title: labels.get(key),
  };
}
for (const c of courses) {
  const prefix = normalize(c.dir) + '/';
  const main = mainFiles(c);
  const supplement = extraFiles(c);
  const unique = new Set();
  for (const filePath of [...main, ...supplement]) {
    const key = normalize(filePath);
    if (unique.has(key)) throw new Error('Duplicate file inside course plan: ' + filePath);
    unique.add(key);
    infoFor(filePath);
  }
  const entryList = c.stages.flatMap((stage, stageIndex) => stage.files.map(f => ({
    ...infoFor(f),
    stage: stageIndex,
  })));
  learningPaths[normalize(c.dir)] = entryList;
  const overview = [
    '---',
    'title: ' + JSON.stringify(c.icon + ' ' + c.name),
    'sidebar:',
    '  order: 0',
    '---',
    '',
    '> 📚 **โน้ตสำหรับเรียนด้วยตัวเอง** — ' + c.summary,
    '',
    '## 🎯 เรียนอะไรและเริ่มตรงไหน?',
    '',
    c.description,
    '',
    '<div class="course-resume course-start" data-learning-course="' + normalize(c.dir) +
      '"><span>📍 ยังไม่ได้เริ่ม</span> <a data-course-next href="' + entryList[0].url +
      '">เริ่มบทแรก →</a></div>',
    '',
    '## 🗺️ เส้นทางหลัก (เรียนตามลำดับนี้)',
    '',
    'ทำแต่ละขั้นตามลำดับด้านล่าง ระบบจะบันทึกเฉพาะบทในเส้นทางหลักเป็นความคืบหน้าของวิชานี้',
    '',
  ];
  for (const [stageIndex, stage] of c.stages.entries()) {
    overview.push('### ' + (stageIndex + 1) + '. ' + stage.title, '', stage.description, '',
      '<div class="stage-progress" data-learning-course="' + normalize(c.dir) +
      '" data-stage-index="' + stageIndex + '">📖 ' + stage.files.length + ' บท</div>', '');
    for (const [stepIndex, filePath] of stage.files.entries()) {
      const note = infoFor(filePath);
      overview.push((stepIndex + 1) + '. [' + note.title + '](' + note.url + ')');
    }
    overview.push('');
  }
  overview.push('## 🧰 เอกสารเสริมและ Lab (เลือกทำได้)', '',
    'หัวข้อในส่วนนี้ช่วยเจาะลึกหรือฝึกเพิ่ม **ไม่บังคับให้ทำครบก่อนเรียนต่อ** และไม่รวมในเปอร์เซ็นต์เส้นทางหลัก', '');
  for (const group of c.supplements) {
    overview.push('### ' + group.title, '', group.description, '');
    for (const filePath of group.files) {
      const note = infoFor(filePath);
      overview.push('- [' + note.title + '](' + note.url + ')');
    }
    overview.push('');
  }
  for (const link of c.external || []) {
    overview.push('- [🔗 ' + link.title + '](' + link.url + ') — ' + link.description);
  }
  overview.push('', '---', '',
    '📌 **สถานะการเรียน:** เก็บเฉพาะบน Browser นี้ ไม่ Sync ข้ามอุปกรณ์ และไม่ใช่การรับรองว่าทำ Lab ผ่านจริง');
  const target = path.join(docs, prefix, 'index.md');
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, overview.join('\n'), 'utf8');
}

const courseCards = courses.map((c) => {
  const href = publicUrl(normalize(c.dir));
  return '<article class="course-card" data-learning-course="' + normalize(c.dir) + '"><span class="emoji">' + c.icon +
    '</span><a href="' + href + '"><strong>' + escapeHtml(c.name) + '</strong></a><small>' + escapeHtml(c.description) + '</small>' +
    '<div class="course-resume"><span>📍 ยังไม่ได้เริ่ม</span> <a data-course-next href="' + href + '">เริ่มบทแรก →</a></div></article>';
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
console.log('Learning website prepared:', markdown.length, 'Markdown files; curated primary lessons:', Object.fromEntries(courses.map(c => [c.name, mainFiles(c).length])));
