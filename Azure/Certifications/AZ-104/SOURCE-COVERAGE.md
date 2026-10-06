# AZ-104 Current Scope Coverage Matrix

> **Official scope authority:** Microsoft Learn AZ-104 study guide  
> **Skills measured date:** 2026-04-17  
> **Repository check:** 2026-10-06

This matrix records the current 15 objective groups from Microsoft Learn and where the imported interactive system is expected to teach/reinforce them. `REVIEW` means the imported package appears to cover the area, but main-repository objective-by-objective fidelity QA has not yet been completed.

| Domain | Objective group | Imported area | Status |
|---|---|---|---|
| Identity & governance | Manage Microsoft Entra users and groups | `interactive/identity.html`, Learn payload | REVIEW |
| Identity & governance | Manage access to Azure resources | `interactive/identity.html`, `interactive/rbac-lab.html` | REVIEW |
| Identity & governance | Manage Azure subscriptions and governance | Learn/Cram/Blueprint payload | REVIEW |
| Storage | Configure access to storage | `interactive/storage.html`, `interactive/storage-access-lab.html` | REVIEW |
| Storage | Configure and manage storage accounts | `interactive/storage.html`, `interactive/storage-lab.html` | REVIEW |
| Storage | Configure Azure Files and Azure Blob Storage | `interactive/storage.html`, storage labs | REVIEW |
| Compute | Automate deployment by using ARM templates or Bicep | Learn/Cram/Blueprint payload | REVIEW |
| Compute | Create and configure virtual machines | `interactive/compute.html`, `interactive/compute-lab.html` | REVIEW |
| Compute | Provision and manage containers in the Azure portal | `interactive/containers-lab.html`, Learn payload | REVIEW |
| Compute | Create and configure Azure App Service | `interactive/appservice-lab.html`, Learn payload | REVIEW |
| Networking | Configure and manage virtual networks in Azure | `interactive/networking.html`, `interactive/networking-lab.html` | REVIEW |
| Networking | Configure secure access to virtual networks | `interactive/networking.html`, Learn payload | REVIEW |
| Networking | Configure name resolution and load balancing | `interactive/networking.html`, `interactive/loadbalancing-lab.html` | REVIEW |
| Monitoring | Monitor resources in Azure | `interactive/monitoring.html`, `interactive/monitor-lab.html` | REVIEW |
| Monitoring | Implement backup and recovery | `interactive/recovery-lab.html`, Learn payload | REVIEW |

## Domain weights

- Manage Azure identities and governance — **20–25%**
- Implement and manage storage — **15–20%**
- Deploy and manage Azure compute resources — **20–25%**
- Implement and manage virtual networking — **15–20%**
- Monitor and maintain Azure resources — **10–15%**

## Gate to `Verified`

Before changing these rows from `REVIEW` to `COMPLETE`, verify the individual bullets beneath each objective group against both:

1. the imported Learn/Cram/Lab experience, and
2. the current Microsoft Learn study guide.

Missing bullets must become explicit gap notes or new learning content; they must not be inferred from the objective heading alone.
