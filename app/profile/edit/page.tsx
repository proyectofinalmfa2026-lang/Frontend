"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { userService } from "@/services/user.service";
import { AVAILABLE_BADGES } from "@/constants/badges";
import Loading from "@/components/ui/loading";
import AvatarSection from "@/components/profile/edit/AvatarSection";
import GenreSection from "@/components/profile/edit/GenreSection";
import BadgeSection from "@/components/profile/edit/BadgeSection";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuthStore();
  const { profile, setProfile, isLoading } = useUserStore();

  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) { router.push("/Login"); return; }
    if (profile) {
      setFavoriteGenres(profile.favoriteGenres);
      setSelectedBadges(profile.badges.map((b) => b.id));
      setSelectedAvatar(profile.avatarUrl || "🎬");
    }
    setLoaded(true);
  }, [isAuthenticated, user, profile, router]);

  const toggleGenre = (genre: string) =>
    setFavoriteGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre)
        : prev.length < 5 ? [...prev, genre] : prev,
    );

  const toggleBadge = (badgeId: string) =>
    setSelectedBadges((prev) =>
      prev.includes(badgeId) ? prev.filter((id) => id !== badgeId)
        : prev.length < 6 ? [...prev, badgeId] : prev,
    );

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const badgeObjects = AVAILABLE_BADGES.filter((b) => selectedBadges.includes(b.id))
        .map((b) => ({ id: b.id, label: b.label, color: b.color, icon: b.icon }));
      await userService.updateProfile({ avatarUrl: selectedAvatar, favoriteGenres, badges: badgeObjects });
      if (profile) setProfile({ ...profile, avatarUrl: selectedAvatar, favoriteGenres, badges: AVAILABLE_BADGES.filter((b) => selectedBadges.includes(b.id)) });
      toast.custom(() => (
        <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#8C63C9] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(140,99,201,0.3)]">
          <span className="text-2xl">✅</span>
          <div><p className="text-[#D6D0DC] font-medium text-sm">Perfil actualizado</p><p className="text-[#7B7497] text-xs">Tus cambios se guardaron correctamente.</p></div>
        </div>
      ), { position: "top-center", duration: 3000 });
      router.push(`/profile/${user?.username}`);
    } catch {
      toast.custom(() => (
        <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#C13A82] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(193,58,130,0.25)]">
          <span className="text-2xl">❌</span>
          <div><p className="text-[#D6D0DC] font-medium text-sm">Error al guardar</p><p className="text-[#7B7497] text-xs">No se pudieron guardar los cambios.</p></div>
        </div>
      ), { position: "top-center", duration: 4000 });
    } finally { setSaving(false); }
  };

  if (!loaded || isLoading) return <Loading />;

  return (
    <main className="min-h-screen bg-[#02010F] py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href={`/profile/${user?.username}`} className="text-xs text-[#7B7497] hover:text-[#D6D0DC] transition-colors">&larr; Volver al perfil</Link>
            <h1 className="text-xl font-medium text-[#D6D0DC] mt-1">Editar perfil</h1>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <AvatarSection selectedAvatar={selectedAvatar} isPremium={profile?.isPremium ?? false} onSelect={setSelectedAvatar} />
          <GenreSection favoriteGenres={favoriteGenres} onToggle={toggleGenre} />
          <BadgeSection selectedBadges={selectedBadges} isPremium={profile?.isPremium ?? false} onToggle={toggleBadge} />

          <div className="flex items-center gap-3 justify-end">
            <Link href={`/profile/${user?.username}`} className="text-xs text-[#7B7497] hover:text-[#D6D0DC] transition-colors px-4 py-2">Cancelar</Link>
            <button onClick={handleSave} disabled={saving} className="bg-[#C13A82] hover:bg-[#A92F71] disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
