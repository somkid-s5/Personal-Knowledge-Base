// Curated learning order. Keep this file the single source of truth for the website.
// These paths refer to existing Markdown in the repository; they are not new copies.
const number = (n) => String(n).padStart(2, '0');
const filesOf = (dir, names) => names.map(name => dir + '/' + name + '.md');
const group = (title, description, files) => ({ title, description, files });

const awsBase = 'AWS-SAA-C03/02-Architecture-Foundation';
const awsModules = filesOf(awsBase, [
  'Module-01-Architecting-Fundamentals',
  'Module-02-Account-Security',
  'Module-03-Networking-1',
  'Module-04-Compute',
  'Module-05-Storage',
  'Module-06-Database-Services',
  'Module-07-Monitoring-and-Scaling',
  'Module-08-Automation',
  'Module-09-Containers',
  'Module-10-Networking-2',
  'Module-11-Serverless',
  'Module-12-Edge-Services',
  'Module-13-Backup-and-Recovery',
]);
const awsLabs = filesOf(awsBase + '/Lab-Guide-TH', [
  'Lab-01-Console-and-CLI-TH',
  'Lab-02-Building-VPC-Infrastructure-TH',
  'Lab-03-Database-Layer-TH',
  'Lab-04-High-Availability-TH',
  'Lab-05-Serverless-Architecture-TH',
  'Lab-06-CloudFront-S3-Origin-TH',
  'Lab-07-Capstone-TH',
]);
const project = (number, name) => 'AWS-SAA-C03/03-Hands-On-Projects/project-' + number + '-' + name + '/README.md';
const gcp = 'GCP-ACE';
const gcpActivities = filesOf(gcp, [
  'Path-Activity-01-GSP282-TH',
  'Path-Activity-02-ACE-Study-Guide-TH',
  'Path-Activity-03-Foundation-TH',
  'Path-Activity-04-Core-Services-TH',
  'Path-Activity-05-Scaling-Automation-TH',
  'Path-Activity-06-GKE-TH',
  'Path-Activity-07-Cloud-Run-TH',
  'Path-Activity-08-Cloud-Run-Functions-TH',
  'Path-Activity-09-Database-Selection-TH',
  'Path-Activity-10-AI-Cloud-GPUs-TH',
  'Path-Activity-11-AI-Cloud-TPUs-TH',
  'Path-Activity-12-AI-Deployment-Types-TH',
  'Path-Activity-13-Logging-Monitoring-TH',
  'Path-Activity-14-Terraform-Getting-Started-TH',
  'Path-Activity-15-Load-Balancing-Skill-Badge-TH',
  'Path-Activity-16-Kubernetes-Applications-Skill-Badge-TH',
  'Path-Activity-17-Terraform-Build-Infrastructure-Skill-Badge-TH',
]);
const gcpModules = filesOf(gcp, [
  'Module-01-Foundations-and-Resource-Hierarchy',
  'Module-02-IAM-Service-Accounts-and-Security',
  'Module-03-Tools-Billing-and-Quotas',
  'Module-04-VPC-Firewall-NAT-and-DNS',
  'Module-05-Compute-Engine-and-Instance-Groups',
  'Module-06-Storage-and-Data-Protection',
  'Module-07-Databases-and-Data-Services',
  'Module-08-GKE-and-Kubernetes',
  'Module-09-Cloud-Run-and-Event-Driven-Services',
  'Module-10-Load-Balancing-and-Hybrid-Networking',
  'Module-11-Observability-and-Operations',
  'Module-12-Terraform-and-Infrastructure-as-Code',
  'Module-13-AI-Tooling-and-Modern-Services',
]);
const gcpLabs = filesOf(gcp + '/Lab-Guide-TH', [
  'Lab-01-Cloud-Shell-Storage-and-IAM',
  'Lab-02-Private-VM-IAP-and-NAT',
  'Lab-03-Cloud-Run-Revisions-and-Logs',
  'Lab-04-GKE-Deployment-and-Debugging',
  'Lab-05-Terraform-VPC-and-State',
  'Lab-06-Compute-Engine-Load-Balancing',
]);
const oracleFiles = (dir, names) => filesOf('Oracle-Database/' + dir, names);
const oracleLabs = filesOf('Oracle-Database/10-Labs', [
  'Lab-01-Architecture-Inspection',
  'Lab-02-Connection-and-Identity-Inspection',
  'Lab-03-DBCA-Planning-and-Verification',
  'Lab-04-Manual-Database-Creation-Planning',
  'Lab-05-Instance-Lifecycle-Read-Only',
  'Lab-06-Instance-Parameters-and-Diagnostics-Read-Only',
  'Lab-07-Shared-Server-and-CMAN-Read-Only',
  'Lab-08-PDB-Lifecycle-Read-Only',
  'Lab-09-Storage-and-Undo-Inspection',
  'Lab-10-Users-Roles-Security-Inspection',
  'Lab-11-Data-Movement-Read-Only',
  'Lab-12-Automated-Maintenance-Inspection',
  'Lab-13-Oracle-Performance-Triage-Read-Only',
]);

export const courses = [
  {
    dir: 'AWS-SAA-C03', name: 'AWS SAA-C03', icon: '☁️',
    description: 'เริ่มจาก Architecture → เข้าใจบริการ → ฝึกออกแบบ → ตอบโจทย์สถานการณ์',
    summary: '13 บท Architecture เป็นเส้นทางหลัก ตามด้วยเนื้อหา SAA ปัจจุบันและการทบทวน โปรเจกต์ขั้นสูงเป็นทางเลือกเสริม ไม่ใช่ข้อบังคับก่อนสอบ',
    stages: [
      group('พื้นฐาน Cloud Architecture', 'บท 01–05: แนวคิด Security, Networking, Compute และ Storage', awsModules.slice(0, 5)),
      group('ออกแบบระบบให้ดูแลได้จริง', 'บท 06–10: Database, Scaling, Automation, Containers และ Advanced Networking', awsModules.slice(5, 10)),
      group('บริการสมัยใหม่และความทนทาน', 'บท 11–13: Serverless, Edge และ Backup/Recovery', awsModules.slice(10, 13)),
      group('อัปเดตขอบเขต SAA-C03', 'กลับมาทบทวน Service Decision และหัวข้อเพิ่มเติมของการสอบ', [
        'AWS-SAA-C03/01-Certification-Core/CURRENT-SCOPE-DEEP-DIVE.md',
      ]),
      group('ฝึกคิดแบบสถาปนิก', 'ตอบ Scenario ด้วยเหตุผล แล้วทบทวนหัวข้อที่ยังสับสน', [
        'AWS-SAA-C03/01-Certification-Core/CURRENT-SCOPE-SCENARIOS.md',
      ]),
    ],
    supplements: [
      group('🧪 Labs ประกบความเข้าใจ', 'ฝึก 7 Labs ตามความพร้อมและค่าใช้จ่ายที่ยอมรับได้', awsLabs),
      group('🛠️ Portfolio Projects (เลือกทำ)', 'งานฝึกจริงบางโครงการจากชุด 00–34 ไม่ใช่เงื่อนไขจบ SAA', [
        project('00','preparation-setup'),
        project('01','s3-cloudfront'),
        project('06','3tier-architecture'),
        project('08','serverless-app'),
        project('10','cost-optimizer'),
        project('15','dr-system'),
        project('34','full-architecture'),
      ]),
      group('🧠 ทบทวนเพิ่มเติม', 'Visual, Cheat Sheet และ Mock Exam', [
        'AWS-SAA-C03/VISUAL-MEMORY-GUIDE-TH.md',
        'AWS-SAA-C03/02-Architecture-Foundation/Architecting-on-AWS_Cheat-Sheet.md',
        'AWS-SAA-C03/02-Architecture-Foundation/MOCK-EXAM-65.md',
        'AWS-SAA-C03/03-Hands-On-Projects/LEARNING_PATH.md',
      ]),
    ],
  },
  {
    dir: 'Azure-AZ-104', name: 'Azure AZ-104', icon: '🔷',
    description: 'อ่านภาพรวม Azure → ลงลึก AZ-104 → ฝึกแบบ Interactive',
    summary: 'วิชานี้ยังมีบท Markdown แบบรวม ไม่ได้แยกครบ 5 หมวดเป็นหน้าต่อเนื่อง ระบบ Learn, Lab, Flashcards และ Quiz หลักอยู่ในเว็บ Interactive อีกชุด',
    stages: [
      group('ทำความเข้าใจ Azure ก่อน', 'เริ่มจาก Visual Guide แล้วค่อยเข้าเนื้อหา AZ-104 แบบละเอียด', [
        'Azure-AZ-104/VISUAL-MEMORY-GUIDE-TH.md',
      ]),
      group('อ่านเนื้อหา AZ-104', 'Deep Dive รวมเป้าหมายการสอบ ไม่ใช่ 5 บทแยกแล้ว', [
        'Azure-AZ-104/AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md',
      ]),
    ],
    supplements: [
      group('🧪 เครื่องมือฝึก Azure', 'Learning App แยก: 10 Visual Labs, Flashcards และ Scenario Questions', []),
    ],
    external: [{ title: 'เปิด Azure Interactive Study', url: 'https://somkid-s5.github.io/az-104-master-cram-book/', description: 'แบบฝึกและ Quiz ภายนอก — ความคืบหน้ายังไม่เชื่อมกับเว็บนี้' }],
  },
  {
    dir: 'GCP-ACE', name: 'GCP ACE', icon: '🌤️',
    description: 'เรียนตาม 17 กิจกรรมต่อเนื่อง แล้วเปิด Module เจาะลึกเมื่อสงสัย',
    summary: 'เส้นทางหลักคือ 17 กิจกรรมตาม ACE Learning Path ที่จัดไว้ในโน้ต ไม่ใช่สลับไปมาระหว่าง Activity กับ Module',
    stages: [
      group('เริ่มใช้ Google Cloud', 'กิจกรรม 01–05: Console, Foundation, IAM, Core Services และ Scaling', gcpActivities.slice(0,5)),
      group('Container และ Application', 'กิจกรรม 06–09: GKE, Cloud Run, Functions และ Database', gcpActivities.slice(5,9)),
      group('Operations, AI และ IaC', 'กิจกรรม 10–14: GPU/TPU, Deployment, Monitoring และ Terraform', gcpActivities.slice(9,14)),
      group('ฝึกทักษะแบบบูรณาการ', 'กิจกรรม 15–17: Load Balancing, Kubernetes และ Terraform', gcpActivities.slice(14,17)),
    ],
    supplements: [
      group('🔬 Module เจาะลึก 13 บท', 'เปิดประกบ Activity เมื่ออยากเข้าใจเหตุผลและ Troubleshooting', gcpModules),
      group('🧪 Companion Labs 6 ชุด', 'ฝึกเพิ่มเติม ไม่ใช่คำตอบหรือขั้นตอนของแล็บที่มี Grader', gcpLabs),
      group('🧠 ทบทวนและเตรียมสอบ', 'Visual Guide, Cheat Sheet และโจทย์ Scenario', [
        'GCP-ACE/VISUAL-STUDY-GUIDE-TH.md',
        'GCP-ACE/CHEAT-SHEET.md',
        'GCP-ACE/EXAM-SCENARIOS.md',
        'GCP-ACE/ACE-MODERN-OBJECTIVES-DEEP-DIVE-TH.md',
      ]),
    ],
  },
  {
    dir: 'ISC2-CC', name: 'ISC2 CC', icon: '🛡️',
    description: 'พื้นฐาน Security → IAM/Network → Governance → Operations → Scenario',
    summary: 'เรียงตามความต่อเนื่องของแนวคิดตาม Study Plan: Domain 1 → 3 → 4 → 2 → 5 ไม่ใช่เรียงตามเลข Domain อย่างเดียว',
    stages: [
      group('พื้นฐาน Security และการป้องกันระบบ', 'เริ่ม CIA, Risk แล้วต่อ IAM และ Network Security', [
        'ISC2-CC/01-Security-Principles.md',
        'ISC2-CC/03-Identity-Access-Management.md',
        'ISC2-CC/04-Networking-Cloud-Security.md',
      ]),
      group('Governance, ความต่อเนื่องและการบริหารความเสี่ยง', '4 บทใน Domain 2', filesOf('ISC2-CC/02-Security-Governance', [
        '2.1-GRC','2.2-Redundancy-BC-DR','2.3-Security-Awareness','2.4-Metrics-KRI-Reporting',
      ])),
      group('Security Operations และ Incident Response', '5 บทใน Domain 5', filesOf('ISC2-CC/05-Security-Operations-Incident-Response', [
        '5.1-Data-Security','5.2-Security-Operations','5.3-Incident-Response',
        '5.4-Asset-Protection','5.5-Security-Testing',
      ])),
      group('Scenario และการทบทวน', 'ตรวจความเข้าใจ พร้อมย้อนกลับไปอ่านหัวข้อที่ผิด', [
        'ISC2-CC/CURRENT-SCOPE-SCENARIOS.md',
      ]),
    ],
    supplements: [
      group('🧠 โน้ตสรุป', 'แผนเรียน, ภาพช่วยจำ และ Cheat Sheet', [
        'ISC2-CC/STUDY-PLAN.md',
        'ISC2-CC/VISUAL-MEMORY-GUIDE-TH.md',
        'ISC2-CC/CHEAT-SHEET.md',
      ]),
    ],
  },
  {
    dir: 'Oracle-Database', name: 'Oracle Database', icon: '🗄️',
    description: 'Architecture → Instance → Listener → PDB → Storage → Security → Maintenance → Performance',
    summary: '31 บทเรียนตามลำดับ Lesson จริง (01–31) แยกเป็นหมวด DBA พร้อม Lab แบบ Read-only สำหรับฝึกเสริม',
    stages: [
      group('เข้าใจ Database Architecture', 'Lesson 01–02', oracleFiles('01-Core-Architecture', [
        'Lesson-01-Oracle-Database-Architecture-TH','Lesson-02-Accessing-Oracle-Database-TH',
      ])),
      group('ดูแล Instance', 'Lesson 03–06', oracleFiles('02-Instance-Administration', [
        'Lesson-03-Creating-Database-Using-DBCA-TH','Lesson-04-Creating-Database-Using-SQL-TH',
        'Lesson-05-Instance-Startup-Shutdown-TH','Lesson-06-Managing-Database-Instances-TH',
      ])),
      group('Oracle Net และ Listener', 'Lesson 07–11', oracleFiles('03-Networking-Listener', [
        'Lesson-07-Oracle-Net-Services-Overview-TH','Lesson-08-Configuring-Naming-Methods-TH',
        'Lesson-09-Configuring-and-Administering-the-Listener-TH','Lesson-10-Shared-Server-Architecture-TH',
        'Lesson-11-Oracle-Connection-Manager-TH',
      ])),
      group('CDB / PDB', 'Lesson 12–14', oracleFiles('04-Multitenant-CDB-PDB', [
        'Lesson-12-Creating-PDBs-from-Seed-TH','Lesson-13-Other-PDB-Creation-Techniques-TH',
        'Lesson-14-Managing-PDBs-TH',
      ])),
      group('Tablespace, Storage และ Undo', 'Lesson 15–18', oracleFiles('05-Storage-Tablespaces-Undo', [
        'Lesson-15-Database-Storage-Overview-TH','Lesson-16-Creating-and-Managing-Tablespaces-TH',
        'Lesson-17-Improving-Space-Usage-TH','Lesson-18-Managing-Undo-Data-TH',
      ])),
      group('Users, Roles และ Auditing', 'Lesson 19–22', oracleFiles('06-Users-Roles-Security', [
        'Lesson-19-User-Accounts-TH','Lesson-20-Privileges-and-Roles-TH',
        'Lesson-21-Profiles-and-Resource-Limits-TH','Lesson-22-Unified-Auditing-TH',
      ])),
      group('Data Movement และ Maintenance', 'Lesson 23–28', oracleFiles('08-Data-Movement-Maintenance', [
        'Lesson-23-Data-Movement-Overview-TH','Lesson-24-Loading-Data-TH',
        'Lesson-25-Transporting-Data-TH','Lesson-26-External-Tables-TH',
        'Lesson-27-Automated-Maintenance-Overview-TH','Lesson-28-Maintenance-Windows-and-Tasks-TH',
      ])),
      group('Monitoring และ SQL Performance', 'Lesson 29–31', oracleFiles('07-Monitoring-Troubleshooting', [
        'Lesson-29-Database-Performance-Overview-TH','Lesson-30-Monitoring-Database-Performance-TH',
        'Lesson-31-Analyzing-SQL-and-Access-Paths-TH',
      ])),
    ],
    supplements: [
      group('🧪 13 Companion Labs', 'Read-only / planning exercises — ไม่ได้ยืนยันว่าผ่านการรันจริง', oracleLabs),
      group('📖 เวอร์ชันและภาพช่วยจำ', 'ความต่างของ 19c/26ai และ Visual Guide', [
        'Oracle-Database/VISUAL-MEMORY-GUIDE-TH.md',
        'Oracle-Database/19c-to-26ai-DELTA.md',
        'Oracle-Database/09-Oracle-26ai-Current/README.md',
      ]),
    ],
  },
];
export const slug = (file) => file.toLowerCase().replace(/\.md$/, '').replace(/\/(readme|index)$/, '');
export const mainFiles = (course) => course.stages.flatMap(stage => stage.files);
export const extraFiles = (course) => course.supplements.flatMap(group => group.files);
