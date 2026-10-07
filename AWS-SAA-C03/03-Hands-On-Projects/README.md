# ☁️ Cloud Engineer Lab: จาก Sysadmin สู่ผู้เชี่ยวชาญด้าน Cloud (34 Hands-on Projects) 🇹🇭

> **AWS-SAA-C03 layer 03/03 — Hands-On Projects:** implementation, troubleshooting, cost and cleanup practice for the unified AWS learning system.

Welcome to the **Cloud Engineer Lab**, a self-paced project track for building practical Cloud / Platform / DevOps skills. This package contains **Project 00 (environment setup) + 34 hands-on projects (01–34)** built around realistic AWS-centered engineering scenarios.

> **Package status:** **Verified Project Workbook Structure & Safety Baseline** — Project 00 + Projects 01–34 pass the shared workbook/audit contract as of 2026-10-07  
> **Canonical workbook standard:** [PROJECT-STANDARD.md](./PROJECT-STANDARD.md)  
> **Learning order:** [LEARNING_PATH.md](./LEARNING_PATH.md)  
> **Quality evidence:** [PROJECT-QA-MATRIX.md](./PROJECT-QA-MATRIX.md)

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
> - ทุก Project มี **Troubleshooting**; หลาย Project โดยเฉพาะระดับกลาง–สูงเพิ่ม Failure Testing, Incident/RCA หรือ Chaos exercise เมื่อเหมาะและปลอดภัย
> - อธิบายแนวคิดยากๆ ด้วยการเปรียบเทียบ (Analogy) และการทำ **Root Cause Analysis (RCA)**

## 💎 What Makes This Repo Special (ความต่างของ Repo นี้)
- **Operational / Incident Thinking**: ทุก Project ต้องสอนการตรวจสอบและ Troubleshooting ส่วน Failure Injection / Incident / RCA จะใช้ใน Project ที่เหมาะสม (เช่น [The Health Check Loop of Death](labs/advanced/lab-production-architecture.md#incident-report))
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
Project track นี้ **ไม่ใช่ certification curriculum ที่รับรอง objective coverage ของข้อสอบแต่ละใบ** แต่ช่วยฝึกทักษะ hands-on ที่เกี่ยวข้องกับหลายเส้นทาง เช่น:

- AWS architecture / operations / DevOps
- Kubernetes administration and platform engineering
- Terraform / Infrastructure as Code
- Security, FinOps and observability

สำหรับ coverage ของ certification ให้ใช้ package certification ที่มี objective QA โดยตรง เช่น [SAA-C03](../01-Certification-Core/).

---

## ⚙️ สิ่งที่ต้องเตรียมก่อนเริ่ม (Prerequisites)

> [!IMPORTANT]
> ติดตั้งเครื่องมือเหล่านี้ให้ครบก่อนเริ่มทำโปรเจกต์ใดๆ

### บัญชีและสิทธิ์
- **AWS Account** สำหรับ lab โดยแนะนำให้แยกจาก production
- สำหรับ human access ให้ใช้ **temporary credentials** เป็นค่าเริ่มต้น เช่น IAM Identity Center/federation หรือ AWS CLI local sign-in ที่รองรับ
- หลีกเลี่ยง Root User สำหรับงานประจำ และอย่าใช้ long-lived `AdministratorAccess` access key เป็น baseline
- เริ่มจาก [Project 00](./project-00-preparation-setup/) เพื่อจัด AWS CLI profile และตรวจ identity ด้วย STS

### เครื่องมือพื้นฐาน (ทุก Project)
| เครื่องมือ | เวอร์ชันแนะนำ | ดาวน์โหลด |
|:---|:---:|:---|
| AWS CLI | Current AWS CLI v2 | [aws.amazon.com/cli](https://aws.amazon.com/cli/) |
| Terraform | Current stable compatible with the project code | [terraform.io](https://www.terraform.io/downloads) |
| Docker Desktop / Engine | Current supported release | [docker.com](https://www.docker.com/products/docker-desktop) |
| kubectl | Compatible with the Kubernetes/EKS version used by the project | [kubernetes.io](https://kubernetes.io/docs/tasks/tools/) |
| Helm | Current supported release | [helm.sh](https://helm.sh/docs/intro/install/) |
| Python | Current supported Python 3 release compatible with project dependencies | [python.org](https://www.python.org/downloads/) |

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
> **ค่าใช้จ่าย AWS:** Project ทุกระดับอาจสร้างค่าใช้จ่าย ขึ้นกับ service, Region, traffic และสถานะ Free Tier/credits ของบัญชี  
> ทุก workbook ต้องมี Cost/Cleanup guidance และควรลบ resource ด้วย **resource owner ที่ถูกต้อง** เช่น Terraform, CloudFormation, Helm/Kubernetes หรือ service-specific workflow — ไม่ใช่ใช้ `terraform destroy` กับทุกกรณี

---

## 📝 วิธีการเริ่มเรียน (How to Use)

แต่ละ Project ถูก consolidate เป็น **workbook เดียวใน `README.md`** แล้ว ไม่ต้องหาไฟล์ `SCENARIO.md`, `GUIDE.md` หรือ `CHECKLIST.md` แบบโครงเก่า

1. อ่าน **Scenario + Constraints + Architecture** ก่อนลงมือ
2. ทำ **Tasks** พร้อมอธิบายเหตุผลของแต่ละการตัดสินใจ
3. ตรวจผลใน **Verification**
4. ฝึก **Troubleshooting** และ Failure/Incident exercise เมื่อ Project นั้นมี
5. ทำ **Exercises** โดยพยายามตอบเองก่อนดูแนวทาง
6. อ่าน **Cost & Cleanup Safety** และเก็บ resource ให้เรียบร้อย
7. ไป Project ถัดไปตาม [LEARNING_PATH.md](./LEARNING_PATH.md)

มาตรฐาน workbook ทั้งหมดอยู่ใน [PROJECT-STANDARD.md](./PROJECT-STANDARD.md).

---

**พัฒนาโดย:** [somkid](https://github.com/somkid-s5)
*ยินดีให้คำปรึกษาและแลกเปลี่ยนความรู้ด้าน Cloud Engineering ครับ!*
