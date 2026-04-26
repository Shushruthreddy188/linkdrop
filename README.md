# 🔗 LinkDrop — Instant Shareable Notes

[![Live Demo](https://img.shields.io/badge/Live-linkdrop.live-brightgreen?style=for-the-badge)](https://linkdrop.live)

Create a note. Share it instantly. Let it disappear.

LinkDrop is a lightweight full-stack application that allows users to create temporary notes and share them through unique expiring links. It is deployed on AWS EC2 with Nginx, HTTPS, and a custom domain.

---

## 🌐 Live Demo

👉 https://linkdrop.live

🔐 Secured with HTTPS using Let's Encrypt + Nginx  
☁️ Hosted on AWS EC2 Ubuntu  
🌍 Custom domain configured through Namecheap

---

## ✨ Features

* 📝 Create notes instantly
* 🔗 Generate unique shareable links
* ⏳ Expiry-based note access
* ⚡ Fast note retrieval through REST APIs
* 🚫 Expired and invalid link handling
* 🎯 Clean, minimal React UI
* 🔐 HTTPS-secured production deployment

---

## 🧩 Architecture Overview

```text
                🌐 Internet
                    │
                    ▼
        Custom Domain (linkdrop.live)
                    │
                    ▼
        ┌───────────────────────────┐
        │        Nginx (EC2)        │
        │  - HTTPS (SSL 🔐)         │
        │  - Reverse Proxy          │
        │  - Static File Serving    │
        └────────────┬──────────────┘
                     │
        ┌────────────┴──────────────┐
        ▼                           ▼
 React Frontend              FastAPI Backend
 (Static Build)              (Uvicorn @ 127.0.0.1:8000)
                                   │
                                   ▼
                      In-Memory Storage
                      (Expiry Logic ⏳)

```
---

## ⚙️ How It Works

* User writes a temporary note.
* Backend generates a unique note ID.
* Note is stored with an expiration timestamp.
* App creates a shareable link.
* Recipient opens the link.
* Backend checks whether the note is valid or expired.
* Valid notes are displayed, while expired or invalid links show an error state.

---

## 🧰 Tech Stack

**Frontend**
* React
* TypeScript
* Axios
* Vite

**Backend**
* FastAPI
* Python
* Uvicorn

**Infrastructure / DevOps**
* AWS EC2 (Ubuntu)
* Nginx (Reverse Proxy + HTTPS)
* Let's Encrypt (Certbot SSL)
* Systemd (Backend service management)
* Namecheap DNS
* Git + GitHub

---

## 🚀 Deployment Highlights

* Deployed on an AWS EC2 Ubuntu instance
* Custom domain configured: **linkdrop.live**
* HTTPS enabled using **Let's Encrypt (Certbot)**
* Nginx configured as:
  - Static frontend server
  - Reverse proxy to FastAPI backend
  - SSL termination
  - HTTP to HTTPS routing
* Backend runs as a persistent **systemd service**
* Frontend served from a production Vite build
* DNS A records configured through Namecheap to point to EC2

Backend service runs with:
```bash
uvicorn app.main:app --host 127.0.0.1 --port 8000
  ```
---

## 🔐 Security

* HTTPS enabled for secure browser access
* SSL certificate issued by Let's Encrypt
* Nginx handles SSL termination
* Backend runs privately on 127.0.0.1:8000
* Public traffic is routed through Nginx
* Certbot auto-renewal configured for SSL certificates
  
---

## 📡 API Example

```bash
GET /api/notes/{id}
```

Response:

```json
{
  "id": "abc123",
  "content": "Hello from LinkDrop 🔗",
  "created_at": "...",
  "expires_at": "..."
}
```
---

## 📸 Screenshots

<p align="center">
  <img width="700" alt="Create Note UI" src="https://github.com/user-attachments/assets/7265c969-b190-43fa-ac71-1bb1940d5e08" />
  <br/>
  <em>📝 Create Note — Clean UI to write and configure expiry for a new note</em>
</p>

<p align="center">
  <img width="700" alt="Generated Link" src="https://github.com/user-attachments/assets/d7791b92-d00c-49f5-9bff-10fcd6a423ce" />
  <br/>
  <em>🔗 Shareable Link Generated — Instant link creation with countdown-based expiry</em>
</p>

<p align="center">
  <img width="700" alt="View Note" src="https://github.com/user-attachments/assets/0960f1db-d04a-4cfd-affe-0dda9da71c37" />
  <br/>
  <em>📖 View Note — Recipient sees the note with expiration timestamp</em>
</p>


## ⚙️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/Shushruthreddy188/linkdrop.git
cd linkdrop
```

---

### 2. Backend setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Backend runs at: http://127.0.0.1:8000

---

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

## 🛣️ Roadmap

* 🗄️ Add persistent storage with PostgreSQL or AWS RDS
* 🧹 Add background cleanup job for expired notes
* 🔐 Add one-time view / self-destruct notes
* 📊 Add analytics for note creation and access counts
* 🎨 Add UI animations and polish
* 🐳 Add Docker support
* 🚀 Add CI/CD deployment pipeline

---

## ⭐ Why this project?

This project demonstrates:

* Full-stack development with React and FastAPI
* REST API design
* Expiry-based data handling
* Production deployment on AWS EC2
* Nginx reverse proxy configuration
* HTTPS setup with SSL certificates
* Systemd-based backend service management
* Custom domain and DNS configuration

---

## 👨‍💻 Author

Shushruth Kumar Reddy Mandadi

---

⭐ If you like it, give it a star!

