// Static evidence contract; does not connect to or execute against Oracle.
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {courses,mainFiles,lessonId} from '../learning-plan.mjs';
const root=path.resolve(process.cwd(),'..');
const c=courses.find(x=>x.dir==='Oracle-Database');
if(!c)throw Error('Oracle course manifest absent');
const main=mainFiles(c);
if(main.length!==31)throw Error('Oracle main count changed');
for(let i=0;i<31;i++){
 const id='ora-'+String(i+1).padStart(3,'0');
 if(lessonId(main[i])!==id)throw Error('Oracle progress ID drift: '+id);
}
const checked=[
 ['03-Networking-Listener/Lesson-09-Configuring-and-Administering-the-Listener-TH.md',['ORA-12519','lsnrctl services','V$RESOURCE_LIMIT','docs.oracle.com/en/error-help/db/ora-12519/']],
 ['04-Multitenant-CDB-PDB/Lesson-14-Managing-PDBs-TH.md',['V$PDBS','RESTRICTED','SET CONTAINER','docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/ALTER-SESSION.html']],
 ['05-Storage-Tablespaces-Undo/Lesson-16-Creating-and-Managing-Tablespaces-TH.md',['MOVE DATAFILE','KEEP','REUSE','Windows','Data Guard','docs.oracle.com/en/database/oracle/oracle-database/19/admin/managing-data-files-and-temp-files.html']],
 ['06-Users-Roles-Security/Lesson-22-Unified-Auditing-TH.md',['Session','ENABLED_OPTION','SUCCESS','FAILURE','docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/enabling-and-applying-unified-audit-policies-users-and-roles.html']],
 ['05-Storage-Tablespaces-Undo/Lesson-18-Managing-Undo-Data-TH.md',['19c RU 19.7','UNDO_RETENTION','docs.oracle.com/en/database/oracle/oracle-database/19/refrn/UNDO_RETENTION.html']],
 ['10-Labs/Lab-02-Connection-and-Identity-Inspection.md',['ORA-12519','lsnrctl services','v$resource_limit','Read-only']],
 ['10-Labs/Lab-08-PDB-Lifecycle-Read-Only.md',['V$PDBS','CON_NAME','SET CONTAINER','Read-only']],
 ['10-Labs/Lab-10-Users-Roles-Security-Inspection.md',['AUDIT_UNIFIED_ENABLED_POLICIES','SUCCESS','FAILURE','Session']]
];
const fence=/^ {0,3}(\x60{3,}|~{3,})sql[^\n]*\n([\s\S]*?)^ {0,3}\1[ \t]*$/gm;
const mutation=/\b(?:CREATE|ALTER|DROP|TRUNCATE|INSERT|UPDATE|DELETE|MERGE|GRANT|REVOKE|AUDIT|NOAUDIT|COMMIT|ROLLBACK|FLASHBACK|SHUTDOWN|STARTUP|EXEC(?:UTE)?|DBMS_\w+)\b/i;
let inspectedSqlBlocks=0;
for(const [rel,clues] of checked){
 const file=path.join(root,'Oracle-Database',rel);
 if(!existsSync(file))throw Error('Missing technical note: '+rel);
 const content=readFileSync(file,'utf8');
 for(const x of clues)if(!content.toLowerCase().includes(x.toLowerCase()))throw Error('Missing source-grounded topic '+x+': '+rel);
 const blocks=[...content.matchAll(fence)];
 if(!blocks.length)throw Error('Missing SQL observation blocks in '+rel);
 for(const block of blocks){
  const withoutComments=block[2].replace(/\/\*[\s\S]*?\*\//g,'').split(/\r?\n/).map(line=>line.replace(/--.*$/,'')).join('\n').trim();
  if(mutation.test(withoutComments))throw Error('Write-changing command in reviewed read-only SQL fence: '+rel);
  if(!/^\s*(?:SELECT|SHOW)\s/im.test(withoutComments))throw Error('SQL fence without SELECT or SHOW: '+rel);
  inspectedSqlBlocks++;
 }
}
const matrix=readFileSync(path.join(root,'Oracle-Database/TECHNICAL-REFERENCE-QA-2026-10-21.md'),'utf8');
for(const t of ['ORA-12519','PDB','Datafile','Unified Audit','Undo','NOT_EXECUTED','CROSS_VERSION_DIFFERENCE_OPEN'])
 if(!matrix.includes(t))throw Error('Technical matrix missing '+t);
const delta=readFileSync(path.join(root,'Oracle-Database/19c-to-26ai-DELTA.md'),'utf8');
for(const t of ['19c RU 19.7','26ai','docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-undo.html'])
 if(!delta.includes(t))throw Error('Cross-version note missing '+t);
console.log(JSON.stringify({oracleMain:31,docReviewedCases:5,reviewedSources:checked.length,readOnlySqlFences:inspectedSqlBlocks,liveValidation:'NOT_EXECUTED'}));
