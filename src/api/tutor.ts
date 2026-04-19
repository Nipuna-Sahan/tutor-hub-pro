import api from "./client";
import type { Tutor } from "./types";

export const tutorApi = {
  get: () => api.get<Tutor>("/tutor"),
  update: (data: Partial<Tutor>) => api.put<Tutor>("/tutor", data),
};
