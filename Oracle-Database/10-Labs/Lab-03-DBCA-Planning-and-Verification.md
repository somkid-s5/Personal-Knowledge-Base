# Lab 03 — DBCA Planning and Post-create Verification (ปลอดภัย / ไม่สร้างจริง)

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 🗄️ Data → ⚙️ Process → 🩺 Health → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Lesson 03](../02-Instance-Administration/Lesson-03-Creating-Database-Using-DBCA-TH.md) · [Labs index](./README.md)

> Original companion lab, **static and read-only**. Does not reproduce proprietary Oracle University Activity Guide. Live deployment not executed. DBCA creation requires isolated sandbox, privileges, storage, and user approval in that environment.

## Goal
ทำ runbook ก่อนสร้าง database ด้วย DBCA พร้อมตรวจ state ของ **sandbox database ที่มีอยู่แล้ว** โดยไม่ใช้ destructive commands.

## Prerequisites
- Oracle 19c/26ai lab host with known Oracle Home
- Sandbox database ที่มีอยู่แล้วสำหรับ Task 3 (ถ้าไม่มี ให้ทำ Task 1–2 แล้ว mark Task 3 not executed)
- SQLcl/SQL*Plus กับ monitoring account ที่ได้รับ view access ตาม policy
- ห้ามใช้ production สำหรับ DBCA create/delete, `STARTUP`, `SHUTDOWN`, `ALTER SYSTEM` ใน Lab นี้

## Task 1 — Record preflight worksheet

| Field | Lab value / evidence |
|---|---|
| Oracle version/OS/Home | (fill in) |
| Database name / DB unique name | (fill in) |
| SID | (fill in) |
| CDB root/PDB name/service | (fill in) |
| Storage/data/redo/FRA destinations | (fill in) |
| Character set / national character set | (fill in) |
| CPU/RAM/quotas/space budget | (fill in) |
| Backup/restore/cleanup owner | (fill in) |
| Secret handling & licensing check | (fill in) |

## Task 2 — Review DBCA interface

บน sandbox Oracle host:

```bash
command -v dbca
dbca -help
```

**Expected:** พบ binary จาก Oracle Home ที่ถูกต้อง และ help/usage ที่ตรง version; อย่ารัน `-createDatabase` หรือ `-deleteDatabase` ระหว่าง Lab นี้.

## Task 3 — Inspect an EXISTING authorized sandbox database

```sql
SHOW CON_NAME
SELECT instance_name, status FROM v$instance;
SELECT name, cdb, open_mode, log_mode FROM v$database;
SELECT con_id, name, open_mode FROM v$pdbs ORDER BY con_id;
SELECT name, value FROM v$parameter
WHERE name IN ('db_name','db_unique_name','db_recovery_file_dest');
SELECT name, value FROM v$diag_info
WHERE name IN ('Diag Alert','Diag Trace');
```

**Expected:** name/status/container/recovery path are consistent with worksheet; `V$PDBS` is relevant to CDB (skip if non-CDB legacy 19c).

## Task 4 — Review connectivity without change

From approved database host:

```bash
lsnrctl status
lsnrctl services
```

From client, connect with prompting (replace example values):

```bash
sqlplus 'labuser@//db.example.test:1521/labpdb.example.test'
```

Inside SQL*Plus:

```sql
SHOW USER
SHOW CON_NAME
SELECT sys_context('USERENV','SERVICE_NAME') service_name FROM dual;
```

**Expected:** connected to intended PDB, not CDB root. Listener reachable alone does not prove login success.

## Task 5 — Failure scenarios

1. Client sees ORA-12514: inspect actual registered SERVICE_NAME and PDB/open state; do not rename random system services.
2. DBCA reports insufficient space: compare data/FRA destinations against host free space and ASM.
3. PDB open but user login ORA-01017: check username/password/account container/auth method; don't disable authentication.
4. Legacy text becomes garbled: check original character set and migration transformations; don't assume switching charset fixes data.

## Evidence and exit criteria
- [ ] Worksheet populated
- [ ] Difference DB_NAME / SID / PDB / SERVICE_NAME explained
- [ ] DBCA help observed on correct Oracle Home
- [ ] Existing database/PDB status captured (redacted)
- [ ] Client connects via service using non-admin user (when approved)
- [ ] No mutation performed and no credentials exposed

**Cleanup:** none — no resources created. If run against a test host, only exit SQL*Plus/session.

## Version/provenance
Source mapping: Oracle University 19c Administration Workshop Lesson 3, not a faithful transcription. Always inspect DBCA version-specific help and [26ai administration docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/) before a real build.
