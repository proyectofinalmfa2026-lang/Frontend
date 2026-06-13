import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { userService } from "@/services/user.service";
import { mapBackendUserToProfile } from "@/lib/mappers";
import Cookies from "js-cookie";

export function useAuth() {
  const { setAuth, logout, user, isAuthenticated } = useAuthStore();
  const { setProfile, setLoading, setError, profile } = useUserStore();

  useEffect(() => {
    const token = Cookies.get("ct_token");

    if (!token || profile) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await userService.getMe();
        const data = res.data;

        const userProfile = mapBackendUserToProfile(data);

        setAuth(
          {
            id: data.id,
            name: data.name,
            email: data.email,
            username: data.username,
            role: data.role,
            avatar: data.avatar,
          },
          token,
        );

        setProfile(userProfile);
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
        setError("No se pudo cargar el perfil");
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { user, isAuthenticated, profile };
}
