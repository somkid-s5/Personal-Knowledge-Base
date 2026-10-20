# 🖥️ AZ-104 Domain 3 — Compute

> 📘 บทหลักจากสมุดโน้ต AZ-104 ของฉัน — จัดตาม 5 Domain ของขอบเขตสอบที่บันทึกเมื่อ 7 ตุลาคม 2026

[🗺️ แผนเรียน](../AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md) · [🎨 Visual Guide](../VISUAL-MEMORY-GUIDE-TH.md) · [🧪 Visual Labs](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/labs.html)

**เป้าหมาย:** เข้าใจวิธีเลือกและดูแลบริการ Azure รวมถึงการตรวจสอบปัญหาใน Domain นี้

## 3. Deploy and manage Azure compute resources — 20–25%

### 3.1 Automate deployment with ARM templates or Bicep

#### Interpret an ARM template or Bicep file

Identify parameters, variables, resources, dependencies, outputs, scopes, and module/resource references. Understand the desired-state model before changing syntax.

#### Modify an existing ARM template

Preserve resource IDs, dependencies, API versions, parameter semantics, and deployment scope. Use validation/what-if before applying risky changes.

#### Modify an existing Bicep file

Bicep is a higher-level language that compiles to ARM JSON. Prefer readable symbolic references and modules instead of hand-building resource IDs when possible.

#### Deploy resources by using ARM or Bicep

Deploy at the correct scope and inspect deployment operations on failure. Common causes include RBAC, policy denial, quota, invalid API properties, naming, and dependencies.

#### Export a deployment as ARM or convert ARM to Bicep

Export/decompile is a starting point, not automatically production-quality IaC. Review generated output, remove noise, parameterize intentionally, and test idempotent redeployment.

### 3.2 Create and configure virtual machines

#### Create a virtual machine

Plan image, size, region/zone, disk type, network placement, identity, security, and management access together.

#### Configure encryption at host

Encryption at host protects supported VM temporary/cache data at the host layer. Verify VM size/region support and understand how it complements disk encryption.

#### Move a VM to another resource group, subscription, or region

Resource-group/subscription moves and region moves have different mechanics and constraints. Check dependent resources and service support before moving.

#### Manage virtual machine sizes

Resize based on CPU, memory, storage throughput/IOPS, accelerated networking, GPU, and quota—not CPU count alone.

#### Manage virtual machine disks

Know OS vs data disks, managed disk types, snapshots, attachment limits, caching, and performance characteristics.

#### Deploy VMs to availability zones and availability sets

- **Availability Zones** protect against datacenter/zone failure within a region.
- **Availability Sets** distribute VMs across fault/update domains where supported.

Choose based on region support and failure model.

#### Deploy and configure Virtual Machine Scale Sets

VMSS provides a fleet model for homogeneous VMs with scaling and orchestration. Pair with health probes/load balancing and understand upgrade/scaling behavior.

### 3.3 Provision and manage containers in the Azure portal

#### Create and manage Azure Container Registry

ACR stores container images/artifacts. Secure registry access with identity/RBAC and avoid embedding admin credentials in applications.

#### Provision a container using Azure Container Instances

ACI is useful for simple, isolated container workloads without managing an orchestrator.

#### Provision a container using Azure Container Apps

Container Apps provides managed application/container features such as revisions, ingress, and event/HTTP-driven scaling.

#### Manage sizing and scaling for containers

Understand fixed resource allocation vs dynamic scaling. Container Apps supports richer autoscaling patterns; ACI is simpler and less orchestration-heavy.

### 3.4 Create and configure Azure App Service

#### Provision an App Service plan

The plan determines region, compute tier, capacity, and many scaling capabilities for apps hosted on it.

#### Configure scaling for an App Service plan

Distinguish **scale up** (bigger SKU) from **scale out** (more instances/autoscale).

#### Create an App Service

Configure runtime, OS, deployment source, application settings, identity, networking, and observability.

#### Configure certificates and TLS

Use managed/imported certificates as appropriate, bind certificates to custom domains, and enforce suitable TLS settings.

#### Map an existing custom DNS name

Create the required DNS record, verify domain ownership, then bind hostname/certificate in App Service.

#### Configure backup for App Service

Configure backup destination, schedule, retention, and app/database coverage; verify restores rather than trusting job status alone.

#### Configure networking settings

Know inbound access, access restrictions/private endpoint scenarios, and outbound VNet integration. Inbound and outbound networking are not the same feature.

#### Configure deployment slots

Use slots for staged releases and controlled swaps. Treat slot settings carefully so environment-specific values do not move unintentionally.

---

## 🧪 Labs ที่เกี่ยวข้อง

1. [VM Availability & Scale](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/compute-lab.html)
2. [App Service](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/appservice-lab.html)
3. [Containers](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/containers-lab.html)

> Labs เป็นแบบฝึก Interactive ไม่ได้ยืนยันว่าได้ Deploy Azure Resources จริง; Progress ของ Lab ยังแยกจากความคืบหน้าบทหลัก

**ไปต่อ:** [← Storage](./Domain-02-Storage-TH.md) · [Networking →](./Domain-04-Networking-TH.md)
