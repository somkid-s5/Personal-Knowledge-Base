# Oracle Database — Personal DBA Learning System

> **System status:** **In Progress — 26ai current scope locked; 19c source inventory registered; foundation teaching layer built**  
> **Build mode:** Hybrid — private source-ingestion + current official Oracle documentation verification  
> **Current authority:** Oracle AI Database 26ai documentation  
> **Historical foundation:** Oracle Database 19c Administration Workshop + private Udemy course material  
> **Last current-version verification:** 2026-10-08

[← Repository root](../README.md)

## What this system is

This is a long-lived Oracle Database administration knowledge system.

It is intentionally named **Oracle-Database**, not `Oracle-Database-19c`, because the durable DBA concepts should survive version changes while version-specific behavior remains explicit.

The learning model is:

~~~text
19c Administration Workshop / Udemy sources
        ↓
durable DBA mental models
        ↓
current Oracle 26ai verification
        ↓
version delta / deprecation notes
        ↓
hands-on administration + troubleshooting
~~~

## Why 19c still matters here

The private source library is heavily based on Oracle Database 19c. That material remains useful for architecture, instance administration, Oracle Net, CDB/PDB, storage, users, privileges and operational troubleshooting.

However, the repository does **not** treat 19c as current product truth.

Version-sensitive behavior is checked against Oracle AI Database 26ai documentation and recorded in [19C-TO-26AI-DELTA.md](./19C-TO-26AI-DELTA.md).

## Current learning path

1. [Core Architecture](./01-Core-Architecture.md)
2. [Instance Administration](./02-Instance-Administration.md)
3. [Multitenant — CDB/PDB](./03-Multitenant.md)
4. [Oracle Net / Listener / Services](./04-Networking.md)
5. [Storage / Tablespaces / Undo](./05-Storage-Undo.md)
6. [Users / Roles / Security](./06-Users-Roles-Security.md)
7. [Data Movement / Utilities](./07-Data-Movement.md)
8. [Monitoring / Diagnostics / Performance](./08-Monitoring-Performance.md)
9. [Backup / Recovery](./09-Backup-Recovery.md)
10. [Oracle AI Database 26ai Current Layer](./10-26AI-Current.md)

Then use:

- [Version Map](./VERSION-MAP.md)
- [19c → 26ai Delta](./19C-TO-26AI-DELTA.md)
- [Lab Roadmap](./LAB-ROADMAP.md)
- [Source Manifest](./SOURCE-MANIFEST.md)
- [Source Coverage](./SOURCE-COVERAGE.md)
- [System QA](./SYSTEM-QA.md)

## Mental model of the system

~~~mermaid
flowchart TD
    ARCH[Core Architecture] --> INST[Instance Administration]
    INST --> MT[Multitenant CDB/PDB]
    INST --> NET[Oracle Net / Listener]
    MT --> STG[Storage / Undo]
    STG --> SEC[Users / Roles / Security]
    SEC --> MOVE[Data Movement]
    MOVE --> MON[Monitoring / Performance]
    MON --> BR[Backup / Recovery]
    BR --> CUR[26ai Current Layer]
    CUR --> DELTA[Version Delta]
~~~

## Source layers

### A. Private course sources

Google Drive contains:

- Oracle Database 19c: Administration Workshop — Student Guide
- Oracle Database 19c: Administration Workshop — Activity Guide
- 31 extracted lesson documents
- 8 Oracle lab-module folders
- setup/course-support files
- 61 Udemy course/practice files

These materials are **private/licensed sources**. The repository does not copy the PDFs, proprietary figures or course passages.

### B. Repository teaching reconstruction

The Markdown modules in this system are independently written Thai explanations with original mental models and troubleshooting flows.

### C. Current supplement

Oracle AI Database 26ai official documentation is used for:

- current product naming,
- current administration behavior,
- multitenant requirements,
- upgrade/deprecation/desupport guidance,
- current backup/recovery/utilities guidance,
- current AI/database features.

## Current version stance

The system distinguishes:

| Layer | Role |
|---|---|
| 19c | historical production/admin foundation |
| 21c / 23ai | intermediate evolution context when useful |
| 26ai | current long-term product/doc authority |
| future release | update only the current/delta layer unless a durable concept actually changes |

See [VERSION-MAP.md](./VERSION-MAP.md).

## Scope

In scope:

- single-instance Oracle architecture
- instance/database lifecycle
- multitenant administration
- Oracle Net, listener and services
- storage, tablespaces, datafiles and undo
- users, roles, privileges and authentication
- diagnostics, alert log and dynamic performance views
- Data Pump / data movement concepts
- monitoring and performance reasoning
- RMAN / backup / recovery foundations
- 26ai currentness and major 19c-to-current deltas

Not yet claimed complete:

- RAC deep administration
- Data Guard deep implementation
- ASM deep administration
- Exadata
- OCI database services
- GoldenGate deep administration
- every 26ai AI/developer feature
- full source-fidelity ingestion of all private course files

## Completion boundary

This system is deliberately **In Progress**.

Do not label it `Verified`, `Complete` or `100%` until:

- the 31 Oracle University lessons are systematically accounted for,
- the 8 lab modules are accounted for,
- the 61 Udemy files are accounted for,
- current-version deltas are fact-checked,
- lab/review coverage is sufficient,
- repository QA and CI pass for the declared completion scope.

## Official current references

- Oracle AI Database 26ai Documentation: https://docs.oracle.com/en/database/oracle/oracle-database/26/
- Database Administrator's Guide 26ai: https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/
- Multitenant Administrator's Guide 26ai: https://docs.oracle.com/en/database/oracle/oracle-database/26/multi/
- Backup and Recovery User's Guide 26ai: available from the 26ai Administration bookshelf
- Oracle AI Database Utilities Guide 26ai: available from the 26ai Administration bookshelf
- Oracle AI Database 26ai New Features / changes: available from the 26ai documentation landing page
