# ISC2 CC Domain 3 — Identity and Access Management (IAM) Concepts

> 🧠 **ภาพจำก่อนอ่าน:** 👤 Identity → 🔑 Access → 🛡️ Controls  
> 🎨 [Visual Guide ของวิชานี้](./VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Back to ISC2-CC](./README.md) · [Current Exam Map](./CURRENT-EXAM-MAP.md)

> **Current exam weight:** 20%  
> **Current outline effective:** 2026-09-01  
> **Teaching status:** Current-outline reconstruction in progress  
> **Historical source support:** Thor Study Guide / Quick Sheet Domain 3 (pre-2026 structure)

## เป้าหมายของบทนี้

Domain 3 ใน outline 2026 โฟกัส IAM โดยตรง ไม่ใช่ physical security แบบโครงเก่า

หลังเรียนบทนี้ควรอธิบายได้ว่า:

- Identity lifecycle ตั้งแต่กำหนด role จน deprovision ทำงานอย่างไร
- provisioning กับ authorization ต่างกันตรงไหน
- access review มีไว้แก้ปัญหาอะไร
- Principle of Least Privilege (PoLP) และ Separation of Duties (SoD) ต่างกันอย่างไร
- DAC, MAC, RBAC และ ABAC ใช้แนวคิดแบบไหน
- SSO กับ federation ช่วยอะไร และไม่ได้หมายความว่า security ดีขึ้นโดยอัตโนมัติอย่างไร
- service account, workload identity และ AI bot ควรถูกบริหารเหมือน identity อื่นอย่างไร
- MFA และ behavioral analysis ช่วยลดความเสี่ยง authentication อย่างไร

---

## 1. Mental model ใหญ่ของ IAM

IAM ตอบ 4 คำถาม:

~~~text
Who are you?
→ How do we trust that identity?
→ What may it access?
→ Should it still have that access?
~~~

มองเป็น lifecycle:

~~~mermaid
flowchart LR
    ROLE[Define role] --> PROVISION[Provision identity/access]
    PROVISION --> USE[Use access]
    USE --> REVIEW[Review]
    REVIEW --> CHANGE{Role changed?}
    CHANGE -->|Yes| ADJUST[Adjust / revoke]
    CHANGE -->|No| USE
    ADJUST --> REVIEW
    REVIEW --> END{Still needed?}
    END -->|No| DEPROV[Deprovision]
~~~

IAM ที่ดีไม่ได้จบตอนสร้าง account

ปัญหาใหญ่จำนวนมากเกิดหลังจากนั้น เช่น:

- user ย้ายทีมแต่ยังมีสิทธิ์เก่า
- contractor หมดสัญญาแต่ account ยัง active
- service account มี permission เกินจำเป็น
- privileged access ไม่เคยถูก review
- AI bot ถูกสร้างมาเพื่อ task เดียว แต่ได้ broad access แบบถาวร

---

## 2. Identity คืออะไร

Identity คือ representation ของ entity ที่ระบบใช้เพื่อผูก authentication, attributes และ permissions

identity อาจเป็น:

- human user
- administrator
- contractor
- device
- application
- service account
- workload
- API client
- automated agent / AI bot

สิ่งสำคัญคือ:

> IAM ไม่ได้จัดการแค่ “คน”

ในระบบ cloud และ automation จำนวน identity ที่ไม่ใช่มนุษย์อาจมากกว่าคนจริงหลายเท่า

---

## 3. Identity lifecycle management

Current Domain 3.1 ระบุ lifecycle หลักเป็น:

~~~text
Role definition
→ Provision
→ Review
→ Deprovision
~~~

### 3.1 Role definition

ก่อนสร้าง access ต้องรู้ก่อนว่า identity มีหน้าที่อะไร

ตัวอย่าง:

- Helpdesk
- Database Administrator
- Developer
- Auditor
- Backup Service
- CI/CD Runner

role definition ที่ดีช่วยลดการให้สิทธิ์แบบ ad hoc

ตัวอย่างที่ไม่ดี:

> “Somkid ต้องใช้ระบบหลายอย่าง ให้ admin ไปก่อน”

ตัวอย่างที่ดีกว่า:

> “Database Operator ต้อง start/stop service, inspect logs และ run approved operational commands แต่ไม่ต้องเปลี่ยน IAM policy”

---

### 3.2 Provisioning

Provisioning คือการสร้างหรือเปิด access ที่จำเป็นให้ identity

อาจรวม:

- create account
- assign group
- assign role
- issue credential
- register MFA
- create service identity
- grant application access

Provisioning ควรอิง:

- approved role
- business need
- least privilege
- expiry เมื่อเหมาะสม
- owner / approver

---

### 3.3 Review

Access review ตอบคำถามว่า:

> สิทธิ์ที่เคยถูกต้อง ยังถูกต้องอยู่หรือไม่?

เพราะ business context เปลี่ยนตลอด

ตัวอย่าง trigger:

- periodic review
- employee transfer
- promotion
- project end
- contractor extension
- privileged-role assignment
- dormant account detection

สิ่งที่ควรตรวจ:

- account ยังมี owner หรือไม่
- role ยังตรงกับหน้าที่หรือไม่
- privilege เกินหรือไม่
- unused entitlement มีหรือไม่
- service account ยังถูกใช้อยู่หรือไม่

---

### 3.4 Deprovisioning

Deprovisioning คือการยกเลิก access เมื่อไม่จำเป็น

ตัวอย่าง:

- disable account
- revoke session/token
- remove group memberships
- rotate shared secret ที่เคยเข้าถึง
- remove API key
- revoke certificate
- delete stale service identity

กรณี employee offboarding ความเร็วสำคัญมาก

~~~text
Employment ends
→ disable interactive access
→ revoke active sessions/tokens
→ remove privileged access
→ transfer ownership
→ preserve required audit evidence
~~~

---

## 3.5 IAM frameworks and tools

Current objective 3.1 ระบุ frameworks and tools โดยตรง

ในระดับ CC ให้เข้าใจ **หน้าที่** มากกว่าท่อง vendor:

- **Directory / identity store** — เก็บ identities และ attributes
- **Identity Provider (IdP)** — authenticate และออก identity assertions/tokens
- **IAM platform** — manage users, groups, roles, permissions และ policies
- **Identity Governance / IGA** — access request, approval, certification/review และ lifecycle governance
- **Privileged Access Management (PAM)** — ควบคุม privileged identities, sessions และ credentials
- **Federation / SSO tooling** — สร้าง trust และลด duplicate authentication silos
- **Provisioning automation** — create/update/deprovision access ตาม authoritative lifecycle events

Mental model:

~~~text
HR / source of truth
→ identity lifecycle
→ IAM / directory / IdP
→ applications and resources
→ access review / governance
~~~

tool ไม่แทน least privilege หรือ ownership หาก role design ผิด automation ก็สามารถ provision สิทธิ์ผิดได้เร็วขึ้นเช่นกัน

---

## 4. Joiner → Mover → Leaver

อีก mental model ที่ใช้ในชีวิตจริงคือ JML

### Joiner

คนหรือ workload ใหม่เข้าระบบ

เป้าหมาย:

- ให้ access พอดี
- มี owner
- มี approval
- มี expiry ถ้าชั่วคราว

### Mover

identity เปลี่ยนหน้าที่

นี่เป็นช่วงที่ privilege creep เกิดง่ายมาก

ตัวอย่าง:

~~~text
Old role: Helpdesk
New role: Cloud Engineer

ผิด:
Helpdesk + Cloud Engineer permissions

ดีกว่า:
review old entitlements
→ revoke สิ่งที่ไม่จำเป็น
→ grant new role
~~~

### Leaver

identity ไม่ควรใช้งานแล้ว

ปัญหาคลาสสิก:

- orphaned accounts
- stale VPN access
- API keys ที่ไม่มี owner
- service accounts ของ project ที่เลิกใช้แล้ว

---

## 5. Principle of Least Privilege (PoLP)

หลักคือ:

> ให้สิทธิ์เท่าที่จำเป็นต่อ task และเท่าที่จำเป็นในช่วงเวลานั้น

Least privilege ใช้กับ:

- users
- admins
- applications
- service accounts
- automation
- AI agents

ตัวอย่าง:

แอปต้องอ่าน object จาก storage

ไม่ควรให้:

~~~text
Storage Administrator
~~~

ถ้า requirement จริงคือ:

~~~text
Read objects from one bucket
~~~

---

### 5.1 Least privilege ไม่ใช่ “ให้สิทธิ์น้อยที่สุดจนทำงานไม่ได้”

เป้าหมายไม่ใช่ zero access

เป้าหมายคือ:

~~~text
minimum sufficient access
~~~

ถ้าน้อยเกินไปจนระบบใช้ไม่ได้ ก็เป็น design ที่ผิดเหมือนกัน

---

## 6. Separation of Duties (SoD)

SoD แบ่ง critical process ออกจากกัน เพื่อไม่ให้คนหรือ identity เดียวควบคุมทุกขั้นตอน

ตัวอย่าง financial workflow:

~~~text
Person A creates payment
Person B approves payment
Person C reconciles records
~~~

ถ้าคนเดียวทำได้ทั้งหมด fraud จะตรวจยากขึ้น

ใน IT:

~~~text
Developer writes code
Reviewer approves
Pipeline deploys
Production admin monitors
~~~

SoD ลด:

- fraud
- accidental misuse
- abuse of privilege
- single-person control

---

### 6.1 Least Privilege vs Separation of Duties

ต่างกันแบบนี้:

| Concept | คำถาม |
|---|---|
| Least Privilege | identity นี้มี permission เกินงานหรือไม่ |
| Separation of Duties | critical process ถูกควบคุมโดย identity เดียวหรือไม่ |

สองอย่างทำงานร่วมกัน

---

## 7. Access control models

### 7.1 DAC — Discretionary Access Control

เจ้าของ object มีอำนาจตัดสินใจว่าใครเข้าถึงได้

ตัวอย่างใกล้ตัว:

- file owner แชร์ไฟล์ให้ user อื่น
- owner เปลี่ยน ACL

ข้อดี:

- flexible
- ใช้ง่ายใน general-purpose systems

ข้อเสีย:

- permission อาจกระจายและควบคุมยาก
- user สามารถแชร์ต่อโดยไม่ตั้งใจ

Mental model:

~~~text
Owner decides
~~~

---

### 7.2 MAC — Mandatory Access Control

access ถูกกำหนดจาก security labels / classification และ clearance ตาม policy กลาง

เช่น:

~~~text
Object: Secret
User clearance: Confidential
→ access denied
~~~

ผู้ใช้ทั่วไปเปลี่ยน policy เองไม่ได้

Mental model:

~~~text
Central classification policy decides
~~~

มักเหมาะกับ environment ที่ confidentiality และ formal classification สำคัญมาก

---

### 7.3 RBAC — Role-Based Access Control

permission ถูกผูกกับ role แล้ว user ถูก assign เข้า role

~~~text
User → Role → Permissions
~~~

ตัวอย่าง:

~~~text
Somkid
→ Backup Operator
→ Run backup / restore / read backup logs
~~~

ข้อดี:

- scale ง่าย
- manage คนจำนวนมากง่ายกว่า per-user permissions
- ช่วย JML process

ข้อควรระวัง:

- role explosion
- role ที่กว้างเกินไป
- user สะสมหลาย role จนเกิด privilege creep

---

### 7.4 ABAC — Attribute-Based Access Control

decision ใช้ attributes หลายด้าน

ตัวอย่าง attributes:

- subject.role
- subject.department
- resource.classification
- device.trust
- location
- time
- risk level

ตัวอย่าง policy:

~~~text
Allow access when:
role = Finance
AND device = managed
AND location = Thailand
AND data classification <= Internal
~~~

ABAC flexible กว่า RBAC แต่ policy ซับซ้อนกว่า

Mental model:

~~~text
Context + attributes decide
~~~

---

## 8. Authentication และ MFA ใน IAM

Domain 1 ปู AAA มาแล้ว

ใน IAM ให้มอง authentication เป็น control เพื่อสร้าง confidence ว่า identity ที่กำลัง request access คือ identity ที่ถูกต้อง

MFA ใช้ factor มากกว่าหนึ่งประเภท เช่น:

- knowledge
- possession
- inherence

ตัวอย่าง MFA:

~~~text
Password + authenticator app
~~~

ไม่ใช่ MFA:

~~~text
Password + PIN
~~~

ถ้าทั้งสองเป็น knowledge factor

---

## 9. Federation และ SSO

Thor source เดิมมี federation และ SSO ซึ่งยังเป็น concept ที่มีประโยชน์ต่อ IAM แม้ current objective จะเน้น lifecycle และ logical access controls

### Federation

Federation คือการสร้าง trust ระหว่าง identity systems

แนวคิด:

~~~text
Identity Provider
→ proves identity
→ relying application trusts assertion/token
~~~

ข้อดี:

- ลด duplicate identities
- centralize identity lifecycle
- ลดจำนวน password silos

### SSO

Single Sign-On คือ user authenticate ครั้งหนึ่งแล้วเข้าได้หลาย application ตาม trust relationship

SSO ช่วย UX และ central control แต่:

> SSO ไม่ได้แปลว่า access ทุกอย่างควรเท่ากัน

authorization ยังต้องแยกตาม role/resource

---

## 10. Centralized vs decentralized identity

### Centralized

identity/policy ถูกจัดการจากศูนย์กลาง

ข้อดี:

- governance ง่าย
- review ง่าย
- consistent policy
- faster revocation

ข้อเสีย:

- dependency สูง
- identity platform outage กระทบหลายระบบ

### Decentralized

แต่ละ system จัดการ identity เอง

ข้อดี:

- local autonomy
- dependency ต่ำลงบางกรณี

ข้อเสีย:

- stale accounts
- inconsistent policy
- offboarding ยาก
- audit ยาก

modern enterprise มักพยายาม centralize identity source แล้วกระจาย authorization ตาม workload/application

---

## 11. Privileged access

Privileged accounts ต้องถูกควบคุมเข้มกว่า standard users

ตัวอย่าง:

- Domain Admin
- root
- cloud subscription owner
- database SYS/SYSDBA
- security administrator

ควรมี:

- named individual identity
- MFA
- least privilege
- logging
- review
- time-bound access เมื่อทำได้
- separate admin identity เมื่อเหมาะสม

หลีกเลี่ยง shared admin accounts เพราะทำลาย accountability

---

## 12. Human vs machine identities

ระบบสมัยใหม่มี machine identities จำนวนมาก

ตัวอย่าง:

- CI/CD runner
- Kubernetes workload
- application service account
- backup agent
- monitoring agent
- API integration

หลัก IAM เหมือนกัน:

~~~text
define purpose
→ provision
→ authenticate
→ authorize
→ review
→ rotate/revoke
→ deprovision
~~~

อย่าคิดว่า service account “ไม่มีคนใช้” จึงไม่ต้อง review

จริง ๆ แล้ว orphaned machine identity เป็น risk สูงเพราะมักถูกลืมและใช้ credential อายุยาว

---

## 13. AI bots / agents ใน IAM

ISC2 outline 2026 ย้ำว่า automated systems และ AI bots ต้องผ่าน identity lifecycle เช่นเดียวกับ identity อื่น

ตัวอย่าง:

AI agent ทำ ticket remediation

ไม่ควรให้:

~~~text
Global Administrator
~~~

ถ้ามันต้องทำแค่:

~~~text
read incident
restart one approved service
write remediation result
~~~

ควรออกแบบ:

~~~mermaid
flowchart LR
    AGENT[AI Agent] --> ID[Dedicated workload identity]
    ID --> AUTH[Strong authentication]
    AUTH --> ROLE[Narrow role]
    ROLE --> TARGET[Approved resources only]
    TARGET --> LOG[Audit log]
    LOG --> REVIEW[Periodic access review]
~~~

หลักสำคัญ:

- dedicated identity
- no shared credential
- least privilege
- scope restriction
- auditability
- expiry/review
- human approval สำหรับ high-impact action เมื่อเหมาะสม

---

## 14. AI-assisted authentication

Current ISC2 guidance ยังชี้ถึงการใช้ AI/analytics เพื่อช่วย authentication เช่นตรวจ:

- impossible travel
- abnormal login time
- unusual device
- anomalous behavior

แนวคิดคือ:

~~~text
credential correct
≠
login automatically trustworthy
~~~

risk signal สามารถ trigger:

- step-up MFA
- challenge
- block
- security review

AI เป็นตัวช่วย detection ไม่ใช่เหตุผลให้ละทิ้ง MFA หรือ access-control fundamentals

---

## 15. Access review scenario

สมมติ:

Somkid เดิมอยู่ Helpdesk แล้วเปลี่ยนไป Infra Team

account ปัจจุบันมี:

- Helpdesk Reset Password
- Ticket Admin
- VMware Operator
- Backup Admin
- Oracle ReadOnly

คำถามไม่ใช่:

> จะเพิ่ม Infra role อะไร?

แต่ควรถาม:

> สิทธิ์เดิมข้อไหนยังมี business need?

workflow ที่ถูก:

~~~text
role change
→ enumerate entitlements
→ remove obsolete access
→ grant required new access
→ validate SoD
→ record approval
→ schedule review
~~~

---

## 16. Common IAM failures

### Orphaned account

ไม่มี owner แต่ยัง active

### Privilege creep

สะสมสิทธิ์จาก role เก่าเรื่อย ๆ

### Shared credential

หลายคนใช้ account เดียว ทำ attribution ยาก

### Permanent admin

สิทธิ์สูงถูกเปิดไว้ตลอดแม้ใช้เดือนละครั้ง

### Overprivileged service account

app ถูกให้ broad role เพื่อ “ให้มันใช้ได้ก่อน”

### Missing review

permission ถูกต้องตอนสร้าง แต่ไม่เคยตรวจอีก

### Weak offboarding

disable user แต่ลืม token, API key, VPN หรือ secondary account

---

## 17. Decision practice

### Scenario A

Contractor หมดสัญญาวันนี้ แต่ account ยังต้องเก็บไว้เพื่อ audit

คำตอบที่ดี:

- disable/revoke access
- preserve required records
- ไม่จำเป็นต้องลบ evidence ทันที

นี่คือ deprovisioning โดยไม่ทำลาย audit trail

---

### Scenario B

ทีม developer ทุกคนมี Production Admin เพราะ deploy ง่าย

ปัญหา:

- Least Privilege
- Separation of Duties
- privileged access governance

ทางออกควรใช้ deployment pipeline หรือ scoped deployment role แทน broad human admin

---

### Scenario C

บริษัทใช้ SSO แล้วคิดว่า “ทุก app ปลอดภัยเท่ากันแล้ว”

ผิด เพราะ SSO จัดการ authentication/trust ได้ดีขึ้น แต่ authorization ของแต่ละ application ยังต้องออกแบบแยก

---

### Scenario D

AI bot ต้องอ่าน alert และ restart service หนึ่งตัว

ให้ subscription-wide admin role เพื่อความสะดวก

นี่เป็น violation ของ PoLP

ควรสร้าง dedicated workload identity + narrow action scope + logging

---

## 18. Common traps

| Trap | วิธีคิดที่ถูก |
|---|---|
| IAM = password management | IAM ครอบคลุม lifecycle + access + review + deprovision |
| SSO = authorization | SSO ช่วย authentication flow; authorization ยังแยก |
| RBAC = user permissions ตรง ๆ | permission → role → user |
| MFA = password สองชุด | ต้องต่าง factor categories |
| Least privilege = ให้น้อยที่สุด | ให้ minimum sufficient access |
| SoD = least privilege | SoD แยก critical responsibilities |
| Service account ไม่ต้อง review | machine identities ต้องมี lifecycle |
| Old Domain 3 = current Domain 3 | outline 2026 เปลี่ยน Domain 3 เป็น IAM โดยตรง |

---

## 19. Knowledge Check

ตอบโดยไม่เปิดโน้ต:

1. Role definition มาก่อน provisioning เพราะอะไร?
2. Provisioning ต่างจาก authorization อย่างไร?
3. Access review ป้องกัน privilege creep ได้อย่างไร?
4. Deprovisioning ควรทำอะไรนอกจาก disable account?
5. Least Privilege ต่างจาก Separation of Duties อย่างไร?
6. DAC ใครเป็นผู้ตัดสิน access?
7. MAC ใช้อะไรเป็นแกนในการตัดสิน access?
8. RBAC กับ ABAC ต่างกันอย่างไร?
9. SSO กับ federation ต่างกันอย่างไรในเชิง concept?
10. ทำไม shared admin account จึงเป็นปัญหา?
11. service account ควรมี owner และ review หรือไม่ เพราะอะไร?
12. AI bot ควรได้ identity แบบไหน?
13. impossible travel ใช้เป็น signal ทำอะไรได้บ้าง?
14. Employee ย้ายทีมแล้วควร grant role ใหม่อย่างเดียวหรือไม่?
15. orphaned identity คืออะไร?

ถ้าตอบพร้อมเหตุผลได้ แปลว่าเข้าใจ IAM มากกว่าการจำ acronym

---

## Current official references

- [ISC2 Certified in Cybersecurity Exam Outline](https://www.isc2.org/certifications/cc/cc-certification-exam-outline)
- [Inside the Updated ISC2 Certified in Cybersecurity Exam](https://www.isc2.org/Insights/2026/08/inside-the-updated-isc2-cc-exam)

## Historical private source note

Thor Study Guide / Quick Sheet Domain 3 ใน private Google Drive มี material ที่ยังมีประโยชน์ เช่น identity provisioning, federation, centralized/decentralized identity, DAC/MAC/RBAC/ABAC, least privilege และ separation of duties

อย่างไรก็ตาม source เก่าให้พื้นที่กับ Physical Security จำนวนมาก ซึ่ง **ไม่ใช่แกนของ current Domain 3 ปี 2026** จึงไม่ถูกย้ายมาปนในบท IAM นี้แบบตรง ๆ

เนื้อหาที่ไม่ตรง domain ใหม่จะถูก remap ไปยัง teaching layer ที่เหมาะสมใน pass ถัดไป
