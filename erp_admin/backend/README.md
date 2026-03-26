# AYRA ERP - Backend API

Express and MongoDB backend for the AYRA ERP admin portal.

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or on Atlas

### Install and Run

```bash
cd backend
npm install
npm run dev
```

Production start:

```bash
npm start
```

API base URL:

```text
http://localhost:5000/api
```

## Environment

Create a `.env` file in `backend/` and provide values like:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/erp_admin
JWT_SECRET=your_access_secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Seed Data

To load sample data:

```bash
npm run seed
```

Important:
- the seed script clears existing collections first
- do not run it again if you want to preserve your current MongoDB data

Default seeded Master Admin:
- Username: `admin`
- Password: `admin@123`

## Current Backend Structure

```text
backend/
|-- src/
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   |-- academicsController.js
|   |   |-- adminController.js
|   |   |-- authController.js
|   |   |-- communicationController.js
|   |   |-- dashboardController.js
|   |   |-- financeController.js
|   |   |-- studentController.js
|   |   `-- teacherController.js
|   |-- middleware/
|   |   |-- auth.js
|   |   |-- errorHandler.js
|   |   `-- validate.js
|   |-- models/
|   |   |-- Admin.js
|   |   |-- Announcement.js
|   |   |-- Course.js
|   |   |-- ExamSchedule.js
|   |   |-- Fee.js
|   |   |-- Student.js
|   |   `-- Teacher.js
|   |-- routes/
|   |   |-- academicsRoutes.js
|   |   |-- adminRoutes.js
|   |   |-- authRoutes.js
|   |   |-- communicationRoutes.js
|   |   |-- dashboardRoutes.js
|   |   |-- financeRoutes.js
|   |   |-- studentRoutes.js
|   |   `-- teacherRoutes.js
|   |-- utils/
|   |   |-- apiResponse.js
|   |   |-- logger.js
|   |   `-- seeder.js
|   |-- validators/
|   |   `-- index.js
|   `-- server.js
`-- package.json
```

## API Modules

### Auth
Base path: `/api/auth`

- `POST /login`
- `POST /refresh`
- `POST /logout`
- `GET /me`
- `PUT /profile`
- `PUT /change-password`

Notes:
- successful login updates `lastLogin`
- admin activity is also reflected in MongoDB through `lastActivityAt`

### Dashboard
Base path: `/api/dashboard`

- `GET /stats`

Returns:
- student totals
- teacher totals
- finance summary
- upcoming exams
- latest announcements
- student department distribution
- monthly enrollment

### Students
Base path: `/api/students`

- `GET /`
- `GET /stats`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

### Teachers
Base path: `/api/teachers`

- `GET /`
- `GET /stats`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

### Academics
Base path: `/api/academics`

- `GET /courses`
- `GET /courses/:id`
- `POST /courses`
- `PUT /courses/:id`
- `DELETE /courses/:id`
- `GET /exams`
- `POST /exams`
- `PUT /exams/:id`
- `DELETE /exams/:id`

### Finance
Base path: `/api/finance`

- `GET /fees`
- `GET /fees/:id`
- `POST /fees`
- `PUT /fees/:id`
- `DELETE /fees/:id`
- `GET /stats`

### Communication
Base path: `/api/communication`

- `GET /announcements`
- `GET /announcements/:id`
- `POST /announcements`
- `PUT /announcements/:id`
- `DELETE /announcements/:id`
- `GET /stats`

### Admin Management
Base path: `/api/admins`

Protected:
- requires authentication
- restricted to `superadmin`

Endpoints:
- `GET /`
- `GET /stats`
- `POST /`
- `PUT /:id`
- `PUT /:id/toggle-status`
- `DELETE /:id`

Important behavior:
- admins are now archived instead of hard-deleted
- archived admins remain visible in reporting/history
- admin activity is tracked with `lastActivityAt`

## Authentication

Use:

```http
Authorization: Bearer <accessToken>
```

## Response Format

Success:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

## Notes

- Admin activity timestamps are stored in MongoDB.
- Rate limiting is enabled globally and on auth routes.
- Admin archive/history support only applies to removals done after the archive change was added.
