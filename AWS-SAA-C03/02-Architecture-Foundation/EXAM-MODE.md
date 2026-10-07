# Architecting on AWS 7.12.4 — EXAM MODE

> สำหรับใช้ทบทวนและค้นเร็วจากโน้ตส่วนตัวก่อน/ระหว่าง Open Book ตามกติกาที่ผู้คุมสอบอนุญาต
> Source basis: **Architecting on AWS 7.12.4 Student Guide + Note Module 1–13 + Cheat Sheet**
>
> ระหว่างสอบ **ห้ามใช้ AI และ Search Engine** ตามกติกาที่ได้รับมา จึงออกแบบไฟล์นี้ให้เปิดอ่านตรง ๆ และกดไป Module ที่เกี่ยวข้องได้โดยไม่ต้องพึ่ง external search

---

## 0. เปิดอะไรก่อน

1. ถ้าจำ service ได้แต่สับสนรายละเอียด → เปิด [Cheat Sheet](./Architecting-on-AWS_Cheat-Sheet.md)
2. ถ้าต้องการ context เต็ม → กด Module จากตารางด้านล่าง
3. ถ้าผู้คุมสอบอนุญาตการ Find ภายในเอกสาร ให้ใช้คำศัพท์ AWS ภาษาอังกฤษ เช่น `Multi-AZ`, `NACL`, `Transit Gateway`, `Visibility Timeout` เพราะหาได้ตรงที่สุด

> ถ้าไม่แน่ใจว่า Find-in-page ถือว่าอนุญาตหรือไม่ ให้ถาม TA/ผู้คุมก่อนเริ่มสอบ

---

# 1. Keyword → ไปดูตรงไหน

| ถ้าโจทย์พูดถึง | ให้นึกถึง / เช็ก | รายละเอียด |
|---|---|---|
| 6 Pillars, architecture review | Well-Architected Framework | [Module 1](./Module-01-Architecting-Fundamentals.md) |
| temporary credentials, cross-account, service role | IAM Role + STS / AssumeRole | [Module 2](./Module-02-Account-Security.md) |
| explicit deny, permission ceiling | IAM evaluation / Permissions Boundary / SCP | [Module 2](./Module-02-Account-Security.md) |
| public subnet | Route ไป Internet Gateway | [Module 3](./Module-03-Networking-1.md) |
| private instance ออก Internet | NAT Gateway → IGW | [Module 3](./Module-03-Networking-1.md) |
| stateful firewall | Security Group | [Module 3](./Module-03-Networking-1.md) |
| stateless subnet filter / allow + deny | Network ACL | [Module 3](./Module-03-Networking-1.md) |
| bootstrap ตอน launch | EC2 User Data | [Module 4](./Module-04-Compute.md) |
| instance อ่านข้อมูลเกี่ยวกับตัวเอง | Instance Metadata | [Module 4](./Module-04-Compute.md) |
| persistent block storage | EBS | [Module 4](./Module-04-Compute.md) |
| temporary local high-speed storage | Instance Store | [Module 4](./Module-04-Compute.md) |
| interruption ได้ / เน้นประหยัด | Spot Instances | [Module 4](./Module-04-Compute.md) |
| event-driven serverless function | Lambda | [Module 4](./Module-04-Compute.md) |
| object storage | S3 | [Module 5](./Module-05-Storage.md) |
| shared Linux/NFS file system | EFS | [Module 5](./Module-05-Storage.md) |
| Windows/Lustre/ONTAP/OpenZFS file workload | FSx family | [Module 5](./Module-05-Storage.md) |
| online data transfer | DataSync | [Module 5](./Module-05-Storage.md) |
| hybrid file/tape/iSCSI interface | Storage Gateway | [Module 5](./Module-05-Storage.md) |
| dataset ใหญ่มาก network ไม่เหมาะ | Snowball Edge | [Module 5](./Module-05-Storage.md) |
| DB high availability / automatic failover | RDS Multi-AZ | [Module 6](./Module-06-Database-Services.md) |
| DB read scaling | Read Replica | [Module 6](./Module-06-Database-Services.md) |
| MySQL/PostgreSQL compatible cluster | Aurora | [Module 6](./Module-06-Database-Services.md) |
| key-value/document / massive horizontal scale | DynamoDB | [Module 6](./Module-06-Database-Services.md) |
| cache for DynamoDB | DAX | [Module 6](./Module-06-Database-Services.md) |
| general in-memory cache | ElastiCache | [Module 6](./Module-06-Database-Services.md) |
| migrate/replicate DB data | DMS | [Module 6](./Module-06-Database-Services.md) |
| convert schema ระหว่าง DB engines | SCT | [Module 6](./Module-06-Database-Services.md) |
| metrics / logs / alarms | CloudWatch | [Module 7](./Module-07-Monitoring-and-Scaling.md) |
| ใครเรียก AWS API อะไร เมื่อไหร่ | CloudTrail | [Module 7](./Module-07-Monitoring-and-Scaling.md) |
| network accept/reject flow | VPC Flow Logs | [Module 7](./Module-07-Monitoring-and-Scaling.md) |
| Layer 7 HTTP/HTTPS load balancing | ALB | [Module 7](./Module-07-Monitoring-and-Scaling.md) |
| Layer 4 TCP/UDP / high performance | NLB | [Module 7](./Module-07-Monitoring-and-Scaling.md) |
| network appliances | GWLB | [Module 7](./Module-07-Monitoring-and-Scaling.md) |
| min/desired/max + launch template | EC2 Auto Scaling | [Module 7](./Module-07-Monitoring-and-Scaling.md) |
| Infrastructure as Code JSON/YAML | CloudFormation | [Module 8](./Module-08-Automation.md) |
| IaC ด้วย programming language | AWS CDK | [Module 8](./Module-08-Automation.md) |
| centralized operational management | Systems Manager | [Module 8](./Module-08-Automation.md) |
| higher-level app deployment | Elastic Beanstalk | [Module 8](./Module-08-Automation.md) |
| container image registry | ECR | [Module 9](./Module-09-Containers.md) |
| AWS-native container orchestration | ECS | [Module 9](./Module-09-Containers.md) |
| managed Kubernetes | EKS | [Module 9](./Module-09-Containers.md) |
| containers ไม่อยากดูแล hosts | Fargate | [Module 9](./Module-09-Containers.md) |
| private access ไป AWS service จาก VPC | VPC Endpoint / PrivateLink | [Module 10](./Module-10-Networking-2.md) |
| one-to-one VPC connection | VPC Peering | [Module 10](./Module-10-Networking-2.md) |
| many VPCs / hub-and-spoke / routing centralization | Transit Gateway | [Module 10](./Module-10-Networking-2.md) |
| encrypted hybrid ผ่าน Internet | Site-to-Site VPN | [Module 10](./Module-10-Networking-2.md) |
| dedicated/private hybrid connectivity | Direct Connect | [Module 10](./Module-10-Networking-2.md) |
| managed API front door | API Gateway | [Module 11](./Module-11-Serverless.md) |
| queue / decouple producer-consumer | SQS | [Module 11](./Module-11-Serverless.md) |
| pub/sub / fan-out notification | SNS | [Module 11](./Module-11-Serverless.md) |
| real-time streaming data | Kinesis | [Module 11](./Module-11-Serverless.md) |
| workflow / state machine / orchestration | Step Functions | [Module 11](./Module-11-Serverless.md) |
| DNS / routing policy / hosted zone | Route 53 | [Module 12](./Module-12-Edge-Services.md) |
| CDN / cache content near users | CloudFront | [Module 12](./Module-12-Edge-Services.md) |
| DDoS protection | Shield | [Module 12](./Module-12-Edge-Services.md) |
| HTTP request filtering rules | WAF | [Module 12](./Module-12-Edge-Services.md) |
| centrally manage firewall policies | Firewall Manager | [Module 12](./Module-12-Edge-Services.md) |
| AWS infrastructure on-premises | Outposts | [Module 12](./Module-12-Edge-Services.md) |
| acceptable data loss | RPO | [Module 13](./Module-13-Backup-and-Recovery.md) |
| acceptable recovery time | RTO | [Module 13](./Module-13-Backup-and-Recovery.md) |
| centralized automated backups | AWS Backup | [Module 13](./Module-13-Backup-and-Recovery.md) |
| lowest DR cost / recovery ช้าที่สุด | Backup & Restore | [Module 13](./Module-13-Backup-and-Recovery.md) |
| core system minimal always-on | Pilot Light | [Module 13](./Module-13-Backup-and-Recovery.md) |
| scaled-down environment always running | Warm Standby | [Module 13](./Module-13-Backup-and-Recovery.md) |
| lowest downtime / highest running cost | Multi-site Active/Active | [Module 13](./Module-13-Backup-and-Recovery.md) |

---

# 2. จุดสับสนที่ต้องตัดให้ขาด

## Multi-AZ vs Read Replica

| ต้องการ | คิดถึง |
|---|---|
| HA / automatic failover | **Multi-AZ** |
| เพิ่ม read capacity | **Read Replica** |

## Security Group vs NACL

| Security Group | Network ACL |
|---|---|
| Stateful | Stateless |
| ENI/instance level | Subnet level |
| Allow | Allow + Deny |

## CloudWatch vs CloudTrail vs VPC Flow Logs

| คำถาม | Service |
|---|---|
| ระบบ performance / metric / alarm? | **CloudWatch** |
| ใครเรียก AWS API? | **CloudTrail** |
| network flow accept/reject? | **VPC Flow Logs** |

## SQS vs SNS vs Kinesis vs Step Functions

| Requirement | Service |
|---|---|
| Queue / decouple | **SQS** |
| Pub/Sub / fan-out | **SNS** |
| Streaming data | **Kinesis** |
| Workflow orchestration | **Step Functions** |

## VPC Peering vs Transit Gateway

| Requirement | Service |
|---|---|
| direct one-to-one VPC connection | **VPC Peering** |
| many networks / central hub | **Transit Gateway** |

**Peering ไม่ transitive**

## NAT Gateway vs VPC Endpoint

| Requirement | Service |
|---|---|
| private workload ออก Internet | **NAT Gateway** |
| private access ไป supported AWS service | **VPC Endpoint** |

## Route 53 vs CloudFront

| Requirement | Service |
|---|---|
| DNS / routing | **Route 53** |
| CDN / edge cache | **CloudFront** |

## Shield vs WAF vs Firewall Manager

| Requirement | Service |
|---|---|
| DDoS protection | **Shield** |
| filter web requests | **WAF** |
| manage policies centrally | **Firewall Manager** |

## RPO vs RTO

- **RPO** = ยอมเสียข้อมูลย้อนหลังได้แค่ไหน
- **RTO** = ระบบต้องกลับมาได้เร็วแค่ไหน

---

# 3. Service groups จำแบบสั้น

```text
Identity        -> IAM / Organizations / SCP
Network         -> VPC / SG / NACL / NAT / IGW / Peering / TGW / VPN / DX
Compute         -> EC2 / Lambda
Storage         -> EBS / S3 / EFS / FSx
Database        -> RDS / Aurora / DynamoDB / ElastiCache / DAX
Observe         -> CloudWatch / CloudTrail / Flow Logs
Scale           -> ELB / Auto Scaling
IaC / Ops       -> CloudFormation / CDK / Systems Manager / Beanstalk
Containers      -> ECR / ECS / EKS / Fargate
Messaging       -> SQS / SNS / Kinesis / Step Functions
Edge            -> Route 53 / CloudFront / Shield / WAF
DR              -> AWS Backup / Backup-Restore / Pilot Light / Warm Standby / Active-Active
```

---

# 4. วิธีใช้ตอนทำข้อสอบแบบไม่เสียเวลา

- รอบแรกตอบข้อที่มั่นใจทันที อย่าเปิด Note ทุกข้อ
- ถ้าสับสนแค่ 2 services ให้เปิดส่วน comparison ในไฟล์นี้หรือ Cheat Sheet
- ถ้าจำ concept ไม่ได้จริง ๆ ค่อยกดเข้า Module เต็ม
- ข้อที่ใช้เวลานานให้ข้าม/mark ไว้ก่อน แล้วกลับมารอบสอง
- อ่านคำในโจทย์ให้จับ requirement เช่น **high availability, read scaling, decouple, fan-out, private connectivity, lowest downtime, lowest cost** ก่อนมองช้อยส์
- อย่าเลือก service เพราะชื่อคุ้น ให้เลือกเพราะมันตอบ requirement

---

# 5. Module Map

1. [Architecting Fundamentals](./Module-01-Architecting-Fundamentals.md)
2. [Account Security](./Module-02-Account-Security.md)
3. [Networking 1](./Module-03-Networking-1.md)
4. [Compute](./Module-04-Compute.md)
5. [Storage](./Module-05-Storage.md)
6. [Database Services](./Module-06-Database-Services.md)
7. [Monitoring and Scaling](./Module-07-Monitoring-and-Scaling.md)
8. [Automation](./Module-08-Automation.md)
9. [Containers](./Module-09-Containers.md)
10. [Networking 2](./Module-10-Networking-2.md)
11. [Serverless](./Module-11-Serverless.md)
12. [Edge Services](./Module-12-Edge-Services.md)
13. [Backup and Recovery](./Module-13-Backup-and-Recovery.md)

---

## Final reminder

ไฟล์นี้เป็น **lookup/index จากเนื้อหาที่เรียน** ไม่ใช่คำตอบข้อสอบล่วงหน้า เป้าหมายคือช่วยหา section ในโน้ตส่วนตัวได้เร็วขึ้นใน Open Book

ระหว่างสอบให้ปฏิบัติตามกติกาของผู้จัดสอบเป็นหลัก โดยเฉพาะข้อห้ามเรื่อง AI, Search Engine และการปรึกษาผู้อื่น
