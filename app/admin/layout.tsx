"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import AdminSidebar from "@/components/admin/adminSidebar";
import Loading from "@/components/ui/loading";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    } else {
      const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true));
      return () => unsub();
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const { isAuthenticated, user } = useAuthStore.getState();
    if (!isAuthenticated) {
      router.replace("/Login");
    } else if (user?.role !== "admin") {
      router.replace("/");
    }
  }, [hydrated, router]);

  if (!hydrated) return <Loading />;

  const { isAuthenticated, user } = useAuthStore.getState();
  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <main className="min-h-screen bg-[#02010F] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <AdminSidebar />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </main>
  );
}
