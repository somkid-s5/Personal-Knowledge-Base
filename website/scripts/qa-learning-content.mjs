// Static learning-content QA. This does NOT execute labs or certify technical accuracy.
import {existsSync,readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {courses,mainFiles,extraFiles,lessonId} from '../learning-plan.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const out=path.join(root,'website/reports/full-content-qa.md');
const errors=[],warnings=[],riskFiles=[],rows=[],sums=[];
const tick=String.fromCharCode(96);
const backtick=(s)=>tick+s+tick;
const risk=/\b(?:terraform\s+destroy|kubectl\s+delete|az\s+group\s+delete|gcloud\s+[^\n;]*\bdelete|aws\s+[^\n;]*\bdelete|DROP\s+(?:DATABASE|TABLESPACE|USER|TABLE)\b|ALTER\s+SYSTEM\b|shutdown\s+(?:immediate|abort))\b/gi;
const name={
 'AWS-SAA-C03':'AWS SAA-C03','Azure-AZ-104':'Azure AZ-104','GCP-ACE':'GCP ACE','ISC2-CC':'ISC2 CC','Oracle-Database':'Oracle Database'
};
function fenceCheck(s,file) {
 let opened=null;
 for (const [i,line] of s.split(/\r?\n/).entries()) {
  const m=line.match(/^ {0,3}(\x60{3,}|~{3,})(.*)$/);
  if(!m)continue;
  const f=m[1];
  if(!opened)opened={type:f[0],width:f.length,line:i+1};
  else if(f[0]===opened.type&&f.length>=opened.width&&!m[2].trim())opened=null;
 }
 if(opened)errors.push(file+': unclosed Markdown fence from line '+opened.line);
}
for(const course of courses) {
 let sections=0,diagrams=0,code=0,characters=0;
 const main=mainFiles(course);
 for(const file of main){
  const abs=path.join(root,file);
  if(!existsSync(abs)){errors.push('Missing primary lesson: '+file);continue;}
  const s=readFileSync(abs,'utf8');
  if(!/^#\s+\S/m.test(s))errors.push('Missing H1 in '+file);
  fenceCheck(s,file);
  const hs=(s.match(/^#{2,5} /gm)||[]).length;
  const mer=(s.match(/^ {0,3}(?:\x60{3,}|~{3,})mermaid\b/gm)||[]).length;
  const codeCount=(s.match(/^ {0,3}(?:\x60{3,}|~{3,})[a-z0-9_-]+/gmi)||[]).length;
  sections+=hs; diagrams+=mer;code+=codeCount;characters+=s.length;
  const hits=[...s.matchAll(risk)].map(m=>m[0]);risk.lastIndex=0;
  if(hits.length)riskFiles.push({file,keywords:[...new Set(hits)].slice(0,5)});
  if(s.length<500)warnings.push('Main lesson under 500 chars: '+file);
  rows.push({id:lessonId(file),file,hs,mer,codeCount});
 }
 sums.push({dir:course.dir,main:main.length,extras:extraFiles(course).length,sections,diagrams,code,characters});
}
if(rows.length!==83)errors.push('Expected 83 available main lessons, got '+rows.length);
const required=[
 ['AWS-SAA-C03/01-Certification-Core/EXAM-GUIDE-MAP.md','Design Secure Architectures'],
 ['Azure-AZ-104/AZ104-QA-MATRIX.md','82/82'],
 ['GCP-ACE/GOOGLE-SKILLS-CURRICULUM.md','17'],
 ['ISC2-CC/OBJECTIVE-COVERAGE-2026.md','19'],
 ['Oracle-Database/OFFICIAL-ACTIVITY-GAP-MAP.md','Execution gap'],
 ['Oracle-Database/05-Storage-Tablespaces-Undo/Lesson-18-Managing-Undo-Data-TH.md','19c RU 19.7']
];
for(const [file,text] of required){
 const abs=path.join(root,file);
 if(!existsSync(abs)||!readFileSync(abs,'utf8').includes(text))errors.push('Missing explicit evidence mapping: '+file);
}
const labIndex=readFileSync(path.join(root,'Oracle-Database/10-Labs/README.md'),'utf8');
for(let n=1;n<=13;n++){
 const id='Lab-'+String(n).padStart(2,'0')+'-';
 if(!labIndex.includes(id))errors.push('Oracle Lab index missing '+id);
}
const sources=[
 ['AWS SAA-C03','https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03.html'],
 ['Azure AZ-104','https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104'],
 ['GCP ACE','https://www.skills.google/paths/11'],
 ['ISC2 CC','https://www.isc2.org/certifications/cc/cc-certification-exam-outline'],
 ['Oracle 19c DBA','https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/']
];
const lines=[
 '# Knowledge Base V2 — Full Content QA (STATIC EVIDENCE)','',
 '> Auto-generated on CI. Passing this report does NOT prove all 83 lessons have been fact checked or any lab has been executed.','',
 '## Evidence boundaries','',
 '| Layer | Status | Evidence or limitation |','|---|---|---|',
 '| Source and course structural integrity | AUTOMATED | 83 main steps, H1, code fence balance and inventory |',
 '| Syllabus scope snapshots | VERIFIED SAMPLE 2026-10-21 | Official webpages checked for domain names/weights and GCP activity count; NOT 100% semantic coverage |',
 '| Oracle 19c RU 19.7 undo detail | FACT-CHECKED SAMPLE | Corrected one version-specific behavior against Oracle Parameter Reference |',
 '| Internal links, rendering and technical content checks | OTHER CI | Repository Quality, Astro build, specialized course checks |',
 '| Labs / production actions | NOT EXECUTED | Cloud/DB execution, costs, cleanup and evidence must be validated in isolated labs |',
 '| Full command semantics and all objective bullets | MANUAL REVIEW NEEDED | Static checker cannot detect all outdated or misleading claims |',
 '',
 '## Official sources spot-checked','',
 ...sources.map(([n,u])=>'- '+n+': '+u),
 '',
 '## Course content coverage (static)','',
 '| Course | Main | Curated extras | Subheadings | Mermaid blocks | Code blocks | Source chars |',
 '|---|---:|---:|---:|---:|---:|---:|',
 ...sums.map(s=>'| '+name[s.dir]+' | '+s.main+' | '+s.extras+' | '+s.sections+' | '+s.diagrams+' | '+s.code+' | '+s.characters+' |'),
 '',
 '## Blocking errors','',...(errors.length?errors.map(s=>'- '+s):['- None detected in this pass.']),
 '',
 '## Manual follow-ups','',...(warnings.length?warnings.map(s=>'- '+s):['- No short main-lesson warnings.']),
 '',
 '## Potentially mutating command examples (pattern-based, review manually)','',
 '| File | Keyword examples |','|---|---|',
 ...(riskFiles.length?riskFiles.slice(0,65).map(x=>'| '+backtick(x.file)+' | '+x.keywords.map(backtick).join(', ')+' |'):['| None detected | — |']),
 '',
 '## All 83 main lesson source files inspected','',
 '| ID | File | H2+ sections | Code blocks | Mermaid blocks |','|---|---|---:|---:|---:|',
 ...rows.map(r=>'| '+r.id+' | '+backtick(r.file)+' | '+r.hs+' | '+r.codeCount+' | '+r.mer+' |'),
 '',
 '## Next validation levels','',
 '1. Inspect content per skill objective and vendor documentation, with release/version pinned.',
 '2. Validate illustrative SQL/CLI in controlled test accounts with least privilege and cost limits.',
 '3. Keep explicit evidence for actual results, rollback and cleanup; preserve screenshots only after redaction.',
 '4. Track independent human review and provenance; NEVER mark a lab LIVE-VALIDATED from a successful build.',''
];
mkdirSync(path.dirname(out),{recursive:true});writeFileSync(out,lines.join('\n'));
console.log(JSON.stringify({main:rows.length,extras:sums.reduce((n,x)=>n+x.extras,0),errors:errors.length,warnings:warnings.length,riskCandidates:riskFiles.length}));
for(const e of errors)console.error('STATIC QA ERROR: '+e);
console.log('Report: '+out);
if(errors.length)process.exitCode=1;
