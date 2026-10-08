# Lesson 22 — Implementing Oracle Database Auditing (ภาษาไทย)

[Security index](./README.md) · [Lab 10](../10-Labs/Lab-10-Users-Roles-Security-Inspection.md)

> **Provenance:** Oracle University 19c Administration Workshop Lesson 22 topic-level alignment. Original Thai learning material; not full page-by-page source fidelity. SQL is read-only; live test NOT RUN. Version-specific behavior of 26ai must be confirmed before change.

## เป้าหมาย
- แยก identity, authentication, authorization, resource limits และ auditing
- ตรวจ scope ของ instance/CDB/PDB และสิทธิ์ก่อนแก้ปัญหาบัญชีผู้ใช้
- ใช้ least privilege และเก็บ evidence ที่ไม่เผย credential
- อธิบาย failure mode และ verification/rollback ได้

## เนื้อหาและแนวปฏิบัติ

**Unified auditing** บันทึกกิจกรรมที่กำหนดผ่าน policy โดยดู `UNIFIED_AUDIT_TRAIL`; แยกการสร้าง policy, การ enable policy และ audit records. `AUDIT_ADMIN` และ `AUDIT_VIEWER` เป็น roles ที่ควรแยกตามหน้าที่. Oracle 19c มี mixed/pure unified auditing deployment differences ต้องตรวจ installed state ก่อนอ้างพฤติกรรม.

**Governance:** scope CDB/PDB, policy condition, audited action, retention, access controls, personal/sensitive data, overhead และ incident correlation. ไม่ควรเปิด policy ครอบคลุมทุก SELECT โดยไม่มี capacity/security plan.

~~~sql
SHOW CON_NAME
SELECT policy_name,enabled_option,entity_name
FROM audit_unified_enabled_policies;
SELECT event_timestamp,dbusername,action_name,return_code
FROM unified_audit_trail
ORDER BY event_timestamp DESC FETCH FIRST 20 ROWS ONLY;
~~~

**Audit drill:** การไม่พบ event ไม่พิสูจน์ว่าไม่มีการกระทำ: ตรวจ enabled policies, scope, privileges, filters, write delay และระบบรวบรวม audit logs. ห้าม export unredacted audit trails ไป public repository.

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
