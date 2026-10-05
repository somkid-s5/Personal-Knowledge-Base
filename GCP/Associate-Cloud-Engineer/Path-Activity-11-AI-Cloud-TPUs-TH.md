# Activity 11 — AI Infrastructure: Cloud TPUs

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Activity 10 — GPUs](./Path-Activity-10-AI-Cloud-GPUs-TH.md) · [Module 13](./Module-13-AI-Tooling-and-Modern-Services.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/1405)

> โน้ตภาษาไทยเรียบเรียงใหม่ตามหัวข้อสาธารณะของกิจกรรม เพื่ออ่านแทนการดูวิดีโอได้สะดวก แต่ไม่ใช่ transcript หรือคำตอบ grader. ให้ตรวจรายละเอียดรุ่นบริการ, region, quota, feature และราคาในเอกสารปัจจุบันก่อนลงมือ

## เป้าหมายและกรอบคิด

TPU เป็น accelerator ที่เหมาะกับ tensor operations ซึ่ง framework/runtime รองรับ การเลือกไม่ใช่การจัดอันดับว่าดีกว่า GPU เสมอ แต่ต้องจับคู่ model, operators, memory, topology, scale, availability และราคา.

### Workload fit และ architecture
เหมาะเมื่อ framework/model รองรับ TPU path และ workload ขนานเป็น tensor ได้ดี; อาจไม่เหมาะกับ custom GPU kernels, unsupported operators, batch เล็กมาก หรือ migration cost สูง. แยก single/small configuration, multi-chip slice และ multi-host ตามขนาดงาน. Scaling ไม่เป็นเส้นตรงเสมอเพราะ communication, synchronization และ data input กลายเป็น bottleneck.

### Software compatibility
ก่อนเริ่มตรวจ framework/runtime version, supported operators, precision, input shape, compiler, container, data access และ checkpoint format. GPU/TPU interoperability หมายถึง workflow ที่ artifacts และ software รองรับข้าม accelerator ไม่ได้หมายความว่าแชร์ memory หรือรัน binary เดียวกันโดยอัตโนมัติ. ตรวจ numerical behavior และคุณภาพโมเดลหลังย้าย.

### Benchmark และ operations
แยก compile/warm-up ออกจาก steady-state; วัด throughput, p95 latency, memory, input throughput และ recovery. pin source, image, framework, TPU type/topology. ใช้ checkpoint cadence ลดเวลาที่ต้อง train ซ้ำ; profiling หา compute/input/communication bottleneck. สำหรับ serving ทดสอบ model loading, batching, concurrency, autoscaling และ tail latency. ยืนยัน type, topology, zone/region, quota และ capacity ก่อนออกแบบจริง.

## Worksheet / เช็กความเข้าใจ

1. ระบุ workload และข้อกำหนดที่เป็นตัวตัดสินก่อนเลือก service
2. บอก tradeoff, security, scaling, observability และค่าใช้จ่ายของตัวเลือก
3. เขียนแผนตรวจผลและ rollback/cleanup ก่อนสร้างทรัพยากร
4. อธิบายว่า metric หรือ error ใดจะบอกว่าการออกแบบผิด

กิจกรรมนี้ใน repo มีโน้ตและ worksheet ประกอบเท่านั้น เว้นแต่จะระบุ lab โดยตรงใน Lab Map; ไม่มีการ provision ทรัพยากรจริงหรือยืนยันผล grader ในการจัดทำเอกสาร

## แหล่งอ้างอิง

- [Google Skills — AI Infrastructure: Cloud TPUs](https://www.skills.google/paths/11/course_templates/1405)
- [Cloud TPU documentation](https://cloud.google.com/tpu/docs)
- [TPU system architecture](https://cloud.google.com/tpu/docs/system-architecture-tpu-vm)
