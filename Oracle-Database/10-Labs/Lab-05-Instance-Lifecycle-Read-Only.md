# Lab 05 — Oracle Instance Lifecycle: Read-only Inspection & Change Simulation

[Lesson 05](../02-Instance-Administration/Lesson-05-Instance-Startup-Shutdown-TH.md) · [Lab Index](./README.md)

> **Safety:** This is a read-only and tabletop lab. **Do not actually run STARTUP, SHUTDOWN, ALTER DATABASE or ALTER PLUGGABLE DATABASE** in this exercise. No live deployment/restart has been executed. No Oracle University proprietary steps copied.

## Prerequisites

- Authorized existing sandbox Oracle 19c or 26ai database; an ordinary account with specific grants to read dynamic performance views
- SQL*Plus/SQLcl; access to read-only instance state
- Never print secrets, internal hostnames or production identifiers in public notes

## Task 1 — Identify the actual scope

```sql
SHOW USER
SHOW CON_NAME
SELECT instance_name, status, startup_time FROM v$instance;
SELECT name, open_mode, database_role, cdb FROM v$database;
SELECT con_id, name, open_mode FROM v$pdbs ORDER BY con_id;
```

Record: instance, CDB root or PDB, startup time, current open mode. If using legacy non-CDB 19c, explain why PDB state does not apply.

## Task 2 — Inspect parameters and diagnostics

```sql
SELECT name, value FROM v$parameter
WHERE name IN ('db_name','db_unique_name','instance_name','spfile');
SELECT name, value FROM v$diag_info
WHERE name IN ('Diag Alert','Diag Trace');
```

Describe difference between current parameter values and persistent SPFILE state; **do not change settings**.

## Task 3 — Tabletop: choose mode

Fill out:

| Scenario | Recommended review | Rationale / risk |
|---|---|---|
| Routine planned outage; wait until sessions leave | NORMAL vs TRANSACTIONAL vs IMMEDIATE | |
| Active financial transaction must complete | TRANSACTIONAL | |
| Application stuck with open sessions and approved downtime | IMMEDIATE | |
| Critical instance cannot complete orderly shutdown | ABORT only with DBA approval | |
| Database is Oracle Restart-managed | SRVCTL change plan, not ad-hoc SQL*Plus | |

**No command execution** for these scenarios.

## Task 4 — Recovery thought experiment

A host loses power. Listener is running after reboot, but the database remains MOUNTED. What five pieces of evidence do you collect *before* attempting `ALTER DATABASE OPEN`? Think about alert log, database open mode, control files, storage, required recovery and managed startup services.

## Task 5 — Change runbook worksheet

- DB identity / CDB / PDB / service:
- Host / Oracle Home / environment:
- Standalone vs Restart vs RAC vs managed:
- Planned mode and authorized operator:
- Application owners informed:
- Backup + restore evidence:
- Before/after monitoring evidence:
- Rollback and escalation contact:

## Exit criteria

- [ ] Describe NOMOUNT, MOUNT and OPEN without notes
- [ ] Compare all four shutdown modes and their transaction consequences
- [ ] Verify correct CDB/PDB scope
- [ ] Identify appropriate service manager
- [ ] Explain instance recovery after ABORT
- [ ] No actual lifecycle mutation performed

**Cleanup:** none. Close SQL session only.

## References

- [19c DBA Guide — Starting Up and Shutting Down](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/starting-up-and-shutting-down.html)
- [26ai SQL*Plus SHUTDOWN](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqpug/SHUTDOWN.html)
