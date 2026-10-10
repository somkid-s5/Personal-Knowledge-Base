# Lesson 28 — Automated Maintenance Tasks: Managing Tasks and Windows (ภาษาไทย)

[Data Movement & Maintenance](./README.md) · [Lab 12](../10-Labs/Lab-12-Automated-Maintenance-Inspection.md)

> Original Thai material mapped to Oracle University 19c Administration Workshop Lesson 28. Page-level source fidelity and live execution **PENDING**. Examples are read-only; do not reconfigure Scheduler/Resource Manager during this lesson.

## Outcomes
เข้าใจ Oracle Scheduler `WINDOW`, `WINDOW_GROUP`, `MAINTENANCE_WINDOW_GROUP`, auto tasks, job histories, resource plan และการเปลี่ยน schedule ที่ไม่กระทบ business peak

## 1. How windows operate

Window เป็นช่วงเวลาที่ Scheduler กำหนดให้ job หรือ resource plan ทำงาน. Automated maintenance framework ใช้ windows ที่อยู่ใน `MAINTENANCE_WINDOW_GROUP` โดยมักมี predefined windows สำหรับวันในสัปดาห์.

~~~mermaid
flowchart TD
 A[Oracle Scheduler] --> W[Maintenance window]
 W --> G[MAINTENANCE_WINDOW_GROUP]
 G --> J[ORA$AT scheduled job]
 J --> R[Resource Manager plan]
 J --> H[Execution result / job history]
~~~

**Important:** ไม่ใช่ทุก Scheduler window จะกระตุ้น AutoTask; ต้องอยู่ใน maintenance group และมี client enabled. Window open ไม่ได้แปลว่าทุก job สำเร็จ.

## 2. Time, resource and workload

- `REPEAT_INTERVAL` เป็น calendaring expression; timezone/start date มีผลต่อเวลาจริง
- `DURATION`, `ENABLED` และ `RESOURCE_PLAN` สำคัญกับ performance
- `ORA$AUTOTASK` เป็น subplan ใน default maintenance plan; capacity ที่ตั้งไม่ควรถูกตีความว่า reservation CPU ตลอดเวลา
- หากองค์กร peak ตอนกลางคืน การเปลี่ยน maintenance window อาจเหมาะกว่า disable automatic optimizer stats แต่ต้องวิเคราะห์ก่อน

## 3. Inspect without changing anything

~~~sql
SHOW CON_NAME
SELECT window_name,enabled,repeat_interval,duration,resource_plan
FROM dba_scheduler_windows
ORDER BY window_name;

SELECT window_group_name,window_name
FROM dba_scheduler_wingroup_members
WHERE window_group_name='MAINTENANCE_WINDOW_GROUP'
ORDER BY window_name;

SELECT client_name,status
FROM dba_autotask_client ORDER BY client_name;
~~~

Inspecting scheduler config may need approved privileges. Confirm actual dictionary columns from installed Oracle reference if behavior differs; never require SYSDBA for a learning lab.

## 4. Change design — tabletop only

สำหรับกรณี maintenance window ทับกับ business peak:
1. เก็บ peak traffic metrics, timestamps และ timezone
2. เทียบ autotask job history กับ problem timeframe; correlation ≠ causation
3. ระบุ windows that belong to `MAINTENANCE_WINDOW_GROUP`
4. เสนอ alternative slot ที่มี free CPU/I/O และ compliance backup window
5. ตรวจงานที่ต้องการ feature license หรือ elevated privileges
6. ขอ approval และวาง rollback window settings ที่บันทึกไว้
7. หลัง change ให้ตรวจว่ามี job execution และ plan regression หรือไม่

## 5. Troubleshooting cases

| Symptom | Evidence |
|---|---|
| Stats not updated | stale stats, task client status, maintenance group membership |
| Auto jobs failed | scheduler and autotask job history, errors and privileges |
| DB slows at night | job start/end timeline, user workload, storage waits |
| Window configuration seems ignored | timezone, repeat interval, group membership, job priority |
| SQL plan regresses after auto stats | versioned SQL plan and statistics metadata; licensing restrictions |

**ไม่รัน** `DBMS_AUTO_TASK_ADMIN.DISABLE`, `DBMS_SCHEDULER.SET_ATTRIBUTE`, `DBMS_SCHEDULER.OPEN_WINDOW`, `ALTER SYSTEM` ใน Lab นี้ เพราะเป็น state-changing procedures.

## 6. Self-check
1. Window กับ AutoTask Client ต่างกันอย่างไร?
2. ทำไม scheduler job history จำเป็นต่อการพิสูจน์ผลสำเร็จ?
3. ถ้า Window เปิดตรงเวลา แต่ไม่มี AutoTask ควรเช็กอะไร?
4. จะเลื่อน maintenance ไป slot อื่นอย่างไรโดยไม่ทำลาย backup schedule?
5. การเปลี่ยน resource plan ต้องประเมินใครบ้าง?

## Sources
- [Oracle 26ai Managing Automated Database Maintenance Tasks](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-automated-database-maintenance-tasks.html)
- [Oracle 26ai Database Resource Management & Task Scheduling](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/database-resource-management-and-task-scheduling.html)


## Source-objective deepening — Enable/Disable Clients and Resource Plans

Lesson 28 ให้รู้จักขั้นตอน configuration ด้วย ไม่ใช่เพียงอ่าน Scheduler windows.

**Client control:** แนวคิด `DBMS_AUTO_TASK_ADMIN.ENABLE`/`DISABLE` สามารถควบคุม AutoTask client ใน scope ที่ supported; การ disable optimizer stats แบบทั่วระบบมีผลต่อ future plan quality. ห้าม execute บน production ตาม Workbook นี้.

**Window lifecycle:** `DBMS_SCHEDULER` สามารถ create, set attributes, enable/disable, drop windows และจัด membership ใน `MAINTENANCE_WINDOW_GROUP` ตาม privileges. ต้องตรวจ `REPEAT_INTERVAL`, `DURATION`, timezone และ resource plan ใน window ก่อน change. การ remove window จาก group ไม่เท่ากับลบ scheduler window ทุกกรณี.

**Resource allocation:** Resource Manager plan มีผลต่อ priority/CPU allocation ของ auto tasks เทียบ application workload; อย่าถือว่า setting 25% คือการใช้ CPU 25% คงที่. ต้องเทียบ resource waits, job duration และ peak latency เพื่อประเมิน.

**Change lab (tabletop):** ในระบบทดสอบมี workload peak 22:00–23:00 และ window เริ่ม 22:00 ให้เสนอ: (1) baseline (2) ข้อดีข้อเสียเลื่อน window vs disable one client (3) resource plan design (4) approved SQL change set ที่ยังไม่ execute (5) rollback/re-enable plan (6) post-change verification of task completion.

Reference: [26ai Managing Automated Maintenance Tasks](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-automated-database-maintenance-tasks.html).
