# 05 — Storage, Tablespaces and Undo

[← Oracle Database](../README.md)

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
