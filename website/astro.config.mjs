import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

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
      components: { Footer: './src/components/StudyFooter.astro' },
      sidebar: [
        { label: '☁️ AWS SAA-C03', items: [{ autogenerate: { directory: 'aws-saa-c03' } }] },
        { label: '🔷 Azure AZ-104', items: [{ autogenerate: { directory: 'azure-az-104' } }] },
        { label: '🌤️ GCP ACE', items: [{ autogenerate: { directory: 'gcp-ace' } }] },
        { label: '🛡️ ISC2 CC', items: [{ autogenerate: { directory: 'isc2-cc' } }] },
        { label: '🗄️ Oracle Database', items: [{ autogenerate: { directory: 'oracle-database' } }] },
      ],
    }),
  ],
});
