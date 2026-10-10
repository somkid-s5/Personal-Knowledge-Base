# Oracle Database — Source Manifest

[← Oracle Database](./README.md)

> **Registered:** 2026-10-08  
> **Mode:** Source-ingestion primary + official-current supplement

## Primary private sources

| Source | Version/type | Role | Status |
|---|---|---|---|
| Oracle Database 19c: Administration Workshop Student Guide, D106546GC10 | Oracle University / 2022 | Primary foundation course | Original 31 lesson objective sections inspected 2026-10-10; full page-level semantic review PENDING |
| Oracle Database 19c: Administration Workshop Activity Guide, D106546GC10 | Oracle University / 2022 | Official course practices | Activity Guide table of contents inspected 2026-10-10; detailed practice step comparison and lab execution PENDING |
| OracleLearning / Docs / Lesson 1–31 PDFs | Per-lesson extracts | Lesson-level source traceability | All 31 lesson PDFs located and objectives read 2026-10-10 |
| OracleLearning / labs / 8 module folders | Lab assets | Hands-on source set | All eight folders located; task-by-task scripts/execution NOT VERIFIED |
| OracleLearning / setup | Setup/build source | Environment support | Registered |
| Oracle_Udemy course files | PDFs/PPTX/practice files | Secondary explanation/practice source | Registered; selective ingestion pending |

## Oracle University lesson inventory

1. Introduction to Oracle Database
2. Accessing an Oracle Database
3. Creating an Oracle Database by Using DBCA
4. Creating an Oracle Database by Using a SQL Command
5. Starting Up and Shutting Down a Database Instance
6. Managing Database Instances
7. Oracle Net Services Overview
8. Configuring Naming Methods
9. Configuring and Administering the Listener
10. Configuring a Shared Server Architecture
11. Configuring Oracle Connection Manager for Multiplexing and Access Control
12. Creating PDBs from Seed
13. Using Other Techniques to Create PDBs
14. Managing PDBs
15. Database Storage Overview
16. Creating and Managing Tablespaces
17. Improving Space Usage
18. Managing Undo Data
19. Creating and Managing User Accounts
20. Configuring Privilege and Role Authorization
21. Configuring User Resource Limits
22. Implementing Oracle Database Auditing
23. Introduction to Loading and Transporting Data
24. Loading Data
25. Transporting Data
26. Using External Tables to Load and Transport Data
27. Automated Maintenance Tasks Overview
28. Automated Maintenance Tasks: Managing Tasks and Windows
29. Database Monitoring and Tuning Performance Overview
30. Monitoring Database Performance
31. Analyzing SQL and Optimizing Access Paths

## Official lab module folders

- DBMod_CreateDB
- DBMod_NetSvcs
- DBMod_PDBs
- DBMod_Storage
- DBMod_UsersSec
- DBMod_LoadTrans
- DBMod_AutoMaint
- DBMod_MonTune

## Secondary Udemy source

The private Udemy folder contains a large lesson/practice set covering architecture, multitenant administration, memory, storage/tablespaces, undo, space management, users/roles/profiles, authentication methods, least privilege and database creation.

This source is supplementary and does not override Oracle official documentation.

## Current official sources

| Source | Role |
|---|---|
| Oracle AI Database 26ai Database Administrator's Guide | current admin behavior |
| Oracle AI Database 26ai Database Concepts | current architecture concepts |
| Oracle AI Database 26ai Multitenant Administrator's Guide | current CDB/PDB behavior |
| Oracle AI Database 26ai Backup and Recovery User's Guide | current RMAN/recovery |
| Oracle AI Database 26ai Utilities Guide | Data Pump / SQL*Loader / utilities |
| Oracle AI Database 26ai Security docs | current security |
| Oracle AI Database 26ai New Features / Behavior Changes / Deprecations | version delta |
| Oracle AI Vector Search / AI Enablement docs | current AI-specific layer |

## Copyright / redistribution rule

The Oracle University guides explicitly identify themselves as proprietary Oracle material.

Do not commit source PDFs, proprietary figures or long copied passages.

Repository content must be original teaching reconstruction with source traceability.

## Direct-source review checkpoint — 2026-10-10

- Connected user's Google Drive folder `Oracle Database / Oracle_Oraclelearning / Docs` contains **31 separate lesson PDFs** corresponding to the listed lessons. Objective sections were inspected for every lesson and summarized in [SOURCE-OBJECTIVE-COVERAGE-AUDIT.md](./SOURCE-OBJECTIVE-COVERAGE-AUDIT.md).
- `D106546GC10_sg.pdf` and `D106546GC10_ag.pdf` were accessible through the connected Drive; the latter's practice index was inspected. [OFFICIAL-ACTIVITY-GAP-MAP.md](./OFFICIAL-ACTIVITY-GAP-MAP.md) records gaps between official exercise goals and original read-only companion labs.
- The source is **Oracle proprietary / Oracle Internal & Oracle Academy Use Only**. It is **not** published, attached or mirrored into this GitHub repo. No example lab usernames/passwords from the source should be reused or posted.
- Current evidence **does not establish page-by-page source fidelity**, full source assets ingestion, student-guide screenshots/diagrams validation or successful lab execution.
