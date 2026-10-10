# Oracle Database — Lessons 10–31 Thai Teaching Atlas (Working Draft)

> 🧠 **ภาพจำก่อนอ่าน:** 🗄️ Data → ⚙️ Process → 🩺 Health  
> 🎨 [Visual Guide ของวิชานี้](./VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Oracle Learning Hub](./README.md) · [Source Coverage](./SOURCE-COVERAGE.md)

> **DRAFT:** original Thai explanations aligned to 19c Oracle University Lesson titles. Not full-fidelity ingestion of licensed guides; no live labs executed; not a Verified certification claim. Current behavior must be checked with Oracle AI Database 26ai docs per feature. These are compact lesson starters, not replacements for full module lessons.

## 03-Networking-Listener

### Lesson 10: Shared Server Architecture

**เรียนอะไรและทำไม:** Shared server ใช้ dispatchers และ shared server processes รับงานจาก sessions หลายราย; ต่างจาก dedicated server; ตรวจ queue, UGA และขีดจำกัด.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT server,COUNT(*) FROM v$session GROUP BY server;
```

**Incident workshop:** เมื่อ connections มาก อย่าเปลี่ยน server mode โดยไม่ตรวจ application compatibility. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 10 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 11: Oracle Connection Manager

**เรียนอะไรและทำไม:** CMAN เป็น gateway สำหรับ access control และ connection concentration ไม่ใช่ตัวแทนของ listener หรือ database service.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT name FROM v$services;
```

**Incident workshop:** ถ้าผ่าน gateway ไม่ได้ ตรวจ CMAN listener, ACL, route, client descriptor. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 11 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

## 04-Multitenant-CDB-PDB

### Lesson 12: Create PDB from Seed

**เรียนอะไรและทำไม:** CREATE PLUGGABLE DATABASE ใช้ PDB$SEED เป็น template; PDB ที่สร้างอาจยัง MOUNTED และยังไม่พร้อมรับงาน.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT con_id,name,open_mode FROM v$pdbs;
```

**Incident workshop:** วาง filesystem/OMF, quotas, admin credential และ service ก่อนสร้าง. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 12 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 13: Other PDB Creation Methods

**เรียนอะไรและทำไม:** Clone, unplug/plug และ relocate ต้องพิจารณา compatibility, file paths, TDE wallets, downtime และ PDB_PLUG_IN_VIOLATIONS.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT name,cause,type,message FROM pdb_plug_in_violations FETCH FIRST 20 ROWS ONLY;
```

**Incident workshop:** ห้ามคิดว่าการ copy datafiles เท่ากับ migration ที่พร้อมใช้งาน. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 13 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 14: Managing PDBs

**เรียนอะไรและทำไม:** CDB root กับ PDB มี scope ต่างกัน; SAVE STATE, open modes, services และ local users มีผลต่อ availability.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT con_id,name,open_mode,restricted FROM v$pdbs;
```

**Incident workshop:** CDB OPEN ไม่ได้หมายถึง PDB ทุกตัว READ WRITE. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 14 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

## 05-Storage-Tablespaces-Undo

### Lesson 15: Storage Architecture

**เรียนอะไรและทำไม:** Block → extent → segment → tablespace เชื่อมกับ physical datafiles; ASM/OMF เกี่ยวกับการวาง files.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT tablespace_name,status,contents FROM dba_tablespaces;
```

**Incident workshop:** ดู tablespace, autoextend, underlying OS/ASM free space แยกกัน. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 15 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 16: Tablespace Administration

**เรียนอะไรและทำไม:** Permanent/temp/undo tablespace, bigfile/smallfile, datafile autoextend และ maxsize มี failure mode ต่างกัน.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT tablespace_name,status,contents FROM dba_tablespaces;
```

**Incident workshop:** ORA-01652 เป็น temp space; ORA-01653 เป็น segment allocation; อย่าขยายโดยไม่เช็ก disk. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 16 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 17: Space Management

**เรียนอะไรและทำไม:** ASSM, HWM, segment advisor, shrink/move และ reclaim ต่างกัน; DELETE ไม่ได้ทำให้ datafile เล็กลงอัตโนมัติ.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT tablespace_name,COUNT(*) file_count FROM dba_data_files GROUP BY tablespace_name;
```

**Incident workshop:** ตรวจ locks, index maintenance และ movement impact ก่อน shrink/move. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 17 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 18: Undo Administration

**เรียนอะไรและทำไม:** Undo ทำ transaction rollback และ read consistency; UNDO_RETENTION ไม่การันตี retention หากพื้นที่จำกัด.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT status,COUNT(*) extents FROM dba_undo_extents GROUP BY status;
```

**Incident workshop:** ORA-01555: ตรวจ long query, undo space และ write churn. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 18 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

## 06-Users-Roles-Security

### Lesson 19: User Account Administration

**เรียนอะไรและทำไม:** Common vs local users, authentication, account locks/expiry, default tablespace และ profiles.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT username,account_status,profile FROM dba_users;
```

**Incident workshop:** อย่าปิด password expiration หรือ unlock โดยไม่มี identity validation. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 19 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 20: Roles and Privileges

**เรียนอะไรและทำไม:** System vs object privileges, direct grants vs roles, common/local grants และ definer-rights limitations.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT grantee,granted_role FROM dba_role_privs;
```

**Incident workshop:** ORA-00942 อาจเป็น privilege/schema ไม่ใช่ table missing. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 20 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 21: User Resource Limits

**เรียนอะไรและทำไม:** Profiles กำหนด password policy และ resource limits; การบังคับใช้อาจอาศัย RESOURCE_LIMIT.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT profile,resource_name,limit FROM dba_profiles;
```

**Incident workshop:** เปลี่ยน profile เสี่ยงกระทบ app sessions/credentials. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 21 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 22: Unified Auditing

**เรียนอะไรและทำไม:** Audit policies, user/action coverage, retention และ CDB/PDB scope; audit trails มีข้อมูลอ่อนไหว.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT event_timestamp,dbusername,action_name FROM unified_audit_trail FETCH FIRST 10 ROWS ONLY;
```

**Incident workshop:** ไม่มี audit row ไม่ได้แปลว่าไม่มี event; ตรวจ policy status และสิทธิ์. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 22 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

## 08-Data-Movement-Maintenance

### Lesson 23: Data Movement Overview

**เรียนอะไรและทำไม:** SQL*Loader, Data Pump, external tables และ transportable tablespaces ใช้ต่างกันตาม downtime/format/volume.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT directory_name,directory_path FROM dba_directories;
```

**Incident workshop:** export success ไม่ใช่ restore success. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 23 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 24: Loading Data

**เรียนอะไรและทำไม:** Conventional/direct path, reject/bad files, constraints, indexes และ charset validation.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT owner,table_name,num_rows FROM dba_tables FETCH FIRST 10 ROWS ONLY;
```

**Incident workshop:** ตรวจ load log, reject count และ target row consistency. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 24 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 25: Transporting Data

**เรียนอะไรและทำไม:** Transportable tablespaces ต้องตรวจ self-contained set, metadata, datafiles, endian และ TDE key.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT tablespace_name,status FROM dba_tablespaces;
```

**Incident workshop:** อย่าลืม rollback and restore proof หลัง transport. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 25 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 26: External Tables

**เรียนอะไรและทำไม:** ORACLE_LOADER, directory objects, server-side files, format definitions และ privileges.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT owner,table_name,default_directory_name FROM dba_external_tables;
```

**Incident workshop:** ORA-29913: ตรวจ OS permissions, format, log/bad files. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 26 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 27: Auto Maintenance Overview

**เรียนอะไรและทำไม:** Automatic stats, segment advisor, SQL tuning advisor ผ่าน maintenance windows; ตรวจ license ก่อนเปิด packs.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT client_name,status FROM dba_autotask_client;
```

**Incident workshop:** missing maintenance: schedule, client, feature grants. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 27 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 28: Managing Maintenance Windows

**เรียนอะไรและทำไม:** Scheduler windows และ MAINTENANCE_WINDOW_GROUP ระบุเวลาทำงานอัตโนมัติ; งานอาจชน business load.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT window_name,enabled,repeat_interval FROM dba_scheduler_windows;
```

**Incident workshop:** เทียบ history กับ peak performance ก่อน disable. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 28 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

## 07-Monitoring-Troubleshooting

### Lesson 29: Performance Fundamentals

**เรียนอะไรและทำไม:** Database time, throughput, wait events, active sessions, CPU/IO baselines และ AWR licensing.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT event,wait_class,total_waits FROM v$system_event FETCH FIRST 10 ROWS ONLY;
```

**Incident workshop:** CPU ต่ำแต่ช้าอาจเป็น wait, locking หรือ application. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 29 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 30: Performance Monitoring

**เรียนอะไรและทำไม:** Trend metrics, blocking, resource limits และ correlation กับ application/JDBC pool.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT status,COUNT(*) FROM v$session GROUP BY status;
```

**Incident workshop:** ORA-12519 transient ต้องมี timestamped snapshots. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 30 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

### Lesson 31: SQL Plans and Access Paths

**เรียนอะไรและทำไม:** Optimizer cardinality, index vs full scan, join order, stats freshness, DISPLAY_CURSOR ตามสิทธิ์.

**ต้องเข้าใจ:** component ownership, CDB/PDB scope, version and privilege restrictions; ต้องอธิบาย use-case, tradeoff และผลต่อ availability/recovery ได้ ไม่ท่องชื่อคำสั่งเพียงอย่างเดียว.

**ฝึกอ่านข้อมูลแบบ Read-only:** (ต้องมีสิทธิ์ view; แทนชื่อ object ตาม environment จริง)

```sql
SELECT sql_id,executions,elapsed_time FROM v$sql WHERE executions>0 FETCH FIRST 10 ROWS ONLY;
```

**Incident workshop:** อย่าใส่ hint ก่อนเปรียบเทียบ actual rows และ plan. ให้เก็บ timestamp, error, evidence ก่อนแก้ไข. เขียน 3 root-cause hypotheses, วิธีตรวจแต่ละข้อ และ verification/rollback plan. ไม่สั่งงาน mutating กับ production.

**คำถามทบทวน:** (1) สิ่งนี้แก้ปัญหาอะไร? (2) แตกต่างจากวิธีอื่นอย่างไร? (3) ตรวจผลสำเร็จจากอะไร? (4) ถ้า service ไม่พร้อมจะตรวจชั้นไหน? (5) ฟีเจอร์/สิทธิ์ใดต้องตรวจตาม 19c และ 26ai?

**Source:** Oracle University 19c Lesson 31 — title-level mapping only; [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/).

## Completion boundary

Lesson 01–09 separate files; 10–31 only compact teaching atlas pending dedicated full-length lessons, source PDF review, original lab execution and QA. Oracle manuals do not transfer rights to republish training PDFs/images.
