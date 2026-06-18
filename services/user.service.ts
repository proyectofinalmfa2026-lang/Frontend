import api from "../lib/axios";

export interface UserSearchResult {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
}

export const userService = {
  getMe: () => api.get("/auth/profile"),

  getById: (id: number) => api.get(`/users/${id}`),

  search: async (query: string): Promise<UserSearchResult[]> => {
    const res = await api.get("/users/search", { params: { q: query } });
    return res.data;
  },

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
