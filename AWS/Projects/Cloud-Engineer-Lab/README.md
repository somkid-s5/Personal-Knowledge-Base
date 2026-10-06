# ☁️ Cloud Engineer Lab: จาก Sysadmin สู่ผู้เชี่ยวชาญด้าน Cloud (34 Hands-on Projects) 🇹🇭

Welcome to the **Cloud Engineer Lab**, a comprehensive, self-paced learning path designed to transform you into a professional Cloud Engineer. This repository contains 34 hands-on projects, each representing real-world enterprise scenarios on AWS.

---

## 🚀 เกี่ยวกับโปรเจกต์นี้ (About This Project)
โปรเจกต์นี้ถูกออกแบบมาเพื่อให้เป็น **Portfolio สำหรับ Cloud Engineer** โดยเฉพาะ โดยเน้นการปฏิบัติจริง (Hands-on) ตั้งแต่พื้นฐานจนถึงระดับ Architect เนื้อหาครอบคลุมทั้งการออกแบบสถาปัตยกรรม (Architecture), การจัดการต้นทุน (FinOps), ความปลอดภัย (SecOps), และการทำงานแบบอัตโนมัติ (Automation)

## 🚀 Skills Demonstrated (ทักษะที่แสดงออกในโปรเจกต์นี้)
- **AWS Architecture Design**: ออกแบบระบบตามหลัก AWS Well-Architected Framework
- **High Availability & Fault Tolerance**: การทำ Multi-AZ, Load Balancing และ Disaster Recovery
- **Infrastructure as Code (IaC)**: การจัดการทรัพยากรด้วย Terraform, Terragrunt และ Crossplane
- **Container Orchestration**: การจัดการ Workload บน Kubernetes (EKS) และ Docker
- **CI/CD & GitOps**: การทำ Automation Pipeline ด้วย GitHub Actions และ ArgoCD
- **Security Best Practices**: การทำ Zero-Trust, Secrets Management และ Compliance Monitoring
- **Cost Awareness (FinOps)**: การวิเคราะห์และปรับปรุงต้นทุน (Cost Optimization)
- **Observability**: การทำ Centralized Logging, Monitoring และ Distributed Tracing

> [!TIP]
> **Highlight ของ Lab นี้:**
> - เน้นการใช้เครื่องมือมาตรฐานโลก (Terraform, EKS, Istio, ArgoCD, Vault)
> - ทุก Lab มีส่วน **"ทดลองให้พัง" (Failure Testing)** และ **"Incident Stories"** (บทเรียนจากความล่มสลายจริง)
> - อธิบายแนวคิดยากๆ ด้วยการเปรียบเทียบ (Analogy) และการทำ **Root Cause Analysis (RCA)**

## 💎 What Makes This Repo Special (ความต่างของ Repo นี้)
- **Incident-First Approach**: เราไม่ได้สอนแค่การสร้างระบบที่สมบูรณ์แบบ แต่เราสอนให้คุณรับมือกับระบบที่ "กำลังจะพัง" ผ่านเรื่องราว Incident จริง (เช่น [The Health Check Loop of Death](labs/advanced/lab-production-architecture.md#incident-report))
- **Real-World Architecture Thinking**: ทุกโปรเจกต์ไม่ได้สอนแค่การกดสร้าง Resource แต่สอนให้ "คิด" แบบ Cloud Engineer ว่าทำไมต้องเลือกใช้ Service นี้ และมันตอบโจทย์ธุรกิจอย่างไร
- **Troubleshooting Mindset**: เน้นการทำ **Root Cause Analysis (RCA)** เมื่อระบบพัง เพื่อฝึกทักษะการแก้ปัญหาหน้าสิ่วหน้าขวานในงานจริง
- **Production-Aware Explanations**: เนื้อหาครอบคลุมถึงพฤติกรรมของระบบในระดับ Production เช่น การจัดการ Traffic Spike, การทำ Failover และการบริหารจัดการต้นทุน (FinOps)
- **High-End Portfolio**: ออกแบบมาเพื่อให้เป็นผลงานที่ใช้โชว์ในการสัมภาษณ์งานระดับ Mid-to-Senior Cloud Engineer ได้ทันที

---

## 🗺️ แผนผังการเรียนรู้ (Learning Path)
ระบบการเรียนรู้แบ่งออกเป็น 6 ระดับ เพื่อให้คุณค่อยๆ พัฒนาทักษะอย่างเป็นขั้นเป็นตอน:

1.  **Level 1: Beginner (00-05)** - รากฐานสำคัญ (Linux, Networking, Basic AWS)
2.  **Level 2: Junior (06-11)** - โครงสร้างพื้นฐาน, CI/CD และ Infrastructure as Code (IaC)
3.  **Level 3: Mid-Level (12-18)** - Kubernetes, Service Mesh และการจัดการข้อมูลระดับสูง
4.  **Level 4: Senior (19-25)** - ความเสถียรระดับโลก (Multi-region), ความปลอดภัย และ Platform Engineering
5.  **Level 5: Staff/Principal (26-30)** - กลยุทธ์องค์กร, การย้ายระบบขนาดใหญ่ และ FinOps ระดับสูง
6.  **Level 6: Architect/Capstone (31-34)** - การเชื่อมต่อ Hybrid, Observability ขั้นสูง และ Well-Architected Review

---

## 📚 รายชื่อโปรเจกต์ (Project Index)

| # | ชื่อโปรเจกต์ (Project Name) | ระดับ (Level) | ทักษะสำคัญ (Key Skills) |
| :--- | :--- | :--- | :--- |
| 00 | [Preparation & Local Setup (เตรียมเครื่องมือ)](project-00-preparation-setup/) | 🟢 Beginner | Git, VS Code, AWS CLI, Terraform |
| 01 | [S3 + CloudFront (Web Static Hosting)](project-01-s3-cloudfront/) | 🟢 Beginner | S3, CloudFront, Route53, GHA |
| 02 | [Linux Hardening (ความปลอดภัยเซิร์ฟเวอร์)](project-02-linux-hardening/) | 🟢 Beginner | Ansible, SSH, UFW, Linux |
| 03 | [Flask Docker (จัดการคอนเทนเนอร์)](project-03-flask-docker/) | 🟢 Beginner | Docker, Compose, Multi-stage |
| 04 | [Bash Toolkit (เครื่องมืออัตโนมัติ)](project-04-bash-toolkit/) | 🟢 Beginner | Bash, AWS CLI, Automation |
| 05 | [Monitoring Stack (ระบบเฝ้าระวัง)](project-05-monitoring/) | 🟢 Beginner | Prometheus, Grafana, Alertmanager |
| 06 | [3-Tier Architecture (โครงสร้าง 3 ลำดับชั้น)](project-06-3tier-architecture/) | 🟡 Junior | VPC, ALB, ASG, RDS MySQL |
| 07 | [CI/CD Pipeline (ระบบส่งมอบอัตโนมัติ)](project-07-cicd-pipeline/) | 🟡 Junior | GitHub Actions, CodePipeline, ECR |
| 08 | [Serverless App (เว็บแอปไร้เซิร์ฟเวอร์)](project-08-serverless-app/) | 🟡 Junior | API Gateway, Lambda, DynamoDB |
| 09 | [Container Security (ความปลอดภัยคอนเทนเนอร์)](project-09-container-security/) | 🟡 Junior | Trivy, Cosign, Image Signing |
| 10 | [Cost Optimizer (ลดค่าใช้จ่ายอัตโนมัติ)](project-10-cost-optimizer/) | 🟡 Junior | Lambda, Python, Boto3, FinOps |
| 11 | [Multi-env Terraform (IaC ระดับโปร)](project-11-multi-env-terraform/) | 🟡 Junior | Terraform, Terragrunt, Workspaces |
| 12 | [EKS Production (Kubernetes มืออาชีพ)](project-12-eks-prod/) | 🔵 Mid-Level | EKS, Karpenter, ArgoCD, Helm |
| 13 | [Istio Mesh (ควบคุมการสื่อสารภายใน)](project-13-istio-mesh/) | 🔵 Mid-Level | Service Mesh, mTLS, Canary |
| 14 | [Centralized Logging (รวบรวม Log ศูนย์กลาง)](project-14-logging/) | 🔵 Mid-Level | PLG Stack, Loki, Fluent Bit |
| 15 | [Disaster Recovery (กู้ระบบยามวิกฤต)](project-15-dr-system/) | 🔵 Mid-Level | Backup, Route53 Failover, RTO/RPO |
| 16 | [Advanced Network (เครือข่ายองค์กร)](project-16-advanced-network/) | 🔵 Mid-Level | Transit Gateway, VPC Endpoints |
| 17 | [Secrets Management (จัดการความลับ)](project-17-secrets-mgmt/) | 🔵 Mid-Level | HashiCorp Vault, External Secrets |
| 18 | [FinOps Dashboard (วิเคราะห์ค่าใช้จ่าย)](project-18-finops-dashboard/) | 🔵 Mid-Level | Athena, CUR, Grafana, SQL |
| 19 | [Backstage IDP (พอร์ทัลนักพัฒนา)](project-19-backstage-idp/) | 🟣 Senior | Platform Engineering, Backstage |
| 20 | [Multi-Region (ระบบพร้อมใช้ระดับโลก)](project-20-multi-region/) | 🟣 Senior | Aurora Global, Geolocation Routing |
| 21 | [Security Compliance (ตรวจสอบมาตรฐาน)](project-21-security-compliance/) | 🟣 Senior | AWS Config, Security Hub, SOAR |
| 22 | [Chaos Engineering (ซ้อมระบบพัง)](project-22-chaos-engineering/) | 🟣 Senior | AWS FIS, LitmusChaos, Resilience |
| 23 | [ML Infrastructure (MLOps)](project-23-ml-infra/) | 🟣 Senior | SageMaker, MLflow, GPU Scheduling |
| 24 | [Event-Driven (ระบบตอบสนองตามเหตุการณ์)](project-24-event-driven/) | 🟣 Senior | EventBridge, SQS, Kinesis |
| 25 | [Zero-Trust Network (ความปลอดภัยไร้พรหมแดน)](project-25-zero-trust/) | 🟣 Senior | Verified Access, OIDC, Identity |
| 26 | [Migration Framework (ย้ายระบบสู่ Cloud)](project-26-migration-framework/) | 🔴 Staff/Prin | MGN, DMS, 6Rs Strategy |
| 27 | [GitOps Enterprise (จัดการ Cluster จำนวนมาก)](project-27-gitops-enterprise/) | 🔴 Staff/Prin | Crossplane, OPA Gatekeeper |
| 28 | [Observability Platform (เจาะลึกระบบ)](project-28-observability-platform/) | 🔴 Staff/Prin | OpenTelemetry, Thanos, Tempo |
| 29 | [FinOps Maturity (วัฒนธรรมประหยัดเงิน)](project-29-finops-maturity/) | 🔴 Staff/Prin | Spot, Savings Plans, Unit Economics |
| 30 | [Cloud Native SecOps (ความปลอดภัยอัจฉริยะ)](project-30-cloud-native-secops/) | 🔴 Staff/Prin | GuardDuty, OpenSearch, SIEM |
| 31 | [Hybrid Networking (เชื่อมต่อ On-prem กับ AWS)](project-31-hybrid-networking/) | 💎 Architect | Site-to-Site VPN, BGP, Transit Gateway |
| 32 | [Cost Optimization (วิเคราะห์ RI/Savings Plans)](project-32-cost-optimization-sp/) | 💎 Architect | Compute Optimizer, Commitments |
| 33 | [Advanced Observability (Distributed Tracing)](project-33-advanced-observability/) | 💎 Architect | OpenSearch, TraceQL, Service Map |
| 34 | [Full Architecture (Well-Architected Review)](project-34-full-architecture/) | 💎 Architect | End-to-End Design, 6 Pillars |

---

## 🛠️ เครื่องมือที่ใช้ (Toolstack)
- **Cloud:** Amazon Web Services (AWS)
- **IaC:** Terraform, Terragrunt, Crossplane
- **Kubernetes:** EKS, Helm, ArgoCD, Istio, Karpenter
- **Monitoring:** Prometheus, Grafana, OpenTelemetry, Loki, Tempo, OpenSearch
- **Security:** Vault, OPA, AWS Config, GuardDuty
- **Languages:** Python, Bash, SQL, Go (optional)

---

## 🏆 เตรียมความพร้อมสำหรับใบเซอร์ (Certification Prep)
เนื้อหาใน Lab นี้ถูกออกแบบมาให้ครอบคลุมความรู้สำหรับ:
- AWS Certified Solutions Architect (Associate & Professional)
- AWS Certified DevOps Engineer (Professional)
- Certified Kubernetes Administrator (CKA)
- HashiCorp Certified: Terraform Associate

---

## ⚙️ สิ่งที่ต้องเตรียมก่อนเริ่ม (Prerequisites)

> [!IMPORTANT]
> ติดตั้งเครื่องมือเหล่านี้ให้ครบก่อนเริ่มทำโปรเจกต์ใดๆ

### บัญชีและสิทธิ์
- **AWS Account** พร้อม IAM User ที่มีสิทธิ์ `AdministratorAccess` (สำหรับ Lab)
- ตั้งค่า **AWS CLI**: `aws configure` พร้อม Access Key และ Region (`ap-southeast-1`)

### เครื่องมือพื้นฐาน (ทุก Project)
| เครื่องมือ | เวอร์ชันแนะนำ | ดาวน์โหลด |
|:---|:---:|:---|
| AWS CLI | v2.x | [aws.amazon.com/cli](https://aws.amazon.com/cli/) |
| Terraform | >= 1.7 | [terraform.io](https://www.terraform.io/downloads) |
| Docker Desktop | >= 4.x | [docker.com](https://www.docker.com/products/docker-desktop) |
| kubectl | >= 1.29 | [kubernetes.io](https://kubernetes.io/docs/tasks/tools/) |
| Helm | >= 3.14 | [helm.sh](https://helm.sh/docs/intro/install/) |
| Python | >= 3.11 | [python.org](https://www.python.org/downloads/) |

### เครื่องมือเสริม (สำหรับ Project ขั้นสูง)
| เครื่องมือ | ใช้ใน Project | ดาวน์โหลด |
|:---|:---:|:---|
| Terragrunt | 11 | [github.com/gruntwork-io](https://github.com/gruntwork-io/terragrunt/releases) |
| eksctl | 12 | [eksctl.io](https://eksctl.io/installation/) |
| Vault CLI | 17 | [developer.hashicorp.com/vault](https://developer.hashicorp.com/vault/install) |

### ตรวจสอบหลังติดตั้ง
```bash
aws --version && terraform --version && docker --version && kubectl version --client
```

> [!CAUTION]
> **ค่าใช้จ่าย AWS:** Project ระดับ Mid-Senior (12+) ใช้ทรัพยากรที่มีค่าใช้จ่าย  
> **ลบทรัพยากรทุกครั้งหลังทดสอบ** ด้วย `terraform destroy` เพื่อหลีกเลี่ยงค่าใช้จ่ายที่ไม่จำเป็น

---

## 📝 วิธีการเริ่มเรียน (How to Use)
1. อ่าน **SCENARIO.md** ในแต่ละโปรเจกต์เพื่อเข้าใจปัญหา
2. ทำตามขั้นตอนใน **GUIDE.md** เพื่อสร้างระบบ
3. ทำการทดสอบในส่วน **"ทดลองให้พัง"** เพื่อดูผลลัพธ์
4. ตรวจสอบความถูกต้องผ่าน **CHECKLIST.md**

---

**พัฒนาโดย:** [somkid](https://github.com/somkid-s5)
*ยินดีให้คำปรึกษาและแลกเปลี่ยนความรู้ด้าน Cloud Engineering ครับ!*
