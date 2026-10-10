# Oracle 19c Administration Workshop — Objective Coverage Audit

[Learning System](./README.md) · [Full-Fidelity Tracker](./FULL-FIDELITY-QA-TRACKER.md) · [Activity Gap Map](./OFFICIAL-ACTIVITY-GAP-MAP.md)

> **Audit 2026-10-10 — SOURCE OBJECTIVES READ: 31/31.** Input: user's connected private Oracle University 19c Administration Workshop `D106546GC10_sg.pdf` and 31 individual lesson PDFs in Google Drive `Oracle_Oraclelearning/Docs`. The assessment below checks **lesson learning-objective coverage**, not every Student Guide page, slide, figure or worked example. Original Thai paraphrases only. No proprietary PDF content/images or private lab secrets are committed.

## Status vocabulary

- **OBJECTIVES READ:** Objective section of the identified private lesson PDF was inspected.
- **DRAFT MAPPED:** Original Thai lesson covers core theme; this is **not** complete source fidelity.
- **GAP REPAIRED:** Additional teaching paragraph was added in the corresponding lesson during this audit; no Oracle execution implied.
- **LIVE PENDING:** No actual authorized Oracle lab run or official Activity Guide completion evidence.

## Objective-by-objective review (original Thai summaries)

| Lesson | Learning competencies from source, paraphrased | Teaching-layer review |
|---:|---|---|
| 01 | โครงสร้างหลัก, Multitenant, Database Sharding | เติม Sharding ในบท 01; **LIVE PENDING** |
| 02 | วิธีเชื่อมต่อ Oracle และเครื่องมือ SQL clients | มีสรุป connection/SQL*Plus/SQLcl; source lesson details/diagrams pending; **LIVE PENDING** |
| 03 | สร้าง DB ด้วย DBCA และ generate creation scripts | เติมบท Scripts generation; **LIVE PENDING** |
| 04 | สร้าง CDB ด้วย CREATE DATABASE | มี sequence; ต้องทดสอบจริงใน disposable lab; **LIVE PENDING** |
| 05 | Start/shutdown database; open/close PDB | มี lifecycle; ต้อง validate scope และ execution; **LIVE PENDING** |
| 06 | PFILE/SPFILE, modify parameters, ADR, V$ views | มี parameter inspection; แล็บเปลี่ยนค่าจริงยังขาด; **LIVE PENDING** |
| 07 | Net Services components, listener, tools, dedicated/shared | มี concept + read-only inspection; **LIVE PENDING** |
| 08 | Naming methods และกำหนด local naming | มี TNS/Easy Connect; setup lab pending; **LIVE PENDING** |
| 09 | Listener registration แบบ dynamic/static | มี listener guide; live listener config pending; **LIVE PENDING** |
| 10 | Dedicated/shared, enable และ control shared server | เติม enable/control change-design; **LIVE PENDING** |
| 11 | CMAN architecture, multiplexing, CMCTL | เติม CMCTL/multiplexing prerequisites; **LIVE PENDING** |
| 12 | สร้าง PDB จาก Seed | มี design + read-only validation; mutation lab pending; **LIVE PENDING** |
| 13 | Clone, non-CDB migration, hot clone, relocate, proxy | เติม non-CDB/hot/relocate/proxy; **LIVE PENDING** |
| 14 | PDB mode, parameter scope, PDB HOST/PORT, DROP | เติม parameter/host/port/drop safety; **LIVE PENDING** |
| 15 | Logical/physical storage, defaults, blocks, deferred segments | เติม default tablespaces/deferred segments; **LIVE PENDING** |
| 16 | สร้าง/แก้/ลบ TBS, OMF, ย้าย online datafile | เติม OMF/online file move; **LIVE PENDING** |
| 17 | Space features, private temp, compression, shrink, resumable | เติม private temp/compression/resumable; **LIVE PENDING** |
| 18 | DML undo, undo vs redo, retention, temporary undo | เติม undo/redo/temp undo/guarantee; **LIVE PENDING** |
| 19 | สร้าง user, authentication methods, quotas | มี account/admin notes; hands-on pending; **LIVE PENDING** |
| 20 | GRANT/REVOKE privileges, roles, common/local | เติม revoke/role hierarchy; **LIVE PENDING** |
| 21 | Create/assign profile, resource control, password verify | เติม password verify/profile lifecycle; **LIVE PENDING** |
| 22 | Auditing responsibility, enable unified, policy, retention | เติม activation/trail maintenance; **LIVE PENDING** |
| 23 | Data-movement methods, Data Pump + SQL*Loader architecture | มี comparison; API details/real tool usage pending; **LIVE PENDING** |
| 24 | โหลด non-Oracle data ด้วย SQL*Loader | มี control file + validation; import lab pending; **LIVE PENDING** |
| 25 | Data Pump, tablespace transport by image/backup, DB transport | เติม physical backup-set and whole database transport; **LIVE PENDING** |
| 26 | External tables เพื่อเคลื่อนย้ายข้อมูลด้วย portable files | มี ORACLE_LOADER/DATAPUMP concepts; execution pending; **LIVE PENDING** |
| 27 | Proactive maintenance framework, tasks, windows | เติม alerts/AWR/ADDM + licensing; **LIVE PENDING** |
| 28 | Enable/disable tasks, maintenance window CRUD, allocation | เติม task control/window/resource plan; **LIVE PENDING** |
| 29 | DBA performance management activities, tuning methodology | มี wait-time model; full source diagrams pending; **LIVE PENDING** |
| 30 | Performance views/tools, collected metrics/statistics/alerts | เติม metrics/threshold alerts; **LIVE PENDING** |
| 31 | SQL tuning method, optimizer stats, SQL Tuning + Access Advisors | เติม SQL Access Advisor + workload tuning; **LIVE PENDING** |

## Evidence boundaries

1. All **31 separate lesson PDF objective sections were accessed** in the connected user's private Drive folder; objective crosswalk recorded here without verbatim reproduction.
2. The separate [Activity Guide gap map](./OFFICIAL-ACTIVITY-GAP-MAP.md) records classroom exercises and explains why our original read-only companion labs do not automatically fulfill them.
3. No assertion of complete lesson-to-source semantic fidelity: slides beyond objective headings, diagrams, sample scenarios, screenshots, hidden teacher notes, answers, version caveats and exact page-by-page content require a deeper pass.
4. Official 19c source is not an authority for Oracle 26ai current features. Check [26ai documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/) and licensing before changing systems.
5. Oracle University source is proprietary and some Activity Guide sections contain example credentials; never commit/disclose those values publicly.

## Remaining verification actions

- Review substantive slide/page blocks of each source Lesson PDF and mark each covered, missing or intentionally excluded item by **source page number**.
- Build original, isolated **mutating sandbox** exercise for each relevant Activity Guide lesson; test against known 19c RU, capture sanitized outputs/rollback and repeat version checks on 26ai where feasible.
- Run Markdown/link/content lint and GitHub CI. Record exact test environment and commits.
- Only set **Full Fidelity VERIFIED** when every gate has independently verifiable evidence.

**Current outcome:** all objectives inspected and gaps addressed at *learning-objective level* where recognized; **full page-level fidelity and operational validation remain pending**.
