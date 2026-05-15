# 🚀 EduHub LMS — Scalable Backend System (C.R.A.C.K Project)

> A production-oriented Learning Management System (LMS) backend designed with real-world business processes, scalable architecture, and financial workflow modeling.

---

# 📚 Table of Contents

- [📖 Overview](#-overview)
- [🧠 Business Flow](#-business-flow)
- [🏗️ System Architecture](#️-system-architecture)
- [🧩 REA Data Modeling](#-rea-data-modeling)
- [🗃️ Database Design](#️-database-design)
- [⚙️ Engineering Decisions](#️-engineering-decisions)
- [🔐 Authentication & Authorization](#-authentication--authorization)
- [💡 Core Features](#-core-features)
- [📡 API Design](#-api-design)
- [🧪 Business Logic Example](#-business-logic-example)
- [🚀 Getting Started](#-getting-started)
- [🔧 Environment Variables](#-environment-variables)
- [📈 Scalability Considerations](#-scalability-considerations)
- [🔮 Future Enhancements](#-future-enhancements)
- [🧑‍💻 Author](#-author)
- [⭐ Why This Project Matters](#-why-this-project-matters)

---

# 📖 Overview

EduHub LMS is more than a CRUD application.

This project models how a real digital education platform operates, including:

- Student enrollment flow
- Payment verification
- Attendance tracking
- Learning progress monitoring
- Examination management
- Certificate issuance
- Instructor revenue calculation
- Payout processing

The system is built with a strong emphasis on:

- ✅ Scalable backend architecture
- ✅ Transaction-safe operations
- ✅ Business-oriented database design
- ✅ Real-world workflow implementation
- ✅ Clean separation of concerns

---

# 🧠 Business Flow

```text
Student
   ↓
Enroll Course
   ↓
Upload Payment Proof & Signed Approval Document
   ↓
Admin Verification
   ↓
Access Learning Modules
   ↓
Self Attendance Check-in
   ↓
Progress Tracking
   ↓
Exam & Retake System
   ↓
Certificate Issuance
```

```text
Instructor
   ↓
Publish Course
   ↓
Receive Student Enrollments
   ↓
Generate Revenue
   ↓
Withdraw Payout
```

---

# 🏗️ System Architecture

```text
Client (React.js)
        ↓
REST API (Express.js)
        ↓
Service Layer (Business Logic)
        ↓
Prisma ORM
        ↓
PostgreSQL (Supabase)
```

## 🔑 Architecture Principles

- API-first design
- Separation of concerns
- Service-based business logic
- Transaction-safe workflow
- Scalable relational database modeling
- Production-oriented backend structure

---

# 🧩 REA Data Modeling

This system follows the **Resources–Events–Agents (REA)** accounting and business modeling framework.

## 👤 Agents

- Students
- Instructors
- Admins

## ⚡ Events

- Enrollments
- Transactions
- Attendances
- Payouts
- Exam Results

## 💰 Resources

- Courses
- Financial flows
- Certificates

## 🧱 Supporting Entities

- Modules
- Exams
- Transactions
- Attendance Records
- Payout Records
- Certificates

This modeling approach ensures clarity between:

- Who performs actions
- What events occur
- What value is exchanged

---

# 🗃️ Database Design

## 📄 ERD Diagram

👉 https://dbdiagram.io/d/69f8960ac6a36f9c1bf9e72c

## ✨ Database Highlights

- Strong relational integrity using foreign keys
- Event-driven schema structure
- Separated Admin & Instructor entities
- ENUM-based controlled fields
- Audit-friendly timestamps
- UUID-ready scalable design

---

# ⚙️ Engineering Decisions

## ✅ Core Decisions

- Separate Admin and Instructor entities to avoid role ambiguity
- Use ENUM for statuses and controlled values
- Apply transaction-based workflow for financial operations
- Enforce business rules at database level
- Build audit-friendly entity relationships
- Design scalable and extensible architecture

## 🆕 Additional Improvements

### Direct Publish Workflow
Allows instructors to efficiently create and publish courses.

### Approval Document Requirement
Students must upload signed approval documents for legal compliance and enrollment validation.

---

# 🔐 Authentication & Authorization

## 🔑 Authentication

- JWT-based authentication
- Secure password hashing
- Protected route middleware

## 🛡️ Role-Based Authorization

```javascript
authorize(["ADMIN"]);
authorize(["INSTRUCTOR"]);
authorize(["STUDENT"]);
```

---

# 💡 Core Features

## 📊 Attendance System & Progress Tracking

- Student self check-in attendance
- Per-module attendance tracking
- Dynamic learning progress calculation (0–100%)
- Exam eligibility validation based on completion

---

## 💳 Transaction Verification System

- Upload payment proof
- Upload signed approval documents
- Admin verification workflow
- Prevent unauthorized course access

---

## 💰 Instructor Revenue Engine

- Revenue generated from enrollments
- Withdrawable balance tracking
- Payout management system

---

## 🧪 Examination System

- Scheduled exams
- Passing grade validation
- Multiple attempt support (retake)

---

## 🎓 Certification System

- Auto-generated certificates
- Linked to student and course completion
- Completion validation workflow

---

# 📡 API Design

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Multi-role login |
| POST | `/api/auth/register` | Student registration |
| GET | `/api/courses` | Retrieve course catalog |
| POST | `/api/courses/attendance` | Student self attendance |
| POST | `/api/courses/complete-module` | Update learning progress |
| GET | `/api/attendance/my` | Student attendance history |
| POST | `/api/transactions/upload-proof` | Upload payment proof & documents |
| PUT | `/api/transactions/verify/:id` | Admin verifies transaction |
| GET | `/api/payouts` | Instructor revenue tracking |

---

# 🧪 Business Logic Example

## Instructor Revenue Calculation

```javascript
const totalRevenue = enrolledStudents * instructorFee;
```

---

# 🚀 Getting Started

## 📦 Install Dependencies

```bash
npm install
```

## ⚙️ Generate Prisma Client

```bash
npx prisma generate
```

## 🗄️ Push Database Schema

```bash
npx prisma db push
```

## ▶️ Start Development Server

```bash
node src/server.js
```

---

# 🔧 Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
PORT=5000
```

---

# 📈 Scalability Considerations

This backend is designed for future scalability.

## 🚀 Ready For

- Horizontal scaling
- Redis caching layer
- Microservices migration
- Message queue/event-driven architecture
- Database indexing optimization
- Real-time features (WebSocket)

---

# 🔮 Future Enhancements

- Payment Gateway Integration
- Email Notification System
- WhatsApp Notification Integration
- Real-time Dashboard Updates
- Audit Logging System
- Advanced Analytics Dashboard
- Role-based reporting system

---

# 🧑‍💻 Author

## 👨‍💻 Bagus Samudro Aji Luhur

---

# ⭐ Why This Project Matters

This project demonstrates:

- Real-world backend engineering capability
- Understanding of business-oriented system architecture
- Strong relational database modeling
- REA implementation in software systems
- Financial workflow management
- Production-oriented backend thinking

---

# 💬 Philosophy

> “Good backend systems don’t just store data — they model reality.”

---

# 📌 Tech Stack

| Layer | Technology |
|------|-------------|
| Backend | Node.js |
| Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Authentication | JWT |
| Hosting | Railway / Render |
| Frontend | React.js |
| Database Hosting | Supabase |

---

# 📄 License

This project is developed for educational and portfolio purposes.