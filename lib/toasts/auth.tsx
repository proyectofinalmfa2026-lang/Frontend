import { toast } from "sonner";

const registerMessages = [
  { icon: "🎟️", title: "¡Ya sos cinéfilo oficial!", sub: "Bienvenido a CineSphere." },
  { icon: "🎬", title: "Primer plano: tú.", sub: "Tu cuenta fue creada." },
  { icon: "🍿", title: "Asiento reservado.", sub: "Ya sos parte de la sala." },
  { icon: "📽️", title: "¡Que empiece la película!", sub: "Cuenta creada exitosamente." },
];

const loginMessages = [
  { icon: "🎬", title: "¡Luces, cámara, acción!", sub: "Bienvenido de vuelta." },
  { icon: "🎟️", title: "Tu entrada está lista.", sub: "Disfrutá la función." },
  { icon: "🍿", title: "¡A por las palomitas!", sub: "Ya estás dentro." },
  { icon: "🎭", title: "El show puede comenzar.", sub: "Bienvenido a CineSphere." },
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

const toastError = (title: string, message?: string, duration = 4000) =>
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
    { position: "top-center", duration },
  );

export const showLoginToast = () => toastSuccess(random(loginMessages));
export const showRegisterToast = () => toastSuccess(random(registerMessages));
export const showLogoutToast = () => toastSuccess(random(logoutMessages));

export const showLoginErrorToast = (message?: string) =>
  toastError("Error al iniciar sesión", message || "Email o contraseña incorrectos.");
export const showRegisterErrorToast = (message?: string) =>
  toastError("Error al registrarse", message || "No se pudo crear la cuenta.");

export const showAuthRequiredToast = (message?: string) => {
  const msg = message || "Necesitas iniciar sesión para usar esta función.";
  toast.custom(
    (t) => (
      <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#8C63C9] rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(140,99,201,0.3)]">
        <span className="text-2xl">🔒</span>
        <div className="flex-1">
          <p className="text-[#D6D0DC] font-medium text-sm">{msg}</p>
          <p className="text-[#7B7497] text-xs">Creá una cuenta o iniciá sesión.</p>
        </div>
        <button
          onClick={() => { window.location.href = "/Login"; toast.dismiss(t); }}
          className="rounded-lg bg-[#8C63C9] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#9B75D4] cursor-pointer"
        >
          Ingresar
        </button>
      </div>
    ),
    { position: "top-center", duration: 5000 },
  );
};
