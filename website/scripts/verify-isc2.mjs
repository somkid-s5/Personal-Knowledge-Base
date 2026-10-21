// Ensure ISC2's five-domain learner route preserves all 13 IDs and 25 scenario prompts.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { courses, mainFiles, extraFiles, slug, lessonId } from '../learning-plan.mjs';

const root = path.resolve(process.cwd(), '..');
const generated = path.resolve(process.cwd(), 'src/content/docs');
const built = path.resolve(process.cwd(), 'dist');
const course = courses.find(c=>c.dir==='ISC2-CC');
if (!course) throw Error('Missing ISC2 CC curriculum');
const main = mainFiles(course);
if (main.length !== 13 || course.stages.length !== 6) throw Error('ISC2 must have 5 domain stages + 1 mixed practice stage');
for(let i=0;i<main.length;i++){
  if(lessonId(main[i])!=='cc-'+String(i+1).padStart(3,'0'))throw Error('ISC2 stable progress ID altered at step '+i);
  if(!existsSync(path.join(built,slug(main[i]),'index.html')))throw Error('Missing ISC2 built lesson: '+main[i]);
}
const scopes=['Domain 1','Domain 3','Domain 4','Domain 2','Domain 5'];
const focuses=['01–05','11–15','16–20','06–10','21–25'];
for(let j=0;j<5;j++){
  const group=course.stages[j];
  if(!group.title.includes(scopes[j]))throw Error('Unexpected domain order: '+group.title);
  for(const lesson of group.files){
    const relation=course.related.get(slug(lesson));
    if(!relation || relation.practice.length!==1 || relation.review.length!==1)throw Error('Missing practice/review refs: '+lesson);
    if(!relation.focus?.includes(focuses[j]))throw Error('Wrong scenario range on: '+lesson);
    const generatedNote=path.join(generated,slug(lesson)+'.md');
    if(!existsSync(generatedNote))throw Error('Missing generated ISC2 note: '+lesson);
    const converted=readFileSync(generatedNote,'utf8');
    for(const key of ['## 🔬 อ่านเจาะลึกและฝึกเพิ่ม','**📝 Practice','**🧠 Review','ISC2-DOMAIN-PRACTICE-MAP-TH']){
      if(!converted.includes(key))throw Error('Missing contextual links: '+key+' @ '+lesson);
    }
  }
}
const scenario = readFileSync(path.join(root,'ISC2-CC/CURRENT-SCOPE-SCENARIOS.md'),'utf8');
const qs=[...scenario.matchAll(/^### (\d+)\. /gm)].map(x=>Number(x[1]));
if(qs.length!==25||qs.some((x,i)=>x!==i+1))throw Error('Expected 25 ordered standalone scenario questions');
const mapFile='ISC2-CC/ISC2-DOMAIN-PRACTICE-MAP-TH.md';
const map=readFileSync(path.join(root,mapFile),'utf8');
if(!existsSync(path.join(built,slug(mapFile),'index.html')))throw Error('ISC2 crosswalk not built');
for(const file of main.slice(0,12))if(!map.includes(path.posix.basename(file)))throw Error('Missing ISC2 note from map: '+file);
for(const file of extraFiles(course))if(!existsSync(path.join(built,slug(file),'index.html')))throw Error('Missing ISC2 supplement: '+file);
console.log('ISC2 verified: 5 ordered Domains + 25 mixed scenarios, 13 stable IDs, contextual Practice/Review and crosswalk.');
