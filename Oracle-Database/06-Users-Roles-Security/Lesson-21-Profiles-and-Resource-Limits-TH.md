# Lesson 21 — Configuring User Resource Limits (ภาษาไทย)

> 🧠 **ภาพจำก่อนอ่าน:** 👤 Identity → 🔑 Access → 🛡️ Controls  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Security index](./README.md) · [Lab 10](../10-Labs/Lab-10-Users-Roles-Security-Inspection.md) · [👤 Identity Fundamentals: Lesson 19](./Lesson-19-User-Accounts-TH.md)

> **Provenance:** Oracle University 19c Administration Workshop Lesson 21 topic-level alignment. Original Thai learning material; not full page-by-page source fidelity. SQL is read-only; live test NOT RUN. Version-specific behavior of 26ai must be confirmed before change.

## 🎯 เป้าหมายเฉพาะ Lesson นี้
- ตรวจ `DBA_PROFILES` และ `DBA_USERS` เพื่อเชื่อม User กับ Password/Resource Policy
- แยก Password-Rule Enforcement จาก `RESOURCE_LIMIT` และ Session Limits
- ประเมินผลกระทบต่อ Service Accounts, Secret Rotation และ Connection Pool ก่อนเปลี่ยน Profile

> พื้นฐานการแยก Identity/Authentication/Authorization และ Scope อยู่ใน [Lesson 19](./Lesson-19-User-Accounts-TH.md)

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

## 🔎 Workflow เมื่อเกิด Incident — Profile Lifecycle & Resource Limits
1. เก็บ ORA Error, เวลา, User/Service Account และ Connection Pool Symptoms โดยปิดบัง Secret
2. อ่าน Account Status, Assigned Profile และ Limits จริงใน Container ที่เกี่ยวข้อง
3. แยก Password Expiry/Lockout จาก Resource Session Limit และ Application Secret Mismatch
4. ประเมิน Policy/Compliance, Password Verification Function, Monitoring และ Rollback ก่อนขอ Change
5. หลังแก้ใน Environment ที่อนุมัติ ตรวจ Reconnect, Pool Recovery และ Failed Login Trend

## 🧠 Self-check — Profile Lifecycle & Resource Limits
1. Password Limits กับ Resource Limits ภายใต้ Profile ใช้เงื่อนไขบังคับเหมือนกันหรือไม่?
2. การเปลี่ยน Profile ของ Service Account อาจทำให้ Connection Pool มีอาการอย่างไร?
3. จะตรวจ `RESOURCE_LIMIT` กับ `DBA_PROFILES` อย่างไรโดยไม่แก้ Parameter?
4. เหตุใดการปิด Password Policy เพื่อให้ App Login ได้จึงไม่ใช่ Root Cause Fix?

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
