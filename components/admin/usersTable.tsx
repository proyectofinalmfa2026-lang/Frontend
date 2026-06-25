"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import Modal from "@/components/ui/modal";
import { toast } from "sonner";
import Link from "next/link";

interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  role: "user" | "admin";
  isPremium: boolean;
  createdAt: string;
  bio?: string | null;
  avatar?: string | null;
  favoriteGenres?: string[];
  badges?: any[];
  reviewsCount?: number;
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detail, setDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetch = () => {
    setLoading(true);
    adminService.getUsers().then(setUsers).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const openDetail = async (u: User) => {
    setSelectedUser(u);
    setDetail(null);
    setDetailLoading(true);
    try {
      const d = await adminService.getUserDetail(u.id);
      setDetail(d);
    } catch { setDetail(null) }
    setDetailLoading(false);
  };

  const toggleRole = async (id: number, current: string) => {
    const newRole = current === "admin" ? "user" : "admin";
    try {
      await adminService.updateUserRole(id, newRole);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole as any } : u)));
      if (detail && detail.id === id) setDetail({ ...detail, role: newRole });
      showToast("Rol actualizado", "success");
    } catch { showToast("Error al actualizar rol", "error") }
  };

  const togglePremium = async (id: number, current: boolean) => {
    try {
      await adminService.updateUserPremium(id, !current);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isPremium: !current } : u)));
      if (detail && detail.id === id) setDetail({ ...detail, isPremium: !current });
      showToast(!current ? "Premium activado" : "Premium removido", "success");
    } catch { showToast("Error al actualizar premium", "error") }
  };

  const showToast = (msg: string, type: "success" | "error") => {
    toast.custom(() => (
      <div className={`flex items-center gap-3 bg-[#0E0A2B] border ${type === "success" ? "border-[#8C63C9]" : "border-[#C13A82]"} rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(140,99,201,0.3)]`}>
        <span className="text-2xl">{type === "success" ? "✅" : "❌"}</span>
        <p className="text-[#D6D0DC] font-medium text-sm">{msg}</p>
      </div>
    ), { position: "top-center", duration: 2500 });
  };

  if (loading) return <p className="text-xs text-[#7B7497]">Cargando usuarios...</p>;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-medium text-[#D6D0DC]">Usuarios</h1>
        <span className="text-xs text-[#7B7497]">{users.length} usuarios</span>
      </div>

      {users.length === 0 ? (
        <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-10 text-center">
          <p className="text-sm text-[#7B7497]">No hay usuarios registrados</p>
        </div>
      ) : (
        <>
          {/* Mobile card view */}
          <div className="flex flex-col gap-2 md:hidden">
            {users.map((u) => (
              <div key={u.id} className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#22194A] flex items-center justify-center text-xs text-[#7B7497] shrink-0">
                      {u.username?.charAt(0)?.toUpperCase() ?? "?"}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#D6D0DC]">@{u.username}</p>
                      <p className="text-[10px] text-[#5C5470]">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {u.isPremium && <span className="text-xs">👑</span>}
                    <span className={`inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      u.role === "admin" ? "bg-[#8C63C9]/10 text-[#8C63C9]" : "bg-[#22194A]/50 text-[#7B7497]"
                    }`}>
                      {u.role}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => openDetail(u)} className="flex-1 text-center text-[10px] bg-[#22194A]/50 hover:bg-[#22194A] text-[#7B7497] hover:text-[#D6D0DC] rounded-lg py-1.5 transition-colors cursor-pointer">
                    👁 Detalle
                  </button>
                  <button onClick={() => toggleRole(u.id, u.role)} className="flex-1 text-center text-[10px] bg-[#22194A]/50 hover:bg-[#8C63C9]/10 text-[#7B7497] hover:text-[#8C63C9] rounded-lg py-1.5 transition-colors cursor-pointer">
                    {u.role === "admin" ? "👤 User" : "🔑 Admin"}
                  </button>
                  <button onClick={() => togglePremium(u.id, u.isPremium)} className="flex-1 text-center text-[10px] bg-[#22194A]/50 hover:bg-[#F0A500]/10 text-[#7B7497] hover:text-[#F0A500] rounded-lg py-1.5 transition-colors cursor-pointer">
                    {u.isPremium ? "🚫 Premium" : "👑 Premium"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table view */}
          <div className="hidden md:block bg-[#0E0A2B] border border-[#22194A] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#22194A] text-[#7B7497] text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Usuario</th>
                    <th className="text-left px-4 py-3 font-medium">Email</th>
                    <th className="text-center px-4 py-3 font-medium">Rol</th>
                    <th className="text-center px-4 py-3 font-medium">Premium</th>
                    <th className="text-right px-4 py-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-[#22194A] last:border-b-0 hover:bg-[#22194A]/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#22194A] flex items-center justify-center text-xs text-[#7B7497] shrink-0">
                            {u.username?.charAt(0)?.toUpperCase() ?? "?"}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[#D6D0DC]">@{u.username}</p>
                            <p className="text-[10px] text-[#5C5470]">ID {u.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#7B7497]">{u.email}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          u.role === "admin" ? "bg-[#8C63C9]/10 text-[#8C63C9]" : "bg-[#22194A]/50 text-[#7B7497]"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-xs">
                        {u.isPremium ? "👑" : "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => openDetail(u)} className="px-2 py-1 text-[10px] text-[#7B7497] hover:text-[#D6D0DC] hover:bg-[#22194A]/50 rounded transition-colors cursor-pointer">
                            👁 Detalle
                          </button>
                          <button onClick={() => toggleRole(u.id, u.role)} className="px-2 py-1 text-[10px] text-[#7B7497] hover:text-[#8C63C9] hover:bg-[#8C63C9]/10 rounded transition-colors cursor-pointer">
                            {u.role === "admin" ? "👤 User" : "🔑 Admin"}
                          </button>
                          <button onClick={() => togglePremium(u.id, u.isPremium)} className="px-2 py-1 text-[10px] text-[#7B7497] hover:text-[#F0A500] hover:bg-[#F0A500]/10 rounded transition-colors cursor-pointer">
                            {u.isPremium ? "🚫 Quitar" : "👑 Dar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <Modal open={!!selectedUser} onClose={() => { setSelectedUser(null); setDetail(null); }}>
        {detailLoading ? (
          <p className="text-xs text-[#7B7497]">Cargando detalle...</p>
        ) : detail ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#22194A] flex items-center justify-center text-lg text-[#7B7497] shrink-0">
                {detail.username?.charAt(0)?.toUpperCase() ?? "?"}
              </div>
              <div>
                <p className="text-sm font-medium text-[#D6D0DC]">{detail.name ?? `@${detail.username}`}</p>
                <p className="text-xs text-[#7B7497]">@{detail.username} · {detail.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#02010F] rounded-lg px-3 py-2">
                <p className="text-[#5C5470]">Rol</p>
                <p className="text-[#D6D0DC] font-medium">{detail.role}</p>
              </div>
              <div className="bg-[#02010F] rounded-lg px-3 py-2">
                <p className="text-[#5C5470]">Premium</p>
                <p className="text-[#D6D0DC] font-medium">{detail.isPremium ? "👑 Sí" : "—"}</p>
              </div>
              <div className="bg-[#02010F] rounded-lg px-3 py-2">
                <p className="text-[#5C5470]">Reviews</p>
                <p className="text-[#D6D0DC] font-medium">{detail.reviewsCount}</p>
              </div>
              <div className="bg-[#02010F] rounded-lg px-3 py-2">
                <p className="text-[#5C5470]">Miembro desde</p>
                <p className="text-[#D6D0DC] font-medium">{new Date(detail.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {detail.bio && (
              <div className="bg-[#02010F] rounded-lg px-3 py-2">
                <p className="text-[10px] text-[#5C5470] mb-1">Bio</p>
                <p className="text-xs text-[#7B7497]">{detail.bio}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Link
                href={`/profile/${detail.username}`}
                className="flex-1 text-center text-xs bg-[#22194A] hover:bg-[#3D3460] text-[#D6D0DC] rounded-lg py-2 transition-colors"
              >
                Ver perfil
              </Link>
              <button
                onClick={() => toggleRole(detail.id, detail.role)}
                className="flex-1 text-xs bg-[#22194A] hover:bg-[#8C63C9]/20 text-[#7B7497] hover:text-[#8C63C9] rounded-lg py-2 transition-colors cursor-pointer"
              >
                {detail.role === "admin" ? "Quitar admin" : "Hacer admin"}
              </button>
              <button
                onClick={() => togglePremium(detail.id, detail.isPremium)}
                className="flex-1 text-xs bg-[#22194A] hover:bg-[#F0A500]/20 text-[#7B7497] hover:text-[#F0A500] rounded-lg py-2 transition-colors cursor-pointer"
              >
                {detail.isPremium ? "Quitar premium" : "Dar premium"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#C13A82]">Error al cargar detalle</p>
        )}
      </Modal>
    </div>
  );
}
