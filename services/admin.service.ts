import api from "@/lib/axios";

export const adminService = {
  getDashboard: () => api.get("/admin/dashboard").then((r) => r.data),

  getUsers: () => api.get("/admin/users").then((r) => r.data),

  getUserDetail: (id: number) => api.get(`/admin/users/${id}`).then((r) => r.data),

  updateUserRole: (id: number, role: string) =>
    api.patch(`/admin/users/${id}/role`, { role }).then((r) => r.data),

  updateUserPremium: (id: number, isPremium: boolean) =>
    api.patch(`/admin/users/${id}/premium`, { isPremium }).then((r) => r.data),

  updateUserProfile: (id: number, data: any) =>
    api.patch(`/admin/users/${id}/profile`, data).then((r) => r.data),

  getReviews: () => api.get("/admin/reviews").then((r) => r.data),

  deleteReview: (id: string) => api.delete(`/admin/reviews/${id}`).then((r) => r.data),

  getComments: () => api.get("/admin/comments").then((r) => r.data),

  deleteComment: (id: string) => api.delete(`/admin/comments/${id}`).then((r) => r.data),
};
