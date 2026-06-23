"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { userService } from "@/services/user.service";
import { mapBackendUserToProfile } from "@/lib/mappers";
import { type ProfileUser } from "@/types/profile.types";
import { AVAILABLE_BADGES } from "@/constants/badges";
import ProfileSidebar from "@/components/profile/profileSidebar";
import ProfileFeed from "@/components/profile/profileStats";
import Loading from "@/components/ui/loading";
import { toast } from "sonner";

export default function ProfilePage({ username }: { username?: string }) {
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuthStore();
  const { setProfile: setStoredProfile } = useUserStore();
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);

  const targetUsername = username ?? user?.username;

  const fetchProfile = useCallback(() => {
    if (!targetUsername) return;
    setLoading(true);
    userService
      .getByUsername(targetUsername)
      .then((data) => {
        setProfile(mapBackendUserToProfile(data));
      })
      .catch(() => {
        router.push("/Login");
      })
      .finally(() => setLoading(false));
  }, [targetUsername, router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleRemoveGenre = async (genre: string) => {
    if (!profile || !token) return;
    const updated = profile.favoriteGenres.filter((g) => g !== genre);
    try {
      await userService.updateProfile({ favoriteGenres: updated });
      const next = { ...profile, favoriteGenres: updated };
      setProfile(next);
      setStoredProfile(next);
    } catch {
      toast.custom(() => (
        <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#C13A82] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(193,58,130,0.25)]">
          <span className="text-2xl">❌</span>
          <div>
            <p className="text-[#D6D0DC] font-medium text-sm">Error</p>
            <p className="text-[#7B7497] text-xs">No se pudo actualizar.</p>
          </div>
        </div>
      ), { position: "top-center", duration: 3000 });
    }
  };

  const handleRemoveBadge = async (badgeId: string) => {
    if (!profile || !token) return;
    const updated = profile.badges.filter((b) => b.id !== badgeId);
    try {
      await userService.updateProfile({ badges: updated });
      const next = { ...profile, badges: updated };
      setProfile(next);
      setStoredProfile(next);
    } catch {
      toast.custom(() => (
        <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#C13A82] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(193,58,130,0.25)]">
          <span className="text-2xl">❌</span>
          <div>
            <p className="text-[#D6D0DC] font-medium text-sm">Error</p>
            <p className="text-[#7B7497] text-xs">No se pudo actualizar.</p>
          </div>
        </div>
      ), { position: "top-center", duration: 3000 });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!profile) {
    router.push("/Login");
    return null;
  }

  const isOwnProfile = isAuthenticated && user?.username === targetUsername;

  return (
    <main className="min-h-screen bg-[#02010F] py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-55 md:shrink-0">
            <ProfileSidebar
              key={profile.id}
              user={profile}
              isOwnProfile={isOwnProfile}
              currentUserId={isAuthenticated ? user?.id : undefined}
              onFollowChange={fetchProfile}
              onRemoveGenre={isOwnProfile ? handleRemoveGenre : undefined}
              onRemoveBadge={isOwnProfile ? handleRemoveBadge : undefined}
            />
          </div>
          <div className="flex-1 min-w-0">
            <ProfileFeed userId={profile.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
