#!/bin/bash
# Script to manually trigger remediation or verify public access block

set -euo pipefail

BUCKET_NAME=${1:-}

if [ -z "$BUCKET_NAME" ]; then
    echo "Usage: $0 <bucket-name>"
    exit 1
fi

echo "🔍 Checking Public Access Block for $BUCKET_NAME..."

# 1. Check current status
aws s3api get-public-access-block --bucket "$BUCKET_NAME" || echo "No block configured."

# 2. Enforce remediation (Simulate what AWS Config + SSM does)
echo "🛡️ Enforcing Public Access Block (Zero Trust style)..."
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

echo "✅ Remediation complete for $BUCKET_NAME."
