# Lab 08 — PDB Lifecycle, Seed, Clone & Migration Inspection (Read-only)

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 🗄️ Data → ⚙️ Process → 🩺 Health → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Lesson 12](../04-Multitenant-CDB-PDB/Lesson-12-Creating-PDBs-from-Seed-TH.md) · [Lesson 13](../04-Multitenant-CDB-PDB/Lesson-13-Other-PDB-Creation-Techniques-TH.md) · [Lesson 14](../04-Multitenant-CDB-PDB/Lesson-14-Managing-PDBs-TH.md)

> **Status:** Original companion lab, static-authored; not executed. Not an Oracle University Activity Guide reproduction. No CREATE/ALTER/DROP PDB or changes to CDB/PDB open state permitted in this lab.

## Prerequisites
Approved Oracle CDB sandbox and read-only account with privileges for `V$PDBS`, `V$SERVICES` and selected catalog views. Record DB version and CDB root vs PDB scope. Avoid sharing real hostnames and service identifiers publicly.

## Task 1 — Inspect the environment

```sql
SHOW USER
SHOW CON_NAME
SELECT name,cdb,open_mode FROM v$database;
SELECT con_id,name,open_mode,restricted FROM v$pdbs ORDER BY con_id;
SELECT name,network_name,con_id FROM v$services ORDER BY con_id,name;
```

Expected: distinguish PDB$SEED, CDB$ROOT context, actual application PDBs, open modes and services.

## Task 2 — Explain the Seed path
Write down a conceptual creation plan: CDB root privilege → choose name → approved storage/OMF → local admin credentials in secret store → seed-based creation → OPEN → application service/login → backup. **No SQL provisioning in this workbook.**

## Task 3 — Clone/plug compatibility worksheet
Complete: source/target versions/patch, encryption keys, charset/time zone, source open mode, target storage, backup/restore evidence, service cutover, application data validation and rollback.

On a CDB with read permission:

```sql
SELECT name,cause,type,message,status
FROM pdb_plug_in_violations
FETCH FIRST 10 ROWS ONLY;
```

An empty violation list does not validate your future migration; review constraints for that source and target.

## Task 4 — Availability scenario
App stopped connecting after instance restart. Listener is reachable, target PDB shows MOUNTED:
1. Record timestamps and app error.
2. Check PDB open mode and registered service separately.
3. Check whether PDB intentionally closed for maintenance.
4. Propose change approval and post-open service/login checks.
5. Avoid instance restart or blind privileges.

## 🧭 PDB Visibility & Administrative Privileges — review

ก่อนประเมิน PDB Open Mode ให้บันทึก Current Container จาก `SHOW CON_NAME`. Oracle 19c ระบุว่า `V$PDBS` เมื่อ query ใน PDB มีขอบเขตต่างจากการ query จาก CDB Root — จึงห้ามสรุปว่า PDB อื่นหายเพราะ View จาก PDB ปัจจุบันไม่แสดง

```sql
SHOW CON_NAME
SELECT sys_context('USERENV','CON_NAME') con_name FROM dual;
SELECT con_id,name,open_mode,restricted FROM v$pdbs ORDER BY con_id;
```

**No state change:** ห้าม `ALTER SESSION SET CONTAINER` หรือ `ALTER PLUGGABLE DATABASE OPEN` เพื่อทำ Lab นี้; การสลับ Container ต้องมี Authorization ตาม Oracle Docs. [PDB Visibility Reference](https://docs.oracle.com/en/database/oracle/oracle-database/19/multi/viewing-information-about-cdbs-and-pdbs-with-sql-plus.html).

## Pass/cleanup
- [ ] Explain CDB vs PDB vs Seed vs service
- [ ] Produce creation and migration checklist
- [ ] Correctly interpret open state and plug violations
- [ ] Confirm zero state-changing commands executed
- [ ] Record live verification as NOT EXECUTED until tested

Cleanup: disconnect only; nothing created.

References: [Oracle 19c PDB seed](https://docs.oracle.com/en/database/oracle/oracle-database/19/multi/creating-a-pdb-from-scratch.html) · [Oracle 19c cloning](https://docs.oracle.com/en/database/oracle/oracle-database/19/multi/cloning-a-pdb.html)

## 🧪 Sandbox Execution & Evidence (Optional)

[▶️ Runbook + Approved Read-only SQL Scripts](./Sandbox-Validation/README.md) · [📝 Expected vs Actual Evidence Template](./Sandbox-Validation/VALIDATION-EVIDENCE-TEMPLATE.md)

**Status: NOT_EXECUTED.** เมื่อมี Isolated Sandbox ที่ได้รับอนุญาต ให้เลือก Script ที่ตรงหัวข้อ, บันทึก Oracle Version/RU, Container/Privileges และ Expected vs Actual ลง Private Evidence. อย่าอ้างว่า GitHub Actions PASS เท่ากับรัน Lab จริง และห้าม Commit Raw Database Output ลง Public Repository.
