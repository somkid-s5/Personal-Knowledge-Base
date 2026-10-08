# 07 — Monitoring and Troubleshooting

[← Oracle Database](../README.md)

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
