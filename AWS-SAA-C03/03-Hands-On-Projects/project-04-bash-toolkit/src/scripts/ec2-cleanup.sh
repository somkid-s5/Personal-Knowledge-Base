#!/bin/bash
set -euo pipefail

# Load common utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/../utils/common.sh"

# Dependencies
check_dep "aws"
check_dep "jq"

# Defaults
DRY_RUN=true
REGION="ap-southeast-1"

show_help() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --execute       Actually perform the deletion (default: dry-run)"
    echo "  --region R      AWS region to clean (default: ap-southeast-1)"
    echo "  --help          Show this help message"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --execute) DRY_RUN=false; shift ;;
        --region) REGION="$2"; shift 2 ;;
        --help) show_help; exit 0 ;;
        *) log_error "Unknown option: $1"; show_help; exit 1 ;;
    esac
done

if [[ "$DRY_RUN" == "true" ]]; then
    log_info "Running in DRY-RUN mode. No resources will be deleted."
else
    log_warn "RUNNING IN EXECUTE MODE. Resources will be permanently deleted!"
    # Confirm before proceeding in execute mode
    read -p "Are you sure you want to continue? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 1. Clean unattached EBS volumes
log_info "Scanning for unattached EBS volumes in $REGION..."
VOLUMES=$(aws ec2 describe-volumes --region "$REGION" \
    --filters Name=status,Values=available --query 'Volumes[*].VolumeId' --output json)

NUM_VOLS=$(echo "$VOLUMES" | jq '. | length')
log_info "Found $NUM_VOLS unattached volumes."

for vol_id in $(echo "$VOLUMES" | jq -r '.[]'); do
    if [[ "$DRY_RUN" == "true" ]]; then
        log_info "[DRY RUN] Would delete volume: $vol_id"
    else
        log_warn "Deleting volume: $vol_id"
        aws ec2 delete-volume --region "$REGION" --volume-id "$vol_id"
    fi
done

# 2. Clean unassigned Elastic IPs
log_info "Scanning for unassigned Elastic IPs in $REGION..."
EIPS=$(aws ec2 describe-addresses --region "$REGION" \
    --query 'Addresses[?InstanceId==null && AssociationId==null].AllocationId' --output json)

NUM_EIPS=$(echo "$EIPS" | jq '. | length')
log_info "Found $NUM_EIPS unassigned Elastic IPs."

for alloc_id in $(echo "$EIPS" | jq -r '.[]'); do
    if [[ "$DRY_RUN" == "true" ]]; then
        log_info "[DRY RUN] Would release Elastic IP: $alloc_id"
    else
        log_warn "Releasing Elastic IP: $alloc_id"
        aws ec2 release-address --region "$REGION" --allocation-id "$alloc_id"
    fi
done

# 3. Clean old snapshots (older than 30 days)
# Note: In a real script, you'd filter by 'OwnerId' to avoid scanning public snapshots
log_info "Scanning for old EBS snapshots..."
# This is a simplified version - in production, you'd be more careful
# with tags like 'KeepForever' or 'CreatedByBackstage'

log_success "Cleanup process complete."
