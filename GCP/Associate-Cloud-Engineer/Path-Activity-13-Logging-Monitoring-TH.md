# Activity 13 — Logging and Monitoring in Google Cloud

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Module 11 — Observability](./Module-11-Observability-and-Operations.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/99)

> โน้ตภาษาไทยเรียบเรียงใหม่ตามหัวข้อสาธารณะของกิจกรรม เพื่ออ่านแทนการดูวิดีโอได้สะดวก แต่ไม่ใช่ transcript หรือคำตอบ grader. ให้ตรวจรายละเอียดรุ่นบริการ, region, quota, feature และราคาในเอกสารปัจจุบันก่อนลงมือ

## เป้าหมายและกรอบคิด

Observability ใช้ metrics บอกแนวโน้ม, logs บอกเหตุการณ์, traces บอกเส้นทาง request และ Error Reporting ช่วยรวมข้อผิดพลาด. เริ่มจากคำถามปฏิบัติการและ user impact ไม่ใช่สร้าง dashboard โดยไม่มีผู้ใช้.

### Cloud Monitoring
Metrics มีชนิด, labels และ resource; เลือก alignment/aggregation ให้ถูกก่อนเปรียบเทียบ. Dashboard แสดงสุขภาพและความสัมพันธ์. Uptime checks ตรวจ availability จากมุมมอง probe. ใน multi-project monitoring วาง scoping project, monitored projects และ IAM ให้ชัด.

SLI คือการวัดผลบริการ, SLO คือเป้าหมายช่วงเวลา, SLA คือข้อผูกพันภายนอก. Alert policy ควรแจ้งเมื่อมี action ที่ต้องทำ; ลด noise ด้วย duration, threshold, missing-data behavior และ notification routing. ตรวจ incident, acknowledge, annotate และปรับ runbook.

### Cloud Logging
แยก source/agent, log bucket, retention, sink/router, log-based metric, query/view และ Log Analytics. Sink ส่ง log ไปปลายทางตาม filter; ตรวจ destination permission และ exclusion. ตั้ง retention ให้สัมพันธ์กับ audit/compliance/cost. Query ระบุ resource, time range และ filter ให้แคบก่อน.

### Audit logs และ lab themes
Admin Activity บันทึกการเปลี่ยนแปลงการจัดการ; Data Access ครอบคลุมการอ่าน/เขียนข้อมูลตามชนิดและการตั้งค่า. ตรวจว่าเปิด logging ตามที่ต้องการ, ใครอ่าน log ได้ และ sink ส่งข้อมูลสำเร็จ. Syllabus มี hands-on เรื่อง multi-project monitoring, uptime checks, alerts/SLOs, log analytics และ audit logs. ใช้บัญชี Skills สำหรับ lab; worksheet นี้ไม่ใช่ grader.

## Worksheet / เช็กความเข้าใจ

1. ระบุ workload และข้อกำหนดที่เป็นตัวตัดสินก่อนเลือก service
2. บอก tradeoff, security, scaling, observability และค่าใช้จ่ายของตัวเลือก
3. เขียนแผนตรวจผลและ rollback/cleanup ก่อนสร้างทรัพยากร
4. อธิบายว่า metric หรือ error ใดจะบอกว่าการออกแบบผิด

กิจกรรมนี้ใน repo มีโน้ตและ worksheet ประกอบเท่านั้น เว้นแต่จะระบุ lab โดยตรงใน Lab Map; ไม่มีการ provision ทรัพยากรจริงหรือยืนยันผล grader ในการจัดทำเอกสาร

## แหล่งอ้างอิง

- [Google Skills — Logging and Monitoring in Google Cloud](https://www.skills.google/paths/11/course_templates/99)
- [Cloud Monitoring](https://cloud.google.com/monitoring/docs)
- [Cloud Logging](https://cloud.google.com/logging/docs)
- [Audit Logs](https://cloud.google.com/logging/docs/audit)
