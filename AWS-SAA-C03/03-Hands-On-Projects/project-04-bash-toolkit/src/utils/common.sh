#!/bin/bash
# common.sh - Shared utilities for the Automation Toolkit

# ANSI Color Codes
export RED='\033[0;31m'
export GREEN='\033[0;32m'
export YELLOW='\033[1;33m'
export BLUE='\033[0;34m'
export NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1" >&2; }

# Dependency check
check_dep() {
    if ! command -v "$1" &> /dev/null; then
        log_error "Dependency '$1' is missing. Please install it."
        exit 1
    fi
}

# Slack notification function
# Set SLACK_WEBHOOK_URL in your environment or .env file
send_slack() {
    local message="$1"
    local webhook_url="${SLACK_WEBHOOK_URL:-}"

    if [[ -z "$webhook_url" ]]; then
        log_warn "SLACK_WEBHOOK_URL not set. Skipping notification."
        return
    fi

    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"$message\"}" \
        "$webhook_url"
}

# Cleanup trap
cleanup() {
    local exit_code=$?
    if [[ $exit_code -ne 0 ]]; then
        log_error "Script failed with exit code $exit_code"
    fi
}
trap cleanup EXIT
