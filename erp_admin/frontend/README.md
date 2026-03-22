# AYRA ERP — Admin Frontend

A full-featured university ERP admin portal built with **React (Vite) + Tailwind CSS + Material UI (MUI)**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Install & Run

```bash
cd frontend
npm install
npm run dev
```

Then open: **http://localhost:5173**

---

## 🔐 Default Login Credentials

| Field    | Value       |
|----------|-------------|
| Username | `admin`     |
| Password | `admin@123` |

> **To change credentials:** Edit `src/context/AuthContext.jsx` — update the `DEFAULT_ADMIN` object at the top.

---

## 📁 Folder Structure

```
frontend/
├── public/
├── src/
│   ├── assets/              # Static assets (images, icons)
│   ├── components/
│   │   ├── common/          # Reusable components (StatCard, PageHeader, EmptyState)
│   │   └── layout/          # AdminLayout, Sidebar, Topbar
│   ├── context/
│   │   └── AuthContext.jsx  # Login state & credentials
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # All page components
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── StudentsPage.jsx
│   │   ├── TeachersPage.jsx
│   │   ├── AcademicsPage.jsx
│   │   ├── FinancePage.jsx
│   │   ├── CommunicationPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── theme/               # MUI theme customization
│   ├── utils/               # Helpers, constants
│   ├── App.jsx              # Root component + routing
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + Tailwind
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 + Vite | Frontend framework & build tool |
| Tailwind CSS | Utility-first CSS |
| Material UI (MUI) v5 | UI component library |
| React Router v6 | Client-side routing |
| Recharts | Charts & data visualization |
| Sora + DM Sans | Typography (Google Fonts) |

---

## 📋 Features

- ✅ **Login Page** — Secure admin authentication with show/hide password
- ✅ **Dashboard** — KPI stats, enrollment trend, fee collection, dept. distribution, activity feed
- ✅ **Students** — Table with search, filter by dept/year, status badges, CRUD actions
- ✅ **Teachers** — Faculty profiles, designations, subjects, ratings
- ✅ **Academics** — Course management, exam schedule, timetable tab
- ✅ **Finance** — Fee records, collection charts, expense breakdown
- ✅ **Communication** — Announcements, inbox messages, broadcasts
- ✅ **Settings** — Profile, security, notifications, university info, appearance
- ✅ **Responsive** — Works on mobile, tablet, and desktop
- ✅ **Notifications** — Topbar notification bell with unread count
- ✅ **Sidebar** — Collapsible on mobile, always visible on desktop

---

## 🔜 Next Steps (Backend Integration)

1. Replace `AuthContext.jsx` login logic with real API call
2. Replace mock data arrays in each page with `fetch`/`axios` calls to your backend
3. Add tenant ID header to all API requests once multi-tenancy is ready
4. Connect MUI DataGrid in Students/Teachers pages with server-side pagination

---

## 📄 License
MIT — Free to use and modify.
