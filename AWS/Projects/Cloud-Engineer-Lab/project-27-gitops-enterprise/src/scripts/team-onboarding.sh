#!/bin/bash
# team-onboarding.sh
# Automated onboarding for new engineering teams

set -euo pipefail

TEAM_NAME=$1
ENVIRONMENT=${2:-"dev"}

if [ -z "$TEAM_NAME" ]; then
    echo "Usage: $0 <team-name> [environment]"
    exit 1
fi

echo "--- Onboarding Team: $TEAM_NAME to $ENVIRONMENT ---"

# 1. Create Namespace
kubectl create namespace "$TEAM_NAME-$ENVIRONMENT" --dry-run=client -o yaml | kubectl apply -f -

# 2. Set Resource Quotas
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ResourceQuota
metadata:
  name: ${TEAM_NAME}-quota
  namespace: ${TEAM_NAME}-${ENVIRONMENT}
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "20"
    services.loadbalancers: "0"
EOF

# 3. Create ArgoCD AppProject
cat <<EOF | kubectl apply -f -
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: ${TEAM_NAME}
  namespace: argocd
spec:
  description: Project for team ${TEAM_NAME}
  sourceRepos:
  - 'https://github.com/techwave/${TEAM_NAME}-*.git'
  destinations:
  - namespace: ${TEAM_NAME}-${ENVIRONMENT}
    server: '*'
  clusterResourceWhitelist:
  - group: ''
    kind: Namespace
EOF

echo "[SUCCESS] Team $TEAM_NAME onboarded. GitOps repo ready at https://github.com/techwave/$TEAM_NAME-apps"
