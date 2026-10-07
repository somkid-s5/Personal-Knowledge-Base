-- Threat Hunting: Find console logins without MFA
SELECT
    useridentity.arn,
    sourceipaddress,
    eventtime,
    additionalEventData
FROM cloudtrail_logs
WHERE eventname = 'ConsoleLogin'
  AND json_extract_scalar(additionalEventData, '$.MFAUsed') = 'No'
ORDER BY eventtime DESC;

-- Threat Hunting: Find suspicious S3 data exfiltration (large Gets)
SELECT
    useridentity.arn,
    sourceipaddress,
    requestparameters,
    eventtime
FROM cloudtrail_logs
WHERE eventname = 'GetObject'
  AND json_extract_scalar(requestparameters, '$.bucketName') = 'customer-data-sensitive'
ORDER BY eventtime DESC;

-- Threat Hunting: Find unauthorized API calls (Access Denied spikes)
SELECT
    useridentity.arn,
    eventname,
    errorcode,
    count(*) as total_attempts
FROM cloudtrail_logs
WHERE errorcode = 'AccessDenied'
GROUP BY useridentity.arn, eventname, errorcode
HAVING count(*) > 50;
