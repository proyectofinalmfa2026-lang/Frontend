import Link from "next/link";

export default function WatchlistPage() {
  const user = null; // luego vendrá de Zustand
  // const { user } = useAuthStore();

  if (!user) {
    return (
      <section className="min-h-screen bg-[#02010F] flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <span className="text-[#C13A82] text-sm font-medium animate-pulse">
            ✦ Watchlist
          </span>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-[#D6D0DC]">
            Guarda películas para ver después
          </h1>

          <p className="mt-5 text-[#7B7497] text-lg">
            Crea tu lista personal de películas, organiza lo que quieres ver y
            lleva un seguimiento de todo tu recorrido cinéfilo.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              href="/Login"
              className="
                bg-[#C13A82]
                hover:bg-[#A92F71]
                text-white
                px-6
                py-3
                rounded-xl
                transition-colors
              "
            >
              Iniciar sesión
            </Link>

            <Link
              href="/Register"
              className="
                border
                border-[#8C63C9]
                text-[#8C63C9]
                hover:bg-[#8C63C9]
                hover:text-white
                px-6
                py-3
                rounded-xl
                transition-colors
              "
            >
              Crear cuenta
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5 shadow-[0_0_100px_rgba(140,99,201,0.15)]">
              <h3 className="text-[#D6D0DC] font-semibold">Guarda películas</h3>

              <p className="text-[#7B7497] text-sm mt-2">
                Añade títulos a tu lista personal con un solo clic.
              </p>
            </div>

            <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5 shadow-[0_0_100px_rgba(140,99,201,0.15)]">
              <h3 className="text-[#D6D0DC] font-semibold">
                Organiza tu colección
              </h3>

              <p className="text-[#7B7497] text-sm mt-2">
                Mantén un registro de todo lo que quieres ver.
              </p>
            </div>

            <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-5 shadow-[0_0_100px_rgba(140,99,201,0.15)]">
              <h3 className="text-[#D6D0DC] font-semibold">
                Descubre recomendaciones
              </h3>

              <p className="text-[#7B7497] text-sm mt-2">
                Encuentra nuevas películas según tus gustos.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <div>Watchlist del usuario</div>;
}
