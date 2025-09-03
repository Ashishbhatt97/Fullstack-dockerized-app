# 🚀 Full Stack Dockerized Application

This project is a **full-stack web application** built using **React (frontend)**, **Node.js + Express + Prisma (backend)**, and **PostgreSQL (database)**.  
The project provides two ways to run the application:

- **Option 1:** Using Docker (manual container setup)  
- **Option 2:** Using Docker Compose (automatic multi-service setup)

---

## 📂 Project Structure

```
.
├── client/             # React Frontend
    ├── Dockerfile/     # Frontend Dockerfile
├── server/             # Node.js + Express + Prisma Backend
│   ├── prisma/         # Prisma schema and migrations
    ├── Dockerfile/     # Backend Dockerfile
│   └── app/            # Backend source code
├── nginx               # nginx configuration folder
├── docker-compose.yml  # Docker Compose configuration
└── README.md           # Project Documentation
```

---

# Option 1: Run with Docker

In this approach, we build and run each container **manually**.

---

## **1️. Build & Run PostgreSQL Container**

```bash
docker run -d \
  --name postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=my_DB \
  -p 5433:5432 \
  postgres:17
```

### **Verify PostgreSQL**

```bash
docker logs postgres
```

---

## **2️. Build & Run Backend (Node.js + Prisma)**

### **Step 1: Build Docker Image**

```bash
docker build -t node-app ./server
```

### **Step 2: Run Container**

```bash
docker run -d \
  --name node-app \
  --network bridge \
  -p 5000:5000 \
  --env-file ./server/.env \
  node-app
```

### **Step 3: Access Container**

```bash
docker exec -it node-app sh
```

### **Step 4: Run Prisma Migrations**

```bash
npx prisma migrate deploy
npx prisma generate
```

---

## **3️. Build & Run Frontend (React)**

### **Step 1: Build Image**

```bash
docker build -t react-app ./app
```

### **Step 2: Run Container**

```bash
docker run -d \
  --name react-app \
  --network bridge \
  -p 5173:5173 \
  react-app
```

---

## **4️. Check Running Containers**

```bash
docker ps
```

---

# Option 2: Run with Docker Compose

This is the **recommended way** to run the entire application with a **single command**.

---

## **1️. Create `.env` Files**

### **Backend `.env`**

```env
DATABASE_URL=postgresql://<username>:<password>@postgres:5432/my_DB
PORT=5000
```

---

## **2️. Start All Services**

```bash
docker compose up --build
```

This will automatically:

* Start **PostgreSQL** database
* Start **Backend** with Prisma migrations
* Start **Frontend** React app

---

## **3️. Stop All Services**

```bash
docker compose down
```

---

## **4️. Check Logs**

```bash
docker compose logs -f
```

---

# 🔧 Prisma Commands (Inside Backend)

If you need to manage the database schema manually:

```bash
docker exec -it node-app npx prisma migrate dev
docker exec -it node-app npx prisma studio
```

---

# Application URLs

| Service    | URL                                            |
| ---------- | ---------------------------------------------- |
| Frontend   | [http://localhost:5173](http://localhost:5173) |
| Backend    | [http://localhost:5000](http://localhost:5000/api/v1) |

---

# 🛠 Troubleshooting

### **1. Error: `@prisma/client did not initialize yet`**

Run:

```bash
docker exec -it node-app npx prisma generate
```

### **2. Container Restart Loop**

Check container logs:

```bash
docker logs node-app
```

### **3. Rebuild Everything**

```bash
docker compose down -v
docker compose up --build
```

---
