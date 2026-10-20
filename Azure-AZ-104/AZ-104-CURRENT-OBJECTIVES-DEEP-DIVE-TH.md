# 🔷 AZ-104 — Study Map และ Decision Notes

> 📘 สมุดโน้ตส่วนตัว — เริ่มจากภาพรวม แล้วอ่าน 5 Domain ตามลำดับ ฝึก Lab และทบทวนเฉพาะเรื่องที่ยังไม่เข้าใจ

[🏠 AZ-104](./README.md) · [🎨 Visual Guide](./VISUAL-MEMORY-GUIDE-TH.md) · [🧪 Lab Crosswalk](./AZ-104-LABS-AND-PRACTICE-TH.md)

## 🗺️ เส้นทางเรียน AZ-104

| ขั้น | บทหลัก | ขอบเขตที่บันทึกไว้ | Visual Labs |
|---:|---|---:|---:|
| 1 | [👤 Identity & Governance](./01-Lessons/Domain-01-Identity-and-Governance-TH.md) | 20–25% | 1 |
| 2 | [🗂️ Storage](./01-Lessons/Domain-02-Storage-TH.md) | 15–20% | 2 |
| 3 | [🖥️ Compute](./01-Lessons/Domain-03-Compute-TH.md) | 20–25% | 3 |
| 4 | [🌐 Networking](./01-Lessons/Domain-04-Networking-TH.md) | 15–20% | 2 |
| 5 | [🩺 Monitoring & Recovery](./01-Lessons/Domain-05-Monitoring-and-Recovery-TH.md) | 10–15% | 2 |

ไฟล์นี้เป็นแผนเรียนและชุด Decision Maps เพื่อไม่ให้ต้องอ่าน 5 Domain ซ้ำอีกรอบ เนื้อหา Objective ที่เคยอยู่ในไฟล์รวมแยกไว้ในบท Domain 1–5 ทั้งหมดแล้ว

## 🎯 หลังจบแต่ละ Domain

เปิด [🧪 10 Visual Labs](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/labs.html) → [🧠 Flashcards](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/flashcards.html) → [📝 Scenario Quiz](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/quiz.html) แล้วกลับมาทบทวนบทที่ตอบผิดเท่านั้น

> อ้างอิง Outline ของ Microsoft AZ-104 ที่ตรวจเมื่อ 7 ตุลาคม 2026 ไม่ใช่คำรับรองว่าหัวข้อสอบจะไม่มีการปรับในภายหลัง

# Final decision maps

## RBAC vs Policy vs Lock

```text
Who may perform the action?   → Azure RBAC
Is the resource configuration allowed/compliant? → Azure Policy
Should delete/write be prevented operationally?  → Resource Lock
```

## Service Endpoint vs Private Endpoint

```text
Need PaaS reachable through its public endpoint
but restricted to selected VNets? → Service Endpoint

Need the PaaS resource represented by a private IP
inside the VNet? → Private Endpoint
```

## Backup vs Site Recovery

```text
Recover deleted/corrupted data or historical point → Azure Backup
Continue workload after site/region disaster       → Azure Site Recovery
```

## Scale up vs scale out

```text
Need stronger single instance → Scale up
Need more instances/capacity  → Scale out
```

---

# Troubleshooting discipline

For AZ-104 administration, use the same order repeatedly:

1. **Scope** — tenant/subscription/resource group/resource correct?
2. **Identity** — correct principal and authentication context?
3. **Authorization/governance** — RBAC, Policy, lock?
4. **Network path** — DNS, route, NSG, endpoint?
5. **Resource state/configuration** — SKU, region, quota, dependency?
6. **Observability** — metrics, activity log, diagnostic logs, deployment operations?
7. **Recovery** — rollback, restore, failover, redeploy?

This order prevents random changes and makes troubleshooting explainable.

# Completion check

You should be able to explain all **82 official skill bullets** without relying on a product-name list, and then use the interactive package to practice the same decisions visually.

Official scope: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104
