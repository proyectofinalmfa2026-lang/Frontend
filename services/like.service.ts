import api from "@/lib/axios";

export interface LikeResponse {
  liked: boolean;
  message: string;
  like?: {
    id: string;
    userId: number;
    reviewId: string;
  };
}

export const likeService = {
  toggle: (userId: number, reviewId: string) =>
    api.post<LikeResponse>("/likes", { userId, reviewId }).then((r) => r.data),

  getUserLikes: (userId: number) =>
    api.get(`/likes/user/${userId}`).then((r) => r.data),

  getReviewLikes: (reviewId: string) =>
    api.get(`/likes/review/${reviewId}`).then((r) => r.data),
};
