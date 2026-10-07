#!/bin/bash
# Project 02: Ansible Installation Script

set -euo pipefail

echo "------------------------------------------------"
echo "Project 02: Installing Ansible locally..."
echo "------------------------------------------------"

# 1. Check if Ansible is installed
if command -v ansible >/dev/null 2>&1; then
    echo "Ansible is already installed."
    ansible --version
else
    echo "Installing Ansible..."
    sudo apt update
    sudo apt install software-properties-common -y
    sudo add-apt-repository --yes --update ppa:ansible/ansible
    sudo apt install ansible -y
fi

# 2. Check for ansible-lint
if command -v ansible-lint >/dev/null 2>&1; then
    echo "Ansible-lint is already installed."
else
    echo "Installing ansible-lint..."
    sudo apt install ansible-lint -y
fi

echo "------------------------------------------------"
echo "Local Setup Complete!"
echo "Next step: Update your ansible/inventory.ini"
echo "------------------------------------------------"
