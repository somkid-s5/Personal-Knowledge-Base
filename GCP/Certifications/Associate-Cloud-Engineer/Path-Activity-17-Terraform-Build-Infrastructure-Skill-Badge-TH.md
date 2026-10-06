# Activity 17 — Build Infrastructure with Terraform on Google Cloud (Skill Badge)

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Visual Guide](./VISUAL-STUDY-GUIDE-TH.md#12-terraform-config--state--real-world) · [Module 12 — Terraform](./Module-12-Terraform-and-Infrastructure-as-Code.md) · [Activity 14](./Path-Activity-14-Terraform-Getting-Started-TH.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/636)

> Activity 14 สอนพื้นฐาน Terraform ส่วน Skill Badge นี้ต้องทำให้เรา **ประกอบ infrastructure จาก module/state/import/change workflow ได้เองภายใต้โจทย์** และอ่าน plan เพื่อป้องกันการเปลี่ยนที่ไม่ตั้งใจ

## เป้าหมายการเรียนรู้

อ่านจบแล้วควรทำได้:

1. วาง structure ของ root module และ child modules
2. ใช้ variables/outputs เชื่อม modules โดยไม่ hard-code ทุกค่า
3. อ่าน state ownership และ resource address
4. import existing resource อย่างปลอดภัย
5. เปลี่ยน resource โดยรู้ว่า update-in-place หรือ replace
6. แก้ drift/state mismatch โดยไม่ destroy มั่ว
7. ใช้ remote state/locking ตาม workflow ทีม
8. ทำ challenge lab ด้วย plan-driven workflow แทนเดาคำสั่ง

---

## 1. Mental model ของ Skill Badge

```mermaid
flowchart LR
    REQ[Lab Requirements] --> CFG[Terraform Configuration]
    CFG --> PLAN[Plan]
    STATE[State / pre-created resources] --> PLAN
    CLOUD[Google Cloud] --> PLAN
    PLAN --> REVIEW{Matches requirement?}
    REVIEW -- No --> CFG
    REVIEW -- Yes --> APPLY[Apply]
    APPLY --> VERIFY[Verify resources / grader]
```

Skill Badge ไม่ได้วัดว่า “จำ syntax ได้ทั้งหมด” แต่ดูว่าเราสามารถแปลง requirement เป็น desired state และตรวจผลได้หรือไม่

---

## 2. Root module และ child modules

```mermaid
flowchart TB
    ROOT[Root Module] --> VPC[VPC Module]
    ROOT --> VM[Compute Module]
    ROOT --> ST[Storage Module]
    VPC --> OUT1[network_id output]
    OUT1 --> VM
```

Module ที่ดีควรมี:
- inputs ชัด
- outputs เท่าที่จำเป็น
- provider/version requirements
- naming conventions
- documentation

อย่าให้ module ซ่อน resource สำคัญจนคนใช้ไม่รู้ว่าจะเกิดอะไร

---

## 3. Resource Address

Terraform address ใช้อ้าง resource ใน config/state เช่น:

```text
google_compute_network.main
module.vpc.google_compute_subnetwork.app
```

เวลา import/move/state operation ต้องระบุ address ถูกตัว ถ้าผิดอาจ map resource จริงเข้ากับ logical resource ผิด

---

## 4. State ownership

```mermaid
flowchart TD
    RES[Cloud Resource] --> Q{Terraform state นี้เป็น owner หรือไม่?}
    Q -- Yes --> MANAGED[เปลี่ยนผ่าน config/plan]
    Q -- No --> OTHER[อาจเป็น manual / another state / another tool]
    OTHER --> DECIDE[กำหนด ownership ก่อน import/change]
```

อย่าให้สอง Terraform states หรือ Terraform + controller อื่นคุม field เดียวกันโดยไม่มี design

---

## 5. Import workflow

```mermaid
flowchart LR
    EXIST[Existing Resource] --> BLOCK[Write resource block/address]
    BLOCK --> ID[Identify exact remote ID]
    ID --> IMPORT[Import]
    IMPORT --> PLAN[Plan]
    PLAN --> MATCH{Unexpected diff?}
    MATCH -- Yes --> ALIGN[Align config / investigate]
    ALIGN --> PLAN
    MATCH -- No --> SAFE[Ready for controlled management]
```

### สิ่งที่ Import ไม่ทำให้เอง

- ไม่สร้าง architecture ที่ดี
- ไม่ตั้ง variable/module structure ให้เหมาะ
- ไม่พิสูจน์ว่าทุก attributes ใน config ตรง intent
- ไม่รับประกันว่า plan หลัง import จะ no-op

จึงต้อง `plan` หลัง import เสมอ

---

## 6. Import block / CLI import

Terraform version ใหม่มี workflow ที่อาจใช้ import blocks ตามความสามารถของ version ส่วน labs บางชุดอาจยังใช้ CLI `terraform import`

หลักที่ต้องจำไม่ขึ้นกับ syntax:

1. config address ต้องมี
2. remote ID ต้องถูก
3. state จะถูกเชื่อม
4. plan หลัง import ต้องถูก review

อย่าจำ command อย่างเดียวจนไม่เข้าใจ state mapping

---

## 7. Change infrastructure

```mermaid
flowchart TD
    CHANGE[Config Change] --> PLAN[Plan]
    PLAN --> TYPE{Action?}
    TYPE -->|~| UPDATE[Update in-place]
    TYPE -->|replacement| REPLACE[Replace resource]
    TYPE -->|-| DESTROY[Destroy]
    REPLACE --> IMPACT[Check downtime/data/IP/dependency impact]
    DESTROY --> IMPACT
```

ก่อน apply replacement ให้ดูว่า resource มี state/data/IP dependency หรือไม่

---

## 8. Immutable field trap

บาง field เปลี่ยนไม่ได้ผ่าน API และ provider ต้อง replace resource

ตัวอย่างแนวคิด:
- location/scope บางชนิด
- resource identity/naming บางกรณี
- network attachment/config บางชนิด

อย่าคาดว่า Terraform จะ migrate data/application ให้อัตโนมัติเมื่อ replacement เกิด

---

## 9. Remote State

```mermaid
flowchart LR
    DEV[Engineer] --> BACK[Remote Backend]
    CI[CI] --> BACK
    BACK --> STATE[Shared State]
    STATE --> LOCK[Coordination/Locking]
    STATE --> REC[Version/Recovery]
```

Security:
- IAM แคบ
- ไม่ public
- ป้องกัน deletion ตาม requirement
- state อาจมี sensitive data
- backup/version/recovery test

---

## 10. State commands: ใช้เมื่อเข้าใจจริง

คำสั่ง state/move/remove สามารถเปลี่ยน mapping โดยไม่แก้ resource จริงทันที จึงอันตรายถ้าใช้มั่ว

กฎ:
- backup state ก่อน operation สำคัญ
- ตรวจ address
- plan หลัง operation
- หลีกเลี่ยง manual JSON editing

---

## 11. Refactor โดยไม่สร้างใหม่

ถ้าแค่ย้าย resource เข้า module/rename address แต่ remote object เดิมต้องคงอยู่ ต้องใช้ state/moved-block/refactor workflow ที่ version รองรับ

ถ้า rename config เฉย ๆ Terraform อาจมองว่า old resource ถูกลบและ new resource ต้องสร้าง

```mermaid
flowchart LR
    OLD[Old resource address] --> MOVE[Moved/refactor mapping]
    MOVE --> NEW[New resource address]
    NEW --> SAME[Same cloud object]
```

---

## 12. Variables และ outputs

### Variables
ใช้รับค่าที่เปลี่ยนตาม environment เช่น:
- project_id
- region
- network CIDR
- machine type

### Outputs
ใช้ส่งค่าที่ module อื่น/ผู้ใช้ต้องใช้ เช่น:
- network ID
- subnet self link
- service URL

อย่า output secrets โดยไม่จำเป็น

---

## 13. Module versioning

ถ้า source มาจาก registry/Git:
- pin version/ref ตาม workflow
- review changelog
- update version แล้ว plan

การเปลี่ยน module versionอาจเปลี่ยน resources จำนวนมากแม้ root config เปลี่ยนบรรทัดเดียว

---

## 14. Challenge Lab Strategy

1. อ่าน requirement ทั้งหมด
2. ตรวจ project/auth/context
3. inspect existing resources ก่อน import
4. วาด resource dependency
5. สร้าง file structure
6. `terraform init`
7. `fmt` + `validate`
8. import pre-created resource ถ้าโจทย์กำหนด
9. `plan`
10. แก้จน plan ตรง requirement
11. `apply`
12. verify ด้วย gcloud/Console/grader

อย่าเริ่มด้วย `destroy` หรือ recreate pre-created resources เพราะง่ายกว่า

---

## 15. Example structure

```text
terraform/
├── main.tf
├── variables.tf
├── outputs.tf
├── versions.tf
└── modules/
    └── network/
        ├── main.tf
        ├── variables.tf
        └── outputs.tf
```

โครงสร้างไม่ใช่กฎตายตัว แต่ช่วยให้คิด ownership/interface ชัด

---

## 16. Debugging: Plan แปลก

```mermaid
flowchart TD
    WEIRD[Unexpected Plan] --> CTX{Backend/workspace/project ถูกไหม?}
    CTX -- No --> FIX1[แก้ context]
    CTX -- Yes --> STATE{State mapping ถูกไหม?}
    STATE -- No --> FIX2[ตรวจ import/move/state]
    STATE -- Yes --> MOD{Module/provider version เปลี่ยนไหม?}
    MOD -- Yes --> FIX3[Review version changes]
    MOD -- No --> DRIFT{มี manual drift ไหม?}
    DRIFT -- Yes --> FIX4[Decide intended state]
    DRIFT -- No --> FIELD[อ่าน provider/API behavior]
```

---

## 17. Failure scenarios

### State ถูกลบ
resource cloud ยังอยู่

**ห้าม:** apply config ใหม่แบบไม่ตรวจ เพราะอาจ create duplicate/conflict

**ควร:** recover state หรือ import อย่างมีขอบเขต

### Import แล้ว plan จะ replace

ตรวจ:
- resource ID/address
- immutable attributes
- location
- defaults
- config mismatch

### Module update จะ destroy 10 resources

หยุดและ review version/changelog/config/state ก่อน

---

## 18. Mini Labs

### Lab A — Import thought exercise

มี VPC `legacy-vpc` อยู่ก่อน Terraform

เขียนขั้นตอน:
1. resource block
2. exact resource ID
3. import
4. plan
5. align config

### Lab B — Refactor

ย้าย `google_compute_network.main` ไป `module.network.google_compute_network.main`

ถาม: ถ้าเปลี่ยน code อย่างเดียว Terraform จะคิดว่า resource identity เปลี่ยนไหม? ต้องใช้ refactor/moved-state workflow อย่างไร?

### Lab C — Destructive plan

Plan:

```text
Plan: 1 to add, 0 to change, 3 to destroy
```

ห้ามมองแต่ “1 to add” ต้อง inspect 3 destroys ก่อน apply

---

## 19. Exam-style scenarios

**Scenario:** ต้องเอา network เดิมเข้ามาจัดการ Terraform โดยไม่ recreate

**แนวคิด:** import + matching config + plan review

**Scenario:** เปลี่ยน module versionแล้ว plan replace resources จำนวนมาก

**แนวคิด:** หยุด review module changes/provider behavior ไม่ apply อัตโนมัติ

**Scenario:** resource อยู่ cloud แต่ state ไม่มี

**แนวคิด:** state recovery/import ไม่ใช่สร้างซ้ำ

---

## เช็กความเข้าใจ

1. Import เปลี่ยน resource จริงทันทีไหม?
2. Import ทำให้ HCL ถูกต้องครบเองไหม?
3. Resource address สำคัญอย่างไร?
4. Remote state มีข้อมูล sensitive ได้ไหม?
5. เปลี่ยน module versionควร plan ใหม่ไหม?
6. ทำไม rename resource block อาจทำให้ Terraform มองเป็น destroy/create?
7. State remove = delete cloud resource หรือไม่?
8. Plan `to destroy` ต้องตรวจเพราะอะไร?
9. Terraform state สองชุดควรคุม resource เดียวกันไหม?
10. Challenge lab ทำไมควร inspect pre-created resources ก่อน?

## แหล่งอ้างอิง

- [Google Skills — Build Infrastructure with Terraform on Google Cloud](https://www.skills.google/paths/11/course_templates/636)
- [Terraform on Google Cloud](https://cloud.google.com/docs/terraform)
- [Terraform Import](https://developer.hashicorp.com/terraform/cli/import)
- [Terraform State](https://developer.hashicorp.com/terraform/language/state)
