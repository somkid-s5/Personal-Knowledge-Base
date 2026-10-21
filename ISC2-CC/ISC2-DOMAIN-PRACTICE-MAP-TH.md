# 🧭 ISC2 CC — Domain → Scenario → Review Map

> 📘 **อ่านหลักเพียงชุดเดียว** — Domain 1 → 3 → 4 → 2 → 5 แล้วทำ 25 Scenario ท้ายคอร์ส; Visual Guide และ Cheat Sheet ใช้ทบทวนเฉพาะจุด ไม่ใช่เนื้อหาบังคับอีกหนึ่งรอบ

[🏠 ISC2 CC Learning Hub](./README.md) · [📅 Study Plan](./STUDY-PLAN.md) · [🧠 Cheat Sheet](./CHEAT-SHEET.md) · [📝 Scenario Practice](./CURRENT-SCOPE-SCENARIOS.md)

## 🗺️ เส้นทางอ่านหลักและแบบฝึกที่เกี่ยวข้อง

| ขั้น | Domain | เนื้อหาในหลักสูตร | Scenario ที่ควรลอง | ทบทวนเมื่อยังสับสน |
|---:|---|---|---|---|
| 1 | **Domain 1** | [01 Security Principles](./01-Security-Principles.md) | [ข้อ 01–05](./CURRENT-SCOPE-SCENARIOS.md) | [Cheat Sheet Domain 1](./CHEAT-SHEET.md) |
| 2 | **Domain 3** | [03 Identity Access Management](./03-Identity-Access-Management.md) | [ข้อ 11–15](./CURRENT-SCOPE-SCENARIOS.md) | [Cheat Sheet Domain 3](./CHEAT-SHEET.md) |
| 3 | **Domain 4** | [04 Networking Cloud Security](./04-Networking-Cloud-Security.md) | [ข้อ 16–20](./CURRENT-SCOPE-SCENARIOS.md) | [Cheat Sheet Domain 4](./CHEAT-SHEET.md) |
| 4 | **Domain 2** | [2.1 GRC](./02-Security-Governance/2.1-GRC.md)<escape>, </escape>[2.2 Redundancy BC DR](./02-Security-Governance/2.2-Redundancy-BC-DR.md)<escape>, </escape>[2.3 Security Awareness](./02-Security-Governance/2.3-Security-Awareness.md)<escape>, </escape>[2.4 Metrics KRI Reporting](./02-Security-Governance/2.4-Metrics-KRI-Reporting.md) | [ข้อ 06–10](./CURRENT-SCOPE-SCENARIOS.md) | [Cheat Sheet Domain 2](./CHEAT-SHEET.md) |
| 5 | **Domain 5** | [5.1 Data Security](./05-Security-Operations-Incident-Response/5.1-Data-Security.md)<escape>, </escape>[5.2 Security Operations](./05-Security-Operations-Incident-Response/5.2-Security-Operations.md)<escape>, </escape>[5.3 Incident Response](./05-Security-Operations-Incident-Response/5.3-Incident-Response.md)<escape>, </escape>[5.4 Asset Protection](./05-Security-Operations-Incident-Response/5.4-Asset-Protection.md)<escape>, </escape>[5.5 Security Testing](./05-Security-Operations-Incident-Response/5.5-Security-Testing.md) | [ข้อ 21–25](./CURRENT-SCOPE-SCENARIOS.md) | [Cheat Sheet Domain 5](./CHEAT-SHEET.md) |

## 🧠 วิธีทำโจทย์โดยไม่อ่านซ้ำ

1. อ่าน Domain ตามลำดับบนหน้า Learning Hub พร้อมใช้ Visual Diagram และคำอธิบายประกอบบท
2. อ่านจบ Domain → เปิด Scenario แล้วเลือกทำเฉพาะข้อของ Domain นั้น โดยพยายามตอบก่อนอ่านเหตุผล
3. ทำผิดเพราะไม่รู้ Concept หรือสับสนสองคำ → เปิด Cheat Sheet แล้ว **กลับไปแก้เฉพาะบทที่อ่อน**
4. อ่านครบ 5 Domains → ทำ Scenario ทั้ง 25 ข้อเป็นแบบ Mixed Review ในขั้นสุดท้าย (`cc-013`)
5. ใช้ [Objective Coverage](./OBJECTIVE-COVERAGE-2026.md) เพื่อตรวจภาพรวม 19 Objectives ไม่ใช่อ่านเป็นบทที่หก

## 🧩 ตัวอย่างเชื่อมโยงความเข้าใจข้าม Domain

| ตอบผิดเรื่อง | กลับไปทบทวน |
|---|---|
| Risk vs Vulnerability, Due Care vs Due Diligence | Domain 1 Security Principles และ Domain 2 Governance |
| Authentication vs Authorization, RBAC vs ABAC | Domain 3 IAM |
| Network Segmentation, Zero Trust vs VPN | Domain 4 Network Security |
| BC vs DR, RTO/RPO, Security Metrics | Domain 2 Governance |
| Data Protection, SIEM Triage, Incident Handling | Domain 5 Security Operations |

## 📌 สถานะและขอบเขต

- แบบฝึก 25 Scenarios เป็นโจทย์ที่จัดทำใน Repository ไม่ใช่ข้อสอบจริงหรือ Exam Dump
- ตาราง Mapping เป็น Learning Navigation ไม่ใช่การรับรองว่า Concept ทุกแง่มุมถูกครอบคลุมหรือการสอบผ่าน
- ความคืบหน้า Learning Hub นับ **บทหลัก 13 ขั้นเดิม** เหมือนก่อนปรับ ไม่เพิ่ม Completion จาก Cheat Sheet/Review
- ไฟล์ Study Plan, Cheat Sheet และ Scenario เดิมยังอยู่ที่ Path เดิมเพื่อรักษาลิงก์
