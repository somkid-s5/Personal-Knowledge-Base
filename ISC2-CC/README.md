# ISC2-CC — Certified in Cybersecurity

> 📘 **สมุดโน้ต ISC2 CC** — เรียนพื้นฐาน Cybersecurity จาก Concept, ตัวอย่างสถานการณ์ และแบบทบทวน
> 🗓️ **อัปเดตหัวข้อสอบที่ใช้อ่าน:** 2026-10-07 (Exam Outline มีผล 2026-09-01)

[← Repository root](../README.md)

## 🛡️ Visual Memory — ดูภาพก่อนอ่านบทเต็ม

![ISC2 CC concept icon path](./assets/visual-memory/01-concept-path.svg)

**🧠 🔒 Confidentiality · 🧾 Integrity · 🟢 Availability** — 📌 CIA คือผลลัพธ์ที่ต้องปกป้อง ไม่ใช่รายชื่อเครื่องมือ; หนึ่ง Control อาจช่วยมากกว่าหนึ่งด้าน

[📘 เปิด Visual Guide แบบ Icon-First (Concept + Troubleshooting)](./VISUAL-MEMORY-GUIDE-TH.md) · [🎨 มาตรฐาน Visual ร่วม](../docs/ICON-FIRST-LEARNING-STANDARD.md)

## 📖 วิธีอ่านสมุดโน้ตนี้

ฉันจัดเนื้อหา ISC2 CC ตามหัวข้อสอบปัจจุบันเพื่อให้เปิดอ่านและเรียนต่อได้ตามลำดับ เริ่มจาก Security Principles → IAM → Networking → Governance → Security Operations ตามแผนเรียน 1 → 3 → 4 → 2 → 5

หัวข้อสอบมีการเปลี่ยนแปลงตั้งแต่ 1 กันยายน 2026 ดังนั้นเวลาอ่านโน้ตหรือทำโจทย์ ให้ยึดหัวข้อและน้ำหนักสอบที่แสดงด้านล่างเป็นหลัก

**[🧭 ตารางจับคู่ Domain → Scenario → Review](./ISC2-DOMAIN-PRACTICE-MAP-TH.md)** — เรียนตามลำดับหลัก อ่าน Cheat Sheet เมื่อจำเป็น แล้วฝึก Scenario ตามกลุ่มข้อโดยไม่ต้องอ่านซ้ำทั้งคอร์ส

## Current exam domains

| Domain | Weight | Learning role |
|---|---:|---|
| 1. Security Principles | 24% | Core security, risk, governance, controls and ethics |
| 2. Security Governance | 17.3% | GRC, resilience, awareness and effectiveness measurement |
| 3. Identity and Access Management (IAM) Concepts | 20% | Identity lifecycle, authentication and logical access |
| 4. Networking and Cloud Security Concepts | 21.3% | Networking, segmentation, defense architecture and cloud security |
| 5. Security Operations and Incident Response | 17.3% | Data protection, monitoring, threat context, IR, asset protection and testing |

See [CURRENT-EXAM-MAP.md](./CURRENT-EXAM-MAP.md) for the current study map.

Current teaching artifacts:

- [Domain 1 — Security Principles](./01-Security-Principles.md)
- [Domain 2 — Security Governance](./02-Security-Governance/)
- [Domain 3 — Identity and Access Management](./03-Identity-Access-Management.md)
- [Domain 4 — Networking and Cloud Security](./04-Networking-Cloud-Security.md)
- [Domain 5 — Security Operations and Incident Response](./05-Security-Operations-Incident-Response/)
- [19-Objective Coverage](./OBJECTIVE-COVERAGE-2026.md)
- [Current Study Plan](./STUDY-PLAN.md)
- [Cheat Sheet](./CHEAT-SHEET.md)
- [25 Scenario Practice](./CURRENT-SCOPE-SCENARIOS.md)

## Source model

~~~text
Current ISC2 exam outline
        ↓
current objective map
        ↓
private Drive study material
        ↓
remap / gap analysis
        ↓
Thai teaching reconstruction
        ↓
practice + review + QA
~~~

Private Drive sources currently include Thor study guides/quick sheets, mnemonics and a study plan. They are registered in [SOURCE-MANIFEST.md](./SOURCE-MANIFEST.md) and tracked in [SOURCE-COVERAGE.md](./SOURCE-COVERAGE.md).

The repository does **not** copy the proprietary PDFs themselves.

## Recommended learning order

1. Read [CURRENT-EXAM-MAP.md](./CURRENT-EXAM-MAP.md) to understand the 2026 target.
2. Follow [STUDY-PLAN.md](./STUDY-PLAN.md) for the current recommended sequence.
3. Start with [Domain 1 — Security Principles](./01-Security-Principles.md), then continue with [Domain 3 — Identity and Access Management](./03-Identity-Access-Management.md).
4. Continue with [Domain 4 — Networking and Cloud Security](./04-Networking-Cloud-Security.md) because it is the largest technical domain.
5. Study [Domain 2 — Security Governance](./02-Security-Governance/) to connect GRC, resilience, awareness and measurement.
6. Finish with [Domain 5 — Security Operations and Incident Response](./05-Security-Operations-Incident-Response/) to connect data protection, monitoring, IR, assets and testing.
7. Review with [CHEAT-SHEET.md](./CHEAT-SHEET.md) and [CURRENT-SCOPE-SCENARIOS.md](./CURRENT-SCOPE-SCENARIOS.md).

## Current state

Completed in the current teaching-scope pass:

- official 2026 ISC2 CC scope and weights verified,
- **19/19 numbered objectives** mapped to repository teaching artifacts,
- all five current domains have Thai teaching content,
- AI-security concepts are integrated across all five domains,
- all 11 supplied/discovered private Drive source files are explicitly accounted for,
- pre-2026 Thor domain structure is remapped in [LEGACY-SOURCE-REMAP.md](./LEGACY-SOURCE-REMAP.md),
- the unavailable full Thor Domain 5 Study Guide remains documented as **not supplied**, not silently inferred,
- current study plan, cheat sheet and 25 original scenarios are available,
- proprietary PDFs/figures are not vendored into the repository.

Evidence: [OBJECTIVE-COVERAGE-2026.md](./OBJECTIVE-COVERAGE-2026.md), [SOURCE-COVERAGE.md](./SOURCE-COVERAGE.md), [SYSTEM-QA.md](./SYSTEM-QA.md).

## Completion rule

`Verified Current Objective Teaching Scope` means every current numbered objective has a teaching artifact and the supplied private source set is accounted for at the declared verification date. It does **not** mean every possible cybersecurity topic is covered, guarantee an exam pass, or make historical proprietary sources redistributable.

Repository CI passed for the verification candidate. Re-verify this claim when ISC2 changes the outline or when the source/scope contract changes.

## Evidence

- [Current Exam Map](./CURRENT-EXAM-MAP.md)
- [Source Manifest](./SOURCE-MANIFEST.md)
- [Source Coverage](./SOURCE-COVERAGE.md)
- [System QA](./SYSTEM-QA.md)
- [19-Objective Coverage](./OBJECTIVE-COVERAGE-2026.md)
- [Legacy Source Remap](./LEGACY-SOURCE-REMAP.md)

## Official references

- [ISC2 CC Exam Outline](https://www.isc2.org/certifications/cc/cc-certification-exam-outline)
- [ISC2 CC Certification](https://www.isc2.org/certifications/cc)
