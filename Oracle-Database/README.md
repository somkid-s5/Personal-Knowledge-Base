# Oracle Database — Personal DBA Learning System

> **System status:** **In Progress — foundation mapped, current 26ai layer established, full source-fidelity pass pending**  
> **Primary source mode:** Hybrid — Source-ingestion + current official Oracle verification  
> **Foundation source:** Oracle Database 19c: Administration Workshop (D106546GC10)  
> **Current platform authority:** Oracle AI Database 26ai official documentation  
> **Last current verification:** 2026-10-08

[← Repository root](../README.md)

## What this system is

This is the long-lived Oracle Database learning system for DBA administration, troubleshooting and operations.

The system deliberately separates:

~~~text
19c course material
→ stable DBA foundation

current Oracle 26ai documentation
→ current behavior / new features / deprecations / modern platform delta
~~~

The goal is not to preserve an old 19c course as if it were current. The goal is to keep durable Oracle DBA knowledge while making current-version changes explicit.

## Learning layers

1. [01-Core-Architecture](./01-Core-Architecture/)
2. [02-Instance-Administration](./02-Instance-Administration/)
3. [03-Networking-Listener](./03-Networking-Listener/)
4. [04-Multitenant-CDB-PDB](./04-Multitenant-CDB-PDB/)
5. [05-Storage-Tablespaces-Undo](./05-Storage-Tablespaces-Undo/)
6. [06-Users-Roles-Security](./06-Users-Roles-Security/)
7. [07-Monitoring-Troubleshooting](./07-Monitoring-Troubleshooting/)
8. [08-Data-Movement-Maintenance](./08-Data-Movement-Maintenance/)
9. [09-Oracle-26ai-Current](./09-Oracle-26ai-Current/)
10. [10-Labs](./10-Labs/)

## Recommended study order

Start with architecture and instance lifecycle, then networking, multitenant, storage and security. Continue with monitoring/troubleshooting, data movement, current 26ai delta and hands-on labs.

## Current foundation coverage

The Oracle University 19c Administration Workshop source contains **31 lessons** covering architecture/tools, database creation, startup/shutdown, initialization parameters, diagnostics, Oracle Net/listener, CDB/PDB, storage/undo, users/security, data movement, automated maintenance and performance.

See [SOURCE-MANIFEST.md](./SOURCE-MANIFEST.md) and [SOURCE-COVERAGE.md](./SOURCE-COVERAGE.md).

## Current 26ai layer

Oracle AI Database 26ai is the current platform layer.

See:

- [VERSION-MAP.md](./VERSION-MAP.md)
- [19c-to-26ai-DELTA.md](./19c-to-26ai-DELTA.md)
- [09-Oracle-26ai-Current](./09-Oracle-26ai-Current/)

## Source policy

Oracle University Student Guide and Activity Guide are proprietary source material.

Therefore this repository does not commit those PDFs or proprietary figures, does not reproduce labs verbatim, reconstructs explanations in original Thai wording, and keeps source/version traceability.

## Completion boundary

This system is **not Verified yet**.

Before verification:

- all 31 Oracle University lessons must be accounted for,
- official activity/lab coverage must be mapped,
- selected Udemy support files must be inventoried,
- current 26ai deltas must be validated against official docs,
- the teaching layer must pass repository QA and CI.

## Quick links

- [Source Manifest](./SOURCE-MANIFEST.md)
- [Source Coverage](./SOURCE-COVERAGE.md)
- [Version Map](./VERSION-MAP.md)
- [19c → 26ai Delta](./19c-to-26ai-DELTA.md)
- [System QA](./SYSTEM-QA.md)

## Official current references

- [Oracle AI Database 26ai Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/)
- [Database Administrator's Guide 26ai](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/)
- [Administration Bookshelf 26ai](https://docs.oracle.com/en/database/oracle/oracle-database/26/administration.html)
