-- CONTRACT: SANDBOX_READ_ONLY
-- Applies to 19c and 26ai; requires an authorized SQL*Plus/SQLcl session.
-- Identity and version only. Never record private endpoint data in a public repository.
SHOW USER
SHOW CON_NAME
SELECT sys_context('USERENV','DB_NAME') db_name,
       sys_context('USERENV','CON_NAME') container_name,
       sys_context('USERENV','SERVICE_NAME') service_name
FROM dual;
SELECT instance_name, version_full, status FROM v$instance;
SELECT name, cdb, open_mode FROM v$database;
