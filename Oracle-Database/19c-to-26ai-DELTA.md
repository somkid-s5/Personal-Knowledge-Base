# Oracle Database 19c → Oracle AI Database 26ai Delta

[← Oracle Database](./README.md)

> **Verification date:** 2026-10-08  
> **Purpose:** prevent 19c course material from being mistaken for current platform truth

## Current platform position

Oracle AI Database 26ai is the current long-term-support release and replaces the 23ai release line.

The current official DBA guide and administration bookshelf are the authority for current behavior.

## What stays useful from 19c

- core instance/database architecture,
- SGA/PGA mental models,
- startup/shutdown,
- initialization parameters,
- ADR / alert / trace diagnosis,
- Oracle Net/listener/services,
- CDB/PDB administration concepts,
- tablespaces/datafiles/undo,
- users/roles/privileges/profiles,
- auditing,
- loading/transporting data,
- automated maintenance,
- performance monitoring.

## What must not be frozen at 19c

### Security

Current cryptography, defaults and desupport decisions must be checked against 26ai/current 19c Release Updates.

### Platform availability

Treat deployment/platform availability as a current fact, not a course-era assumption.

### AI-native capabilities

26ai adds a current layer around Oracle AI Vector Search, AI enablement, Select AI, agent-related capabilities and modern converged-data features.

These are current supplements, not content that the 19c course originally taught.

### Deprecations / desupports

Always consult current Oracle 26ai behavior-change/deprecation documentation before operationalizing older course instructions.

## 🔍 Known Documentation Difference — UNDO_RETENTION

**อย่านำข้อสรุป Oracle 19c RU 19.7 ไปอ้างเป็นกฎของทุก 26ai Installation โดยอัตโนมัติ**

- [Oracle 19c Parameter Reference](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/UNDO_RETENTION.html) ระบุพฤติกรรม Fixed-size Undo ที่เปลี่ยนตั้งแต่ RU 19.7
- [Oracle AI Database 26ai Administrator's Guide — Managing Undo](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-undo.html) ในเนื้อหาที่ตรวจวันที่ 21 ต.ค. 2026 ยังมีข้อความอธิบาย Fixed-size Undo ว่าไม่ใช้ `UNDO_RETENTION`
- ดังนั้น **เอกสารข้ามเวอร์ชันแสดงความต่างที่ต้องตรวจสอบเพิ่มเติม** ไม่สรุปจาก Version Name อย่างเดียว ต้องระบุ Exact Build/RU, Parameter, Undo Tablespace Mode, Actual `TUNED_UNDORETENTION` และ Patch Notes ก่อนเขียน Runbook หรือวางแผน Change
- **สถานะ Validation:** Documentation Difference / LIVE NOT TESTED — ไม่อ้างว่าได้พิสูจน์ 26ai Behavior บน VM แล้ว

## Upgrade/transition mental model

~~~text
19c concept
→ current 26ai official documentation
→ check changed/deprecated/desupported behavior
→ apply current procedure
~~~

## Repository policy

Every module may contain three clearly labeled layers when useful:

1. Foundation from 19c course
2. Repository teaching reconstruction
3. Current 26ai note
