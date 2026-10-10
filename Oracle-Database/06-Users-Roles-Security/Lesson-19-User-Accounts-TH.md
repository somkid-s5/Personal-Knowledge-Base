# Lesson 19 — Creating and Managing User Accounts (ภาษาไทย)

> 🧠 **ภาพจำก่อนอ่าน:** 👤 Identity → 🔑 Access → 🛡️ Controls  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Security index](./README.md) · [Lab 10](../10-Labs/Lab-10-Users-Roles-Security-Inspection.md)

> **Provenance:** Oracle University 19c Administration Workshop Lesson 19 topic-level alignment. Original Thai learning material; not full page-by-page source fidelity. SQL is read-only; live test NOT RUN. Version-specific behavior of 26ai must be confirmed before change.

## เป้าหมาย
- แยก identity, authentication, authorization, resource limits และ auditing
- ตรวจ scope ของ instance/CDB/PDB และสิทธิ์ก่อนแก้ปัญหาบัญชีผู้ใช้
- ใช้ least privilege และเก็บ evidence ที่ไม่เผย credential
- อธิบาย failure mode และ verification/rollback ได้

## เนื้อหาและแนวปฏิบัติ

**Oracle user = identity + schema namespace.** Login ต้องใช้ authentication, CREATE SESSION, ถูก container และ account ไม่ล็อกหรือหมดอายุ. ใน CDB common user และ local user มี scope ต่างกัน; PDB user ไม่จำเป็นต้องมองเห็นทุก PDB.

**การบริหาร:** วาง username/owner, auth method, profile, default/temporary tablespace, quota, password life cycle และ service/PDB. Schema-only account (NO AUTHENTICATION) ใช้เป็น object owner ได้โดยไม่มี direct login ตามเงื่อนไขเวอร์ชัน.

**Checklist:** (1) service/PDB ที่ login จริง (2) account_status, profile (3) CREATE SESSION grants (4) authentication/client version (5) application secret rotation/rollback. ORA-01017 ไม่เหมือน ORA-28000.

~~~sql
SHOW CON_NAME
SELECT username,account_status,profile,default_tablespace,temporary_tablespace
FROM dba_users ORDER BY username;
SELECT grantee,privilege FROM dba_sys_privs WHERE privilege='CREATE SESSION';
~~~

**Security:** ห้ามทำ account unlock/password reset โดยไม่ยืนยัน requester และ approval; ห้ามฝังรหัสผ่านใน Git/SQL history.

## Workflow เมื่อเกิด Incident
1. เก็บ error code และเวลาจริง พร้อม user/service/container โดยตัด sensitive values
2. ตรวจ `SHOW CON_NAME`, account metadata, policies/privileges ตามหัวข้อ โดยใช้ account ที่ได้รับสิทธิ์แล้ว
3. เปรียบเทียบกับ security baseline และ audit trail; แยก application bug จาก database authorization
4. เสนอ change request ระบุ owner, blast radius, rollback, credential rotation และ post-change smoke test
5. ห้าม grant `DBA` หรือ `SELECT ANY DICTIONARY` เพื่อผ่านแบบฝึก

## Self-check
1. ถ้าผู้ใช้เข้า SQL*Plus ได้แต่ SELECT อีก schema ไม่ได้ ต้องตรวจอะไร?
2. การใช้ role กับ direct object grant ต่างกันอย่างไร?
3. สิทธิ์ใน CDB root กับ PDB ต่างกันอย่างไร?
4. จะรู้ได้อย่างไรว่าการเปลี่ยน profile กระทบ connection pool?
5. หลักฐานใดพิสูจน์ได้ว่า audit policy capture เหตุการณ์ที่ต้องการ?

## Official references
- [Oracle 19c Security Guide](https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/index.html)
- [Oracle 26ai Security Guide](https://docs.oracle.com/en/database/oracle/oracle-database/26/dbseg/)
