import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import { courses, slug } from './learning-plan.mjs';

const sidebar = courses.map((c) => ({
  label: c.icon + ' ' + c.name,
  collapsed: true,
  items: [
    { label: '🏠 เริ่มเรียนวิชานี้', slug: slug(c.dir + '/README.md') },
    ...c.stages.map(stage => ({
      label: '📖 ' + stage.title,
      collapsed: true,
      items: stage.files.map(file => ({ slug: slug(file) })),
    })),
    { label: '🧰 Lab / อ่านเพิ่ม (ไม่บังคับ)', collapsed: true,
      items: c.supplements.flatMap(group => group.files.map(file => ({ slug: slug(file) }))),
    },
  ],
}));

export default defineConfig({
  site: 'https://somkid-s5.github.io',
  base: '/Personal-Knowledge-Base',
  integrations: [
    mermaid({ autoTheme: true, enableLog: false }),
    starlight({
      title: 'Smart Learning Hub',
      description: 'สมุดโน้ตเรียนรู้ Cloud, Infrastructure, Security และ Database ของฉัน',
      defaultLocale: 'root',
      locales: { root: { label: 'ภาษาไทย', lang: 'th' } },
      customCss: ['./src/styles/custom.css'],
      head: [{ tag: 'script', attrs: { type: 'module', src: '/Personal-Knowledge-Base/study-progress.js' } }],
      components: { Footer: './src/components/StudyFooter.astro' },
      sidebar,
    }),
  ],
});
