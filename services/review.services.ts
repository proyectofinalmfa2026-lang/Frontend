import api from "@/lib/axios";
import { CreateReviewData } from "@/types/review.types";

export const reviewService = {
  // Reviews de una película
  getByMovie: (movieId: string) => api.get(`/reviews/movie/${movieId}`),

  // Reviews de un usuario
  getByUser: (userId: number) => api.get(`/reviews/user/${userId}`),

  // Crear review (requiere token)
  create: (data: CreateReviewData) => api.post("/reviews", data),

  // Eliminar review (requiere token)
  remove: (id: string) => api.delete(`/reviews/${id}`),
};
