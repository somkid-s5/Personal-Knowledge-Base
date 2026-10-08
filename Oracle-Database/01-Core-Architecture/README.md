# 01 — Core Architecture

[← Oracle Database](../README.md)

## Detailed lessons

- [Lesson 01 — Oracle Database Architecture (TH)](./Lesson-01-Oracle-Database-Architecture-TH.md) — instance/database, memory, background processes, lifecycle, self-check

## Mental model

Oracle separates the **database** from the **instance**.

~~~mermaid
flowchart LR
  CLIENT[Client] --> NET[Oracle Net]
  NET --> PROC[Server Process]
  PROC --> SGA[SGA]
  SGA --> DATA[(Data Files)]
  SGA --> REDO[(Online Redo)]
  SGA --> CTRL[(Control Files)]
  PROC --> PGA[PGA]
~~~

## Instance vs Database

### Instance

Runtime components:

- SGA,
- background processes,
- server processes,
- instance state.

### Database

Persistent structures such as:

- data files,
- control files,
- online redo logs.

A useful troubleshooting rule:

> “Database exists” does not mean “instance is open and serving users.”

## SGA vs PGA

### SGA

Shared memory used by the instance.

### PGA

Private process/session working memory.

## Operational value

Many Oracle incidents become easier when the layer is identified first:

- cannot connect → Net/listener/service/instance state,
- ORA-01034 → instance/database availability,
- memory pressure → SGA/PGA/process behavior,
- datafile/tablespace issue → storage layer,
- slow SQL → execution plan/session/waits/resources.

## Current 26ai note

The core instance/database mental model remains foundational in Oracle AI Database 26ai. Use current Database Concepts and the DBA Guide for current component behavior.

## Source mapping

Oracle University 19c Administration Workshop Lessons 1–2.
