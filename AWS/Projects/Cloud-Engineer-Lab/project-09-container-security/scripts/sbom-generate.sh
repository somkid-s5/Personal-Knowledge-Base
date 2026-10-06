#!/bin/bash
# sbom-generate.sh
# Generates SBOM for a container image and uploads to S3
set -euo pipefail

IMAGE_NAME=$1
S3_BUCKET=$2
IMAGE_TAG=$(echo $IMAGE_NAME | cut -d: -f2)

# Check for syft
if ! command -v syft &> /dev/null; then
    echo "Syft not found. Installing..."
    curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin
fi

echo "Generating SBOM for ${IMAGE_NAME}..."
syft ${IMAGE_NAME} -o spdx-json > "sbom-${IMAGE_TAG}.json"

echo "Uploading SBOM to S3..."
aws s3 cp "sbom-${IMAGE_TAG}.json" "s3://${S3_BUCKET}/sbom-${IMAGE_TAG}.json"

echo "Done."
