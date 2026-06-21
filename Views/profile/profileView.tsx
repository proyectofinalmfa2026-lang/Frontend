"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { userService } from "@/services/user.service";
import { mapBackendUserToProfile } from "@/lib/mappers";
import { type ProfileUser } from "@/types/profile.types";
import ProfileSidebar from "@/components/profile/profileSidebar";
import ProfileFeed from "@/components/profile/profileStats";

export default function ProfilePage({ username }: { username?: string }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);

  const targetUsername = username ?? user?.username;

  useEffect(() => {
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

  if (loading) {
    return (
      <main className="min-h-screen bg-[#02010F] flex items-center justify-center">
        <p className="text-white/50 text-sm">Cargando perfil...</p>
      </main>
    );
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
