# Oracle Database — Version Map

[← Oracle Database](./README.md)

> **Current-version check:** 2026-10-08

## Purpose

This file prevents the learning system from confusing durable DBA knowledge with version-specific behavior.

## Version roles

| Version | Role in this repository | Guidance |
|---|---|---|
| Oracle Database 19c | historical foundation / source-course era | learn durable administration concepts; verify changing behavior |
| Oracle Database 21c | transition context | useful for understanding post-19c multitenant-only direction |
| Oracle Database 23ai | intermediate AI-era release context | do not use as current authority when 26ai docs supersede it |
| Oracle AI Database 26ai | **current official documentation authority** | use for current behavior, deprecations, supported administration and new features |

## Durable concepts

The following concepts remain valuable independent of the exact release, although syntax/options can evolve:

- instance vs database
- SGA / PGA
- background processes
- control files / online redo logs / datafiles
- startup / mount / open state
- initialization parameters
- dynamic performance views
- Automatic Diagnostic Repository (ADR)
- alert log and trace files
- Oracle Net listener / service names
- CDB / PDB architecture
- tablespaces / datafiles
- segments / extents / blocks
- undo
- users / roles / privileges
- backup/recovery principles
- performance observation before tuning

## Version-sensitive concepts

Always verify current docs for:

- supported architecture choices
- installation/platform support
- upgrade tooling
- deprecated/desupported features
- authentication defaults
- listener/Connection Manager administration behavior
- initialization parameters and defaults
- management tooling
- licensing/feature availability
- AI-related features
- cloud-specific capabilities

## Current maintenance rule

When Oracle releases a new long-term version:

1. update the current-version authority,
2. update the delta file,
3. re-check version-sensitive sections,
4. keep 19c source-era teaching visible as historical foundation,
5. do not rewrite history so the 19c course appears to have taught newer features.

## Support-lifecycle reminder

Oracle Database 19c remains relevant to real environments, but support dates and exceptions are policy facts rather than timeless technical facts.

Always check Oracle's current Lifetime/Technical Support policy before making lifecycle decisions.
