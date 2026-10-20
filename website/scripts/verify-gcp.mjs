// Validate GCP learning navigation and generated related links without duplicating lesson bodies.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { courses, mainFiles, extraFiles, slug, lessonId } from '../learning-plan.mjs';

const root=path.resolve(process.cwd(),'..');
const generated=path.resolve(process.cwd(),'src/content/docs');
const dist=path.resolve(process.cwd(),'dist');
const gcp=courses.find(c=>c.dir==='GCP-ACE');
if(!gcp)throw Error('GCP ACE course manifest missing');

const main=mainFiles(gcp);
if(main.length!==17||gcp.related.size!==17)throw Error('Require 17 mapped main Activities');
for(let i=0;i<17;i++){
 const id='gcp-'+String(i+1).padStart(3,'0');
 if(lessonId(main[i])!==id)throw Error('GCP progress ID changed: '+main[i]);
}
const allowed=new Set(extraFiles(gcp));
const coveredModules=new Set();
const coveredLabs=new Set();
for (const [key, group] of gcp.related) {
 const file=main.find(f=>slug(f)===key);
 if(!file)throw Error('Related block without primary Activity: '+key);
 const body=readFileSync(path.join(root,file),'utf8');
 const built=path.join(dist,slug(file),'index.html');
 const generatedFile=path.join(generated,slug(file)+'.md');
 if(!body.startsWith('# Activity ')||!existsSync(built)||!existsSync(generatedFile))throw Error('Missing original/generated/built Activity: '+file);
 const websiteText=readFileSync(generatedFile,'utf8');
 if(group.modules.length+group.labs.length){
   if(!websiteText.includes('## 🔬 อ่านเจาะลึกและฝึกเพิ่ม'))throw Error('Related navigation not generated: '+file);
 }
 for(const related of group.modules){
   if(!related.includes('/Module-')||!allowed.has(related))throw Error('Invalid optional Module: '+related);
   coveredModules.add(related);
   if(!websiteText.includes(slug(related)+'/'))throw Error('Missing Module link on Activity: '+file+' → '+related);
 }
 for(const related of group.labs){
   if(!related.includes('/Lab-Guide-TH/Lab-')||!allowed.has(related))throw Error('Invalid optional Companion Lab: '+related);
   coveredLabs.add(related);
   if(!websiteText.includes(slug(related)+'/'))throw Error('Missing Lab link on Activity: '+file+' → '+related);
 }
}
if(coveredModules.size!==13||coveredLabs.size!==6)throw Error('Expected all 13 Modules and six Labs covered, got '+coveredModules.size+'/'+coveredLabs.size);
for(const file of [...coveredModules,...coveredLabs]){
 const doc=path.join(generated,slug(file)+'.md');
 if(!existsSync(doc) || !readFileSync(doc,'utf8').includes('## ↩️ กลับไป Activity หลัก'))throw Error('Missing reverse learning link on: '+file);
}
const mapFile='GCP-ACE/ACTIVITY-TO-MODULE-MAP-TH.md';
const map=readFileSync(path.join(root,mapFile),'utf8');
for(const file of main){
 if(!map.includes(path.posix.basename(file)))throw Error('Study crosswalk missing Activity: '+file);
}
for(const file of [...coveredModules,...coveredLabs]){
 if(!map.includes(path.posix.basename(file)))throw Error('Study crosswalk missing related document: '+file);
}
if(!existsSync(path.join(dist,slug(mapFile),'index.html')))throw Error('Crosswalk page not published');
console.log('GCP mapped successfully: 17 Activities → 13 optional Modules / 6 Companion Labs; reverse links and existing lesson IDs preserved.');
