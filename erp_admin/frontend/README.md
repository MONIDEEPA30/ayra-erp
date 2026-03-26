# AYRA ERP - Frontend

React admin portal for the AYRA ERP system, built with Vite, MUI, Tailwind CSS, Axios, and Recharts.

## Getting Started

### Prerequisites
- Node.js 18+
- Backend API running on `http://localhost:5000`

### Install and Run

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Login

The login screen now supports multiple portal buttons:
- `Accounts`
- `HR`
- `Academics`
- `Master Admin`

At the moment, only `Master Admin` is enabled for actual login.

If you seeded the backend, the default Master Admin account is:
- Username: `admin`
- Password: `admin@123`

## Current Frontend Structure

```text
frontend/
|-- src/
|   |-- components/
|   |   |-- common/
|   |   |   |-- AdminManagement.jsx
|   |   |   |-- EmptyState.jsx
|   |   |   |-- FormDialog.jsx
|   |   |   |-- PageHeader.jsx
|   |   |   `-- StatCard.jsx
|   |   `-- layout/
|   |       `-- AdminLayout.jsx
|   |-- context/
|   |   `-- AuthContext.jsx
|   |-- hooks/
|   |   `-- useLocalStorage.js
|   |-- pages/
|   |   |-- AcademicsPage.jsx
|   |   |-- CommunicationPage.jsx
|   |   |-- DashboardPage.jsx
|   |   |-- FinancePage.jsx
|   |   |-- LoginPage.jsx
|   |   |-- MyAdminsPage.jsx
|   |   |-- NotFoundPage.jsx
|   |   |-- SettingsPage.jsx
|   |   |-- StudentsPage.jsx
|   |   `-- TeachersPage.jsx
|   |-- theme/
|   |   `-- index.js
|   |-- utils/
|   |   |-- api.js
|   |   |-- constants.js
|   |   `-- helpers.js
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
`-- vite.config.js
```

## Main Screens

- `LoginPage`: Master Admin login with portal selector
- `DashboardPage`: live KPIs, charts, quick add student, Master Admin controls
- `StudentsPage`: list, search, filter, create, edit, delete students
- `TeachersPage`: list and manage faculty
- `AcademicsPage`: manage courses and exam schedules
- `FinancePage`: fee records, payment entry, finance charts
- `CommunicationPage`: announcements and communication overview
- `MyAdminsPage`: active admins, removed admins, service history, admin activity stats
- `SettingsPage`: profile, security, notifications, appearance, admin management

## Shared UI Components

- `FormDialog.jsx`: common styled popup shell for add/edit forms
- `AdminManagement.jsx`: reusable admin CRUD panel used in dashboard and settings
- `AdminLayout.jsx`: sidebar, topbar, notifications, and global search

## Global Search

The dashboard/top layout search bar is now a global search. It fetches live suggestions from:
- students
- teachers
- courses
- announcements
- admins (for superadmin users)

## Admin Features

For `superadmin` users, the frontend includes:
- admin creation and editing
- admin activation/deactivation
- admin archive visibility
- removed admin history
- service duration and last activity display
- dedicated `My Admins` sidebar page

## Tech Stack

- React 18
- Vite
- Material UI
- Tailwind CSS
- Axios
- React Router
- Recharts

## Build

```bash
npm run build
```

## Notes

- The frontend expects the backend auth and admin APIs to be available.
- Token refresh is handled in `src/utils/api.js`.
- Some topbar notifications are still static UI data.
