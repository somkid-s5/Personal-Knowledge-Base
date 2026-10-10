# Lab 12 — Oracle AutoTask, Maintenance Windows & Scheduler (Read-only)

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 🗄️ Data → ⚙️ Process → 🩺 Health → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Lesson 27](../08-Data-Movement-Maintenance/Lesson-27-Automated-Maintenance-Overview-TH.md) · [Lesson 28](../08-Data-Movement-Maintenance/Lesson-28-Maintenance-Windows-and-Tasks-TH.md)

> Original companion practice, **NOT EXECUTED**. Never enable/disable AutoTask, open/close maintenance windows, tune resource plans or run privileged advisor packages in this exercise.

## Prerequisites
Authorized lab SQL account with narrowly scoped read permissions to Scheduler/AutoTask dictionary views, and known Oracle version/PDB. Verify licensing before invoking any Diagnostics or Tuning Pack features. SELECTing metadata is not equivalent to running licensed SQL Tuning Advisor.

## Task 1 — Identify scope and clients

```sql
SHOW USER
SHOW CON_NAME
SELECT client_name,status FROM dba_autotask_client ORDER BY client_name;
```

Which tasks are enabled? Why doesn't enabled guarantee success?

## Task 2 — Inspect scheduled windows

```sql
SELECT window_name,enabled,repeat_interval,duration,resource_plan
FROM dba_scheduler_windows ORDER BY window_name;
SELECT window_group_name,window_name
FROM dba_scheduler_wingroup_members
WHERE window_group_name='MAINTENANCE_WINDOW_GROUP'
ORDER BY window_name;
```

Record timezone, calendar expression, effective timing and expected workload peaks; report whether members are actually enabled.

## Task 3 — Confirm historic job outcomes

```sql
SELECT client_name,window_name,job_status,job_start_time,job_duration,job_error
FROM dba_autotask_job_history
ORDER BY job_start_time DESC FETCH FIRST 20 ROWS ONLY;
```

**Expected:** completed jobs with statuses, not guaranteed success. In some configurations history may be empty for authorized user. Separate actual job completion from client enabled state.

## Task 4 — Analyze nightly CPU spike

Incident: users report slow queries 22:00–23:00. DBA observes a predefined maintenance window starting at 22:00.

1. Capture application latency, SQL_IDs if available, instance CPU, wait events and timestamps.
2. Correlate maintenance job history with the same time range; coincidence does not prove cause.
3. Examine optimizer stats changes and plan regression in permitted tooling.
4. Check Resource Manager allocations and job durations.
5. Propose a controlled alternative window instead of immediately disabling auto stats.
6. Define rollback, validation and owner approvals.

## Exit criteria
- [ ] Correctly explain window/group/client/job distinctions
- [ ] Read-only SQL output interpreted with privilege/version context
- [ ] Licensing implications recognized
- [ ] Incident timeline and change proposal drafted
- [ ] No Scheduler/AutoTask mutations executed
- [ ] Lab execution status explicitly NOT RUN

Cleanup: none beyond disconnect.

Official docs: <https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-automated-database-maintenance-tasks.html>
