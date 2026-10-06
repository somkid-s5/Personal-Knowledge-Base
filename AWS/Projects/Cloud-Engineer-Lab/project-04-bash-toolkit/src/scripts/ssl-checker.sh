#!/bin/bash
set -euo pipefail

# Load common utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/../utils/common.sh"

# Dependencies
check_dep "openssl"

# Defaults
DOMAINS_FILE=""
DAYS_THRESHOLD=14

show_help() {
    echo "Usage: $0 [domains...] or $0 --file <path>"
    echo ""
    echo "Options:"
    echo "  --file <path>    Read domains from a file (one per line)"
    echo "  --threshold <N>  Days threshold for alert (Default: 14)"
    echo "  --help           Show this help message"
}

# Parse arguments
DOMAINS=()
while [[ $# -gt 0 ]]; do
    case $1 in
        --file) DOMAINS_FILE="$2"; shift 2 ;;
        --threshold) DAYS_THRESHOLD="$2"; shift 2 ;;
        --help) show_help; exit 0 ;;
        *) DOMAINS+=("$1"); shift ;;
    esac
done

if [[ -n "$DOMAINS_FILE" ]]; then
    if [[ ! -f "$DOMAINS_FILE" ]]; then
        log_error "File not found: $DOMAINS_FILE"
        exit 1
    fi
    while IFS= read -r domain; do
        [[ -n "$domain" ]] && DOMAINS+=("$domain")
    done < "$DOMAINS_FILE"
fi

if [[ ${#DOMAINS[@]} -eq 0 ]]; then
    log_error "No domains provided. Use --help for usage."
    exit 1
fi

check_ssl() {
    local domain=$1
    log_info "Checking SSL for: $domain"
    
    # Get expiration date using openssl
    local expiration_date=$(timeout 5 openssl s_client -connect "$domain":443 -servername "$domain" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2 || echo "FAILED")
    
    if [[ "$expiration_date" == "FAILED" ]]; then
        log_error "Could not connect to $domain"
        return
    fi
    
    # Convert dates to seconds
    local exp_seconds=$(date -d "$expiration_date" +%s)
    local now_seconds=$(date +%s)
    local days_left=$(( (exp_seconds - now_seconds) / 86400 ))
    
    if [[ $days_left -lt 0 ]]; then
        log_error "$domain: EXPIRED ($days_left days)"
        send_slack "🔴 CRITICAL: SSL for $domain EXPIRED ($days_left days)"
    elif [[ $days_left -le $DAYS_THRESHOLD ]]; then
        log_warn "$domain: Expiring soon in $days_left days"
        send_slack "🟡 WARNING: SSL for $domain expires in $days_left days"
    else
        log_success "$domain: Valid ($days_left days remaining)"
    fi
}

echo -e "\n${BLUE}SSL CERTIFICATE CHECKER${NC}"
echo -e "${YELLOW}------------------------------------------------------------${NC}"
printf "%-30s %-20s %s\n" "DOMAIN" "STATUS" "DAYS LEFT"
echo "------------------------------------------------------------"

for domain in "${DOMAINS[@]}"; do
    # Simple check output
    expiration_date=$(timeout 5 openssl s_client -connect "$domain":443 -servername "$domain" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2 || echo "FAILED")
    if [[ "$expiration_date" == "FAILED" ]]; then
        printf "%-30s ${RED}%-20s${NC} %s\n" "$domain" "CONNECTION FAILED" "N/A"
        continue
    fi
    
    exp_seconds=$(date -d "$expiration_date" +%s)
    now_seconds=$(date +%s)
    days_left=$(( (exp_seconds - now_seconds) / 86400 ))
    
    if [[ $days_left -lt 0 ]]; then
        printf "%-30s ${RED}%-20s${NC} %s\n" "$domain" "EXPIRED" "$days_left"
    elif [[ $days_left -le $DAYS_THRESHOLD ]]; then
        printf "%-30s ${YELLOW}%-20s${NC} %s\n" "$domain" "EXPIRING SOON" "$days_left"
    else
        printf "%-30s ${GREEN}%-20s${NC} %s\n" "$domain" "VALID" "$days_left"
    fi
done
echo "------------------------------------------------------------"
