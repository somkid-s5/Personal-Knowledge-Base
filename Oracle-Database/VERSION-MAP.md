# Oracle Database Version Map

[← Oracle Database](./README.md)

## Design rule

This system separates **durable DBA concepts** from **version-specific behavior**.

~~~text
Stable DBA mental model
        │
        ├─ learned deeply from 19c Administration Workshop
        │
        └─ verified/updated against current 26ai docs
~~~

## Version roles

| Version | Role in this repository |
|---|---|
| 19c | Foundation course + production/legacy administration reference |
| 21c | Intermediate innovation release; reference only when needed |
| 23ai | Historical transition point to current AI-era feature set |
| 26ai | Current long-term-support platform layer |

## Topics that are mostly durable

- instance vs database,
- SGA / PGA,
- background-process mental model,
- control/data/redo files,
- startup/shutdown concepts,
- initialization parameters,
- ADR / alert log / trace,
- data dictionary / dynamic performance views,
- listener/services/naming,
- CDB/PDB mental model,
- tablespaces/datafiles/segments/extents/blocks,
- undo,
- users/roles/privileges/profiles,
- auditing concepts,
- Data Pump / SQL*Loader concepts,
- maintenance windows,
- performance diagnosis workflow.

## Topics that need explicit current verification

- deprecated/desupported features,
- security defaults,
- cryptographic requirements,
- tooling/UI availability,
- multitenant behavior changes,
- licensing-sensitive features,
- new AI/vector/JSON capabilities,
- platform availability,
- patch/release-update behavior.

## Current naming

Oracle now brands the current release as **Oracle AI Database 26ai**.

The underlying product family remains Oracle Database, so the repository uses the durable top-level name **Oracle-Database** instead of version-locking the whole system.
