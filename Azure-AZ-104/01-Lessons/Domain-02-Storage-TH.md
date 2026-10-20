# 🗂️ AZ-104 Domain 2 — Storage

> 📘 บทหลักจากสมุดโน้ต AZ-104 ของฉัน — จัดตาม 5 Domain ของขอบเขตสอบที่บันทึกเมื่อ 7 ตุลาคม 2026

[🗺️ แผนเรียน](../AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md) · [🎨 Visual Guide](../VISUAL-MEMORY-GUIDE-TH.md) · [🧪 Visual Labs](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/labs.html)

**เป้าหมาย:** เข้าใจวิธีเลือกและดูแลบริการ Azure รวมถึงการตรวจสอบปัญหาใน Domain นี้

## 2. Implement and manage storage — 15–20%

### 2.1 Configure access to storage

#### Configure Azure Storage firewalls and virtual networks

Storage network controls restrict where traffic may originate. Distinguish:
- public endpoint with firewall rules,
- service endpoint path,
- private endpoint with private IP.

Troubleshooting: validate DNS, endpoint path, subnet configuration, firewall rules, and identity separately.

#### Create and use shared access signature (SAS) tokens

SAS delegates scoped, time-limited access without sharing the account key. Restrict:
- permissions,
- resource,
- start/expiry,
- protocol,
- IP where appropriate.

Prefer the narrowest SAS possible.

#### Configure stored access policies

Stored access policies provide centralized control over certain service SAS settings and can help revoke/change delegated access without replacing every token.

#### Manage access keys

Storage account keys are highly privileged shared secrets. Protect and rotate them; prefer Entra ID + RBAC when supported.

#### Configure identity-based access for Azure Files

Azure Files can use identity-based authorization depending on protocol and identity setup. Separate:
- share/data-plane authorization,
- NTFS/file permissions where applicable,
- network reachability.

### 2.2 Configure and manage storage accounts

#### Create and configure storage accounts

Choose account type, region, redundancy, network access, security settings, and data services based on workload needs.

#### Configure Azure Storage redundancy

Know the resilience intent:
- LRS: copies in one datacenter scope,
- ZRS: copies across availability zones,
- GRS/RA-GRS: secondary region replication,
- GZRS/RA-GZRS: zone resilience plus regional replication.

Choose for failure domain and recovery requirements, not by acronym memorization.

#### Configure object replication

Object replication asynchronously copies block blobs between storage accounts/containers. Verify prerequisites such as versioning and supported account/configuration requirements.

#### Configure storage account encryption

Azure Storage encrypts data at rest. Understand Microsoft-managed keys vs customer-managed keys and the operational impact of key availability/permissions.

#### Manage data by using Azure Storage Explorer and AzCopy

Use **Storage Explorer** for GUI administration and **AzCopy** for high-performance scripted data transfer. Always confirm authentication context and destination path before large copy operations.

### 2.3 Configure Azure Files and Azure Blob Storage

#### Create and configure a file share in Azure Files

Choose SMB/NFS support, quota, identity model, networking, and redundancy based on application requirements.

#### Create and configure a container in Azure Blob Storage

A container groups blobs inside a storage account. Configure access level carefully; private access should be the default for most enterprise workloads.

#### Configure storage tiers

Use Hot/Cool/Cold/Archive based on access frequency, latency, retention, and retrieval cost. Tier choice is a cost/availability decision, not only a storage-price decision.

#### Configure soft delete for blobs and containers

Soft delete provides a recovery window after deletion. Configure retention according to business recovery requirements.

#### Configure snapshots and soft delete for Azure Files

Snapshots capture point-in-time share state; soft delete protects deleted shares. They solve different recovery problems and can be used together.

#### Configure blob lifecycle management

Lifecycle rules automatically transition or delete blobs based on conditions such as age or access state. Validate rule scope and prefixes before enabling destructive actions.

#### Configure blob versioning

Versioning retains previous blob versions after overwrite/update. Combine with lifecycle policies to control long-term cost.

---

## 🧪 Labs ที่เกี่ยวข้อง

1. [Storage Redundancy](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/storage-lab.html)
2. [Storage Access & SAS](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/storage-access-lab.html)

> Labs เป็นแบบฝึก Interactive ไม่ได้ยืนยันว่าได้ Deploy Azure Resources จริง; Progress ของ Lab ยังแยกจากความคืบหน้าบทหลัก

**ไปต่อ:** [← Identity & Governance](./Domain-01-Identity-and-Governance-TH.md) · [Compute →](./Domain-03-Compute-TH.md)
