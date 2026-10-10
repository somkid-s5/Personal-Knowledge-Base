# Oracle University Activity Guide — Companion Lab Gap Audit

[Oracle Hub](./README.md) · [Student Guide Objective Audit](./SOURCE-OBJECTIVE-COVERAGE-AUDIT.md) · [Lab index](./10-Labs/README.md)

> **2026-10-10:** The private `D106546GC10_ag.pdf` Activity Guide Table of Contents and its lesson-to-practice structure were inspected in the user's connected Drive. This file contains **original Thai paraphrases of practice intentions**, not copyrighted Oracle University step-by-step instructions. Proprietary lab text, screenshots, scripts and credentials are NOT redistributed. Our companion labs 01–13 are primarily read-only/tabletop and **do not replace mutating official exercises**.

## Activity source-to-companion mapping

| Lesson | Original course practice competency (paraphrased) | Existing original companion | Execution gap | Required sandbox isolation |
|---:|---|---|---|---|
| 3 | สร้าง CDB ด้วย DBCA ใน lab host | Lab 03 | Only planning/read-only | Disposable VM, Oracle Home, DBCA creation and cleanup |
| 4 | สร้าง CDB ด้วย SQL and initialization files | Lab 04 | Only planning/read-only | Isolated VM; verify file paths and secure admin credentials |
| 5 | ทดลอง lifecycle instance and PDB | Lab 05 | Read-only/tabletop | Authorized downtime, restart state validation and rollback |
| 6 | ตรวจ/แก้ parameters และ ADR diagnosis | Lab 06 | Read-only; parameter mutations absent | PFILE/SPFILE backup, scope/rollback, alert log evidence |
| 8 | ตั้ง local naming และทดสอบ service aliases | Lab 02 | Connection checks; live config absent | Sandbox client TNS_ADMIN and restore original config |
| 9 | ตรวจ listener และทดสอบ listener รอง | Lab 02 / Lab 07 | Read-only inspection | Isolated listener port/config and before-after logs |
| 10 | เปิด shared server mode and client routing | Lab 07 | Read-only/tabletop | Controlled SHARED_SERVERS/DISPATCHERS test and queue metrics |
| 12 | สร้าง PDB จาก seed | Lab 08 | Read-only/tabletop | Disposable CDB/PDB, datafiles, open state, cleanup and backup |
| 14 | rename PDB และปรับ parameter scope | Lab 08 | Read-only | Isolation; application services and rollback |
| 16 | ตรวจและสร้าง/จัดการ tablespaces | Lab 09 | Read-only | Separate test datafiles, quotas, ALTER/DROP cleanup |
| 17 | จัดการพื้นที่ compression/resumable allocation | Lab 09 | Read-only | License-gated compression and controlled space error test |
| 18 | บริหาร PDB Undo | Lab 09 | Read-only | Undo recovery/state change with rollback |
| 19 | สร้าง common/local users; auth and quotas | Lab 10 | Read-only | Sandbox users, secret vault, least-privilege and cleanup |
| 20 | grant roles, compose local privileges | Lab 10 | Read-only | RBAC proof and reversible grant plan |
| 21 | สร้าง profile/local role policy | Lab 10 | Read-only | Password policy and login smoke-tests; rollback |
| 22 | เปิด unified auditing และตรวจ policy events | Lab 10 | Read-only | Audit mode, policy, retention and audit-safe cleanup |
| 24 | โหลด external file ด้วย SQL Loader | Lab 11 | Read-only planning | Staging data, control files, rejects, charset regression and cleanup |
| 25 | PDB-to-PDB data movement & tablespace transport | Lab 11 | Read-only planning | Backup, network directories, dump consistency, TDE and rollback |
| 26 | query/unload external data files | Lab 11 | Read-only planning | Sandbox directories, OS permission and controlled test files |
| 28 | enable/disable tasks และปรับ window duration | Lab 12 | Read-only | Scheduler permissions, history and window rollback |

## Non-lab or discussion-only source lessons

The Activity Guide contains lesson sections that are short overviews with no standalone creation task shown in the inspected contents (e.g. architecture overview, Net Services overview, some PDB/maintenance/performance introductions). This is not evidence that no in-class exercise or instructor guidance exists; verify individual source pages during full-fidelity review.

## Why production-grade live tests are blocked

1. **No authorized disposable Oracle instance credentials/environment were established in this work.** The connector only accesses course materials and GitHub.
2. Many original class tasks intentionally execute DDL, alter instance parameters, change listener endpoints, modify accounts, or destroy/recreate database structures. Running these on production is unacceptable.
3. Student/Activity Guides are marked proprietary and the Activity Guide includes sample security credentials. Do **not** publish or reuse them in project docs or issue reports.
4. The installed Oracle 19c/26ai patch level, OS, licensing, storage and recovery baseline must be known before executing a lab.
5. Original companion labs are designed to be safe to **review**; this does not prove official lab completion or Oracle 26ai compatibility.

## Promotion criteria for each lab

- [ ] Disposable VM/CDB/PDB, software license/entitlement, isolated network and approved operator
- [ ] Exact 19c RU and/or 26ai version recorded
- [ ] Preflight backup and restore/snapshot evidence
- [ ] Original independently written executable exercise, no proprietary source copying
- [ ] State-changing tasks reviewed, test inputs/expected outputs declared, rollback and cleanup rehearsed
- [ ] No secrets in GitHub/history/logs; redacted evidence captured
- [ ] Actual execution PASS including negative-path test and post-cleanup verification
- [ ] Lesson-level official source objectives and Lab steps mapped with caveats

**Current result:** course activity topics inspected; **0 original companion labs have recorded live PASS** and original activities are not certified complete.
