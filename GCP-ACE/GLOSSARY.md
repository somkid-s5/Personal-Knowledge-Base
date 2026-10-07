# Glossary — คำศัพท์ ACE แบบภาษาไทย

[กลับสารบัญ](./README.md)

คำอธิบายเป็นภาพจำสำหรับอ่านเอกสาร English ไม่ใช่นิยามข้อกำหนดทุก feature ของบริการ

| English | ความหมายที่ใช้ในบทเรียน |
|---|---|
| Resource | สิ่งที่สร้าง/จัดการ เช่น VM, bucket, service |
| Organization | รากสำหรับจัด resources/governance ขององค์กร |
| Folder | กลุ่ม project/folder เพื่อจัดนโยบายและ ownership |
| Project | หน่วยรวม resources, API configuration, access และ billing linkage |
| Scope | ขอบเขตที่ role/config/resource มีผล |
| Principal | ตัวตนที่ขอทำ action เช่น user, SA หรือ federated identity |
| Authentication | พิสูจน์ว่าเป็นใคร |
| Authorization | ตรวจว่าอนุญาตให้ทำอะไร |
| Permission | สิทธิ์ทำ action เฉพาะ |
| Role | ชุด permissions |
| Binding | การผูก role กับ principal(s) และเงื่อนไขที่รองรับ |
| Inheritance | สิทธิ์/นโยบายจากระดับบนมีผลลงระดับล่าง |
| Least privilege | ให้สิทธิ์เท่าที่จำเป็นต่อหน้าที่ |
| Service account (SA) | identity สำหรับ workload/automation |
| Service agent | identity ที่บริการจัดการเพื่อทำงานเบื้องหลัง |
| Impersonation | caller ใช้ short-lived identity ของ SA ตาม permission |
| Federation | เชื่อม/แลก external identity ตาม trust configuration |
| ADC | วิธีที่ libraries/tools หา application credentials |
| Control plane | APIs/controllers ที่จัด config/lifecycle |
| Data plane | ทางที่ request/data ของ workload ถูกประมวลผล |
| Region | พื้นที่ภูมิศาสตร์ของ deployment |
| Zone | deployment area ภายใน region |
| Quota | เพดานใช้ทรัพยากร/API ตาม scope |
| Capacity | ทรัพยากรพร้อมใช้จริง ณ location/เวลา |
| CIDR | รูปแบบ IP range พร้อม prefix length |
| Ingress | traffic ที่เข้ามายังขอบเขตที่กำลังพิจารณา |
| Egress | traffic ที่ออกจากขอบเขตนั้น |
| Route | กฎเลือกเส้นทาง/next hop |
| Firewall | กฎอนุญาต/ปฏิเสธ traffic |
| Stateful firewall | firewall ที่ติดตาม connection state |
| NAT | แปลง network addresses ตาม configuration |
| DNS | ระบบแปลงชื่อเป็น records เช่น IP |
| TTL | อายุ cache/record ตามบริบท |
| BGP | protocol แลก routing information |
| Peering | การเชื่อม networks ตาม route exchange model |
| Shared VPC | network กลางใน host project ที่ service projects ใช้ได้ |
| Load balancer | entry point ที่กระจาย traffic ไป backends |
| Backend | ปลายทางที่รับงานจาก load balancer |
| Health check | ตรวจความพร้อมตาม condition/endpoint ที่กำหนด |
| Instance template | baseline configuration สำหรับสร้าง VM |
| MIG | Managed Instance Group จัด VM lifecycle/desired group configuration |
| Autoscaling | ปรับจำนวน/ทรัพยากรตาม signal และ policy |
| Autohealing | ฟื้น/แทน resource ที่ unhealthy ตาม policy |
| Stateless | ไม่พึ่ง local persistent state ของ instance เพื่อความถูกต้อง |
| Stateful | มี identity/data state ที่ต้องจัด lifecycle ให้สอดคล้อง |
| Snapshot | point-in-time disk state ตามชนิด snapshot |
| Image | baseline OS/software หรือ container package ตามบริบท |
| Object | หน่วยข้อมูลใน object storage |
| Generation | identifier ของ object data version |
| Lifecycle | rules/actions ตลอดช่วงชีวิต resource/object |
| Retention | ระยะ/เงื่อนไขการเก็บข้อมูลก่อนลบได้ |
| Soft delete | retained deleted state เพื่อ recovery ตาม window |
| HA | High Availability: ออกแบบให้ทน failure ที่ระบุ |
| DR | Disaster Recovery: แผนกู้เมื่อเกิดเหตุรุนแรงตามขอบเขต |
| RPO | ปริมาณเวลา data loss สูงสุดที่ยอมรับได้ |
| RTO | เวลากู้บริการสูงสุดที่ยอมรับได้ |
| OLTP | transactional application workloads |
| OLAP | analytical workloads |
| Replica | สำเนาข้อมูล/instance ตาม replication model |
| PITR | Point-in-time recovery ตาม logs/history ที่รองรับ |
| Connection pool | กลุ่ม connections ที่ใช้ซ้ำและควบคุมการเข้าถึง |
| Latency | เวลาที่ request/action ใช้ |
| Throughput | ปริมาณงานสำเร็จต่อหน่วยเวลา |
| IOPS | จำนวน storage I/O operations ต่อวินาที |
| Pod | หน่วย workload scheduling ของ Kubernetes |
| Deployment | Kubernetes desired replicated workload/release |
| Service | Kubernetes stable endpoint/selection model |
| Namespace | ขอบเขตจัดกลุ่ม resources ใน Kubernetes |
| Request / limit | resource reservation signal / runtime cap ตาม Kubernetes behavior |
| HPA / VPA | scaling replicas / resource sizing ตาม mode |
| Revision | version snapshot ของ Cloud Run configuration |
| Concurrency | งาน/requests ที่ประมวลผลพร้อมกันตามขอบเขต |
| Idempotency | ทำซ้ำแล้วไม่เกิดผลสำคัญซ้ำที่ไม่ตั้งใจ |
| Acknowledge | แจ้งสำเร็จตาม delivery contract |
| Backoff | เพิ่มระยะรอก่อน retry |
| Metric | ค่าที่วัดตามเวลา |
| Log entry | บันทึก event/context |
| Trace / span | เส้นทาง request / ช่วงงานย่อย |
| Sink | กฎส่ง logs ไป destination |
| Cardinality | จำนวน distinct label combinations/series ตามบริบท |
| Drift | resources จริงต่างจาก desired configuration |
| State | mapping/status ที่ IaC tool ใช้จัด resources |
| CMEK | Customer-managed encryption key ของบริการที่รองรับ |

## คู่ที่ควรแยกให้ได้

- Authentication ≠ Authorization
- Project ≠ Billing account
- IAM access ≠ Network reachability
- Route ≠ Firewall ≠ Application listener
- HA ≠ Backup ≠ DR
- CPU utilization ≠ User-facing latency
- Runtime SA ≠ Deployer identity
- Kubernetes SA ≠ IAM SA
- Autoscaling ≠ Autohealing ≠ Load balancing
- Terraform state ≠ Data backup
