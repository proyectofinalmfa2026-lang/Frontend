export interface ProfileUser {
  id: number;
  username: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null; // null = mostramos las iniciales
  isPremium: boolean;
  joinedAt: string; // fecha ISO "2024-01-01"
  favoriteGenres: string[]; // ej: ["Drama", "Sci-Fi", "Thriller"]
  badges: Badge[]; // solo premium puede tener badges
  followersCount: number;
  followingCount: number;
  stats: UserStats;
}

export interface Badge {
  id: string;
  label: string;
  color: "gold" | "blue" | "green" | "purple" | "rose" | "cyan";
  icon: string;
  requiredTier?: "free" | "premium"; // free = cualquiera, premium (default) = solo premium
}

export interface UserStats {
  moviesWatched: number;
  reviews: number;
  lists: number;
  avgRating: number;
}

export interface Review {
  id: number;
  movieTitle: string;
  movieYear: number;
  posterUrl: string | null;
  score: number;
  text: string;
  likes: number;
  comments: number;
  createdAt: string; // fecha ISO
}
