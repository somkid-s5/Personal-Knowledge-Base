// Interactive Architecture Diagrams & Visual Cards for AZ-104 Learn Pages
const DIAGRAMS = {
  // --- DOMAIN 1: IDENTITY & GOVERNANCE ---
  '1-2-t1': {
    badge: 'ARCHITECTURE DIAGRAM • RBAC MODEL',
    title: 'โครงสร้างการให้สิทธิ์ Azure RBAC (3 องค์ประกอบหลัก & ลำดับ Scope)',
    desc: 'สิทธิ์ RBAC เกิดจาก: ใคร (Security Principal) + ทำอะไรได้ (Role Definition) + ที่ขอบเขตไหน (Scope) โดยสิทธิ์จะสืบทอดจากบนลงล่างเสมอ',
    labUrl: 'rbac-lab.html',
    labText: '🔬 เปิดทดลองใน RBAC & Governance Lab →',
    html: `
      <div class="diag-flow">
        <div class="diag-flow-step">
          <i>01 • WHO</i>
          <b>Security Principal</b>
          <p>User, Group, Service Principal, Managed Identity</p>
          <span class="diag-tag blue">ตัวตน</span>
        </div>
        <div class="diag-arrow">+</div>
        <div class="diag-flow-step">
          <i>02 • WHAT</i>
          <b>Role Definition</b>
          <p>Owner, Contributor, Reader หรือ Custom Role</p>
          <span class="diag-tag purple">ชุดสิทธิ์ Action</span>
        </div>
        <div class="diag-arrow">+</div>
        <div class="diag-flow-step">
          <i>03 • WHERE</i>
          <b>Scope (ขอบเขต)</b>
          <p>MG → Subscription → Resource Group → Resource</p>
          <span class="diag-tag green">ระดับเป้าหมาย</span>
        </div>
      </div>
      <div class="diagram-canvas">
        <svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradMg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#1d4ed8"/></linearGradient>
            <linearGradient id="gradSub" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#0891b2"/></linearGradient>
            <linearGradient id="gradRg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#059669"/></linearGradient>
            <linearGradient id="gradRes" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#6d28d9"/></linearGradient>
          </defs>
          <!-- Level 1: Root & MG -->
          <rect x="20" y="20" width="150" height="70" rx="10" fill="url(#gradMg)" opacity="0.95"/>
          <text x="95" y="48" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Management Group</text>
          <text x="95" y="68" fill="#bfdbfe" font-size="10" text-anchor="middle">ขอบเขตข้าม Subscription</text>

          <line x1="170" y1="55" x2="210" y2="55" stroke="#60a5fa" stroke-width="2" stroke-dasharray="4,4"/>
          <polygon points="210,55 202,50 202,60" fill="#60a5fa"/>

          <!-- Level 2: Subscription -->
          <rect x="210" y="20" width="150" height="70" rx="10" fill="url(#gradSub)" opacity="0.95"/>
          <text x="285" y="48" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Subscription</text>
          <text x="285" y="68" fill="#cffafe" font-size="10" text-anchor="middle">ขอบเขตคิดเงิน & โควตา</text>

          <line x1="360" y1="55" x2="400" y2="55" stroke="#22d3ee" stroke-width="2" stroke-dasharray="4,4"/>
          <polygon points="400,55 392,50 392,60" fill="#22d3ee"/>

          <!-- Level 3: Resource Group -->
          <rect x="400" y="20" width="150" height="70" rx="10" fill="url(#gradRg)" opacity="0.95"/>
          <text x="475" y="48" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Resource Group</text>
          <text x="475" y="68" fill="#d1fae5" font-size="10" text-anchor="middle">จัดกลุ่มตาม Lifecycle</text>

          <line x1="550" y1="55" x2="590" y2="55" stroke="#34d399" stroke-width="2" stroke-dasharray="4,4"/>
          <polygon points="590,55 582,50 582,60" fill="#34d399"/>

          <!-- Level 4: Resource -->
          <rect x="590" y="20" width="150" height="70" rx="10" fill="url(#gradRes)" opacity="0.95"/>
          <text x="665" y="48" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Individual Resource</text>
          <text x="665" y="68" fill="#ede9fe" font-size="10" text-anchor="middle">VM, VNet, Storage ฯลฯ</text>

          <!-- Inheritance note banner -->
          <rect x="20" y="115" width="720" height="75" rx="8" fill="rgba(37,99,235,0.08)" stroke="#3b82f6" stroke-width="1"/>
          <text x="40" y="142" fill="#60a5fa" font-size="12" font-weight="bold">📌 กฎเหล็กการสืบทอดสิทธิ์ (Inheritance & Deny Rules):</text>
          <text x="40" y="162" fill="#93a7c3" font-size="11">• สิทธิ์ที่ให้ไว้ระดับบน (เช่น Management Group หรือ Subscription) จะไหลลงสู่ระดับล่างเสมอโดยอัตโนมัติ</text>
          <text x="40" y="179" fill="#93a7c3" font-size="11">• สิทธิ์หักลบ: ไม่มี Deny ใน Custom RBAC ทั่วไป (ยกเว้น Azure Blueprints/Deny Assignments) • สิทธิ์รวมกัน (Permissive/Union)</text>
        </svg>
      </div>
    `
  },

  '1-3-t1': {
    badge: 'GOVERNANCE MATRIX • POLICY VS LOCKS',
    title: 'การควบคุมความปลอดภัยและการกำกับดูแล (Azure Policy & Resource Locks)',
    desc: 'Policy บังคับมาตรฐานและกฎเกณฑ์ Resource ส่วน Locks ป้องกันการเผลอลบหรือแก้ไขระดับ Management Plane',
    labUrl: 'rbac-lab.html',
    labText: '🔬 ทดลองสร้าง Policy & Lock ใน Lab →',
    html: `
      <div class="diag-grid">
        <div class="diag-box highlight">
          <b>🛡️ Azure Policy</b>
          <span>ตรวจสอบและบังคับคอนฟิกของ Resource ให้ตรงตามนโยบายองค์กร</span>
          <span class="diag-tag blue">Effects: Deny, Audit, Modify, DeployIfNotExists</span>
          <p style="margin:8px 0 0;font-size:11px;color:var(--muted)">เช่น บังคับให้สร้าง VM ได้เฉพาะใน Region East Asia หรือต้องมี Tag แผนกเสมอ</p>
        </div>
        <div class="diag-box">
          <b>🔒 CanNotDelete Lock</b>
          <span>อ่านและแก้ไขคอนฟิกได้ตามปกติ <b>แต่ห้ามลบเด็ดขาด</b></span>
          <span class="diag-tag green">Authorized Users can edit, nobody deletes</span>
          <p style="margin:8px 0 0;font-size:11px;color:var(--muted)">แม้กระทั่ง Owner ของ Subscription ก็ลบไม่ได้จนกว่าจะปลด Lock ออกก่อน</p>
        </div>
        <div class="diag-box">
          <b>⛔ ReadOnly Lock</b>
          <span>อ่านได้อย่างเดียว <b>ห้ามแก้ไขคอนฟิกและห้ามลบ</b></span>
          <span class="diag-tag amber">Equivalent to Reader Role for all</span>
          <p style="margin:8px 0 0;font-size:11px;color:var(--muted)">ล็อกระดับ ARM ป้องกันการ Start/Stop VM หรือเปลี่ยน Key ชั่วคราว</p>
        </div>
      </div>
    `
  },

  // --- DOMAIN 2: STORAGE ---
  '2-1-t1': {
    badge: 'STORAGE NETWORKING • 3 ACCESS TOPOLOGIES',
    title: 'รูปแบบการเชื่อมต่อและความปลอดภัยของ Azure Storage Account',
    desc: 'เปรียบเทียบ 3 รูปแบบการเข้าถึง Storage: จาก Public Internet, Service Endpoint, และ Private Endpoint ผ่าน Private Link',
    labUrl: 'storage-access-lab.html',
    labText: '🔬 เปิดทดลองใน Storage Access & Security Lab →',
    html: `
      <div class="diag-grid">
        <div class="diag-box">
          <b>🌐 1. Public Endpoint + Firewall</b>
          <span>เข้าถึงผ่าน URL สาธารณะของ Storage (เช่น <code>*.blob.core.windows.net</code>)</span>
          <span class="diag-tag amber">Public IP + Storage IP Firewall Filter</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)">เปิดให้ทุกคน หรือจำกัดเฉพาะ Public IP บางช่วง</p>
        </div>
        <div class="diag-box">
          <b>⚡ 2. Service Endpoint</b>
          <span>ทราฟฟิกวิ่งผ่าน Azure Backbone Network ไม่วิ่งออกเน็ตสาธารณะ</span>
          <span class="diag-tag blue">Keep Public URL + Virtual Network Rule</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)">URL ปลายทางยังเป็น Public IP แต่ Storage ยอมรับเฉพาะ Request จาก Subnet ที่กำหนด</p>
        </div>
        <div class="diag-box highlight">
          <b>🔒 3. Private Endpoint (Private Link)</b>
          <span>สร้าง Virtual NIC พร้อมได้ <b>Private IP (เช่น 10.0.1.5)</b> อยู่ใน Subnet ของเรา 100%</span>
          <span class="diag-tag green">100% Private IP + Private DNS Zone</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)">ปิด Public Endpoint สมบูรณ์แบบ ปลอดภัยสูงสุดสำหรับระบบ Enterprise</p>
        </div>
      </div>
    `
  },

  '2-2-t3': {
    badge: 'REDUNDANCY MATRIX • DISASTER RECOVERY',
    title: 'แผนผังการสำรองข้อมูล Storage Redundancy (LRS vs ZRS vs GRS vs GZRS)',
    desc: 'ข้อมูลใน Storage จะถูกทำซ้ำ (Replicate) เสมออย่างน้อย 3 ชุดเพื่อป้องกันอุปกรณ์เสีย โดยกระจายระดับ Datacenter, Zone หรือ Region',
    labUrl: 'storage-lab.html',
    labText: '🔬 เปิดทดสอบจำลอง Region ล่มใน Storage Redundancy Lab →',
    html: `
      <div class="diagram-canvas">
        <svg viewBox="0 0 760 220" width="100%" height="220" xmlns="http://www.w3.org/2000/svg">
          <!-- Column 1: LRS -->
          <rect x="15" y="15" width="165" height="190" rx="10" fill="rgba(37,99,235,0.06)" stroke="#3b82f6" stroke-width="1.2"/>
          <text x="97" y="42" fill="#60a5fa" font-size="14" font-weight="bold" text-anchor="middle">LRS</text>
          <text x="97" y="60" fill="#93a7c3" font-size="10" text-anchor="middle">Locally Redundant</text>
          <rect x="35" y="75" width="125" height="50" rx="6" fill="#1e293b" stroke="#475569"/>
          <text x="97" y="98" fill="#e2e8f0" font-size="11" font-weight="bold" text-anchor="middle">1 Datacenter</text>
          <text x="97" y="114" fill="#38bdf8" font-size="10" text-anchor="middle">สำรอง 3 ชุดในตึกเดียว</text>
          <text x="97" y="150" fill="#cbd5e1" font-size="10" text-anchor="middle">💰 ถูกที่สุด</text>
          <text x="97" y="170" fill="#f87171" font-size="10" text-anchor="middle">⚠ ไม่กันตึกล่ม/ไฟไหม้</text>

          <!-- Column 2: ZRS -->
          <rect x="195" y="15" width="175" height="190" rx="10" fill="rgba(6,182,212,0.06)" stroke="#06b6d4" stroke-width="1.2"/>
          <text x="282" y="42" fill="#22d3ee" font-size="14" font-weight="bold" text-anchor="middle">ZRS</text>
          <text x="282" y="60" fill="#93a7c3" font-size="10" text-anchor="middle">Zone-Redundant</text>
          <rect x="210" y="75" width="45" height="50" rx="4" fill="#1e293b" stroke="#0891b2"/>
          <text x="232" y="104" fill="#22d3ee" font-size="9" text-anchor="middle">AZ 1</text>
          <rect x="260" y="75" width="45" height="50" rx="4" fill="#1e293b" stroke="#0891b2"/>
          <text x="282" y="104" fill="#22d3ee" font-size="9" text-anchor="middle">AZ 2</text>
          <rect x="310" y="75" width="45" height="50" rx="4" fill="#1e293b" stroke="#0891b2"/>
          <text x="332" y="104" fill="#22d3ee" font-size="9" text-anchor="middle">AZ 3</text>
          <text x="282" y="150" fill="#cbd5e1" font-size="10" text-anchor="middle">🏢 3 Availability Zones</text>
          <text x="282" y="170" fill="#4ade80" font-size="10" text-anchor="middle">✓ ทนไฟไหม้ 1 Datacenter</text>

          <!-- Column 3: GRS / RA-GRS -->
          <rect x="385" y="15" width="175" height="190" rx="10" fill="rgba(16,185,129,0.06)" stroke="#10b981" stroke-width="1.2"/>
          <text x="472" y="42" fill="#34d399" font-size="14" font-weight="bold" text-anchor="middle">GRS / RA-GRS</text>
          <text x="472" y="60" fill="#93a7c3" font-size="10" text-anchor="middle">Geo-Redundant (3+3)</text>
          <rect x="398" y="75" width="68" height="50" rx="4" fill="#1e293b" stroke="#059669"/>
          <text x="432" y="96" fill="#a7f3d0" font-size="9" text-anchor="middle">Primary</text>
          <text x="432" y="112" fill="#34d399" font-size="9" text-anchor="middle">(LRS 3 ชุด)</text>
          <rect x="478" y="75" width="68" height="50" rx="4" fill="#1e293b" stroke="#059669"/>
          <text x="512" y="96" fill="#a7f3d0" font-size="9" text-anchor="middle">Secondary</text>
          <text x="512" y="112" fill="#34d399" font-size="9" text-anchor="middle">(LRS 3 ชุด)</text>
          <text x="472" y="150" fill="#cbd5e1" font-size="10" text-anchor="middle">🌍 ข้าม Region หลายร้อยกิโล</text>
          <text x="472" y="170" fill="#4ade80" font-size="10" text-anchor="middle">✓ RA-GRS อ่านคู่ขนานได้</text>

          <!-- Column 4: GZRS -->
          <rect x="575" y="15" width="170" height="190" rx="10" fill="rgba(139,92,246,0.06)" stroke="#8b5cf6" stroke-width="1.2"/>
          <text x="660" y="42" fill="#a78bfa" font-size="14" font-weight="bold" text-anchor="middle">GZRS / RA-GZRS</text>
          <text x="660" y="60" fill="#93a7c3" font-size="10" text-anchor="middle">Geo-Zone-Redundant</text>
          <rect x="588" y="75" width="68" height="50" rx="4" fill="#1e293b" stroke="#7c3aed"/>
          <text x="622" y="96" fill="#ddd6fe" font-size="9" text-anchor="middle">Primary</text>
          <text x="622" y="112" fill="#a78bfa" font-size="9" text-anchor="middle">(ZRS 3 AZs)</text>
          <rect x="664" y="75" width="68" height="50" rx="4" fill="#1e293b" stroke="#7c3aed"/>
          <text x="698" y="96" fill="#ddd6fe" font-size="9" text-anchor="middle">Secondary</text>
          <text x="698" y="112" fill="#a78bfa" font-size="9" text-anchor="middle">(LRS 3 ชุด)</text>
          <text x="660" y="150" fill="#cbd5e1" font-size="10" text-anchor="middle">🛡️ ทนทานสูงสุดใน Azure</text>
          <text x="660" y="170" fill="#a78bfa" font-size="10" text-anchor="middle">ZRS ในบ้าน + GRS ข้ามเมือง</text>
        </svg>
      </div>
    `
  },

  '2-3-t3': {
    badge: 'LIFECYCLE MANAGEMENT • ACCESS TIERS',
    title: 'การบริหารวงจรชีวิตและระดับการเก็บข้อมูล (Blob Access Tiers & Rehydration)',
    desc: 'ปรับระดับ Tier เพื่อประหยัดค่าใช้จ่ายตามความถี่ในการใช้งาน พร้อมกระบวนการดึงข้อมูลจาก Archive (Rehydrate)',
    labUrl: 'storage-lab.html',
    labText: '🔬 ทดลองตั้งค่า Lifecycle Rule ใน Storage Lab →',
    html: `
      <div class="diag-flow">
        <div class="diag-flow-step">
          <i>01 • FREQUENT</i>
          <b>Hot Tier</b>
          <p>เข้าถึงบ่อย ค่า Storage สูงสุด / ค่าอ่านเขียนต่ำสุด</p>
          <span class="diag-tag blue">Real-time Data</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step">
          <i>02 • INFREQUENT</i>
          <b>Cool Tier</b>
          <p>เข้าถึงเดือนละครั้ง (อย่างน้อย 30 วัน)</p>
          <span class="diag-tag green">30 วันขั้นต่ำ</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step">
          <i>03 • RARE</i>
          <b>Cold Tier</b>
          <p>เข้าถึงปีละไม่กี่ครั้ง (อย่างน้อย 90 วัน)</p>
          <span class="diag-tag amber">90 วันขั้นต่ำ</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step">
          <i>04 • OFFLINE</i>
          <b>Archive Tier</b>
          <p>เก็บยาว (180 วัน) ค่า Storage ถูกสุด แต่อ่านทันทีไม่ได้</p>
          <span class="diag-tag purple">Rehydrate 1-15 ชม.</span>
        </div>
      </div>
    `
  },

  // --- DOMAIN 3: COMPUTE ---
  '3-1-t3': {
    badge: 'IAC PIPELINE • AUTOMATION',
    title: 'สถาปัตยกรรมการแปลงไฟล์ Bicep เป็น ARM Template เพื่อ Deploy บน Azure',
    desc: 'Bicep เป็นภาษาที่เขียนง่ายกว่า JSON มาก โดยระบบจะ Compile (Transpile) เป็น ARM JSON อัตโนมัติก่อนส่งให้ ARM Engine',
    html: `
      <div class="diag-flow">
        <div class="diag-flow-step">
          <i>AUTHORING</i>
          <b>main.bicep</b>
          <p>เขียนง่าย มี Type Safety, Loops, Modules ชัดเจน</p>
          <span class="diag-tag blue">Bicep Syntax</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step">
          <i>BUILD / TRANSPILE</i>
          <b>Bicep CLI / Az CLI</b>
          <p><code>az bicep build</code> หรือ Deploy ตรง</p>
          <span class="diag-tag purple">Transpiler Engine</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step">
          <i>ARM JSON PAYLOAD</i>
          <b>azuredeploy.json</b>
          <p>Template JSON มาตรฐานพร้อม Parameters / Variables</p>
          <span class="diag-tag amber">Declarative State</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step">
          <i>AZURE ENGINE</i>
          <b>ARM API Deployment</b>
          <p>สร้าง/อัปเดต Resources บน Resource Group</p>
          <span class="diag-tag green">Idempotent Deploy</span>
        </div>
      </div>
    `
  },

  '3-2-t11': {
    badge: 'COMPUTE HIGH AVAILABILITY • SLA MATRIX',
    title: 'ระดับความพร้อมใช้งานของ Azure Virtual Machines (SLA & Resiliency Tiers)',
    desc: 'เลือกระดับการปกป้อง VM ให้ตรงกับ Business Requirement: ตั้งแต่ Single VM จนถึงข้าม Availability Zones',
    labUrl: 'compute-lab.html',
    labText: '🔬 เปิดทดลองใน Compute & VMSS Lab →',
    html: `
      <div class="diag-grid">
        <div class="diag-box">
          <b>🖥️ 1. Single VM (Premium SSD)</b>
          <span>SLA 99.9% (~8.76 ชม. downtime/ปี)</span>
          <span class="diag-tag amber">1 VM ใน 1 Rack</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)">หากตู้ Rack นั้นล่ม หรือ Maintenance เครื่องจะดับชั่วคราว</p>
        </div>
        <div class="diag-box">
          <b>🛡️ 2. Availability Set</b>
          <span>SLA 99.95% (แยก Fault Domain & Update Domain)</span>
          <span class="diag-tag blue">กระจายคนละ Rack ใน 1 Datacenter</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)">ป้องกัน Power/Switch เสีย (FD) และ Patching (UD)</p>
        </div>
        <div class="diag-box highlight">
          <b>🏢 3. Availability Zones (AZ)</b>
          <span>SLA 99.99% (สูงสุดใน Single Region)</span>
          <span class="diag-tag green">กระจายข้าม 3 อาคารคนละที่</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)">แยกแหล่งจ่ายไฟ เน็ต และระบบความเย็น 100%</p>
        </div>
        <div class="diag-box">
          <b>📈 4. VM Scale Sets (VMSS)</b>
          <span>Autoscale เพิ่ม-ลดจำนวน VM อัตโนมัติ</span>
          <span class="diag-tag purple">Zone-Redundant + Load Balancer</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)">รองรับโหลดกระชากและกระจายข้ามโซนอัตโนมัติ</p>
        </div>
      </div>
    `
  },

  '3-3-t1': {
    badge: 'CONTAINER ECOSYSTEM • ACR / ACI / ACA',
    title: 'ระบบนิเวศการจัดการคอนเทนเนอร์บน Azure (Container Registry vs Instances vs Container Apps)',
    desc: 'เลือกใช้บริการ Container ให้เหมาะกับลักษณะงาน: จากที่เก็บ Image ไปสู่ตัวรันแบบ Serverless และ Microservices',
    labUrl: 'containers-lab.html',
    labText: '🔬 เปิดทดลองใน Containers Lab →',
    html: `
      <div class="diag-grid">
        <div class="diag-box">
          <b>📦 Azure Container Registry (ACR)</b>
          <span>ที่เก็บและจัดการ Private Docker Images และ OCI Artifacts</span>
          <span class="diag-tag blue">Image Repository + Webhooks</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)">ดึง Image ไปรันบน ACI, ACA หรือ AKS ได้อย่างปลอดภัย</p>
        </div>
        <div class="diag-box">
          <b>⚡ Azure Container Instances (ACI)</b>
          <span>รัน Single Container ขึ้นมาทำงานทันทีแบบ Serverless ไร้ VM</span>
          <span class="diag-tag green">Fast Startup (Seconds) • Batch/Jobs</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)">เหมาะกับงานรันสคริปต์สั้นๆ ประมวลผลภาพ หรือ Background Task</p>
        </div>
        <div class="diag-box highlight">
          <b>🚀 Azure Container Apps (ACA)</b>
          <span>รัน Microservices แบบ Serverless พร้อม Scale-to-zero และ KEDA</span>
          <span class="diag-tag purple">Microservices + Dapr + Ingress</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)">มี HTTPS Ingress, Traffic Splitting และปรับขนาดตาม HTTP/Event</p>
        </div>
      </div>
    `
  },

  '3-4-t12': {
    badge: 'DEPLOYMENT PIPELINE • ZERO DOWNTIME',
    title: 'กลไก Deployment Slots และการสลับทราฟฟิก (Zero-Downtime Swap)',
    desc: 'อัปโหลดโค้ดเวอร์ชันใหม่ขึ้น Staging Slot เพื่อทดสอบและ Warmup เมื่อผ่านแล้วให้ Swap สลับ IP กับ Production ทันที',
    labUrl: 'appservice-lab.html',
    labText: '🔬 ลองสลับ Slot จริงใน App Service Lab →',
    html: `
      <div class="diag-flow">
        <div class="diag-flow-step highlight">
          <i>ACTIVE TRAFFIC</i>
          <b>Production Slot</b>
          <p>ผู้ใช้งานจริงเข้าถึง URL หลัก (100% Traffic)</p>
          <span class="diag-tag green">v1.0 Live</span>
        </div>
        <div class="diag-arrow">⇄ SWAP</div>
        <div class="diag-flow-step">
          <i>STAGING / WARMUP</i>
          <b>Staging Slot</b>
          <p>ทีม Dev เทสต์โค้ดใหม่และ Warmup ให้พร้อม</p>
          <span class="diag-tag blue">v2.0 Ready</span>
        </div>
      </div>
      <p style="margin:10px 0 0;font-size:11px;color:var(--muted);text-align:center">
        💡 <b>สิ่งที่ Swap:</b> โค้ดโปรแกรม & Container Image • <b>สิ่งที่ไม่ Swap (Sticky Settings):</b> Custom Domain, SSL Certs, IP Restrictions, Scaling Settings
      </p>
    `
  },

  // --- DOMAIN 4: NETWORKING ---
  '4-1-t3': {
    badge: 'NETWORK TOPOLOGY • HUB & SPOKE',
    title: 'สถาปัตยกรรม Hub-and-Spoke และกฎ Non-Transitive ของ VNet Peering',
    desc: 'VNet Peering ไม่ส่งต่อทราฟฟิกแบบทอด (Non-transitive): หาก Spoke A ต้องการคุยกับ Spoke B ต้องมี Router/NVA ใน Hub พร้อม UDR',
    labUrl: 'networking-lab.html',
    labText: '🔬 ทดลองทำ Peering & UDR ใน Networking Lab →',
    html: `
      <div class="diagram-canvas">
        <svg viewBox="0 0 760 190" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
          <!-- Spoke A -->
          <rect x="30" y="40" width="180" height="110" rx="10" fill="rgba(37,99,235,0.08)" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="120" y="68" fill="#60a5fa" font-size="13" font-weight="bold" text-anchor="middle">Spoke VNet A</text>
          <text x="120" y="88" fill="#93a7c3" font-size="10" text-anchor="middle">10.1.0.0/16 (App Tier)</text>
          <rect x="50" y="100" width="140" height="35" rx="5" fill="#1e293b" stroke="#3b82f6"/>
          <text x="120" y="122" fill="#e2e8f0" font-size="10" text-anchor="middle">Subnet 10.1.1.0/24</text>

          <!-- Hub VNet -->
          <rect x="290" y="20" width="180" height="150" rx="10" fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-width="1.5"/>
          <text x="380" y="48" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">Hub VNet (Central)</text>
          <text x="380" y="68" fill="#93a7c3" font-size="10" text-anchor="middle">10.0.0.0/16 (Shared Services)</text>
          <rect x="305" y="80" width="150" height="40" rx="5" fill="#1e293b" stroke="#10b981"/>
          <text x="380" y="100" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Azure Firewall / NVA</text>
          <text x="380" y="114" fill="#6ee7b7" font-size="9" text-anchor="middle">IP: 10.0.1.4 (Gateway)</text>
          <rect x="305" y="125" width="150" height="30" rx="4" fill="#0f172a" stroke="#059669"/>
          <text x="380" y="145" fill="#6ee7b7" font-size="9" text-anchor="middle">VPN / ExpressRoute Gateway</text>

          <!-- Spoke B -->
          <rect x="550" y="40" width="180" height="110" rx="10" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="640" y="68" fill="#a78bfa" font-size="13" font-weight="bold" text-anchor="middle">Spoke VNet B</text>
          <text x="640" y="88" fill="#93a7c3" font-size="10" text-anchor="middle">10.2.0.0/16 (DB Tier)</text>
          <rect x="570" y="100" width="140" height="35" rx="5" fill="#1e293b" stroke="#8b5cf6"/>
          <text x="640" y="122" fill="#e2e8f0" font-size="10" text-anchor="middle">Subnet 10.2.1.0/24</text>

          <!-- Peering lines -->
          <line x1="210" y1="95" x2="290" y2="95" stroke="#22c55e" stroke-width="2.5"/>
          <text x="250" y="88" fill="#22c55e" font-size="9" font-weight="bold" text-anchor="middle">Peered ✓</text>

          <line x1="470" y1="95" x2="550" y2="95" stroke="#22c55e" stroke-width="2.5"/>
          <text x="510" y="88" fill="#22c55e" font-size="9" font-weight="bold" text-anchor="middle">Peered ✓</text>

          <!-- Direct Spoke-to-Spoke cross line -->
          <path d="M 210,130 Q 380,185 550,130" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
          <text x="380" y="180" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">✕ คุยกันตรงๆ ไม่ได้ (Non-Transitive) ต้องผ่าน NVA ใน Hub เสมอ</text>
        </svg>
      </div>
    `
  },

  '4-2-t1': {
    badge: 'SECURITY PIPELINE • NSG EVALUATION',
    title: 'ลำดับการประเมินกฎของ Network Security Group (NSG Priority Order)',
    desc: 'NSG กรองแพ็กเก็ตด้วย 5-Tuple โดยเช็กกฎเรียงจากเลข Priority ต่ำ (100) ไปหาเลขสูง (4096) หากตรงกฎใดจะทำงานทันทีและหยุดเช็กต่อ',
    labUrl: 'networking-lab.html',
    labText: '🔬 ทดสอบการส่ง Packet ผ่าน NSG ใน Lab →',
    html: `
      <div class="diag-flow">
        <div class="diag-flow-step">
          <i>PRIORITY 100-500</i>
          <b>Custom High Priority</b>
          <p>เช่น Allow SSH (100) หรือ Deny Port 80 (200)</p>
          <span class="diag-tag blue">เลขน้อย = มีผลก่อน</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step">
          <i>FIRST MATCH RULE</i>
          <b>Match & Terminate</b>
          <p>ถ้าตรงเงื่อนไข (Allow/Deny) จะตัดจบ ไม่ตรวจกฎถัดไป</p>
          <span class="diag-tag green">Deterministic Evaluation</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step">
          <i>PRIORITY 65000+</i>
          <b>Default Inbound Rules</b>
          <p>65000: Allow VNet Inbound<br>65001: Allow Azure LB<br>65500: <b>DenyAllInBound</b></p>
          <span class="diag-tag amber">กฎความปลอดภัยพื้นฐาน</span>
        </div>
      </div>
    `
  },

  '4-3-t4': {
    badge: 'LOAD BALANCING DECISION TREE',
    title: 'แผนภาพการเลือกใช้ Load Balancer ทั้ง 4 แบบของ Azure',
    desc: 'เลือกใช้ตัวกระจายโหลดให้ถูกต้องตามระดับชั้น Network (L4/L7) และขอบเขตภูมิศาสตร์ (Regional vs Global)',
    labUrl: 'loadbalancing-lab.html',
    labText: '🔬 เปิดทดลองใน Load Balancing Lab →',
    html: `
      <div class="diagram-canvas">
        <svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
          <!-- Global Column -->
          <rect x="20" y="20" width="350" height="175" rx="12" fill="rgba(56,189,248,0.06)" stroke="#0284c7" stroke-width="1.2"/>
          <text x="195" y="45" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">🌐 GLOBAL (กระจายทราฟฟิกข้ามหลาย Region)</text>
          
          <rect x="35" y="60" width="150" height="115" rx="8" fill="#1e293b" stroke="#38bdf8"/>
          <text x="110" y="85" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">Azure Front Door</text>
          <text x="110" y="103" fill="#38bdf8" font-size="9" text-anchor="middle">Layer 7 (HTTP/HTTPS)</text>
          <text x="110" y="125" fill="#94a3b8" font-size="9" text-anchor="middle">• Global Anycast CDN</text>
          <text x="110" y="140" fill="#94a3b8" font-size="9" text-anchor="middle">• WAF & SSL Offload</text>
          <text x="110" y="155" fill="#94a3b8" font-size="9" text-anchor="middle">• URL Path Routing</text>

          <rect x="205" y="60" width="150" height="115" rx="8" fill="#1e293b" stroke="#0284c7"/>
          <text x="280" y="85" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">Traffic Manager</text>
          <text x="280" y="103" fill="#38bdf8" font-size="9" text-anchor="middle">DNS-based Routing</text>
          <text x="280" y="125" fill="#94a3b8" font-size="9" text-anchor="middle">• Non-HTTP Protocols</text>
          <text x="280" y="140" fill="#94a3b8" font-size="9" text-anchor="middle">• Geographic/Priority</text>
          <text x="280" y="155" fill="#94a3b8" font-size="9" text-anchor="middle">• ไม่แตะ Payload ข้อมูล</text>

          <!-- Regional Column -->
          <rect x="390" y="20" width="350" height="175" rx="12" fill="rgba(16,185,129,0.06)" stroke="#059669" stroke-width="1.2"/>
          <text x="565" y="45" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">📍 REGIONAL (กระจายทราฟฟิกใน 1 Region)</text>

          <rect x="405" y="60" width="150" height="115" rx="8" fill="#1e293b" stroke="#10b981"/>
          <text x="480" y="85" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Application Gateway</text>
          <text x="480" y="103" fill="#34d399" font-size="9" text-anchor="middle">Layer 7 (HTTP/HTTPS)</text>
          <text x="480" y="125" fill="#94a3b8" font-size="9" text-anchor="middle">• URL /images/* Routing</text>
          <text x="480" y="140" fill="#94a3b8" font-size="9" text-anchor="middle">• Cookie Affinity</text>
          <text x="480" y="155" fill="#94a3b8" font-size="9" text-anchor="middle">• Integrated WAF</text>

          <rect x="575" y="60" width="150" height="115" rx="8" fill="#1e293b" stroke="#059669"/>
          <text x="650" y="85" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Azure Load Balancer</text>
          <text x="650" y="103" fill="#34d399" font-size="9" text-anchor="middle">Layer 4 (TCP / UDP)</text>
          <text x="650" y="125" fill="#94a3b8" font-size="9" text-anchor="middle">• Ultra-low Latency</text>
          <text x="650" y="140" fill="#94a3b8" font-size="9" text-anchor="middle">• Public & Internal</text>
          <text x="650" y="155" fill="#94a3b8" font-size="9" text-anchor="middle">• Port Forwarding / NAT</text>
        </svg>
      </div>
    `
  },

  // --- DOMAIN 5: MONITORING & RECOVERY ---
  '5-1-t1': {
    badge: 'OBSERVABILITY PIPELINE • AZURE MONITOR',
    title: 'สถาปัตยกรรมระบบติดตามและวิเคราะห์ข้อมูล Azure Monitor Pipeline',
    desc: 'รวบรวม Metrics และ Logs จากทุก Resource บน Azure แล้วส่งเข้า Log Analytics เพื่อวิเคราะห์ด้วย KQL และแจ้งเตือนผ่าน Action Groups',
    labUrl: 'monitor-lab.html',
    labText: '🔬 เปิดทดลองเขียน KQL & ตั้งค่า Alert ใน Monitor Lab →',
    html: `
      <div class="diag-flow">
        <div class="diag-flow-step">
          <i>DATA SOURCES</i>
          <b>Activity & Diagnostics</b>
          <p>Metrics, Resource Logs, Guest OS Telemetry</p>
          <span class="diag-tag blue">Telemetry Collection</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step highlight">
          <i>STORE & QUERY</i>
          <b>Log Analytics (KQL)</b>
          <p>เขียน Kusto Query ดึง Insight และสถิติ Real-time</p>
          <span class="diag-tag purple">Centralized Workspace</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step">
          <i>TRIGGER</i>
          <b>Alert Rules</b>
          <p>ประเมินเงื่อนไข (Threshold, Metric, Log search)</p>
          <span class="diag-tag amber">Evaluation Engine</span>
        </div>
        <div class="diag-arrow">➔</div>
        <div class="diag-flow-step">
          <i>RESPONSE</i>
          <b>Action Groups</b>
          <p>Email, SMS, Push, Webhook, Logic Apps, ITSM</p>
          <span class="diag-tag green">Notification & Auto-healing</span>
        </div>
      </div>
    `
  },

  '5-2-t1': {
    badge: 'DISASTER RECOVERY MATRIX • BACKUP VS ASR',
    title: 'ความแตกต่างระหว่าง Azure Backup และ Azure Site Recovery (ASR)',
    desc: 'Azure Backup เน้นการสำรองข้อมูลย้อนหลัง (Point-in-time Restore) ส่วน ASR เน้นความต่อเนื่องของธุรกิจเมื่อเกิดภัยพิบัติ (Disaster Recovery & Failover)',
    labUrl: 'recovery-lab.html',
    labText: '🔬 เปิดทดลองจำลอง Disaster Recovery ใน Recovery Lab →',
    html: `
      <div class="diag-grid">
        <div class="diag-box highlight">
          <b>💾 Azure Backup</b>
          <span>สำรองข้อมูลแบบ Snapshot รายวัน/รายสัปดาห์ เก็บย้อนหลังได้นานนับปี</span>
          <span class="diag-tag blue">Granular Point-in-Time Restore</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)"><b>Use Case:</b> กู้คืนไฟล์เดี่ยวที่เผลอลบ, เครื่องติดไวรัส Ransomware, Database ย้อนหลัง</p>
        </div>
        <div class="diag-box">
          <b>⚡ Azure Site Recovery (ASR)</b>
          <span>Replicate ข้อมูลแบบ Real-time ข้าม Region พร้อมกด <b>Failover</b> สลับระบบทันที</span>
          <span class="diag-tag green">Business Continuity & Low RTO/RPO</span>
          <p style="margin:6px 0 0;font-size:11px;color:var(--muted)"><b>Use Case:</b> Data Center ทั้งเมืองไฟดับ/น้ำท่วม สลับ VM ไปเปิดใช้งานใน Region สำรอง</p>
        </div>
      </div>
    `
  }
};

// Helper to render diagram card inside topic content
function renderDiagram(topicId) {
  const d = DIAGRAMS[topicId];
  if (!d) return '';
  return `
    <div class="study-diagram" id="diag-${topicId}">
      <div class="diagram-badge">${d.badge}</div>
      <h4 class="diagram-title">${d.title}</h4>
      <p class="diagram-desc">${d.desc}</p>
      ${d.html}
      ${d.labUrl ? `<a class="diag-lab-link" href="${d.labUrl}">${d.labText}</a>` : ''}
    </div>
  `;
}
