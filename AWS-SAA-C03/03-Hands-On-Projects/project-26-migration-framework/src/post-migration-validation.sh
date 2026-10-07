#!/bin/bash
# post-migration-validation.sh
# Automated validation after workload cutover

set -euo pipefail

TARGET_URL=${1:-"https://inventory.thairetail.co/health"}
DB_ENDPOINT=${2:-"rds-inventory.ap-southeast-1.rds.amazonaws.com"}

echo "--- Starting Post-Migration Validation ---"

# 1. Connectivity Check
echo "Testing HTTP connectivity to $TARGET_URL..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$TARGET_URL")
if [ "$HTTP_CODE" -eq 200 ]; then
    echo "[OK] Application is reachable."
else
    echo "[FAIL] Application returned $HTTP_CODE"
    exit 1
fi

# 2. Database Latency
echo "Testing DB connectivity to $DB_ENDPOINT..."
if nc -zv "$DB_ENDPOINT" 5432 2>&1 | grep -q succeeded; then
    echo "[OK] RDS connectivity verified."
else
    echo "[FAIL] Cannot reach RDS on port 5432"
    exit 1
fi

# 3. Security Check (WAF/Shield)
echo "Verifying WAF status..."
WAF_ID=$(aws wafv2 list-web-acls --scope REGIONAL --query "WebACLs[?Name=='Migration-WAF'].Id" --output text)
if [ -n "$WAF_ID" ]; then
    echo "[OK] WAF protection active ($WAF_ID)."
else
    echo "[WARN] WAF not found for this workload."
fi

# 4. Performance Baseline
echo "Running quick smoke load test..."
ab -n 100 -c 10 "$TARGET_URL/" | grep "Time per request"

echo "--- Validation Complete ---"
