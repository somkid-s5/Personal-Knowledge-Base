-- CONTRACT: SANDBOX_READ_ONLY
-- Unified auditing view availability varies by mode/version/privilege.
-- Read metadata only, not UNIFIED_AUDIT_TRAIL content or user PII.
SHOW CON_NAME
SELECT policy_name, enabled_option, entity_type, success, failure
FROM audit_unified_enabled_policies
ORDER BY policy_name;
