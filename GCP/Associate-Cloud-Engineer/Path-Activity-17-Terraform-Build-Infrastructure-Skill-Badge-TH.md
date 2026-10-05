# Activity 17 — Build Infrastructure with Terraform on Google Cloud (Skill Badge)

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Module 12 — Terraform](./Module-12-Terraform-and-Infrastructure-as-Code.md) · [Activity 14](./Path-Activity-14-Terraform-Getting-Started-TH.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/636)

> โน้ตภาษาไทยเรียบเรียงใหม่ตามหัวข้อสาธารณะของกิจกรรม เพื่ออ่านแทนการดูวิดีโอได้สะดวก แต่ไม่ใช่ transcript หรือคำตอบ grader. ให้ตรวจรายละเอียดรุ่นบริการ, region, quota, feature และราคาในเอกสารปัจจุบันก่อนลงมือ

## เป้าหมายและกรอบคิด

กิจกรรม badge ฝึก IaC, modules, state, import และการเปลี่ยน infrastructure. Challenge lab เป็นโจทย์ลงมือทำแบบจำกัดเวลา; ใช้โน้ตอธิบายวิธีคิด ไม่ใช่ค่าคำตอบล่วงหน้า.

### Configuration และ lifecycle
แยก provider, variables, resources, outputs และ modules. ตั้ง project/region ผ่าน variables หรือ environment ตามโจทย์; ตรวจ credentials และ APIs. ใช้ init/validate/plan ก่อน apply. อ่าน resource additions, replacements และ destructions ทีละรายการ โดยเฉพาะ immutable field ที่ทำให้ replace.

### Module design
Module ควรมี interface ชัดเจน: inputs, outputs, provider requirements และ version. เรียก module ด้วย source/version ที่ถูกต้อง; ส่งค่าโดยไม่ hard-code secrets. ตรวจ module outputs และ resource naming ให้ตรง requirement.

### Import existing resources
Import ทำให้ Terraform state รู้จัก object ที่มีอยู่ แต่ไม่ได้สร้าง configuration ที่ครบให้อัตโนมัติ. ลำดับปลอดภัย:
1. ระบุ resource address ใน config/module
2. ยืนยัน remote object/project/ID ถูกต้อง
3. import object เข้า state ด้วย syntax/tool version ปัจจุบัน
4. เติม config ให้ตรง attributes ที่ต้องการ
5. plan ซ้ำจนไม่มีการ replace/change ที่ไม่ตั้งใจ
6. เก็บ backup/version state และ review ก่อน apply

### State, change, destroy
อย่าแก้ state ด้วยมือโดยไม่มีเหตุผล; ใช้ state commands อย่างระมัดระวัง. remote state ต้องมี access controls/locking. challenge environment อาจมี pre-created resource; ห้าม destroy สิ่งที่ไม่ได้เป็นเจ้าของ. หลังจบ verify expected resources และ cleanup เฉพาะของที่โจทย์ให้สร้าง.

## Worksheet / เช็กความเข้าใจ

1. ระบุ workload และข้อกำหนดที่เป็นตัวตัดสินก่อนเลือก service
2. บอก tradeoff, security, scaling, observability และค่าใช้จ่ายของตัวเลือก
3. เขียนแผนตรวจผลและ rollback/cleanup ก่อนสร้างทรัพยากร
4. อธิบายว่า metric หรือ error ใดจะบอกว่าการออกแบบผิด

กิจกรรมนี้ใน repo มีโน้ตและ worksheet ประกอบเท่านั้น เว้นแต่จะระบุ lab โดยตรงใน Lab Map; ไม่มีการ provision ทรัพยากรจริงหรือยืนยันผล grader ในการจัดทำเอกสาร

## แหล่งอ้างอิง

- [Google Skills — Build Infrastructure with Terraform on Google Cloud (Skill Badge)](https://www.skills.google/paths/11/course_templates/636)
- [Google Skills course / badge](https://www.skills.google/paths/11/course_templates/636)
- [Terraform on Google Cloud](https://cloud.google.com/docs/terraform)
- [Terraform import](https://developer.hashicorp.com/terraform/cli/import)
