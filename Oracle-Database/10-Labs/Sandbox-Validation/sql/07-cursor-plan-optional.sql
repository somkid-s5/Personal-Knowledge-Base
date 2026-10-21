-- CONTRACT: SANDBOX_READ_ONLY
-- OPTIONAL: DBMS_XPLAN requires package and V$ view permissions.
-- Replace the inert SQL_ID placeholder locally after choosing an authorized
-- cursor from 06-performance-metadata.sql. Never capture SQL text/bind secrets.
-- Displaying a cursor plan does not re-execute the business statement.
SHOW CON_NAME
SELECT plan_table_output
FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(
  sql_id => 'REPLACE_SQL_ID',
  cursor_child_no => 0,
  format => 'TYPICAL'
));
