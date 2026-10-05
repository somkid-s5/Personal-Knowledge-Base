# Activity 16 — Deploy Kubernetes Applications on Google Cloud (Skill Badge)

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Module 08 — GKE](./Module-08-GKE-and-Kubernetes.md) · [Activity 06](./Path-Activity-06-GKE-TH.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/663)

> โน้ตภาษาไทยเรียบเรียงใหม่ตามหัวข้อสาธารณะของกิจกรรม เพื่ออ่านแทนการดูวิดีโอได้สะดวก แต่ไม่ใช่ transcript หรือคำตอบ grader. ให้ตรวจรายละเอียดรุ่นบริการ, region, quota, feature และราคาในเอกสารปัจจุบันก่อนลงมือ

## เป้าหมายและกรอบคิด

Badge นี้ต่อยอด Docker, Artifact Registry, GKE, kubectl, Deployments/Services และ continuous delivery. ทำ labs/challenge ใน session จริง; ชื่อ cluster, zone และ image เป็นค่าตามโจทย์.

### Image lifecycle
เขียน Dockerfile ที่ระบุ base image/dependencies, build image, ทดสอบ local, tag ด้วย Artifact Registry hostname/repository และ push ด้วย identity ที่ได้รับอนุญาต. ใช้ immutable version tag/digest; หลีกเลี่ยง secrets ใน layer. ตรวจ repository location, IAM writer/reader และ image pull identity.

### Deploy และ expose
GKE cluster มี control plane และ nodes; Deployment คุม desired replicas/rollout, Pod เป็นหน่วยรัน container, Service ให้ endpoint เสถียร. ใช้ kubectl get/describe/logs/events เพื่อไล่สถานะ. สำหรับ application:
1. สร้าง/เลือก cluster และ credentials ตามโจทย์
2. push image และยืนยัน artifact
3. apply Deployment พร้อม resource requests, probes และ replicas
4. รอ rollout; ตรวจ pod events/logs
5. สร้าง Service ที่เหมาะกับการเข้าถึง
6. ทดสอบ endpoint และ scaling/rollout
7. rollback revision ที่รู้ว่าดีเมื่อ release มีปัญหา

### Continuous delivery และ debugging
แยก build/test/push/deploy; promotion ใช้ digest เดิม; จำกัด deploy IAM; automated rollout ควรมี health gate และ rollback. ImagePullBackOff: ตรวจ tag, registry path, IAM, network. Pending: quota/capacity/requests/taints. CrashLoopBackOff: logs, command/env/probes. Service ไม่ตอบ: selectors/endpoints, port/targetPort, firewall/ingress.

## Worksheet / เช็กความเข้าใจ

1. ระบุ workload และข้อกำหนดที่เป็นตัวตัดสินก่อนเลือก service
2. บอก tradeoff, security, scaling, observability และค่าใช้จ่ายของตัวเลือก
3. เขียนแผนตรวจผลและ rollback/cleanup ก่อนสร้างทรัพยากร
4. อธิบายว่า metric หรือ error ใดจะบอกว่าการออกแบบผิด

กิจกรรมนี้ใน repo มีโน้ตและ worksheet ประกอบเท่านั้น เว้นแต่จะระบุ lab โดยตรงใน Lab Map; ไม่มีการ provision ทรัพยากรจริงหรือยืนยันผล grader ในการจัดทำเอกสาร

## แหล่งอ้างอิง

- [Google Skills — Deploy Kubernetes Applications on Google Cloud (Skill Badge)](https://www.skills.google/paths/11/course_templates/663)
- [Google Skills course / badge](https://www.skills.google/paths/11/course_templates/663)
- [GKE documentation](https://cloud.google.com/kubernetes-engine/docs)
- [Artifact Registry](https://cloud.google.com/artifact-registry/docs)
