# 06 — Users, Roles and Security

[← Oracle Database](../README.md)

## Standalone Thai lessons

- [Lesson 19 — User Accounts](./Lesson-19-User-Accounts-TH.md)
- [Lesson 20 — Privileges and Roles](./Lesson-20-Privileges-and-Roles-TH.md)
- [Lesson 21 — Profiles and Resource Limits](./Lesson-21-Profiles-and-Resource-Limits-TH.md)
- [Lesson 22 — Unified Auditing](./Lesson-22-Unified-Auditing-TH.md)
- [Lab 10 — Security Inspection](../10-Labs/Lab-10-Users-Roles-Security-Inspection.md)

## Security model

~~~text
Identity
→ Authentication
→ Privileges / Roles
→ Resource Limits
→ Auditing
~~~

## Core topics

Mapped from lessons 19–22:

- common/local users,
- schema-only accounts,
- password / OS / password-file authentication,
- system and object privileges,
- roles,
- profiles/resource limits,
- auditing.

## Least privilege

Do not grant DBA or broad system privileges merely to make an application work.

Ask:

> What operation does this schema/user actually need?

Then grant the narrowest privilege required.

## Current-version caution

Authentication, crypto and auditing behavior are security-sensitive and must be checked against current 26ai/current RU documentation before production changes.

## Source mapping

Oracle University lessons 19–22.
