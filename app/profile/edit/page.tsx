"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { userService } from "@/services/user.service";
import { GENRES, MAX_FAVORITE_GENRES } from "@/constants/genres";
import { AVAILABLE_BADGES, MAX_SELECTED_BADGES } from "@/constants/badges";
import { FREE_AVATARS, PREMIUM_AVATARS } from "@/constants/avatars";
import Loading from "@/components/ui/loading";

const BADGE_STYLES: Record<string, string> = {
  gold: "bg-[#F0A500]/10 border-[#F0A500]/30 text-[#F0A500] hover:bg-[#F0A500]/20",
  blue: "bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/20",
  green:
    "bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20",
  purple:
    "bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-[#8B5CF6] hover:bg-[#8B5CF6]/20",
  rose: "bg-[#E11D48]/10 border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48]/20",
  cyan: "bg-[#06B6D4]/10 border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4]/20",
};

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuthStore();
  const { profile, setProfile, isLoading } = useUserStore();

  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/Login");
      return;
    }
    if (profile) {
  setFavoriteGenres(profile.favoriteGenres);
  setSelectedBadges(profile.badges.map((b) => b.id));
  setSelectedAvatar(profile.avatarUrl || "🎬");
}
    setLoaded(true);
  }, [isAuthenticated, user, profile, router]);

  const toggleGenre = (genre: string) => {
    setFavoriteGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : prev.length < MAX_FAVORITE_GENRES
          ? [...prev, genre]
          : prev,
    );
  };

  const toggleBadge = (badgeId: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badgeId)
        ? prev.filter((id) => id !== badgeId)
        : prev.length < MAX_SELECTED_BADGES
          ? [...prev, badgeId]
          : prev,
    );
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const badgeObjects = AVAILABLE_BADGES.filter((b) =>
        selectedBadges.includes(b.id),
      ).map((b) => ({
        id: b.id,
        label: b.label,
        color: b.color,
        icon: b.icon,
      }));
     await userService.updateProfile({
  avatarUrl: selectedAvatar,
  favoriteGenres,
  badges: badgeObjects,
});
      if (profile) {
        setProfile({
  ...profile,
  avatarUrl: selectedAvatar,
  favoriteGenres,
  badges: AVAILABLE_BADGES.filter((b) =>
    selectedBadges.includes(b.id),
  ),
});
      }
      toast.custom(
        () => (
          <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#8C63C9] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(140,99,201,0.3)]">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-[#D6D0DC] font-medium text-sm">
                Perfil actualizado
              </p>
              <p className="text-[#7B7497] text-xs">
                Tus cambios se guardaron correctamente.
              </p>
            </div>
          </div>
        ),
        { position: "top-center", duration: 3000 },
      );
      router.push(`/profile/${user?.username}`);
    } catch {
      toast.custom(
        () => (
          <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#C13A82] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(193,58,130,0.25)]">
            <span className="text-2xl">❌</span>
            <div>
              <p className="text-[#D6D0DC] font-medium text-sm">
                Error al guardar
              </p>
              <p className="text-[#7B7497] text-xs">
                No se pudieron guardar los cambios.
              </p>
            </div>
          </div>
        ),
        { position: "top-center", duration: 4000 },
      );
    } finally {
      setSaving(false);
    }
  };

  if (!loaded || isLoading) return <Loading />;

  return (
    <main className="min-h-screen bg-[#02010F] py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href={`/profile/${user?.username}`}
              className="text-xs text-[#7B7497] hover:text-[#D6D0DC] transition-colors"
            >
              &larr; Volver al perfil
            </Link>
            <h1 className="text-xl font-medium text-[#D6D0DC] mt-1">
              Editar perfil
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-6">

          {/* AVATARES */}
<section className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5">
  <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider mb-4">
    Avatar
  </p>

  <p className="text-[11px] text-[#5C5470] font-medium mb-2">
    🙌 Avatares libres
  </p>

  <div className="flex flex-wrap gap-3 mb-5">
    {FREE_AVATARS.map((avatar) => (
      <button
        key={avatar}
        onClick={() => setSelectedAvatar(avatar)}
        className={`w-14 h-14 rounded-xl border text-2xl transition-all cursor-pointer ${
          selectedAvatar === avatar
            ? "border-[#C13A82] bg-[#C13A82]/10 shadow-[0_0_14px_rgba(193,58,130,0.2)]"
            : "border-[#22194A] bg-[#02010F] hover:border-[#3D3460]"
        }`}
      >
        {avatar}
      </button>
    ))}
  </div>

  <p className="text-[11px] text-[#5C5470] font-medium mb-2">
    👑 Avatares Premium
  </p>

  <div className="flex flex-wrap gap-3">
    {PREMIUM_AVATARS.map((avatar) => {
      const isPremium = profile?.isPremium ?? false;
      const locked = !isPremium;

      return (
        <button
          key={avatar}
          onClick={() => isPremium && setSelectedAvatar(avatar)}
          disabled={locked}
          className={`w-14 h-14 rounded-xl border text-2xl transition-all relative ${
            locked
              ? "border-[#22194A] bg-[#02010F] opacity-60 cursor-not-allowed"
              : selectedAvatar === avatar
                ? "border-[#C13A82] bg-[#C13A82]/10 shadow-[0_0_14px_rgba(193,58,130,0.2)] cursor-pointer"
                : "border-[#22194A] bg-[#02010F] hover:border-[#3D3460] cursor-pointer"
          }`}
        >
          {avatar}

          {locked && (
            <span className="absolute -top-1 -right-1 text-xs">
              🔒
            </span>
          )}
        </button>
      );
    })}
  </div>

  {!profile?.isPremium && (
    <div className="mt-4 pt-4 border-t border-[#22194A] text-center">
      <Link
        href="/premium"
        className="inline-flex items-center gap-1.5 text-xs text-[#C13A82] hover:text-[#A92F71] transition-colors font-medium animate-pulse"
      >
        👑 Suscribite a Premium para desbloquear avatares exclusivos
      </Link>
    </div>
  )}
</section>

          {/* GÉNEROS FAVORITOS */}
          <section className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider">
                  Géneros favoritos
                </p>
                <p className="text-[10px] text-[#5C5470] mt-0.5">
                  Elegí hasta {MAX_FAVORITE_GENRES} géneros
                </p>
              </div>
              <span className="text-xs text-[#7B7497]">
                {favoriteGenres.length}/{MAX_FAVORITE_GENRES}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => {
                const selected = favoriteGenres.includes(genre);
                const atLimit =
                  favoriteGenres.length >= MAX_FAVORITE_GENRES && !selected;
                return (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    disabled={atLimit}
                    className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all ${
                      selected
                        ? "bg-[#C13A82]/15 border-[#C13A82] text-[#C13A82] shadow-[0_0_12px_rgba(193,58,130,0.2)]"
                        : "bg-[#02010F] border-[#22194A] text-[#7B7497] hover:border-[#3D3460] hover:text-[#D6D0DC]"
                    } ${atLimit ? "opacity-30 cursor-not-allowed" : ""}`}
                  >
                    {selected && <span className="mr-1.5 inline-block">✓</span>}
                    {genre}
                  </button>
                );
              })}
            </div>
          </section>

          {/* BADGES */}
          <section className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium text-[#7B7497] uppercase tracking-wider">
                  Badges
                </p>
                <p className="text-[10px] text-[#5C5470] mt-0.5">
                  Elegí hasta {MAX_SELECTED_BADGES} badges para mostrar
                </p>
              </div>
              <span className="text-xs text-[#7B7497]">
                {selectedBadges.length}/{MAX_SELECTED_BADGES}
              </span>
            </div>

            <p className="text-[11px] text-[#5C5470] font-medium mb-2">
              🙌 Libres
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {AVAILABLE_BADGES.filter((b) => b.requiredTier === "free").map(
                (badge) => {
                  const selected = selectedBadges.includes(badge.id);
                  const atLimit =
                    selectedBadges.length >= MAX_SELECTED_BADGES && !selected;
                  return (
                    <button
                      key={badge.id}
                      onClick={() => toggleBadge(badge.id)}
                      disabled={atLimit}
                      className={`cursor-pointer flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${
                        selected
                          ? "border-[#C13A82] bg-[#C13A82]/10 shadow-[0_0_14px_rgba(193,58,130,0.15)]"
                          : BADGE_STYLES[badge.color]
                      } ${atLimit ? "opacity-30 cursor-not-allowed" : ""}`}
                    >
                      <span className="text-lg shrink-0">{badge.icon}</span>
                      <span className="text-xs font-medium truncate">
                        {badge.label}
                      </span>
                      {selected && (
                        <span className="ml-auto shrink-0 w-4 h-4 rounded-full bg-[#C13A82] flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                },
              )}
            </div>

            <p className="text-[11px] text-[#5C5470] font-medium mb-2">
              👑 Premium
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVAILABLE_BADGES.filter((b) => b.requiredTier === "premium").map(
                (badge) => {
                  const isPremium = profile?.isPremium ?? false;
                  const selected = selectedBadges.includes(badge.id);
                  const disabled =
                    !isPremium ||
                    (selectedBadges.length >= MAX_SELECTED_BADGES && !selected);
                  return (
                    <button
                      key={badge.id}
                      onClick={() => isPremium && toggleBadge(badge.id)}
                      disabled={disabled}
                      className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${
                        !isPremium
                          ? "border-[#22194A] bg-[#02010F] text-[#5C5470] opacity-60 cursor-not-allowed"
                          : selected
                            ? "border-[#C13A82] bg-[#C13A82]/10 shadow-[0_0_14px_rgba(193,58,130,0.15)] cursor-pointer"
                            : `${BADGE_STYLES[badge.color]} cursor-pointer`
                      } ${disabled && isPremium ? "opacity-30 cursor-not-allowed" : ""}`}
                    >
                      <span className="text-lg shrink-0">{badge.icon}</span>
                      <span className="text-xs font-medium truncate">
                        {badge.label}
                      </span>
                      {!isPremium && (
                        <span className="ml-auto shrink-0 text-[10px] text-[#C13A82]">
                          👑
                        </span>
                      )}
                      {isPremium && selected && (
                        <span className="ml-auto shrink-0 w-4 h-4 rounded-full bg-[#C13A82] flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                },
              )}
            </div>

            {!profile?.isPremium && (
              <div className="mt-4 pt-4 border-t border-[#22194A] text-center">
                <Link
                  href="/premium"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C13A82] hover:text-[#A92F71] transition-colors font-medium animate-pulse"
                >
                  👑 Suscribete a Premium para desbloquear badges exclusivos
                </Link>
              </div>
            )}
          </section>

          {/* SAVE */}
          <div className="flex items-center gap-3 justify-end">
            <Link
              href={`/profile/${user?.username}`}
              className="text-xs text-[#7B7497] hover:text-[#D6D0DC] transition-colors px-4 py-2"
            >
              Cancelar
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#C13A82] hover:bg-[#A92F71] disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
