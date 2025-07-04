# 🟣 Intervue Polling

Live, real-time interactive polling platform for classrooms, interviews, and workshops.

 **Frontend**: [Intervue Polling on Vercel](https://polling-app-frontend-delta.vercel.app/)
 **Backend**: [Polling API on Render](https://polling-rr4j.onrender.com/)

---

## ✨ Overview

**Intervue Polling** lets teachers and students connect seamlessly:

* Teachers can create live polls and monitor responses.
* Students join, submit answers, and see live results.
* Everyone can chat in real-time.

---

## 🛠️ Features

```mermaid
flowchart TD
    A[Backend<br/>Features]
    
    A --> B[Poll<br/>Creation]
    A --> C[Answer<br/>Submit]
    A --> D[Live<br/>Results]
    A --> E[Auto<br/>End]
    A --> F[User<br/>Mgmt]
    A --> G[Chat]
    A --> H[Kick<br/>Out]
    A --> I[History]
    A --> J[CORS]
    
    F --> F1[Join/<br/>Leave]
    F --> F2[Kick]
    
    style A fill:#1e293b,stroke:#64748b,stroke-width:2px,color:#ffffff
    style F fill:#4c1d95,stroke:#8b5cf6,stroke-width:2px,color:#ffffff
    style F1 fill:#dc2626,stroke:#ef4444,stroke-width:2px,color:#ffffff
    style F2 fill:#dc2626,stroke:#ef4444,stroke-width:2px,color:#ffffff
```
---

## ⚙️ How It Works

Here’s a simple flow of interactions:

```mermaid
sequenceDiagram
  participant Teacher
  participant Backend
  participant Student

  Teacher->>Backend: Create Poll
  Backend-->>Student: New Poll Broadcast
  Student->>Backend: Submit Answer
  Backend-->>Teacher: Update Results
  Backend-->>Student: Update Results
  Teacher->>Backend: End Poll
  Backend-->>All: Poll Ended
```

---

## 🏛️ Architecture

```mermaid
graph TD
    A[Frontend<br/>React + Vite]
    B[Backend<br/>Node.js + Express + Socket.IO]
    C[MongoDB /<br/>Future Storage]
    
    A -->|WebSocket| B
    B -->|REST & WebSocket| A
    B -->|Future Data| C
```

**Frontend:**

* React + Tailwind CSS
* Deployed on Vercel

**Backend:**

* Express server with Socket.IO
* Deployed on Render

---

##  Main Functionalities

🔹 **Polling**

* Create and end polls live
* Monitor who answered

🔹 **Answer Tracking**

* Show counts and percentages in real-time

🔹 **Kick-out**

* Remove disruptive participants

🔹 **Chat**

* Bi-directional messaging across all users

---


##  Challenges Faced

-  Handling **real-time updates** over Socket.IO without race conditions.
-  Making sure results persisted when students or teachers reconnected.
-  Smooth UX when polls ended automatically or when all students answered.
-  Deploying CORS-safe backend and frontend separately.
-  Managing state transitions between **waiting**, **answering**, and **results view**.

---

##  Getting Started Locally

```bash
# Clone Frontend
git clone https://github.com/Rohit-554/PollingApp_Frontend.git
cd polling-frontend
npm install
npm run dev
```


 Update the frontend `socket` URL in `socket.js` to your local backend or Render backend.

---

##  Live Demo

🔗 **Frontend:** [Intervue Polling](https://polling-app-frontend-delta.vercel.app/)
🔗 **Backend:** [API](https://polling-rr4j.onrender.com/)

---

## 🖼️ Screenshots

### 🚀 Landing Page

![Landing Page](https://raw.githubusercontent.com/Rohit-554/PollingApp_Frontend/refs/heads/master/images/LandingPage.png)

---

### 🎓 Student Experience

**Student Login & Chat:**

![Student Login With Chat](https://github.com/Rohit-554/PollingApp_Frontend/blob/master/images/StudentLoginWithChat.png?raw=true)

**Question Received:**

![Question Received](https://github.com/Rohit-554/PollingApp_Frontend/blob/master/images/QuestionReceived.png?raw=true)

**Answer Given by Two Students:**

![Answers Given](https://github.com/Rohit-554/PollingApp_Frontend/blob/master/images/AnswerGivenBytwo.png?raw=true)

**Waiting for Poll:**

![Student Loading](https://github.com/Rohit-554/PollingApp_Frontend/blob/master/images/StudentLoading.png?raw=true)

---

### 👩‍🏫 Teacher Experience

**Ask Question:**

![Teacher Ask Question](https://github.com/Rohit-554/PollingApp_Frontend/blob/master/images/TeacherAskQuestion.png?raw=true)

**Waiting for Responses:**

![Teacher Waiting](https://github.com/Rohit-554/PollingApp_Frontend/blob/master/images/TeacherWaiting.png?raw=true)

---

### 📊 Results

![Poll Result](https://github.com/Rohit-554/PollingApp_Frontend/blob/master/images/pollResult.png?raw=true)


##  Author

Built with ❤️ by Rohit

