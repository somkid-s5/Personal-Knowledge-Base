# Module 11 — Monitoring, Logging & Troubleshooting

[สารบัญ](./README.md) · [ก่อนหน้า](./Module-10-Load-Balancing-and-Hybrid-Networking.md) · [ถัดไป](./Module-12-Terraform-and-Infrastructure-as-Code.md)

## 1. Resource ไม่เต็มไม่ได้แปลว่าระบบไม่ช้า

ระบบ LB → app1/app2 → DB อาจช้าเพราะ connection pool เต็ม, query wait, DNS, retries, disk latency หรือ network round trips แม้ CPU/RAM ไม่ถึง 100%

เริ่มจาก **ผู้ใช้ช้าที่ operation ใด และช่วงเวลาใด** แล้วเชื่อมหลักฐานของทุกชั้น อย่าเริ่มด้วย “เพิ่ม CPU” หรือ “restart Tomcat” โดยยังไม่รู้ bottleneck

## 2. Metrics, logs และ traces

| สัญญาณ | ตอบคำถาม | ตัวอย่าง |
|---|---|---|
| Metrics | เกิดมากแค่ไหน/แนวโน้ม? | request rate, error ratio, latency, saturation |
| Logs | เกิดอะไรใน event/request? | stack trace, failed auth, deployment error |
| Traces | request ใช้เวลาในขั้นไหน? | frontend → app → database spans |
| Audit logs | ใครเปลี่ยน/เข้าถึงอะไร? | IAM update, resource create/delete, data access ตาม config |

[Cloud Logging](https://docs.cloud.google.com/logging/docs/overview) และ [Cloud Monitoring](https://docs.cloud.google.com/monitoring/alerts) ใช้ร่วมกัน การมี logs มากไม่ได้แปลว่ามี alert ที่ actionable และ dashboard สวยไม่ได้แทนการแจ้งปัญหา

## 3. Four signals ที่ใช้ดู service

- **Latency:** ใช้ percentiles เช่น p95/p99 ไม่ดู average อย่างเดียว
- **Traffic:** จำนวน requests/throughput และ pattern
- **Errors:** error rate แยก status/operation ไม่ดูจำนวน raw อย่างเดียว
- **Saturation:** resource/pool/queue ที่ใกล้เพดาน

ตัวอย่าง error 100 ครั้งต่อวัน ถ้า traffic 100 ครั้งคือเสียทั้งหมด แต่ถ้า traffic 10 ล้านครั้งมีความหมายอีกแบบ ใช้ numerator/denominator ให้ตรง

## 4. Ops Agent

[Ops Agent](https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent) บน VM ใช้เก็บ telemetry ของ OS/application ตาม integrations/configuration

Metrics จาก platform เช่น CPU ของ VM อาจมีให้แม้ไม่ติด agent แต่ guest memory/process/application logs บางชุดต้อง agent/instrumentation

ก่อน install ตรวจ supported OS, network egress/private access, permissions ของ VM SA, API และค่า ingestion ไม่สมมติว่า agent ตัวเดียวรู้ business transactions ทุกแอป

ใช้ managed telemetry ของ Cloud Run/GKE ตามบริการ; ไม่ติด VM agent ใน serverless container เพราะเห็นคำว่า monitoring แล้วคิดว่าต้องเหมือน VM

## 5. Logs Explorer และ CLI filters

ตัวอย่าง VM error logs:

```text
resource.type="gce_instance"
severity>=ERROR
```

ตัวอย่าง Cloud Run:

```text
resource.type="cloud_run_revision"
resource.labels.service_name="ace-hello"
severity>=ERROR
```

ตัวอย่าง read-only command:

```bash
gcloud logging read \
  'resource.type="cloud_run_revision" AND severity>=ERROR' \
  --project=PROJECT_ID \
  --freshness=1h \
  --limit=20 \
  --format=json
```

ถ้าไม่พบ error ไม่ได้พิสูจน์ว่า app ไม่มี error เพราะ app อาจ log เป็น default severity/plain text, resource filter ผิด, time range ผิด หรือ logs ยังไม่ถูกส่งมา

## 6. Log Router, sinks และ log buckets

| ส่วน | หน้าที่ |
|---|---|
| Log Router | ประเมิน routing/filtering ของ log entries |
| Sink | ระบุ filter และ destination |
| Log bucket | เก็บ logs ตาม retention/access ที่กำหนด |
| Log Analytics | วิเคราะห์ logs ใน features ที่รองรับ |

Sink ไม่ใช่การ query ทุก log ในอดีตแล้วส่งย้อนหลังโดยอัตโนมัติ หากต้อง historical migration ให้ตรวจ workflow แยก

Destination เช่น Logging bucket, Cloud Storage, BigQuery หรือ Pub/Sub ตาม support ต้องให้ writer identity ของ sink มี destination permissions ด้วย สร้าง sink อย่างเดียวไม่รับประกันว่าข้อมูลลงปลายทาง

การส่ง external/on-prem มักใช้ Pub/Sub/consumer pipeline ที่ออกแบบเอง ไม่ใช่กรอก IP ของ Graylog แล้วทุกอย่างส่งตรงโดยไม่มี connector

## 7. Audit logs และ network logs

ตาม [Cloud Audit Logs](https://docs.cloud.google.com/logging/docs/audit) มีประเภทเช่น Admin Activity, Data Access, System Event และ Policy Denied โดย availability/defaults/cost ต่างกันตามประเภทและบริการ

Admin Activity ใช้สืบว่าใครเปลี่ยน infrastructure Data Access ต้องตรวจ enablement/permissions และ exceptions ของบริการ เช่น BigQuery ไม่สมมติว่าทุกบริการเปิดเหมือนกัน

| Log | เน้นดู |
|---|---|
| Audit logs | API operation และ identity ที่เกี่ยวข้อง |
| VPC Flow Logs | network flow telemetry แบบ sampling/aggregation ตาม config |
| Firewall rule logs | traffic ที่ match rules ที่เปิด logging |
| Application logs | business/app behavior และ errors |

Exam guide รวม network logging ในกลุ่ม operation/audit considerations แต่ **VPC Flow Logs ไม่ใช่ Admin Activity Audit Logs** และไม่ได้แทน full packet capture

## 8. Alerts ที่คนรับรู้ว่าต้องทำอะไร

Alert policy มี condition, duration/window, notification channels และ incident behavior ตาม config

ตัวอย่าง alert ที่ช่วยจริง: `5xx ratio สูงกว่า threshold ต่อเนื่อง` พร้อม service/project/runbook link แทน CPU spike วินาทีเดียวที่ไม่มี user impact

| ถามก่อนตั้ง | เหตุผล |
|---|---|
| ใครรับ? | ต้องมี owner ที่แก้ได้ |
| มีเวลาทำอะไร? | threshold ให้เวลา response |
| Missing data เป็นอย่างไร? | agent หายกับ metric ต่ำมีความหมายต่างกัน |
| ระยะประเมินเหมาะไหม? | ลด noise และไม่ช้าเกินเหตุ |
| Alert มี runbook หรือไม่? | เปิดแล้วเริ่มตรวจได้ทันที |

Notification channel ต้อง verify/permission ตามระบบ ค่า latency ของ metrics/alerts ไม่เป็นศูนย์ อย่าใช้ monitoring alert เป็น exact transaction interlock

## 9. Custom metrics และ log-based metrics

Platform CPU ไม่เห็น queue length/DB pool usage ของ app จึงเพิ่ม custom metrics หรือ log-based metrics ให้ตรงสิ่งที่ต้องวัด

**ตัวอย่าง instrumentation ที่ออกแบบเอง:** `db_pool_active`, `db_pool_waiting`, `db_acquire_seconds`, `http_request_duration` ช่วยแยกว่าช้าที่การรอ connection หรือ SQL execution

ไม่เอา user IDs/request IDs ที่เปลี่ยนทุกครั้งเป็น metric labels โดยไม่คิด cardinality เพราะ series จำนวนมากทำให้ดูยากและต้นทุนเพิ่ม

## 10. Trace, Profiler และ Query Insights

| เครื่องมือ | ใช้หาปัญหาอะไร |
|---|---|
| Cloud Trace | distributed request latency/spans |
| Cloud Profiler | CPU/memory hot paths ใน runtime ที่รองรับ |
| Query Insights | database query performance ที่บริการ/edition รองรับ |
| Index advisor | คำแนะนำ index ตามผลิตภัณฑ์ที่รองรับ |

เครื่องมือเหล่านี้อาจต้อง instrumentation/enablement และ support constraints ไม่ใช่เปิด console แล้วรู้ request ทุกตัวของแอป legacy ทันที

## 11. Prometheus และ health tools

Managed Service for Prometheus ใช้กับ metrics ecosystem ของ Prometheus ตาม deployment model ที่รองรับ เหมาะเมื่อ workload/exporters ใช้โมเดลนั้นอยู่

Personalized Service Health ช่วยดูเหตุการณ์ของ Google Cloud ที่เกี่ยวข้องกับ environment; Cloud Hub รวม operations insights; Active Assist ช่วย recommendations เช่น utilization/cost/security ตามบริการ

Recommendation เป็นหลักฐานประกอบ ไม่ใช่คำสั่งลด VM ทันที เพราะ metrics window อาจไม่ครอบคลุมงาน batch รายเดือนหรือ peak สำคัญ

## 12. Runbook: ระบบช้า

1. บันทึกเวลา timezone, endpoint, error และ request/correlation ID
2. ดู user-facing latency/error/traffic ในช่วงก่อนและหลังเกิดเหตุ
3. แยก LB latency กับ backend/app latency ตาม metrics ที่มี
4. เทียบ app instances ว่าช้าทุกตัวหรือบางตัว
5. ดู connection pool/threads/queue/GC และ app logs
6. ดู DB query waits, connections, CPU, storage latency และ locks
7. ดู network/DNS และ deployment/config changes ที่ช่วงเดียวกัน
8. ตรวจ provider incidents/maintenance
9. สร้างสมมติฐานหนึ่งข้อ แล้วใช้หลักฐานทดสอบ
10. บันทึก mitigation, recovery verification และ follow-up แก้สาเหตุ

**ตัวอย่าง:** DB connections ขึ้นต่อเนื่อง แต่ CPU ต่ำและ app pool wait สูง สนับสนุนสมมติฐาน connection handling/pool contention มากกว่าสรุปว่า compute ไม่พอจาก CPU อย่างเดียว

## ทบทวน

**ต้องรู้ใครเปลี่ยน IAM:** Audit logs ตาม scope/permissions

**ต้องรู้ request รอ DB นานเท่าไร:** trace/instrumentation และ DB performance signals

**VM ไม่ส่ง RAM metric:** ตรวจ guest telemetry/agent ก่อนสรุปว่า RAM ใช้ 0

## เอกสารประกอบ

- [Cloud Logging](https://docs.cloud.google.com/logging/docs/overview)
- [Audit Logs](https://docs.cloud.google.com/logging/docs/audit)
- [Alerting](https://docs.cloud.google.com/monitoring/alerts)
- [Ops Agent](https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent)
- [Log routing](https://docs.cloud.google.com/logging/docs/routing/overview)
- [Managed Prometheus](https://docs.cloud.google.com/stackdriver/docs/managed-prometheus)
