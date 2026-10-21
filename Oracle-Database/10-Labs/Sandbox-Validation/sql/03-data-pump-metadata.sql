-- CONTRACT: SANDBOX_READ_ONLY
-- Requires approved catalog SELECT; names and job identifiers can be sensitive.
-- No EXPDP, IMPDP, DB_LINK, DIRECTORY creation or data movement is performed.
SHOW CON_NAME
SELECT directory_name
FROM dba_directories
ORDER BY directory_name;
SELECT owner_name, job_name, operation, job_mode, state
FROM dba_datapump_jobs
ORDER BY owner_name, job_name;
