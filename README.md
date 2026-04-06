# Task Manager

A full-stack Kanban-style task management application built with Next.js and Express. Users can register, log in, and manage their personal tasks across three status columns — all behind a secure JWT authentication system with automatic token refresh.

---

## Features

### Authentication
- **Register & Login** with email and password. Passwords are hashed with bcryptjs before being stored — plain text is never persisted.
- **Access & Refresh Token flow** — on login, the server issues a short-lived access token (15 minutes) and a long-lived refresh token (7 days). The refresh token is SHA-256 hashed before being stored in the database, so even a database leak cannot be used to impersonate users.
- **Silent token refresh** — the Axios interceptor on the frontend automatically detects a `401` response, uses the stored refresh token to obtain a new access token, and retries the original request without the user ever noticing.
- **Secure logout** — hitting the logout endpoint nullifies the refresh token in the database, invalidating the session server-side.
- **Route protection via Next.js middleware** — unauthenticated users are redirected to `/auth`; already-logged-in users are redirected away from `/auth` to `/dashboard`. This runs at the edge before the page renders.

### Task Management
- **Create tasks** with a title, description, and status via a modal dialog.
- **Edit tasks** inline — update title, description, or status at any time.
- **Delete tasks** with a confirmation prompt to prevent accidental removal.
- **Kanban board** — tasks are automatically grouped into three columns: `To Do`, `In Progress`, and `Done`.
- **Server-side pagination** — tasks are fetched 6 at a time. Page state lives in React, and each page change triggers a fresh query.

### UI & UX
- **Dark mode** with system preference detection and a manual toggle. Theme state persists across page reloads.
- **Optimistic-feeling updates** — TanStack Query cache is invalidated on every mutation so the board always reflects the latest state without a full page reload.
- **Animated columns** — each Kanban column fades in with a staggered delay on load.

---

## Tech Stack

### Client — `client/`

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI primitives |
| Server State | TanStack Query (React Query) v5 |
| HTTP Client | Axios with interceptors |
| Forms | React Hook Form |
| Cookies | js-cookie |
| Icons | Lucide React |

### Server — `server/`

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Framework | Express 5 |
| Database | MongoDB via Mongoose |
| Auth | JSON Web Tokens (jsonwebtoken) |
| Validation | Joi |
| Password hashing | bcryptjs |
| Config | dotenv |

---

## Project Structure

### Backend

```
server/
├── index.js                          # Entry point — loads env, connects DB, starts server
└── src/
    ├── app.js                        # Express app setup — CORS, body parsing, route mounting
    ├── common/                       # Shared utilities used across all modules
    │   ├── config/
    │   │   └── db.js                 # Mongoose connection logic
    │   ├── dto/
    │   │   └── base.dto.js           # BaseDTO class with Joi .validate() — all DTOs extend this
    │   ├── middleware/
    │   │   ├── error.middleware.js   # Global error handler — maps ApiError to JSON responses
    │   │   └── validate.middleware.js# Factory middleware — takes a DTO class, validates req.body
    │   └── utils/
    │       ├── api.error.js          # ApiError class with static helpers (badRequest, unauthorized, etc.)
    │       ├── api.response.js       # ApiResponse class — standardizes all JSON responses (ok, created, noContent)
    │       └── jwt.utils.js          # Generate and verify access and refresh tokens
    └── module/                       # Feature modules — each is self-contained
        ├── auth/
        │   ├── dto/
        │   │   ├── login.dto.js      # Joi schema for login — extends BaseDTO
        │   │   └── register.dto.js   # Joi schema for register — extends BaseDTO
        │   ├── auth.controller.js    # Request handlers — calls service, sends response via ApiResponse
        │   ├── auth.middleware.js    # authenticate() — verifies Bearer token, attaches req.user
        │   ├── auth.model.js         # Mongoose User schema — comparePassword instance method
        │   ├── auth.routes.js        # Route definitions — wires validate(), authenticate(), and controllers
        │   └── auth.service.js       # Business logic — register, login, refresh, logout
        └── tasks/
            ├── dto/
            │   └── tasks.dto.js      # Joi schema for task creation and updates
            ├── tasks.controller.js   # Request handlers for CRUD + pagination
            ├── tasks.model.js        # Mongoose Task schema
            ├── tasks.routes.js       # Protected task routes — all behind authenticate()
            └── tasks.service.js      # DB queries — find, create, update, delete with pagination
```

**Request flow:**

```
index.js
  └── app.js (Express + middleware)
        └── auth.routes.js / tasks.routes.js
              └── validate.middleware.js   (Joi DTO validation)
              └── auth.middleware.js       (JWT verification)
              └── *.controller.js          (extract params, call service)
                    └── *.service.js       (business logic, DB queries)
                          └── ApiResponse  (standardized JSON response)
```

A key design decision is the **DTO validation middleware** — `validate(RegisterDto)` is passed directly into the route definition. It calls `DtoClass.validate(req.body)` (inherited from `BaseDTO`), strips unknown fields, and either calls `next()` with the cleaned body or calls `next(ApiError.badRequest(...))`. This keeps controllers free of validation logic entirely.

---

### Frontend

```
client/src/
├── app/                              # Next.js App Router pages
│   ├── layout.tsx                    # Root layout — wraps app with QueryProvider and ThemeProvider
│   ├── page.tsx                      # Landing page
│   ├── globals.css                   # Global styles and Tailwind base
│   ├── (auth)/                       # Route group — auth pages (no shared layout with dashboard)
│   │   ├── auth/page.tsx             # Login/Register page
│   │   └── _components/             # Auth-specific components (LoginForm, SignupForm)
│   └── (pages)/
│       └── dashboard/page.tsx        # Main Kanban board — grouped tasks, pagination, header
├── components/
│   ├── auth/
│   │   └── LogoutButton.tsx          # Logout icon + confirmation dialog + mutation
│   ├── tasks/
│   │   ├── TaskCard.tsx              # Individual task card with edit and delete actions
│   │   ├── TaskList.tsx              # Task list (column content)
│   │   ├── CreateTaskDialog.tsx      # Modal form to create a new task
│   │   ├── EditTaskDialog.tsx        # Modal form to edit an existing task
│   │   └── DeleteTaskDialog.tsx      # Confirmation dialog for deletion
│   ├── providers/
│   │   └── QueryProvider.tsx         # TanStack Query client provider
│   ├── theme-provider.tsx            # next-themes provider
│   ├── theme-toggle.tsx              # Dark/light mode toggle button
│   ├── Galaxy.tsx                    # WebGL background (landing page)
│   └── PixelSnow.tsx                 # Canvas animation component
├── lib/
│   ├── api/
│   │   ├── axiosInstance.ts          # Axios instance — base URL, auth header, refresh interceptor
│   │   ├── endpoints.ts              # Central endpoint map (all API paths defined once)
│   │   ├── auth.api.ts               # Auth API functions (login, register, logout, getMe, refresh)
│   │   └── tasks.api.ts              # Tasks API functions + TypeScript types
│   └── utils.ts                      # cn() helper for conditional Tailwind classes
└── proxy.ts                          # Next.js middleware — edge route protection
```

**Data flow for a typical task mutation:**

```
TaskCard (user clicks "Delete")
  └── DeleteTaskDialog (confirmation UI)
        └── useMutation(deleteTask)    — TanStack Query mutation
              └── axiosInstance.delete(...)
                    └── [if 401] refresh interceptor fires → retries original request
              └── onSuccess: queryClient.invalidateQueries(["tasks"])
                    └── useQuery refetches → dashboard re-renders with updated data
```

**Key frontend patterns:**

- **Centralized endpoints** — `endpoints.ts` is the single source of truth for all API paths. No URL strings are scattered across components.
- **Axios interceptor** — `axiosInstance.ts` handles the full token refresh cycle transparently. If a request returns `401`, it automatically calls `/api/auth/refresh`, swaps the cookies, and retries — all before the calling component sees an error.
- **TanStack Query** — all server state (tasks) is managed through `useQuery` and `useMutation`. Components never manage loading/error state manually. Cache invalidation on mutation keeps the UI in sync.
- **Route groups** — `(auth)` and `(pages)` are Next.js route groups, allowing `/auth` and `/dashboard` to have completely separate layouts with no shared wrapper.
- **Edge middleware** — `proxy.ts` runs as Next.js middleware at the edge, redirecting unauthenticated users before the page component ever executes.

---

## Potential Improvements

- **Task deadlines** — Add a `dueDate` field to tasks. Highlight overdue tasks in red on the board and sort by urgency within each column.
- **Progress tracking** — Show a progress bar or percentage in the header (e.g. "6 of 14 tasks complete") calculated from the `Done` count vs. total.
- **Task priority** — A `priority` field (Low / Medium / High) with color-coded badges on each card. Allow filtering the board by priority.
- **Drag and drop** — Drag a task card between columns to update its status without opening an edit dialog.
- **Search and filter** — A search bar that filters tasks by title or description client-side, and a status filter to isolate a single column.
- **Task comments** — A comment thread on each task for notes or progress updates, stored as a sub-document in MongoDB.
- **User profile** — Allow users to update their display name and upload a profile avatar.
- **Email notifications** — Send reminders for tasks approaching their deadline using a job queue (e.g. BullMQ + nodemailer).
- **Team boards** — Support multiple users on a single board with role-based access (owner, editor, viewer).
- **Activity log** — Track every change to a task (who changed what and when) as an append-only event list.
- **Refresh token rotation** — Already hashed in storage; extend with strict rotation so each refresh token can only be used once, preventing replay attacks.
