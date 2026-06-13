import { create } from "zustand";
import { ProfileUser } from "@/types/profile.types";

interface UserStore {
  profile: ProfileUser | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: ProfileUser) => void;
  clearProfile: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  setProfile: (profile) => set({ profile, error: null }),
  clearProfile: () => set({ profile: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
