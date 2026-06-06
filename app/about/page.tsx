export default function AboutPage() {
  return (
    <main className="relative max-w-4xl mx-auto px-6 py-20">
      {/* Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-125 h-126 bg-[#C13A82]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <span className="text-[#C13A82] text-sm font-medium animate-pulse">
          ✦ Nuestra misión
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-[#D6D0DC] mt-3 mb-6">
          Acerca de CineSphere
        </h1>

        <div className="space-y-6 text-[#7B7497] leading-relaxed text-lg">
          <p>
            CineSphere nace con el objetivo de crear un espacio donde los
            amantes del cine puedan descubrir nuevas historias, compartir sus
            opiniones y conectar con una comunidad que comparte la misma pasión.
          </p>

          <p>
            Nuestra plataforma permite explorar películas, calificarlas,
            construir listas personalizadas y encontrar recomendaciones basadas
            en los gustos de cada usuario. Queremos que cada visita a CineSphere
            sea una oportunidad para encontrar tu próxima película favorita.
          </p>

          <p>
            Más que una simple base de datos de películas, buscamos construir
            una experiencia social donde las recomendaciones de la comunidad,
            las reseñas y las listas creadas por los usuarios ayuden a descubrir
            contenido de una forma más personal y entretenida.
          </p>
        </div>
      </div>
    </main>
  );
}
