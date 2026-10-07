# ISC2 CC — Current Study Plan

[Back to ISC2-CC](./README.md)

> **Purpose:** แปลง source study plan เดิมให้เข้ากับ ISC2 CC outline ที่มีผล 2026-09-01  
> **Status:** Repository-authored plan; ปรับตามเวลาจริงได้

## หลักของแผน

Study Plan เดิมใน Drive มีไอเดียที่ดีอยู่สามอย่าง:

1. เรียน → อธิบายด้วยคำของตัวเอง
2. ทำ practice → วิเคราะห์ข้อผิด
3. กลับไปเรียนเฉพาะ weak area

สิ่งที่ต้องเปลี่ยนคือ **ไม่เดินตาม domain order ของ material เก่าแบบตรง ๆ** เพราะ outline 2026 เปลี่ยนโครงแล้ว

แผนนี้จึงใช้:

~~~text
Current official scope
→ Learn
→ Explain
→ Apply
→ Check
→ Fix weak area
→ Repeat
~~~

## รอบที่ 1 — Foundation

### Stage 1 — Domain 1: Security Principles

เรียน:

- CIA
- AAA
- Non-repudiation
- Privacy
- Risk
- Governance
- Controls
- Ethics
- AI security foundations

เป้าหมาย:

> อธิบาย concept ได้โดยไม่อ่าน definition

ใช้ [Domain 1 note](./01-Security-Principles.md)

### Stage 2 — Domain 3: IAM Concepts

เรียนต่อทันทีเพราะ Domain 1 ปู Authentication / Authorization มาแล้ว

เน้น:

- identity lifecycle
- least privilege
- separation of duties
- access-control models
- authentication mechanisms

### Stage 3 — Domain 4: Networking & Cloud Security

เน้น:

- OSI / TCP-IP
- IPv4 / IPv6
- common ports / protocols
- VPN
- firewall
- segmentation / VLAN / micro-segmentation
- Defense in Depth
- Zero Trust
- cloud characteristics
- IaaS / PaaS / SaaS
- deployment models
- shared responsibility

Domain นี้มี weight สูงและเชื่อมกับประสบการณ์ infra ได้เยอะ

---

## รอบที่ 2 — Governance + Operations

### Stage 4 — Domain 2: Security Governance

เน้น:

- GRC
- BC / DR
- awareness
- security culture
- metrics / KRI / dashboards / reporting

### Stage 5 — Domain 5: Security Operations & Incident Response

เน้น:

- data security
- crypto basics
- logging / monitoring
- threat context
- incident response
- asset lifecycle
- configuration / change management
- vulnerability / security testing
- physical/social penetration concepts

---

## รูปแบบ session ที่แนะนำ

หนึ่ง session ใช้โครงนี้:

~~~text
25–40 min  Learn
10–15 min  Explain without notes
15–25 min  Scenario / questions
10 min     Fix notes
~~~

ถ้ามีเวลาไม่พอให้ลดจำนวนหัวข้อ ไม่ใช่ลดขั้น Explain/Review

---

## Explain Test

หลังแต่ละหัวข้อ ลองตอบ:

- มันแก้ปัญหาอะไร?
- ทำงานยังไง?
- ต่างจาก concept ใกล้เคียงอย่างไร?
- ใช้เมื่อไร?
- ถ้าพังจะเห็นอาการอะไร?
- มี security tradeoff อะไร?
- มีตัวอย่างจากระบบจริงได้ไหม?

ถ้าตอบได้เฉพาะ definition ยังไม่ถือว่าเข้าใจ

---

## Practice strategy

ไม่ควรใช้คะแนน practice test อย่างเดียวเป็นตัวชี้ readiness

หลังตอบผิดให้ tag สาเหตุ:

| Tag | ความหมาย |
|---|---|
| KNOWLEDGE | ไม่รู้ concept |
| CONFUSION | สับสนสอง concept |
| READING | อ่าน requirement พลาด |
| OVERTHINK | เติม assumption เอง |
| OUTDATED | source เก่าไม่ตรง current outline |

จากนั้นแก้ที่ต้นเหตุ

ตัวอย่าง:

~~~text
ผิดเพราะ CONFUSION:
Authentication vs Authorization
→ กลับไปวาด flow Identify → Authenticate → Authorize
→ สร้าง scenario ใหม่เอง 3 ข้อ
~~~

---

## Readiness gate

ก่อนเรียกตัวเองว่า exam-ready ควรทำได้อย่างน้อย:

- อธิบายทุก current domain เป็นภาพใหญ่ได้
- ไม่สับสน key pairs เช่น:
  - Authentication / Authorization
  - Risk / Threat / Vulnerability
  - BC / DR
  - Policy / Standard / Procedure
  - Symmetric / Asymmetric / Hashing
  - IDS / IPS
  - IaaS / PaaS / SaaS
- ทำ current-scope practice ได้สม่ำเสมอ
- อธิบายเหตุผลของข้อที่ถูกและข้อที่ผิดได้
- ไม่มี domain ที่อาศัยการจำคำตอบเก่าแทนความเข้าใจ

คะแนน practice เป็น evidence อย่างหนึ่ง แต่ไม่ใช่ evidence เดียว

---

## Source-use rule

Private Thor material ใน Drive ใช้เป็น:

- explanation source
- review source
- mnemonic source
- historical practice structure

แต่ไม่ใช้เป็น authority สำหรับ:

- current domain names
- current weights
- current objective boundaries
- AI-security coverage
- current exam scope

สิ่งเหล่านี้ต้องยึด ISC2 current outline

---

## Current sequence

~~~mermaid
flowchart TD
    D1[1. Security Principles] --> D3[2. IAM Concepts]
    D3 --> D4[3. Networking & Cloud Security]
    D4 --> D2[4. Security Governance]
    D2 --> D5[5. Security Operations & Incident Response]
    D5 --> REVIEW[Mixed Review]
    REVIEW --> WEAK{Weak areas?}
    WEAK -->|Yes| FIX[Re-study + new scenarios]
    FIX --> REVIEW
    WEAK -->|No| READY[Final readiness review]
~~~

## Official scope reference

- [ISC2 Certified in Cybersecurity Exam Outline](https://www.isc2.org/certifications/cc/cc-certification-exam-outline)
