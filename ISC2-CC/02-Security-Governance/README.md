# Domain 2 — Security Governance

[← ISC2-CC](../README.md) · [Current Exam Map](../CURRENT-EXAM-MAP.md)

> Weight: **17.3%** · Outline effective: **2026-09-01**

Domain 2 ตอบคำถามว่าองค์กรจะกำหนดทิศทางด้าน security, รักษาความต่อเนื่อง, สร้างพฤติกรรมที่ปลอดภัย และวัดผลให้ผู้บริหารตัดสินใจได้อย่างไร

~~~mermaid
flowchart LR
  GRC[GRC] --> RED[Redundancy / BC-DR]
  RED --> PEOPLE[Awareness / Culture]
  PEOPLE --> METRIC[Metrics / KRI]
  METRIC --> DECIDE[Decision]
  DECIDE --> GRC
~~~

## Current objectives

1. [2.1 Plan Governance, Risk and Compliance](./2.1-GRC.md)
2. [2.2 Understand Redundancy](./2.2-Redundancy-BC-DR.md)
3. [2.3 Understand Security Awareness](./2.3-Security-Awareness.md)
4. [2.4 Measure Cybersecurity Effectiveness](./2.4-Metrics-KRI-Reporting.md)

## Exam mental model

- **GRC** = structure + accountability + obligations + risk decisions
- **Redundancy / BC / DR** = keep important capability available or recoverable
- **Awareness / Culture** = people make safer decisions consistently
- **Metrics / KRI / Reporting** = evidence drives action

## Historical-source delta

Thor Domain 2 เดิมเน้น BC, DR, BIA, recovery sites และ Incident Management. ใน outline 2026:

- BC/DR ถูกเก็บไว้ภายใต้ objective 2.2 Redundancy
- Incident Response ย้ายไป Domain 5
- GRC, cybersecurity culture, KRI, dashboards, scorecards และ reports ถูกเพิ่มเป็นแกนใหม่

Current official outline เป็น scope authority; Thor source เป็น historical teaching support.
