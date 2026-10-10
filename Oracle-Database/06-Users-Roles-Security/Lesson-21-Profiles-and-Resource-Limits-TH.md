# Lesson 21 — Configuring User Resource Limits (ภาษาไทย)

[Security index](./README.md) · [Lab 10](../10-Labs/Lab-10-Users-Roles-Security-Inspection.md)

> **Provenance:** Oracle University 19c Administration Workshop Lesson 21 topic-level alignment. Original Thai learning material; not full page-by-page source fidelity. SQL is read-only; live test NOT RUN. Version-specific behavior of 26ai must be confirmed before change.

## เป้าหมาย
- แยก identity, authentication, authorization, resource limits และ auditing
- ตรวจ scope ของ instance/CDB/PDB และสิทธิ์ก่อนแก้ปัญหาบัญชีผู้ใช้
- ใช้ least privilege และเก็บ evidence ที่ไม่เผย credential
- อธิบาย failure mode และ verification/rollback ได้

## เนื้อหาและแนวปฏิบัติ

**PROFILE** รวม password restrictions และ resource constraints ที่กำหนดให้ user. Password limits เช่น FAILED_LOGIN_ATTEMPTS, PASSWORD_LIFE_TIME ต่างจาก resources เช่น SESSIONS_PER_USER/CONNECT_TIME/IDLE_TIME. การบังคับใช้บาง resource limits ขึ้นกับ `RESOURCE_LIMIT` แต่ password limits มี enforcement ของตัวเอง.

**Application impact:** เมื่อ profile เปลี่ยน อาจเกิด connection churn/expired/locked accounts หรือ sessions ล้มเหลว จึงต้องประสาน app pool และ service accounts; อย่าแก้ด้วยการปิดทุก limits.

```sql
SELECT username,profile,account_status FROM dba_users ORDER BY username;
SELECT profile,resource_name,resource_type,limit
FROM dba_profiles ORDER BY profile,resource_name;
SELECT name,value FROM v$parameter WHERE name='resource_limit';
```

**Scenario:** service account login ไม่ผ่านหลัง credential policy เปลี่ยน — ตรวจ expiry, lock, policy, app secret store, audit log; วาง remediation ที่ไม่ลดความปลอดภัย.

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

## Source-objective deepening — Profile Lifecycle and Password Verification Functions

นอกจากอ่าน profile แล้ว วัตถุประสงค์ของ Lesson 21 รวมการ **create and assign profiles** และการใช้ **Oracle-supplied password verification functions** ภายใน password policy. Oracle ships built-in password verification functions/scripts in supported versions, but function name, complexity rules, available scripts and installation process may change with releases. ตรวจ current 19c/26ai security guidance และ OS environment ห้าม copy legacy sample password policy มาใช้เป็นมาตรฐานทันที.

- Profiles มีได้หนึ่ง profile ต่อ user ในขณะหนึ่ง; เปลี่ยน profile อาจมีผลหลัง reconnect หรือเมื่อ enforcement condition เข้ามา
- Password restrictions (`FAILED_LOGIN_ATTEMPTS`, `PASSWORD_LIFE_TIME`, `PASSWORD_VERIFY_FUNCTION`) ต่างจาก resource restrictions (`SESSIONS_PER_USER`, `CPU_PER_SESSION`)
- สำหรับ resource constraints ต้องตรวจ `RESOURCE_LIMIT` enforcement ส่วน password policies ไม่ได้เป็น synonym ของ parameter นี้
- ก่อนเปลี่ยน profile ต้องวาง secret rotation, service accounts, app pool, monitoring และ rollback

```sql
SELECT username,profile,account_status FROM dba_users ORDER BY username;
SELECT profile,resource_name,resource_type,limit
FROM dba_profiles
WHERE resource_name IN ('PASSWORD_VERIFY_FUNCTION','PASSWORD_LIFE_TIME','SESSIONS_PER_USER','FAILED_LOGIN_ATTEMPTS')
ORDER BY profile,resource_name;
```

**Lab tabletop:** ออกแบบ policy แยก human DBA vs noninteractive app account; ระบุ MFA/secret vault, lockout risk, failed login alerting และ legal/security policy. ห้าม disable password function เพื่อ bypass compliance.
