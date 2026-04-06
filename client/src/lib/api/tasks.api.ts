import axiosInstance from "./axiosInstance";
import ENDPOINTS from "./endpoints";

export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
  createdBy: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const { data } = await axiosInstance.post(ENDPOINTS.TASKS.BASE, payload);
  return data.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await axiosInstance.get(ENDPOINTS.TASKS.BASE);
  return data.data;
};

export const updateTask = async (
  id: string,
  payload: UpdateTaskPayload
): Promise<Task> => {
  const { data } = await axiosInstance.put(ENDPOINTS.TASKS.BY_ID(id), payload);
  return data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axiosInstance.delete(ENDPOINTS.TASKS.BY_ID(id));
};
