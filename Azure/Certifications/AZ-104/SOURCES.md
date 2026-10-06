# AZ-104 Sources & Freshness Policy

[Back to AZ-104 Hub](./README.md) · [QA Matrix](./QA-MATRIX.md) · [Current Scope Deep Dive](./CURRENT-SCOPE-DEEP-DIVE.md) · [Source Manifest](./SOURCE-MANIFEST.md)

> **Last verified:** 2026-10-06  
> **Current skills-measured version:** April 17, 2026

## 1. Certification source of truth

Use the English Microsoft Learn study guide as the primary certification-scope source because Microsoft updates English first and localized versions can lag.

- AZ-104 Study Guide: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104
- Azure Administrator Associate certification page: https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/

The current study guide states that:

- the skills measured are **as of April 17, 2026**,
- skill bullets illustrate how Microsoft assesses the skill and related topics may also appear,
- most questions cover generally available features, while commonly used Preview features may also appear.

Therefore the repository's `82/82` status means complete coverage of the published skill bullets on the verification date — not every possible related Azure topic.

## 2. Imported source package

The interactive study system was imported from:

- repository: `somkid-s5/az-104-master-cram-book`
- pinned source commit: `ad6c2913af351b2b30feb29f5594999891b4d994`

See:

- [SOURCE-MANIFEST.md](./SOURCE-MANIFEST.md)
- [SOURCE-COVERAGE.md](./SOURCE-COVERAGE.md)

The imported source provides:

- Learn/Cram/Blueprint content,
- visual diagrams,
- 10 interactive labs,
- flashcards,
- original scenario questions,
- browser progress/UI behavior,
- regression tests for important current-scope topics.

The repository adds a portable Markdown certification layer so objective coverage does not depend only on compressed JavaScript payloads or browser rendering.

## 3. Current Microsoft documentation families

Use these documentation families when a technical claim needs current verification.

### Identity and governance

- Microsoft Entra ID: https://learn.microsoft.com/en-us/entra/identity/
- Azure RBAC: https://learn.microsoft.com/en-us/azure/role-based-access-control/
- Azure Policy: https://learn.microsoft.com/en-us/azure/governance/policy/
- Resource locks: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources
- Management groups: https://learn.microsoft.com/en-us/azure/governance/management-groups/
- Cost Management: https://learn.microsoft.com/en-us/azure/cost-management-billing/
- Azure Advisor: https://learn.microsoft.com/en-us/azure/advisor/

### Storage

- Azure Storage: https://learn.microsoft.com/en-us/azure/storage/
- Storage security guide: https://learn.microsoft.com/en-us/azure/storage/blobs/security-recommendations
- SAS: https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview
- Azure Files identity-based authentication: https://learn.microsoft.com/en-us/azure/storage/files/storage-files-active-directory-overview
- Blob object replication: https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-overview
- Storage redundancy: https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy
- AzCopy: https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10
- Storage Explorer: https://learn.microsoft.com/en-us/azure/vs-azure-tools-storage-manage-with-storage-explorer

### Compute

- ARM templates: https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/
- Bicep: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/
- Virtual Machines: https://learn.microsoft.com/en-us/azure/virtual-machines/
- Encryption at Host: https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption-overview#encryption-at-host---end-to-end-encryption-for-your-vm-data
- VM Scale Sets: https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/
- Azure Container Registry: https://learn.microsoft.com/en-us/azure/container-registry/
- Azure Container Instances: https://learn.microsoft.com/en-us/azure/container-instances/
- Azure Container Apps: https://learn.microsoft.com/en-us/azure/container-apps/
- App Service: https://learn.microsoft.com/en-us/azure/app-service/

### Networking

- Azure Virtual Network: https://learn.microsoft.com/en-us/azure/virtual-network/
- Network security groups: https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- Azure Bastion: https://learn.microsoft.com/en-us/azure/bastion/
- Private Link / Private Endpoint: https://learn.microsoft.com/en-us/azure/private-link/
- Virtual Network service endpoints: https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview
- Azure DNS: https://learn.microsoft.com/en-us/azure/dns/
- Azure Load Balancer: https://learn.microsoft.com/en-us/azure/load-balancer/

### Monitoring and recovery

- Azure Monitor: https://learn.microsoft.com/en-us/azure/azure-monitor/
- Azure Monitor alerts: https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview
- Alert processing rules: https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules
- Network Watcher / Connection Monitor: https://learn.microsoft.com/en-us/azure/network-watcher/connection-monitor-overview
- Azure Backup: https://learn.microsoft.com/en-us/azure/backup/
- Recovery Services vault overview: https://learn.microsoft.com/en-us/azure/backup/backup-azure-recovery-services-vault-overview
- Azure Backup support matrix: https://learn.microsoft.com/en-us/azure/backup/backup-support-matrix
- Azure Site Recovery: https://learn.microsoft.com/en-us/azure/site-recovery/

## 4. Vault terminology rule

The current AZ-104 guide explicitly includes **both**:

- Create a Recovery Services vault
- Create an Azure Backup vault

Do not teach one as universally replacing the other. Azure Backup uses the appropriate vault type according to the datasource/workload support matrix. Recovery Services vaults remain current for workloads such as Azure VMs, Azure Files and supported in-VM/on-premises workloads; Backup vaults serve supported newer datasource types.

## 5. Source priority

When sources disagree:

1. current English AZ-104 Microsoft Learn study guide — certification scope,
2. current Microsoft Learn product documentation — technical behavior,
3. pinned imported source package — source-fidelity evidence,
4. repository current-scope deep dive — teaching layer,
5. localized study-guide pages — useful, but check English first when versions differ.

## 6. Revalidation triggers

Re-run AZ-104 objective QA when:

1. Microsoft changes the `Skills measured as of` date,
2. any published skill bullet changes,
3. a major referenced Azure service is renamed/deprecated/replaced,
4. Microsoft changes a high-impact operational model such as vault support or identity behavior,
5. a serious exam-prep cycle starts and the verification is stale.

## 7. Volatile facts

Always recheck current documentation for:

- pricing,
- service limits/quotas,
- Region availability,
- supported VM sizes,
- storage/account feature support,
- preview/GA status,
- portal navigation,
- exact backup datasource support,
- resource-move support,
- TLS/certificate constraints.

The durable part of the repository should be the mental model and decision process; volatile product details remain tied to Microsoft Learn.