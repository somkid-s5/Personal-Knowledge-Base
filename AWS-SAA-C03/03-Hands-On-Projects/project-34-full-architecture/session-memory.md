# Session Memory & Architectural Decisions

## Active Role
- **Role**: Lead Cloud Architect
- **Responsibility**: Designing enterprise-grade multi-region disaster recovery systems using the AWS Well-Architected Framework.

## Key Architectural Decisions
1. **Multi-Region Active-Passive Setup**:
   - Primary: Singapore (Active ALB, EKS, Aurora Primary).
   - DR: Sydney (Standby ALB, Warm-standby EKS, Aurora Global Database replica).
   - Failover: Automating route failover with Route 53 Geolocation/Failover routing and CloudFront caching.
2. **IaC Integration**:
   - Combining core architectures into a single Terragrunt mono-repo configuration.
3. **High-End Topology Diagram**:
   - Generated a dark-mode multi-region system architecture diagram mapping active and standby paths, global database replication, and edge caching (CloudFront + WAF).
