import { ProfileUser } from "@/types/profile.types";

interface BackendUser {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  role: string;
  isPremium: boolean;
  createdAt: string;
  favoriteGenres?: string[];
  badges?: ProfileUser["badges"];
  stats?: ProfileUser["stats"];
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
    stats: data.stats ?? {
      moviesWatched: 0,
      reviews: 0,
      lists: 0,
      avgRating: 0,
    },
  };
}
