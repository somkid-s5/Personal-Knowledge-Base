# ACE — สถานการณ์ฝึกคิดพร้อมเหตุผล

[สารบัญ](./README.md) · [Cheat Sheet](./CHEAT-SHEET.md)

ทั้งหมดเป็นโจทย์ที่เขียนใหม่เพื่อฝึก reasoning **ไม่ใช่ข้อสอบจริงหรือ exam dump** อ่านโจทย์แล้วตอบเองก่อนเปิดเฉลย น้ำหนักหมวดดู [Learning Path](./LEARNING-PATH.md)

## 1. Budget แล้วค่าใช้จ่ายยังขึ้น

ตั้ง Alerts-only budget แล้วเกิน threshold แต่ Cloud Run ยังรับ requests ทำไม?

<details><summary>เหตุผล</summary>

Alerts-only budget ส่ง notification ไม่ enforce service pause ต้องแยกจาก Spend cap budgets Preview ที่รองรับ single project/service และมีข้อจำกัด/latency แม้ใช้ spend cap ก็ไม่รับประกันหยุดทุกค่าใช้จ่าย persistent resources ดูบท 03

</details>

## 2. มี quota แต่สร้าง GPU ไม่ได้

Quota ดูเพียงพอ แต่ zone แจ้ง resource unavailable ควรเพิ่ม IAM role หรือไม่?

<details><summary>เหตุผล</summary>

Quota เป็น permission/usage ceiling คนละเรื่องกับ physical capacity ให้ดู location/type availability และ alternatives ที่ application รองรับ ไม่เพิ่ม Owner เพื่อแก้ capacity ดูบท 03/13

</details>

## 3. ลบ binding แล้ว user ยังอ่าน VM ได้

Project ไม่มี binding ที่คาดแล้ว แต่ user ยังอ่านได้ ต้องตรวจที่ไหน?

<details><summary>เหตุผล</summary>

Inherited bindings จาก folder/organization และ groups/conditions ที่ให้สิทธิ์จริง การลบ binding ที่ project ไม่ลบ inherited allow ดูบท 02

</details>

## 4. Runtime app อ่าน secret ไม่ได้

คน deploy อ่าน secret ได้ แต่ app บน Cloud Run denied ต้องให้ใครได้ role?

<details><summary>เหตุผล</summary>

ตรวจ runtime SA ของ revision และ grant data access แคบต่อ secret ที่ต้องใช้ คน deploy กับ runtime identity ต่างกัน ตรวจ configuration/secret reference ด้วย ไม่ให้ project Editor ทุกคน ดูบท 02/09

</details>

## 5. Attach SA denied

มีสิทธิ์ deploy service แต่ attach SA ไม่ได้ SA มี Object Viewer แล้ว ควรเพิ่ม Object Admin หรือไม่?

<details><summary>เหตุผล</summary>

Data role ของ SA ไม่แก้ `actAs` ของ deployer ตรวจ Service Account User/permission บน SA ตาม scope และสิทธิ์ deploy resource ดูบท 02

</details>

## 6. CI ห้ามเก็บ SA key

CI ภายนอกให้ OIDC identity ได้ ต้องการ deploy โดยไม่เก็บ JSON key ใช้แนวใด?

<details><summary>เหตุผล</summary>

Workload Identity Federation พร้อม trust/attribute conditions ที่ตรง repository/workflow แล้วกำหนด IAM/impersonation ตามรูปแบบที่รองรับ ไม่ใช้ Workforce federation สำหรับ machine pipeline โดยสับสน ดูบท 02

</details>

## 7. VM private อ่าน Google API ได้ แต่ apt ไม่ได้

เปิด Private Google Access แล้วทำไมเข้า public package repo ยัง fail?

<details><summary>เหตุผล</summary>

Private Google Access ไม่ใช่ general internet NAT ต้องมี outbound path เช่น Public NAT/proxy/mirror พร้อม routes, DNS และ egress rules ตรวจปลายทางจริง ดูบท 04/Lab 02

</details>

## 8. IAP SSH denied

VM ไม่มี external IP และ firewall allow IAP TCP 22 แล้ว แต่ user ยัง login ไม่ได้ ตรวจอะไรเพิ่ม?

<details><summary>เหตุผล</summary>

IAP tunnel permission, OS Login/OS Admin role, VM visibility, target tags, sshd และ VM readiness การมี firewall อย่างเดียวไม่ได้ authorize tunnel/OS user ดูบท 04/05

</details>

## 9. Network หลาย project ต้องมีผู้ดูแลกลาง

ทีม Infra คุม subnets ทีม app มี project ของตนและใช้ network กลาง ควรเลือกอะไร?

<details><summary>เหตุผล</summary>

Shared VPC: host project จัด network และ service projects ใช้ตาม permissions เหมาะ separation ของ network/app administration Peering เป็นการเชื่อม VPC แยกไม่ใช่ share subnet model ดูบท 10

</details>

## 10. Peering A-B และ B-C

ต้องการ A-C ไปผ่าน B โดยคิดว่า peering ส่งต่อให้อัตโนมัติ ถูกไหม?

<details><summary>เหตุผล</summary>

ไม่ถูก Peering ไม่ transitive อัตโนมัติ ต้องออกแบบ connectivity ที่รองรับ transit/requirements จริง ไม่เพิ่ม firewall อย่างเดียวแล้วหวังให้ route model เปลี่ยน ดูบท 10

</details>

## 11. HTTP path routing

ต้องส่ง `/api` ไปกลุ่ม API และ `/web` ไปกลุ่ม Web ต้องเริ่มเลือก LB family ใด?

<details><summary>เหตุผล</summary>

Application Load Balancer ที่รองรับ HTTP routing/URL map จากนั้นเลือก internal/external และ scope ไม่เลือก UDP passthrough เพราะไม่ตอบ application-layer path routing ดูบท 10

</details>

## 12. MIG หลาย VM แต่ทุกเครื่องใช้ local upload

Autoscaling เพิ่มเครื่องแล้วบาง request ไม่พบไฟล์ แก้ด้วย health check หรือไม่?

<details><summary>เหตุผล</summary>

ต้องจัด persistent/shared state ไฟล์ที่เขียน local เครื่องหนึ่งไม่ปรากฏอีกเครื่องโดยอัตโนมัติ เลือก object/file storage ตาม semantic และปรับ application Health check ไม่ replicate files ดูบท 05/06

</details>

## 13. มี HA database แต่ลบ table ผิด

ควรหวังให้ standby มี table เก่าเพื่อ failover กลับหรือไม่?

<details><summary>เหตุผล</summary>

HA ป้องกัน failure ตาม deployment model ไม่ใช่ logical deletion backup การลบอาจ replicate ใช้ backup/PITR ที่เปิดไว้และทดสอบ recovery ดูบท 07

</details>

## 14. Analytics หลาย TB

ต้องวิเคราะห์ historical events ด้วย SQL ไม่มี transaction app requirement เริ่มจากบริการใด?

<details><summary>เหตุผล</summary>

BigQuery เป็นจุดเริ่มที่ตรง analytics workload ให้คิด schema/partition/query cost ไม่เลือก Cloud SQL เพียงเพราะ SQL ทั้งสองบริการ และ `LIMIT` ไม่รับประกันลด bytes scanned ดูบท 07

</details>

## 15. Cold class ถูกกว่าเสมอไหม

เก็บ 90 วัน แต่ดาวน์โหลดทุกวัน ควรใช้ Archive เพราะ storage unit price ต่ำที่สุดหรือไม่?

<details><summary>เหตุผล</summary>

พิจารณา access/retrieval/operation/transfer และ minimum storage duration ของ class Archive มี 365 วัน และ early deletion considerations เลือกจาก total cost/access pattern ดูบท 06

</details>

## 16. Pods Running แต่ service ไม่มี backend

Deployment มี 3 Pods Running/Ready แต่ service selector เป็น `app=wrong` ตรวจอะไร?

<details><summary>เหตุผล</summary>

Selector ไม่ตรง Pod labels ให้ดู EndpointSlices/labels/namespace และแก้ config เพิ่ม replica ไม่ทำให้ label mismatch หาย ดูบท 08/Lab 04

</details>

## 17. HPA เพิ่ม Pods แล้ว Pending

ทำไม scale deployment แล้วไม่รับ traffic เพิ่ม?

<details><summary>เหตุผล</summary>

HPA เพิ่ม desired replicas แต่ nodes/scheduling constraints อาจไม่รองรับ ตรวจ requests, events, autoscaler/quota, taints/affinity และ PVC ไม่ดู CPU utilization อย่างเดียว ดูบท 08

</details>

## 18. Cloud Run scale แล้ว DB เต็ม

App 30 instances ตั้ง pool 20 connections ต่อ instance DB รับ app connection ได้ 200 ควรคิดอย่างไร?

<details><summary>เหตุผล</summary>

Possible app demand ประมาณ 600 connections ก่อนรวม clients อื่น ต้องปรับ pool/scaling/connection design ตาม metrics และ DB capacity การเพิ่ม max instances อาจทำให้หนักกว่าเดิม ไม่ใช่เพิ่ม DB size โดยไม่ตรวจ leak/query waits ดูบท 07/09

</details>

## 19. VM CPU ต่ำแต่ latency สูง

ผู้ใช้แจ้งช้า แต่ CPU 20% ควรปิดเคสว่า infrastructure ปกติหรือไม่?

<details><summary>เหตุผล</summary>

ยังไม่ได้ ต้องดู request latency/error rate, pool/queue, DB wait/query, disk latency, network/DNS และ release timeline CPU ค่าเดียวไม่พิสูจน์สาเหตุ ใช้ evidence ของแต่ละชั้น ดูบท 11

</details>

## 20. Terraform plan จะลบ resource

`validate` ผ่าน แต่ plan มี replacement ของ resource สำคัญ AI บอก apply ได้ ควรทำอะไร?

<details><summary>เหตุผล</summary>

Review field/lifecycle/state mapping และผลกระทบก่อน apply Validation ตรวจได้เพียงบางส่วน AI ไม่แทน change review และ state ไม่ใช่ backup เตรียม rollback/recovery ที่ตรง behavior จริง ดูบท 12/13

</details>

## วิธีใช้หลังตอบผิด

จด requirement ที่อ่านตก เหตุผลที่ตัวเลือกเดิมไม่ตอบโจทย์ และเงื่อนไขหนึ่งข้อที่จะทำให้คำตอบเปลี่ยน กลับไปทดลอง lab/คำสั่งที่เกี่ยวข้อง ไม่ท่องเฉลยเป็นคำเดียว
