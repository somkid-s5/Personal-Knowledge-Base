#!/bin/bash
# vault-init.sh

set -euo pipefail

echo "Checking Vault status..."
kubectl exec -it vault-0 -- vault status || true

echo "Initialising Vault..."
INIT_OUTPUT=$(kubectl exec -it vault-0 -- vault operator init -format=json)

# [IRL] In a real project, you would store these in a secure place (not stdout!)
echo "VAULT INITIALISED"
echo "$INIT_OUTPUT" | jq .

echo "Enabling KV Secrets Engine..."
kubectl exec -it vault-0 -- vault secrets enable -path=secret kv-v2

echo "Configuring Kubernetes Auth..."
K8S_HOST=$(kubectl exec -it vault-0 -- sh -c 'echo $KUBERNETES_SERVICE_HOST')

kubectl exec -it vault-0 -- vault auth enable kubernetes

kubectl exec -it vault-0 -- vault write auth/kubernetes/config \
    kubernetes_host="https://$K8S_HOST:443"

echo "Creating 'myapp-role'..."
kubectl exec -it vault-0 -- vault write auth/kubernetes/role/myapp-role \
    bound_service_account_names=myapp-sa \
    bound_service_account_namespaces=default \
    policies=myapp-policy \
    ttl=24h

echo "Creating 'myapp-policy'..."
kubectl exec -it vault-0 -- vault policy write myapp-policy - <<EOF
path "secret/data/prod/rds" {
  capabilities = ["read"]
}
EOF

echo "Done. Vault is ready for External Secrets Operator."
