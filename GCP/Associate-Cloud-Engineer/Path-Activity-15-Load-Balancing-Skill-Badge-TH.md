# Activity 15 — Implementing Cloud Load Balancing for Compute Engine (Skill Badge)

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Module 10 — Load Balancing](./Module-10-Load-Balancing-and-Hybrid-Networking.md) · [Activity 05](./Path-Activity-05-Scaling-Automation-TH.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/648)

> โน้ตภาษาไทยเรียบเรียงใหม่ตามหัวข้อสาธารณะของกิจกรรม เพื่ออ่านแทนการดูวิดีโอได้สะดวก แต่ไม่ใช่ transcript หรือคำตอบ grader. ให้ตรวจรายละเอียดรุ่นบริการ, region, quota, feature และราคาในเอกสารปัจจุบันก่อนลงมือ

## เป้าหมายและกรอบคิด

เป้าหมาย badge คือสร้าง backend VMs และ load balancers หลายชนิด แล้วเชื่อม health check, forwarding และ firewall ให้ครบ. ทำ challenge lab ตามโจทย์/region/resource names ใน session จริง; โน้ตนี้เป็นแนวทบทวน ไม่ใช่เฉลย.

### เลือกชนิด
- Passthrough Network Load Balancer: กระจาย traffic ที่ชั้น network โดยคงพฤติกรรม packet/IP ที่เหมาะกับ protocol
- Application Load Balancer: HTTP(S), host/path routing และ application-level features
- Internal Application Load Balancer: ให้ client ภายในเข้าถึง service โดยไม่เปิด backend ตรง Internet

### ลำดับสร้างและตรวจ
1. ตรวจ VPC/subnet/region และ firewall path
2. สร้าง backend VM หรือ instance group พร้อม serving application
3. สร้าง health check ที่ protocol/port/path ตรงบริการ
4. สร้าง backend service, backend attachment, frontend address/forwarding rule และ proxy/URL map ตามชนิด
5. ตรวจ firewall source ranges/health-check reachability และ IAM/API requirements
6. ทดสอบ backend health ก่อน client request
7. ใช้ curl/HTTP client จาก network ที่ถูกต้อง; ตรวจ DNS/IP, status, response/backend identity
8. ลบ resources ตาม dependency หลังจบ sandbox

### Troubleshooting
Unhealthy backend: app ไม่ listen, health check path/port, firewall หรือ named port. Timeout: route, frontend, client network, forwarding rule. 404: host/path URL map. Internal LB ใช้จาก network/region/connection ที่รองรับ. อย่าคาดว่า VM ที่ตอบตรงได้แปลว่า backend service health ผ่าน.

จับคู่ frontend IP, forwarding rule, target proxy, URL map/backend service เป็น chain; ตรวจ resource status และ health ก่อนแก้ด้วยการเปิด firewall กว้าง ๆ.

## Worksheet / เช็กความเข้าใจ

1. ระบุ workload และข้อกำหนดที่เป็นตัวตัดสินก่อนเลือก service
2. บอก tradeoff, security, scaling, observability และค่าใช้จ่ายของตัวเลือก
3. เขียนแผนตรวจผลและ rollback/cleanup ก่อนสร้างทรัพยากร
4. อธิบายว่า metric หรือ error ใดจะบอกว่าการออกแบบผิด

กิจกรรมนี้ใน repo มีโน้ตและ worksheet ประกอบเท่านั้น เว้นแต่จะระบุ lab โดยตรงใน Lab Map; ไม่มีการ provision ทรัพยากรจริงหรือยืนยันผล grader ในการจัดทำเอกสาร

## แหล่งอ้างอิง

- [Google Skills — Implementing Cloud Load Balancing for Compute Engine (Skill Badge)](https://www.skills.google/paths/11/course_templates/648)
- [Google Skills course / badge](https://www.skills.google/paths/11/course_templates/648)
- [Cloud Load Balancing overview](https://cloud.google.com/load-balancing/docs/load-balancing-overview)
