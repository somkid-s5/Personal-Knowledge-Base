# Domain 5 — Security Operations and Incident Response

[← ISC2-CC](../README.md) · [Current Exam Map](../CURRENT-EXAM-MAP.md)

> Weight: **17.3%** · Outline effective: **2026-09-01**

Domain 5 เชื่อม data protection → monitoring/triage → threat context → incident response → asset lifecycle → security testing

~~~mermaid
flowchart LR
  DATA[Protect Data] --> MON[Monitor]
  MON --> TRIAGE[Triage]
  TRIAGE --> IR[Incident Response]
  IR --> IMPROVE[Improve Assets / Controls]
  IMPROVE --> TEST[Test]
  TEST --> MON
~~~

## Current objectives

1. [5.1 Data Security](./5.1-Data-Security.md)
2. [5.2 Security Operations](./5.2-Security-Operations.md)
3. [5.3 Incident Response](./5.3-Incident-Response.md)
4. [5.4 Asset Protection](./5.4-Asset-Protection.md)
5. [5.5 Security Testing](./5.5-Security-Testing.md)

## Source boundary

Drive มี Thor Quick Sheet Domain 5 แต่ไม่พบ full Thor Study Guide Domain 5. ดังนั้น current official ISC2 outline เป็น scope authority โดยตรง และ Quick Sheet ใช้ support เฉพาะ concepts ที่ยัง current เช่น crypto, data handling และ change/configuration management.

หัวข้อ awareness/social engineering จาก Quick Sheet เก่าถูก remap ไป Domain 2 ยกเว้น phishing/tailgating/impersonation ที่ current objective 5.5 ใช้ในบริบท physical penetration testing.
