#!/bin/bash
set -euo pipefail

SECONDARY_REGION="ap-southeast-2"
GLOBAL_DB_ID="thaipay-global-db"
SECONDARY_CLUSTER_ID="thaipay-secondary"

echo "CRITICAL: Starting regional promotion for $SECONDARY_REGION..."

# 1. Remove secondary from global cluster to make it standalone
aws rds detach-from-global-cluster \
    --region $SECONDARY_REGION \
    --global-cluster-identifier $GLOBAL_DB_ID \
    --db-cluster-identifier arn:aws:rds:$SECONDARY_REGION:123456789012:cluster:$SECONDARY_CLUSTER_ID

# 2. Promote the cluster
aws rds promote-read-replica-db-cluster \
    --region $SECONDARY_REGION \
    --db-cluster-identifier $SECONDARY_CLUSTER_ID

echo "Promotion complete. Updating DNS..."
# 3. Update Route53 (In a real scenario, this might be automated via health checks)
