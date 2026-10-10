# 07 — Monitoring and Troubleshooting

[← Oracle Database](../README.md)

## Standalone Thai lessons and lab

- [Lesson 29 — Performance Overview](./Lesson-29-Database-Performance-Overview-TH.md)
- [Lesson 30 — Monitoring Database Performance](./Lesson-30-Monitoring-Database-Performance-TH.md)
- [Lesson 31 — Analyzing SQL and Access Paths](./Lesson-31-Analyzing-SQL-and-Access-Paths-TH.md)
- [Lab 13 — Performance and SQL Plan Read-only Triage](../10-Labs/Lab-13-Oracle-Performance-Triage-Read-Only.md)

All lessons are original Thai drafts. Student Guide source-fidelity and live testing are PENDING; Diagnostics/Tuning Pack usage requires licensing review.

## Diagnostic flow

~~~text
Symptom
→ Scope
→ Evidence
→ Layer
→ Hypothesis
→ Validate
→ Correct
→ Verify
~~~

## Core topics

Mapped heavily from lessons 29–31, plus diagnostic material from lesson 6:

- database performance overview,
- monitoring,
- waits/resources,
- SQL/access-path analysis,
- ADR/alert/trace evidence,
- dynamic performance views.

## Operational starting points

Typical questions:

- Is the instance open?
- Is the PDB open?
- Is the listener/service healthy?
- Are processes/sessions near limits?
- Is tablespace pressure present?
- Are sessions blocked?
- Are waits concentrated?
- Did the alert log record errors?
- Is the issue one SQL, one application, or database-wide?

## Avoid

Restarting the database or application as the first diagnostic action can destroy evidence and hide the root cause.

Restore service when necessary, but capture evidence first when operationally safe.
