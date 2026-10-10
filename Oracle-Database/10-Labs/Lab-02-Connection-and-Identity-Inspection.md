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
