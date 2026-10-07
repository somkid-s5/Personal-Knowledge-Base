#!/bin/bash
set -euo pipefail

# Load common utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/../utils/common.sh"

# Dependencies
check_dep "aws"
check_dep "jq"

# Defaults
DB_INSTANCE_IDENTIFIER=""
SNAPSHOT_NAME=""
CROSS_REGION_COPY=false
DEST_REGION=""

show_help() {
    echo "Usage: $0 --db-id DB_INSTANCE_ID [options]"
    echo ""
    echo "Options:"
    echo "  --db-id ID       RDS Database Instance Identifier (Required)"
    echo "  --name NAME      Custom snapshot name (Default: db-id-timestamp)"
    echo "  --copy-to REGION Cross-region snapshot copy (e.g. us-east-1)"
    echo "  --dry-run        Show command without executing"
    echo "  --help           Show this help message"
}

# Parse arguments
DRY_RUN=false
while [[ $# -gt 0 ]]; do
    case $1 in
        --db-id) DB_INSTANCE_IDENTIFIER="$2"; shift 2 ;;
        --name) SNAPSHOT_NAME="$2"; shift 2 ;;
        --copy-to) CROSS_REGION_COPY=true; DEST_REGION="$2"; shift 2 ;;
        --dry-run) DRY_RUN=true; shift ;;
        --help) show_help; exit 0 ;;
        *) log_error "Unknown option: $1"; show_help; exit 1 ;;
    esac
done

if [[ -z "$DB_INSTANCE_IDENTIFIER" ]]; then
    log_error "Missing --db-id. Use --help for usage."
    exit 1
fi

# Standardized naming convention
TIMESTAMP=$(date +%Y-%m-%d-%H-%M)
[[ -z "$SNAPSHOT_NAME" ]] && SNAPSHOT_NAME="${DB_INSTANCE_IDENTIFIER}-manual-${TIMESTAMP}"

log_info "Starting RDS Snapshot for $DB_INSTANCE_IDENTIFIER..."
log_info "Snapshot Name: $SNAPSHOT_NAME"

if [[ "$DRY_RUN" == "true" ]]; then
    log_info "[DRY RUN] Would execute: aws rds create-db-snapshot --db-instance-identifier $DB_INSTANCE_IDENTIFIER --db-snapshot-identifier $SNAPSHOT_NAME"
    if [[ "$CROSS_REGION_COPY" == "true" ]]; then
        log_info "[DRY RUN] Would copy snapshot to $DEST_REGION"
    fi
    exit 0
fi

# Create snapshot
aws rds create-db-snapshot \
    --db-instance-identifier "$DB_INSTANCE_IDENTIFIER" \
    --db-snapshot-identifier "$SNAPSHOT_NAME" > /dev/null

# Wait loop with progress indicator
log_info "Waiting for snapshot to complete (this may take several minutes)..."
while true; do
    STATUS=$(aws rds describe-db-snapshots \
        --db-instance-identifier "$DB_INSTANCE_IDENTIFIER" \
        --db-snapshot-identifier "$SNAPSHOT_NAME" \
        --query 'DBSnapshots[0].Status' --output text)
    
    if [[ "$STATUS" == "available" ]]; then
        echo "" # New line after dots
        log_success "Snapshot $SNAPSHOT_NAME is now available."
        break
    elif [[ "$STATUS" == "failed" ]]; then
        echo ""
        log_error "Snapshot $SNAPSHOT_NAME failed."
        exit 1
    else
        echo -n "."
        sleep 15
    fi
done

# Cross-region copy option
if [[ "$CROSS_REGION_COPY" == "true" ]]; then
    log_info "Copying snapshot to region: $DEST_REGION..."
    SOURCE_ARN=$(aws rds describe-db-snapshots \
        --db-instance-identifier "$DB_INSTANCE_IDENTIFIER" \
        --db-snapshot-identifier "$SNAPSHOT_NAME" \
        --query 'DBSnapshots[0].DBSnapshotArn' --output text)
    
    aws rds copy-db-snapshot \
        --source-db-snapshot-identifier "$SOURCE_ARN" \
        --target-db-snapshot-identifier "${SNAPSHOT_NAME}-copy" \
        --region "$DEST_REGION" > /dev/null
    
    log_success "Snapshot copy initiated to $DEST_REGION as ${SNAPSHOT_NAME}-copy"
fi

send_slack "✅ RDS Snapshot completed: $SNAPSHOT_NAME for $DB_INSTANCE_IDENTIFIER"
