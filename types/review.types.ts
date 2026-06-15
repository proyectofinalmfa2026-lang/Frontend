export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  movie: {
    id: string;
    title: string;
    poster: string | null;
    year: number;
  };
  user: {
    id: number;
    name: string;
    username: string;
    avatar: string | null;
  };
}

export interface CreateReviewData {
  rating: number;
  comment: string;
  movieId: string;
  userId: number;
}
