export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  poster: string | null;
  rating?: number; // calculado desde reviews
  reviews?: MovieReview[];
  createdAt?: string;
  updatedAt?: string;
}
export interface MovieReview {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
}
