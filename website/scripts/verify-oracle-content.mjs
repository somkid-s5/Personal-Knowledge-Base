import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {courses,mainFiles,lessonId} from '../learning-plan.mjs';
const root=path.resolve(process.cwd(),'..');
const c=courses.find(x=>x.dir==='Oracle-Database');
if(!c)throw Error('Oracle course missing');
const lessons=mainFiles(c);
if(lessons.length!==31)throw Error('Expected 31 Oracle steps');
for(let i=0;i<31;i++)if(lessonId(lessons[i])!=='ora-'+String(i+1).padStart(3,'0'))throw Error('Stable ID changed: '+lessons[i]);
const groups=[
 ['03-Networking-Listener/Lesson-07-Oracle-Net-Services-Overview-TH.md','03-Networking-Listener/Lesson-08-Configuring-Naming-Methods-TH.md'],
 ['05-Storage-Tablespaces-Undo/Lesson-15-Database-Storage-Overview-TH.md','05-Storage-Tablespaces-Undo/Lesson-16-Creating-and-Managing-Tablespaces-TH.md','05-Storage-Tablespaces-Undo/Lesson-18-Managing-Undo-Data-TH.md'],
 ['06-Users-Roles-Security/Lesson-19-User-Accounts-TH.md','06-Users-Roles-Security/Lesson-20-Privileges-and-Roles-TH.md','06-Users-Roles-Security/Lesson-21-Profiles-and-Resource-Limits-TH.md','06-Users-Roles-Security/Lesson-22-Unified-Auditing-TH.md']
];
const f=String.fromCharCode(96).repeat(3);
const fence=new RegExp(f+'[\\s\\S]*?'+f,'g');
const normalize=s=>s.replace(/^\s*>.*$/gm,'').replace(fence,'').replace(/!\[[^\]]*\]\([^)]+\)/g,'').replace(/https?:\/\/\S+/g,'').replace(/[\s\p{P}\p{S}]+/gu,'').toLowerCase();
let count=0;
for(const group of groups){
 const paragraphs=new Map();
 for(const file of group){
  const abs=path.join(root,'Oracle-Database',file);
  if(!existsSync(abs))throw Error('Missing Oracle note: '+file);
  const body=readFileSync(abs,'utf8');
  if(!body.startsWith('# Lesson '))throw Error('Unexpected Oracle lesson: '+file);
  for(const paragraph of body.split(/\n\s*\n/)){
   const key=normalize(paragraph);
   if(key.length<200)continue;
   if(!paragraphs.has(key))paragraphs.set(key,new Set());
   paragraphs.get(key).add(file);
  }
  count++;
 }
 for(const [key,files] of paragraphs)if(files.size>1)throw Error('Copied long paragraph persists across: '+[...files].join(' <> '));
}
const checks=[
 ['03-Networking-Listener/Lesson-08-Configuring-Naming-Methods-TH.md','ORA-12154'],
 ['05-Storage-Tablespaces-Undo/Lesson-16-Creating-and-Managing-Tablespaces-TH.md','OMF'],
 ['05-Storage-Tablespaces-Undo/Lesson-18-Managing-Undo-Data-TH.md','ORA-01555'],
 ['06-Users-Roles-Security/Lesson-20-Privileges-and-Roles-TH.md','Privilege & Role Authorization'],
 ['06-Users-Roles-Security/Lesson-21-Profiles-and-Resource-Limits-TH.md','Profile Lifecycle'],
 ['06-Users-Roles-Security/Lesson-22-Unified-Auditing-TH.md','Unified Auditing']
];
for(const [file,text] of checks){
 const body=readFileSync(path.join(root,'Oracle-Database',file),'utf8');
 if(!body.includes(text)||!body.includes('Lesson-'))throw Error('Topic-specific content or canonical backlinks missing: '+file);
}
console.log('Oracle verified: '+count+' audited source notes, three families deduplicated; all 31 stable IDs retained.');
