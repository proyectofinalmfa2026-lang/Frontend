import api from "../lib/axios";

export const userService = {
  // Trae el usuario autenticado con todos sus campos (avatar, bio, isPremium, etc.)
  getMe: () => api.get("/auth/profile"),

  // Trae cualquier perfil por ID (para ver perfiles ajenos)
  getById: (id: number) => api.get(`/users/${id}`),

  // Subir avatar
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
