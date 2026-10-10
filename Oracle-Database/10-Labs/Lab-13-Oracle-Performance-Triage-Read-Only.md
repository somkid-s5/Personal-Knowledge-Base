# Lab 13 — Oracle Performance Triage & SQL Plan Inspection (Read-only)

[Lesson 29](../07-Monitoring-Troubleshooting/Lesson-29-Database-Performance-Overview-TH.md) · [Lesson 30](../07-Monitoring-Troubleshooting/Lesson-30-Monitoring-Database-Performance-TH.md) · [Lesson 31](../07-Monitoring-Troubleshooting/Lesson-31-Analyzing-SQL-and-Access-Paths-TH.md)

> **Original companion exercise. NOT RUN on an Oracle instance.** The Activity Guide is proprietary and not reproduced. Requires authorized account with approved SELECT privileges; no AWR/ASH/ADDM, Tuning Pack, DDL, ALTER SYSTEM, KILL SESSION, or EXPLAIN PLAN writes.

## Safety and scope
- Use existing disposable lab/PDB if available; determine DB version, timezone, current user/service, instance and PDB.
- Never publish real SQL texts/binds, usernames, customer data or internal IPs in public GitHub.
- Do not grant SYSDBA or SELECT ANY DICTIONARY just to pass this exercise; if metadata unavailable, mark NOT AUTHORIZED.

## Task 1 — Establish identity and availability

```sql
SHOW USER
SHOW CON_NAME
SELECT instance_name,status,startup_time FROM v$instance;
SELECT name,open_mode,cdb FROM v$database;
SELECT con_id,name,open_mode FROM v$pdbs ORDER BY con_id;
```

Expected: identify instance and PDB; PDB mode independent from CDB open state.

## Task 2 — Session and resource snapshot

```sql
SELECT status,COUNT(*) session_count FROM v$session
WHERE type='USER' GROUP BY status;

SELECT resource_name,current_utilization,max_utilization,limit_value
FROM v$resource_limit WHERE resource_name IN ('processes','sessions');

SELECT wait_class,total_waits,time_waited
FROM v$system_wait_class ORDER BY time_waited DESC;
```

Interpret: `V$RESOURCE_LIMIT` MAX_UTILIZATION is high-water mark; counters accumulate and are not per-minute rates. Record 2 snapshots with observation interval **only in an authorized test**; do not create a high-frequency polling loop on production.

## Task 3 — Which user sessions are waiting?

```sql
SELECT sid,serial#,username,status,wait_class,event,blocking_session
FROM v$session WHERE type='USER' AND username IS NOT NULL
FETCH FIRST 20 ROWS ONLY;
```

Sessions showing INACTIVE do not prove JDBC leak. Correlate pool metrics, last call and app logs.

## Task 4 — SQL candidate inventory

```sql
SELECT sql_id,child_number,plan_hash_value,executions,elapsed_time
FROM v$sql
WHERE executions>0
ORDER BY elapsed_time DESC FETCH FIRST 10 ROWS ONLY;
```

Cumulative microseconds need deltas and matching executions for a rate/average. Take care that SQL text/binds may be sensitive.

## Task 5 — Cursor execution plan (optional)

```sql
-- Only with approved DBMS_XPLAN and V$ grants.
-- Replace placeholder with an existing authorized SQL_ID.
SELECT plan_table_output
FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(
  sql_id => 'abcdef1234567', cursor_child_no => 0, format => 'TYPICAL'));
```

Do not run `EXPLAIN PLAN` because it may write into PLAN_TABLE. Do not call `DISPLAY_AWR` or other Diagnostics Pack methods without licensing. `DISPLAY_CURSOR` can return no rows if cursor aged out.

## Task 6 — Two realistic incident drills

**Scenario A:** Oracle listener responds; application Tomcat reports ORA-12519 intermittently, and restarting Tomcat helps for hours. Create timeline of listener handler availability, process/session headroom, JDBC pool use and connection lifetimes. State what cannot be inferred from one snapshot.

**Scenario B:** SQL query latency increases after a maintenance window. Compare before/after optimizer stats timestamps, plan hash, estimated rows, waits and application load. Suggest one safe hypothesis to test in a sandbox; don't change plan hints/indexes in production based only on suspicion.

## Completion
- [ ] Explain DB time/response time, throughput and wait classes
- [ ] Distinguish instant session counts vs cumulative wait stats
- [ ] Evaluate SQL plan/cardinality and feature license
- [ ] Outline root-cause hypothesis and change/rollback evidence
- [ ] Zero state mutations
- [ ] Actual Oracle execution marked NOT RUN

Cleanup: disconnect only.

References:
- <https://docs.oracle.com/en/database/oracle/oracle-database/26/tgdba/measuring-database-performance.html>
- <https://docs.oracle.com/en/database/oracle/oracle-database/26/tgsql/generating-and-displaying-execution-plans.html>
- <https://docs.oracle.com/en/database/oracle/oracle-database/26/dblic/Licensing-Information.html>
