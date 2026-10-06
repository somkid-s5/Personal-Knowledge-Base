#!/bin/bash
set -euo pipefail

IMAGE_NAME="${1:-thaidemo-app}"
IMAGE_TAG="${2:-latest}"
SBOM_FILE="sbom-${IMAGE_NAME}-${IMAGE_TAG}.json"

echo "Generating SBOM for ${IMAGE_NAME}:${IMAGE_TAG} using Syft..."

# Check if syft is installed
if ! command -v syft &> /dev/null; then
    echo "Syft is not installed. Installing..."
    curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin
fi

# Generate SBOM
syft packages "${IMAGE_NAME}:${IMAGE_TAG}" -o json > "${SBOM_FILE}"

echo "SBOM generated at ${SBOM_FILE}"

# Optional: Upload to S3 if AWS CLI is configured
# aws s3 cp "${SBOM_FILE}" s3://your-security-bucket/sboms/

echo "Done."
