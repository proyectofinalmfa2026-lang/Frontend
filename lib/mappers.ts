import { ProfileUser } from "@/types/profile.types";

interface BackendUser {
  id: number;
  name: string;
  username: string;
  email?: string;
  avatar: string | null;
  bio: string | null;
  role?: string;
  isPremium: boolean;
  createdAt: string;
  reviewsCount?: number;
  watchlistCount?: number;
  avgRating?: number;
  favoriteGenres?: string[];
  badges?: ProfileUser["badges"];
  stats?: ProfileUser["stats"];
  followersCount?: number;
  followingCount?: number;
}

export function mapBackendUserToProfile(data: BackendUser): ProfileUser {
  return {
    id: data.id,
    name: data.name,
    username: data.username,
    bio: data.bio,
    avatarUrl: data.avatar,
    isPremium: data.isPremium,
    joinedAt: data.createdAt ?? new Date().toISOString(),
    favoriteGenres: data.favoriteGenres ?? [],
    badges: data.badges ?? [],
    followersCount: data.followersCount ?? 0,
    followingCount: data.followingCount ?? 0,
    stats: data.stats ?? {
      moviesWatched: data.watchlistCount ?? 0,
      reviews: data.reviewsCount ?? 0,
      lists: 0,
      avgRating: data.avgRating ?? 0,
    },
  };
}
