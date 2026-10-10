# Lab 11 — Data Movement Preflight & Read-only Inspection (Lessons 23–26)

[Data Movement Lessons](../08-Data-Movement-Maintenance/README.md) · [Oracle Hub](../README.md)

> **Lab type:** original companion workbook. **NOT RUN.** Oracle University Activity Guide task-level fidelity PENDING. Queries below are read-only. No expdp/impdp, sqlldr, CREATE DIRECTORY, DBMS_TTS procedure or file transfers.

## Prerequisites

- Authorized existing Oracle 19c/26ai lab account, correct PDB/service and narrowly approved dictionary access
- A **fictional** migration brief: source 19c, target 26ai, application schema `LAB_OWNER`, sample data including Thai text
- No secrets, live dump files, TDE keys or internal directories committed to GitHub
- Document source/target version, OS, charset, compatibility, storage, account, owner and observation time

## Task 1 — Scope and capability discovery

~~~sql
SHOW USER
SHOW CON_NAME
SELECT name,open_mode,cdb FROM v$database;
SELECT parameter,value FROM nls_database_parameters
WHERE parameter IN ('NLS_CHARACTERSET','NLS_NCHAR_CHARACTERSET');
SELECT directory_name,directory_path FROM dba_directories ORDER BY directory_name;
~~~

Explain: directory path is on the database server, not necessarily the client machine. Redact paths.

## Task 2 — Data Pump metadata/job inspection

~~~sql
SELECT owner_name,job_name,operation,job_mode,state
FROM dba_datapump_jobs ORDER BY owner_name,job_name;
SELECT owner,object_type,COUNT(*) object_count
FROM dba_objects WHERE owner='LAB_OWNER'
GROUP BY owner,object_type ORDER BY object_type;
~~~

No jobs in view is not an error. Rows from `DBA_OBJECTS` show metadata counts only; not business record equality.

## Task 3 — SQL*Loader worksheet (no load)

| Verification | Expected answer |
|---|---|
| Source file encoding | Explicitly identify BOM/character set |
| CSV parsing | Describe delimiters, quoted fields and newline behavior |
| Reject policy | Distinguish bad and discard records |
| Load mode | Conventional/direct/external based on restrictions |
| Retry strategy | Prevent APPEND rerun duplicates |
| Reconciliation | Row counts, key uniqueness, business totals and Thai text samples |

## Task 4 — External-table metadata

~~~sql
SELECT owner,table_name,type_name,default_directory_name
FROM dba_external_tables ORDER BY owner,table_name;
SELECT owner,table_name,location
FROM dba_external_locations ORDER BY owner,table_name;
~~~

Note: Partitioned external-table locations may appear in partition/subpartition-specific dictionary views rather than regular external locations.

## Task 5 — Transport decision

~~~sql
SELECT tablespace_name,status,contents FROM dba_tablespaces ORDER BY tablespace_name;
SELECT tablespace_name,file_name,bytes FROM dba_data_files ORDER BY tablespace_name;
~~~

Write a self-containment, transport metadata+datafiles, target RU, endian, encryption and backup plan. **Do not call DBMS_TTS.TRANSPORT_SET_CHECK** in this read-only lab: its violation report has side effects.

## Incident exercises

- ORA-39087 while exporting: identify DIRECTORY object, PDB context and OS access
- ORA-29913 on external table: check actual underlying access-driver message, directory, file format and OS access
- Import completed but Thai text unreadable: prove source/target encoding and app NLS settings before re-import
- Transport metadata imported but no data: identify missing physical datafile movement

## Pass criteria
- [ ] Choose the appropriate migration tool with a defensible rationale
- [ ] Explain metadata-versus-datafile boundary
- [ ] Demonstrate a test plan for 19c → 26ai text migration
- [ ] Record production safety/change/backup constraints
- [ ] Zero state-changing operations performed
- [ ] Actual Oracle execution: NOT RUN

**Cleanup:** SQL disconnect only, no resources were created.
