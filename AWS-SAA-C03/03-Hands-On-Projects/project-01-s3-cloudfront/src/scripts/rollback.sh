#!/bin/bash
# Project 01: Rollback Script
# Uses S3 Versioning to revert to previous file versions.

set -euo pipefail

# Configuration (or get from Terraform)
TERRAFORM_DIR="../terraform"
PROFILE="thaidemo-dev"

# Ensure we are in the script's directory
cd "$(dirname "$0")"

echo "------------------------------------------------"
echo "Project 01: Rolling back website files..."
echo "------------------------------------------------"

# 1. Get Bucket Name and Distribution ID from Terraform
if [ ! -d "$TERRAFORM_DIR" ]; then
    echo "Error: Terraform directory not found."
    exit 1
fi

cd "$TERRAFORM_DIR"
S3_BUCKET=$(terraform output -raw s3_bucket_name)
CLOUDFRONT_ID=$(terraform output -raw distribution_id)
cd - > /dev/null

echo "Target Bucket: $S3_BUCKET"
echo "Target Distribution: $CLOUDFRONT_ID"

# 2. List Versions for key files
echo "Fetching versions for index.html..."
aws s3api list-object-versions \
    --bucket "$S3_BUCKET" \
    --prefix index.html \
    --profile "$PROFILE" \
    --query 'Versions[?IsLatest==`false`].{ID:VersionId,Date:LastModified}' \
    --output table

# 3. Ask user for Version ID (in a real interactive shell)
# Since we are non-interactive, we will provide a template for how to do it.
echo ""
echo "TO REVERT A FILE, RUN:"
echo "aws s3api copy-object \\"
echo "    --bucket $S3_BUCKET \\"
echo "    --copy-source $S3_BUCKET/index.html?versionId=VERSION_ID_HERE \\"
echo "    --key index.html \\"
echo "    --profile $PROFILE"

echo ""
echo "AFTER REVERTING, INVALIDATE CLOUDFRONT CACHE:"
echo "aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths '/*' --profile $PROFILE"

echo "------------------------------------------------"
echo "Rollback Manual Instructions Complete!"
echo "------------------------------------------------"
