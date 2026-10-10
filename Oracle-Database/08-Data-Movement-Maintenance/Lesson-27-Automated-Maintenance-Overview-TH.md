# Lesson 27 — Automated Maintenance Tasks Overview (ภาษาไทย)

[Data Movement & Maintenance](./README.md) · [Lab 12](../10-Labs/Lab-12-Automated-Maintenance-Inspection.md)

> Oracle University 19c Administration Workshop Lesson 27, mapped by topic. Original Thai teaching content; Student Guide line/page fidelity and live test **PENDING**. Oracle 26ai has edition/features and current tooling differences.

## Outcomes
อธิบาย Automatic Optimizer Statistics, Segment Advisor, SQL Tuning Advisor และ infrastructure ของ AutoTask; เข้าใจ Maintenance Window, Scheduler Job, resource allocation และ licensing; ตรวจว่า task ทำงานจริงจาก dictionary ไม่ใช่ดูแค่ ENABLED

## 1. Why database maintenance matters

ฐานข้อมูลมี workload, statistics และ physical space เปลี่ยนตลอด. Automation ช่วยลด manual upkeep แต่ไม่ควรทำให้ DBA มองไม่เห็นผลข้างเคียง. **Optimizer statistics** ใช้สำหรับ cardinality/selectivity decisions ไม่ใช่ตารางเก็บข้อมูลธุรกิจ และการ gather stats อาจทำให้ plan เปลี่ยนได้.

~~~mermaid
flowchart LR
 A[Maintenance window] --> B[AutoTask framework]
 B --> S[Optimizer statistics]
 B --> D[Segment Advisor]
 B --> T[SQL tuning tasks]
 S --> H[History / outcomes]
 D --> H
 T --> H
~~~

## 2. Three core task categories

| Task | Purpose | Operational concern |
|---|---|---|
| Automatic optimizer statistics collection | เก็บ stats ที่ขาดหรือ stale | SQL plans อาจเปลี่ยน; report/regression monitoring |
| Automatic Segment Advisor | วิเคราะห์ reclaimable segment space | เป็น recommendation ไม่ได้แปลว่าควร shrink ทันที |
| Automatic SQL Tuning Advisor | วิเคราะห์ high-load SQL ตาม feature/edition | **ต้องตรวจ Oracle Tuning Pack entitlement** ก่อนใช้ feature |
| Related statistics advisor/SPM capabilities | ตรวจ methodology และแผน optimizer ใน versions ที่รองรับ | availability/permission/licensing แตกต่างตาม version |

ไม่มีเหตุผลให้ใช้ performance packs แบบไม่ตรวจ license เพียงเพราะ query ทำงานได้. Oracle docs อธิบายการทำ AutoTask ผ่าน windows และ resource plan; บาง task มี user access/edition restrictions.

## 3. What does ENABLED mean?

- Task enabled ไม่ได้หมายความว่า job จะ execute สำเร็จทุก window
- Window disabled/closed, scheduling constraints, resource pressure หรือ job errors อาจทำให้ไม่มีผลลัพธ์
- Job history และ `DBA_AUTOTASK_CLIENT` ให้ข้อมูลเชิงสถิติ; `DBA_AUTOTASK_JOB_HISTORY` มีรายละเอียดรอบที่ผ่านมา
- ควรเทียบ timestamps/time zone กับ app peak traffic และ change windows

## 4. Read-only SQL

~~~sql
SHOW CON_NAME
SELECT client_name,status
FROM dba_autotask_client ORDER BY client_name;

SELECT client_name,job_status,job_start_time,job_duration
FROM dba_autotask_job_history
ORDER BY job_start_time DESC FETCH FIRST 20 ROWS ONLY;
~~~

การอ่าน dictionary views อาจต้อง DBA-approved privileges. คอลัมน์ `JOB_STATUS` และ `JOB_DURATION` ต้องตรวจกับ Oracle Database Reference ของ release ที่ติดตั้งก่อนใช้งาน production diagnostics; ให้เริ่มจาก `SELECT * FROM ... WHERE ROWNUM <= 3` ใน isolated sandbox ถ้าคอลัมน์ต่างกัน. **การ execute queries นี้ไม่ได้เปิด/ปิด tasks**.

## 5. Incident: SQL แย่ลงหลังคืนวันอาทิตย์

1. เก็บเวลา SQL latency และ SQL_ID ของอาการ
2. ตรวจ stats last_analyzed/stale (ตามสิทธิ์), scheduled auto tasks และ change timeline
3. ระบุว่ามี plan change หรือไม่; plan regression มีได้หลายสาเหตุ
4. หากไม่มี Diagnostics/Tuning Pack หลีกเลี่ยงใช้ AWR/ASH/ADDM หรือ SQL Tuning Advisor โดยไม่ตรวจสิทธิ์ license
5. ถ้าจะ disable task ให้มี rollback, app owner consent และ DBA change record

## 6. Review
1. Optimizer stats ต่างจาก data rows จริงอย่างไร?
2. Enabled task แต่ไม่มี history ควรตรวจอะไร?
3. Segment Advisor recommendation สำคัญอย่างไร?
4. Stats collection เปลี่ยน execution plan ได้อย่างไร?
5. ทำไมต้องตรวจ license ก่อนใช้ SQL Tuning Advisor?

## Official sources
- [Oracle 26ai Automated Maintenance](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-automated-database-maintenance-tasks.html)
- [Oracle 19c Administration](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/)
