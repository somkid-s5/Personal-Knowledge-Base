# ISC2 CC Domain 1 — Security Principles

[Back to ISC2-CC](./README.md) · [Current Exam Map](./CURRENT-EXAM-MAP.md)

> **Current exam weight:** 24%  
> **Current outline effective:** 2026-09-01  
> **Teaching status:** Current-outline reconstruction in progress  
> **Historical source support:** Thor Study Guide / Quick Sheet Domain 1 (pre-2026 structure)

## เป้าหมายของบทนี้

Domain 1 คือฐานภาษาของทั้งข้อสอบ ถ้าบทนี้ไม่แน่น หัวข้อ IAM, Network, Cloud, Operations และ Incident Response จะกลายเป็นการจำคำศัพท์แยก ๆ

หลังเรียนบทนี้ควรอธิบายได้ว่า:

- Confidentiality, Integrity และ Availability ต่างกันอย่างไร
- Authentication, Authorization และ Accounting อยู่คนละขั้นตรงไหน
- Non-repudiation กับ Privacy ไม่ใช่เรื่องเดียวกันอย่างไร
- Risk เกิดจากอะไร และเราจัดการความเสี่ยงได้แบบไหน
- Regulation, framework, policy, standard และ procedure ต่างกันอย่างไร
- Technical, Administrative และ Physical controls ต่างกันอย่างไร
- Due care, due diligence และ professional ethics มีผลต่อการตัดสินใจด้าน security อย่างไร
- หลัก security เดิมนำไปใช้กับ AI systems ได้อย่างไร

---

## 1. Mental model ใหญ่ของ Domain 1

คิดเป็น flow นี้:

~~~mermaid
flowchart LR
    VALUE[สิ่งที่องค์กรให้คุณค่า] --> RISK[Risk]
    RISK --> GOV[Governance]
    GOV --> CTRL[Controls]
    CTRL --> OPS[Operations]
    OPS --> EVIDENCE[Evidence / Accountability]
    EVIDENCE --> IMPROVE[Review / Improve]
    IMPROVE --> RISK
~~~

Security ไม่ได้เริ่มจากการซื้อ firewall

มันเริ่มจากคำถามว่า:

> เรากำลังปกป้องอะไร จากอะไร เพื่อให้ธุรกิจทำงานต่อได้ในระดับความเสี่ยงที่องค์กรยอมรับได้?

---

# 2. Cybersecurity concepts

## 2.1 CIA Triad

### Confidentiality — ใคร “เห็น” ข้อมูลได้

เป้าหมายคือป้องกันไม่ให้บุคคลหรือระบบที่ไม่ได้รับอนุญาตเข้าถึงข้อมูล

ตัวอย่าง control:

- access control
- encryption
- MFA
- least privilege
- data masking
- screen lock
- secure transport เช่น TLS

ตัวอย่าง failure:

- database เปิด public แล้วมีข้อมูลลูกค้ารั่ว
- user ส่งข้อมูลลับเข้า public AI service
- credential ถูกขโมยแล้ว attacker อ่าน mailbox ได้

คำถามที่ช่วยคิด:

> คนหรือ service นี้ “จำเป็นต้องเห็น” ข้อมูลนี้หรือไม่?

---

### Integrity — ข้อมูลยัง “ถูกต้องและเชื่อถือได้” หรือไม่

Integrity ไม่ได้หมายถึงแค่ข้อมูลหายหรือไม่หาย แต่รวมถึงการถูกแก้ไขอย่างไม่ถูกต้องด้วย

ตัวอย่าง control:

- hashes
- digital signatures
- change control
- file integrity monitoring
- database constraints
- version control
- access permissions

ตัวอย่าง failure:

- attacker แก้เลขบัญชีปลายทาง
- malware เปลี่ยนไฟล์ configuration
- training data ของ AI ถูกปนข้อมูลผิดเพื่อเปลี่ยนพฤติกรรม model

คำถามที่ช่วยคิด:

> เรารู้ได้อย่างไรว่าสิ่งนี้ยังเป็นข้อมูลเดิมที่ควรเชื่อถือ?

---

### Availability — ผู้มีสิทธิ์ “ใช้” ระบบได้เมื่อจำเป็นหรือไม่

ตัวอย่าง control:

- redundancy
- backup
- failover
- capacity planning
- patching
- DDoS protection
- UPS / generator
- monitoring

ตัวอย่าง failure:

- ransomware ทำให้ระบบเปิดไม่ได้
- database primary ล่มโดยไม่มี failover
- traffic พุ่งจน service ใช้งานไม่ได้

คำถามที่ช่วยคิด:

> ระบบจะยังให้บริการได้หรือกลับมาได้เร็วพอตาม business requirement หรือไม่?

---

## 2.2 CIA ไม่ได้มีคำตอบเดียวเสมอ

หลาย control ช่วยมากกว่าหนึ่งด้าน เช่น encryption ช่วย Confidentiality เป็นหลัก แต่ถ้าใช้ digital signature ก็ช่วย Integrity และ Non-repudiation ได้ด้วย

ในข้อสอบให้เริ่มจาก **ผลกระทบหลักของสถานการณ์**

ตัวอย่าง:

- “ข้อมูลถูกเปิดเผย” → Confidentiality
- “ข้อมูลถูกเปลี่ยน” → Integrity
- “ระบบเปิดไม่ได้” → Availability

---

# 3. AAA — Authentication, Authorization, Accounting

จำ flow:

~~~text
Identify → Authenticate → Authorize → Account
ฉันคือใคร → พิสูจน์ → ทำอะไรได้ → บันทึกว่าเกิดอะไรขึ้น
~~~

## Authentication

ตอบคำถามว่า:

> คุณพิสูจน์ได้อย่างไรว่าคุณคือ identity ที่อ้างว่าเป็น?

ตัวอย่าง authentication factors:

- something you know — password / PIN
- something you have — smart card / token / authenticator
- something you are — biometric

**MFA** ต้องใช้ factor ต่างประเภทกัน ไม่ใช่แค่มี password สองอัน

---

## Authorization

เกิดหลัง authentication

ตอบคำถามว่า:

> identity นี้ได้รับอนุญาตให้ทำอะไร?

ตัวอย่าง:

- user login ได้ แต่ไม่มีสิทธิ์อ่าน payroll
- service account เรียก API ได้เฉพาะ read
- admin มีสิทธิ์ restart server แต่ไม่ควรอ่านข้อมูล HR

IAM เชิงลึกจะไปอยู่ Domain 3 แต่ Domain 1 ต้องแยก Authentication กับ Authorization ให้ออกก่อน

---

## Accounting / Accountability

เราต้องสามารถย้อนดูได้ว่า:

- ใครทำ
- ทำอะไร
- เมื่อไร
- จากที่ไหน
- สำเร็จหรือไม่

ตัวอย่าง evidence:

- audit log
- authentication log
- access log
- change log

ถ้าไม่มี logging ที่ดี ต่อให้ access control ถูกต้อง เราก็อาจพิสูจน์เหตุการณ์ย้อนหลังไม่ได้

---

# 4. Non-repudiation

Non-repudiation คือความสามารถในการสร้างหลักฐานที่ทำให้ผู้กระทำปฏิเสธการกระทำได้ยาก

ตัวอย่าง:

- digital signature
- signed transaction
- trustworthy audit trail

อย่าสับสนกับ Integrity:

- Integrity = ข้อมูลไม่ถูกแก้
- Non-repudiation = มีหลักฐานผูกการกระทำกับผู้กระทำ

---

# 5. Privacy

Privacy สนใจว่าองค์กรควร:

- เก็บข้อมูลส่วนบุคคลอะไร
- ใช้เพื่อวัตถุประสงค์อะไร
- ใครเข้าถึงได้
- เก็บนานแค่ไหน
- ส่งต่อได้หรือไม่
- ทำลายอย่างไร

Security ช่วยให้ privacy เกิดขึ้นได้ แต่สองคำนี้ไม่เท่ากัน

ระบบอาจ secure มาก แต่ยังละเมิด privacy ได้ เช่น เก็บข้อมูลเกินความจำเป็นโดยได้รับการป้องกันอย่างดี

Mental model:

~~~text
Security = ปกป้องข้อมูล
Privacy  = ใช้ข้อมูลอย่างเหมาะสมและมีสิทธิ์
~~~

---

# 6. Risk Management

## 6.1 Risk คืออะไร

ใช้ mental model แบบง่าย:

~~~text
Asset + Threat + Vulnerability + Impact → Risk
~~~

- **Asset** — สิ่งที่มีคุณค่า
- **Threat** — สิ่งที่อาจก่อเหตุ
- **Vulnerability** — จุดอ่อนที่ถูกใช้ได้
- **Impact** — ความเสียหายถ้าเหตุเกิด
- **Risk** — ความเป็นไปได้และผลกระทบของเหตุการณ์ต่อเป้าหมาย

ตัวอย่าง:

~~~text
Asset: payroll database
Threat: credential theft
Vulnerability: no MFA
Impact: salary / PII exposure
Risk: unauthorized access to payroll data
~~~

## 6.2 Risk lifecycle

มองแบบวงจร:

~~~mermaid
flowchart LR
    ID[Identify] --> ASSESS[Assess]
    ASSESS --> TREAT[Treat]
    TREAT --> MONITOR[Monitor]
    MONITOR --> REVIEW[Review]
    REVIEW --> ID
~~~

Security ไม่ใช่ “แก้ครั้งเดียวแล้วจบ” เพราะ asset, threat และ business context เปลี่ยนตลอด

---

## 6.3 Risk treatment

วิธีตอบสนองความเสี่ยงที่พบบ่อย:

| Treatment | ความหมาย | ตัวอย่าง |
|---|---|---|
| Avoid | หยุดกิจกรรมที่สร้าง risk | ไม่เปิด service ต่อ Internet |
| Mitigate | ลด likelihood หรือ impact | เพิ่ม MFA / segmentation |
| Transfer | ย้ายผลกระทบบางส่วน | insurance / contract |
| Accept | ยอมรับ risk | cost แก้สูงกว่าผลกระทบที่ยอมรับได้ |

Risk acceptance ควรเป็นการตัดสินใจที่มี authority ไม่ใช่ engineer คนหนึ่งพูดว่า “ไม่น่ามีอะไร”

---

# 7. Governance

Governance ตอบคำถามว่า:

> ใครกำหนดทิศทาง ความคาดหวัง ขอบเขตอำนาจ และความรับผิดชอบ?

จำลำดับจากกว้างไปแคบ:

~~~text
Law / Regulation
      ↓
Framework / Guideline
      ↓
Policy
      ↓
Standard
      ↓
Procedure
~~~

## Regulation / Law

ข้อกำหนดภายนอกที่องค์กรอาจมีหน้าที่ต้องปฏิบัติตาม

## Framework

โครงช่วยจัดระบบการบริหารหรือ controls

framework ไม่ใช่ checklist ที่ต้องทำเหมือนกันทุกองค์กรเสมอไป

## Policy

ผู้บริหารกำหนดว่า “องค์กรต้องการอะไร”

เช่น:

> Privileged access must use multi-factor authentication.

## Standard

กำหนด requirement ที่สม่ำเสมอและวัดได้

เช่น:

> All privileged accounts must use phishing-resistant MFA where supported.

## Procedure

บอกขั้นตอนว่าทำอย่างไร

เช่น:

1. enroll authenticator
2. bind account
3. test sign-in
4. record evidence

คำจำง่าย:

~~~text
Policy    = What / Why
Standard  = Required level
Procedure = How
~~~

---

# 8. Security Controls

Current outline แบ่ง control เป็นสามกลุ่มใหญ่

## Technical controls

ใช้ technology เพื่อ enforce security

ตัวอย่าง:

- firewall
- MFA
- encryption
- EDR
- IDS/IPS
- access control

## Administrative controls

ใช้ governance/process/people

ตัวอย่าง:

- policy
- background checks
- awareness training
- risk assessment
- separation of duties process

## Physical controls

ปกป้องพื้นที่และอุปกรณ์

ตัวอย่าง:

- lock
- guard
- badge
- CCTV
- fence
- secure server room

อย่าจำว่า control หนึ่งต้องมีประเภทเดียวเสมอไปในชีวิตจริง แต่ในข้อสอบให้ตอบตาม **กลไกหลักที่ถูกถาม**

---

# 9. Due Care vs Due Diligence

สองคำนี้ชอบสับสน

## Due Care

การลงมือทำสิ่งที่สมเหตุสมผลเพื่อปกป้ององค์กร

เช่น:

- patch critical vulnerability
- deploy MFA
- train staff
- protect backups

## Due Diligence

การตรวจสอบอย่างต่อเนื่องว่าสิ่งที่ควรทำถูกทำจริงและยังเพียงพอ

เช่น:

- review vulnerability reports
- audit access
- inspect compliance evidence
- verify backup restore tests

จำว่า:

~~~text
Due Care      = ทำสิ่งที่ควรทำ
Due Diligence = ตรวจว่าทำแล้วและยังเหมาะสม
~~~

---

# 10. Professional and Ethical Conduct

Security professional มักเข้าถึงสิ่งที่คนทั่วไปเข้าไม่ได้ เช่น logs, credentials, vulnerabilities, sensitive data และ privileged systems

เพราะงั้น “ทำได้ทางเทคนิค” ไม่เท่ากับ “ควรทำ”

ก่อนทำสิ่งที่มีผลกระทบถามว่า:

1. ฉันมี authorization หรือไม่
2. มี business purpose หรือไม่
3. กระทบ confidentiality / integrity / availability หรือไม่
4. มี evidence / approval หรือไม่
5. สอดคล้องกับ law, policy และ professional ethics หรือไม่

ISC2 Code of Ethics เป็นส่วนหนึ่งของ current Domain 1 และควรอ่านจาก ISC2 โดยตรงก่อนสอบ

---

# 11. AI Security ใน Domain 1

Outline 2026 ใส่ AI security กระจายอยู่ในทุก domain

สำหรับ Domain 1 ให้เอาหลักเดิมมาประยุกต์:

### Confidentiality

อย่าส่ง sensitive data เข้า AI service โดยไม่รู้ data handling / retention / access model

### Integrity

training data หรือ context ที่ถูก manipulate อาจทำให้ output ของ model เปลี่ยนไป เช่น model/data poisoning

### Availability

AI-dependent workflow ก็ต้องมี resilience และ fallback เหมือน service อื่น

### Privacy

prompt, uploaded files และ training datasets อาจมี personal/sensitive information

### Governance

AI tools ต้องอยู่ใต้ policy, legal requirements, risk appetite และ approval process เช่นเดียวกับ software อื่น

### Ethics

ควรคำนึงถึง transparency, bias และผลกระทบของ automated decision-making

> จุดสำคัญ: อย่าคิดว่า “AI security” คือเทคโนโลยีใหม่ที่แยกออกจาก security fundamentals — ในระดับ CC มันคือการเอาหลักเดิมไปใช้กับ asset และ threat แบบใหม่

---

# 12. Decision practice

## Scenario A

บริษัทพบว่า employee ใช้บัญชี admin เดียวกัน 5 คน

ปัญหาหลัก:

- accountability ต่ำ
- attribution ทำได้ยาก
- least privilege อาจไม่ชัด

ทางแก้ควรเริ่มจาก individual identity + appropriate authorization + logging

---

## Scenario B

ระบบมี encryption แข็งแรง แต่ข้อมูลถูกส่งให้ vendor โดยไม่มี business purpose

ประเด็นหลักไม่ใช่แค่ confidentiality แต่เป็น **privacy/governance**

---

## Scenario C

องค์กรซื้อ firewall ใหม่แต่ไม่เคยทำ risk assessment

นี่คือการเริ่มจาก control ก่อนเข้าใจ risk

ลำดับที่ดีกว่า:

~~~text
business / asset
→ threat / vulnerability
→ risk
→ control
→ verification
~~~

---

# 13. Common traps

| Trap | วิธีคิดที่ถูก |
|---|---|
| Authentication = Authorization | พิสูจน์ตัวตน ≠ สิทธิ์ |
| Security = Privacy | ปกป้องข้อมูล ≠ ใช้ข้อมูลอย่างเหมาะสม |
| Hash = Encryption | hash ใช้ตรวจ/derive; ไม่ใช่ reversible encryption |
| Risk = Vulnerability | vulnerability เป็นองค์ประกอบหนึ่งของ risk |
| Policy = Procedure | policy กำหนด direction; procedure บอกขั้นตอน |
| Due care = Due diligence | ลงมือป้องกัน ≠ ตรวจว่าป้องกันจริง |
| AI security = domain ใหม่ | AI concepts ถูก integrate ใน 5 domains |

---

# 14. Knowledge Check

ลองตอบโดยไม่เปิดโน้ต:

1. Confidentiality ต่างจาก Privacy อย่างไร?
2. Authentication กับ Authorization อยู่ลำดับไหน?
3. ถ้าข้อมูลถูกแก้ไขโดยไม่ได้รับอนุญาต CIA ข้อใดกระทบหลัก?
4. ถ้าระบบใช้ไม่ได้จาก DDoS กระทบ CIA ข้อใด?
5. Vulnerability ต่างจาก Risk อย่างไร?
6. Risk mitigation ต่างจาก risk transfer อย่างไร?
7. Policy, Standard และ Procedure ต่างกันอย่างไร?
8. ยกตัวอย่าง Technical / Administrative / Physical control อย่างละหนึ่ง
9. Due care ต่างจาก due diligence อย่างไร?
10. AI model poisoning เชื่อมกับ CIA ด้านใดชัดที่สุด?
11. การส่งข้อมูลลูกค้าเข้า public AI assistant เกี่ยวกับหลักใดบ้าง?
12. ทำไม shared admin account จึงกระทบ accountability?

ถ้าตอบได้โดยอธิบายเหตุผล—not just คำศัพท์—ถือว่าพร้อมไป Domain 2/3 ต่อได้ดีขึ้น

---

## Current official references

- [ISC2 Certified in Cybersecurity Exam Outline](https://www.isc2.org/certifications/cc/cc-certification-exam-outline)
- [ISC2 Certified in Cybersecurity](https://www.isc2.org/certifications/cc)

## Historical private source note

Thor Study Guide / Quick Sheet Domain 1 ที่อยู่ใน private Google Drive ถูกใช้เป็น **foundation/reference** สำหรับ concepts ดั้งเดิม เช่น CIA, authentication/authorization/accountability, risk, governance และ ethics

เนื่องจาก source ชุดนี้สร้างก่อน outline ใหม่ 2026 การจัด domain และคำแนะนำบางส่วนอาจไม่ตรง current exam อีกต่อไป จึงให้ current ISC2 outline เป็น scope authority เสมอ
