# 🗄️ Oracle Database — Icon-First Visual Memory Guide

[← กลับหน้าเรียน Oracle Database](./README.md) · [มาตรฐานการใช้ภาพร่วมกัน](../docs/ICON-FIRST-LEARNING-STANDARD.md)

> **ขอบเขต:** Visual Memory สำหรับทบทวนแนวคิด; ไม่แทน Module, Lab, Official Documentation หรือการยืนยัน Configuration จริง  
> **Icon provenance:** SVG นี้วาดไอคอนเชิงแนวคิดขึ้นใหม่ ไม่ใช่ Official Service Logo  
> **สถานะ:** Companion Visual Layer (เพิ่ม 2026-10-10); ไม่เปลี่ยนสถานะ Verified ของเนื้อหาเดิม

แยกภาพ Listener / Server Process / Instance / Database และ CDB-PDB ให้จำง่าย ใช้สูตร **จำภาพ → รู้ชื่อ → เข้าใจหน้าที่ → อ่านเนื้อหาเต็ม → ลงมือ Lab**

## 🧠 ภาพจำใน 10 วินาที

**💻 Client → 📡 Listener → ⚙️ Instance → 🗄️ Datafiles**

![Oracle Database concept diagram](./assets/visual-memory/01-concept-path.svg)

**จำให้ขึ้นใจ:** 📌 Database = Persistent Files; Instance = SGA + Processes. Listener รับ/จัดการขั้นตอน Connect ไม่ได้ Proxy ทุกคำสั่ง SQL

## 🩺 Troubleshooting ผ่าน Icon

![Oracle Database troubleshooting diagram](./assets/visual-memory/02-diagnostic-path.svg)

**สถานการณ์ตัวอย่าง:** เมื่อ Client เจอ ORA-125xx ให้ดู Network + Listener Service Registration + Instance/PDB Status + Capacity. อย่า Restart Production แค่เพื่อทดลองสาเหตุ

> [!IMPORTANT]
> แผนภาพเป็นเพียง mental model แสดงจุดตรวจหลัก ไม่ใช่ implementation diagram ของทุกบริการ และการตรวจจริงต้องอ้างอิงเวอร์ชัน/ขอบเขต/ความเสี่ยงที่ใช้งาน

## 🎯 Icon / Emoji Legend

| ภาพจำ | คำศัพท์หลัก | ใช้แยกเรื่องอะไร |
|---|---|---|
| 🌐 | Network / Entry | Request, DNS, Endpoint, Connectivity |
| 👤 | Identity | User, Group, Service Identity, Principal |
| 🔑 | Permission | Role, Scope, Authentication/Authorization |
| 🖥️ | Compute | Server, Instance, Container, Workload |
| 🗄️ | Storage / DB | Persistent Data, Files, Database |
| 🩺 | Health / Evidence | Status, Logs, Metrics, Verification |
| 🚨 | Incident | Symptom, Fault, Failed State |
| ✅ | Validation | Verify outcome and expected behavior |

## 📚 ไปอ่านเนื้อหาเต็ม (หลักฐานและ Lab ยังอยู่ใน Note)

- [Lesson-01-Oracle-Database-Architecture-TH](./01-Core-Architecture/Lesson-01-Oracle-Database-Architecture-TH.md)
- [Lesson-09-Configuring-and-Administering-the-Listener-TH](./03-Networking-Listener/Lesson-09-Configuring-and-Administering-the-Listener-TH.md)
- [Lesson-14-Managing-PDBs-TH](./04-Multitenant-CDB-PDB/Lesson-14-Managing-PDBs-TH.md)

## ❓ ลองทดสอบความจำ

<details>
<summary>คำถาม: ถ้าเห็นภาพจำแล้ว จะเริ่มตรวจสอบอะไร และอะไรที่ยังยืนยันไม่ได้?</summary>

เมื่อ Client เจอ ORA-125xx ให้ดู Network + Listener Service Registration + Instance/PDB Status + Capacity. อย่า Restart Production แค่เพื่อทดลองสาเหตุ ภาพบอกลำดับคิดเท่านั้น; ต้องเก็บหลักฐานก่อนสรุปสาเหตุ

</details>

## 🏷️ โลโก้และไอคอนทางการ

บทเรียนใช้ **Original Pictogram** เพื่ออธิบาย Role; หากต้องการจำรูปร่าง Logo/Service Icon ของผู้ผลิต ให้ศึกษา [Oracle Database Documentation](https://docs.oracle.com/en/database/) และปฏิบัติตามเงื่อนไขสิทธิ์/เครื่องหมายการค้าของเจ้าของ Logo ห้ามเรียกไอคอนที่วาดขึ้นใหม่ว่าโลโก้ทางการ
