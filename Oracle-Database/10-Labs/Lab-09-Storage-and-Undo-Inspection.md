# Lab 09 — Storage, Tablespaces and Undo (Read-only)

[Storage Lessons 15–18](../05-Storage-Tablespaces-Undo/README.md)

> Original companion lab; not official Activity Guide. Static authored, **not executed**. Only authorized read-only queries; do not alter production.

## Prerequisites
Oracle 19c or 26ai sandbox, SQLcl/SQL*Plus, privileges on DBA and V$ views. Record instance, container, timestamp and redact internal datafile paths.

## Task 1: inspect logical storage
~~~sql
SHOW CON_NAME
SELECT tablespace_name,contents,status,bigfile
FROM dba_tablespaces ORDER BY tablespace_name;
~~~
Explain permanent versus temporary versus undo and block/extent/segment/datafile relationship.

## Task 2: inspect file capacity
~~~sql
SELECT tablespace_name,file_name,bytes,autoextensible,maxbytes
FROM dba_data_files ORDER BY tablespace_name;
SELECT tablespace_name,file_name,bytes,autoextensible,maxbytes
FROM dba_temp_files ORDER BY tablespace_name;
SELECT tablespace_name,SUM(bytes) free_extent_bytes
FROM dba_free_space GROUP BY tablespace_name;
~~~
Allocated space, free extents, autoextend max and underlying filesystem/ASM capacity are separate. Do not sum current bytes and maxbytes as independent space.

## Task 3: investigate undo
~~~sql
SELECT tablespace_name,status,SUM(bytes) undo_bytes
FROM dba_undo_extents GROUP BY tablespace_name,status;
SELECT begin_time,end_time,tuned_undoretention,ssolderrcnt,nospaceerrcnt
FROM v$undostat ORDER BY begin_time DESC FETCH FIRST 12 ROWS ONLY;
~~~
Explain ACTIVE/UNEXPIRED/EXPIRED and that undo retention guarantee can prioritize retention at expense of DML.

## Troubleshooting workshop
- ORA-01653: identify segment, permanent tablespace, file limits, filesystem/ASM limits.
- ORA-01652: investigate TEMP usage and sort/hash workload.
- ORA-01555: inspect long readers, DML churn, undo retention, error timestamps.

## Exit checklist
- [ ] Classify physical versus logical space
- [ ] Explain growth headroom and underlying storage constraints
- [ ] Relate undo history to application query duration
- [ ] No mutating SQL executed; attach redacted evidence only

Cleanup: no resources created. Verification status: NOT RUN.

Official reference: https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-undo.html
