# Oracle Database — Source Coverage

[← Oracle Database](./README.md)

> **Status:** Initial mapping complete; full semantic ingestion pending

| Source lessons | Repository learning layer | Status |
|---|---|---|
| 1–2 | 01 Core Architecture | Lessons 01–02 original Thai teaching + two read-only companion labs **authored, static-only**; full page-level source fidelity still PENDING |
| 3–6 | 02 Instance Administration | Lesson 03 DBCA original Thai teaching + safe planning/inspection Lab 03 **authored, static-only**; Lessons 04–06 and full source-fidelity PENDING |
| 7–11 | 03 Networking / Listener | MAPPED |
| 12–14 | 04 Multitenant CDB/PDB | MAPPED |
| 15–18 | 05 Storage / Tablespaces / Undo | MAPPED |
| 19–22 | 06 Users / Roles / Security | MAPPED |
| 23–28 | 08 Data Movement / Maintenance | MAPPED |
| 29–31 | 07 Monitoring / Troubleshooting | MAPPED |

## Lab mapping

| Source lab module | Repository layer | Status |
|---|---|---|
| DBMod_CreateDB | 10 Labs | REGISTERED |
| DBMod_NetSvcs | 10 Labs | REGISTERED |
| DBMod_PDBs | 10 Labs | REGISTERED |
| DBMod_Storage | 10 Labs | REGISTERED |
| DBMod_UsersSec | 10 Labs | REGISTERED |
| DBMod_LoadTrans | 10 Labs | REGISTERED |
| DBMod_AutoMaint | 10 Labs | REGISTERED |
| DBMod_MonTune | 10 Labs | REGISTERED |

## Current-version mapping

| Current concern | Artifact | Status |
|---|---|---|
| 19c vs 26ai role in this system | [VERSION-MAP.md](./VERSION-MAP.md) | COMPLETE |
| 19c → 26ai high-level changes | [19c-to-26ai-DELTA.md](./19c-to-26ai-DELTA.md) | INITIAL |
| Current admin docs | [09-Oracle-26ai-Current](./09-Oracle-26ai-Current/) | STARTED |

## Completion rule

Verified requires:

- every lesson 1–31 represented by teachable content,
- all 8 lab modules accounted for,
- source-specific version caveats captured,
- important diagrams rebuilt or referenced,
- current official 26ai verification completed,
- repository QA and CI pass.
