#!/bin/bash
# simulate-failure.sh
# DANGER: This script simulates a regional failure by breaking the health check.

set -euo pipefail

echo "Starting DR Simulation..."

# 1. Break the primary health check by modifying the SG to block traffic
PRIMARY_ALB_SG="sg-0123456789abcdef"
echo "Blocking traffic to Primary ALB Security Group: $PRIMARY_ALB_SG"
aws ec2 revoke-security-group-ingress --group-id $PRIMARY_ALB_SG --protocol tcp --port 443 --cidr 0.0.0.0/0

echo "Waiting for Route53 Health Check to fail (approx 2-3 mins)..."
while true; do
    STATUS=$(aws route53 get-health-check-status --health-check-id $HEALTH_CHECK_ID --query 'HealthCheckObservations[0].StatusReport.Status' --output text)
    echo "Current Status: $STATUS"
    if [[ "$STATUS" == *"Failure"* ]]; then
        break
    fi
    sleep 30
done

echo "FAILOVER TRIGGERED! Verifying DNS resolution..."
dig app.thaidemo.co +short

echo "Simulation Complete. Don't forget to run rollback-failure.sh to restore traffic!"
