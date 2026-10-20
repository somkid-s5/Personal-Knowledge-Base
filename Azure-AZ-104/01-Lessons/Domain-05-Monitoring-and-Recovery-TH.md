# 🩺 AZ-104 Domain 5 — Monitoring & Recovery

> 📘 บทหลักจากสมุดโน้ต AZ-104 ของฉัน — จัดตาม 5 Domain ของขอบเขตสอบที่บันทึกเมื่อ 7 ตุลาคม 2026

[🗺️ แผนเรียน](../AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md) · [🎨 Visual Guide](../VISUAL-MEMORY-GUIDE-TH.md) · [🧪 Visual Labs](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/labs.html)

**เป้าหมาย:** เข้าใจวิธีเลือกและดูแลบริการ Azure รวมถึงการตรวจสอบปัญหาใน Domain นี้

## Domain 5 — Monitor and maintain Azure resources — 10–15%

### 5.1 Monitor resources in Azure

#### Interpret metrics in Azure Monitor

Metrics are numeric time-series signals. Check namespace, aggregation, dimension, time range, and resource scope before drawing conclusions.

#### Configure log settings in Azure Monitor

Diagnostic settings route platform logs/metrics to destinations such as Log Analytics, Storage, or Event Hubs. “No logs” often means the diagnostic path was never enabled.

#### Query and analyze logs

Use KQL in Log Analytics. Start by identifying the correct table/time range, then filter, project, summarize, and correlate.

#### Set up alert rules, action groups, and alert processing rules

- alert rule = detection condition,
- action group = notification/action target,
- alert processing rule = suppression/routing behavior.

#### Configure and interpret Azure Monitor Insights

Insights provide curated monitoring for resources such as VMs, storage, and networks. Use them as a starting view, then drill into underlying metrics/logs for diagnosis.

#### Use Azure Network Watcher and Connection Monitor

Use Network Watcher tooling for topology/connectivity/routing/security diagnostics. Connection Monitor continuously tests connectivity between endpoints.

### 5.2 Implement backup and recovery

#### Create a Recovery Services vault

Recovery Services vault supports workloads such as Azure VM backup and Site Recovery scenarios.

#### Create an Azure Backup vault

Backup vault supports newer Azure Backup workload types. Know which vault type supports the target workload before configuring protection.

#### Create and configure a backup policy

A backup policy defines schedule, retention, and protection behavior. Match it to RPO/retention requirements.

#### Perform backup and restore using Azure Backup

Validate restore workflows—not just successful backup jobs. Know restore granularity and recovery destination options for the workload.

#### Configure Azure Site Recovery

ASR replicates supported workloads for disaster recovery. Configure source/target, replication policy, network mapping, and recovery plan as required.

#### Perform failover to a secondary region

Understand test failover vs planned/unplanned failover, validation, commit, and reprotect/failback workflow.

#### Configure and interpret backup reports and alerts

Use monitoring/reporting to find protection failures, unhealthy items, missed jobs, and policy drift. A green vault summary should not replace workload-level verification.

---

## 🧪 Labs ที่เกี่ยวข้อง

1. [Azure Monitor & Alerts](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/monitor-lab.html)
2. [Backup vs Site Recovery](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/recovery-lab.html)

> Labs เป็นแบบฝึก Interactive ไม่ได้ยืนยันว่าได้ Deploy Azure Resources จริง; Progress ของ Lab ยังแยกจากความคืบหน้าบทหลัก

**ไปต่อ:** [← Networking](./Domain-04-Networking-TH.md) · [🏁 Labs & Practice Map](../AZ-104-LABS-AND-PRACTICE-TH.md)
