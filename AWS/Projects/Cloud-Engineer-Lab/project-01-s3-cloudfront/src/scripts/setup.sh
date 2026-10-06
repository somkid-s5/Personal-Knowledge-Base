#!/bin/bash
# Project 01: Initial Setup Script
# Creates S3 bucket for Terraform state and DynamoDB for locking.

set -euo pipefail

PROFILE="${1:-Smart}"
REGION="ap-southeast-7"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text --profile "$PROFILE")
STATE_BUCKET="thaidemo-tfstate-$ACCOUNT_ID"
LOCK_TABLE="thaidemo-tf-lock"

echo "------------------------------------------------"
echo "Starting Setup for Project 01"
echo "Account ID: $ACCOUNT_ID"
echo "Region: $REGION"
echo "Profile: $PROFILE"
echo "------------------------------------------------"

# 1. Check Prerequisites
command -v aws >/dev/null 2>&1 || { echo >&2 "AWS CLI is required but not installed. Aborting."; exit 1; }
command -v terraform >/dev/null 2>&1 || { echo >&2 "Terraform is required but not installed. Aborting."; exit 1; }

# 2. Create S3 Bucket for State
if aws s3api head-bucket --bucket "$STATE_BUCKET" --profile "$PROFILE" 2>/dev/null; then
    echo "Bucket $STATE_BUCKET already exists."
else
    echo "Creating bucket $STATE_BUCKET..."
    aws s3api create-bucket \
        --bucket "$STATE_BUCKET" \
        --region "$REGION" \
        --create-bucket-configuration LocationConstraint="$REGION" \
        --profile "$PROFILE"
    
    echo "Enabling versioning on $STATE_BUCKET..."
    aws s3api put-bucket-versioning \
        --bucket "$STATE_BUCKET" \
        --versioning-configuration Status=Enabled \
        --profile "$PROFILE"
fi

# 3. Create DynamoDB Table for Locking
if aws dynamodb describe-table --table-name "$LOCK_TABLE" --profile "$PROFILE" 2>/dev/null; then
    echo "Table $LOCK_TABLE already exists."
else
    echo "Creating DynamoDB table $LOCK_TABLE..."
    aws dynamodb create-table \
        --table-name "$LOCK_TABLE" \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
        --region "$REGION" \
        --profile "$PROFILE"
fi

# 4. Automate backend.tf update
echo "Updating backend.tf with bucket name..."
sed -i "s/REPLACE_ME/$ACCOUNT_ID/g" src/terraform/backend.tf

echo "------------------------------------------------"
echo "Setup Complete!"
echo "Backend configured in src/terraform/backend.tf"
echo "------------------------------------------------"
