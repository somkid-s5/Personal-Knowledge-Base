// CI smoke test for AZ-104 canonical domains and mirrored visual practice pages.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { courses, mainFiles, slug, lessonId } from '../learning-plan.mjs';

const root = path.resolve(process.cwd(), '..');
const output = path.resolve(process.cwd(), 'dist');
const course = courses.find(c => c.dir === 'Azure-AZ-104');
if (!course) throw Error('AZ-104 course.yaml missing');
const lessons = mainFiles(course);
if (lessons.length !== 7) throw Error('Expected Visual + Study Map + five domain lessons, got '+lessons.length);
if (new Set(lessons.map(lessonId)).size !== lessons.length) throw Error('Duplicate lesson IDs');
if (lessonId(lessons[0]) !== 'az104-001' || lessonId(lessons[1]) !== 'az104-002') throw Error('Legacy progress IDs changed');
for (const file of lessons) {
  const page = path.join(output, slug(file), 'index.html');
  if (!existsSync(page)) throw Error('Missing generated lesson page: ' + page);
}
for (const file of lessons.slice(2)) {
  const note = readFileSync(path.join(root,file),'utf8');
  if (note.length < 1700 || !/## Domain [1-5]/.test(note) || !note.includes('## 🧪 Labs'))
    throw Error('AZ-104 domain content or lab section missing: '+file);
}
const pages = ['index.html','labs.html','quiz.html','flashcards.html',
  'rbac-lab.html','storage-lab.html','storage-access-lab.html','compute-lab.html',
  'appservice-lab.html','containers-lab.html','networking-lab.html',
  'loadbalancing-lab.html','monitor-lab.html','recovery-lab.html'];
const crosswalk = readFileSync(path.join(root,'Azure-AZ-104/AZ-104-LABS-AND-PRACTICE-TH.md'),'utf8');
for (const page of pages) {
  if (!existsSync(path.join(output,'az104-interactive',page))) throw Error('Missing interactive page: '+page);
}
for (const lab of pages.slice(4)) {
  if (!crosswalk.includes('az104-interactive/'+lab)) throw Error('Lab not mapped to AZ-104 Domain: '+lab);
}
console.log('AZ-104 OK: five domain notes, seven stable lesson IDs, ten visual labs and fourteen app entry pages.');
