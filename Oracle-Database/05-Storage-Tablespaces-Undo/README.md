# 05 — Storage, Tablespaces and Undo

[← Oracle Database](../README.md)

## Standalone Thai lessons

- [Lesson 15 — Database Storage Overview](./Lesson-15-Database-Storage-Overview-TH.md)
- [Lesson 16 — Creating and Managing Tablespaces](./Lesson-16-Creating-and-Managing-Tablespaces-TH.md)
- [Lesson 17 — Improving Space Usage](./Lesson-17-Improving-Space-Usage-TH.md)
- [Lesson 18 — Managing Undo Data](./Lesson-18-Managing-Undo-Data-TH.md)
- [Lab 09 — Storage and Undo Inspection](../10-Labs/Lab-09-Storage-and-Undo-Inspection.md)

## Storage hierarchy

~~~text
Database
→ Tablespace
→ Datafile
→ Segment
→ Extent
→ Block
~~~

Logical and physical structures are related but not interchangeable.

## Core topics

Mapped from lessons 15–18:

- storage architecture,
- tablespaces,
- datafiles,
- SYSTEM/SYSAUX/temp,
- segment/extents/blocks,
- space usage,
- compression,
- segment shrink,
- resumable space allocation,
- undo,
- undo retention,
- local/shared undo concepts.

## Operational questions

When space is low, ask:

- which tablespace?
- permanent or temporary?
- datafile autoextend status?
- max size?
- free space vs reclaimable space?
- segment growth?
- undo behavior?
- application growth pattern?

Avoid solving every space incident by blindly adding a datafile.

## Source mapping

Oracle University lessons 15–18.
