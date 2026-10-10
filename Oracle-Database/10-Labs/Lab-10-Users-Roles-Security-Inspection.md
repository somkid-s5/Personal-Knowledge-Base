# Lab 10 — User, Role, Profile and Audit Inspection (Read-only)

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 👤 Identity → 🔑 Access → 🛡️ Controls → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Lessons 19–22](../06-Users-Roles-Security/README.md)

> **Status:** Original Thai companion lab, static reviewed, NOT EXECUTED. Does not reproduce official Oracle Activity Guide. No CREATE USER, ALTER USER, GRANT, REVOKE, AUDIT or other state-changing SQL.

## Prerequisites
Approved CDB/PDB sandbox or authorized read-only audit database account with narrowly granted access to selected DBA_/AUDIT_ views. DO NOT use production SYSDBA just to complete an exercise. Record Oracle version, actual container and observation timestamp.

## Task 1 — Identify identity and container

```sql
SHOW USER
SHOW CON_NAME
SELECT sys_context('USERENV','SESSION_USER') session_user,
       sys_context('USERENV','CON_NAME') con_name FROM dual;
```

Expected: target user/container confirmed; record only redacted evidence.

## Task 2 — Account health

```sql
SELECT username,account_status,profile,default_tablespace
FROM dba_users ORDER BY username;
```

Questions: which application accounts are expired or locked? Is the user a local PDB identity? Do not unlock or reset.

## Task 3 — Privileges and roles

```sql
SELECT grantee,privilege FROM dba_sys_privs
WHERE grantee='APP_USER' ORDER BY privilege;
SELECT grantee,granted_role FROM dba_role_privs
WHERE grantee='APP_USER' ORDER BY granted_role;
SELECT owner,table_name,grantee,privilege FROM dba_tab_privs
WHERE grantee='APP_USER' ORDER BY owner,table_name;
```

Replace APP_USER with an approved example account. Discuss direct grant, role grant and definer-rights SQL behavior. Avoid blanket privileges.

## Task 4 — Profiles and enforcement

```sql
SELECT profile,resource_name,resource_type,limit FROM dba_profiles
ORDER BY profile,resource_name;
SELECT name,value FROM v$parameter WHERE name='resource_limit';
```

Distinguish password limits from resource constraints; resource enforcement depends on parameter and configuration.

## Task 5 — Unified audit observation

```sql
SELECT policy_name,enabled_option,entity_name
FROM audit_unified_enabled_policies;
SELECT event_timestamp,dbusername,action_name,return_code
FROM unified_audit_trail ORDER BY event_timestamp DESC FETCH FIRST 10 ROWS ONLY;
```

No rows ≠ proof of no security events. An audit account may only see authorized records; redact usernames/client details.

## Tabletop incidents
- ORA-01017: inspect username/container/auth method and secret rotation.
- ORA-28000: locked account — collect cause and approval before remediation.
- ORA-00942: find object owner, direct grants and role context.
- Privileged action missing from audit: inspect policy activation/scope, audit mode and collection timing.

## Exit criteria
- [ ] Explain user versus schema, common versus local user
- [ ] Compare system and object privileges, direct grants and roles
- [ ] Identify profile/password/resource restrictions
- [ ] Understand unified audit policy versus audit trail
- [ ] No secrets exposed, no SQL mutation executed
- [ ] Mark as NOT RUN until actual approved lab testing

Cleanup: disconnect; nothing modified.

Reference: <https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/index.html>
