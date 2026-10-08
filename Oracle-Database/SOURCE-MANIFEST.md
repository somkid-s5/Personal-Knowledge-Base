# Oracle Database — Source Manifest

[← Oracle Database](./README.md) · [Source Coverage](./SOURCE-COVERAGE.md)

> **Registered:** 2026-10-08  
> **Mode:** Source-ingestion primary + current official-doc supplement  
> **Private-source policy:** proprietary/source PDFs remain in Google Drive and are not copied into the repository

## A. Oracle University / Oracle Academy source set

### Oracle Database 19c: Administration Workshop

| Source | Type | Provider / era | Role | Current status |
|---|---|---|---|---|
| D106546GC10_sg.pdf | Student Guide | Oracle / 2022 / 19c | primary historical administration course | TOC/content structure reviewed; full-fidelity ingestion pending |
| D106546GC10_ag.pdf | Activity Guide | Oracle / 2022 / 19c | official course practice companion | TOC/practice structure reviewed; full-fidelity ingestion pending |
| Docs/ | 31 lesson PDFs | Oracle / 19c | lesson-level source units | registered; semantic pass pending |
| labs/ | 8 lab-module folders | Oracle / 19c | course lab assets | registered; semantic lab mapping pending |
| setup/ | 10 setup/support items | Oracle / 19c | lab/course environment support | registered; reference-only unless needed |

### 31 lesson document families

The Drive source contains Lesson 1 through Lesson 31, including:

- introduction / architecture
- tools and access
- DBCA / SQL database creation
- startup / shutdown
- instance and parameter administration
- Oracle Net / listener / naming
- shared server / Connection Manager
- PDB creation and management
- storage / tablespaces / space / undo
- users / roles / resource limits / auditing
- loading / transporting data
- automated maintenance
- monitoring / tuning / SQL access-path analysis

## B. Private Udemy source set

Folder `Oracle_Udemy` contains **61 registered files**.

Major source families include:

- RDBMS / Oracle overview
- DBA role
- architecture
- installation
- database creation
- SQL*Plus / SQL Developer / management tools
- startup / shutdown
- initialization parameters
- data dictionary
- multitenant architecture
- CDB/PDB creation and administration
- memory
- storage/tablespaces/datafiles
- resumable space allocation
- undo
- segment shrink / deferred segments / compression
- users / roles / profiles
- local/common users
- least privilege
- administrative accounts
- OS/password-file authentication
- practice PDFs throughout the course

Read status: **registered; full systematic semantic ingestion pending**.

## C. Current official sources

Current verification uses Oracle-owned public documentation:

| Current source | Role |
|---|---|
| Oracle AI Database 26ai documentation landing page | current release authority |
| Database Concepts 26ai | current architecture reference |
| Database Administrator's Guide 26ai | current administration reference |
| Multitenant Administrator's Guide 26ai | current CDB/PDB authority |
| Backup and Recovery User's Guide 26ai | current RMAN/recovery reference |
| Oracle AI Database Utilities Guide 26ai | current Data Pump/utility reference |
| Upgrade Guide / changes/deprecations/desupports | 19c → current migration/delta authority |
| 26ai New Features / AI documentation | current AI/developer capability reference |

## Copyright / redistribution boundary

The Oracle University material explicitly identifies itself as proprietary/restricted course documentation. Therefore:

- do not commit the original PDFs,
- do not reproduce long passages,
- do not copy proprietary figures,
- do not publish course credentials,
- do not recreate proprietary lab answer keys.

Repository content must remain independently written teaching reconstruction with source traceability.

## Current manifest status

The source set is **registered but not fully ingested**.

Therefore the Oracle-Database system remains **In Progress**.
