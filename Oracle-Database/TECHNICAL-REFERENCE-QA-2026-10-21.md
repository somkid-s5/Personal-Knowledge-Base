# 🗄️ Oracle Database — Technical Reference Validation Matrix (19c ↔ 26ai)

> **21 ตุลาคม 2026 | Current supplement to the 19c Administration Workshop notes**
> Source-ingestion remains the primary course-authoring mode. Facts in this sheet are independent, version-linked official-document verification. **No database command was executed in this review.**

[🏠 Oracle Learning Hub](./README.md) · [19c→26ai Delta](./19c-to-26ai-DELTA.md) · [Version Map](./VERSION-MAP.md) · [Full Content QA](../docs/FULL-CONTENT-QA-2026-10-21.md)

## 🗺️ Five critical cases — evidence grade

| Case | Canonical 19c lessons | Companion Lab | Official 19c/26ai document | Documentation verdict | Live verdict |
|---|---|---|---|---|---|
| 📡 ORA-12519: listener service handler | [Lesson 09](./03-Networking-Listener/Lesson-09-Configuring-and-Administering-the-Listener-TH.md) | [Lab 02](./10-Labs/Lab-02-Connection-and-Identity-Inspection.md) | [Oracle ORA-12519](https://docs.oracle.com/en/error-help/db/ora-12519/), [Listener handler states](https://docs.oracle.com/en/database/oracle/oracle-database/19/netag/configuring-and-administering-oracle-net-listener.html) | DOC_REVIEWED | NOT_EXECUTED |
| 🗄️ CDB/PDB visibility and scope | [Lesson 14](./04-Multitenant-CDB-PDB/Lesson-14-Managing-PDBs-TH.md) | [Lab 08](./10-Labs/Lab-08-PDB-Lifecycle-Read-Only.md) | [Viewing PDBs](https://docs.oracle.com/en/database/oracle/oracle-database/19/multi/viewing-information-about-cdbs-and-pdbs-with-sql-plus.html), [ALTER SESSION](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/ALTER-SESSION.html) | DOC_REVIEWED | NOT_EXECUTED |
| 🗂️ Online Datafile Move side effects | [Lesson 16](./05-Storage-Tablespaces-Undo/Lesson-16-Creating-and-Managing-Tablespaces-TH.md) | [Lab 09](./10-Labs/Lab-09-Storage-and-Undo-Inspection.md) | [Managing Data Files](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/managing-data-files-and-temp-files.html) | DOC_REVIEWED | NOT_EXECUTED |
| 🔐 Unified Audit policy session timing | [Lesson 22](./06-Users-Roles-Security/Lesson-22-Unified-Auditing-TH.md) | [Lab 10](./10-Labs/Lab-10-Users-Roles-Security-Inspection.md) | [Enabling policies](https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/enabling-and-applying-unified-audit-policies-users-and-roles.html), [Enabled policy view columns](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/AUDIT_UNIFIED_ENABLED_POLICIES.html) | DOC_REVIEWED | NOT_EXECUTED |
| 🧩 Undo release-specific retention | [Lesson 18](./05-Storage-Tablespaces-Undo/Lesson-18-Managing-Undo-Data-TH.md) | [Lab 09](./10-Labs/Lab-09-Storage-and-Undo-Inspection.md) | [19c UNDO_RETENTION](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/UNDO_RETENTION.html), [26ai Managing Undo](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-undo.html) | DOC_REVIEWED; CROSS_VERSION_DIFFERENCE_OPEN | NOT_EXECUTED |

## 🔬 Case findings, trade-offs and safe checks

### 1. ORA-12519 — handler availability ไม่เท่ากับ Listener Down

Oracle แนะนำ `lsnrctl services` เพื่อดู Registered Service Handlers; Listener สามารถตอบรับ TCP ได้แต่ไม่มี Handler ที่เหมาะสม/พร้อมรับ Connection. `READY`, `BLOCKED`, `UNKNOWN` ต่างกัน; `UNKNOWN` อาจมาจาก Static Registration. การเพิ่ม `PROCESSES` ทันทีไม่มีหลักฐานพอเมื่อยังไม่ตรวจ Refused/Current Handler Counts, PDB Status และ Connection Pool Churn.

**Read-only check:** `lsnrctl services` บน Host ที่ได้รับอนุญาต; ตรวจ `V$RESOURCE_LIMIT`, `V$SERVICES`, `V$PDBS` ภายใต้ Approved Database Privileges. ไม่ Restart Listener/Tomcat/Database เพื่อแก้แบบสุ่ม.

### 2. PDB — V$PDBS depends on current container

Current Session ใน Root หรือใน PDB ให้ Visibility ต่างกัน; `V$PDBS` ที่ Query จาก PDB ไม่แสดงทุก PDB ของ CDB ตาม Oracle 19c Multitenant Guide. `OPEN_MODE=READ WRITE` แต่ `RESTRICTED=YES` อาจยังไม่พร้อมสำหรับ Ordinary App Session. `ALTER SESSION SET CONTAINER` ไม่ใช่คำสั่งอ่านข้อมูลเฉย ๆ และต้องมี Scope/Privilege ที่ถูกต้อง.

**Read-only check:** `SHOW CON_NAME` และ `SELECT NAME,OPEN_MODE,RESTRICTED FROM V$PDBS` ใน Session ที่ได้รับสิทธิ์ (ไม่ข้าม Container เพื่อทำ Checklist).

### 3. MOVE DATAFILE — keep/reuse/platform and disaster recovery

Oracle 19c Online Move สร้าง Copy ระหว่าง Operation ต้องมีพื้นที่ไฟล์เดิมและใหม่; `KEEP` เก็บ Source Copy; `REUSE` อนุญาต Overwrite Destination Name. Datafile Offline ไม่รองรับ Online Move, Primary Move ไม่ย้าย Standby Location ให้อัตโนมัติ, Flashback ไม่เปลี่ยน File Path ย้อนตามเวลา และ **Windows อาจทิ้ง Source File ไว้แม้ไม่มี `KEEP`**.

**Read-only check:** `DBA_DATA_FILES` + physical storage headroom ที่ได้รับอนุญาต; เปลี่ยน File Mapping ต้องมี Backup, Approval, Verification และ Windows/ASM-specific Runbook แยกต่างหาก.

### 4. Unified Audit — new policies require new eligible sessions

Oracle 19c อธิบายว่า Enable Unified Audit Policy สำหรับ User/Role จะมีผลกับ Session หลัง Login ใหม่. ดังนั้น Policy `ENABLED` แล้วแต่ Existing Connection Pool Session ไม่สร้าง Expected Audit Event ยังไม่พิสูจน์ว่า Policy Broken. View `AUDIT_UNIFIED_ENABLED_POLICIES` มี `POLICY_NAME`, `ENABLED_OPTION`, `ENTITY_NAME`, `SUCCESS`, `FAILURE` ช่วยตรวจ Scope ก่อนดู Trail.

**Read-only check:** Enabled Policy View, Audit Trail และ Login Timeline โดยปิดบัง PII. ไม่ Force Reconnect หรือเปิด Audit แบบกว้างบน Prod เพื่อทำ Lab.

### 5. Undo — 19c RU 19.7 and 26ai documentation difference

19c Parameter Reference ระบุ Fixed-size Undo เริ่มใช้ `UNDO_RETENTION` Threshold ตั้งแต่ RU 19.7 ในรูปแบบที่ต่างจาก 19c RU ก่อนหน้า. **แต่ข้อความใน 26ai Administrator's Guide ที่เผยแพร่ปัจจุบันยังอธิบาย Fixed-size Undo ว่า Ignore Parameter** — เป็นความแตกต่างของข้อความเอกสารข้ามเวอร์ชันที่ต้องมีหลักฐานสภาพแวดล้อมจริงก่อนรับรองผล. ห้ามเหมารวมคำอธิบาย Oracle 19c เป็น Oracle 26ai ทั้งหมด.

**Read-only evidence:** Exact Product Build/RU, `V$VERSION`, `DBA_TABLESPACES` และ `V$UNDOSTAT`. ไม่มีการทดลอง Retention Guarantee หรือเปลี่ยน Parameter ใน Review นี้.

## ✅ Definition of Done ต่อ Case

| Evidence | Required before LIVE_VALIDATED |
|---|---|
| Source | Official URL + version/date + clearly scoped claim |
| SQL/CLI | Validated against actual version/OS/privileges; read-only outputs redacted |
| Reproduction | Disposable or approved isolated lab only, never production |
| Result | Expected vs actual evidence, return code/log, screenshots with sensitive information removed |
| Change/cleanup | Written approval, rollback and clean-state confirmation for any write-changing lab |

## 🧪 Automation provided

`website/scripts/verify-oracle-technical.mjs` checks that the referenced lessons/labs contain relevant official sources and version caveats, verifies the 31 stable lesson IDs, and **rejects obvious write-changing SQL statements in fenced `sql` examples of the audited eight files**. The checker does not parse Oracle SQL fully, verify external URLs online or run database commands. It is an additional safety net, not a semantic oracle or guarantee of permission safety.

Status: **DOC_REVIEWED (5 cases)** · **LAB_EXECUTED (0 cases)** · **LIVE_VALIDATED (0 cases)**.
