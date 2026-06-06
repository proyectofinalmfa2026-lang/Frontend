export default function TermsPage() {
  return (
    <main className="relative max-w-4xl mx-auto px-6 py-20">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-80 h-80 bg-[#C13A82]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <span className="text-[#C13A82] text-sm font-medium animate-pulse">
          ✦ Uso responsable
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-[#D6D0DC] mt-3 mb-6">
          Términos y Condiciones
        </h1>

        <div className="space-y-6 text-[#7B7497] leading-relaxed text-lg">
          <p>
            Al acceder y utilizar CineSphere aceptas cumplir con estos términos
            y condiciones de uso.
          </p>

          <p>
            Los usuarios son responsables del contenido que publican, incluyendo
            reseñas, comentarios y listas personalizadas creadas dentro de la
            plataforma.
          </p>

          <p>
            CineSphere se reserva el derecho de suspender o eliminar cuentas que
            incumplan las normas de convivencia o utilicen la plataforma de
            manera abusiva.
          </p>

          <p>
            Estos términos pueden actualizarse periódicamente para adaptarse a
            nuevas funcionalidades o requisitos legales.
          </p>
        </div>
      </div>
    </main>
  );
}
