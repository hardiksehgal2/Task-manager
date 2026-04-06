import axiosInstance from "./axiosInstance";
import ENDPOINTS from "./endpoints";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post(ENDPOINTS.AUTH.REGISTER, payload);
  return data.data;
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, payload);
  return data.data;
};

export const getMe = async (): Promise<AuthUser> => {
  const { data } = await axiosInstance.get(ENDPOINTS.AUTH.ME);
  return data.data;
};

export const refresh = async (): Promise<{ accessToken: string }> => {
  const { data } = await axiosInstance.post(ENDPOINTS.AUTH.REFRESH);
  return data.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);
};
