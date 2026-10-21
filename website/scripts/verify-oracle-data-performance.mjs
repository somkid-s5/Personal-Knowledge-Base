// Source-backed Oracle Data Movement/Performance evidence gate. No DB connection or execution.
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {courses,mainFiles,lessonId} from '../learning-plan.mjs';

const root=path.resolve(process.cwd(),'..');
const oracle=courses.find(c=>c.dir==='Oracle-Database');
if(!oracle)throw Error('Oracle course missing');
const main=mainFiles(oracle);
if(main.length!==31)throw Error('Oracle 31-lesson contract changed');
for(let i=0;i<main.length;i++){
 const expected='ora-'+String(i+1).padStart(3,'0');
 if(lessonId(main[i])!==expected)throw Error('Oracle stable lesson ID drift: '+expected);
}
const topics=[
 ['Data-Movement-Overview','Data Pump vs RMAN','docs.oracle.com/en/database/oracle/oracle-database/19/bradv/introduction-backup-recovery.html'],
 ['Loading-Data','Direct vs Conventional','docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-sql-loader-conventional-and-direct-loads.html'],
 ['Transporting-Data','TTS, RMAN','docs.oracle.com/en/database/oracle/oracle-database/19/bradv/introduction-backup-recovery.html'],
 ['External-Tables','External Table Access Drivers','docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-external-tables.html'],
 ['Automated-Maintenance-Overview','AutoTask and Optional Pack','docs.oracle.com/en/database/oracle/oracle-database/19/dblic/Licensing-Information.html'],
 ['Maintenance-Windows-and-Tasks','Maintenance Window != Completed Work','docs.oracle.com/en/database/oracle/oracle-database/19/admin/managing-automated-database-maintenance-tasks.html'],
 ['Database-Performance-Overview','Baseline and Pack Boundary','docs.oracle.com/en/database/oracle/oracle-database/19/dblic/Licensing-Information.html'],
 ['Monitoring-Database-Performance','Metric Scope and Collection Window','docs.oracle.com/en/database/oracle/oracle-database/19/dblic/Licensing-Information.html'],
 ['Analyzing-SQL-and-Access-Paths','Cached Cursor Plan and Actual Rows','docs.oracle.com/en/database/oracle/oracle-database/19/arpls/DBMS_XPLAN.html'],
];
let i=0;
for(const file of main.slice(22,31)){
 const body=readFileSync(path.join(root,file),'utf8');
 const [suffix,heading,url]=topics[i++];
 if(!file.includes(suffix)||!body.includes(heading)||!body.includes(url)||!body.includes('DOC_REVIEWED'))throw Error('Missing lesson technical evidence for '+file);
}
const labs=[
 ['10-Labs/Lab-11-Data-Movement-Read-Only.md',['TABLE_EXISTS_ACTION','CONTENT=DATA_ONLY','RMAN']],
 ['10-Labs/Lab-12-Automated-Maintenance-Inspection.md',['control_management_pack_access','DBA_AUTOTASK_JOB_HISTORY','DOC_REVIEWED']],
 ['10-Labs/Lab-13-Oracle-Performance-Triage-Read-Only.md',['DBMS_XPLAN.DISPLAY_CURSOR','V$SQL_PLAN_STATISTICS_ALL','DOC_REVIEWED']]
];
let checkedSql=0;
const writeVerb=/\b(?:CREATE|ALTER|DROP|TRUNCATE|INSERT|UPDATE|DELETE|MERGE|GRANT|REVOKE|AUDIT|NOAUDIT|COMMIT|ROLLBACK|FLASHBACK|EXEC(?:UTE)?|SHUTDOWN|STARTUP)\b/i;
for(const [local,markers] of labs){
 const file=path.join(root,'Oracle-Database',local);
 if(!existsSync(file))throw Error('Lab file absent '+local);
 const body=readFileSync(file,'utf8');
 for(const term of markers)if(!body.toLowerCase().includes(term.toLowerCase()))throw Error('Missing Lab evidence '+term+' in '+local);
 let fenceType=null,lang='',code=[];
 const flush=()=>{
   if(lang!=='sql')return;
   const content=code.map(x=>x.replace(/--.*$/,'')).join('\n').replace(/\/\*[\s\S]*?\*\//g,'');
   if(writeVerb.test(content))throw Error('Write-changing SQL in read-only Lab '+local);
   if(!/^\s*(SELECT|SHOW)\s/im.test(content))throw Error('SQL block does not contain approved inspection statement: '+local);
   checkedSql++;
 };
 for(const line of body.split(/\r?\n/)){
  const hit=line.match(/^ {0,3}(\x60{3,}|~{3,})(.*)$/);
  if(!hit){if(fenceType)code.push(line);continue;}
  if(!fenceType){fenceType=hit[1][0];lang=hit[2].trim().toLowerCase();code=[];}
  else if(fenceType===hit[1][0]&&!hit[2].trim()){flush();fenceType=null;lang='';code=[];}
  else code.push(line);
 }
 if(fenceType)throw Error('Unclosed code fence in '+local);
}
const matrix='Oracle-Database/DATA-MOVEMENT-PERFORMANCE-QA-2026-10-21.md';
const content=readFileSync(path.join(root,matrix),'utf8');
for(const term of ['Lessons 23–31','Labs 11–13','NOT_EXECUTED','Data Pump','SQL*Loader','External','AutoTask','DBMS_XPLAN','RMAN']){
 if(!content.includes(term))throw Error('QA Matrix evidence missing: '+term);
}
console.log(JSON.stringify({lessonIds:31,officiallyReviewedLessonBodies:9,reviewedCompanionLabs:3,readOnlySqlFences:checkedSql,execution:'NOT_EXECUTED'}));
