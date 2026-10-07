# AZ-104 Current Scope Coverage Matrix

> **Official scope authority:** Microsoft Learn AZ-104 study guide  
> **Skills measured date:** 2026-04-17  
> **Repository check:** 2026-10-07

This matrix records the current 15 objective groups from Microsoft Learn and where the learning system teaches/reinforces them. CI decodes the real packed payload and validates a machine-readable 82-skill inventory; the detailed evidence summary is in [AZ104-QA-MATRIX.md](./AZ104-QA-MATRIX.md), while [AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md](./AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md) provides the current Thai teaching layer.

| Domain | Objective group | Imported area | Status |
|---|---|---|---|
| Identity & governance | Manage Microsoft Entra users and groups | `interactive/identity.html`, Learn payload | **PASS** |
| Identity & governance | Manage access to Azure resources | `interactive/identity.html`, `interactive/rbac-lab.html` | **PASS** |
| Identity & governance | Manage Azure subscriptions and governance | Learn/Cram/Blueprint payload | **PASS** |
| Storage | Configure access to storage | `interactive/storage.html`, `interactive/storage-access-lab.html` | **PASS** |
| Storage | Configure and manage storage accounts | `interactive/storage.html`, `interactive/storage-lab.html` | **PASS** |
| Storage | Configure Azure Files and Azure Blob Storage | `interactive/storage.html`, storage labs | **PASS** |
| Compute | Automate deployment by using ARM templates or Bicep | Learn/Cram/Blueprint payload | **PASS** |
| Compute | Create and configure virtual machines | `interactive/compute.html`, `interactive/compute-lab.html` | **PASS** |
| Compute | Provision and manage containers in the Azure portal | `interactive/containers-lab.html`, Learn payload | **PASS** |
| Compute | Create and configure Azure App Service | `interactive/appservice-lab.html`, Learn payload | **PASS** |
| Networking | Configure and manage virtual networks in Azure | `interactive/networking.html`, `interactive/networking-lab.html` | **PASS** |
| Networking | Configure secure access to virtual networks | `interactive/networking.html`, Learn payload | **PASS** |
| Networking | Configure name resolution and load balancing | `interactive/networking.html`, `interactive/loadbalancing-lab.html` | **PASS** |
| Monitoring | Monitor resources in Azure | `interactive/monitoring.html`, `interactive/monitor-lab.html` | **PASS** |
| Monitoring | Implement backup and recovery | `interactive/recovery-lab.html`, Learn payload | **PASS** |

## Domain weights

- Manage Azure identities and governance — **20–25%**
- Implement and manage storage — **15–20%**
- Deploy and manage Azure compute resources — **20–25%**
- Implement and manage virtual networking — **15–20%**
- Monitor and maintain Azure resources — **10–15%**

## Verification result

The current declared scope passes:

- **15/15 objective groups**
- **82/82 official skill-bullet evidence checks**
- every objective group has real decoded teaching content rather than a heading-only placeholder
- all 82 current skills also have a durable explanatory layer in the current-objectives deep dive
- visual/practice layers remain supplemental evidence rather than substitutes for objective coverage

Re-run the coverage audit whenever Microsoft publishes a new skills-measured date or the packed interactive payload is regenerated.
