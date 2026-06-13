"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/store/userStore";
import ProfileSidebar from "@/components/profile/profileSidebar";
import ProfileFeed from "@/components/profile/profileStats";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { profile, isLoading } = useUserStore();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Todavía no inicializamos o está fetching
  if (!ready || isLoading) {
    return (
      <main className="min-h-screen bg-[#02010F] flex items-center justify-center">
        <p className="text-white/50 text-sm">Cargando perfil...</p>
      </main>
    );
  }

  // Terminó de cargar y no hay sesión → redirigir
  if (!profile) {
    router.push("/Login");
    return null;
  }

  return (
    <main className="min-h-screen bg-[#02010F] py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-55 md:shrink-0">
            <ProfileSidebar user={profile} isOwnProfile={true} />
          </div>
          <div className="flex-1 min-w-0">
            <ProfileFeed userId={profile.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
