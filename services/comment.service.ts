import api from "@/lib/axios";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    username: string;
    avatar: string | null;
  };
  review: {
    id: string;
  };
}

export const commentService = {
  getAll: () => api.get<Comment[]>("/comments").then((r) => r.data),

  create: (content: string, reviewId: string, userId: number) =>
    api.post<Comment>("/comments", { content, reviewId, userId }).then((r) => r.data),

  update: (id: string, content: string) =>
    api.patch<Comment>(`/comments/${id}`, { content }).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/comments/${id}`).then((r) => r.data),
};
