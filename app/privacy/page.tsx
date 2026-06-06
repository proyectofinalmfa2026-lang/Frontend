export default function PrivacyPage() {
  return (
    <main className="relative max-w-4xl mx-auto px-6 py-20">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-80 h-80 bg-[#C13A82]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 ">
        <span className="text-[#C13A82] animate-pulse text-sm font-medium">
          ✦ Transparencia y confianza
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-[#D6D0DC] mt-3 mb-6">
          Política de Privacidad
        </h1>

        <div className="space-y-6 text-[#7B7497] leading-relaxed text-lg">
          <p>
            En CineSphere valoramos la privacidad de nuestros usuarios y nos
            comprometemos a proteger la información personal que compartan con
            nosotros.
          </p>

          <p>
            Los datos recopilados son utilizados únicamente para mejorar la
            experiencia dentro de la plataforma, personalizar recomendaciones y
            garantizar el correcto funcionamiento de nuestros servicios.
          </p>

          <p>
            No compartimos información personal con terceros sin consentimiento,
            salvo cuando sea requerido por ley o necesario para el
            funcionamiento técnico de la plataforma.
          </p>

          <p>
            Al utilizar CineSphere aceptas las prácticas descritas en esta
            política de privacidad.
          </p>
        </div>
      </div>
    </main>
  );
}
