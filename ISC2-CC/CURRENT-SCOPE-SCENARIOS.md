# ISC2 CC — Current-Scope Scenario Practice

[← ISC2-CC](./README.md)

> **25 repository-authored scenarios** mapped to the 2026 outline. These are not exam dumps.

Try answering before opening the rationale.

## Domain 1 — Security Principles

### 1. Payroll file was modified

A payroll file remains available and only authorized staff can see it, but account numbers were changed.

**Best concept:** Integrity

**Why:** the primary failure is unauthorized modification.

### 2. Shared administrator account

Five administrators use the same privileged username.

**Primary concern:** Accountability

**Why:** actions cannot be reliably attributed to an individual.

### 3. New internet service without risk assessment

A team buys a security product before identifying assets, threats or impact.

**Better order:** understand risk first, then select controls

**Why:** controls should treat defined risk, not exist without context.

### 4. Secure system with excessive data collection

A service encrypts personal data well but collects far more data than its purpose requires.

**Primary concept:** Privacy

**Why:** security can be strong while data use is inappropriate.

### 5. Critical control never reviewed

Management deployed MFA two years ago but never checked whether privileged exceptions still exist.

**Missing behavior:** Due diligence

**Why:** due care includes implementing reasonable protection; due diligence checks that protection remains effective.

## Domain 2 — Security Governance

### 6. Audit passed, unsupported systems remain

An organization passes a compliance audit while several unsupported public servers remain online.

**Conclusion:** compliance does not eliminate security risk

### 7. Backups exist but restore fails

Daily backups are successful, but the first restore test fails.

**Lesson:** backup success is not proven recovery capability

### 8. Executive dashboard shows packet counts

The board receives millions of firewall-deny counts but no risk trend, threshold or action.

**Problem:** vanity/non-decision-useful metric

### 9. Employee reports suspected phishing

A manager tells the employee not to report “small mistakes” because it makes the team look bad.

**Problem:** poor security culture

### 10. AI provider outage stops customer service

A critical workflow depends entirely on one AI API.

**Governance concern:** BC/resilience dependency

**Better design:** documented fallback/alternate process aligned with RTO/RPO.

## Domain 3 — IAM Concepts

### 11. Employee changes department

The user receives the new role but keeps all old permissions.

**Failure:** privilege creep / weak mover process

### 12. Deployment bot is Global Admin

A bot only deploys one application but receives tenant-wide administration.

**Failure:** Principle of Least Privilege

### 13. Finance creator can also approve payments

One identity can create and approve the same transaction.

**Failure:** Separation of Duties

### 14. File owner decides who can read it

The access decision is controlled by the object owner.

**Model:** DAC

### 15. Access depends on role, managed device and location

The policy evaluates several attributes and context values.

**Model:** ABAC

## Domain 4 — Networking and Cloud Security

### 16. User and database networks are flat

Workstations can directly reach database ports.

**Best architectural improvement:** segmentation + policy enforcement

### 17. SSH is open to the whole internet

A VM allows TCP/22 from any source.

**Better design:** restrict source and use controlled admin path such as VPN/bastion with strong authentication.

### 18. VLAN exists with permissive routing

A team says the database is secure because it is on another VLAN, but inter-VLAN access is unrestricted.

**Problem:** VLAN provides logical segmentation, not sufficient policy enforcement by itself.

### 19. SaaS tenant leaks a public link

The provider secures infrastructure, but a customer user publishes confidential content.

**Model:** Shared Responsibility — customer configuration/data handling still matters.

### 20. VPN means Zero Trust

A team treats every VPN-connected device as trusted.

**Problem:** VPN provides a tunnel; Zero Trust requires explicit/contextual verification and least privilege.

## Domain 5 — Security Operations and Incident Response

### 21. Hundreds of alerts arrive

A SOC has 500 alerts; three involve privileged accounts on critical assets.

**Best first step:** triage/prioritize using asset criticality, confidence and impact.

### 22. Analyst immediately wipes a compromised endpoint

The machine may contain evidence and the scope is still unknown.

**Concern:** follow IRP and evidence-handling requirements before destructive action when circumstances allow.

### 23. Application scanner finds a critical issue

The scanner reports a CVE on an internet-facing service.

**Next reasoning:** validate asset/version/exposure, prioritize and remediate; a scanner finding is not automatically a confirmed compromise.

### 24. Source code is analyzed without execution

**Testing type:** SAST

If the running application is probed externally, that is DAST.

### 25. Employee enters confidential records into public AI

**Primary controls:** data classification/handling, policy, masking where appropriate, awareness and approved AI-service governance

**Why:** AI workspace use is part of normal data-security responsibility.

## Self-review matrix

After answering, tag each miss:

| Tag | Meaning |
|---|---|
| KNOWLEDGE | concept unknown |
| CONFUSION | mixed two related concepts |
| READING | missed scenario requirement |
| OVERTHINK | added assumptions |
| OUTDATED | relied on pre-2026 structure |

For every miss, explain why the wrong option/model was attractive and write one new scenario in your own words.
