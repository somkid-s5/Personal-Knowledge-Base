#!/bin/bash
set -euo pipefail

# Load common utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/../utils/common.sh"

# Dependencies
check_dep "aws"
check_dep "jq"
check_dep "column"

# Configuration
# Modify this list to include regions you want to scan
REGIONS=("ap-southeast-1" "us-east-1" "eu-west-1")
FORMAT="table"

show_help() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --format table|csv|json  Output format (default: table)"
    echo "  --filter state=running   Filter instances by state"
    echo "  --help                   Show this help message"
}

# Parse arguments
FILTER=""
while [[ $# -gt 0 ]]; do
    case $1 in
        --format) FORMAT="$2"; shift 2 ;;
        --filter) FILTER="$2"; shift 2 ;;
        --help) show_help; exit 0 ;;
        *) log_error "Unknown option: $1"; show_help; exit 1 ;;
    esac
done

# Temporary file to store results from background jobs
TEMP_FILE=$(mktemp)
trap 'rm -f "$TEMP_FILE"' EXIT

fetch_region_inventory() {
    local region=$1
    local filter_arg=""
    
    if [[ "$FILTER" == "state=running" ]]; then
        filter_arg="--filters Name=instance-state-name,Values=running"
    fi

    # Using query to extract relevant fields
    aws ec2 describe-instances --region "$region" $filter_arg \
        --query 'Reservations[].Instances[].{ID:InstanceId, Type:InstanceType, State:State.Name, Name:Tags[?Key==`Name`].Value | [0], LaunchTime:LaunchTime}' \
        --output json >> "$TEMP_FILE"
}

log_info "Fetching EC2 inventory from regions: ${REGIONS[*]}..."

# Run regional queries in parallel (background jobs)
for region in "${REGIONS[@]}"; do
    fetch_region_inventory "$region" &
done

# Wait for all background jobs to finish
wait

# Process data
if [[ "$FORMAT" == "table" ]]; then
    echo -e "\n${BLUE}GLOBAL EC2 INVENTORY${NC}"
    echo -e "${YELLOW}---------------------------------------------------------------------------------------${NC}"
    printf "%-25s %-20s %-15s %-10s %s\n" "INSTANCE ID" "NAME" "TYPE" "STATE" "LAUNCH TIME"
    echo "---------------------------------------------------------------------------------------"

    # Handle the case where TEMP_FILE might contain multiple JSON arrays
    # jq -s 'flatten' merges all separate outputs into one array
    jq -s 'flatten' "$TEMP_FILE" | \
        jq -r '.[] | [.ID, (.Name // "N/A"), .Type, .State, .LaunchTime] | @tsv' | \
        column -t -s $'\t'
    
    echo "---------------------------------------------------------------------------------------"
elif [[ "$FORMAT" == "json" ]]; then
    jq -s 'flatten' "$TEMP_FILE"
fi

log_success "Inventory scan complete."
