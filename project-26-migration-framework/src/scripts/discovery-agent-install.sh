#!/bin/bash
# Script to install AWS Replication Agent on On-premises Linux (VMware VM)
# Usage: ./discovery-agent-install.sh <AWS_REGION> <IAM_USER_AK> <IAM_USER_SK>

set -euo pipefail

REGION=$1
ACCESS_KEY=$2
SECRET_KEY=$3

echo "🚀 Starting AWS Replication Agent installation on $(hostname)..."

# 1. Download installer
curl -O https://aws-application-migration-service-$REGION.s3.$REGION.amazonaws.com/latest/linux/aws-replication-installer-init.py

# 2. Run installer (Automated)
# This will start block-level replication of all attached disks to the Staging Area
sudo python3 aws-replication-installer-init.py \
    --region $REGION \
    --aws-access-key-id $ACCESS_KEY \
    --aws-secret-access-key $SECRET_KEY \
    --no-prompt

echo "✅ Agent installed. Check AWS Console (Application Migration Service) to monitor replication progress."
