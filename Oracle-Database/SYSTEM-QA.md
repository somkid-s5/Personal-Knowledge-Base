# Oracle Database — System QA

[← Oracle Database](./README.md)

> **QA date:** 2026-10-10  
> **Status:** **In Progress**

| Gate | Result |
|---|---|
| Learner goal defined | PASS |
| 19c primary course identified | PASS |
| 31-lesson course inventory registered | PASS |
| Activity Guide registered | PASS |
| 8 lab-module folders registered | PASS |
| Udemy supplementary source registered | PASS |
| Current Oracle 26ai authority identified | PASS |
| Version separation policy defined | PASS |
| 19c→26ai delta scaffold | PASS |
| 31/31 lesson topics have Thai draft coverage | FILE-PRESENCE VERIFIED by 31 GitHub readbacks; semantic fidelity NOT VERIFIED |
| 31 individual private 19c Lesson PDF objective sections | REVIEWED 2026-10-10 (objective-level ONLY) |
| 18 lesson objective-gap expansions | AUTHORING COMPLETE — untested and page-level review pending |
| Full semantic ingestion of 31 lessons | PENDING — page-by-page source fidelity not established |
| Eight source lab groups have original practice workbook | DRAFT — not executed |
| Activity Guide exercise index inspected | REVIEWED 2026-10-10 — original gaps documented |
| Full lab fidelity mapping | PENDING — official mutating tasks not executed |
| Deep current 26ai delta validation | PENDING |
| Complete teaching/review layer | PENDING — all 31 standalone drafts authored, deeper teaching/source fidelity still required |
| Structural QA script/workflow | CREATED — Python unit/sanity patterns checked; workflow full run NOT CONFIRMED |
| Repository CI | NOT VERIFIED — no passing workflow result observed |
| Companion labs 01–13 execution | NOT RUN |

## Current decision

Do not label this system Verified yet.

The current deliverable establishes the architecture, provenance and first teaching layer while preventing version confusion from the start.

## Readback verification — 2026-10-10

- Individually fetched all 31 standalone Lesson Markdown files from GitHub main: **31/31 FOUND**.
- [Full-Fidelity QA Tracker](./FULL-FIDELITY-QA-TRACKER.md) records the lesson-level status and eight lab-source groups.
- This was not a full Markdown link linter, Oracle SQL execution test, Oracle University guide ingestion audit, security review or CI run.

## Expanded evidence and current blocker — 2026-10-10

- [Source objective audit](./SOURCE-OBJECTIVE-COVERAGE-AUDIT.md): 31/31 private source lesson objective sections accessed in connected Google Drive. Not a review of all 19c guide pages.
- [Activity Guide gap map](./OFFICIAL-ACTIVITY-GAP-MAP.md): inspected practice index and identified tasks requiring actual isolated CDB/PDB, listener, grants, SQL Loader and parameter changes. 13 original companion labs remain NOT RUN.
- [Standalone lessons and structural QA tracker](./FULL-FIDELITY-QA-TRACKER.md): 31/31 files verified earlier via individual GitHub fetch.
- [QA script](./qa/validate_kb.py) and workflow `/.github/workflows/oracle-kb-qa.yml` created. **Do not record CI PASS until GitHub Actions reports a passing run.**
- Oracle University Student/Activity Guides explicitly restrict redistribution; only original teaching conclusions/lesson mappings are in this public-facing repository; no proprietary PDFs or credentials should be committed.
- Full completion is blocked by **uncompleted page-by-page semantic comparison**, **no approved disposable Oracle 19c/26ai runtime to execute labs**, and **no observed passing CI result**.
