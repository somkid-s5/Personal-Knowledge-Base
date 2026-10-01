# Mock Exam — Architecting on AWS 7.12.4 (65 Questions)

> แบบฝึกซ้อมจาก **Student Guide / Notes Module 1–13** ที่สรุปไว้ใน repository นี้เท่านั้น  
> รูปแบบ: **Single best answer (A–D)** · 65 ข้อ · แนะนำเวลา **120 นาที**  
> เป้าหมายสำหรับเงื่อนไข “เกิน 80%”: **อย่างน้อย 53/65**

## กติกาซ้อม

1. จับเวลา 120 นาที
2. ทำรอบแรกจากความรู้ก่อน ถ้าลังเลให้ mark ไว้
3. ถ้าจะซ้อมแบบ Open Book ให้ใช้เฉพาะ Note/EXAM-MODE/Cheat Sheet ของชุดนี้
4. **อย่าเปิดไฟล์เฉลยจนกว่าจะทำครบ 65 ข้อ**
5. จดคำตอบใน Answer Sheet ด้านล่างหรือกระดาษแยก

---

## Questions

### Module 1

**1. องค์กรต้องการลดเวลารอจัดซื้อ Hardware และเปิดใช้ทรัพยากรได้เร็วขึ้น ประโยชน์ของ Cloud ที่ตรงที่สุดคือข้อใด?**

A. บังคับให้ใช้ Region เดียว  
B. เพิ่ม Agility และลด time to market  
C. ลดจำนวน Availability Zones  
D. เปลี่ยนทุกระบบเป็น Serverless

---

**2. ข้อใดอธิบาย Availability Zone (AZ) ได้ถูกต้องที่สุดตามหลักสูตร?**

A. ประเทศหนึ่งประเทศ  
B. Fault-isolated location ภายใน Region  
C. กลุ่ม Edge Locations ทั่วโลก  
D. VPC หนึ่งตัว

---

**3. ข้อใดเป็นปัจจัยในการเลือก AWS Region ตามเนื้อหาในคอร์ส?**

A. ประเภทของ Security Group เท่านั้น  
B. Governance/legal, latency, service availability และ cost  
C. ขนาดของ S3 object เท่านั้น  
D. จำนวน IAM Users เท่านั้น

---

**4. Least Privilege สัมพันธ์กับ AWS Well-Architected pillar ใดมากที่สุด?**

A. Cost Optimization  
B. Performance Efficiency  
C. Security  
D. Sustainability

---

**5. ข้อใดอธิบาย Local Zone ได้ใกล้เคียงที่สุด?**

A. เป็น IAM policy ชนิดหนึ่ง  
B. เป็น private subnet อัตโนมัติ  
C. เป็น Region ใหม่เต็มรูปแบบ  
D. นำ compute/storage บางส่วนไปใกล้ผู้ใช้ในพื้นที่เฉพาะ

---

### Module 2

**6. ควรใช้ AWS account root user สำหรับงานใด?**

A. รัน EC2 application ทุกตัว  
B. ใช้แทน IAM Role  
C. งาน admin ประจำวันทั้งหมด  
D. งานที่จำเป็นต้องใช้ root โดยเฉพาะ แล้วใช้ให้น้อยที่สุด

---

**7. ถ้าต้องการ temporary credentials สำหรับ service-to-service หรือ cross-account access ควรใช้สิ่งใด?**

A. S3 bucket policy อย่างเดียว  
B. Root user  
C. IAM Group  
D. IAM Role + STS/AssumeRole

---

**8. เมื่อ policy ที่ใช้กับ request มี Explicit Deny และมี Allow จาก policy อื่น ผลลัพธ์คืออะไร?**

A. ขึ้นอยู่กับ Region  
B. สุ่มตาม policy order  
C. Allow ชนะเสมอ  
D. Explicit Deny ชนะ

---

**9. Permissions Boundary มีหน้าที่หลักอะไร?**

A. กำหนด maximum permissions ของ identity  
B. Grant permission โดยตรง  
C. สร้าง VPC route  
D. Encrypt S3 objects

---

**10. ข้อใดถูกต้องเกี่ยวกับ Service Control Policy (SCP)?**

A. SCP เป็น guardrail กำหนดขอบเขต permission สำหรับ accounts/OUs  
B. SCP ใช้สร้าง IAM credentials  
C. SCP grant permission ให้ IAM user โดยตรง  
D. SCP ใช้แทน Security Group

---

### Module 3

**11. อะไรทำให้ subnet ถูกมองว่าเป็น public subnet ในมุมมอง routing?**

A. มี route ไป Internet Gateway  
B. มี EBS volume  
C. มี IAM Role  
D. มี DynamoDB table

---

**12. Private EC2 ต้องออก Internet เพื่อดาวน์โหลด update แต่ไม่ต้องการ public IP ควรใช้ pattern ใด?**

A. Private EC2 → EFS → Internet  
B. Private EC2 → CloudTrail → Internet  
C. Private EC2 → VPC Peering → Internet  
D. Private EC2 → NAT Gateway → Internet Gateway

---

**13. ข้อใดถูกต้องเกี่ยวกับ Security Group?**

A. Stateless และรองรับ Deny rule  
B. Stateful และเน้น Allow rules  
C. ใช้แทน Route Table  
D. ทำงานระดับ subnet เท่านั้น

---

**14. ข้อใดถูกต้องเกี่ยวกับ Network ACL?**

A. รองรับ Allow อย่างเดียว  
B. Stateless และทำงานระดับ subnet  
C. ใช้สำหรับ DNS routing  
D. Stateful และทำงานระดับ ENI

---

**15. เหตุใดควรวาง CIDR plan ให้หลีกเลี่ยง address overlap ตั้งแต่ต้น?**

A. เพราะ overlap ทำให้ EBS หยุดทำงาน  
B. เพราะจะปิด CloudWatch  
C. เพราะ AWS ห้ามสร้าง subnet ทุกชนิด  
D. เพราะจะช่วยให้เชื่อม VPC/hybrid network ภายหลังง่ายขึ้น

---

### Module 4

**16. AMI ใช้ทำอะไรในการเปิด EC2 instance?**

A. เป็น database cache  
B. เป็น load balancer  
C. เป็น image/template สำหรับสร้าง instance  
D. เป็น Route 53 policy

---

**17. User Data เหมาะกับ use case ใด?**

A. ดูว่าใครเรียก AWS API  
B. ทำ DNS resolution  
C. Bootstrap/configuration ตอน launch instance  
D. ทำ S3 replication

---

**18. Instance Metadata ใช้เพื่ออะไร?**

A. เป็นแทน EBS snapshot  
B. ให้ instance อ่านข้อมูลเกี่ยวกับตัวเอง เช่น identity/config/network/IAM-related metadata  
C. เป็น CloudFormation template  
D. เก็บ object version

---

**19. ข้อใดเปรียบเทียบ EBS กับ Instance Store ได้ถูกต้อง?**

A. Instance Store แยก lifecycle จาก EC2 ได้ดีกว่า EBS  
B. EBS ใช้ได้เฉพาะ cache  
C. ทั้งคู่เป็น object storage  
D. EBS เป็น persistent block storage ส่วน Instance Store เป็น ephemeral local storage

---

**20. Workload ที่ยอมรับ interruption ได้และต้องการลด cost มาก ควรพิจารณา EC2 purchasing option ใด?**

A. Dedicated Host เท่านั้น  
B. Spot Instances  
C. Local Zone  
D. On-Demand เท่านั้น

---

### Module 5

**21. Amazon S3 เป็น storage ประเภทใด?**

A. Block storage  
B. In-memory cache  
C. Object storage  
D. Relational database

---

**22. S3 Versioning ช่วยเรื่องใดโดยตรง?**

A. เปลี่ยน Route Table  
B. สร้าง EC2 instance  
C. เก็บหลาย version ของ object  
D. ทำ IAM federation

---

**23. S3 Lifecycle policy เหมาะกับงานใด?**

A. สร้าง VPC Peering  
B. เพิ่ม EC2 CPU  
C. Transition/delete object ตามอายุหรือ policy  
D. แปลง database schema

---

**24. ต้องการ shared NFS file system สำหรับ Linux workloads ควรเลือกบริการใด?**

A. EBS  
B. EFS  
C. DAX  
D. S3 Glacier เท่านั้น

---

**25. ต้องย้ายข้อมูลออนไลน์ปริมาณมากระหว่าง on-premises กับ AWS ผ่าน network ที่มีอยู่ ควรพิจารณาบริการใด?**

A. AWS DataSync  
B. Route 53  
C. AWS WAF  
D. Amazon SNS

---

### Module 6

**26. เป้าหมายหลักของ RDS Multi-AZ คืออะไร?**

A. Object storage  
B. Read scaling  
C. CDN caching  
D. High Availability และ automatic failover

---

**27. เป้าหมายหลักของ RDS Read Replica คืออะไร?**

A. Read scaling  
B. Backup tape emulation  
C. IAM delegation  
D. Network firewall

---

**28. Database แบบ key-value/document ที่ต้องการ scale สูงควรพิจารณาบริการใด?**

A. EFS  
B. CloudFormation  
C. DynamoDB  
D. Route 53

---

**29. บริการ cache ที่ออกแบบมาสำหรับ DynamoDB โดยเฉพาะคืออะไร?**

A. Direct Connect  
B. DAX  
C. Storage Gateway  
D. CloudFront

---

**30. ข้อใดจับคู่เครื่องมือ migration ได้ถูกต้อง?**

A. DMS = cache, SCT = load balancer  
B. DMS = DNS, SCT = CDN  
C. DMS = firewall, SCT = IAM  
D. DMS = migrate/replicate data, SCT = ช่วย convert schema/code

---

### Module 7

**31. ต้องการดู CPU metrics, application logs และสร้าง alarm ควรใช้บริการใด?**

A. CloudWatch  
B. CloudTrail  
C. Route 53  
D. IAM

---

**32. ต้องการตรวจสอบว่าใครเรียก AWS API อะไรและเมื่อไหร่ ควรดูบริการใด?**

A. EFS  
B. CloudTrail  
C. SQS  
D. CloudFront

---

**33. ต้องการตรวจ network flow ว่า traffic ถูก accept หรือ reject ควรใช้สิ่งใด?**

A. CloudFormation  
B. VPC Flow Logs  
C. DAX  
D. ECR

---

**34. Load balancer ประเภทใดเหมาะกับ Layer 7 HTTP/HTTPS routing?**

A. ALB  
B. NAT Gateway  
C. NLB  
D. GWLB

---

**35. Traffic เปลี่ยนแปลงคาดเดายากและต้องการ scale ตาม metric เช่น CPU utilization ควรใช้ scaling แบบใด?**

A. Cross-Region replication  
B. Manual only  
C. Fixed capacity ตลอดเวลา  
D. Dynamic scaling

---

### Module 8

**36. ใน CloudFormation คำว่า Stack หมายถึงอะไร?**

A. Container registry  
B. ชนิดของ VPC  
C. ชุด resources ที่ CloudFormation manage เป็น unit  
D. DNS record

---

**37. Change Set ใช้เพื่ออะไร?**

A. Preview การเปลี่ยนแปลงก่อน apply กับ stack  
B. ทำ S3 versioning  
C. เปลี่ยน IAM password  
D. Scale DynamoDB

---

**38. Cross-stack reference มีประโยชน์อะไร?**

A. ทำ database cache  
B. แชร์ outputs/values ระหว่าง CloudFormation stacks  
C. เชื่อม VPC แบบ transitive  
D. สร้าง SNS topic

---

**39. AWS CDK ช่วยให้ทำอะไร?**

A. เป็น relational database  
B. เป็น load balancer  
C. Define infrastructure ด้วย programming language แล้ว synthesize ไปสู่ CloudFormation model  
D. ทำ DNS query

---

**40. บริการใดใช้สำหรับ centralized operations/management ของ resources ที่รองรับ?**

A. Amazon S3  
B. AWS Shield  
C. Route 53  
D. AWS Systems Manager

---

### Module 9

**41. ข้อใดเป็นลักษณะของ microservices ตามคอร์ส?**

A. ต้อง deploy พร้อมกันทั้งหมด  
B. Loosely coupled และ autonomous/independent  
C. ต้องใช้ VM เดียวเสมอ  
D. ห้ามใช้ API

---

**42. Amazon ECR มีหน้าที่อะไร?**

A. DNS service  
B. Container image registry  
C. Network firewall  
D. Kubernetes control plane

---

**43. ใน Amazon ECS กลุ่ม logical grouping ของ capacity/resources สำหรับรัน tasks/services เรียกว่าอะไร?**

A. Cluster  
B. Hosted Zone  
C. Bucket  
D. Stack

---

**44. องค์กรต้องการใช้ Kubernetes API/ecosystem บน AWS ควรพิจารณาบริการใด?**

A. EKS  
B. SQS  
C. ECR เท่านั้น  
D. ECS เท่านั้น

---

**45. ต้องการรัน containers โดยไม่ต้องจัดการ container hosts เอง ควรพิจารณาอะไร?**

A. AWS Fargate  
B. Route 53  
C. CloudTrail  
D. Dedicated Host

---

### Module 10

**46. VPC Endpoint มีประโยชน์หลักอะไร?**

A. ใช้สร้าง IAM user  
B. ให้ workload ใน VPC เข้าถึง supported AWS services แบบ private โดยลด dependency ต่อ Internet/NAT สำหรับ traffic ที่รองรับ  
C. ใช้เป็น object storage  
D. ใช้แทนทุก VPN

---

**47. ข้อใดถูกต้องเกี่ยวกับ VPC Peering?**

A. CIDR overlap ได้เสมอ  
B. เป็น hub-and-spoke โดยอัตโนมัติ  
C. ไม่ต้องแก้ route table  
D. เป็น one-to-one และไม่ transitive

---

**48. Site-to-Site VPN ใน hybrid networking มีลักษณะใด?**

A. เป็น container registry  
B. เป็น object replication  
C. ใช้ encrypted tunnels ผ่าน Internet-based connectivity  
D. เป็น managed file system

---

**49. Direct Connect เหมาะกับ requirement แบบใดมากกว่า?**

A. Dedicated/private connectivity และ predictable capacity/connectivity มากขึ้น  
B. HTTP path routing  
C. IAM federation  
D. S3 object versioning

---

**50. เมื่อองค์กรมี VPC จำนวนมากและ full-mesh peering เริ่มซับซ้อน ควรพิจารณาอะไร?**

A. Transit Gateway  
B. DAX  
C. EBS Snapshot  
D. CloudTrail

---

### Module 11

**51. บริการใดเหมาะกับการเป็น front door/API layer สำหรับ serverless architecture?**

A. Direct Connect  
B. IAM Group  
C. API Gateway  
D. EFS

---

**52. ข้อใดอธิบาย Amazon SQS ได้ถูกต้อง?**

A. DNS service  
B. Container registry  
C. Queue สำหรับ decouple components แบบ asynchronous  
D. File system

---

**53. ถ้าต้องการรักษาลำดับ message และคุณสมบัติแบบ FIFO ควรใช้ SQS แบบใด?**

A. Kinesis Firehose เท่านั้น  
B. SNS Topic  
C. Standard Queue เท่านั้น  
D. FIFO Queue

---

**54. ต้องการ publish message หนึ่งครั้งแล้ว fan-out ไปหลาย subscribers/queues ควรใช้บริการใด?**

A. Route 53  
B. IAM  
C. EBS  
D. Amazon SNS

---

**55. ต้องการประมวลผล streaming data ต่อเนื่องแบบ stream ควรพิจารณาบริการใดจากบทนี้?**

A. Security Group  
B. CloudFormation  
C. Amazon Kinesis  
D. EFS

---

### Module 12

**56. บริการใดเป็น DNS service หลักของ AWS ในบท Edge Services?**

A. DAX  
B. CloudWatch  
C. Route 53  
D. SQS

---

**57. Private Hosted Zone ใช้กับกรณีใด?**

A. DNS resolution ภายใน VPCs ที่ associate  
B. Public CDN caching  
C. IAM policy evaluation  
D. Object versioning

---

**58. CloudFront มีบทบาทหลักอะไร?**

A. Relational database  
B. VPC firewall  
C. CDN/edge caching เพื่อลด latency และส่ง content ใกล้ผู้ใช้  
D. Container scheduler

---

**59. AWS Shield เกี่ยวข้องกับการป้องกันอะไร?**

A. Database schema conversion  
B. File synchronization  
C. EC2 bootstrap  
D. DDoS

---

**60. AWS WAF ใช้ทำอะไร?**

A. เป็น container image registry  
B. กรอง/ควบคุม web requests ตาม rules ที่ระดับ application/web  
C. เป็น DNS resolver อย่างเดียว  
D. เป็น block storage

---

### Module 13

**61. RPO ตอบคำถามใด?**

A. ใช้ instance type ไหน  
B. ต้องกู้ระบบกลับมาเร็วแค่ไหน  
C. ยอมเสียข้อมูลย้อนหลังได้มากแค่ไหน  
D. ใช้ Region ไหน

---

**62. RTO ตอบคำถามใด?**

A. ต้องกู้ระบบกลับมาใช้งานได้ภายในเวลานานแค่ไหน  
B. ยอมเสียข้อมูลได้กี่ object  
C. ใช้ CIDR เท่าไร  
D. ใช้ IAM Role อะไร

---

**63. บริการใดช่วย centralize และ automate backup สำหรับ services ที่รองรับ?**

A. AWS Backup  
B. Amazon ECR  
C. Amazon SNS  
D. AWS WAF

---

**64. ใน DR strategies แบบใดโดยทั่วไปมี environment ที่พร้อมกว่าการ restore ใหม่ทั้งหมด แต่ยังไม่เต็มรูปแบบเท่า active/active?**

A. Warm Standby  
B. Security Group  
C. Backup & Restore  
D. ไม่มีระบบสำรองเลย

---

**65. ถ้าต้องการ recovery เร็วที่สุดในบรรดา DR patterns ที่เรียน และยอมรับ cost/complexity สูงขึ้น ควรนึกถึงแบบใด?**

A. S3 Lifecycle  
B. Backup & Restore เท่านั้น  
C. Pilot Light เท่านั้น  
D. Multi-site Active/Active

---

## Answer Sheet

```text
01. ___  02. ___  03. ___  04. ___  05. ___  06. ___  07. ___  08. ___  09. ___  10. ___
11. ___  12. ___  13. ___  14. ___  15. ___  16. ___  17. ___  18. ___  19. ___  20. ___
21. ___  22. ___  23. ___  24. ___  25. ___  26. ___  27. ___  28. ___  29. ___  30. ___
31. ___  32. ___  33. ___  34. ___  35. ___  36. ___  37. ___  38. ___  39. ___  40. ___
41. ___  42. ___  43. ___  44. ___  45. ___  46. ___  47. ___  48. ___  49. ___  50. ___
51. ___  52. ___  53. ___  54. ___  55. ___  56. ___  57. ___  58. ___  59. ___  60. ___
61. ___  62. ___  63. ___  64. ___  65. ___
```

เมื่อทำครบแล้วค่อยเปิด **[Mock Exam Answer Key](./MOCK-EXAM-65-ANSWER-KEY.md)**