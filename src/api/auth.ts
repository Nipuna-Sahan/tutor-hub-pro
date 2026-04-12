import api from "./client";
import type { LoginRequest, LoginResponse, RegisterRequest, User } from "./types";

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<LoginResponse>("/auth/login", data),

  register: (data: RegisterRequest) =>
    api.post<LoginResponse>("/auth/register", data),

  logout: () =>
    api.post<void>("/auth/logout", {}),

  getProfile: () =>
    api.get<User>("/auth/profile"),

  updateProfile: (data: Partial<User>) =>
    api.put<User>("/auth/profile", data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.post<void>("/auth/change-password", data),

  forgotPassword: (email: string) =>
    api.post<void>("/auth/forgot-password", { email }),

  resetPassword: (data: { token: string; password: string }) =>
    api.post<void>("/auth/reset-password", data),
};
