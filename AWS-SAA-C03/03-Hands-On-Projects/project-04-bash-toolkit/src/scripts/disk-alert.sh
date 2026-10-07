#!/bin/bash
set -euo pipefail

# Load common utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/../utils/common.sh"

# Dependencies
check_dep "ssh"

# Defaults
INVENTORY_FILE=""
THRESHOLD=80

show_help() {
    echo "Usage: $0 --inventory <path> [options]"
    echo ""
    echo "Options:"
    echo "  --inventory <path>  Path to inventory file (one IP/hostname per line)"
    echo "  --threshold <N>     Disk usage percentage threshold (Default: 80)"
    echo "  --help              Show this help message"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --inventory) INVENTORY_FILE="$2"; shift 2 ;;
        --threshold) THRESHOLD="$2"; shift 2 ;;
        --help) show_help; exit 0 ;;
        *) log_error "Unknown option: $1"; show_help; exit 1 ;;
    esac
done

if [[ -z "$INVENTORY_FILE" ]] || [[ ! -f "$INVENTORY_FILE" ]]; then
    log_error "Missing or invalid --inventory file."
    exit 1
fi

check_disk() {
    local host=$1
    log_info "Checking disk usage on: $host"
    
    # Run check over SSH
    # We use a non-interactive shell and batch mode for speed
    local ssh_cmd="df -h / --output=pcent | tail -1 | tr -dc '0-9'"
    local usage=$(ssh -o BatchMode=yes -o ConnectTimeout=5 "$host" "$ssh_cmd" 2>/dev/null || echo "FAILED")
    
    if [[ "$usage" == "FAILED" ]]; then
        log_error "Could not connect to $host"
        return
    fi
    
    if [[ $usage -ge $THRESHOLD ]]; then
        log_warn "$host: Disk usage is ${usage}% (Threshold: ${THRESHOLD}%)"
        
        # Analyze top 10 directories if usage is high
        log_info "Analyzing top directories on $host..."
        local analysis=$(ssh -o BatchMode=yes "$host" "sudo du -ah / | sort -rh | head -n 10" 2>/dev/null || echo "Could not run analysis (sudo required)")
        
        send_slack "🔴 DISK ALERT: $host is at ${usage}% usage.\nTop 10 directories:\n\`\`\`$analysis\`\`\`"
    else
        log_success "$host: Disk usage is ${usage}%"
    fi
}

echo -e "\n${BLUE}REMOTE DISK USAGE MONITOR${NC}"
echo -e "${YELLOW}------------------------------------------------------------${NC}"
printf "%-30s %-20s %s\n" "HOST" "USAGE %" "STATUS"
echo "------------------------------------------------------------"

while IFS= read -r host; do
    [[ -z "$host" || "$host" =~ ^# ]] && continue
    
    ssh_cmd="df -h / --output=pcent | tail -1 | tr -dc '0-9'"
    usage=$(ssh -o BatchMode=yes -o ConnectTimeout=5 "$host" "$ssh_cmd" 2>/dev/null || echo "FAILED")
    
    if [[ "$usage" == "FAILED" ]]; then
        printf "%-30s ${RED}%-20s${NC} %s\n" "$host" "N/A" "CONNECTION FAILED"
    else
        if [[ $usage -ge $THRESHOLD ]]; then
            printf "%-30s ${RED}%-20s${NC} %s\n" "$host" "${usage}%" "ALERT"
        else
            printf "%-30s ${GREEN}%-20s${NC} %s\n" "$host" "${usage}%" "OK"
        fi
    fi
done < "$INVENTORY_FILE"
echo "------------------------------------------------------------"
