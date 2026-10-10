# Lab 06 — Parameters, Resource Limits & ADR (Read-only)

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 🗄️ Data → ⚙️ Process → 🩺 Health → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Lesson 06](../02-Instance-Administration/Lesson-06-Managing-Database-Instances-TH.md) · [Labs](./README.md)

> **Original companion lab. Static review only; no live database execution.** All database tasks are SELECT-only. Not copied from Oracle University Activity Guide.

## Prerequisites
- Approved Oracle 19c or 26ai sandbox / read-only DB account with specific grants on `V_$INSTANCE`, `V_$PARAMETER`, `V_$SPPARAMETER`, `V_$RESOURCE_LIMIT`, `V_$DIAG_INFO`
- SQL*Plus or SQLcl; record timezone and observation timestamp outside the SQL session
- **Do not** run `ALTER SYSTEM`, `CREATE SPFILE`, `STARTUP`, `SHUTDOWN`, ADRCI purge or enable trace in this lab.

## Task A — Identify target

```sql
SHOW USER
SHOW CON_NAME
SELECT instance_name, host_name, status, startup_time FROM v$instance;
```

**Expected:** target identity and availability match the authorized environment; redact hostname before sharing.

## Task B — Current vs persistent settings

```sql
SELECT name, value, issys_modifiable
FROM v$parameter
WHERE name IN ('processes','sessions','open_cursors','sga_target','pga_aggregate_target','spfile')
ORDER BY name;

SELECT name, value, isspecified
FROM v$spparameter
WHERE name IN ('processes','sessions','open_cursors','sga_target','pga_aggregate_target')
ORDER BY name;
```

**Expected:** current and persistent values may differ; NULL/unspecified rows do not necessarily mean misconfiguration.

## Task C — Resource headroom

```sql
SELECT resource_name, current_utilization, max_utilization, limit_value
FROM v$resource_limit
WHERE resource_name IN ('sessions','processes','transactions');
```

Write: which resource is closest to its configured limit? If limit is a text value such as `UNLIMITED`, don't compute a percentage from it. Record a second snapshot at a different authorized time to avoid inferring trends from one row.

## Task D — Find diagnostic evidence

```sql
SELECT name, value FROM v$diag_info
WHERE name IN ('ADR Base','ADR Home','Diag Alert','Diag Trace');
SELECT name, value FROM v$parameter WHERE name='diagnostic_dest';
```

**Expected:** ADR paths. Do not upload raw trace files (could contain identifiers, SQL literals or sensitive data) to a public repository.

## Task E — Tabletop scenario

An application reports `ORA-12519` at 10:05, but at 10:20 the processes utilization is much lower than limit. Describe:
1. How to get timestamped evidence from alert log and listener/app pool;
2. Why a single post-incident snapshot cannot disprove transient saturation;
3. How to check for stale/leaked pooled connections;
4. Why increasing processes without app investigation may merely postpone the incident;
5. Which changes require separate approval and rollback plan.

## Exit checklist
- [ ] Current vs SPFILE parameters explained
- [ ] Static vs dynamic settings explained
- [ ] Processes/sessions resource view interpreted without fake percentages
- [ ] ADR/alert/trace location found using views
- [ ] Incident evidence timeline written
- [ ] No state-changing SQL executed

Cleanup: none; disconnect only.

## References
- [Oracle 19c initialization parameters](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/creating-and-configuring-an-oracle-database.html)
- [Oracle 26ai diagnostics](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/diagnosing-and-resolving-problems.html)
