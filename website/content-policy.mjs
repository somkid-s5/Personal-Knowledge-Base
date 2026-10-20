// Website-only classification. Keep management notes in GitHub, outside site/search.
// Match WHOLE BASENAMES, not substrings: Lesson-22-Unified-Auditing is a real lesson.
import path from 'node:path';

export function isInternalDoc(filePath) {
  const name = path.posix.basename(filePath.replaceAll('\\', '/')).toUpperCase();
  if (!name.endsWith('.MD')) return false;
  if (name === 'CLAUDE.MD' || name === 'SESSION-MEMORY.MD' || name === 'PROJECT-STANDARD.MD' ||
      name === 'MIGRATION-NOTE.MD' || name === 'SOURCES.MD' || name === 'PROVENANCE.MD' ||
      name === 'CURRENTNESS-2026.MD' || name === 'LEGACY-SOURCE-REMAP.MD' ||
      name === 'LESSONS-10-31-TH-TEACHING-ATLAS-DRAFT.MD') return true;
  if (/^SOURCE[-_]/.test(name) || /(?:^|[-_])PROVENANCE\.MD$/.test(name)) return true;
  if (/(?:^|[-_])QA(?:[-_]|\.MD$)/.test(name) || /(?:^|[-_])AUDIT(?:[-_]|\.MD$)/.test(name)) return true;
  if (/(?:^|[-_])COVERAGE(?:[-_]|\.MD$)/.test(name) || /(?:^|[-_])TRACKER\.MD$/.test(name)) return true;
  if (name === 'OFFICIAL-ACTIVITY-GAP-MAP.MD') return true;
  return false;
}
