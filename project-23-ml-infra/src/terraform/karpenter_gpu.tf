# Karpenter Provisioner for GPU nodes
resource "kubectl_manifest" "karpenter_gpu_pool" {
  yaml_body = <<YAML
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: gpu-pool
spec:
  template:
    spec:
      nodeClassRef:
        name: default
      requirements:
        - key: "karpenter.k8s.aws/instance-family"
          operator: In
          values: ["g4dn", "g5"]
        - key: "karpenter.sh/capacity-type"
          operator: In
          values: ["spot"]
      taints:
        - key: nvidia.com/gpu
          value: "true"
          effect: NoSchedule
YAML
}
