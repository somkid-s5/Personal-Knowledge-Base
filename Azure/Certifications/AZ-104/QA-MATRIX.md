# AZ-104 Objective-Level QA Matrix — 2026-10-06

[Back to AZ-104 Hub](./README.md) · [Current Scope Deep Dive](./CURRENT-SCOPE-DEEP-DIVE.md) · [Source Coverage](./SOURCE-COVERAGE.md) · [Sources](./SOURCES.md)

> **Official source:** Microsoft Learn AZ-104 Study Guide  
> **Skills measured:** April 17, 2026  
> **Repository verification:** 2026-10-06  
> **Scope:** every published skill bullet under the 15 current objective groups.

## 0. What PASS means

A row receives **PASS** only when the repository has enough material to teach the task rather than merely mention its name. Evidence can come from:

- the imported Learn/Cram/Blueprint interactive payload,
- interactive visual labs/enhancement layers,
- the portable [Current Scope Deep Dive](./CURRENT-SCOPE-DEEP-DIVE.md),
- source/coverage metadata that preserves traceability.

Microsoft notes that the bullets illustrate how a skill is assessed and related topics can also appear. Therefore `82/82 PASS` is **published-skill coverage**, not “everything that can possibly appear on AZ-104.”

## Blueprint summary

| Domain | Objective groups | Published skill bullets | QA |
|---|---:|---:|---:|
| Manage Azure identities and governance | 3 | 15 | **15/15 PASS** |
| Implement and manage storage | 3 | 17 | **17/17 PASS** |
| Deploy and manage Azure compute resources | 4 | 24 | **24/24 PASS** |
| Implement and manage virtual networking | 3 | 13 | **13/13 PASS** |
| Monitor and maintain Azure resources | 2 | 13 | **13/13 PASS** |
| **Total** | **15** | **82** | **82/82 PASS** |

---

# Domain 1 — Manage Azure identities and governance (20–25%)

## Manage Microsoft Entra users and groups — 5/5

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Create users and groups | Deep Dive §1.1 — identity/group mental model | Learn/Cram identity domain | **PASS** |
| Manage user and group properties | Deep Dive §1.1 | Learn/Cram identity domain | **PASS** |
| Manage licenses in Microsoft Entra ID | Deep Dive §1.1 — license assignment context | Learn/Cram identity domain | **PASS** |
| Manage external users | Deep Dive §1.1 — B2B/guest lifecycle and scope | identity content | **PASS** |
| Configure self-service password reset (SSPR) | Deep Dive §1.1 — SSPR flow + troubleshooting | explicit SSPR enhancement/regression coverage | **PASS** |

## Manage access to Azure resources — 3/3

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Manage built-in Azure roles | Deep Dive §1.2 — Owner/Contributor/Reader/User Access Administrator | identity/RBAC content | **PASS** |
| Assign roles at different scopes | Deep Dive §1.2 — management group → subscription → RG → resource inheritance | RBAC diagrams/content | **PASS** |
| Interpret access assignments | Deep Dive §1.2 — principal/role/scope/effective-access troubleshooting | identity content | **PASS** |

## Manage Azure subscriptions and governance — 7/7

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Implement and manage Azure Policy | Deep Dive §1.3 — Policy vs RBAC vs Lock | governance content | **PASS** |
| Configure resource locks | Deep Dive §1.3 — CanNotDelete/ReadOnly and inheritance | governance content | **PASS** |
| Apply and manage tags | Deep Dive §1.3 — cost/ownership/lifecycle metadata | governance content | **PASS** |
| Manage resource groups | Deep Dive §1.3 — lifecycle/scope/move considerations | governance content | **PASS** |
| Manage subscriptions | Deep Dive §1.3 — subscription as governance/billing boundary | governance content | **PASS** |
| Manage costs by using alerts, budgets and Azure Advisor recommendations | Deep Dive §1.3 — budget vs alert vs Advisor | governance/cost content | **PASS** |
| Configure management groups | Deep Dive §1.3 — cross-subscription governance hierarchy | governance diagrams/content | **PASS** |

**Domain 1 result: 15/15 published skill bullets PASS.**

---

# Domain 2 — Implement and manage storage (15–20%)

## Configure access to storage — 5/5

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Configure Azure Storage firewalls and virtual networks | Deep Dive §2.1 — network → auth → authorization flow | storage/network lessons | **PASS** |
| Create and use shared access signature (SAS) tokens | Deep Dive §2.1 — user delegation/service/account SAS | Storage Access & SAS lab | **PASS** |
| Configure stored access policies | Deep Dive §2.1 — SAS policy/revocation anchor | Storage Access & SAS lab | **PASS** |
| Manage access keys | Deep Dive §2.1 — shared-secret risk and rotation | storage access content | **PASS** |
| Configure identity-based access for Azure Files | Deep Dive §2.1 — identity + share RBAC + ACL + network | explicit storage-access enhancement/regression coverage | **PASS** |

## Configure and manage storage accounts — 5/5

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Create and configure storage accounts | Deep Dive §2.2 — Region/redundancy/network/protection inputs | storage domain | **PASS** |
| Configure Azure Storage redundancy | Deep Dive §2.2 — LRS/ZRS/GRS/GZRS decision map | Storage Redundancy Lab | **PASS** |
| Configure object replication | Deep Dive §2.2 — storage-account/container replication vs redundancy/backup | current supplement | **PASS** |
| Configure storage encryption | Deep Dive §2.2 — at-rest key-management distinction | storage security content | **PASS** |
| Manage data by using Storage Explorer and AzCopy | Deep Dive §2.2 — GUI vs CLI transfer tooling | storage content | **PASS** |

## Configure Azure Files and Azure Blob Storage — 7/7

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Create and configure a file share | Deep Dive §2.3 — file vs object semantics | storage content | **PASS** |
| Create and configure a container in Blob Storage | Deep Dive §2.3 | storage content | **PASS** |
| Configure storage tiers | Deep Dive §2.3 — access/cost decision | storage content | **PASS** |
| Configure soft delete for blobs and containers | Deep Dive §2.3 — layered data protection | storage content | **PASS** |
| Configure snapshots and soft delete for Azure Files | Deep Dive §2.3 | storage content | **PASS** |
| Configure blob lifecycle management | Deep Dive §2.3 — transition/delete policy thinking | storage content | **PASS** |
| Configure blob versioning | Deep Dive §2.3 — versioning vs soft delete/backup | storage content | **PASS** |

**Domain 2 result: 17/17 published skill bullets PASS.**

---

# Domain 3 — Deploy and manage Azure compute resources (20–25%)

## Automate deployment by using ARM templates or Bicep — 5/5

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Interpret an Azure Resource Manager template or Bicep file | Deep Dive §3.1 — parameters/resources/dependencies/outputs | `diagrams.js` ARM/Bicep pipeline | **PASS** |
| Modify an existing ARM template | Deep Dive §3.1 — understand replacement/dependency/scope impact | compute content | **PASS** |
| Modify an existing Bicep file | Deep Dive §3.1 | compute content | **PASS** |
| Deploy an ARM template or Bicep file | Deep Dive §3.1 — deployment scope and validation | compute content | **PASS** |
| Export a deployment as ARM template or convert ARM template to Bicep | Deep Dive §3.1 — export → decompile/refactor → validate | explicit Bicep visual | **PASS** |

## Create and configure virtual machines — 7/7

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Create a virtual machine | Deep Dive §3.2 — VM design bundle | compute content | **PASS** |
| Configure Azure Disk Encryption or Encryption at Host as applicable to the current guide | Deep Dive §3.2 — encryption-layer distinctions | explicit Encryption at Host regression/content | **PASS** |
| Move a VM to another resource group, subscription or region | Deep Dive §3.2 — three different move/migration models | compute content | **PASS** |
| Manage VM sizes | Deep Dive §3.2 — CPU/memory/IO/network fit | compute content | **PASS** |
| Manage VM disks | Deep Dive §3.2 — OS/data disk and performance/cost | compute content | **PASS** |
| Configure availability zones and availability sets | Deep Dive §3.2 | VM Availability & Scaling Simulator | **PASS** |
| Deploy and configure Virtual Machine Scale Sets | Deep Dive §3.2 — model/autoscale/LB flow | VM Availability & Scaling Simulator | **PASS** |

## Provision and manage containers in the Azure portal — 4/4

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Create and manage Azure Container Registry | Deep Dive §3.3 — ACR registry role | ACR→ACI→ACA workflow | **PASS** |
| Provision a container by using Azure Container Instances | Deep Dive §3.3 — ACI use case | Containers Workflow lab | **PASS** |
| Provision Azure Container Apps | Deep Dive §3.3 — ACA revisions/ingress/scale | `containers-lab.html` + diagrams | **PASS** |
| Manage sizing and scaling for containers, including ACI and Container Apps | Deep Dive §3.3 — resource allocation vs replica scaling | container lab scale-to-zero/traffic | **PASS** |

## Create and configure Azure App Service — 8/8

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Create an App Service plan | Deep Dive §3.4 — compute boundary and plan role | app-service content | **PASS** |
| Configure scaling for an App Service plan | Deep Dive §3.4 — scale up vs scale out | app-service content | **PASS** |
| Create an App Service | Deep Dive §3.4 | app-service content | **PASS** |
| Configure certificates and TLS | Deep Dive §3.4 — DNS/cert/binding flow | app-service content | **PASS** |
| Map an existing custom DNS name | Deep Dive §3.4 — ownership/record/propagation troubleshooting | app-service content | **PASS** |
| Configure backup for an App Service | Deep Dive §3.4 — backup ≠ slot | app-service content | **PASS** |
| Configure networking settings for an App Service | Deep Dive §3.4 — inbound vs outbound networking | app-service content | **PASS** |
| Configure deployment slots | Deep Dive §3.4 — staging/test/swap + sticky settings | app-service content | **PASS** |

**Domain 3 result: 24/24 published skill bullets PASS.**

---

# Domain 4 — Implement and manage virtual networking (15–20%)

## Configure and manage virtual networks — 5/5

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Create and configure VNets and subnets | Deep Dive §4.1 | Networking Flow Lab | **PASS** |
| Create and configure VNet peering | Deep Dive §4.1 — overlap/non-transitive/gateway considerations | networking content | **PASS** |
| Configure public IP addresses | Deep Dive §4.1 — use only when required | networking content | **PASS** |
| Create and configure user-defined routes | Deep Dive §4.1 — effective-route/next-hop flow | Networking Flow Lab | **PASS** |
| Troubleshoot network connectivity | Deep Dive §4.1 — DNS → route → NSG → peer/endpoint → listener | Networking Flow Lab | **PASS** |

## Configure secure access to virtual networks — 5/5

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Create and configure NSGs and ASGs | Deep Dive §4.2 | Networking Flow Lab | **PASS** |
| Evaluate effective security rules | Deep Dive §4.2 — effective rule troubleshooting | networking content | **PASS** |
| Implement Azure Bastion | Deep Dive §4.2 — managed private VM admin path | explicit Bastion regression/content | **PASS** |
| Configure service endpoints | Deep Dive §4.2 — service endpoint vs private endpoint | networking content | **PASS** |
| Configure private endpoints | Deep Dive §4.2 — private IP + DNS dependency | networking content | **PASS** |

## Configure name resolution and load balancing — 3/3

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Configure Azure DNS | Deep Dive §4.3 — public/private DNS troubleshooting | Networking Flow Lab | **PASS** |
| Configure an internal or public load balancer | Deep Dive §4.3 — frontend/rule/pool/probe | networking content | **PASS** |
| Troubleshoot load balancing | Deep Dive §4.3 — frontend → pool → probe → NSG/listener/route | networking content | **PASS** |

**Domain 4 result: 13/13 published skill bullets PASS.**

---

# Domain 5 — Monitor and maintain Azure resources (10–15%)

## Monitor resources in Azure — 6/6

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Interpret metrics in Azure Monitor | Deep Dive §5.1 — metrics vs logs | Monitor & Alert Flow Lab | **PASS** |
| Configure log settings | Deep Dive §5.1 — diagnostic settings and destinations | monitoring content | **PASS** |
| Query and analyze logs | Deep Dive §5.1 — KQL mental pattern | Monitor Lab | **PASS** |
| Set up alert rules, action groups and alert processing rules | Deep Dive §5.1 — clear three-part distinction | Monitor Lab explicitly simulates processing rules | **PASS** |
| Configure and interpret Azure Monitor Insights for VMs, Storage and networks | Deep Dive §5.1 — curated monitoring experiences | monitoring content | **PASS** |
| Use Network Watcher and Connection Monitor | Deep Dive §5.1 — reachability/latency path monitoring | explicit networking/monitoring coverage | **PASS** |

## Implement backup and recovery — 7/7

| Published skill | Teaching evidence | Interactive reinforcement | Status |
|---|---|---|---|
| Create a Recovery Services vault | Deep Dive §5.2 — current vault role/workloads | Recovery Lab | **PASS** |
| Create an Azure Backup vault | Deep Dive §5.2 — current support-matrix distinction | current supplement | **PASS** |
| Create and configure a backup policy | Deep Dive §5.2 — schedule/retention mental model | Recovery Lab | **PASS** |
| Perform backup and restore operations | Deep Dive §5.2 — restore testing and recovery points | Recovery Lab | **PASS** |
| Configure Azure Site Recovery | Deep Dive §5.2 — replication/failover workflow | Recovery Lab | **PASS** |
| Perform a failover to a secondary region | Deep Dive §5.2 — failover→commit→reprotect→failback | Recovery Lab | **PASS** |
| Configure reports and alerts for backups | Deep Dive §5.2 — jobs/policy/protection/recovery-point visibility | monitoring/recovery content | **PASS** |

**Domain 5 result: 13/13 published skill bullets PASS.**

---

# Final current-objective QA result

| Domain | Result |
|---|---:|
| Identities and governance | **15/15 PASS** |
| Storage | **17/17 PASS** |
| Compute | **24/24 PASS** |
| Networking | **13/13 PASS** |
| Monitoring and recovery | **13/13 PASS** |
| **Total** | **82/82 PASS** |

## Bounded meaning of 100%

The package may now state:

> **100% of the published AZ-104 skill bullets in the April 17, 2026 Microsoft Learn study guide are mapped to teachable repository content and have a portable current-scope explanation as of 2026-10-06.**

It must **not** state:

- every Azure feature is covered,
- no related topic outside the 82 bullets can appear,
- Preview/GA scope can never change,
- passing the exam is guaranteed,
- the imported interactive payload never needs future freshness review.

## Revalidation trigger

Re-run this matrix when Microsoft changes the skills-measured date, modifies an objective bullet, materially changes a referenced service, or before a later serious exam-prep cycle when the verification is no longer fresh.