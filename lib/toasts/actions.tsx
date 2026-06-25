import { toast } from "sonner";

const toastSuccess = (msg: { icon: string; title: string; sub: string }, duration = 3000) =>
  toast.custom(
    () => (
      <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#8C63C9] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(140,99,201,0.3)]">
        <span className="text-2xl">{msg.icon}</span>
        <div>
          <p className="text-[#D6D0DC] font-medium text-sm">{msg.title}</p>
          <p className="text-[#7B7497] text-xs">{msg.sub}</p>
        </div>
      </div>
    ),
    { position: "top-center", duration },
  );

const toastError = (title: string, message?: string) =>
  toast.custom(
    () => (
      <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#C13A82] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(193,58,130,0.25)]">
        <div className="w-8 h-8 rounded-full bg-[#C13A82]/10 border border-[#C13A82]/30 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C13A82" strokeWidth="2.5"><path d="M12 9v4M12 17h.01"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
        </div>
        <div>
          <p className="text-[#D6D0DC] font-medium text-sm">{title}</p>
          <p className="text-[#7B7497] text-xs">{message}</p>
        </div>
      </div>
    ),
    { position: "top-center", duration: 3000 },
  );

const followMessages = [
  { icon: "🎬", title: "¡Ahora seguís a este usuario!", sub: "Ya seguís su actividad." },
  { icon: "🎭", title: "Nueva conexión cinéfila.", sub: "Usuario seguido correctamente." },
  { icon: "🍿", title: "¡Ahora están en sincronía!", sub: "Comenzaste a seguir a este usuario." },
];

const unfollowMessages = [
  { icon: "👋", title: "Dejaste de seguir al usuario.", sub: "Ya no seguís su actividad." },
  { icon: "🎬", title: "Conexión finalizada.", sub: "Usuario dejado de seguir." },
];

export const showFollowToast = (following: boolean) => {
  const msgs = following ? followMessages : unfollowMessages;
  toastSuccess(msgs[Math.floor(Math.random() * msgs.length)]);
};

export const showFollowErrorToast = () =>
  toastError("No se pudo actualizar", "Intentá de nuevo más tarde.");

const watchlistMessages = [
  { icon: "📌", title: "Añadida a tu watchlist", sub: "La película se guardó en tu lista." },
  { icon: "🎬", title: "¡En tu watchlist!", sub: "No te la pierdas." },
  { icon: "🍿", title: "Reservada para después.", sub: "Ya está en tu watchlist." },
];

const watchlistRemoveMessages = [
  { icon: "👋", title: "Eliminada de tu watchlist", sub: "Ya no está en tu lista." },
  { icon: "🗑️", title: "Fuera de watchlist.", sub: "Película removida." },
];

export const showWatchlistToast = (added: boolean) => {
  const msgs = added ? watchlistMessages : watchlistRemoveMessages;
  toastSuccess(msgs[Math.floor(Math.random() * msgs.length)]);
};

export const showWatchlistErrorToast = () =>
  toastError("No se pudo actualizar", "Intentá de nuevo más tarde.");

const watchedMessages = [
  { icon: "✅", title: "Marcada como vista", sub: "Película agregada a tu historial." },
  { icon: "🎬", title: "¡Ya la viste!", sub: "Se guardó en tus películas vistas." },
  { icon: "🍿", title: "¡Otra más!", sub: "Ya viste esta película." },
];

const watchedRemoveMessages = [
  { icon: "👋", title: "Eliminada de vistas", sub: "Ya no está en tu historial." },
  { icon: "🗑️", title: "Vista removida.", sub: "Película quitada de tu lista." },
];

export const showWatchedToast = (added: boolean) => {
  const msgs = added ? watchedMessages : watchedRemoveMessages;
  toastSuccess(msgs[Math.floor(Math.random() * msgs.length)]);
};

export const showWatchedErrorToast = () =>
  toastError("No se pudo actualizar", "Intentá de nuevo más tarde.");
