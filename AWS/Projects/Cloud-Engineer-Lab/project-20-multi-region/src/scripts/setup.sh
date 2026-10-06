#!/bin/bash
# Multi-Region Environment Setup

set -e

echo "🚀 Initializing Multi-Region Infrastructure..."

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it."
    exit 1
fi

# Terraform Check
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform not found. Please install it."
    exit 1
fi

echo "✅ Pre-requisites satisfied."

# Run Terraform
cd ../terraform
terraform init
terraform plan
# terraform apply -auto-approve

echo "✨ Ready for Multi-Region deployment."
