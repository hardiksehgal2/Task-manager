const ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    ME: "/api/auth/me",
    REFRESH: "/api/auth/refresh",
    LOGOUT: "/api/auth/logout",
  },
  TASKS: {
    BASE: "/api/tasks",
    BY_ID: (id: string) => `/api/tasks/${id}`,
  },
} as const;

export default ENDPOINTS;
