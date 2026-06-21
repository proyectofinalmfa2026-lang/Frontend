import { toast } from "sonner";

const registerMessages = [
  {
    icon: "🎟️",
    title: "¡Ya sos cinéfilo oficial!",
    sub: "Bienvenido a CineSphere.",
  },
  { icon: "🎬", title: "Primer plano: tú.", sub: "Tu cuenta fue creada." },
  { icon: "🍿", title: "Asiento reservado.", sub: "Ya sos parte de la sala." },
  {
    icon: "📽️",
    title: "¡Que empiece la película!",
    sub: "Cuenta creada exitosamente.",
  },
];

const loginMessages = [
  {
    icon: "🎬",
    title: "¡Luces, cámara, acción!",
    sub: "Bienvenido de vuelta.",
  },
  { icon: "🎟️", title: "Tu entrada está lista.", sub: "Disfrutá la función." },
  { icon: "🍿", title: "¡A por las palomitas!", sub: "Ya estás dentro." },
  {
    icon: "🎭",
    title: "El show puede comenzar.",
    sub: "Bienvenido a CineSphere.",
  },
  { icon: "📽️", title: "Rodando...", sub: "Sesión iniciada correctamente." },
];

const logoutMessages = [
  { icon: "👋", title: "¡Hasta la próxima!", sub: "Tu sesión fue cerrada." },
  { icon: "🎬", title: "Fin de la función.", sub: "Vuelve cuando quieras." },
  { icon: "🍿", title: "Se acabaron las palomitas.", sub: "Sesión cerrada." },
  { icon: "📽️", title: "Corte.", sub: "Hasta la próxima función." },
  { icon: "🎭", title: "El telón bajó.", sub: "Sesión cerrada correctamente." },
];

const random = (arr: typeof loginMessages) =>
  arr[Math.floor(Math.random() * arr.length)];

export const showLoginToast = () => {
  const msg = random(loginMessages);
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
    { position: "top-center", duration: 3000 },
  );
};

export const showRegisterToast = () => {
  const msg = random(registerMessages);
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
    { position: "top-center", duration: 3000 },
  );
};
export const showAuthRequiredToast = (message?: string) => {
  const msg = message || "Necesitas iniciar sesión para usar esta función.";
  toast.custom(
    (t) => (
      <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#8C63C9] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(140,99,201,0.3)]">
        <span className="text-2xl">🔒</span>
        <div className="flex-1">
          <p className="text-[#D6D0DC] font-medium text-sm">{msg}</p>
          <p className="text-[#7B7497] text-xs">
            Creá una cuenta o iniciá sesión.
          </p>
        </div>
        <button
          onClick={() => {
            window.location.href = "/Login";
            toast.dismiss(t);
          }}
          className="rounded-lg bg-[#8C63C9] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#9B75D4] cursor-pointer"
        >
          Ingresar
        </button>
      </div>
    ),
    { position: "top-center", duration: 5000 },
  );
};

const followMessages = [
  {
    icon: "🎬",
    title: "¡Ahora siguess a este usuario!",
    sub: "Ya sigues su actividad.",
  },
  {
    icon: "🎭",
    title: "Nueva conexión cinéfila.",
    sub: "Usuario seguido correctamente.",
  },
  {
    icon: "🍿",
    title: "¡Ahora están en sincronía!",
    sub: "Comenzaste a seguír a este usuario.",
  },
];

const unfollowMessages = [
  {
    icon: "👋",
    title: "Dejaste de seguír al usuario.",
    sub: "Ya no sigues su actividad.",
  },
  {
    icon: "🎬",
    title: "Conexión finalizada.",
    sub: "Usuario dejado de seguír.",
  },
];

export const showFollowToast = (following: boolean) => {
  const msg = following
    ? followMessages[Math.floor(Math.random() * followMessages.length)]
    : unfollowMessages[Math.floor(Math.random() * unfollowMessages.length)];
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
    { position: "top-center", duration: 3000 },
  );
};

export const showFollowErrorToast = () => {
  toast.custom(
    () => (
      <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#8C63C9] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(140,99,201,0.3)]">
        <span className="text-2xl">⚠️</span>
        <div>
          <p className="text-[#D6D0DC] font-medium text-sm">
            No se pudo actualizar
          </p>
          <p className="text-[#7B7497] text-xs">Intentá de nuevo más tarde.</p>
        </div>
      </div>
    ),
    { position: "top-center", duration: 3000 },
  );
};

export const showLogoutToast = () => {
  const msg = random(logoutMessages);
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
    { position: "top-center", duration: 3000 },
  );
};
