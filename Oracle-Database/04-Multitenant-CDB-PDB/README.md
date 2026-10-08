# 04 — Multitenant: CDB and PDB

[← Oracle Database](../README.md)

## Thai standalone lessons

- [Lesson 12 — Creating PDBs from Seed](./Lesson-12-Creating-PDBs-from-Seed-TH.md)
- [Lesson 13 — Other PDB Creation Techniques](./Lesson-13-Other-PDB-Creation-Techniques-TH.md)
- [Lesson 14 — Managing PDBs](./Lesson-14-Managing-PDBs-TH.md)
- [Lab 08 — PDB Lifecycle read-only companion](../10-Labs/Lab-08-PDB-Lifecycle-Read-Only.md)

## Mental model

~~~text
CDB
├─ CDB$ROOT
├─ PDB$SEED
├─ PDB_APP1
└─ PDB_APP2
~~~

Multitenant separates container-level administration from pluggable-database workloads.

## Learn to distinguish

- common vs local users,
- CDB root vs PDB context,
- open modes,
- service per PDB,
- parameter scope,
- create/clone/plug/unplug/relocate patterns.

## Operational habit

Before administrative SQL, check container context.

~~~sql
SHOW CON_NAME;
~~~

Many “why did this affect the wrong place?” mistakes begin with the wrong container.

## Source mapping

Oracle University lessons 12–14, plus multitenant sections across user/security lessons.
