# Lab 04 — GKE Deployment, Service & Debugging

[Lab index](./README.md) · [GKE concepts](../Module-08-GKE-and-Kubernetes.md)

## เป้าหมายและ prerequisites

สร้าง Autopilot cluster ของ lab แล้ว deploy web Pods 2 replicas สร้าง ClusterIP service ใช้ port-forward และทดลอง selector mismatch เพื่อฝึกดู endpoints

ต้องมี billing/quota และสิทธิ์สร้าง/ลบ GKE cluster, ใช้ network ที่กำหนด, สร้าง SA/จัด project IAM สำหรับ node role, attach node SA ตาม prerequisites และจัด Kubernetes resources; network policy ขององค์กรต้องให้ client เชื่อม control plane ได้ ถ้าไม่มีสิทธิ์จัด IAM ให้ผู้ดูแลเตรียม node SA ที่ตรงข้อกำหนดให้ก่อน

**มีค่าใช้จ่าย GKE และ compute/workloads/network ที่เกี่ยวข้อง** ให้ทำเฉพาะเมื่อมี project lab ที่รองรับ ไม่สมมติว่าใช้ Free Tier ได้ครบ การสร้าง cluster อาจใช้หลายนาที

ตัวอย่างนี้ใช้ dedicated VPC/subnet และไม่ได้สร้าง public LoadBalancer service ลด resources ที่ต้อง cleanup แต่ยังต้องตรวจ cluster-created resources ใน project

## Task 1 — สร้าง network ของ lab

```bash
export PROJECT_ID="your-lab-project-id"
export REGION="us-central1"
gcloud config set project "$PROJECT_ID"
gcloud auth list
gcloud services enable container.googleapis.com compute.googleapis.com iam.googleapis.com \
  --project="$PROJECT_ID"

gcloud compute networks create ace-gke-vpc --subnet-mode=custom
gcloud compute networks subnets create ace-gke-subnet \
  --network=ace-gke-vpc --region="$REGION" --range=10.50.0.0/20
```

IP ranges ตัวอย่างต้องไม่ overlap กับ environment จริง Cluster creation จะจัด Pod/Service ranges ตาม flags/defaults ของ configuration ตรวจ output หลังสร้าง

## Task 2 — สร้าง Autopilot cluster

สร้าง node SA แยก และให้ role สำหรับ system tasks ตามเอกสารปัจจุบัน คน create cluster ต้องมี `actAs` บน SA นี้ด้วย:

```bash
export NODE_SA="ace-gke-nodes@${PROJECT_ID}.iam.gserviceaccount.com"
gcloud iam service-accounts create ace-gke-nodes --project="$PROJECT_ID"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${NODE_SA}" \
  --role="roles/container.defaultNodeServiceAccount"
```

```bash
gcloud container clusters create-auto ace-gke \
  --location="$REGION" \
  --network=ace-gke-vpc \
  --subnetwork=ace-gke-subnet \
  --service-account="$NODE_SA" \
  --project="$PROJECT_ID"
```

ตาม [GKE service accounts](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/service-accounts) node SA ต้องมี permissions สำหรับ system tasks และการดึง private Artifact Registry images ต้องจัด registry access เพิ่มตาม scenario Lab นี้ใช้ public NGINX image ไม่ grant Editor ให้ node SA

Expected: cluster Ready ภายหลัง provisioning ถ้า policy จำกัด public endpoint/allowed networks ต้องเลือก endpoint/access config ที่อนุญาต ไม่พยายามใช้ default command เพื่อฝืน policy

## Task 3 — เชื่อม kubectl

```bash
gcloud container clusters get-credentials ace-gke \
  --location="$REGION" --project="$PROJECT_ID"
kubectl config current-context
kubectl get nodes
kubectl create namespace ace-lab
```

Expected: context ชี้ cluster `ace-gke`; namespace ถูกสร้าง Autopilot node lifecycle ต่างจาก fixed node group จึงไม่บังคับว่าต้องเห็น nodes จำนวนเดิมทุกครั้ง

ถ้า authentication plugin ขาด ตรวจ GKE auth plugin/gcloud/kubectl ของ environment Cloud Shell ที่เตรียมไว้โดยทั่วไปมี tooling ตามระบบปัจจุบัน

## Task 4 — เขียน Deployment และ Service

```bash
mkdir -p ~/ace-lab-04
cd ~/ace-lab-04
cat > web.yaml <<'YAML'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ace-web
  namespace: ace-lab
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ace-web
  template:
    metadata:
      labels:
        app: ace-web
    spec:
      containers:
        - name: web
          image: nginx:stable
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: 250m
              memory: 512Mi
              ephemeral-storage: 1Gi
          readinessProbe:
            httpGet:
              path: /
              port: 80
---
apiVersion: v1
kind: Service
metadata:
  name: ace-web
  namespace: ace-lab
spec:
  type: ClusterIP
  selector:
    app: ace-web
  ports:
    - port: 80
      targetPort: 80
YAML

kubectl apply -f web.yaml
kubectl rollout status deployment/ace-web -n ace-lab --timeout=300s
kubectl get pods,services -n ace-lab
```

Expected: 2 Pods Ready และ service มี ClusterIP Autopilot อาจปรับ requests ตาม constraints ที่ใช้จริง อ่าน resulting spec ไม่สมมติว่า requests ใน manifest ไม่เคยถูก default/mutate

Image `nginx:stable` เป็นตัวอย่าง mutable upstream tag สำหรับ lab หากองค์กรห้าม Docker Hub ให้ใช้ approved compatible image และปรับ port/probe ให้ตรง

## Task 5 — ทดสอบผ่าน port-forward

```bash
kubectl port-forward service/ace-web 8080:80 -n ace-lab
```

เปิดอีก terminal แล้ว `curl http://localhost:8080` ควรได้หน้า NGINX กลับ terminal แรกกด Ctrl+C

**ข้อสำคัญ:** port-forward service เลือก Pod ผ่าน selector จึงไม่ได้ทดสอบ ClusterIP data path/Service routing ครบทั้งหมด ถ้าต้องทดสอบภายใน cluster ใช้ approved diagnostic Pod/client เพิ่มตาม network policy ของ environment

## Task 6 — สร้าง selector mismatch อย่างควบคุม

```bash
kubectl patch service ace-web -n ace-lab \
  --type=merge -p '{"spec":{"selector":{"app":"wrong-label"}}}'

kubectl get pods -n ace-lab --show-labels
kubectl get endpointslices -n ace-lab \
  -l kubernetes.io/service-name=ace-web -o yaml
```

Expected: selector ไม่ตรง Pod labels และไม่มี matching ready Pod addresses ใน EndpointSlice ของ service การที่ Pods Running ไม่ได้แปลว่า service routing ถูก

แก้กลับ:

```bash
kubectl apply -f web.yaml
kubectl get endpointslices -n ace-lab \
  -l kubernetes.io/service-name=ace-web
```

## Task 7 — อ่าน debugging signals

```bash
kubectl describe deployment ace-web -n ace-lab
kubectl get events -n ace-lab --sort-by=.metadata.creationTimestamp
kubectl logs deployment/ace-web -n ace-lab --tail=20
```

ถ้า Pod Pending อ่าน events; ถ้า ImagePullBackOff ตรวจ image/registry/identity/network; ถ้าไม่ Ready ตรวจ probe/application port ไม่แก้ทุก state ด้วยเพิ่ม replicas

## Cleanup

```bash
kubectl delete namespace ace-lab
gcloud container clusters delete ace-gke --location="$REGION" --project="$PROJECT_ID"
gcloud compute networks subnets delete ace-gke-subnet --region="$REGION"
gcloud compute networks delete ace-gke-vpc
gcloud projects remove-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${NODE_SA}" \
  --role="roles/container.defaultNodeServiceAccount"
gcloud iam service-accounts delete "$NODE_SA" --project="$PROJECT_ID"
```

Expected: cluster/workloads/network ของ lab ถูกลบ หาก network ลบไม่ผ่าน ตรวจ cluster deletion เสร็จหรือยังและ attached resources ที่เหลือ ไม่ลบ network อื่นทั้งหมดเพื่อให้คำสั่งผ่าน

ตรวจ GKE Console, disks, forwarding rules และ addresses ว่ามี resources ของแล็บเหลือหรือไม่ อย่าตีความ resources ของงานอื่นว่าเป็นของ lab จากชื่อใกล้กัน

## เอกสาร

- [create-auto](https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/create-auto)
- [Deploy workloads](https://docs.cloud.google.com/kubernetes-engine/docs/get-started/deploy-workloads)
- [Service](https://kubernetes.io/docs/concepts/services-networking/service/)
