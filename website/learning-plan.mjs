// Knowledge Base V2: each course.yaml is the canonical curriculum and progress identity.
// File paths are relative to that course's directory. Never reuse or change an existing lesson ID.
import path from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import YAML from 'yaml';

// Astro bundles this module into dist/.prerender; resolve from the build cwd, not import.meta.url.
const root = existsSync(path.resolve(process.cwd(), 'website')) ? process.cwd() : path.resolve(process.cwd(), '..');
const dirs = ['AWS-SAA-C03', 'Azure-AZ-104', 'GCP-ACE', 'ISC2-CC', 'Oracle-Database'];
const normalize = (s) => s.replaceAll('\\', '/').toLowerCase();
export const slug = (file) => normalize(file).replace(/\.md$/, '').replace(/\/(readme|index)$/, '').replace(/(\d)\.(\d)/g, '$1-$2');
const seenIds = new Set();

export const courses = dirs.map((dir) => {
  const file = path.join(root, dir, 'course.yaml');
  const doc = YAML.parse(readFileSync(file, 'utf8'), { uniqueKeys: true });
  if (doc.version !== 2 || !Array.isArray(doc.stages) || !Array.isArray(doc.supplements)) {
    throw new Error('Invalid V2 curriculum: ' + file);
  }
  const files = new Set();
  const ids = new Map();
  const related = new Map();
  const prefixed = (localFile) => {
    if (typeof localFile !== 'string' || !localFile.endsWith('.md') ||
      localFile.startsWith('/') || localFile.includes('..') || localFile.includes('\\')) {
      throw new Error('Unsafe or invalid curriculum path in ' + dir + ': ' + localFile);
    }
    return dir + '/' + localFile;
  };
  const stages = doc.stages.map((stage) => ({
    title: stage.title,
    description: stage.description,
    files: stage.lessons.map(({ id, file: local, related: support }) => {
      if (!/^[a-z0-9]+-\d{3}$/.test(id) || seenIds.has(id)) throw new Error('Duplicate or invalid lesson ID: ' + id);
      seenIds.add(id);
      const f = prefixed(local);
      if (files.has(normalize(f))) throw new Error('Duplicate primary lesson: ' + f);
      files.add(normalize(f));
      ids.set(slug(f), id);
      if (support !== undefined) {
        const modules = support.modules ?? [];
        const labs = support.labs ?? [];
        const projects = support.projects ?? [];
        const practice = support.practice ?? [];
        const review = support.review ?? [];
        const focus = support.focus ?? null;
        if (!Array.isArray(modules) || !Array.isArray(labs) || !Array.isArray(projects) || !Array.isArray(practice) || !Array.isArray(review) || (focus !== null && (typeof focus !== 'string' || focus.length > 180))) {
          throw new Error('Invalid related content for ' + f);
        }
        const refs = [...modules, ...labs, ...projects, ...practice, ...review].map(prefixed);
        if (new Set(refs.map(normalize)).size !== refs.length) throw new Error('Repeated related file on ' + f);
        related.set(slug(f), { modules: modules.map(prefixed), labs: labs.map(prefixed), projects: projects.map(prefixed), practice: practice.map(prefixed), review: review.map(prefixed), focus });
      }
      return f;
    }),
  }));
  const supplements = doc.supplements.map((group) => ({
    title: group.title,
    description: group.description,
    files: group.files.map((local) => {
      const f = prefixed(local);
      if (files.has(normalize(f))) throw new Error('A file cannot be both primary and supplementary: ' + f);
      files.add(normalize(f));
      return f;
    }),
  }));
  for (const [lesson, links] of related) {
    for (const target of [...links.modules, ...links.labs, ...links.projects, ...links.review]) {
      if (!files.has(normalize(target)) || ids.has(slug(target))) {
        throw new Error('Related link must be a curated supplement: ' + lesson + ' → ' + target);
      }
    }
  }
  for (const [lesson, links] of related) {
    for (const target of links.practice) {
      if (!files.has(normalize(target))) throw new Error('Practice file is not curated in ' + dir + ': ' + lesson + ' → ' + target);
    }
  }
  return {
    dir, name: doc.name, icon: doc.icon, description: doc.description, summary: doc.summary,
    stages, supplements, external: doc.external ?? [], progressIds: ids, related,
  };
});

export const mainFiles = (course) => course.stages.flatMap(stage => stage.files);
export const extraFiles = (course) => course.supplements.flatMap(group => group.files);
export const lessonId = (file) => {
  const s = slug(file);
  for (const course of courses) if (course.progressIds.has(s)) return course.progressIds.get(s);
  return null;
};
