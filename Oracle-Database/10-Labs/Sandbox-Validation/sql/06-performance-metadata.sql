-- CONTRACT: SANDBOX_READ_ONLY
-- View grants required; SQL_ID and child_number are identifiers, not execution proof.
-- Values are cumulative/current snapshots; do not infer incident rates from one row.
SHOW CON_NAME
SELECT resource_name, current_utilization, max_utilization, limit_value
FROM v$resource_limit
WHERE resource_name IN ('processes', 'sessions');
SELECT sql_id, child_number, plan_hash_value, executions, elapsed_time
FROM v$sql
WHERE executions > 0
ORDER BY elapsed_time DESC FETCH FIRST 10 ROWS ONLY;
