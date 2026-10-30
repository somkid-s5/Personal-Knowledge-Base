// GCP ACE textbook editorial coverage gate.
// Static checks only: does not watch paid videos, run Google Skills graders,
// execute gcloud, make cloud changes, or attest learner comprehension.
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {courses,mainFiles,lessonId,slug} from '../learning-plan.mjs';

const root=path.resolve(process.cwd(),'..');
const generated=path.resolve(process.cwd(),'src/content/docs');
const dist=path.resolve(process.cwd(),'dist');
const gcp=courses.find(c=>c.dir==='GCP-ACE');
if(!gcp)throw Error('GCP-ACE manifest not found');
const files=mainFiles(gcp);
if(files.length!==17)throw Error('Historical GCP study snapshot must preserve 17 lesson keys');

const failures=[];
const seenParagraphs=new Map();
const audited=[];
let totalChapterChars=0,qaLines=0;
function fail(msg){failures.push(msg);}
function checkFenceBalance(text,file){
 const arr=text.split(/\r?\n/).filter(l=>/^\s{0,3}(\x60{3,}|~{3,})/.test(l));
 // Original and authored chapters use consistent triple-backtick or tilde fences.
 if(arr.length%2!==0)fail('unbalanced fenced code blocks: '+file+' ('+arr.length+')');
}
for(let i=0;i<files.length;i++){
 const file=files[i];
 const s=readFileSync(path.join(root,file),'utf8');
 const expected='gcp-'+String(i+1).padStart(3,'0');
 if(lessonId(file)!==expected)fail('stable lesson ID drift: '+file);
 const start=s.indexOf('## 📖 ');
 const appendix=s.indexOf('## 📎 ภาคขยาย',start);
 if(start<0||appendix<start){fail('textbook chapter and optional old notes not separated in '+file);continue;}
 const text=s.slice(start,appendix);
 const min=(i===2||i===3)?8500:3500;
 if(text.length<min)fail('incomplete self-study textbook size '+file+' chars='+text.length);
 const headings=[...text.matchAll(/^### .+$/gm)].map(m=>m[0]);
 if(headings.length<6)fail('missing multi-step teaching narrative '+file);
 const questions=[...text.matchAll(/^\d+\.\s.+[—?？].+$/gm)];
 if(questions.length<5)fail('insufficient reasoned answer examples '+file+': '+questions.length);
 if(!/(Worked|worked|ตัวอย่าง|กรณี|Case|Scenario|Ticket)/i.test(text))fail('missing worked example in '+file);
 if(!/(Expected|คาดหวัง|ต้องเห็น)/i.test(text))fail('missing expected observation / self-check in '+file);
 if(!/(Actual|หลักฐาน|ผลจริง|NOT_EXECUTED|ไม่ได้รัน|ไม่ได้หมายความ)/i.test(text))fail('missing actual evidence or nonexecution clarification in '+file);
 if(!/(Troubleshoot|Incident|Error|ปัญหา|วิเคราะห์|ล้มเหลว)/i.test(text))fail('missing diagnosis discussion in '+file);
 if(!/(Official|official|อ้างอิง|cloud.google.com|docs.cloud.google.com)/.test(text))fail('missing official source references '+file);
 const urls=[...text.matchAll(/https:\/\/(?:cloud|docs\.cloud|www\.skills)\.google\.com\/[^\s)]+/g)];
 if(urls.length<2)fail('insufficient official documentation links '+file);
 if(!/^# Activity \d\d/m.test(s))fail('Activity heading missing '+file);
 if(!/^\x60\x60\x60mermaid/m.test(s))fail('inline conceptual diagram missing '+file);
 checkFenceBalance(s,file);
 if(!existsSync(path.join(generated,slug(file)+'.md'))||!existsSync(path.join(dist,slug(file),'index.html')))
   fail('website source or HTML missing: '+file);
 for(const paragraph of text.split(/\n\s*\n/)){
  const clean=paragraph.replace(/\s+/g,' ').trim();
  if(clean.length<180||clean.startsWith('|')||clean.startsWith('http'))continue;
  const prior=seenParagraphs.get(clean);
  if(prior&&prior!==file)fail('duplicate long teaching paragraph '+file+' and '+prior);
  else seenParagraphs.set(clean,file);
 }
 totalChapterChars+=text.length;
 qaLines+=questions.length;
 audited.push({activity:expected,chars:text.length,sections:headings.length,reasonedQuestions:questions.length,docLinks:urls.length});
}
const progress=readFileSync(path.join(root,'GCP-ACE/TEXTBOOK-PROGRESS.md'),'utf8');
const hub=readFileSync(path.join(root,'GCP-ACE/README.md'),'utf8');
for(const term of ['17/17','TEXTBOOK_AUTHORED','EDITORIAL_REVIEWED','LAB_EXECUTED','13 activities','17 activities']){
 if(!progress.toLowerCase().includes(term.toLowerCase()))fail('progress tracker missing '+term);
}
if(!hub.includes('TEXTBOOK_AUTHORED'))fail('GCP hub lacks truthful completed writing status');
const assets=['01-concept-path.svg','02-diagnostic-path.svg'];
for(const asset of assets)
 if(!existsSync(path.join(dist,'kb-assets/gcp-ace/assets/visual-memory',asset)))
   fail('visual SVG missing in deployed build: '+asset);
if(failures.length){
 for(const f of failures)console.error('GCP_TEXTBOOK_QA ERROR: '+f);
 process.exit(1);
}
console.log(JSON.stringify({
 status:'TEXTBOOK_AUTHORED',historicalActivities:17,
 substantiveChapters:audited.length,totalChapterChars,reasonedQuestions:qaLines,
 chapterAudit:audited,
 note:'STATIC CONTENT AND BUILD QA ONLY. No independent learner/paid video or lab grader validation.'
},null,2));
