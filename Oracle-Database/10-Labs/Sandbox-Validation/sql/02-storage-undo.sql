-- CONTRACT: SANDBOX_READ_ONLY
-- Requires approved catalog and V$ privileges. No changes to undo policy.
-- V$UNDOSTAT is interval-based and version/RU dependent; report scope.
SHOW CON_NAME
SELECT tablespace_name, contents, status, bigfile
FROM dba_tablespaces ORDER BY tablespace_name;
SELECT tablespace_name, status, SUM(bytes) undo_bytes
FROM dba_undo_extents
GROUP BY tablespace_name, status
ORDER BY tablespace_name, status;
SELECT begin_time, end_time, tuned_undoretention, ssolderrcnt, nospaceerrcnt
FROM v$undostat
ORDER BY begin_time DESC FETCH FIRST 12 ROWS ONLY;
