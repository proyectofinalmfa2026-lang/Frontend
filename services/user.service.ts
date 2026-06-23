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

  getByUsername: async (username: string) => {
    const res = await api.get(`/users/profile/${username}`);
    return res.data;
  },

  getProfileById: async (id: number) => {
    const res = await api.get(`/users/${id}/profile`);
    return res.data;
  },

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

  updateProfile: (data: {
    favoriteGenres?: string[];
    badges?: { id: string; label: string; color: string; icon: string; requiredTier?: "free" | "premium" }[];
  }) => api.put("/auth/profile", data),
};
