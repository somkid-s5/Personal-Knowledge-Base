# Lab 04 — Manual Oracle Database Creation: Design & Read-only Inspection

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 🗄️ Data → ⚙️ Process → 🩺 Health → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Lesson 04](../02-Instance-Administration/Lesson-04-Creating-Database-Using-SQL-TH.md) · [Labs index](./README.md)

> **Original companion lab / static review only.** ไม่ใช่ Oracle University Activity Guide. **ไม่มีคำสั่ง CREATE DATABASE ที่ execute ได้** เพราะต้องมี disposable host พร้อมตรวจ path, identity, credentials, recovery และ ownership ก่อน. ไม่เคยรัน provisioning จริง.

## Goals
- เขียนแผน manual database creation พร้อม decision log
- อธิบาย PFILE → NOMOUNT → CREATE DATABASE → CDB/PDB → validation
- ตรวจ instance/database ที่มีอยู่แล้วด้วย read-only SQL
- อธิบาย rollback/cleanup โดยไม่สั่งลบไฟล์ใด

## Prerequisites and safety
- Oracle 19c/26ai sandbox **ที่มี DB อยู่แล้ว** สำหรับ read-only inspection
- SQL*Plus / SQLcl account ที่ DBA อนุญาตให้ query views
- ห้ามใช้ SYSDBA เพื่อความสะดวกถ้าไม่จำเป็น; ห้ามทดลอง `STARTUP`, `SHUTDOWN`, `CREATE DATABASE`, `DROP DATABASE`, `ALTER DATABASE` บน production
- ถ้าไม่มี DB sandbox ทำเฉพาะ planning และ mark inspection as not executed

## Task A — Build worksheet

| Decision | Record before execution |
|---|---|
| Oracle version, OS, Oracle Home | |
| DBA / application owner and approval | |
| Oracle SID, DB_NAME, DB_UNIQUE_NAME | |
| CDB/PDB, services, local/common identities | |
| Character set (source/target), test data | |
| Data/redo/control file paths; ASM/OMF | |
| Storage capacity, quotas, permissions, isolation | |
| Memory sizing, processes, expected concurrency | |
| Archive/FRA/RMAN backup and restore plan | |
| Security / password handling / licensing | |
| Log capture / monitoring / change window | |
| Rollback or disposable-sandbox rebuild plan | |

## Task B — Draft a conceptual plan (NO EXECUTION)

```text
[ ] Confirm software and disposable host
[ ] Prepare new database identity and file destinations
[ ] Review PFILE/SPFILE configuration
[ ] Confirm private admin credential handling
[ ] Plan NOMOUNT startup and CREATE DATABASE SQL
[ ] Plan CDB dictionary completion and application PDB creation
[ ] Plan listener/service registration and connection test
[ ] Plan RMAN backup + restore validation
[ ] Obtain change review before any command that changes the environment
```

## Task C — Inspect an existing sandbox database (SELECT only)

```sql
SHOW CON_NAME
SELECT instance_name, status, startup_time FROM v$instance;
SELECT name, open_mode, cdb, log_mode FROM v$database;
SELECT con_id, name, open_mode FROM v$pdbs ORDER BY con_id;
SELECT name, value FROM v$parameter WHERE name IN
 ('db_name','db_unique_name','spfile','control_files','db_create_file_dest','db_recovery_file_dest');
SELECT name FROM v$controlfile;
SELECT group#, member FROM v$logfile ORDER BY group#, member;
```

**Expected:** สิ่งที่บันทึกควรสอดคล้องกับ worksheet, CDB/PDB อาจอยู่คนละ open state. ใน 19c non-CDB ให้ข้าม query PDB และอธิบายสาเหตุ. ไม่แก้ parameter เพื่อให้ output ตรงแบบฝึก

## Task D — Answer operational questions

1. PFILE แตกต่างจาก SPFILE อย่างไรในแง่ persistent changes?
2. เหตุใด NOMOUNT ยังไม่แปลว่าเปิด datafiles ได้?
3. `REUSE` อันตรายอย่างไรเมื่อ directory มี control files จากระบบอื่น?
4. ถ้า `V$DATABASE.LOG_MODE` เป็น NOARCHIVELOG มีผลต่อ recovery plan อย่างไร?
5. จะแยก connection failure จาก instance state และ service/PDB state อย่างไร?

## Evidence & completion

- [ ] Worksheet ครบทุกหัวข้อสำคัญ
- [ ] Sequence manual creation อธิบายได้
- [ ] Inspection output ถูก redact ชื่อ host/path ที่ sensitive
- [ ] ไม่มี mutation เกิดขึ้น
- [ ] Security/backup/rollback risks ได้รับการระบุ
- [ ] ไม่อ้างว่าได้ผ่าน official Oracle University lab

**Cleanup:** ไม่มี resource ถูกสร้างใน Lab นี้; ตัด connection ตามปกติ

## References

- [Oracle 19c — Creating and Configuring an Oracle Database](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/creating-and-configuring-an-oracle-database.html)
- [Oracle 26ai — DBA Guide](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/)
