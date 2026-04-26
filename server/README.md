# Tuition LMS — Backend

Node.js + Express + MongoDB (Mongoose) API powering the Lovable frontend.

## Quick start

```bash
cd server
cp .env.example .env        # then edit MONGO_URI / JWT_SECRET
npm install
npm run seed                # creates default admin + demo tutor
npm run dev                 # http://localhost:5000
```

Then in the frontend, set `VITE_API_BASE_URL=http://localhost:5000/api`
(or just leave the default — the client already points here).

## Default credentials (after `npm run seed`)

- Admin:   `admin@tuition.lk` / `Admin@123`
- Student: `student@tuition.lk` / `Student@123`

## Routes

All routes are mounted under `/api`.

| Group         | Base path             |
|---------------|-----------------------|
| Auth          | `/api/auth`           |
| Students      | `/api/students`       |
| Classes       | `/api/classes`        |
| Papers        | `/api/papers`         |
| Marks         | `/api/marks`          |
| Attendance    | `/api/attendance`     |
| Resources     | `/api/resources`      |
| Videos        | `/api/videos`         |
| Assignments   | `/api/assignments`    |
| Announcements | `/api/announcements`  |
| Messages      | `/api/messages`       |
| Notifications | `/api/notifications`  |
| Tutor         | `/api/tutor`          |
| Uploads       | `/uploads/*` (static) |

JWT is sent as `Authorization: Bearer <token>`. Admin-only endpoints require a
user with `role === "admin"`.
