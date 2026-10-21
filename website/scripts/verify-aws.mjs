// Validate the non-destructive AWS learning map and complete 00–34 project catalog.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { courses, mainFiles, extraFiles, slug, lessonId } from '../learning-plan.mjs';

const root=path.resolve(process.cwd(),'..');
const generated=path.resolve(process.cwd(),'src/content/docs');
const dist=path.resolve(process.cwd(),'dist');
const aws=courses.find(c=>c.dir==='AWS-SAA-C03');
if(!aws)throw Error('AWS SAA course manifest missing');
const main=mainFiles(aws);
if(main.length!==15)throw Error('Expected 13 modules + 2 exam steps');
if(aws.related.size!==13)throw Error('Require contextual links for all 13 architecture modules');
const manifestExtras=extraFiles(aws);
const extras=new Set(manifestExtras);
const modules=new Set();
const labs=new Set();
const suggestedProjects=new Set();
for(let n=1;n<=13;n++){
  const module=main[n-1];
  const expected='aws-'+String(n).padStart(3,'0');
  if(lessonId(module)!==expected)throw Error('AWS stable lesson ID mismatch: '+module);
  const relations=aws.related.get(slug(module));
  if(!relations)throw Error('Module without contextual learning links: '+module);
  modules.add(module);
  const note=readFileSync(path.join(root,module),'utf8');
  const generatedFile=path.join(generated,slug(module)+'.md');
  if(!note.startsWith('# Module')||!existsSync(generatedFile))throw Error('Original/generated Module missing: '+module);
  const converted=readFileSync(generatedFile,'utf8');
  if(!converted.includes('## 🔬 อ่านเจาะลึกและฝึกเพิ่ม'))throw Error('No optional reading on module: '+module);
  for(const lab of relations.labs){
    if(!extras.has(lab)||!lab.includes('/Lab-Guide-TH/Lab-'))throw Error('Invalid Lab relation: '+lab);
    labs.add(lab);
    if(!converted.includes(slug(lab)+'/'))throw Error('No Lab link in module: '+module+' -> '+lab);
  }
  for(const project of relations.projects){
    if(!extras.has(project)||!project.includes('/03-Hands-On-Projects/project-'))throw Error('Invalid Project relation: '+project);
    suggestedProjects.add(project);
    if(!converted.includes(slug(project)+'/'))throw Error('No project link in module: '+module+' -> '+project);
  }
}
if(labs.size!==7)throw Error('Expected seven distinct AWS labs, found '+labs.size);
const projectRoot=path.join(root,'AWS-SAA-C03/03-Hands-On-Projects');
const allProjects=readdirSync(projectRoot,{withFileTypes:true})
  .filter(x=>x.isDirectory()&&/^project-\d{2}-/.test(x.name))
  .map(x=>'AWS-SAA-C03/03-Hands-On-Projects/'+x.name+'/README.md')
  .sort();
if(allProjects.length!==35)throw Error('Expected all 35 Projects (00–34), found '+allProjects.length);
for(let i=0;i<35;i++){
 const expected='project-'+String(i).padStart(2,'0')+'-';
 const project=allProjects.find(x=>x.includes('/'+expected));
 if(!project)throw Error('Project missing: '+expected);
 if(!extras.has(project))throw Error('Project not discoverable through supplementary index: '+project);
 const source=path.join(root,project);
 const webpage=path.join(dist,slug(project),'index.html');
 if(!existsSync(source)||!existsSync(webpage))throw Error('Project source or published page missing: '+project);
}
for(const target of [...labs,...suggestedProjects]){
 const generatedFile=path.join(generated,slug(target).replace(/\/readme$/,'')+'.md');
 const indexFile=target.toLowerCase().endsWith('/readme.md') ? path.join(generated,slug(target),'index.md') : generatedFile;
 if(!existsSync(indexFile))throw Error('Generated related document missing: '+indexFile);
 if(!readFileSync(indexFile,'utf8').includes('## ↩️ กลับไป Activity หลัก'))throw Error('Related document missing reverse link: '+target);
}
const catalog=readFileSync(path.join(root,'AWS-SAA-C03/AWS-PORTFOLIO-PROJECT-CATALOG-TH.md'),'utf8');
for(const p of allProjects)if(!catalog.includes(p.slice('AWS-SAA-C03/'.length)))throw Error('Project absent from full catalog: '+p);
const cross=readFileSync(path.join(root,'AWS-SAA-C03/AWS-MODULE-LAB-PROJECT-MAP-TH.md'),'utf8');
for(const module of modules)if(!cross.includes(path.posix.basename(module)))throw Error('Crosswalk omits Module: '+module);
for(const lab of labs)if(!cross.includes(path.posix.basename(lab)))throw Error('Crosswalk omits Lab: '+lab);
const coursePage=path.join(dist,'aws-saa-c03','index.html');
for(const file of ['AWS-MODULE-LAB-PROJECT-MAP-TH.md','AWS-PORTFOLIO-PROJECT-CATALOG-TH.md']){
 if(!existsSync(path.join(dist,slug('AWS-SAA-C03/'+file),'index.html')))throw Error('AWS map page missing: '+file);
}
if(!existsSync(coursePage))throw Error('AWS course overview missing');
for(let i=13;i<15;i++)if(lessonId(main[i])!=='aws-'+String(i+1).padStart(3,'0'))throw Error('Exam lesson stable IDs changed');
console.log('AWS verified: 13 architecture modules, 7 labs, 35 portfolio project pages, linked optional projects and stable 15 lesson IDs.');
