# Activity 14 — Getting Started with Terraform for Google Cloud

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Module 12 — Terraform](./Module-12-Terraform-and-Infrastructure-as-Code.md) · [Lab 05](./Lab-Guide-TH/Lab-05-Terraform-VPC-and-State.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/443)

> โน้ตภาษาไทยเรียบเรียงใหม่ตามหัวข้อสาธารณะของกิจกรรม เพื่ออ่านแทนการดูวิดีโอได้สะดวก แต่ไม่ใช่ transcript หรือคำตอบ grader. ให้ตรวจรายละเอียดรุ่นบริการ, region, quota, feature และราคาในเอกสารปัจจุบันก่อนลงมือ

## เป้าหมายและกรอบคิด

Terraform ทำให้ infrastructure เป็น configuration ที่ review, version และทำซ้ำได้. วงจรหลัก: เขียน HCL → init → validate/plan → review → apply → ตรวจ drift/state → เปลี่ยนหรือลบอย่างตั้งใจ.

### HCL และ resource graph
Provider เชื่อม API; resource จัดการ object; data source อ่านข้อมูลที่มีอยู่; variables/locals/outputs ช่วย reuse. Terraform สร้าง dependency graph จาก references; ใช้ explicit dependency เฉพาะเมื่อ implicit dependency ไม่พอ. Meta-arguments เช่น count/for_each/lifecycle เปลี่ยนการสร้างและ update จึงต้องเข้าใจผลก่อนใช้.

### Modules
Module คือ configuration ที่นำกลับมาใช้ได้ รับ inputs และส่ง outputs. ออกแบบ interface ให้เล็ก, ตั้ง version, validate input และหลีกเลี่ยง module ที่ซ่อน side effects. Registry/Cloud Foundation Toolkit ช่วยเริ่มจากตัวอย่าง แต่ต้องตรวจ maintenance, permissions และ resource behavior.

### State และทีม
State map configuration ไปยัง remote objects และมีข้อมูลอ่อนไหวได้. ใช้ remote backend ที่รองรับ locking/versioning ตามความต้องการ, จำกัด IAM, ห้าม commit state/credentials. ทีมต้องไม่ apply state เดียวกันพร้อมกันโดยข้าม lock. ตรวจ drift และ refresh/plan ก่อนเปลี่ยน.

### Workflow/labs
Syllabus ครอบคลุม create/change/destroy, dependencies/lifecycle, reusable modules และ remote backend. อ่าน plan ก่อน apply; destroy เฉพาะ resources ที่ module เป็นเจ้าของ. Syntax validation ไม่ได้พิสูจน์ความปลอดภัย/สิทธิ์/ผลกระทบทั้งหมด. ใช้ sandbox และ cleanup.

## Worksheet / เช็กความเข้าใจ

1. ระบุ workload และข้อกำหนดที่เป็นตัวตัดสินก่อนเลือก service
2. บอก tradeoff, security, scaling, observability และค่าใช้จ่ายของตัวเลือก
3. เขียนแผนตรวจผลและ rollback/cleanup ก่อนสร้างทรัพยากร
4. อธิบายว่า metric หรือ error ใดจะบอกว่าการออกแบบผิด

กิจกรรมนี้ใน repo มีโน้ตและ worksheet ประกอบเท่านั้น เว้นแต่จะระบุ lab โดยตรงใน Lab Map; ไม่มีการ provision ทรัพยากรจริงหรือยืนยันผล grader ในการจัดทำเอกสาร

## แหล่งอ้างอิง

- [Google Skills — Getting Started with Terraform for Google Cloud](https://www.skills.google/paths/11/course_templates/443)
- [Terraform on Google Cloud](https://cloud.google.com/docs/terraform)
- [Terraform state](https://developer.hashicorp.com/terraform/language/state)
