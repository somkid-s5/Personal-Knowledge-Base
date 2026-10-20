# 👤 AZ-104 Domain 1 — Identity & Governance

> 📘 บทหลักจากสมุดโน้ต AZ-104 ของฉัน — จัดตาม 5 Domain ของขอบเขตสอบที่บันทึกเมื่อ 7 ตุลาคม 2026

[🗺️ แผนเรียน](../AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md) · [🎨 Visual Guide](../VISUAL-MEMORY-GUIDE-TH.md) · [🧪 Visual Labs](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/labs.html)

**เป้าหมาย:** เข้าใจวิธีเลือกและดูแลบริการ Azure รวมถึงการตรวจสอบปัญหาใน Domain นี้

## Domain 1 — Manage Azure identities and governance — 20–25%

### 1.1 Manage Microsoft Entra users and groups

#### Create users and groups

Use **users** for identities and **groups** to manage access at scale. Prefer group-based assignment over repeatedly granting permissions to individual users.

Operational check:
- confirm the object exists in the correct tenant,
- confirm group type and membership mode,
- verify the user can authenticate before troubleshooting Azure RBAC.

#### Manage user and group properties

Important properties include display name, UPN, usage location, membership, ownership, and account state. Separate **identity properties** from **Azure resource permissions**: changing a user property does not automatically change Azure RBAC.

#### Manage licenses in Microsoft Entra ID

Licensing is an identity/service entitlement problem, not an Azure RBAC problem. A user can have Azure resource access but still lack a Microsoft service license, and vice versa.

Decision rule:
- access to Azure resource → inspect Azure RBAC,
- entitlement to Microsoft service → inspect license assignment.

#### Manage external users

External/B2B users are identities from outside the home organization. Invite them into the tenant, then authorize them just like other principals using groups and RBAC.

Security rule: invitation does not equal permission. Authentication and authorization are separate.

#### Configure self-service password reset (SSPR)

SSPR lets eligible users reset passwords without help-desk intervention. Scope it to the correct users/groups and verify authentication methods.

Troubleshoot in this order:
1. Is the user in SSPR scope?
2. Are required authentication methods registered?
3. Does the tenant/hybrid identity configuration support the intended reset/writeback behavior?

### 1.2 Manage access to Azure resources

#### Manage built-in Azure roles

Azure RBAC roles define **Actions / DataActions** and the scope where they apply. Use the least-privileged built-in role that satisfies the task before creating custom roles.

#### Assign roles at different scopes

Hierarchy:

```text
Management group
  → Subscription
    → Resource group
      → Resource
```

Assignments inherit downward. A broad assignment high in the hierarchy can affect many resources.

#### Interpret access assignments

Effective access is the combination of:
- principal,
- role definition,
- scope,
- inheritance,
- deny assignments where applicable.

When access looks wrong, inspect **effective assignments**, not only the resource-level IAM blade.

### 1.3 Manage Azure subscriptions and governance

#### Implement and manage Azure Policy

Azure Policy evaluates resource properties against rules. Use it for governance such as allowed locations, required tags, or configuration standards.

Mental model:
- **RBAC** asks “who can do it?”
- **Policy** asks “is this resource/configuration allowed or compliant?”

#### Configure resource locks

Locks protect resources from accidental changes:
- **CanNotDelete**
- **ReadOnly**

Locks are management-plane controls and inherit downward. They are not a substitute for RBAC.

#### Apply and manage tags on resources

Tags add metadata for ownership, environment, cost center, application, or lifecycle. Do not assume every child resource automatically inherits tags unless you explicitly implement a mechanism such as Azure Policy.

#### Manage resource groups

Resource groups are lifecycle/management containers. Resources in one resource group can be in different regions, and moving resources has service-specific constraints.

#### Manage subscriptions

Subscriptions are major boundaries for billing, quotas, governance, and access. Know how RBAC, Policy, management groups, and resource providers interact with subscription scope.

#### Manage costs by using alerts, budgets, and Azure Advisor recommendations

- **Budgets** track spending against thresholds.
- **Cost alerts** notify on budget/credit/anomaly conditions.
- **Azure Advisor** surfaces optimization recommendations.

A budget does not automatically stop resources unless you build automation around it.

#### Configure management groups

Use management groups to apply governance across multiple subscriptions. Design the hierarchy around stable governance boundaries, not short-lived org charts.

---

## 🧪 Labs ที่เกี่ยวข้อง

1. [RBAC / Policy / Locks](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/rbac-lab.html)

> Labs เป็นแบบฝึก Interactive ไม่ได้ยืนยันว่าได้ Deploy Azure Resources จริง; Progress ของ Lab ยังแยกจากความคืบหน้าบทหลัก

**ไปต่อ:** [← Study Map](../AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md) · [Storage →](./Domain-02-Storage-TH.md)
