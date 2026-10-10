# Lesson 20 — Configuring Privilege and Role Authorization (ภาษาไทย)

[Security index](./README.md) · [Lab 10](../10-Labs/Lab-10-Users-Roles-Security-Inspection.md)

> **Provenance:** Oracle University 19c Administration Workshop Lesson 20 topic-level alignment. Original Thai learning material; not full page-by-page source fidelity. SQL is read-only; live test NOT RUN. Version-specific behavior of 26ai must be confirmed before change.

## เป้าหมาย
- แยก identity, authentication, authorization, resource limits และ auditing
- ตรวจ scope ของ instance/CDB/PDB และสิทธิ์ก่อนแก้ปัญหาบัญชีผู้ใช้
- ใช้ least privilege และเก็บ evidence ที่ไม่เผย credential
- อธิบาย failure mode และ verification/rollback ได้

## เนื้อหาและแนวปฏิบัติ

**System privilege** เช่น CREATE SESSION/CREATE TABLE ใช้กับการกระทำระดับฐานข้อมูล; **Object privilege** เช่น SELECT บน schema.table จำกัดเฉพาะ object; **Role** รวมสิทธิ์เพื่อมอบหมายได้. การเปิด/ปิด roles และ definer-rights PL/SQL มีผลต่อการมองเห็นสิทธิ์.

**Design:** application runtime role ไม่ควรมี DBA/SELECT ANY TABLE. สำหรับ stored definer-rights code สิทธิ์ object ที่ใช้ภายในมักต้อง grant ตรงให้ owner แทนการพึ่ง role. ตรวจ `CURRENT_SCHEMA` กับชื่อ owner ใน error ORA-00942.

~~~sql
SHOW CON_NAME
SELECT grantee,privilege FROM dba_sys_privs WHERE grantee='APP_USER';
SELECT grantee,granted_role FROM dba_role_privs WHERE grantee='APP_USER';
SELECT owner,table_name,grantee,privilege
FROM dba_tab_privs WHERE grantee='APP_USER';
~~~

**Least privilege exercise:** หา schema owner, SELECT ที่ต้องการ, direct grant หรือ role ที่เข้ากับ execution context แล้วเสนอ change/rollback ก่อนใช้ GRANT จริง.

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


## Source-objective deepening — Revoke Privileges / Role Hierarchies and Scope

ต้นฉบับ Lesson 20 ครอบคลุมทั้ง **grant และ revoke**, common/local grants และ roles-to-roles. DBA ต้องทำ **permission graph** แสดง granted roles, inherited privileges และ direct object privileges ก่อน revoke; การถอน grant หนึ่งรายการอาจไม่ทำให้ effective privilege หายถ้ายังได้สิทธิ์ผ่านอีก role หรือ common grant.

- `WITH ADMIN OPTION` และ `WITH GRANT OPTION` ใช้กับบริบทที่แตกต่างกัน; การถอนสิทธิ์อาจมี behavior ต่อ dependent grants ต่างกัน (ต้องอ่าน Oracle security reference ก่อน action)
- Application definer-rights PL/SQL อาจไม่เห็น privileges ที่ได้ผ่าน role; direct grants สำคัญ
- การ revoke `CREATE SESSION`, SELECT, EXECUTE หรือ role ใน production อาจทำ application outage ได้แม้ SQL statement สำเร็จ
- Common privileges ใน CDB vs local PDB privileges แตกต่างกัน; `CONTAINER=ALL` ไม่ควรถูกคัดลอกไปใช้โดยไม่ตรวจ root scope

**Read-only privilege map:** ตรวจ `DBA_SYS_PRIVS`, `DBA_TAB_PRIVS`, `DBA_ROLE_PRIVS` และ roles ที่ถูก grant ผ่านหลายชั้น; จัดทำ before/after expected privilege matrix บนกระดาษ ก่อนลงมือแก้ใน sandbox.

**Self-check:** ถ้า REVOKE object grant สำเร็จ แต่ user ยัง SELECT ได้ สาเหตุใดเป็นไปได้บ้าง? หาก application procedure fail หลัง REVOKE ต้อง rollback grant อย่างไรให้ least privilege คงเดิม?
