# 🔗 LinkDrop — Instant Shareable Notes

Create a note. Share it instantly. Let it disappear.

LinkDrop is a lightweight full-stack application that allows users to create temporary notes and share them via a unique link. Notes automatically expire after a set duration, making it perfect for quick, disposable communication.

---

## 🌐 Live Demo

👉 http://18.209.177.179/

⚠️ Note: The app is currently served over HTTP (no SSL), so the browser may mark it as "Not Secure".

*(Hosted on AWS EC2 with a custom backend service using FastAPI + Uvicorn)*

---

## ✨ Features

* 📝 Create notes instantly
* 🔗 Unique shareable links for each note
* ⏳ Expiry-based auto deletion
* ⚡ Fast retrieval via REST APIs
* 🎯 Clean and minimal UI
* 🚫 Expired / invalid link handling

---

## 🏗️ Architecture Overview

Frontend (React + TypeScript)
⬇️
Backend (FastAPI)
⬇️
In-memory / database storage (with expiry logic)
⬇️
Deployed on AWS EC2 (Linux)

---

## 🧰 Tech Stack

**Frontend**

* React
* TypeScript
* Axios

**Backend**

* FastAPI
* Python
* Uvicorn

**DevOps / Deployment**

* AWS EC2 (Ubuntu)
* Systemd service for backend
* Git + GitHub

---

## 🚀 Deployment Highlights

* Backend deployed as a **systemd service** on EC2
* Runs using:

  ```bash
  uvicorn app.main:app --host 127.0.0.1 --port 8000
  ```
* Service auto-starts on instance boot
* Frontend served separately (or via dev server / static build)
* API connected via EC2 public IP

---

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

---

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

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
---

## 🧠 Future Improvements

* 🔐 HTTPS with Nginx + SSL
* 🗄️ Persistent storage (PostgreSQL / RDS)
* 🧹 Background cleanup job for expired notes
* 🎨 UI polish and animations
* 📊 Analytics / usage tracking

---

## 👨‍💻 Author

Shushruth Kumar Reddy Mandadi

---

## ⭐ Why this project?

This project demonstrates:

* Full-stack development (React + FastAPI)
* REST API design
* Real-world deployment on AWS EC2
* Service management using systemd
* Handling time-based data expiration

---

⭐ If you like it, give it a star!
