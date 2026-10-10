# Project 17: Secrets Management Workbook

## 1. Scenario (สถานการณ์จำลอง)

### บริบท (Context)
เวลาสี่ทุ่มของคืนวันศุกร์ที่ ThaiCrypto สตาร์ทอัปด้านบล็อกเชน Security Researcher เพิ่งส่งข้อความส่วนตัว (DM) หา CTO ของคุณ

CTO คุณบุญ [22:05 น.]:
> @devops-team มีเรื่องด่วนมาก มีคนเผลอ Push ไฟล์ Kubernetes Manifest ขึ้น Public Repository และในนั้นมีรหัสผ่าน RDS สำหรับ Production อยู่ด้วย
> ถึงมันจะถูก ซ่อน อยู่ใน Kubernetes Secret แต่ก็โดนถอดรหัสออกมาได้ง่าย เพราะมันเป็นแค่ Base64 เราต้องหยุดใช้ Native Kubernetes Secrets สำหรับข้อมูลที่สำคัญทั้งหมดทันที
> ผมอยากได้ระบบที่ข้อมูลความลับถูกเข้ารหัสในระดับ Storage (Encrypted at Rest) มีการหมุนเวียนรหัสผ่านอัตโนมัติ และ Developer ไม่ต้องเห็นรหัสผ่าน Production เลย

### แนวคิดการจัดการ Secrets (Concepts)
เปรียบเทียบการจัดการ Secrets เหมือน "ธนาคารและตู้เซฟอัจฉริยะ"
- Kubernetes Secrets (Native) - เหมือน "กระเป๋าสตางค์" ที่พกพาสะดวกแต่ถ้าหายคือจบ และใครๆ ก็เปิดดูได้ง่าย
- HashiCorp Vault - เหมือน "ธนาคารที่มีตู้นิรภัย" ที่ต้องมีการยืนยันตัวตนหลายชั้น มีการบันทึกว่าใครมาเปิด และข้อมูลถูกเข้ารหัสไว้ตลอดเวลา
- External Secrets Operator (ESO) - เหมือน "พนักงานส่งของที่เชื่อถือได้" คอยไปเบิกเงินจากธนาคารมาใส่ในกระเป๋าสตางค์ให้แอปพลิเคชันใช้งาน โดยที่เราไม่ต้องเดินไปธนาคารเอง

### ทักษะที่จะได้เรียนรู้ (Skills Acquired)
- การติดตั้งและกำหนดค่า HashiCorp Vault บน Kubernetes
- การใช้ Raft Storage Backend เพื่อทำ High Availability (HA) สำหรับ Vault
- การใช้งาน External Secrets Operator เพื่อซิงค์ความลับจาก Vault ไปยัง Kubernetes
- การปรับใช้ Secret Rotation แบบอัตโนมัติ
- การรักษาความปลอดภัยให้ Vault ด้วย IAM Roles for Service Accounts (IRSA) และ KMS Auto-Unseal

### ข้อจำกัด (Constraints)
- Security: ข้อมูลความลับต้องถูกเข้ารหัสในขณะจัดเก็บ (Encrypted at Rest) โดยใช้ Hardware-backed Key (KMS)
- Automation: ข้อมูลความลับใน Kubernetes ต้องซิงค์กับศูนย์กลาง (Vault) โดยอัตโนมัติตลอดเวลา
- Audit: ทุกครั้งที่มีการเข้าถึงข้อมูลความลับจะต้องมีการบันทึกประวัติ (Audit Log)

### เกณฑ์การยอมรับงาน (Definition of Done)
1. HashiCorp Vault ทำงานในโหมด High Availability (HA) และเปิดใช้งาน Auto-Unseal เรียบร้อยแล้ว
2. External Secrets Operator (ESO) ซิงค์ข้อมูลความลับทดสอบ (Test Secret) จาก Vault ไปยัง Kubernetes Secret ได้สำเร็จ
3. Application Pod สามารถดึงข้อมูลความลับมาใช้ในรูปแบบของ Environment Variable ได้
4. มีการสร้าง Audit Log เมื่อมีการเข้าถึงข้อมูลความลับ

### ประสิทธิภาพและการขยายระบบ (Performance and Scaling)
- **Estimated Load**: รองรับการเบิกจ่ายความลับ (Secret Reads) ได้มากกว่า 1,000+ ครั้งต่อวินาที (ขึ้นอยู่กับทรัพยากรของ Vault)
- **Bottlenecks**: คอขวดมักอยู่ที่ Storage I/O ของ Raft Backend และความถี่ในการทำ Sync ของ ESO หากมี Secrets จำนวนมหาศาล
- **Scaling Approach**: ใช้ Raft Integrated Storage เพื่อทำ High Availability (HA) แบบ 3-5 Nodes และขยายตัวในแนวราบ (Horizontal Scaling) เพื่อกระจายโหลดงานอ่าน

### ข้อมูลเชิงลึกจากประสบการณ์จริง (Production Experience)
- **The Secret Zero Problem**: การเริ่มต้นปลดล็อคความลับตัวแรก (Secret Zero) คือจุดที่ยากที่สุด การใช้ AWS KMS Auto-Unseal คือทางออกที่ปลอดภัยและเป็นมาตรฐานใน Production เพราะเราไม่ต้องให้คนถือกุญแจ (Unseal Keys) ตลอดเวลา
- **Dynamic Secrets**: หนึ่งในฟีเจอร์ที่เจ๋งที่สุดของ Vault คือการสร้างรหัสผ่าน Database ให้แอปพลิเคชันแบบชั่วคราว (เช่น มีอายุ 1 ชั่วโมง) แล้วลบทิ้งอัตโนมัติ ซึ่งจะช่วยลดโอกาสที่รหัสผ่านจะรั่วไหลได้อย่างมหาศาล
- **ClusterSecretStore vs SecretStore**: ในงานจริง เรามักใช้ `ClusterSecretStore` สำหรับของส่วนกลาง (เช่น Docker Config) และใช้ `SecretStore` แยกตาม Namespace เพื่อความปลอดภัยแบบ Multi-tenancy

### การใช้งานจริง (Use Cases)
- **Banking / Fintech**: การจัดการกุญแจเข้ารหัส (Encryption Keys) และรหัสผ่านฐานข้อมูลลูกค้าที่ต้องเข้มงวดสูงสุด
- **Microservices Enterprise**: ศูนย์กลางการเก็บ API Keys ของบริการต่างๆ กว่าร้อยตัวเพื่อให้จัดการได้จากจุดเดียว
- **Auto-rotation Compliance**: ระบบที่ต้องเปลี่ยนรหัสผ่านทุก 90 วันตามมาตรฐานความปลอดภัยโดยไม่ต้องให้ Engineer เข้ามาแก้โค้ด
- ใช้ในการเก็บรหัสผ่านฐานข้อมูล (Database Credentials) ที่ต้องเปลี่ยนทุก 30 วันอัตโนมัติ
- ใช้จัดการ API Keys ของบริการภายนอกที่ต้องใช้งานร่วมกันหลายทีมอย่างปลอดภัย

### การทดลองทำลายระบบ (Chaos Engineering)
- **ลองเข้าถึง Secrets โดยไม่มี Permission**: พยายามใช้ User ที่ไม่มีสิทธิ์ใน Vault มาเบิกข้อมูล
  - *ผลลัพธ์*: Vault ต้องปฏิเสธและบันทึก Log การพยายามบุกรุก (Audit Log) เพื่อให้เราฝึกตรวจสอบร่องรอยการโจมตี
- **ลองปิด KMS Unseal**: จำลองว่าระบบ KMS ของ AWS เข้าถึงไม่ได้
  - *ผลลัพธ์*: Vault จะเข้าสู่สถานะ Sealed (ล็อคตัวเอง) และไม่มีใครสามารถอ่านข้อมูลได้ นี่คือการพิสูจน์เรื่องความปลอดภัยระดับสูงสุดในสภาวะวิกฤต

### ค่าใช้จ่าย (Costs)
- ฟรีสำหรับ Vault Open Source Edition
- ค่า AWS KMS สำหรับการทำ Auto-Unseal (ราคาประหยัดมาก)

### สรุป (Summary)
- ความลับต้องไม่ถูกเก็บไว้ใน Git เด็ดขาด (Secret Zero Problem)
- Vault ช่วยให้เราทำ Dynamic Secrets (สร้างรหัสผ่านชั่วคราวแล้วทำลายทิ้ง) ได้
- ESO ช่วยให้ชีวิตของ Developer ง่ายขึ้นโดยไม่ต้องเปลี่ยนวิธีเขียนแอปพลิเคชันมากนัก

## 2. Topology Diagram (แผนผังระบบ)

![Topology Diagram](architecture.png)

```mermaid
graph TD
    subgraph "Kubernetes Cluster"
        App[App Pod]
        ESO[External Secrets Operator]
        Vault[Vault Pods\nHA with Raft]
    end
    
    subgraph "External Security"
        KMS[AWS KMS\nAuto-Unseal]
        IAM[AWS IAM\nIRSA]
    end
    
    Vault -->|Decrypts Keys| KMS
    Vault -->|Logs| CloudWatch[CloudWatch Logs]
    
    ESO -->|Auth| Vault
    ESO -->|Fetches| VS[Vault Secret]
    ESO -->|Creates/Updates| KS[K8s Secret]
    
    App -->|Reads| KS
```

### การไหลของข้อมูลเชิงสถาปัตยกรรม (Architectural Flows)
- **แบบดั้งเดิม (Legacy Flow)**:
```text
[Admin] → [HashiCorp Vault (KMS Unsealed)] → [External Secrets Operator] → [K8s Secrets] → [App Pods]
```

- **แบบปัจจุบัน (Current Flow)**:
```text
[AWS KMS] → (Auto-unseal) → [HashiCorp Vault (Raft HA)]
                                    ↑ (Auth)
[K8s App Pods] ← [Native K8s Secret] ← [External Secrets Operator]
                                    ↓ (Poll)
                             [Vault Secret Engine]
```

### ส่วนประกอบทางสถาปัตยกรรม (Architectural Components)
- **HashiCorp Vault**: ศูนย์กลางการจัดการสำหรับความลับ (Secrets) ทั้งหมด ทำการเข้ารหัสข้อมูลทั้งหมดในขณะจัดเก็บ (Encryption at Rest)
- **KMS Auto-Unseal**: ช่วยลดภาระในการสั่ง Unseal ด้วยตนเอง ทำให้สามารถกู้คืนระบบ Vault Pods ได้โดยอัตโนมัติ
- **Raft Consensus**: ช่วยทำระบบพร้อมใช้งานสูง (High Availability) ในตัว โดยไม่จำเป็นต้องพึ่งพาฐานข้อมูลภายนอกอย่าง Consul
- **External Secrets Operator**: วิธีการผสานการทำงานกับ Vault แบบ Kubernetes-native ช่วยให้แอปพลิเคชันทั่วไปสามารถใช้ Native Kubernetes Secrets ได้ตามปกติ โดยยังคงเก็บแหล่งข้อมูลหลัก (Source of Truth) ไว้ใน Vault อย่างปลอดภัย

## 3. Prerequisites & Estimated Time (สิ่งที่ต้องเตรียมและเวลาที่ใช้)

### สิ่งที่ต้องเตรียมก่อนเริ่ม (Prerequisites)
- EKS Cluster (จาก Project 12)
- Helm 3
- KMS Key สำหรับการทำ Vault Auto-Unseal

### ระยะเวลาที่คาดว่าจะใช้ (Estimated Time)
- 12-15 ชั่วโมง

## 4. Tasks (ขั้นตอนการปฏิบัติ)

### Task 1: การติดตั้ง Vault บน Kubernetes (Installing Vault on Kubernetes)
เราจะเริ่มติดตั้ง HashiCorp Vault ในโหมด High Availability (HA) โดยใช้ Raft Storage Backend
ใช้ Helm ในการติดตั้งและระบุการตั้งค่าที่จำเป็น:
```bash
# ติดตั้งผ่าน Helm

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 👤 Identity → 🔑 Role → 🛡️ Scope → ✅ Verify → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำอธิบายและคำสั่งจริง
helm repo add hashicorp https://helm.releases.hashicorp.com

helm install vault hashicorp/vault \
  --namespace vault --create-namespace \
  --set "server.ha.enabled=true" \
  --set "server.ha.replicas=3" \
  --set "server.ha.raft.enabled=true"
```

ทำการ Initialize และปลดล็อค (Unseal) ระบบสำหรับการใช้งานครั้งแรก:
```bash
# Initialize Vault (ทำครั้งแรกเท่านั้น)
kubectl exec -n vault vault-0 -- vault operator init \
  -key-shares=5 -key-threshold=3 \
  -format=json > vault-init.json

# Unseal Vault (ต้องทำทุกครั้งที่ Restart)
kubectl exec -n vault vault-0 -- vault operator unseal $(cat vault-init.json | jq -r '.unseal_keys_b64[0]')
```

หรือสามารถเลือกใช้สคริปต์ที่เตรียมไว้ให้สำหรับการเริ่มต้นระบบ:
- รันไฟล์สคริปต์ `src/scripts/vault-init.sh` เพื่อจัดการขั้นตอนนี้โดยอัตโนมัติ

---

### Task 2: การสร้าง Dynamic Database Credentials (Creating Dynamic Database Credentials)
ในขั้นตอนนี้ เราจะทำการเปิดใช้งาน Database Secrets Engine และระบุรูปแบบของสิทธิ์การเข้าใช้งานฐานข้อมูลแบบชั่วคราว:
```bash
# Enable Database Secrets Engine
vault secrets enable database

# Configure PostgreSQL connection
vault write database/config/thaidemo \
  plugin_name=postgresql-database-plugin \
  allowed_roles="app-role" \
  connection_url="postgresql://{{username}}:{{password}}@postgres:5432/thaidemo" \
  username="vault-admin" \
  password="vault-admin-password"

# Create Role ที่สร้าง User ชั่วคราว
vault write database/roles/app-role \
  db_name=thaidemo \
  creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; GRANT SELECT ON ALL TABLES IN SCHEMA public TO \"{{name}}\";" \
  default_ttl="1h" \
  max_ttl="24h"
```

ตรวจสอบความถูกต้องโดยลองดึงรหัสผ่านชุดใหม่:
```bash
# ทดสอบ: ขอ Credentials ใหม่
vault read database/creds/app-role
# ได้ Username และ Password ที่หมดอายุใน 1 ชั่วโมง!
```

---

### Task 3: การตั้งค่า External Secrets Operator ใน Kubernetes (Setting up External Secrets Operator)
การติดตั้งและตั้งค่าระบบของ ESO เพื่อดึงรหัสผ่านที่ซิงค์จาก Vault ไปจัดเก็บเป็น Kubernetes Secret อัตโนมัติ:
```bash
# ติดตั้งผ่าน Helm
helm install external-secrets external-secrets/external-secrets \
  --namespace external-secrets --create-namespace
```

สร้าง `ClusterSecretStore` เพื่อระบุตำแหน่งของระบบ Vault:
```yaml
# ClusterSecretStore — บอกให้ ESO คุยกับ Vault ไหน
apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.vault.svc.cluster.local:8200"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "app"
```

สร้าง `ExternalSecret` เพื่อให้ระบบคอยซิงค์ข้อมูลความลับมาสร้างเป็น Secret ภายในระบบ Kubernetes:
```yaml
# ExternalSecret — สร้าง K8s Secret โดยดึงจาก Vault
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-db-credentials
  namespace: production
spec:
  refreshInterval: "1h"  # ดึง Secret ใหม่ทุกชั่วโมง
  secretStoreRef:
    name: vault-backend
    kind: ClusterSecretStore
  target:
    name: app-db-secret  # ชื่อ K8s Secret ที่จะถูกสร้าง
  data:
    - secretKey: DB_PASSWORD
      remoteRef:
        key: secret/app/database
        property: password
```

---

### Task 4: การล้างข้อมูลและทำความสะอาดทรัพยากร (Resource Cleanup)
เมื่อศึกษาและทำการทดสอบ Lab เสร็จเรียบร้อยแล้ว ให้ถอนการติดตั้งทรัพยากรเพื่อไม่ให้เกิดค่าใช้จ่ายค้างคา:
```bash
# ถอนการติดตั้ง Helm Releases
helm uninstall vault external-secrets

# ลบ KMS Key ใน AWS
```

## 5. Verification (การตรวจสอบผลการทำงาน)

- [ ] สร้าง AWS KMS Key สำหรับการทำ Auto-Unseal เรียบร้อยแล้ว
- [ ] กำหนดค่า Helm Values ของ Vault สำหรับระบบ High Availability (3 Replicas) เรียบร้อยแล้ว
- [ ] เริ่มต้นระบบ Vault (Initialized) และจัดเก็บกุญแจ Unseal (Unseal Keys) อย่างปลอดภัย (ในกรณีที่ไม่ได้ใช้ Auto-Unseal)
- [ ] เปิดใช้งานและตั้งค่า Kubernetes Auth Method ใน Vault เรียบร้อยแล้ว
- [ ] ติดตั้ง External Secrets Operator (ESO) เรียบร้อยแล้ว
- [ ] สร้าง `SecretStore` Resource ที่ชี้ไปยัง Vault เรียบร้อยแล้ว
- [ ] สร้างบทบาท IRSA Role สำหรับ ESO เรียบร้อยแล้ว (หากใช้งาน Vault AWS Auth)
- [ ] สร้างความลับทดสอบใน Vault เรียบร้อยแล้ว (`vault kv put secret/test-secret password=verysecure`)
- [ ] สร้าง `ExternalSecret` Resource ใน Kubernetes เรียบร้อยแล้ว
- [ ] ตรวจสอบแล้วว่า Kubernetes Secret `test-secret` มีอยู่จริงและมีรหัสผ่านที่ถูกต้อง
- [ ] เปิดใช้งาน Vault Audit Logging เรียบร้อยแล้ว
- [ ] นโยบายความปลอดภัย (Vault Policies) ได้รับการตั้งค่าตามหลักสิทธิ์ขั้นต่ำ (Least Privilege - ไม่ใช้ `*` บน Secret Paths)
- [ ] Pods ต่างๆ ใช้งาน ServiceAccounts เฉพาะที่กำหนดไว้สำหรับการยืนยันตัวตน (Authentication)

## 6. Troubleshooting (การแก้ไขปัญหาที่พบบ่อย)

### ปัญหาที่ 1: Vault ค้างอยู่ในสถานะ Sealed (Vault is stuck in Sealed state)
- **อาการ (Symptom):** คำสั่ง `vault status` แสดงสถานะ `Sealed: true`
- **สาเหตุ (Cause):** การทำ Auto-Unseal ด้วย KMS ล้มเหลว (อาจเกิดจากขาดสิทธิ์ IAM Permissions) หรือทำกุญแจสำหรับ Manual Unseal สูญหาย
- **วิธีแก้ไข (Fix):** ตรวจสอบ Logs ของ Vault เพื่อหาข้อความ "AccessDenied" จาก KMS และตรวจสอบให้แน่ใจว่า IAM Role ของ Node หรือ Pod มีสิทธิ์ `kms:Decrypt` และ `kms:DescribeKey`

### ปัญหาที่ 2: ได้รับ Permission Denied จาก Kubernetes Auth (Permission Denied from Kubernetes Auth)
- **อาการ (Symptom):** ESO ไม่สามารถดึงความลับ (Secrets) ได้
- **สาเหตุ (Cause):** ค่า `reviewer_service_account` ใน Vault กำหนดไว้ไม่ถูกต้อง หรือไม่มีสิทธิ์ `system:auth-delegator`
- **วิธีแก้ไข (Fix):** ตรวจสอบว่า ServiceAccount ของ Token Reviewer มี Cluster Role เป็น `system:auth-delegator` และยืนยันความถูกต้องของ Kubernetes Host URL ใน Vault Config

### ปัญหาที่ 3: ได้รับข้อผิดพลาด SecretNotFound จาก ESO (ESO SecretNotFound)
- **อาการ (Symptom):** Kubernetes Secret ว่างเปล่า หรือไม่ถูกสร้างขึ้นมา
- **สาเหตุ (Cause):** Path ที่ระบุใน `ExternalSecret` ไม่ตรงกับ Path ที่มีอยู่ใน Vault
- **วิธีแก้ไข (Fix):** โปรดจำไว้ว่า Vault KV v2 จะใช้ Prefix `/data/` ในการเข้าถึงผ่าน API (ตัวอย่างเช่น `secret/data/myapp` เทียบกับ `secret/myapp`)

### ปัญหาที่ 4: Vault Pods ล่มซ้ำๆ (Vault pods keep crashing - CrashLoopBackOff)
- **อาการ (Symptom):** Pods ไม่สามารถเริ่มต้นการทำงานได้ (Status: CrashLoopBackOff)
- **สาเหตุ (Cause):** พื้นที่เก็บข้อมูลของ Raft Storage Volume เต็ม หรือสิทธิ์ในการเข้าถึงไดเรกทอรี `/vault/data` ไม่ถูกต้อง
- **วิธีแก้ไข (Fix):** ตรวจสอบด้วยคำสั่ง `kubectl describe pod` และตรวจสอบให้แน่ใจว่า StorageClass ของคุณอนุญาตให้ขยายพื้นที่เพิ่มได้ (Volume Expansion)

### ปัญหาที่ 5: Token Expired ในแอปพลิเคชัน (Token expired in application)
- **อาการ (Symptom):** แอปพลิเคชันไม่สามารถเชื่อมต่อกับ Database ได้หลังจากผ่านไป 1 ชั่วโมง
- **สาเหตุ (Cause):** แอปพลิเคชันใช้งาน Dynamic Credential แต่ไม่ได้ถูกเขียนให้รองรับการจัดการ Rotation หรือ Reconnect
- **วิธีแก้ไข (Fix):** ใช้ Vault Agent เพื่อสั่งรีสตาร์ทแอปพลิเคชันโดยอัตโนมัติเมื่อข้อมูลความลับมีการเปลี่ยนแปลง หรือเขียนโค้ดเพิ่มระบบดักจับเพื่อ Retry/Reconnect ใหม่

### ปัญหาที่ 6: แอปพลิเคชันแจ้งว่าหา Environment Variable ไม่เจอ ทั้งที่ใส่ใน ExternalSecret แล้ว (Missing Environment Variable)
- **อาการ (Symptom):** แอปพลิเคชันไม่สามารถดึงค่าสภาพแวดล้อมได้
- **สาเหตุ (Cause):** Policy ใน Vault ไม่อนุญาตให้ ESO อ่าน Path นั้นๆ หรือ Service Account ของ Kubernetes ไม่ได้ถูกผูกกับ Vault Role อย่างถูกต้อง
- **วิธีแก้ไข (Fix):** ตรวจสอบสถานะการเชื่อมต่อด้วยขั้นตอนดังนี้:
  - ตรวจสอบ ESO Status โดยรันคำสั่ง `kubectl get externalsecret` เพื่อดูว่ามีสถานะเป็น `SecretSynced` หรือไม่
  - ตรวจสอบประวัติการยืนยันตัวตนใน Logs ของ ESO เพื่อตรวจว่าเชื่อมกับ Vault ด้วย Role ที่ถูกต้องหรือไม่
  - ตรวจสอบว่า Path ใน Vault ตรงกันกับที่ระบุในไฟล์ YAML ของ `ExternalSecret` หรือไม่
  - อัปเดต `SecretStore` ให้ระบุบทบาท (Role) และ Mount Path ที่ถูกต้อง

## 7. Exercises & Solutions (แบบฝึกหัดและแนวทางการแก้ไข)

### แบบฝึกหัดที่ 1: App-Level Injection (ระดับง่าย)
แทนที่จะใช้ ESO ในการสร้าง Kubernetes Secret ให้เปลี่ยนไปใช้ Vault Agent Injector
- เพิ่ม Annotate ให้กับ Deployment ของคุณด้วย `vault.hashicorp.com/agent-inject: "true"`
- ระบบจะแทรก Sidecar Container ที่ทำการดึงความลับไปเขียนลงในไฟล์ที่ `/vault/secrets/config`
- อัปเดตแอปพลิเคชันของคุณให้อ่านค่าจากไฟล์นี้แทนการอ่านจาก Environment Variables

**แนวทางการแก้ไข (Solution):**
เพิ่มการตั้งค่า Annotations ใน Spec template ของ Deployment ดังนี้:
```yaml
spec:
  template:
    metadata:
      annotations:
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/role: "myapp-role"
        vault.hashicorp.com/agent-inject-secret-config: "secret/data/myapp/config"
        vault.hashicorp.com/agent-inject-template-config: |
          {{- with secret "secret/data/myapp/config" -}}
          export DB_PASSWORD="{{ .Data.data.password }}"
          {{- end -}}
```

---

### แบบฝึกหัดที่ 2: Dynamic DB Credentials (ระดับปานกลาง)
กำหนดค่าระบบ Database Secrets Engine ของ Vault
- เชื่อมต่อ Vault เข้ากับ RDS Instance ของคุณ
- กำหนด Role ที่ทำหน้าที่สร้างผู้ใช้ใหม่พร้อมสิทธิ์ `SELECT`
- ตรวจสอบโดยรันคำสั่ง `vault read database/creds/my-role` แล้วดูว่ามีข้อมูล Username และ Password ชุดใหม่ที่ไม่ซ้ำกันส่งกลับมาทุกครั้งหรือไม่

**แนวทางการแก้ไข (Solution):**
ใช้คำสั่งด้านล่างนี้เพื่อตั้งค่า Database Role บน Vault:
```bash
vault write database/roles/readonly \
    db_name=my-postgresql \
    creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; \
        GRANT SELECT ON ALL TABLES IN SCHEMA public TO \"{{name}}\";" \
    default_ttl="1h" \
    max_ttl="24h"
```

---

### แบบฝึกหัดที่ 3: Cross-Cluster Sync (ระดับยาก)
สมมติว่าคุณมี Production Cluster และ Disaster Recovery (DR) Cluster
- ตั้งค่า ESO ใน DR Cluster ให้เชื่อมต่อกับ Vault Instance ใน Production Cluster
- ตรวจสอบให้แน่ใจว่า ServiceAccount ของ DR Cluster ได้รับอนุญาตใน Kubernetes Auth Config ของ Vault ในฝั่ง Production เรียบร้อยแล้ว
- วิธีนี้จะช่วยสร้าง Source of Truth แหล่งข้อมูลความลับแห่งเดียวสำหรับทุกภูมิภาค (Regions)

**แนวทางการแก้ไข (Solution):**
ใช้ `ClusterSecretStore` เพื่อซิงค์ข้อมูลข้าม Cluster โดยอ้างอิง ServiceAccount และ Path ของ DR Cluster ดังนี้:
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.prod.thaicrypto.co"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes-prod"
          role: "dr-cluster-role"
          serviceAccountRef:
            name: "external-secrets"
```

