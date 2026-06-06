"use client";
import ProfileSidebar, {
  MOCK_USER,
  useProfile,
} from "@/components/profile/profileSidebar";
import ProfileFeed from "@/components/profile/profileStats";

// ─── Cómo conectar al authStore cuando el backend esté listo ──────────────────
//
// 1. Importar el store:
//    import { useAuthStore } from "@/store/authStore";
//
// 2. Obtener el usuario:
//    const { user } = useAuthStore();
//
// 3. Pasar el username al hook:
//    const { user: profileUser, loading } = useProfile(user.username);
//
// 4. Reemplazar MOCK_USER por profileUser en el JSX
//
// 5. Borrar la línea de MOCK_USER de abajo
// ─────────────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  // Mock temporal — reemplazar con useAuthStore() cuando el backend esté listo
  const user = MOCK_USER;

  return (
    <main className="min-h-screen bg-[#02010F] py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-55 md:shrink-0">
            <ProfileSidebar user={user} isOwnProfile={true} />
          </div>

          <div className="flex-1 min-w-0">
            <ProfileFeed userId={user.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
