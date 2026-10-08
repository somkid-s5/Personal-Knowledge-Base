# 06 — Users, Roles and Security

[← Oracle Database](../README.md)

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
