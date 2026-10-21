-- CONTRACT: SANDBOX_READ_ONLY
-- No Scheduler, AutoTask, AWR, ASH, ADDM or SQL Tuning Advisor invocation.
-- CONTROL_MANAGEMENT_PACK_ACCESS is configuration, NOT license evidence.
SHOW CON_NAME
SELECT name, value
FROM v$parameter
WHERE name = 'control_management_pack_access';
SELECT client_name, status
FROM dba_autotask_client
ORDER BY client_name;
SELECT window_name, enabled, repeat_interval, duration
FROM dba_scheduler_windows
ORDER BY window_name;
SELECT client_name, job_status, job_start_time, job_duration
FROM dba_autotask_job_history
ORDER BY job_start_time DESC FETCH FIRST 12 ROWS ONLY;
