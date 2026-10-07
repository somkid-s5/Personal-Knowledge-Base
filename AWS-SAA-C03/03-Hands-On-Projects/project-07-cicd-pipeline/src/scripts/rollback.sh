#!/bin/bash
set -euo pipefail

# Configuration
CLUSTER="thaidemo-cluster"
SERVICE="thaidemo-service"
REGION="ap-southeast-1"
PROFILE="${AWS_PROFILE:-thaidemo-dev}"

echo "Fetching recent task definitions for $SERVICE in $CLUSTER..."

# Get current active task definition
CURRENT_TASK_DEF=$(aws ecs describe-services \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --profile "$PROFILE" \
  --query "services[0].taskDefinition" \
  --output text)

echo "Current Active Task Definition: $CURRENT_TASK_DEF"
echo "---------------------------------------------------"

# Get family name
FAMILY=$(aws ecs describe-task-definition \
  --task-definition "$CURRENT_TASK_DEF" \
  --region "$REGION" \
  --profile "$PROFILE" \
  --query "taskDefinition.family" \
  --output text)

# List last 5 revisions
echo "Last 5 revisions for family '$FAMILY':"
aws ecs list-task-definitions \
  --family-prefix "$FAMILY" \
  --sort DESC \
  --max-items 5 \
  --region "$REGION" \
  --profile "$PROFILE" \
  --query "taskDefinitionArns[]" \
  --output table

read -p "Enter the FULL ARN of the task definition you want to rollback to: " TARGET_TASK_DEF

if [[ -z "$TARGET_TASK_DEF" ]]; then
    echo "Rollback cancelled."
    exit 0
fi

echo "Rolling back to $TARGET_TASK_DEF..."

aws ecs update-service \
  --cluster "$CLUSTER" \
  --service "$SERVICE" \
  --task-definition "$TARGET_TASK_DEF" \
  --region "$REGION" \
  --profile "$PROFILE" > /dev/null

echo "Update triggered. Waiting for service to stabilize..."

aws ecs wait services-stable \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --profile "$PROFILE"

echo "Rollback complete! Service is stable with $TARGET_TASK_DEF."
