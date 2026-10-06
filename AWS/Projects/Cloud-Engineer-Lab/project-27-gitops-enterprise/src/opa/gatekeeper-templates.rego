package k8sdenyprivileged

violation[{"msg": msg, "details": {}}] {
    input.review.object.kind == "Pod"
    container := input.review.object.spec.containers[_]
    container.securityContext.privileged
    msg := sprintf("Privileged container is not allowed: %v", [container.name])
}

violation[{"msg": msg, "details": {}}] {
    input.review.object.kind == "Pod"
    container := input.review.object.spec.containers[_]
    not container.resources.limits.cpu
    msg := sprintf("CPU limit is required for container: %v", [container.name])
}

violation[{"msg": msg, "details": {}}] {
    input.review.object.kind == "Service"
    input.review.object.spec.type == "LoadBalancer"
    not input.review.object.metadata.annotations["service.beta.kubernetes.io/aws-load-balancer-internal"]
    msg := "Public LoadBalancers are not allowed. Use internal LB + Ingress."
}
