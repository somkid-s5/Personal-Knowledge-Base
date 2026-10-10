# Lab 01 — Inspect Oracle Architecture (Read-only)

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 🗄️ Data → ⚙️ Process → 🩺 Health → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Oracle learning hub](../README.md) · [Lesson 01](../01-Core-Architecture/Lesson-01-Oracle-Database-Architecture-TH.md)

> **Companion lab / original Thai exercises** — not an Oracle University Activity Guide reproduction.  
> **Validation:** static review only; no live instance accessed.  
> **Safety:** SELECT-only. Do not start, stop, alter, or grant anything on production.

## Prerequisites

- Lab/sandbox Oracle 19c or a supported current instance; SQL*Plus or SQLcl connected to CDB root with a **read-only account that already has privileges** on the required dynamic views.
- If a query fails with ORA-00942 or ORA-01031, ask the DBA for approved view access rather than granting `SELECT ANY DICTIONARY` or `DBA` automatically.
- Some views are container-scoped; use `SHOW CON_NAME` and record your container before comparing outputs.
- Do not paste real usernames, hostnames, IP addresses or connection strings containing credentials into public GitHub issues.

## Task 1 — Identity and lifecycle

```sql
SHOW CON_NAME
SELECT instance_name, host_name, status, startup_time
FROM v$instance;

SELECT name, open_mode, database_role, log_mode, cdb
FROM v$database;
```

**Expected:** instance status (typically OPEN), database open mode and role. In 19c or 26ai a CDB may still contain PDBs that are not open.

## Task 2 — PDB readiness (CDB only)

```sql
SELECT con_id, name, open_mode, restricted
FROM v$pdbs ORDER BY con_id;
```

**Expected:** PDB rows with READ WRITE / READ ONLY / MOUNTED as applicable. In a non-CDB 19c environment, skip and explain why.

## Task 3 — Explore shared memory

```sql
SELECT component, current_size
FROM v$sga_dynamic_components
WHERE current_size > 0 ORDER BY current_size DESC;

SELECT name, value
FROM v$pgastat
WHERE name IN ('total PGA allocated','total PGA inuse','aggregate PGA target parameter');
```

**Expected:** see SGA components and PGA statistics, but values and names depend on configuration and version. Do not change `SGA_TARGET`/`PGA_AGGREGATE_TARGET` in this exercise.

## Task 4 — Identify storage file types

```sql
SELECT file#, name FROM v$datafile ORDER BY file#;
SELECT name FROM v$controlfile;
SELECT group#, member FROM v$logfile ORDER BY group#, member;
```

**Expected:** datafile, control file and redo member paths. This is **metadata-only**: do not delete/move any file.

## Task 5 — Background process sample

```sql
SELECT pname, COUNT(*) AS process_count
FROM v$process
WHERE pname IS NOT NULL
GROUP BY pname
ORDER BY pname;
```

**Expected:** system processes on the instance. Exact list changes by version/configuration.

## Task 6 — Your incident analysis

Scenario: TCP port to listener reachable; app still reports service unavailable.

Write down:
1. What is `V$INSTANCE.STATUS`?
2. What is `V$DATABASE.OPEN_MODE`?
3. Is the correct PDB open?
4. What service does JDBC request, and is it registered with listener? (listener/service examination is a **separate** network lab)
5. Is the issue connectivity, database availability or authorization?

## Exit criteria

- [ ] Can distinguish instance/database and CDB/PDB states
- [ ] SGA/PGA explained accurately
- [ ] Datafile/controlfile/redo separated
- [ ] No resource modified
- [ ] Relevant output recorded without sensitive details

**Cleanup:** none — this lab changes no resources. **Do not run `SHUTDOWN`, `STARTUP` or `ALTER SYSTEM` as part of this exercise.**

## Sources

- [Oracle 26ai — V$INSTANCE](https://docs.oracle.com/en/database/oracle/oracle-database/26/refrn/V-INSTANCE.html)
- [Oracle 26ai — Database Concepts](https://docs.oracle.com/en/database/oracle/oracle-database/26/cncpt/introduction-to-oracle-database.html)
