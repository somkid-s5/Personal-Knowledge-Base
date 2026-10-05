# Activity 10 — AI Infrastructure: Cloud GPUs

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Module 13](./Module-13-AI-Tooling-and-Modern-Services.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/1403)

> โน้ตภาษาไทยเรียบเรียงใหม่ตามหัวข้อสาธารณะของกิจกรรม เพื่ออ่านแทนการดูวิดีโอได้สะดวก แต่ไม่ใช่ transcript หรือคำตอบ grader. ให้ตรวจรายละเอียดรุ่นบริการ, region, quota, feature และราคาในเอกสารปัจจุบันก่อนลงมือ

## เป้าหมายและกรอบคิด

GPU เร่ง tensor/matrix workloads ที่ขนานได้ แต่ไม่ทำให้งานทุกส่วนเร็วขึ้น: preprocessing, data input, serialization หรือ small-batch inference อาจติด CPU, disk, network หรือ framework support. เทียบ CPU/GPU/TPU จาก benchmark ของ model, framework, input shape, precision, batch, latency และ throughput จริง

### ก่อน provision
บันทึก training หรือ inference, model/memory footprint, throughput และ p95/p99 target, จำนวน accelerators, parallelism, checkpoint/recovery, data locality, OS/container/driver/runtime, region/zone, quota/capacity และ budget. Quota approval ไม่รับประกันว่า capacity ว่างใน zone ที่ต้องการ.

### รูปแบบติดตั้ง
- Single VM + GPU สำหรับ dev, benchmark และ workload เครื่องเดียว
- Multi-GPU VM เมื่อ framework/interconnect และ memory fit
- Multi-VM cluster สำหรับ distributed training/serving; ต้องดู coordination, networking, checkpoint และ failure
- GKE เมื่อจำเป็นต้อง schedule container/job หลายชุด; เพิ่มภาระ Kubernetes และต้องจัดการ node pool, device exposure, resource requests และ autoscaling
- Batch/managed endpoint เมื่อ job หรือ serving pattern เข้ากับข้อจำกัดบริการ

### Software และ data path
ตรวจ OS image, driver, CUDA/runtime, framework build, container และ device visibility ให้เข้ากัน; pin versions. วัด warm-up แยก steady state. ใช้ profiling ตรวจว่า bottleneck อยู่ที่ compute, input pipeline, host CPU, memory, disk หรือ network. เก็บ model/checkpoint ใน durable storage และทดสอบ restore.

### Utilization และ economics
เก็บ GPU utilization/memory คู่กับ CPU, host RAM, disk/network, queue, throughput และ latency. GPU utilization ต่ำพร้อม CPU สูงชี้ input/preprocessing; OOM ชี้ memory/batch/model footprint; utilization สูงแต่ throughput แย่ให้ตรวจ contention, synchronization, throttling และ code. ต้นทุนรวมมี accelerator time, idle capacity, disks, data transfer และ orchestration. ตั้ง budget alert และ cleanup; ทำ benchmark เทียบ cost per useful training step หรือ request.

## Worksheet / เช็กความเข้าใจ

1. ระบุ workload และข้อกำหนดที่เป็นตัวตัดสินก่อนเลือก service
2. บอก tradeoff, security, scaling, observability และค่าใช้จ่ายของตัวเลือก
3. เขียนแผนตรวจผลและ rollback/cleanup ก่อนสร้างทรัพยากร
4. อธิบายว่า metric หรือ error ใดจะบอกว่าการออกแบบผิด

กิจกรรมนี้ใน repo มีโน้ตและ worksheet ประกอบเท่านั้น เว้นแต่จะระบุ lab โดยตรงใน Lab Map; ไม่มีการ provision ทรัพยากรจริงหรือยืนยันผล grader ในการจัดทำเอกสาร

## แหล่งอ้างอิง

- [Google Skills — AI Infrastructure: Cloud GPUs](https://www.skills.google/paths/11/course_templates/1403)
- [GPU documentation](https://cloud.google.com/compute/docs/gpus)
- [Compute monitoring metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-compute)
