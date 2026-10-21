# 🗄️ Oracle Technical Validation — Data Movement & Performance (Lessons 23–31)

> **21 October 2026 — official-document technical supplement** to Oracle University 19c DBA Workshop. Source-ingestion remains the primary learning source; official Oracle 19c references are current verification, not a claim that the course originally taught every newer nuance. All examples are **static-reviewed, NOT_EXECUTED**.

[Oracle Hub](./README.md) · [Labs 11–13](./10-Labs/README.md) · [Previous validation: Listener/PDB/Storage/Audit/Undo](./TECHNICAL-REFERENCE-QA-2026-10-21.md)

## 🔍 Source-backed decisions

| Review case | Canonical teaching | Companion evidence | Key caveat | State |
|---|---|---|---|---|
| 📦 Data Pump and RMAN | [Lesson 23](./08-Data-Movement-Maintenance/Lesson-23-Data-Movement-Overview-TH.md) | [Lab 11](./10-Labs/Lab-11-Data-Movement-Read-Only.md) | Logical export != physical disaster recovery; expdp vs impdp NETWORK_LINK path differs | DOC_REVIEWED / NOT_EXECUTED |
| 📥 SQL*Loader modes | [Lesson 24](./08-Data-Movement-Maintenance/Lesson-24-Loading-Data-TH.md) | [Lab 11](./10-Labs/Lab-11-Data-Movement-Read-Only.md) | Direct path has table/privilege/concurrency restrictions | DOC_REVIEWED / NOT_EXECUTED |
| 📂 Transportable set | [Lesson 25](./08-Data-Movement-Maintenance/Lesson-25-Transporting-Data-TH.md) | [Lab 11](./10-Labs/Lab-11-Data-Movement-Read-Only.md) | Metadata export alone doesn't contain the datafiles | DOC_REVIEWED / NOT_EXECUTED |
| 🧾 External tables | [Lesson 26](./08-Data-Movement-Maintenance/Lesson-26-External-Tables-TH.md) | [Lab 11](./10-Labs/Lab-11-Data-Movement-Read-Only.md) | ORACLE_LOADER and ORACLE_DATAPUMP are distinct access drivers | DOC_REVIEWED / NOT_EXECUTED |
| ⚙️ AutoTask scope | [Lesson 27](./08-Data-Movement-Maintenance/Lesson-27-Automated-Maintenance-Overview-TH.md), [Lesson 28](./08-Data-Movement-Maintenance/Lesson-28-Maintenance-Windows-and-Tasks-TH.md) | [Lab 12](./10-Labs/Lab-12-Automated-Maintenance-Inspection.md) | Enabled client, open window and successful job are distinct; check pack entitlement | DOC_REVIEWED / NOT_EXECUTED |
| 📊 Performance baseline | [Lesson 29](./07-Monitoring-Troubleshooting/Lesson-29-Database-Performance-Overview-TH.md), [Lesson 30](./07-Monitoring-Troubleshooting/Lesson-30-Monitoring-Database-Performance-TH.md) | [Lab 13](./10-Labs/Lab-13-Oracle-Performance-Triage-Read-Only.md) | Cumulative SQL metrics are not incident deltas; AWR/ADDM license applies | DOC_REVIEWED / NOT_EXECUTED |
| 🔎 DBMS_XPLAN | [Lesson 31](./07-Monitoring-Troubleshooting/Lesson-31-Analyzing-SQL-and-Access-Paths-TH.md) | [Lab 13](./10-Labs/Lab-13-Oracle-Performance-Triage-Read-Only.md) | DISPLAY_CURSOR needs SELECT/READ on V$ views; runtime A-Rows aren't guaranteed | DOC_REVIEWED / NOT_EXECUTED |

## 🧠 Migration decision trees and technical distinctions

### Data Pump: server files, target collision and recovery

Data Pump Export creates logical dump files on **database-server directories**, not automatically on the machine that invokes expdp. Export using NETWORK_LINK fetches source data over the link but writes dump files on the connected database server. Import using NETWORK_LINK reads from the source over the link and imports to the connected destination without an intermediate dump file.

For pre-existing tables, Oracle 19c Import TABLE_EXISTS_ACTION supports **SKIP**, **APPEND**, **TRUNCATE**, **REPLACE**. TRUNCATE and REPLACE are destructive. **CONTENT=DATA_ONLY defaults APPEND**, which creates a retry/duplicate risk. Import SQLFILE writes proposed DDL to a server file but does not execute the DDL; file creation/overwrite remains a side effect. A physical RMAN backup/recovery plan remains necessary.

Oracle sources: [Data Pump Overview](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-data-pump-overview.html) · [Data Pump Export](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-data-pump-export-utility.html) · [Data Pump Import](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/datapump-import-utility.html) · [Introduction to Backup and Recovery](https://docs.oracle.com/en/database/oracle/oracle-database/19/bradv/introduction-backup-recovery.html).

### Loading/transport

SQL*Loader Conventional Path uses SQL INSERT with bind arrays. Direct Path formats and loads data more directly but has restrictions, including clustered tables, certain VPD/INSERT policies and concurrent transaction scenarios. Transportable Tablespaces require both metadata and supported datafile movement, plus endian/compatibility/TDE checks. External-table drivers ORACLE_LOADER and ORACLE_DATAPUMP are not interchangeable.

Oracle sources: [Conventional and Direct Path](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-sql-loader-conventional-and-direct-loads.html) · [External Tables](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-external-tables.html).

### Maintenance, performance and licensing

AutoTask runs via Scheduler maintenance windows but a Window Scheduled / Open / Client Enabled / Job Completed are **four different facts**. An enabled pack access setting is **not proof of contractual Diagnostics/Tuning Pack entitlement**. SQL Tuning Advisor/SQL Profiles/Real-Time SQL Monitoring require appropriate Tuning Pack entitlement; AWR/ADDM require appropriate Diagnostics Pack entitlement.

DBMS_XPLAN.DISPLAY_CURSOR reads a cached cursor. Oracle 19c states that SELECT/READ access is needed on V$SQL, V$SQL_PLAN, V$SESSION and V$SQL_PLAN_STATISTICS_ALL; actual row counts require collection of runtime plan statistics. Distinguish DISPLAY_CURSOR from DISPLAY_AWR and SQL Tuning Advisor.

Oracle sources: [Automated Database Maintenance](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/managing-automated-database-maintenance-tasks.html) · [DBMS_XPLAN](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/DBMS_XPLAN.html) · [19c Licensing Information](https://docs.oracle.com/en/database/oracle/oracle-database/19/dblic/Licensing-Information.html).

## ✅ Validation and execution gates

This review amended **Lessons 23–31** and **Labs 11–13** while preserving all **31 stable Oracle lesson IDs** and **13 companion labs**. New CI checks that required source/technical markers exist, SQL fences in the three read-only Labs do not include write-changing database statements, and official links remain in teaching notes.

**No** Data Pump import/export, SQL*Loader load, Scheduler mutation, Advisor invocation, AWR access, RMAN backup/restore, or Oracle SELECT statement was executed on an actual DB. Feature availability, licensing, correct SQL output and rollback evidence must be tested on an authorized isolated Oracle sandbox before upgrading these cases to LAB_EXECUTED or LIVE_VALIDATED.
