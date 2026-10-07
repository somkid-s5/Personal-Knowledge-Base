# Lab 05 — Terraform VPC, Plan, State & Cleanup

[Lab index](./README.md) · [Terraform concepts](../Module-12-Terraform-and-Infrastructure-as-Code.md)

## เป้าหมายและ prerequisites

สร้าง VPC/subnet จาก HCL อ่าน plan ทดลองเปลี่ยน description แล้ว destroy เฉพาะ resources ที่ state นี้จัดการ

ต้องมี Terraform CLI, credentials แบบ ADC ที่ environment รองรับ, project/billing/API ที่พร้อม และ permissions สร้าง/แก้/ลบ VPC/subnet ตัวอย่างไม่สร้าง VM/NAT/LB แต่ยังต้องตรวจ pricing ของทรัพยากรที่ต่อยอด

แล็บนี้ใช้ **local state เพื่อเรียนรู้ใน workspace เดียว** ไม่ใช่รูปแบบ state สำหรับ production/team ห้ามใช้ folder/state เดียวกับ infra ที่มีอยู่จริง

## Task 1 — ตรวจ environment

```bash
export PROJECT_ID="your-lab-project-id"
gcloud config set project "$PROJECT_ID"
gcloud auth list
terraform version
gcloud services enable compute.googleapis.com --project="$PROJECT_ID"
mkdir -p ~/ace-lab-05
cd ~/ace-lab-05
```

บน Cloud Shell ใช้ credentials ของ environment ตามการตั้งค่าที่รองรับ หากทำ local workstation และไม่มี ADC ให้ใช้ `gcloud auth application-default login` ตาม development policy ไม่สร้าง SA key เพื่อแก้ทันที

## Task 2 — เขียน config

```bash
cat > main.tf <<'HCL'
terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
}

variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "us-central1"
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_compute_network" "lab" {
  name                   = "ace-tf-vpc"
  auto_create_subnetworks = false
  description            = "ACE Terraform lab version one"
}

resource "google_compute_subnetwork" "lab" {
  name          = "ace-tf-subnet"
  ip_cidr_range = "10.40.0.0/24"
  region        = var.region
  network       = google_compute_network.lab.id
}

output "network_id" {
  value = google_compute_network.lab.id
}
HCL

export TF_VAR_project_id="$PROJECT_ID"
```

ถ้า lab กำหนด region อื่นตั้ง `TF_VAR_region` ให้ตรง ชื่อ resources ต้องไม่ชนงานอื่น ในตัวอย่างไม่ระบุเลข provider ว่า latest ใช้ version ที่ init เลือกแล้ว lock เพื่อทดลอง ตรวจและ pin constraints ตามนโยบายเมื่อทำงานจริง

## Task 3 — Init, validate และ plan

```bash
terraform init
terraform fmt
terraform validate
terraform plan -out=lab.tfplan
```

Expected: provider ถูกติดตั้ง config valid และ plan มี VPC/subnet ใหม่ **2 resources** ที่ตั้งใจ ไม่มี resource งานอื่นอยู่ในแผน

ถ้า project/API/IAM/quota ผิด validate อาจผ่านแต่ plan/apply fail ได้ เพราะ validation ไม่ได้ทดสอบ cloud ทุกเงื่อนไข

## Task 4 — Apply plan ที่อ่านแล้ว

```bash
terraform apply lab.tfplan
terraform state list
terraform output network_id
gcloud compute networks describe ace-tf-vpc --project="$PROJECT_ID"
```

Expected: state list มี `google_compute_network.lab` และ `google_compute_subnetwork.lab` และ cloud resource จริงตรง config

ไม่เปิด/แชร์ state file เพื่อโชว์ผลโดยไม่ตรวจ sensitive fields เพราะ state และ saved plan อาจมีข้อมูลที่ต้องป้องกัน

## Task 5 — เปลี่ยน description

แก้ `description` ใน `main.tf` เป็น `ACE Terraform lab version two` แล้ว:

```bash
terraform plan -out=update.tfplan
```

Expected: plan เปลี่ยน description ของ network ตาม provider semantics ถ้าแผนแสดง replace/destroy หรือ changes อื่นที่ไม่คาด ให้ตรวจ configuration/provider/result ก่อน apply

```bash
terraform apply update.tfplan
terraform plan
```

Expected: หลัง reconcile แล้วไม่มี changes ที่คาดไม่ถึง ไม่ได้แปลว่าทรัพยากรทั้งหมดของ project ถูกจัดการโดย Terraform เพราะ state นี้มีเพียง resources สองตัว

## Task 6 — เข้าใจ state ownership

`google_compute_network.lab` เป็น address ใน configuration/state ส่วน `ace-tf-vpc` เป็นชื่อใน cloud เปลี่ยนชื่อ HCL block โดยไม่ย้าย state/import ตาม workflow อาจทำให้ Terraform มองเป็น resource คนละตัว

อย่าลบ state แล้ว apply ซ้ำเพื่อทดลอง: อาจเกิด name collision/resource mapping loss ใช้การอ่าน plan/state list เพื่อเรียนรู้ก่อน

## Cleanup

```bash
terraform plan -destroy -out=destroy.tfplan
```

อ่านว่าลบเฉพาะ VPC/subnet ของ lab ไม่มี managed resource อื่น จากนั้น:

```bash
terraform apply destroy.tfplan
terraform state list
gcloud compute networks list --filter='name=ace-tf-vpc' --project="$PROJECT_ID"
```

Expected: state ไม่มี managed resources ที่เหลือ และไม่พบ VPC lab ใน live inventory หาก subnet delete fail เพราะมี resource อื่นใช้งาน ให้ตรวจว่ามีอะไรมา attach ไม่ใช้ `force` หรือไปลบงานอื่นโดยเดา

ไม่จำเป็นต้องปิด Compute API เพราะ project อาจใช้กับแล็บอื่น การเปิด API ไม่ใช่ resource สองตัวใน Terraform state นี้

## อธิบายกลับให้ได้

- `init` กับ `apply` ต่างกันอย่างไร?
- State mapping ไม่ใช่ DB backup เพราะอะไร?
- ทำไม `validate` ผ่านแต่ `apply` denied ได้?
- ถ้ามีสองคนทำงานต้องเปลี่ยน local state workflow อย่างไร?

## เอกสาร

- [Terraform Google Cloud overview](https://docs.cloud.google.com/docs/terraform/terraform-overview)
- [Remote state](https://docs.cloud.google.com/docs/terraform/resource-management/store-state)
- [Plan](https://developer.hashicorp.com/terraform/cli/commands/plan)
