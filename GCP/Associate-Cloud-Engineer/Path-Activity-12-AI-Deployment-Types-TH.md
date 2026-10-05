# Activity 12 — AI Infrastructure: Deployment Types

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Module 05 — Compute](./Module-05-Compute-Engine-and-Instance-Groups.md) · [Module 08 — GKE](./Module-08-GKE-and-Kubernetes.md) · [Module 13](./Module-13-AI-Tooling-and-Modern-Services.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/1554)

> โน้ตภาษาไทยเรียบเรียงใหม่ตามหัวข้อสาธารณะของกิจกรรม เพื่ออ่านแทนการดูวิดีโอได้สะดวก แต่ไม่ใช่ transcript หรือคำตอบ grader. ให้ตรวจรายละเอียดรุ่นบริการ, region, quota, feature และราคาในเอกสารปัจจุบันก่อนลงมือ

## เป้าหมายและกรอบคิด

เริ่มจากชนิดงาน: training, batch inference หรือ online inference; จากนั้นเลือก CPU/GPU/TPU, memory/network, execution unit, orchestrator, image, data path และ operations. เปรียบเทียบ control, scaling, latency, availability, security, idle และ operational burden.

| รูปแบบ | เหมาะเมื่อ | ภาระหลัก |
|---|---|---|
| Compute Engine VM | ต้องการควบคุม OS/driver หรือ single node | patch, process health, scaling, recovery |
| Managed Instance Group | fleet VM ซ้ำกันและต้องการ autohealing/LB | template, rollout, externalized state |
| GKE | หลาย containers/jobs, declarative rollout และ scheduling | cluster, node pools, requests, upgrades, policy |
| Managed inference | runtime/model อยู่ใน supported envelope | platform constraints, cold start, latency/cost |
| Batch job | งานจบเป็นรอบ มี retry/checkpoint | idempotency, queue, artifacts, quota |

### Container, GKE และ networking
แยก immutable serving image จาก model artifact เมื่อเหมาะสม; pin dependencies; ห้ามฝัง secrets. กำหนด startup/readiness/liveness ให้ถูกความหมาย และ readiness ต้องรอ model พร้อม. บน GKE วาง node/accelerator location, private access, egress, workload identity, pod IP, service/gateway, resource requests, taints/tolerations และ autoscaling. Pod Pending อาจเกิดจาก quota, capacity, taint หรือ resource request.

GPU sharing ช่วย utilization แต่มี tradeoff เรื่อง isolation, memory, latency และ noisy neighbors; ตรวจ config ที่รองรับและ benchmark จริง. GKE Inference Gateway ช่วยจัดการ inference traffic ตาม feature ที่รองรับ แต่ไม่ได้สร้าง model server หรือรับประกัน authorization/capacity ให้อัตโนมัติ.

### Online inference design
Client → HTTPS gateway → inference service → batching/queue → model replicas → data/model store. กำหนด sync เทียบ async, deadline, bounded queue, rate limit, timeout, retry+jitter, warmup, scale signal, canary/rollback และ authorization. วัด queue age, p95/p99, errors, GPU memory/utilization และ cost/request. จำกัด egress และ log ข้อมูลเท่าที่จำเป็น.

## Worksheet / เช็กความเข้าใจ

1. ระบุ workload และข้อกำหนดที่เป็นตัวตัดสินก่อนเลือก service
2. บอก tradeoff, security, scaling, observability และค่าใช้จ่ายของตัวเลือก
3. เขียนแผนตรวจผลและ rollback/cleanup ก่อนสร้างทรัพยากร
4. อธิบายว่า metric หรือ error ใดจะบอกว่าการออกแบบผิด

กิจกรรมนี้ใน repo มีโน้ตและ worksheet ประกอบเท่านั้น เว้นแต่จะระบุ lab โดยตรงใน Lab Map; ไม่มีการ provision ทรัพยากรจริงหรือยืนยันผล grader ในการจัดทำเอกสาร

## แหล่งอ้างอิง

- [Google Skills — AI Infrastructure: Deployment Types](https://www.skills.google/paths/11/course_templates/1554)
- [GKE documentation](https://cloud.google.com/kubernetes-engine/docs)
- [Compute Engine GPUs](https://cloud.google.com/compute/docs/gpus)
- [GKE Inference Gateway](https://cloud.google.com/kubernetes-engine/docs/concepts/inference-gateway)
