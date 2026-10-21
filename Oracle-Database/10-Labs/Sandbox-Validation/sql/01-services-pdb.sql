-- CONTRACT: SANDBOX_READ_ONLY
-- Requires SELECT/READ privilege on V$SERVICES, V$PDBS and V$RESOURCE_LIMIT.
-- V$PDBS visibility varies with current container and privileges.
SHOW CON_NAME
SELECT name, network_name, con_id
FROM v$services ORDER BY con_id, name;
SELECT con_id, name, open_mode, restricted
FROM v$pdbs ORDER BY con_id;
SELECT resource_name, current_utilization, max_utilization, limit_value
FROM v$resource_limit
WHERE resource_name IN ('processes', 'sessions')
ORDER BY resource_name;
