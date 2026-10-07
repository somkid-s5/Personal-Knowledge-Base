# Project 03: Containerization Workbook

## 1. Scenario (สถานการณ์จำลอง)

เหตุการณ์จำลอง:
มีข้อความแจ้งเตือนจาก Slack ตอนเวลา 23:30 น. ในคืนวันอังคาร จาก CTO (พี่วุฒิ) แจ้งว่าระบบ Reward System ตัวเก่าที่ยังรันอยู่บน t2.micro instance ใน Region ap-southeast-1 กำลังมีปัญหา
- คนที่สร้างระบบนี้ลาออกไปแล้ว 18 เดือน และพี่วุฒิไม่ทราบวิธีการติดตั้งเลย
- เรามีนัดตรวจสอบระบบ (Audit) ในสัปดาห์หน้า และมีความจำเป็นต้องย้ายทุกอย่างไปที่ ECS Cluster ตัวใหม่
- หน้าที่ของเราคือทำการทำ Containerization เพื่อให้ระบบสามารถทำงานได้อย่างเสถียรภายในวันศุกร์นี้
- จากการ SSH เข้าไปตรวจสอบเบื้องต้น พบว่า Disk ในระบบเต็มไปแล้วกว่า 95% เนื่องจากมีรูปภาพที่ผู้ใช้อัปโหลดสะสมไว้จำนวนมาก

งานที่ต้องทำ:
คุณได้รับมอบหมายให้ดูแล Legacy Application ที่เหมือนเป็น Black Box
- แอปพลิเคชันเป็น Python Flask App ทำหน้าที่เป็น Reward Portal แบบง่ายๆ สำหรับพนักงาน
- ปัจจุบันตัวแอปพลิเคชันกำลังรันด้วยสิทธิ์ root บน Linux Server เพียงเครื่องเดียว หากเครื่องพัง ข้อมูลและระบบจะสูญหายทันที

สถานะปัญหาของระบบเดิม (Legacy Debt):
- Hardcoded Secrets: มีการใส่ค่า Database URL เป็น localhost:5432 ลงในไฟล์ app.py โดยตรง
- Unstable Dependencies: ไฟล์ requirements.txt ไม่ได้ระบุเวอร์ชันของ Library ทำให้เกิดปัญหาเมื่อสั่งรัน pip install แล้วทำให้เวอร์ชันเปลี่ยนไปเรื่อยๆ
- Local State: รูปภาพที่อัปโหลดถูกเก็บไว้ใน directory ชื่อ uploads/ บน Local Disk ซึ่งจะสูญหายทันทีเมื่อรันบน Container Environment แบบ Ephemeral
- Security Risk: รันแอปพลิเคชันด้วยสิทธิ์ root
- No Health Check: ไม่มีระบบตรวจสอบสถานะการทำงานจริงของแอปนอกจากการเปิด Refresh ดูหน้าเว็บ
- No .dockerignore: ไม่ได้กรองไฟล์ขยะอย่าง .pyc และ __pycache__ ออก ทำให้ถูก Copy เข้าไปใน Container ส่งผลให้ Image มีขนาดใหญ่

ข้อจำกัด (Constraints):
- Zero Downtime Migration: ต้องจำลองสภาพแวดล้อมเดิมให้ทำงานเหมือนกันบนเครื่องใดก็ได้ โดยปราศจากผลกระทบต่อผู้ใช้
- Cost Control: จำกัดงบประมาณการใช้งาน Server ให้ประหยัดที่สุด และเหมาะสมกับขนาดของแอป
- Production Standard: Final Container ต้องมีขนาดเล็ก มีความปลอดภัยสูง และพร้อมรันบน AWS ECS

เงื่อนไขการทำงานเสร็จสิ้น (Definition of Done):
- มีไฟล์ docker-compose.yml สำหรับรันและเชื่อมต่อ App, PostgreSQL และ Redis เข้าด้วยกัน
- มี Dockerfile แบบ Multi-stage Build ที่ช่วยลดขนาด Image ให้ต่ำกว่า 200MB
- จัดเก็บข้อมูลใน PostgreSQL แบบถาวรโดยใช้ Docker Volumes
- ย้ายการตั้งค่าและ Secrets ทั้งหมดของ App ไปไว้ที่ Environment Variables
- ต้องไม่มีการ Hardcode ค่า Database URL หรือ Secrets หลงเหลืออยู่
- แอปพลิเคชันใน Container ต้องไม่ทำงานด้วยสิทธิ์ root และใช้ Non-root User แทน

## 2. Topology Diagram (แผนผังระบบ)

![Topology Diagram](architecture.png)

แผนผังแสดงโครงสร้างระบบ (3-tier Containerized Architecture):

```mermaid
graph TD
    User([User]) -->|HTTP 5000| App[Flask App Container]
    App -->|SQL 5432| DB[PostgreSQL Container]
    App -->|TCP 6379| Redis[Redis Container]
    
    subgraph Storage
        Vol[(Docker Volume\nPostgres Data)] <--> DB
        HostDir[/Host Folder\nUploads/] <--> App
    end
    
    subgraph Orchestration
        DC[Docker Compose] --> App
        DC --> DB
        DC --> Redis
    end
```

องค์ประกอบหลักของระบบ (Components):
- Flask App (Frontend/API): พัฒนาขึ้นด้วย Dockerfile แบบ Multi-stage Build โดยรันด้วย Non-root User และเชื่อมต่อกับ Database และ Cache ผ่านทาง Service Name ของ Docker Compose
- PostgreSQL (Database): ใช้ Official Image postgres:15-alpine และบันทึกข้อมูลถาวรผ่าน Named Docker Volume พร้อมสร้าง Table อัตโนมัติด้วย init.sql ใน docker-entrypoint-initdb.d
- Redis (Cache): ใช้ Official Image redis:7-alpine สำหรับจัดเก็บ Cache หรือ Session

การใช้งานระดับ Production ในโลกจริง (In Real Life - IRL):
- Database: ในระบบจริงจะเปลี่ยนไปใช้งาน AWS RDS เพื่อรองรับ Automated Backup, Multi-AZ High Availability และรองรับการขยายระบบได้ง่ายกว่า
- Cache: เปลี่ยนจาก Redis Container เป็น AWS ElastiCache เพื่อการจัดการที่ง่ายและเสถียรยิ่งขึ้น
- Container Platform: ใช้ AWS ECS หรือ AWS EKS (Kubernetes) ร่วมกับ Load Balancer แทนการใช้ Docker Compose ในการจัดการคอนเทนเนอร์
- Storage: เปลี่ยนจาก Local Volume ไปใช้ AWS S3 หรือ AWS EFS สำหรับจัดเก็บไฟล์อัปโหลดอย่างถาวร (Persistent File Storage)

## 3. Prerequisites & Estimated Time (สิ่งที่ต้องเตรียมและเวลาที่ใช้)

สิ่งที่ต้องเตรียมก่อนเริ่มปฏิบัติงาน:
- Ubuntu 22.04 หรือ Windows Subsystem for Linux (WSL2)
- ติดตั้ง Docker Engine และ Docker Compose v2 เรียบร้อยแล้ว
- ความรู้พื้นฐานเกี่ยวกับภาษา Python และการจัดการ Package ด้วย pip
- ความเข้าใจพื้นฐานเกี่ยวกับ SQL Database และ Redis Cache

เวลาที่ใช้และงบประมาณ:
- เวลาที่ใช้โดยประมาณ: 12 ชั่วโมง
- ค่าใช้จ่ายในการรันระบบ: ฟรี เมื่อทดสอบในระดับ Local Machine หรือประมาณ $15 ต่อเดือนหากรันบน t3.micro EC2 Instance

## 4. Tasks (ขั้นตอนการปฏิบัติ)

### Task 1: การสำรวจและการปรับปรุงโครงสร้าง Source Code (Refactoring app.py)
แก้ไขปัญหา Hardcoded Secrets และการตั้งค่าที่ถูกระบุไว้โดยตรงในโค้ด โดยการเปลี่ยนมาดึงค่าผ่าน Environment Variables แทน
- ตรวจสอบไฟล์ src/app/app.py และเปลี่ยนวิธีการประกาศตัวแปรเชื่อมต่อ Database และ Redis
- ใช้ฟังก์ชัน os.environ.get() หรือ os.getenv() ในการอ่านค่า configuration ต่างๆ
- ตั้งค่า fallback หรือ default value ให้ระบบสามารถทดสอบระดับ Local ได้สะดวก
- ตัวอย่างโค้ดเชื่อมต่อที่แก้ไขแล้วใน app.py:
  ```python
  DB_URL = os.environ.get("DATABASE_URL", "postgresql://admin:supersecretpassword123@localhost:5432/rewards_db")
  REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")
  ```

### Task 2: การสร้างไฟล์กรองข้อมูลขยะ (.dockerignore)
สร้างไฟล์ .dockerignore เพื่อป้องกันไม่ให้คัดลอกไฟล์ขยะหรือไฟล์ที่ไม่จำเป็นเข้าสู่ Docker Image ซึ่งจะช่วยรักษาความปลอดภัยและประหยัดเวลา build
- สร้างไฟล์ .dockerignore ไว้ที่ directory เดียวกับ Dockerfile
- ระบุโฟลเดอร์หรือไฟล์ที่ห้าม copy เข้าไป เช่น venv, .env, .git, __pycache__, uploads/
- เนื้อหาไฟล์ src/docker/.dockerignore:
  ```text
  __pycache__/
  *.pyc
  *.pyo
  *.pyd
  .Python
  env/
  venv/
  .env
  .git/
  .gitignore
  *.original.md
  uploads/
  ```

### Task 3: การเขียน Multi-stage Dockerfile เพื่อลดขนาดของ Image
ประยุกต์ใช้เทคนิค Multi-stage Build เพื่อแยกขั้นตอนการ compile/build libraries และขั้นตอนการรัน runtime ช่วยลดขนาด Image และเพิ่มความปลอดภัย
- Stage 1 (builder): ใช้สำหรับติดตั้ง dependencies และ build extensions (เช่น psycopg2) ด้วย libpq-dev
- Stage 2 (runner): คัดลอกเฉพาะ package ที่ติดตั้งเสร็จแล้วจาก Stage builder มาใช้งานต่อ
- สร้าง Non-root User ชื่อ appuser และจำกัดการเข้าถึง root shell เพื่อความปลอดภัย
- ตั้งค่า HEALTHCHECK เพื่อตรวจสอบสถานะความพร้อมของ Flask App
- โค้ด Dockerfile ใน src/docker/Dockerfile:
  ```dockerfile
  # --- Build Stage ---
  FROM python:3.11-slim as builder

  WORKDIR /app

  # Install build dependencies
  RUN apt-get update && apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
      && rm -rf /var/lib/apt/lists/*

  # Install python dependencies
  COPY src/app/requirements.txt .
  RUN pip install --user --no-cache-dir -r requirements.txt

  # --- Final Stage ---
  FROM python:3.11-slim

  WORKDIR /app

  # Copy only the necessary files
  COPY --from=builder /root/.local /root/.local
  COPY src/app/ .

  # Add /root/.local/bin to PATH
  ENV PATH=/root/.local/bin:$PATH
  ENV PYTHONDONTWRITEBYTECODE=1
  ENV PYTHONUNBUFFERED=1

  # Run as non-root user for security
  RUN useradd -m appuser && chown -R appuser /app
  USER appuser

  EXPOSE 5000

  HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:5000/health || exit 1

  CMD ["python", "app.py"]
  ```

### Task 4: การตั้งค่าระบบจำลองด้วย Docker Compose (docker-compose.yml)
เขียนการตั้งค่า docker-compose.yml เพื่อควบคุมและเชื่อมต่อบริการทั้ง 3 ตัวเข้าด้วยกัน (App, PostgreSQL, Redis)
- เชื่อมต่อคอนเทนเนอร์เข้าหากันผ่าน User-defined Bridge Network เพื่อให้สื่อสารกันผ่านชื่อ Service ได้
- ใช้ Named Docker Volume ในการเชื่อมข้อมูลฐานข้อมูลให้คงอยู่ถาวร
- เพิ่มเงื่อนไข depends_on และ condition: service_healthy เพื่อให้ App เริ่มทำงานหลัง DB และ Redis พร้อมใช้งานจริง
- กำหนด Environment Variables ต่างๆ ผ่าน compose configuration
- ไฟล์ src/docker/docker-compose.yml:
  ```yaml
  version: '3.8'

  services:
    web:
      build:
        context: ../../
        dockerfile: src/docker/Dockerfile
      ports:
        - "5000:5000"
      environment:
        - DATABASE_URL=postgresql://user:pass@db:5432/thaidemo
        - REDIS_URL=redis://redis:6379/0
      depends_on:
        db:
          condition: service_healthy
        redis:
          condition: service_healthy
      networks:
        - app-network

    db:
      image: postgres:15-alpine
      environment:
        - POSTGRES_USER=user
        - POSTGRES_PASSWORD=pass
        - POSTGRES_DB=thaidemo
      volumes:
        - postgres_data:/var/lib/postgresql/data
      healthcheck:
        test: ["CMD-SHELL", "pg_isready -U user -d thaidemo"]
        interval: 5s
        timeout: 5s
        retries: 5
      networks:
        - app-network

    redis:
      image: redis:7-alpine
      healthcheck:
        test: ["CMD", "redis-cli", "ping"]
        interval: 5s
        timeout: 5s
        retries: 5
      networks:
        - app-network

  networks:
    app-network:
      driver: bridge

  volumes:
    postgres_data:
  ```

### Task 5: การรันและทดสอบระบบทั้งหมด (Build & Run)
สั่งรันระบบและตรวจสอบว่าบริการทั้งหมดขึ้นมาทำงานและติดต่อสื่อสารกันได้อย่างเรียบร้อย
- เข้าไปยัง directory ที่เก็บไฟล์ docker-compose.yml ไว้:
  ```bash
  cd src/docker
  ```
- รันคำสั่ง build และเปิดใช้งาน container ทั้งหมดในโหมด background:
  ```bash
  docker compose up --build -d
  ```
- ตรวจสอบประวัติบันทึกการทำงาน (Logs) ของตัวแอปพลิเคชัน:
  ```bash
  docker compose logs -f web
  ```

### Task 6: การตรวจสอบความเสถียรและความปลอดภัยของ Image (Vulnerability Scan)
ทำการตรวจสอบหาช่องโหว่ความปลอดภัยเบื้องต้นของ Docker Image ที่สร้างขึ้นมาก่อนจะนำไปปรับใช้งานจริงบน ECR/ECS
- ใช้เครื่องมือระดับมาตรฐานอุตสาหกรรมอย่าง Docker Scout หรือ Trivy ในการแสกน:
  ```bash
  docker scout quickview flask-app:latest
  ```

## 5. Verification (การตรวจสอบผลการทำงาน)

- [ ] อัปเดตไฟล์ app.py ให้ใช้ฟังก์ชัน os.getenv() หรือ os.environ.get() สำหรับการตั้งค่าเชื่อมต่อระบบทั้งหมดเรียบร้อยแล้ว
- [ ] สร้างไฟล์ .dockerignore เพื่อคัดกรองไฟล์ขยะภายนอก เช่น __pycache__, .pyc และ .env
- [ ] เขียน Dockerfile ด้วยเทคนิค Multi-stage Build และเปลี่ยนไปใช้ Non-root User
- [ ] ไดเรกทอรีสำหรับอัปเดตไฟล์ (uploads/) ถูกตั้งค่าและกำหนดสิทธิ์การเข้าถึงอย่างถูกต้อง
- [ ] สั่งรันคำสั่ง docker compose build ได้อย่างสมบูรณ์โดยไม่มี Error เกิดขึ้น
- [ ] สั่งรันคำสั่ง docker compose up -d และคอนเทนเนอร์ทั้ง 3 ตัว (web, db, redis) สตาร์ทขึ้นมาทำงานครบถ้วน
- [ ] สถานะของคอนเทนเนอร์แสดงผลเป็น healthy เมื่อรันตรวจสอบผ่าน docker compose ps
- [ ] ล็อกของคอนเทนเนอร์แสดงการทำงานของ Flask App ฟังการเรียกรับข้อมูลอยู่ที่ 0.0.0.0:5000
- [ ] ทดสอบยิง API: curl http://localhost:5000/health แล้วได้ response code เป็น 200 OK พร้อมข้อมูล json {"status": "healthy"}
- [ ] ข้อมูลใน PostgreSQL คงอยู่ถาวรเมื่อสั่งลบและรันคอนเทนเนอร์ขึ้นมาใหม่ด้วย docker compose down && docker compose up -d
- [ ] ไฟล์ที่ถูกอัปโหลดผ่านเว็บเข้าไป ปรากฏอยู่ใน directory ที่แชร์ข้อมูลกับเครื่อง Host
- [ ] ขนาดของ Docker Image สุดท้ายมีขนาดเล็กกว่า 200MB เมื่อตรวจสอบผ่านคำสั่ง docker image ls
- [ ] ตรวจสอบว่าแอปในคอนเทนเนอร์ทำงานโดยผู้ใช้อื่นที่ไม่ใช่ root ด้วยคำสั่ง docker exec -it <container_id> whoami ซึ่งต้องได้คำตอบเป็น appuser
- [ ] ไม่มีส่วนใดของ Source Code ที่มีการ Hardcode รหัสผ่านหรือ API Key

## 6. Troubleshooting (การแก้ไขปัญหาที่พบบ่อย)

ปัญหา 1: psycopg2.OperationalError: could not connect to server: Connection refused หรือ Redis Connection Refused
- สาเหตุ: ตัวแอปพลิเคชันพยายามมองหาบริการฐานข้อมูลที่ localhost:5432 หรือ Redis ที่ localhost:6379 ซึ่งอยู่ในเครื่องคอมพิวเตอร์เดียวกัน แต่บริการเหล่านั้นถูกจัดสรรให้อยู่คนละคอนเทนเนอร์ใน Docker Compose
- วิธีแก้ไข: แก้ไขการระบุตำแหน่งโฮสต์ (Host Configuration) ในไฟล์เชื่อมต่อ app.py หรือ .env โดยเปลี่ยนจาก localhost ให้ชี้ไปยังชื่อบริการ เช่น db และ redis ตามที่ระบุไว้ใน docker-compose.yml

ปัญหา 2: Is the server running on host "db" (172.x.x.x) and accepting TCP/IP connections on port 5432?
- สาเหตุ: คอนเทนเนอร์แอปพลิเคชัน (web) เริ่มต้นทำงานเร็วเกินไปในขณะที่ตัวบริการฐานข้อมูล (db) ยังจัดการตั้งค่าระบบภายในตัวเองไม่เสร็จสมบูรณ์ แม้ว่าจะตั้งค่า depends_on ไว้แล้วก็ตาม
- วิธีแก้ไข: กำหนดค่าตรวจสอบสถานะความพร้อม (healthcheck) และตรวจสอบเงื่อนไขความพร้อม (condition: service_healthy) ในบริการ db และ redis ในไฟล์ docker-compose.yml เพื่อรอให้ฐานข้อมูลเปิดพร้อมรับการเชื่อมต่อจริงก่อนที่แอปพลิเคชันจะรันขึ้นมา

ปัญหา 3: PermissionError: [Errno 13] Permission denied: '/app/uploads/image.png'
- สาเหตุ: แอปพลิเคชันถูกรันผ่าน user ทั่วไปที่ไม่ใช่ root (เช่น appuser หรือ flask) แต่ตัวโฟลเดอร์ภายนอก (Host) ถูกสร้างหรือใช้งานภายใต้สิทธิ์ที่เป็นของเครื่อง Local User อื่นที่ไม่ได้แชร์ permission หรือไม่ได้ตั้งค่าสิทธิ์ครอบครอง
- วิธีแก้ไข: ใช้คำสั่ง RUN mkdir -p /app/uploads && chown -R appuser:appuser /app/uploads ภายใน Dockerfile เพื่อตั้งค่าความเป็นเจ้าของ directory และอนุญาตสิทธิ์ให้กับ user ที่ทำงานในคอนเทนเนอร์ให้เรียบร้อย

ปัญหา 4: ModuleNotFoundError: No module named 'psycopg2'
- สาเหตุ: นำ base image ประเภท -slim หรือ -alpine มาใช้ในระบบ โดยไม่ได้ทำการเตรียมติดตั้ง system package หรือ libraries ที่สำคัญสำหรับการสร้างหรือคอมไพล์ psycopg2 (เช่น GCC หรือ client libraries)
- วิธีแก้ไข: ทำการติดตั้ง build dependencies เช่น build-essential, libpq-dev ใน builder stage หรือ apk add gcc musl-dev postgresql-dev ใน alpine ก่อนเริ่มต้นติดตั้ง requirements.txt ด้วย pip

ปัญหา 5: Data lost after docker compose down
- สาเหตุ: ไม่ได้ทำการแมป (Volume Mapping) เพื่อเก็บรักษาข้อมูลของ PostgreSQL ออกมานอกคอนเทนเนอร์แบบถาวร ส่งผลให้ข้อมูลถูกลบไปพร้อมกับวงจรชีวิตคอนเทนเนอร์
- วิธีแก้ไข: เพิ่มการตั้งค่า volume สำหรับแมป directory /var/lib/postgresql/data ในส่วนการตั้งค่า service db ในไฟล์ docker-compose.yml

ปัญหา 6: Image มีขนาดใหญ่เกินไป (Large Image Size)
- สาเหตุ: เรียกใช้ base image ขนาดใหญ่ทั่วไป เช่น python:3.9 ซึ่งรวมเครื่องมือสำหรับพัฒนาเต็มรูปแบบมาด้วยและไม่ได้กรองเอาเฉพาะ runtime ที่จำเป็นออกไป
- วิธีแก้ไข: เปลี่ยนไปใช้งาน base image ที่มีขนาดเล็ก เช่น รุ่น -slim หรือ -alpine และใช้เทคนิค Multi-stage build เพื่อดึงเอาเฉพาะ dependencies ที่จำเป็นสำหรับการรันโปรแกรมจริงเท่านั้น

ปัญหา 7: ขั้นตอน docker build ใช้เวลานานมากในการสร้าง Image ใหม่แต่ละรอบ (Slow builds)
- สาเหตุ: คำสั่งใน Dockerfile มีการสั่ง COPY source code ทั้งหมดเข้ามาใน Image ก่อนที่จะสั่งรันคำสั่ง pip install ซึ่งทำให้ Docker Build Cache แตกและต้องเริ่มดาวน์โหลด package ใหม่ทุกครั้งที่มีการเปลี่ยนโค้ด
- วิธีแก้ไข: ให้แยก COPY เฉพาะไฟล์ requirements.txt เข้าก่อนแล้วสั่งรัน pip install หลังจากนั้นจึงค่อยเขียน COPY source code ในบรรทัดท้ายๆ เพื่อประหยัดเวลา build โดยใช้ Cache เดิมของ dependencies ที่ติดตั้งไว้แล้ว

## 7. Exercises & Solutions (แบบฝึกหัดและแนวทางการแก้ไข)

### แบบฝึกหัดที่ 1 (ระดับง่าย): การตั้งค่า Redis จากภายนอก (Externalize Redis Config)
โจทย์:
ปัจจุบันระบบอ่านค่า Redis Host จาก config.ini หรือใช้ค่า Default เป็น localhost
- แก้ไข app.py ให้ตรวจสอบ Environment Variable ชื่อ REDIS_HOST เป็นอันดับแรก
- อัปเดต docker-compose.yml เพื่อส่งค่าตัวแปรนี้เข้าไปใน Container
- นำการพึ่งพา (Dependency) ของไฟล์ config.ini ออกทั้งหมด

แนวทางการแก้ไข:
ในส่วนของโค้ด app.py ปรับให้เรียกใช้ตัวแปรสภาพแวดล้อมดังนี้:
```python
REDIS_HOST = os.getenv("REDIS_HOST", config.get('redis', 'host', fallback='localhost'))
```
ในไฟล์ docker-compose.yml สำหรับแอป ให้ระบุ environment variable เพิ่มเติม:
```yaml
app:
  environment:
    - REDIS_HOST=redis
```

### แบบฝึกหัดที่ 2 (ระดับปานกลาง): การทำงานฐานข้อมูลอัตโนมัติ (Automated Database Migration)
โจทย์:
แอปพลิเคชันแบบเก่าจำเป็นต้องเข้าไปรันคำสั่ง SQL สคริปต์เตรียมฐานข้อมูลแบบ Manual ซึ่งเสี่ยงต่อการผิดพลาด
- สร้างสคริปต์ init.sql สำหรับสร้าง table ที่ src/db/
- ตั้งค่าผูกสคริปต์นี้ไปที่ /docker-entrypoint-initdb.d/ ของฐานข้อมูลในไฟล์ docker-compose.yml
- ตรวจสอบว่าระบบสร้าง table ให้อัตโนมัติเมื่อสั่งรันระบบขึ้นมาครั้งแรก

แนวทางการแก้ไข:
สร้างไฟล์โครงสร้างข้อมูลและสร้าง table สำหรับเตรียมไว้ที่ src/db/init.sql:
```sql
CREATE TABLE IF NOT EXISTS rewards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    points INTEGER
);
```
อัปเดตการตั้งค่าในไฟล์ docker-compose.yml ของ service db เพื่อแมปไฟล์สคริปต์เข้าไปยัง entrypoint directory:
```yaml
db:
  volumes:
    - postgres_data:/var/lib/postgresql/data
    - ./src/db/init.sql:/docker-entrypoint-initdb.d/init.sql
```

### แบบฝึกหัดที่ 3 (ระดับยาก): การสร้าง Docker Image แบบประหยัดพื้นที่ด้วย Alpine (Multi-Stage Build with Alpine)
โจทย์:
ทดสอบและหาวิธีการลดขนาดของ Final Image ที่สร้างขึ้นมาให้มีขนาดต่ำกว่า 100MB
- เปลี่ยนตัวตั้งต้น Base Image ใน Dockerfile ให้ไปใช้ python:3.11-alpine
- ความท้าทาย: Alpine Linux ใช้ musl แทน glibc ทำให้ต้องติดตั้ง system package เช่น gcc, musl-dev และ postgresql-dev เพื่อใช้งานคอมไพล์ psycopg2
- เปรียบเทียบขนาด Image ระหว่างรุ่น slim และ alpine
- อธิบายถึงผลกระทบและเหตุผลที่ alpine อาจก่อให้เกิดปัญหาเมื่อใช้งาน library ขนาดใหญ่อย่าง pandas หรือ numpy

แนวทางการแก้ไข:
ตัวอย่าง Dockerfile สำหรับรันระบบโดยอิงจาก alpine image (Optimized Dockerfile):
```dockerfile
# BUILDER
FROM python:3.11-alpine as builder
WORKDIR /build
RUN apk add --no-cache gcc musl-dev postgresql-dev libffi-dev
COPY src/app/requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# RUNNER
FROM python:3.11-alpine
WORKDIR /app
RUN apk add --no-cache libpq
RUN addgroup -S flask && adduser -S flask -G flask
COPY --from=builder /install /usr/local
COPY src/app/ .
RUN mkdir -p /app/uploads && chown -R flask:flask /app/uploads
USER flask
CMD ["python", "app.py"]
```
ผลการเปรียบเทียบขนาด Image:
- ขนาดสุดท้ายของ image ที่ลดรูปได้จะมีขนาดอยู่ที่ประมาณ 85MB (จากเดิมประมาณ 130MB บน slim หรือ 1GB บน image ปกติ)
- ข้อแนะนำเชิงปฏิบัติ: Alpine เหมาะกับบริการขนาดเล็กที่ไม่มีความซับซ้อน แต่หากต้องการใช้งาน library ในกลุ่ม data science เช่น pandas หรือ numpy อาจเกิดปัญหาความเข้ากันได้ของ C library (musl vs glibc) ทำให้ต้องใช้เวลา compile จาก source code นานมากและอาจเกิด runtime error ที่วิเคราะห์ยากในอนาคต

---

## Cost & Cleanup Safety

ถ้ารันเฉพาะ local Docker จะไม่สร้างค่า AWS โดยตรง แต่ถ้าต่อยอดไป ECR, EC2, EKS หรือ managed services ให้ตรวจราคาและ Billing ของ resource จริงก่อน deploy

หลังจบ lab:

- หยุดและลบ container/network/image ที่สร้างเพื่อทดลองเมื่อไม่ต้องใช้ต่อ
- ถ้า push image ไป ECR ให้ลบ image/repository ที่ไม่ต้องเก็บ
- ถ้าสร้าง EC2/EKS หรือ cloud resources เพิ่ม ให้ลบด้วยเครื่องมือ/IaC ตัวเดียวกับที่ใช้สร้าง
- ตรวจ Billing/Cost Explorer หากมีการ deploy ขึ้น AWS
