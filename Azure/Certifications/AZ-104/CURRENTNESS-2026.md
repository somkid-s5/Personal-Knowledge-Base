# AZ-104 — Currentness Overlay (2026)

[Back to package README](./README.md) · [QA Matrix](./AZ104-QA-MATRIX.md) · [Source Manifest](./SOURCE-MANIFEST.md)

> **Checked:** 2026-10-07  
> **Exam scope authority:** Microsoft Learn AZ-104 study guide, skills measured as of 2026-04-17

The interactive study source was updated after the current skills-measured date, but Azure platform behavior continues to change. This overlay records high-impact facts that should not be learned from older mental models.

## 1. Basic Load Balancer is retired

Microsoft retired **Azure Basic Load Balancer on 2025-09-30**. Current architecture and new learning examples should use **Standard Load Balancer** unless discussing migration or a historical environment.

Mental model:

```text
Old environment / old notes
Basic Load Balancer
        ↓
migration / compatibility discussion

Current design
Standard Load Balancer
        ↓
NSG-controlled inbound + supported SLA/features
```

Do not memorize Basic vs Standard as if both were normal choices for a new deployment.

Official reference: https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview

## 2. Do not rely on implicit default outbound access

Azure networking guidance now expects an **explicit outbound method** for workloads that require internet egress.

For API versions released after **2026-03-31**, new VNets default toward private subnets rather than automatically giving VMs implicit default outbound access. Existing VNets are not retroactively changed.

Prefer an explicit design such as:

- NAT Gateway,
- Standard Load Balancer outbound rules where appropriate,
- instance-level public IP when that is intentionally required,
- a controlled NVA/firewall egress design.

Operational lesson: when a new VM can reach private resources but not the internet, do not assume Azure will provide hidden outbound SNAT. Check the subnet's private/default-outbound behavior and the explicit egress path.

Official references:

- https://learn.microsoft.com/en-us/azure/networking/design-guide/outbound-egress
- https://learn.microsoft.com/azure/virtual-network/ip-services/default-outbound-access

## 3. Microsoft Entra ID is the current product name

Older material may say **Azure Active Directory / Azure AD**. The current name is **Microsoft Entra ID**.

The identity concepts remain recognizable:

```text
tenant
→ users / groups / external identities
→ licenses
→ authentication
→ Azure RBAC at Azure resource scopes
```

Keep the old name searchable only when it helps interpret historical documentation.

## 4. Separate exam scope from live platform truth

The Microsoft Learn study guide is the authority for **what skills the exam measures**. Service documentation is the authority for **how Azure behaves today**.

Always recheck current docs for:

- retirements and SKU availability,
- default networking behavior,
- quotas and regional support,
- pricing,
- portal navigation,
- VM/storage SKU availability,
- supported backup/replication combinations.

## 5. Maintenance trigger

Re-run this package's QA when:

1. Microsoft publishes a new AZ-104 skills-measured date,
2. an Azure service in the 82-skill inventory is renamed or retired,
3. network/security defaults change materially,
4. the packed interactive learning payload is regenerated,
5. the source document is replaced.

The CI coverage audit protects the declared 2026-04-17 scope; this overlay protects against treating volatile platform behavior as timeless.
