# Lab 02 — Connection & Identity Inspection (Read-only)

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 👤 Identity → 🔑 Access → 🛡️ Controls → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Oracle Database](../README.md) · [Lesson 02](../01-Core-Architecture/Lesson-02-Accessing-Oracle-Database-TH.md)

> Companion exercise, not copied from Oracle University Activity Guide. **Static-only; not executed.**
> Queries are SELECT-only, except SQL*Plus client-side session connect. Use an authorized sandbox account; never paste passwords.

## Prerequisites

- Oracle 19c or current compatible sandbox with a known hostname, port and **actual service name** from DBA
- SQL*Plus or SQLcl; one ordinary application/test user with `CREATE SESSION`
- No privileged account needed for tasks 1–3
- For task 4, listener command requires access to authorized server/client environment; skip if unavailable

## Task 1 — Verify client location

Linux/macOS Bash:

```bash
command -v sqlplus
printf 'TNS_ADMIN=%s\n' "${TNS_ADMIN:-not-set}"
```

Windows PowerShell:

```powershell
Get-Command sqlplus -ErrorAction SilentlyContinue
$env:TNS_ADMIN
```

**Expected:** path to correct executable and TNS_ADMIN if set; a missing TNS_ADMIN alone is not proof of connection failure

## Task 2 — Connect using Easy Connect (password prompted)

```bash
sqlplus 'appuser@//db.example.test:1521/salespdb.example.test'
```

Replace placeholders with sandbox values. **Do not include password on command line.**

## Task 3 — Check target

```sql
SHOW USER
SHOW CON_NAME
SELECT
  sys_context('USERENV','DB_NAME') db_name,
  sys_context('USERENV','INSTANCE_NAME') instance_name,
  sys_context('USERENV','SERVICE_NAME') service_name,
  sys_context('USERENV','CON_NAME') con_name,
  sys_context('USERENV','SESSION_USER') session_user
FROM dual;
```

**Expected:** user, instance, service and container correspond to the assigned sandbox target. Record redacted output only. No DDL or ALTER.

## Task 4 — Listener observation (optional authorized host only)

```bash
lsnrctl status
lsnrctl services
```

**Expected:** endpoint, registered service and handler state. **Do not run stop/start/reload**. `tnsping` checks resolution/reachability to the listener, not successful DB authentication or an available service handler.

## Task 5 — Fault analysis (no fault injection)

For each simulated failure, write first three tests:
- ORA-12154
- ORA-12514
- ORA-12519
- ORA-01017

Try to identify the failing boundary: alias resolution, TCP listener, registered service/handler, instance/PDB state or credentials.

## 🩺 Extended official-reference scenario — ORA-12519 (read-only)

จาก `lsnrctl services` ตรวจ `READY`, `BLOCKED`, service name และ handler counters ก่อนวินิจฉัย. ORA-12519 = ไม่มี appropriate **available** service handler ไม่ใช่สัญญาณบังคับว่าต้องเพิ่ม `PROCESSES` หรือ Restart. หากมี approved View Access ให้เก็บ Trend เพิ่มแบบอ่านอย่างเดียว:

```sql
SELECT resource_name,current_utilization,max_utilization,limit_value
FROM v$resource_limit
WHERE resource_name IN ('processes','sessions');
```

**ขอบเขตการตีความ:** Query จาก session/database instance ณ เวลาที่ตรวจ ไม่แทน Handler State ใน Listener. [Oracle Error Definition](https://docs.oracle.com/en/error-help/db/ora-12519/) · [Lesson 09 — Listener](../03-Networking-Listener/Lesson-09-Configuring-and-Administering-the-Listener-TH.md).

## Evidence & cleanup

- [ ] Record which client/Oracle home you used
- [ ] Confirm service and container without displaying sensitive details
- [ ] Explain why service != SID != schema
- [ ] Troubleshoot four simulated errors without destructive changes
- [ ] Record no secrets or production endpoint details

Cleanup: `EXIT` SQL*Plus. No database resources were created, modified, or deleted.

## References

- [SQL*Plus 19c Starting Guide](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqpug/starting-SQL-Plus.html)
- [SQL*Plus 26ai CONNECT](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqpug/CONNECT.html)
- [26ai Listener Service Registration](https://docs.oracle.com/en/database/oracle/oracle-database/26/netag/service-registration1.html)

## 🧪 Sandbox Execution & Evidence (Optional)

[▶️ Runbook + Approved Read-only SQL Scripts](./Sandbox-Validation/README.md) · [📝 Expected vs Actual Evidence Template](./Sandbox-Validation/VALIDATION-EVIDENCE-TEMPLATE.md)

**Status: NOT_EXECUTED.** เมื่อมี Isolated Sandbox ที่ได้รับอนุญาต ให้เลือก Script ที่ตรงหัวข้อ, บันทึก Oracle Version/RU, Container/Privileges และ Expected vs Actual ลง Private Evidence. อย่าอ้างว่า GitHub Actions PASS เท่ากับรัน Lab จริง และห้าม Commit Raw Database Output ลง Public Repository.
