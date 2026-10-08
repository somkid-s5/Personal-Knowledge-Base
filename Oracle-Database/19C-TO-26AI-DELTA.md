# Oracle Database 19c → Oracle AI Database 26ai — Current Delta

[← Oracle Database](./README.md) · [Version Map](./VERSION-MAP.md)

> **Last verified:** 2026-10-08  
> **Purpose:** separate the 19c course era from current Oracle AI Database 26ai administration

## Executive mental model

~~~text
19c course foundation
→ keep durable DBA concepts
→ remove assumptions that are no longer current
→ verify migration/upgrade path
→ add 26ai current capabilities
~~~

## 1. Product naming and current authority

The current documentation set is **Oracle AI Database 26ai**.

26ai is treated as the current product/documentation authority in this repository.

Do not rename historical 19c course content to 26ai. Instead, annotate the delta.

## 2. Multitenant is no longer optional future architecture

A major architectural delta after the 19c era is the move away from non-CDB architecture.

For current learning:

~~~text
CDB
└─ PDB(s)
~~~

should be the default mental model.

19c non-CDB concepts remain useful mainly for understanding legacy environments and migration.

## 3. Upgrade path changed

Do not carry forward an old assumption that any historical upgrade method remains valid.

Current 26ai upgrade guidance makes **AutoUpgrade** and **Replay Upgrade** the supported upgrade methods, while DBUA/manual-style upgrade methods are desupported for upgrade to 26ai.

Operational rule:

> Before any real upgrade, read the current Upgrade Guide and platform certification matrix. Never execute an upgrade from a course-era procedure alone.

## 4. Non-CDB → current architecture

A legacy non-CDB should not be treated as a valid target architecture for current releases.

Migration planning may involve converting/pluggng a 19c non-CDB into a PDB as part of the upgrade/migration path.

This makes CDB/PDB administration a core skill rather than an optional chapter.

## 5. Oracle Connection Manager administration

Course-era Oracle Connection Manager concepts remain useful, but current 26ai guidance desupports password access to CMAN parameters and points toward local operating-system authentication behavior.

Treat old password-based CMAN administration examples as historical until verified.

## 6. Current AI/database capabilities

26ai documentation includes modern capabilities such as:

- AI Vector Search
- Select AI
- AI-focused enablement guidance
- Agent Engine / agent-related capabilities
- JSON Relational Duality
- SQL Property Graphs
- expanded developer/microservice features

These belong in the **Current 26ai layer**.

They do not replace DBA fundamentals such as memory, storage, identity, backup, diagnostics or recovery.

## 7. Support lifecycle

19c is old by release age but still operationally important.

Do not infer support status from age alone. Oracle's current technical-support policy should be checked before lifecycle decisions.

The repository treats 19c as:

~~~text
legacy/current-production foundation
NOT
current product-design authority
~~~

## 8. What is still strongly reusable from 19c learning

Still highly reusable as concepts:

- architecture
- SQL*Plus/admin tooling mental models
- startup/shutdown
- parameter management
- ADR / alert log / trace
- listener/service basics
- CDB/PDB fundamentals
- storage/tablespaces/undo
- user/role/privilege concepts
- auditing concepts
- Data Pump concepts
- monitoring/performance methodology

## 9. What must be verified instead of copied forward

- installation steps
- OS/platform certification
- GUI tooling
- exact default parameters
- deprecated/desupported utilities
- upgrade workflow
- Connection Manager authentication
- feature/license assumptions
- AI features
- security defaults

## 10. Upgrade-decision checklist

Before planning 19c → 26ai:

1. identify current architecture: non-CDB or CDB/PDB,
2. identify platform/OS,
3. inventory options/features/components,
4. review current desupport/deprecation list,
5. run supported pre-upgrade analysis,
6. design multitenant conversion if needed,
7. choose supported upgrade/migration method,
8. test backup/recovery and rollback,
9. rehearse on non-production,
10. validate application/client compatibility,
11. validate post-upgrade performance and security.

This is a planning model, not a production runbook.
