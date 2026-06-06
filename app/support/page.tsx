import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="relative max-w-4xl mx-auto px-6 py-20">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-80 h-80 bg-[#C13A82]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <span className="text-[#C13A82] text-sm font-medium animate-pulse">
          ✦ Estamos para ayudarte
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-[#D6D0DC] mt-3 mb-6">
          Centro de Soporte
        </h1>

        <div className="space-y-6 text-[#7B7497] leading-relaxed text-lg">
          <p>
            Si tienes problemas con tu cuenta, listas de seguimiento,
            valoraciones o cualquier función de CineSphere, nuestro equipo está
            disponible para ayudarte.
          </p>

          <p>
            Trabajamos constantemente para mejorar la experiencia de la
            plataforma y agradecemos cualquier reporte de errores o sugerencia
            que nos ayude a construir una mejor comunidad para los amantes del
            cine.
          </p>

          <p>
            Para consultas generales puedes escribirnos a:
            <Link href="">
              <span className="text-[#fffff] hover:text-[#a92f71] transition p-2">
                soporte@cinesphere.com
              </span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
