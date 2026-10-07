# ISC2 CC — Current 2026 Cheat Sheet

[← ISC2-CC](./README.md)

> ใช้ทบทวนหลังเรียนเนื้อหาเต็ม ไม่ใช่ตัวแทนของ teaching notes

## Domain weights

| Domain | Weight |
|---|---:|
| 1 Security Principles | 24% |
| 2 Security Governance | 17.3% |
| 3 IAM Concepts | 20% |
| 4 Networking and Cloud Security | 21.3% |
| 5 Security Operations and Incident Response | 17.3% |

## Domain 1

~~~text
CIA = Confidentiality / Integrity / Availability
AAA = Authentication / Authorization / Accounting
Risk = identify → assess → treat → monitor/review
Governance = law/framework/policy/standard/procedure
Controls = technical / administrative / physical
Due Care = do what should be done
Due Diligence = verify it is done and remains adequate
~~~

Key distinction:

- Authentication ≠ Authorization
- Security ≠ Privacy
- Risk ≠ Vulnerability
- Hashing ≠ Encryption

## Domain 2

~~~text
GRC = Governance + Risk + Compliance
BC  = keep business functioning
DR  = restore technology
RTO = recovery time target
RPO = acceptable data-loss point
KPI = performance indicator
KRI = risk-warning indicator
~~~

Awareness changes behavior; training builds skill.

## Domain 3

~~~text
Define role → Provision → Review → Deprovision
PoLP = minimum sufficient access
SoD  = split critical responsibilities
DAC  = owner decides
MAC  = central labels/clearance decide
RBAC = role decides
ABAC = attributes/context decide
~~~

Machine identities and AI agents need the same lifecycle discipline as human identities.

## Domain 4

~~~text
OSI: Physical → Data Link → Network → Transport → Session → Presentation → Application
TCP = reliable/connection-oriented
UDP = low-overhead/connectionless
VLAN = logical segmentation
Firewall/ACL = policy enforcement
Defense in Depth = multiple control layers
Zero Trust = no implicit trust; verify explicitly
~~~

Cloud:

- Characteristics: on-demand self-service, broad network access, resource pooling, rapid elasticity, measured service
- Service models: IaaS / PaaS / SaaS
- Deployment models: public / private / hybrid / community
- Shared security: provider responsibility changes with service model; customer never has zero responsibility

## Domain 5

Data:

~~~text
Classification → Label → Handle → Protect → Retain → Sanitize/Dispose
Symmetric = same secret key
Asymmetric = public/private pair
Hash = one-way digest
~~~

Operations:

~~~text
Logs → Correlate → Alert → Triage → Escalate
~~~

IR:

~~~text
Prepare → Identify/Triage → Contain → Eradicate → Recover → Improve
~~~

Assets:

~~~text
Acquire → Deploy → Operate → Maintain → Retire
Configuration = desired/current state
Change = controlled transition between states
~~~

Testing:

- Blue = defend
- Red = authorized adversary simulation
- Purple = collaborative improvement
- SAST = analyze without running
- DAST = test running application
- Threat modeling = reason about assets/trust boundaries/threats/mitigations
- Physical penetration examples = phishing, tailgating, impersonation

## High-value comparisons

| Pair | Difference |
|---|---|
| Threat vs Vulnerability | potential cause vs weakness |
| RTO vs RPO | time vs data-loss point |
| BC vs DR | business continuity vs technology recovery |
| KPI vs KRI | performance vs risk warning |
| PoLP vs SoD | permission scope vs split responsibilities |
| VLAN vs Firewall | segmentation vs enforcement |
| IaaS/PaaS/SaaS vs Public/Private/Hybrid | service vs deployment model |
| IDS vs IPS | detect/alert vs detect/block |
| SAST vs DAST | code/static vs running/dynamic |
| Configuration vs Change management | state vs transition |

## AI cross-domain reminder

- D1: protect AI data/model integrity/privacy; ethics/accountability
- D2: AI governance, awareness, continuity, KRIs
- D3: bot/agent identity lifecycle and least privilege
- D4: AI traffic monitoring + segmentation + cloud responsibility
- D5: AI-assisted triage, AI workspace data leakage, AI asset lifecycle/testing

## Exam reasoning pattern

เมื่อเจอ scenario:

1. หา **problem type** ก่อน
2. หา **objective/domain** ที่เกี่ยวข้อง
3. แยก preventive / detective / corrective / recovery intent
4. เลือกคำตอบที่ตรง business/security requirement ที่สุด
5. อย่าเติม assumption ที่โจทย์ไม่ได้ให้
6. ถ้ามีหลายคำตอบดูถูก ให้เลือกสิ่งที่แก้ **root requirement** มากที่สุด

## Official scope

ดู [OBJECTIVE-COVERAGE-2026.md](./OBJECTIVE-COVERAGE-2026.md) สำหรับ mapping 19/19 objectives.
