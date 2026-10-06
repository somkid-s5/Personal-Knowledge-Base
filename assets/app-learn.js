function isCodeLine(s){return s==='TableName'||s.startsWith('| ')||/^(az |Get-Az|Set-Az|New-Az)/.test(s)}
function renderLines(lines,topics=[]){
  const topicByIndex=new Map(topics.map(t=>[t.lineIndex,t]));
  let html='',i=0;
  while(i<lines.length){
    const ln=lines[i],topic=topicByIndex.get(i);
    if(topic){
      const diag=typeof renderDiagram==='function'?renderDiagram(topic.id):'';
      html+=`<h3 class="study-topic" id="${topic.id}">${esc(ln)}</h3>${diag}`;
      i++;continue;
    }
    if(/^Exam Trigger|^Scale Set Exam Trigger/i.test(ln)){html+=`<div class="study-callout trigger"><b>🎯 ${esc(ln)}</b></div>`;i++;continue}
    if(/^Exam Trap/i.test(ln)){html+=`<div class="study-callout trap"><b>⚠ ${esc(ln)}</b></div>`;i++;continue}
    if(/^Exam Rule/i.test(ln)){html+=`<div class="study-callout rule"><b>✓ ${esc(ln)}</b></div>`;i++;continue}
    if(ln.startsWith('•')){
      const arr=[];while(i<lines.length&&lines[i].startsWith('•')){arr.push(lines[i].slice(1).trim());i++}
      html+=`<ul class="study-list">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;continue
    }
    if(/^\d+\)/.test(ln)){
      const arr=[];while(i<lines.length&&/^\d+\)/.test(lines[i])){arr.push(lines[i].replace(/^\d+\)\s*/,''));i++}
      html+=`<ol class="study-steps">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`;continue
    }
    if(isCodeLine(ln)){
      const arr=[];while(i<lines.length&&isCodeLine(lines[i])){arr.push(lines[i]);i++}
      html+=`<pre class="study-code"><code>${esc(arr.join('\n'))}</code></pre>`;continue
    }
    if(i+1<lines.length&&(lines[i+1].trim()==='↓'||lines[i+1].trim()==='v')){
      const flowItems=[ln.trim()];
      let k=i+1;
      while(k+1<lines.length&&(lines[k].trim()==='↓'||lines[k].trim()==='v')){
        flowItems.push(lines[k+1].trim());
        k+=2;
      }
      if(flowItems.length>=2){
        html+=`<div class="scope-hierarchy-flow"><div class="hierarchy-flow-title">🔽 ลำดับชั้น Scope & โครงสร้างการสืบทอด (Inheritance Flow)</div><div class="hierarchy-flow-track">${flowItems.map((item,idx)=>{
          let icon='📦',badge='Level '+(idx+1),sub='ขอบเขตทรัพยากรระดับที่ '+(idx+1);
          if(/management\s*group/i.test(item)){icon='🌳';badge='Root Scope';sub='ขอบเขตบนสุด จัดการ Policy & สิทธิ์ RBAC ข้ามหลาย Subscription'}
          else if(/subscription/i.test(item)){icon='💳';badge='Billing & Quota';sub='ขอบเขตการคิดเงิน บัญชี และโควตาทรัพยากร'}
          else if(/resource\s*group/i.test(item)){icon='📁';badge='Lifecycle Boundary';sub='กลุ่มจัดการวงจรชีวิต จัดกลุ่มและลบ Resource พร้อมกัน'}
          else if(/resource/i.test(item)){icon='⚡';badge='Individual Resource';sub='ตัวทรัพยากรจริง เช่น VM, Storage Account, Virtual Network'}
          return `<div class="hierarchy-node"><div class="hierarchy-node-icon">${icon}</div><div class="hierarchy-node-content"><div class="hierarchy-node-header"><span class="hierarchy-node-name">${esc(item)}</span><span class="hierarchy-node-badge">${badge}</span></div><div class="hierarchy-node-desc">${sub}</div></div></div>${idx<flowItems.length-1?'<div class="hierarchy-connector"><span class="connector-arrow">↓</span><span class="connector-label">สิทธิ์ & Policy สืบทอดลงล่าง (Inherit Downward)</span></div>':''}`}).join('')}</div></div>`;
        i=k;continue;
      }
    }
    const nxt=lines[i+1]||'';
    if(ln.length<58 && nxt.startsWith('•')){html+=`<h4>${esc(ln)}</h4>`;i++;continue}
    if(ln.includes('→')) html+=`<p class="memory-line">${esc(ln)}</p>`;
    else html+=`<p>${esc(ln)}</p>`;
    i++;
  }
  return html;
}
function toc(d){
  return `<aside class="local-toc"><div class="toc-title">On this page</div>${d.objectives.map(o=>`<div class="toc-objective"><a href="#${o.id}">${esc(o.code)} ${esc(o.title)}</a><div class="toc-topics">${o.topics.map(t=>`<a href="#${t.id}">${esc(t.title)}</a>`).join('')}</div></div>`).join('')}</aside>`;
}
const DOMAIN_LABS = {
  identity: [
    {
      id: 'rbac-lab',
      title: '01 • RBAC / Policy / Locks Simulator',
      desc: 'ทดลองเปลี่ยน Scope, Role Assignment, Policy Effect และ Resource Locks บนลำดับชั้น Management Group → Resource',
      url: 'rbac-lab.html',
      tags: ['RBAC', 'Policy', 'Locks', 'Inheritance'],
      topicRef: '1-2-t1'
    }
  ],
  storage: [
    {
      id: 'storage-lab',
      title: '02 • Storage Redundancy & Failure Simulator',
      desc: 'จำลอง Datacenter Failure และ Region Failure เปรียบเทียบผลกระทบของ LRS, ZRS, GRS, GZRS และการสลับ Failover',
      url: 'storage-lab.html',
      tags: ['LRS', 'ZRS', 'GRS', 'Failover'],
      topicRef: '2-2-t1'
    },
    {
      id: 'storage-access-lab',
      title: '03 • Storage Access & SAS Token Simulator',
      desc: 'ทดลองสร้าง User Delegation SAS, Service SAS, Account SAS และ Stored Access Policy พร้อมทดสอบการ Revoke สิทธิ์',
      url: 'storage-access-lab.html',
      tags: ['SAS', 'Stored Policy', 'Entra ID', 'RBAC'],
      topicRef: '2-1-t1'
    }
  ],
  compute: [
    {
      id: 'compute-lab',
      title: '04 • VM Availability & Scale Simulator',
      desc: 'จำลองฮาร์ดแวร์ตู้ Rack เสียหาย (Fault Domain) และการ Autoscale ของ VM Scale Sets เมื่อทราฟฟิกพุ่งสูง',
      url: 'compute-lab.html',
      tags: ['Fault Domain', 'VMSS', 'Autoscale', 'Availability Zone'],
      topicRef: '3-2-t1'
    },
    {
      id: 'appservice-lab',
      title: '05 • App Service & Deployment Slots Simulator',
      desc: 'ทดลองสลับ Deployment Slot (Swap) จาก Staging สู่ Production แบบ Zero-Downtime พร้อมตั้งค่า Sticky Settings',
      url: 'appservice-lab.html',
      tags: ['Deployment Slot', 'Slot Swap', 'Scale Up/Out', 'VNet'],
      topicRef: '3-4-t1'
    },
    {
      id: 'containers-lab',
      title: '06 • Containers Workflow (ACR → ACI → ACA)',
      desc: 'จำลอง Pipeline การ Build Image เข้า ACR และ Deploy สู่ Container Apps พร้อมทดสอบ Scale-to-Zero และ Ingress',
      url: 'containers-lab.html',
      tags: ['ACR', 'ACI', 'Container Apps', 'Microservices'],
      topicRef: '3-3-t1'
    }
  ],
  networking: [
    {
      id: 'networking-lab',
      title: '07 • Packet / Connection Flow & NSG Simulator',
      desc: 'จำลองการส่งข้อมูลระหว่าง Subnet, ตรวจสอบลำดับการตรวจของ NSG 5-Tuple และการบังคับ Route ด้วย UDR Firewall',
      url: 'networking-lab.html',
      tags: ['NSG Rules', 'UDR Route', 'Subnet', 'Bastion'],
      topicRef: '4-2-t1'
    },
    {
      id: 'loadbalancing-lab',
      title: '08 • Load Balancing Decision Engine',
      desc: 'เลือกประเภท Load Balancer ที่ถูกต้อง (Azure LB, App Gateway, Front Door, Traffic Manager) ตามโจทย์ข้อสอบ',
      url: 'loadbalancing-lab.html',
      tags: ['Layer 4 vs 7', 'Global vs Regional', 'App Gateway'],
      topicRef: '4-3-t1'
    }
  ],
  monitoring: [
    {
      id: 'monitor-lab',
      title: '09 • Azure Monitor & KQL Query Studio',
      desc: 'เขียนคำสั่ง KQL วิเคราะห์ Log, สร้าง Metric Alert Rule และทดสอบ Alert Processing Rule ระงับการเตือนชั่วคราว',
      url: 'monitor-lab.html',
      tags: ['Log Analytics', 'KQL', 'Alert Rules', 'Action Group'],
      topicRef: '5-1-t1'
    },
    {
      id: 'recovery-lab',
      title: '10 • Backup vs Site Recovery (ASR) Simulator',
      desc: 'จำลองขั้นตอน Disaster Recovery กู้ไฟล์ด้วย Azure Backup และกด Failover / Reprotect สลับข้าม Region ด้วย ASR',
      url: 'recovery-lab.html',
      tags: ['Azure Backup', 'ASR Failover', 'Reprotect', 'Disaster Recovery'],
      topicRef: '5-2-t1'
    }
  ]
};

function openLabModal(url, title) {
  let modal = document.getElementById('labModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'labModal';
    modal.className = 'lab-modal';
    modal.innerHTML = `
      <div class="lab-modal-dialog">
        <div class="lab-modal-header">
          <div class="lab-modal-title"><span style="font-size:18px">🔬</span><span id="labModalTitle">Interactive Hands-on Lab</span></div>
          <div class="lab-modal-actions">
            <a id="labModalExt" class="btn" target="_blank" href="#">↗ เปิดหน้าเต็ม</a>
            <button class="btn primary" id="labModalClose">✕ ปิดแล็บ</button>
          </div>
        </div>
        <iframe class="lab-modal-frame" id="labModalFrame" src="about:blank"></iframe>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('labModalClose').onclick = closeLabModal;
    modal.onclick = (e) => { if (e.target === modal) closeLabModal(); };
  }
  document.getElementById('labModalTitle').textContent = title || 'Interactive Hands-on Lab';
  document.getElementById('labModalFrame').src = url;
  document.getElementById('labModalExt').href = url;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLabModal() {
  const modal = document.getElementById('labModal');
  if (modal) {
    modal.classList.remove('active');
    const frame = document.getElementById('labModalFrame');
    if (frame) frame.src = 'about:blank';
    document.body.style.overflow = '';
  }
}

function domain(slug){
  const d=DATA.domains.find(x=>x.slug===slug),p=domainPct(d);
  const labs = DOMAIN_LABS[slug] || [];
  const objs=d.objectives.map(o=>`<section class="objective-block" id="${o.id}"><div class="objective-title"><div><span>${o.code}</span><h2>${esc(o.title)}</h2></div><button class="btn objective-toggle" data-id="${o.id}">${state.objectives[o.id]?'Done ✓':'Mark done'}</button></div><div class="study-body">${renderLines(o.lines,o.topics)}</div></section>`).join('');

  const labsHtml = `
    <div class="domain-labs-section" id="domainLabsSection">
      <div class="card" style="margin-bottom:18px;background:linear-gradient(135deg,rgba(37,99,235,.15),rgba(14,26,43,.92))">
        <div class="eyebrow">HANDS-ON SIMULATION • DOMAIN ${d.n}</div>
        <h2 style="margin:6px 0 10px;font-size:22px">Visual Labs ประจำบท ${esc(d.displayTitle)}</h2>
        <p class="muted" style="margin:0;font-size:14px">แล็บทดลองแบบจำลองสถานการณ์จริง เน้น Decision Matrix ที่ออกข้อสอบ AZ-104 บ่อยที่สุด สามารถกดทดลองได้ทันที</p>
      </div>
      <div class="domain-labs-grid">
        ${labs.map(lab => `
          <div class="domain-lab-card">
            <div class="domain-lab-head">
              <h3 class="domain-lab-title">${esc(lab.title)}</h3>
              <div class="domain-lab-tags">${lab.tags.map(t => `<span class="domain-lab-tag">${esc(t)}</span>`).join('')}</div>
            </div>
            <p class="domain-lab-desc">${esc(lab.desc)}</p>
            <div class="domain-lab-actions">
              <button class="domain-lab-play-btn" data-lab-url="${lab.url}" data-lab-title="${esc(lab.title)}">🔬 เล่น Lab ทันทีในหน้านี้</button>
              <a class="domain-lab-ext-btn" href="${lab.url}" target="_blank">↗ เปิดหน้าต่างใหม่</a>
              ${lab.topicRef ? `<a class="mini-link" href="#${lab.topicRef}" style="margin-left:auto">📖 ดูเนื้อหาที่เกี่ยวข้อง →</a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  shell(slug,`
    <div class="crumbs"><a href="index.html">Home</a><span>›</span><span>${esc(d.displayTitle)}</span></div>
    <div class="lesson-head">
      <div>
        <div class="eyebrow">Domain ${d.n} • ${d.weight} • Google Drive complete source</div>
        <h1>${esc(d.displayTitle)}</h1>
        <p class="lead">${d.objectives.length} objectives • ${d.objectives.reduce((n,o)=>n+o.topics.length,0)} detailed sections • ${labs.length} Interactive Labs • ${qCount(slug)} questions</p>
      </div>
      <div class="card domain-progress-card">
        <b>${p.pct}% complete</b>
        <div class="progress" style="margin-top:8px"><i style="width:${p.pct}%"></i></div>
        <div class="stat-row"><span>${p.done}/${p.total}</span><span>objectives</span></div>
        <a class="mini-link" href="quiz.html?domain=${slug}">Practice ${qCount(slug)} questions →</a>
      </div>
    </div>

    <!-- Mode Switcher Tabs (Study / Interactive Labs / Quiz) -->
    <div class="domain-mode-bar">
      <button class="domain-mode-btn active" id="tabStudyBtn">📖 บทเรียน & Architecture</button>
      <button class="domain-mode-btn" id="tabLabsBtn">🧭 Interactive Visual Labs <span class="domain-mode-badge">${labs.length}</span></button>
      <a class="domain-mode-btn" href="quiz.html?domain=${slug}">🧪 ตะลุยโจทย์ <span class="domain-mode-badge">${qCount(slug)}</span></a>
    </div>

    <div class="domain-study-section" id="domainStudySection">
      <div class="content-source-note">📄 เนื้อหาหน้านี้ merge จาก Google Drive: <b>${esc(DATA.meta.title)}</b> • source updated ${esc(DATA.meta.sourceUpdated)}</div>
      <div class="lesson-content full-source">${objs}</div>
    </div>
    ${labsHtml}
  `,toc(d));

  // Toggle between Study mode and Labs mode
  const tabStudy = document.getElementById('tabStudyBtn');
  const tabLabs = document.getElementById('tabLabsBtn');
  const studySection = document.getElementById('domainStudySection');
  const labsSection = document.getElementById('domainLabsSection');

  function setMode(mode) {
    if (mode === 'labs') {
      tabLabs.classList.add('active');
      tabStudy.classList.remove('active');
      labsSection.classList.add('active');
      studySection.classList.add('hidden');
    } else {
      tabStudy.classList.add('active');
      tabLabs.classList.remove('active');
      studySection.classList.remove('hidden');
      labsSection.classList.remove('active');
    }
  }

  if (tabStudy && tabLabs) {
    tabStudy.onclick = () => setMode('study');
    tabLabs.onclick = () => setMode('labs');
  }

  // Hook all lab buttons to open in-page modal smoothly
  document.querySelectorAll('.domain-lab-play-btn, .diag-lab-link').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const url = btn.dataset.labUrl || btn.getAttribute('href');
      const title = btn.dataset.labTitle || btn.textContent.replace(/^🔬\s*/, '').replace(/\s*→$/, '');
      if (url && url !== '#') openLabModal(url, title);
    };
  });

  document.querySelectorAll('.objective-toggle').forEach(b=>b.onclick=()=>{const id=b.dataset.id;state.objectives[id]=!state.objectives[id];b.textContent=state.objectives[id]?'Done ✓':'Mark done';save()});
  const anchors=[...document.querySelectorAll('.objective-block,.study-topic')],links=[...document.querySelectorAll('.local-toc a')];
  const sync=()=>{let cur=anchors[0];anchors.forEach(a=>{if(a.getBoundingClientRect().top<150)cur=a});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur.id));lastSet(`${slug}.html#${cur.id}`,`${d.displayTitle} • ${cur.textContent.trim().slice(0,90)}`)};
  window.addEventListener('scroll',sync,{passive:true});sync();if(location.hash)setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView(),80);
}
function sectionFrom(label,arr){return `<section class="cram-section source-section"><div class="eyebrow">${esc(label)}</div>${renderLines(arr,[])}</section>`}
function cram(){
  const quickStart=DATA.intro.findIndex(x=>x.includes('กฎจำเร็ว'));
  const quick=quickStart>=0?DATA.intro.slice(quickStart+1):DATA.intro;
  shell('cram',`<div class="crumbs"><a href="index.html">Home</a><span>›</span><span>Cram Sheet</span></div><section class="hero compact-hero"><div class="eyebrow">LAST-MINUTE • FROM COMPLETE GOOGLE DOC</div><h1>Cram Sheet</h1><p class="lead">Quick rules, cross-topic comparisons และ trigger keywords ดึงจาก source เดียวกับเนื้อหาเต็ม</p></section><div class="cram-layout">${sectionFrom('High-yield rules',quick)}${sectionFrom('Cross-topic comparisons',DATA.crossTopic)}${sectionFrom('Last-minute keywords',DATA.keywords)}</div>`);
}
function flashcards(){
  let idx=Number(sessionStorage.getItem('az104-flash-index')||0)%FLASH.length,flipped=false,known=Number(localStorage.getItem('az104-flash-known')||0),review=Number(localStorage.getItem('az104-flash-review')||0);
  shell('flashcards',`<div class="crumbs"><a href="index.html">Home</a><span>›</span><span>Flashcards</span></div><div class="study-stage"><div class="eyebrow center">ACTIVE RECALL • ${FLASH.length} CARDS</div><h1 class="center">High-Yield Flashcards</h1><p class="center muted">สร้างจาก Last-minute keywords + Cross-topic comparisons ใน Complete Cheat Sheet</p><div class="flashcard" id="flashcard"><div class="flash-inner"><div class="flash-face"><span class="flash-label">QUESTION • CLICK TO FLIP</span><div class="flash-text" id="fq"></div></div><div class="flash-face flash-back"><span class="flash-label">ANSWER</span><div class="flash-text" id="fa"></div></div></div></div><div class="controls"><button class="btn" id="fp">←</button><button class="btn" id="fr">🔀 Random</button><button class="btn" id="frev">ต้องทวน</button><button class="btn primary" id="fknow">จำได้ ✓</button><button class="btn" id="fn">→</button></div><div class="center muted" id="fc"></div></div>`);
  const r=()=>{const f=FLASH[idx];fq.textContent=f.q;fa.textContent=f.a;fc.textContent=`${idx+1} / ${FLASH.length} • Known ${known} • Review ${review}`;flashcard.classList.toggle('flipped',flipped);sessionStorage.setItem('az104-flash-index',idx)};
  flashcard.onclick=()=>{flipped=!flipped;r()};fp.onclick=()=>{idx=(idx-1+FLASH.length)%FLASH.length;flipped=false;r()};fn.onclick=()=>{idx=(idx+1)%FLASH.length;flipped=false;r()};fr.onclick=()=>{idx=Math.floor(Math.random()*FLASH.length);flipped=false;r()};fknow.onclick=()=>{known++;localStorage.setItem('az104-flash-known',known);idx=(idx+1)%FLASH.length;flipped=false;r()};frev.onclick=()=>{review++;localStorage.setItem('az104-flash-review',review);idx=(idx+1)%FLASH.length;flipped=false;r()};r();
}
const JARGONS = [
  // --- FOUNDATION & IDENTITY ---
  {
    domain: 'identity',
    term: 'Tenant (เทแนนท์)',
    simple: '🏢 อาคารสำนักงานเสมือนจริงขององค์กร 1 บริษัทบน Cloud',
    desc: 'ขอบเขตสูงสุดของ Microsoft Entra ID สำหรับเก็บ Users, Groups, Devices และ Licenses ของบริษัทนั้นๆ 1 Tenant มีได้หลาย Subscription',
    exam: 'โจทย์พูดถึง "External company / Partner" → เชิญเข้า Tenant แบบ Guest User (B2B)'
  },
  {
    domain: 'identity',
    term: 'Subscription (การสมัครสมาชิก/บัญชีคิดเงิน)',
    simple: '💳 กระเป๋าตังค์และขอบเขตโควตาของทรัพยากร',
    desc: 'เป็นหน่วยที่ใช้รวมค่าใช้จ่ายและคำนวณบิลใน Azure และเป็น Scope สำหรับใส่ Policy และสิทธิ์ RBAC ให้กับทีมงาน',
    exam: 'โจทย์บอก "ต้องการแยกบิลแผนก Dev กับ Production" → สร้างแยกคนละ Subscription'
  },
  {
    domain: 'identity',
    term: 'Management Group',
    simple: '🌳 โฟลเดอร์ระดับบนสุดที่เอาไว้ใส่หลายๆ Subscription',
    desc: 'เอาไว้จัดการนโยบาย (Azure Policy) และสิทธิ์ RBAC ข้ามหลาย Subscription ในคำสั่งเดียว โดยสิทธิ์จะไหลลงมาสู่ Subscription และ Resource Group ข้างใต้เสมอ',
    exam: 'โจทย์บอก "ต้องการบังคับ Policy เดียวกันให้กับ 10 Subscriptions" → ผูกที่ Management Group'
  },
  {
    domain: 'identity',
    term: 'Management Plane vs Data Plane',
    simple: '🕹️ ปุ่มตั้งค่าตัวเครื่อง (Management) vs 📦 ข้อมูลที่เก็บอยู่ข้างใน (Data)',
    desc: 'Management Plane = สั่ง Start/Stop/Delete หรือเปลี่ยนขนาดเครื่อง • Data Plane = อ่าน/เขียนเนื้อไฟล์ข้างใน Storage หรือ Query ข้อมูลข้างใน Database',
    exam: 'เป็น Contributor จัดการ Storage ได้แต่ "อ่านไฟล์ข้างในไม่ได้" ถ้าไม่มีสิทธิ์ Storage Blob Data Reader'
  },
  {
    domain: 'identity',
    term: 'SSPR (Self-Service Password Reset)',
    simple: '🔑 ระบบให้พนักงานกดรีเซ็ตรหัสผ่านได้เอง ไม่ต้องโทรหาไอที',
    desc: 'อนุญาตให้ผู้ใช้รีเซ็ต Password ตัวเองผ่านหน้าเว็บโดยยืนยันตัวตนผ่าน Email, SMS หรือ Authenticator App',
    exam: 'โจทย์บอก "ลดภาระ Helpdesk เมื่อผู้ใช้ลืมรหัสผ่าน" → เปิดใช้งาน SSPR'
  },

  // --- STORAGE ---
  {
    domain: 'storage',
    term: 'Blob Storage',
    simple: '📦 ตู้เซฟเก็บไฟล์ทุกชนิด (รูปภาพ, วิดีโอ, Backup, เอกสาร)',
    desc: 'Binary Large Object เก็บข้อมูล Unstructured ปรับขนาดได้ไม่จำกัด แบ่งเป็น Block Blob (ไฟล์ทั่วไป), Page Blob (VHD Disk), และ Append Blob (Logs)',
    exam: 'โจทย์บอก "เก็บไฟล์ภาพนิ่งหรือไฟล์วิดีโอบน Cloud ราคาประหยัด" → Block Blob'
  },
  {
    domain: 'storage',
    term: 'SAS (Shared Access Signature)',
    simple: '🎟️ คูปองผ่านประตูชั่วคราว พร้อมระบุเวลาหมดอายุและสิทธิ์',
    desc: 'URL พร้อม Token พิเศษที่แนบไปด้วย ให้สิทธิ์คนภายนอกเข้าถึงไฟล์หรือ Container ในช่วงเวลาที่กำหนดโดยไม่ต้องบอก Master Access Key',
    exam: 'โจทย์บอก "ต้องการให้ลูกค้าดาวน์โหลดไฟล์ได้ใน 1 ชั่วโมงเท่านั้น" → สร้าง Service SAS พร้อมระบุ Expiry time'
  },
  {
    domain: 'storage',
    term: 'Stored Access Policy',
    simple: '📋 ใบอนุญาตส่วนกลางที่เอาไว้สั่ง "ยกเลิกคูปอง SAS" ได้ทันที',
    desc: 'Policy ที่ผูกไว้กับ Container เพื่อควบคุม SAS หลายๆ ใบ หากต้องการเปลี่ยนเวลาหมดอายุหรือเพิกถอนสิทธิ์ (Revoke) ให้แก้ที่ Stored Access Policy ได้ทันที',
    exam: 'โจทย์บอก "ต้องการสามารถ Revoke SAS ได้ก่อนเวลาหมดอายุโดยไม่ต้องเปลี่ยน Storage Key" → ใช้ Stored Access Policy'
  },
  {
    domain: 'storage',
    term: 'Blob Rehydration',
    simple: '🧊 การ "ละลายน้ำแข็ง" ดึงไฟล์จาก Archive กลับมาเป็น Hot/Cool',
    desc: 'ไฟล์ใน Archive Tier ถูกเก็บแบบ Offline ราคาถูกมาก ถ้าจะอ่านต้องสั่ง Rehydrate กลับมา โดยเลือกความเร็วแบบ Standard (สูงสุด 15 ชม.) หรือ High Priority (< 1 ชม.)',
    exam: 'โจทย์บอก "ต้องการดึงไฟล์ฉุกเฉินจาก Archive ให้เร็วที่สุดใน 1 ชั่วโมง" → Rehydrate ด้วย High Priority'
  },

  // --- COMPUTE ---
  {
    domain: 'compute',
    term: 'Fault Domain vs Update Domain',
    simple: '⚡ ตู้ไฟคนละตู้ (Fault) vs 🔄 คิวรีสตาร์ตอัปเดตคนละรอบ (Update)',
    desc: 'Fault Domain (FD) = ป้องกันฮาร์ดแวร์/สวิตช์เน็ต/ไฟดับในตู้ Rack เดียวกัน • Update Domain (UD) = ป้องกันเครื่องดับพร้อมกันตอน Microsoft อัปเดตแพตช์ OS',
    exam: 'Availability Set มีอย่างน้อย 2-3 Fault Domains และสูงสุด 20 Update Domains'
  },
  {
    domain: 'compute',
    term: 'Scale Up vs Scale Out',
    simple: '💪 เปลี่ยนเป็นเครื่องใหญ่ขึ้น (Up) vs 👯 ก็อปปี้เพิ่มจำนวนเครื่อง (Out)',
    desc: 'Scale Up = เพิ่ม CPU/RAM ให้เครื่องเดิม (อาจมี Downtime) • Scale Out = เพิ่มจำนวน VM จาก 2 เป็น 10 เครื่อง (ทำ Autoscale บน VMSS / App Service)',
    exam: 'โจทย์บอก "คนเข้าเว็บเยอะช่วงเที่ยง ให้เพิ่มจำนวนเครื่องอัตโนมัติ" → Scale Out บน VMSS หรือ App Service Plan'
  },
  {
    domain: 'compute',
    term: 'ACI vs ACA (Container Apps)',
    simple: '⚡ ACI = รถรับจ้างรอบเดียว vs 🚌 ACA = ระบบรถเมล์สายประจำมีคิวรถ',
    desc: 'ACI เหมาะกับงานเดี่ยวๆ สคริปต์สั้นๆ ไม่มีเว็บเซิร์ฟเวอร์ • ACA มี Ingress, ทำ Microservices, Scale-to-Zero, และเชื่อมต่อ API ระหว่างกันด้วย Dapr',
    exam: 'โจทย์บอก "ต้องการรัน Microservices ที่ปรับขนาดตาม HTTP Requests และลดเหลือ 0 ได้" → Azure Container Apps (ACA)'
  },

  // --- NETWORKING ---
  {
    domain: 'networking',
    term: 'CIDR Notation (เช่น /16, /24, /28)',
    simple: '🏠 ตัวเลขบอกขนาดของ "ห้องเช่า" และจำนวน IP ใน Subnet',
    desc: 'เลขยิ่งน้อย = วงใหญ่ IP ยิ่งเยอะ เช่น /16 ได้ 65,536 IPs • /24 ได้ 256 IPs (แต่ Azure ยึดจองไว้ 5 IPs เสมอ ดังนั้น /24 จะใช้ได้จริง 251 IPs)',
    exam: 'Azure หัก 5 IPs เสมอ: Network ID (.0), Gateway (.1), DNS (.2, .3), Broadcast (.255)'
  },
  {
    domain: 'networking',
    term: 'NSG (Network Security Group)',
    simple: '👮‍♂️ ป้อมยามตรวจคนเข้าเมืองหน้าหมู่บ้าน/หน้าห้อง',
    desc: 'Firewall พื้นฐานของ Azure ใช้กรองแพ็กเก็ต (Inbound/Outbound) ด้วย Source IP, Port, Destination IP, Port, Protocol เช็กเลข Priority 100 ถึง 4096 (เลขน้อยชนะ)',
    exam: 'โจทย์บอก "บล็อก Port 80 สำหรับ Subnet ทั้งหมด" → สร้าง Inbound Rule บน NSG ผูกกับ Subnet'
  },
  {
    domain: 'networking',
    term: 'ASG (Application Security Group)',
    simple: '🏷️ ป้ายห้อยคอเซิร์ฟเวอร์เพื่อจัดกลุ่มความปลอดภัย (ไม่ต้องจำ IP)',
    desc: 'ช่วยให้เขียนกฎใน NSG โดยอ้างอิงเป็นชื่อกลุ่ม เช่น Source = "WebServers", Destination = "DatabaseServers" แทนการกรอก IP Address รายเครื่อง',
    exam: 'โจทย์บอก "สร้างกฎความปลอดภัยสำหรับ VM หลายเครื่องโดยไม่ต้องอัปเดตกฎทุกครั้งที่เพิ่ม IP" → ใช้ Application Security Group (ASG)'
  },
  {
    domain: 'networking',
    term: 'Azure Bastion',
    simple: '🚪 อุโมงค์ลับเข้าหน้าจอเซิร์ฟเวอร์ผ่าน Browser แบบไม่ต้องมี Public IP',
    desc: 'บริการ PaaS สำหรับเชื่อมต่อ RDP/SSH เข้าหา Virtual Machine ผ่าน SSL (Port 443) บนเบราว์เซอร์โดยตรง ปลอดภัยจากการโดนสแกนพอร์ตจากอินเทอร์เน็ต',
    exam: 'โจทย์บอก "เข้าจัดการ VM อย่างปลอดภัยโดยไม่มี Public IP บนเครื่อง VM" → Azure Bastion'
  },
  {
    domain: 'networking',
    term: 'Service Endpoint vs Private Endpoint',
    simple: '🛣️ ถนนสายด่วนพิเศษ (Service) vs 🔌 ดึงปลั๊กไฟเข้ามาเสียบในห้องเรา (Private)',
    desc: 'Service Endpoint = ยังคงใช้ Public URL แต่ทราฟฟิกวิ่งบนสายไฟเบอร์ Azure • Private Endpoint = สร้าง Private IP ปลอมขึ้นมาใน Subnet ของเรา 100%',
    exam: 'โจทย์บอก "ต้องการให้ Storage Account มี IP อยู่ใน Subnet ของบริษัทแบบ 100% ปิด Public IP" → Private Endpoint'
  },
  {
    domain: 'networking',
    term: 'UDR (User-Defined Route / Route Table)',
    simple: '🗺️ ป้ายบอกทางบังคับเลี้ยวของแพ็กเก็ตเน็ตเวิร์ก',
    desc: 'ตารางเส้นทางที่เราสร้างเองเพื่อ Override เส้นทางดีฟอลต์ของ Azure เช่น บังคับให้ทราฟฟิกวิ่งไปตรวจที่ Firewall (Virtual Appliance) ก่อนออกเน็ต',
    exam: 'โจทย์บอก "ต้องการบังคับให้เน็ตทุกเครื่องวิ่งผ่าน Firewall ก่อนออก Internet" → สร้าง UDR Next Hop = Virtual Appliance'
  },

  // --- MONITORING ---
  {
    domain: 'monitoring',
    term: 'KQL (Kusto Query Language)',
    simple: '🔍 ภาษาค้นหาและวิเคราะห์ Log คล้ายคำสั่ง SQL แต่เร็วและสั้นกว่า',
    desc: 'ภาษาที่ใช้ค้นหาข้อมูลใน Azure Log Analytics เช่น <code>Heartbeat | where TimeGenerated > ago(1h) | summarize count() by Computer</code>',
    exam: 'คำสั่งสำคัญ: <code>where</code> (กรอง), <code>summarize</code> (นับ/หาค่าเฉลี่ย), <code>project</code> (เลือกคอลัมน์), <code>render</code> (วาดกราฟ)'
  },
  {
    domain: 'monitoring',
    term: 'Alert Rule vs Action Group vs Alert Processing Rule',
    simple: '🚨 เงื่อนไขเตือนภัย (Alert) vs 📢 กลุ่มคนรับสาย (Action) vs 🔕 โหมดห้ามรบกวน (Processing)',
    desc: 'Alert Rule = ตัวตรวจจับว่า CPU > 80% หรือไม่ • Action Group = สั่งส่งอีเมล/SMS/Webhook • Alert Processing Rule = สั่งปิดเสียงเตือนชั่วคราวตอนซ่อมบำรุง',
    exam: 'โจทย์บอก "ต้องการระงับการแจ้งเตือนช่วงปิดปรับปรุงเซิร์ฟเวอร์เสาร์-อาทิตย์" → Alert Processing Rule'
  },
  {
    domain: 'monitoring',
    term: 'Azure Backup vs Azure Site Recovery (ASR)',
    simple: '💾 แฟลชไดรฟ์สำรองไฟล์ (Backup) vs 🏢 อาคารสำรองพร้อมย้ายหนีน้ำท่วม (ASR)',
    desc: 'Azure Backup = เก็บ Snapshot ย้อนหลัง กู้เป็นรายไฟล์หรือทั้งเครื่องได้ • ASR = ก็อปปี้สถานะเครื่องแบบ Real-time ข้าม Region ถ้าเมืองหลักพัง กดสลับไปรันเมืองสองทันที',
    exam: 'โจทย์บอก "เผลอลบไฟล์ใน VM กู้คืนย้อนหลัง 3 วัน" → Azure Backup • "ศูนย์ข้อมูลหลักล่ม สลับไปเปิดใช้งานอีก Region" → ASR'
  }
];

function renderJargonCards(filter = 'all', search = '') {
  const grid = document.getElementById('jargonGrid');
  if (!grid) return;
  const q = search.trim().toLowerCase();
  const filtered = JARGONS.filter(j => {
    const matchCat = filter === 'all' || j.domain === filter;
    const matchSearch = !q || (j.term + ' ' + j.simple + ' ' + j.desc + ' ' + j.exam).toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map(j => `
    <article class="jargon-card">
      <div class="jargon-card-head">
        <h3 class="jargon-term">${esc(j.term)}</h3>
        <span class="jargon-domain-badge">${esc(j.domain)}</span>
      </div>
      <p class="jargon-simple">${esc(j.simple)}</p>
      <p class="jargon-desc">${esc(j.desc)}</p>
      <div class="jargon-exam">
        <b>🎯 ในข้อสอบจะเจอแบบนี้:</b> ${esc(j.exam)}
      </div>
    </article>
  `).join('') || '<div class="muted" style="padding:20px;grid-column:1/-1;text-align:center">ไม่พบคำศัพท์ที่ค้นหา</div>';
}

function jargon() {
  shell('jargon', `
    <div class="crumbs"><a href="index.html">Home</a><span>›</span><span>Jargon Buster</span></div>
    <section class="jargon-hero">
      <div class="eyebrow">FOUNDATION 0 TO 100 • AZURE JARGON BUSTER</div>
      <h1 style="margin:8px 0 10px;font-size:clamp(26px,4vw,38px)">พจนานุกรมศัพท์ปูพื้นฐาน Cloud & Azure</h1>
      <p class="lead" style="margin:0;color:#bfd0e6;font-size:15px">แปลศัพท์เทคนิคที่ยากๆ ให้เห็นภาพเหมือนเปรียบเทียบในชีวิตประจำวัน ปูพื้นฐานก่อนเริ่มเรียน Domain 1-5 เพื่อให้เข้าใจ 100%</p>
      <div class="jargon-filters">
        <button class="jargon-filter-btn active" data-cat="all">ทั้งหมด (${JARGONS.length})</button>
        <button class="jargon-filter-btn" data-cat="identity">👤 Identity & Governance</button>
        <button class="jargon-filter-btn" data-cat="storage">🗄️ Storage</button>
        <button class="jargon-filter-btn" data-cat="compute">🖥️ Compute</button>
        <button class="jargon-filter-btn" data-cat="networking">🌐 Networking</button>
        <button class="jargon-filter-btn" data-cat="monitoring">📈 Monitoring</button>
      </div>
      <input type="text" class="jargon-search-box" id="jargonSearch" placeholder="พิมพ์ค้นหาคำศัพท์ เช่น CIDR, SAS, Bastion, Tenant, Rehydrate...">
    </section>
    <div class="jargon-grid" id="jargonGrid"></div>
  `);

  renderJargonCards('all', '');

  let currentCat = 'all';
  document.querySelectorAll('.jargon-filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.jargon-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      const searchVal = document.getElementById('jargonSearch')?.value || '';
      renderJargonCards(currentCat, searchVal);
    };
  });

  const searchInput = document.getElementById('jargonSearch');
  if (searchInput) {
    searchInput.oninput = (e) => {
      renderJargonCards(currentCat, e.target.value);
    };
  }
}

function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}


