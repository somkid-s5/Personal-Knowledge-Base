# 🌐 AZ-104 Domain 4 — Networking

> 📘 บทหลักจากสมุดโน้ต AZ-104 ของฉัน — จัดตาม 5 Domain ของขอบเขตสอบที่บันทึกเมื่อ 7 ตุลาคม 2026

[🗺️ แผนเรียน](../AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md) · [🎨 Visual Guide](../VISUAL-MEMORY-GUIDE-TH.md) · [🧪 Visual Labs](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/labs.html)

**เป้าหมาย:** เข้าใจวิธีเลือกและดูแลบริการ Azure รวมถึงการตรวจสอบปัญหาใน Domain นี้

## 4. Implement and manage virtual networking — 15–20%

### 4.1 Configure and manage virtual networks

#### Create and configure VNets and subnets

Plan non-overlapping CIDRs, subnet purpose, service delegation, NSGs, routing, DNS, and future growth.

#### Create and configure VNet peering

Peering connects VNets privately over the Azure backbone. It is non-transitive by default; verify address-space overlap and routing expectations.

#### Configure public IP addresses

Choose SKU/allocation and associate the IP with the correct front-end resource. Public IP presence alone does not guarantee reachability.

#### Configure user-defined routes

UDRs override/shape routing, commonly toward NVAs/firewalls. Check effective routes when traffic behaves unexpectedly.

#### Troubleshoot network connectivity

Use a layered method:

```text
DNS
→ route / next hop
→ NSG / security
→ endpoint / listener
→ application
```

Avoid “open everything” troubleshooting.

### 4.2 Configure secure access to virtual networks

#### Create and configure NSGs and application security groups

NSGs filter network traffic. ASGs group NICs/VM workloads logically so NSG rules can refer to application roles instead of IP lists.

#### Evaluate effective security rules

Effective rules combine subnet and NIC NSGs. Inspect the effective result rather than only one NSG definition.

#### Implement Azure Bastion

Bastion provides browser-based RDP/SSH access without exposing VM management ports directly to the public Internet.

#### Configure service endpoints for PaaS

Service endpoints extend VNet identity/routing to supported PaaS services while the service still uses its public endpoint model.

#### Configure private endpoints for PaaS

Private Endpoint assigns a private IP from the VNet to access a supported PaaS resource via Private Link. DNS is a common failure point.

### 4.3 Configure name resolution and load balancing

#### Configure Azure DNS

Understand public vs private DNS zones, record sets, VNet links, and name-resolution path.

#### Configure an internal or public load balancer

Azure Load Balancer operates at Layer 4. Choose public vs internal frontend based on who must reach the service.

#### Troubleshoot load balancing

Check:
1. frontend IP,
2. load-balancing rule,
3. backend pool,
4. health probe,
5. NSG,
6. guest OS listener/firewall,
7. return route.

---

## 🧪 Labs ที่เกี่ยวข้อง

1. [Packet / Connection Flow](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/networking-lab.html)
2. [Load Balancing Decision](https://somkid-s5.github.io/Personal-Knowledge-Base/az104-interactive/loadbalancing-lab.html)

> Labs เป็นแบบฝึก Interactive ไม่ได้ยืนยันว่าได้ Deploy Azure Resources จริง; Progress ของ Lab ยังแยกจากความคืบหน้าบทหลัก

**ไปต่อ:** [← Compute](./Domain-03-Compute-TH.md) · [Monitoring & Recovery →](./Domain-05-Monitoring-and-Recovery-TH.md)
