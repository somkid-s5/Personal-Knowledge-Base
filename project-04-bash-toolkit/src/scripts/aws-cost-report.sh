#!/bin/bash
set -euo pipefail

# Load common utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/../utils/common.sh"

# Dependencies
check_dep "aws"
check_dep "jq"
check_dep "column"

# Defaults
DAYS=30
DRY_RUN=false

show_help() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --days N        Report costs for the last N days (default: 30)"
    echo "  --dry-run       Show command without executing (simulated)"
    echo "  --help          Show this help message"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --days) DAYS="$2"; shift 2 ;;
        --dry-run) DRY_RUN=true; shift ;;
        --help) show_help; exit 0 ;;
        *) log_error "Unknown option: $1"; show_help; exit 1 ;;
    esac
done

# Calculate dates
END_DATE=$(date +%Y-%m-%d)
START_DATE=$(date -d "$DAYS days ago" +%Y-%m-%d)

log_info "Generating AWS Cost Report from $START_DATE to $END_DATE..."

if [[ "$DRY_RUN" == "true" ]]; then
    log_info "[DRY RUN] Would execute: aws ce get-cost-and-usage --time-period Start=$START_DATE,End=$END_DATE --granularity MONTHLY --metrics \"UnblendedCost\" --group-by Type=DIMENSION,Key=SERVICE"
    exit 0
fi

# Fetch data
COST_DATA=$(aws ce get-cost-and-usage \
    --time-period Start="$START_DATE",End="$END_DATE" \
    --granularity MONTHLY \
    --metrics "UnblendedCost" \
    --group-by Type=DIMENSION,Key=SERVICE)

# Process and format
echo -e "\n${BLUE}AWS COST REPORT ($START_DATE to $END_DATE)${NC}"
echo -e "${YELLOW}------------------------------------------------------------${NC}"
printf "%-40s %s\n" "SERVICE" "COST (USD)"
echo "------------------------------------------------------------"

echo "$COST_DATA" | jq -r '.ResultsByTime[].Groups[] | [.Keys[0], .Metrics.UnblendedCost.Amount] | @tsv' | \
    sort -rnk2 | column -t -s $'\t'

TOTAL_COST=$(echo "$COST_DATA" | jq -r '.ResultsByTime[].Total.UnblendedCost.Amount' | awk '{sum+=$1} END {print sum}')
echo "------------------------------------------------------------"
log_success "TOTAL COST: \$$(printf "%.2f" "$TOTAL_COST")"

# Optional Slack alert for high costs
if (( $(echo "$TOTAL_COST > 100" | bc -l) )); then
    send_slack "⚠️ High AWS Cost Alert: Total cost for last $DAYS days is \$$(printf "%.2f" "$TOTAL_COST")"
fi
