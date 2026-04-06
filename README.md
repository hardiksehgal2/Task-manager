# Task Manager

A full-stack Kanban-style task management app with JWT authentication, dark mode, and paginated task views.

---

## Features

- **Authentication** — Register, login, and logout with access/refresh token flow
- **Kanban Board** — Tasks organized into To Do, In Progress, and Done columns
- **CRUD Operations** — Create, edit, and delete tasks
- **Pagination** — Server-side pagination with 6 tasks per page
- **Dark Mode** — System-aware theme toggle
- **Protected Routes** — All task data is scoped to the authenticated user

---

## Tech Stack

### Client
- [Next.js 16](https://nextjs.org/) — React framework
- [TanStack Query](https://tanstack.com/query) — Server state and caching
- [Tailwind CSS v4](https://tailwindcss.com/) — Styling
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) — UI components
- [Axios](https://axios-http.com/) — HTTP client with interceptors
- [React Hook Form](https://react-hook-form.com/) — Form handling
- [js-cookie](https://github.com/js-cookie/js-cookie) — Cookie management

### Server
- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/) — REST API
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) — Database
- [JWT](https://github.com/auth0/node-jsonwebtoken) — Access & refresh token auth
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — Password hashing
- [Joi](https://joi.dev/) — Request validation
- [dotenv](https://github.com/motdotla/dotenv) — Environment config

### DevOps
- [Docker](https://www.docker.com/) — Containerized builds for client and server

---

## Potential Improvements

- **Task deadlines** — Add a due date field to tasks with overdue indicators
- **Progress tracking** — Show percentage of tasks completed (e.g. "4 of 10 tasks done")
- **Task priority** — Label tasks as Low, Medium, or High priority with visual indicators
- **Drag and drop** — Move tasks between columns by dragging
- **Search and filter** — Filter tasks by status, priority, or keyword
- **Task comments** — Add notes or a comment thread to individual tasks
- **User profile** — Avatar upload and display name editing
- **Email notifications** — Reminders for upcoming or overdue deadlines
- **Team support** — Shared boards with multiple users and role-based access
- **Activity log** — Track changes to tasks over time
