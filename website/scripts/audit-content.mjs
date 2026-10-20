import {readdirSync,readFileSync,mkdirSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
 import {fileURLToPath} from 'node:url';
import {courses,mainFiles,extraFiles} from '../learning-plan.mjs';
import {isInternalDoc} from '../content-policy.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const norm=s=>s.replaceAll('\\','/').toLowerCase();
const main=new Set(courses.flatMap(c=>mainFiles(c).map(norm)));
const extra=new Set(courses.flatMap(c=>extraFiles(c).map(norm)));
const docs=[];
function walk(dir){
 for(const e of readdirSync(dir,{withFileTypes:true})){
  const abs=path.join(dir,e.name);
  if(e.isDirectory())walk(abs);
  else if(e.isFile()&&e.name.toLowerCase().endsWith('.md')){
   const rel=norm(path.relative(root,abs));
   const role=isInternalDoc(rel)?'Internal / Draft':main.has(rel)?'Main Lesson':extra.has(rel)?'Supplement':'Other Reference';
   docs.push({path:rel,absolute:abs,role,body:readFileSync(abs,'utf8')});
  }
 }
}
for(const c of courses)walk(path.join(root,c.dir));
const issues=[];
const pathIndex=new Map(docs.map(d=>[d.path,d.absolute]));
for(const rel of [...main,...extra]){
 if(!pathIndex.has(rel))issues.push('Missing curriculum document: '+rel);
 if(isInternalDoc(rel))issues.push('Internal document appears in learning path: '+rel);
}
const hashes=new Map(),paragraphs=new Map();
const clean=s=>s.replace(/^\s*>.*$/gm,'').replace(/(?:`){3}[\s\S]*?(?:`){3}/g,'').replace(/!\[[^\]]*\]\([^)]+\)/g,'').replace(/https?:\/\/\S+/g,'').replace(/[\s\p{P}\p{S}]+/gu,'').toLowerCase();
const corpus=[];
for(const d of docs){
 const hash=createHash('sha256').update(d.body).digest('hex');
 if(hashes.has(hash))issues.push('Exact duplicate: '+hashes.get(hash)+' / '+d.path);
 else hashes.set(hash,d.path);
 if(d.role==='Internal / Draft')continue;
 for(const paragraph of d.body.split(/\n\s*\n/)){
  const p=clean(paragraph);
  if(p.length<200)continue;
  if(!paragraphs.has(p))paragraphs.set(p,new Set());
  paragraphs.get(p).add(d.path);
 }
 const txt=clean(d.body);const grams=new Set();
 for(let i=0;i+72<txt.length;i+=16)grams.add(txt.slice(i,i+72));
 corpus.push({file:d.path,course:d.path.split('/')[0],grams});
}
const duplicates=[...paragraphs].filter(([,files])=>files.size>1).map(([p,files])=>({length:p.length,files:[...files]})).sort((a,b)=>b.length-a.length);
const repetitionByCourse = new Map();
for (const d of docs) repetitionByCourse.set(d.path.split('/')[0], 0);
for (const item of duplicates) {
  const coursesInMatch = new Set(item.files.map(file => file.split('/')[0]));
  for (const name of coursesInMatch) {
    repetitionByCourse.set(name, (repetitionByCourse.get(name) ?? 0) + 1);
  }
}
const pairs=[];
for(let i=0;i<corpus.length;i++)for(let j=i+1;j<corpus.length;j++){
 const a=corpus[i],b=corpus[j];if(a.course!==b.course)continue;
 const s=a.grams.size<b.grams.size?a.grams:b.grams;const l=a.grams.size<b.grams.size?b.grams:a.grams;
 if(s.size<10)continue;
 let hits=0;for(const part of s)if(l.has(part))hits++;
 if(hits>=5&&hits/s.size>=0.10)pairs.push({files:[a.file,b.file],score:Math.round(1000*hits/s.size)/10});
}
pairs.sort((a,b)=>b.score-a.score);
const headings=[
 '# 📋 Content Audit V2 — Learning Inventory','',
 'This is a heuristic report. Matching topics are not automatically duplicated lessons.','',
 '## Inventory','',
 '| Course | Main | Supplement | Internal / Draft | Other | Total |','|---|---:|---:|---:|---:|---:|',
 ...courses.map(c=>{const x=docs.filter(d=>d.path.startsWith(norm(c.dir)+'/'));const n=role=>x.filter(d=>d.role===role).length;
  return '| '+c.name+' | '+n('Main Lesson')+' | '+n('Supplement')+' | '+n('Internal / Draft')+' | '+n('Other Reference')+' | '+x.length+' |';}),
 '','## Structural problems','',...(issues.length?issues.map(x=>'- '+x):['- No exact duplicate Markdown files or missing curriculum paths detected.']),
 '','## Repeated long paragraphs by course','',
 '| Course | Repeated paragraph groups |','|---|---:|',
 ...courses.map(c=>'| '+c.name+' | '+(repetitionByCourse.get(norm(c.dir)) ?? 0)+' |'),
 '','## Exact long-paragraph matches (top 25)','',...(duplicates.length?duplicates.slice(0,25).map(x=>'- '+x.length+' characters: '+x.files.join(' ↔ ')):['- None found with current normalization.']),
 '','## Candidate overlapping documents (top 30)','',
 '| Overlap of smaller sample | Document A | Document B |','|---:|---|---|',
 ...(pairs.length?pairs.slice(0,30).map(x=>'| '+x.score+'% | '+x.files.join(' | ')+' |'):['| — | No candidates above threshold | — |']),
 '','## Rules for remediation','',
 '- Lesson vs Lab vs Cheat Sheet is intentional repetition of a skill, not automatically redundant content.',
 '- Compare unique examples, commands, edge cases and outcomes before moving or removing any text.',
 '- Keep source and QA evidence in GitHub, but outside the website search and course progress.',
 '- All content changes need an explicit QA and link-validation pass.',''
];
const output=path.join(root,'website/reports/content-audit-v2.md');mkdirSync(path.dirname(output),{recursive:true});
writeFileSync(output,headings.join('\n'));
console.log(JSON.stringify({total:docs.length,primary:main.size,supplements:extra.size,internal:docs.filter(d=>d.role==='Internal / Draft').length,longParagraphMatches:duplicates.length,overlapCandidates:pairs.length,errors:issues.length}));
console.log('Long-paragraph matches by course: '+JSON.stringify(Object.fromEntries(repetitionByCourse)));
for(const p of pairs.slice(0,5))console.log('Review candidate '+p.score+'%: '+p.files.join(' <> '));
if(issues.length){console.error(issues.join('\n'));process.exitCode=1;}
