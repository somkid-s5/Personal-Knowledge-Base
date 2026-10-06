# Source Coverage / Fidelity Matrix

> Required for Source-ingestion packages before claiming complete source coverage.

## Coverage status

Use:

- `COMPLETE` — source unit is understood and represented,
- `PARTIAL` — repository coverage is incomplete,
- `REFERENCE-ONLY` — intentionally referenced rather than rewritten,
- `UNREADABLE` — cannot be interpreted reliably,
- `OUT-OF-SCOPE` — intentionally excluded with reason.

## Matrix

| Source ID | Source unit | Repository destination | Concept coverage | Visual treatment | Supplement/delta | Status |
|---|---|---|---|---|---|---|
| S01 | Module 1 / pp. 1–20 | `Module-01-*.md` | <summary> | Mermaid / none / source reference | none | COMPLETE |

## Unresolved items

| Source unit | Problem | Action needed |
|---|---|---|
| <page/chapter> | <missing/unreadable/conflict> | <next action> |

## Current-documentation deltas

Use this section only when Internet verification/enrichment is part of the task.

| Course/source statement | Current official status | Repository treatment |
|---|---|---|
| <old name/behavior> | Still current / Renamed / Changed / Deprecated | <annotation or supplement location> |

## Completion statement

Do not mark source coverage complete until every in-scope source unit is accounted for and all `PARTIAL` / `UNREADABLE` items are either resolved or explicitly accepted as exclusions.
