#!/bin/bash
# verify-connectivity.sh

set -euo pipefail

TARGET_IP="10.0.11.5" # Replace with an instance IP in another VPC

echo "--- Network Connectivity Test ---"

# 1. Test ICMP (Ping)
echo "Testing Ping to $TARGET_IP..."
ping -c 3 $TARGET_IP || echo "Ping failed (check Security Groups)"

# 2. Test Traceroute
echo "Traceroute to $TARGET_IP..."
traceroute $TARGET_IP

# 3. Test DNS Resolution for ECR
echo "Testing ECR DNS Resolution..."
NSLOOKUP_RESULT=$(nslookup ecr.ap-southeast-1.amazonaws.com)
echo "$NSLOOKUP_RESULT"

if [[ "$NSLOOKUP_RESULT" == *"10."* ]]; then
    echo "SUCCESS: ECR is resolving to a private IP (VPC Endpoint is working)."
else
    echo "FAILURE: ECR is resolving to a public IP."
fi

# 4. Test S3 Connectivity
echo "Testing S3 connectivity via endpoint..."
aws s3 ls --region ap-southeast-1
