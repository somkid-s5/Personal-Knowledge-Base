# 02 — Instance Administration

[← Oracle Database](../README.md)

## Detailed lessons

- [Lesson 03 — Creating Oracle Database Using DBCA (TH)](./Lesson-03-Creating-Database-Using-DBCA-TH.md) — preflight, CDB/PDB planning, GUI workflow, validation and troubleshooting

- [Lesson 04 — Creating Database Using SQL Commands (TH)](./Lesson-04-Creating-Database-Using-SQL-TH.md) — manual build sequence, PFILE/SPFILE, CREATE DATABASE, verification, safety

- [Lesson 05 — Starting Up and Shutting Down a Database Instance (TH)](./Lesson-05-Instance-Startup-Shutdown-TH.md) — NOMOUNT/MOUNT/OPEN, shutdown modes, PDB scope, operational recovery

## Scope

Mapped primarily from lessons 3–6:

- DBCA / database creation,
- SQL-based database creation,
- startup/shutdown,
- initialization parameters,
- ADR / alert log / trace,
- dynamic performance views,
- data dictionary.

## Startup mental model

~~~text
NOMOUNT
→ MOUNT
→ OPEN
~~~

- **NOMOUNT** — instance starts; control file not yet opened
- **MOUNT** — control file opened; database not yet open for normal use
- **OPEN** — database available according to open mode

## SPFILE vs PFILE

- **SPFILE** — server-managed binary parameter file, supports persistent changes
- **PFILE** — text parameter file, useful in manual/recovery scenarios

Always distinguish runtime state from next-startup persistent state.

## ADR / alert log

For troubleshooting, start with evidence:

- alert log,
- trace files,
- ADR locations,
- dynamic performance views.

Avoid “restart first, investigate later” unless service-restoration risk requires it.

## Source mapping

Oracle University lessons 3–6.
