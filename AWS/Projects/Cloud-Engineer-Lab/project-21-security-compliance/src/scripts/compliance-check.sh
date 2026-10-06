#!/bin/bash
# Compliance Health Check

echo "🔍 Running Security & Compliance Check..."

# Check GuardDuty
GD_DETECTORS=$(aws guardduty list-detectors --query 'DetectorIds' --output text)
if [ -z "$GD_DETECTORS" ]; then
    echo "⚠️ GuardDuty is NOT enabled!"
else
    echo "✅ GuardDuty is enabled (ID: $GD_DETECTORS)"
fi

# Check Security Hub
SH_STATUS=$(aws securityhub describe-hub --query 'HubArn' --output text 2>/dev/null)
if [ -z "$SH_STATUS" ]; then
    echo "⚠️ Security Hub is NOT enabled!"
else
    echo "✅ Security Hub is active"
fi

# Check Public S3 Buckets
PUBLIC_BUCKETS=$(aws s3api list-buckets --query 'Buckets[*].Name' --output text)
for bucket in $PUBLIC_BUCKETS; do
    POLICY_STATUS=$(aws s3api get-bucket-policy-status --bucket "$bucket" --query 'PolicyStatus.IsPublic' --output text 2>/dev/null)
    if [ "$POLICY_STATUS" == "True" ]; then
        echo "🚨 ALERT: Bucket $bucket is PUBLIC!"
    fi
done

echo "Done."
