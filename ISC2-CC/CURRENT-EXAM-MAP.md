# ISC2 CC — Current Exam Map

[Back to ISC2-CC](./README.md)

> **Scope authority:** ISC2 Certified in Cybersecurity Exam Outline  
> **Effective date:** 2026-09-01  
> **Verified:** 2026-10-07  
> **Status:** Current scope map; 19/19 numbered objectives have teaching coverage

## Exam format

The current ISC2 CC exam is delivered as Computerized Adaptive Testing (CAT).

- exam time: 2 hours,
- item count: 100–125,
- passing score: 700 / 1000,
- item types: multiple choice and advanced item types.

Always verify operational exam details again near the actual booking date.

## Domain map

| Domain | Weight | Current focus |
|---|---:|---|
| 1. Security Principles | 24% | security fundamentals, risk, governance, controls, ethics |
| 2. Security Governance | 17.3% | GRC, resilience, awareness, effectiveness |
| 3. Identity and Access Management (IAM) Concepts | 20% | identity lifecycle, authentication, logical access |
| 4. Networking and Cloud Security Concepts | 21.3% | networking, security architecture, cloud security |
| 5. Security Operations and Incident Response | 17.3% | data security, operations, IR, asset protection, testing |

Total: 100%.

## Cross-domain 2026 theme — AI security

The 2026 refresh integrates foundational AI-security awareness across all five domains rather than isolating it as a separate domain. During the teaching pass, AI-related examples should be mapped into the relevant security principle, governance, IAM, networking/cloud or operations objective instead of being treated as an unrelated appendix.

This is a notable current-scope delta and should be checked explicitly when older study material is remapped.

## Domain 1 — Security Principles

Teaching note: [01-Security-Principles.md](./01-Security-Principles.md)

Current study buckets:

- Confidentiality, Integrity and Availability,
- Authentication, Authorization and Accounting,
- non-repudiation and privacy,
- risk-management lifecycle and treatment,
- laws, regulations, frameworks, policies, standards and procedures,
- technical, administrative and physical controls,
- professional conduct, due care, due diligence and the ISC2 Code of Ethics.

### Mental model

~~~text
business value
→ risk
→ governance
→ controls
→ evidence / accountability
~~~

This domain is the vocabulary layer for the rest of the certification.

## Domain 2 — Security Governance

Teaching system: [02-Security-Governance/](./02-Security-Governance/)

Current study buckets:

- Governance, Risk and Compliance (GRC),
- Business Continuity and Disaster Recovery,
- security awareness and organizational security culture,
- measurement using metrics, KRIs, dashboards, scorecards and reports.

### Mental model

~~~text
policy / risk appetite
→ resilience plan
→ people behavior
→ measurement
→ management decision
~~~

This domain is broader than the older CC Domain 2 organization and must not be mapped one-to-one from pre-2026 notes.

## Domain 3 — Identity and Access Management Concepts

Teaching note: [03-Identity-Access-Management.md](./03-Identity-Access-Management.md)

Current study buckets:

- identity lifecycle: define role → provision → review → deprovision,
- Principle of Least Privilege,
- Separation of Duties,
- access-control models and logical controls,
- authentication and identity-related security mechanisms.

### Mental model

~~~text
Who are you?
→ How do we prove it?
→ What may you do?
→ Is that access still justified?
→ Remove access when no longer needed
~~~

## Domain 4 — Networking and Cloud Security Concepts

Teaching note: [04-Networking-Cloud-Security.md](./04-Networking-Cloud-Security.md)

Current study buckets:

- OSI and TCP/IP foundations,
- IPv4 / IPv6,
- VPN,
- firewalls, ports and applications,
- wireless, embedded systems, ICS and IoT,
- segmentation, VLANs and micro-segmentation,
- Defense in Depth,
- Zero Trust,
- cloud characteristics,
- cloud service and deployment models,
- shared security responsibility.

### Mental model

~~~text
traffic path
→ trust boundary
→ segmentation
→ inspection / enforcement
→ least privilege
→ monitoring
~~~

The 2026 outline makes cloud security explicit in this domain.

## Domain 5 — Security Operations and Incident Response

Teaching system: [05-Security-Operations-Incident-Response/](./05-Security-Operations-Incident-Response/)

Current study buckets:

- data classification, labeling, masking and sanitization,
- symmetric/asymmetric cryptography and hashing,
- security logging and monitoring,
- event triage and correlation,
- threat actors, threat intelligence and threat frameworks,
- incident response plans and exercises,
- asset lifecycle and End-of-Life risk,
- configuration and change management,
- blue/purple/red team concepts,
- vulnerability scanning, static/dynamic analysis and threat modeling,
- physical/social penetration techniques.

### Mental model

~~~text
collect evidence
→ detect
→ triage
→ respond
→ recover / improve
→ continuously test controls
~~~

## Objective evidence

See [OBJECTIVE-COVERAGE-2026.md](./OBJECTIVE-COVERAGE-2026.md) for the **19/19** objective-to-teaching mapping.

## 2026 delta rule

Private Drive material created before the 2026 outline refresh is **foundation/reference material**, not the final scope authority.

When remapping older notes:

1. preserve useful concepts,
2. map each concept to the current domain/objective,
3. flag missing 2026 concepts,
4. add current official references,
5. only then promote the teaching note as current.

## Official references

- [ISC2 CC Exam Outline](https://www.isc2.org/certifications/cc/cc-certification-exam-outline)
- [ISC2 CC Certification](https://www.isc2.org/certifications/cc)
