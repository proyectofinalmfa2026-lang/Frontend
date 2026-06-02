import Link from "next/link";

const NotFound = () => {
  return (
    <div
      className="min-h-screen bg-linear-to-b
from-[#02010f]
to-[#0e0a2b]  flex flex-col items-center justify-center px-4 text-center"
    >
      <h1 className="hover:tracking-widest transition-all  text-[120px] md:text-[180px] font-semibold text-[#716c84] leading-none select-none">
        404
      </h1>

      {/* Contenido */}
      <div className="-mt-6 md:-mt-10 flex flex-col items-center">
        <h2 className="text-[#f0eee8] text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Página no encontrada
        </h2>
        <p className="text-[#c13a82] text-sm md:text-base max-w-sm mb-8">
          Ups... esta escena fue eliminada del guion.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="bg-[#c13a82] hover:bg-[#a92f71] transition-colors text-white px-6 py-3 rounded-lg text-sm font-medium"
          >
            Volver al inicio
          </Link>
          <Link
            href="movieCard"
            className="bg-white border border-[#E8E8ED] hover:border-[#8c63c9] hover:text-[#8c63c9] transition-colors text-[#1D1D1F] px-6 py-3 rounded-lg text-sm font-medium"
          >
            Ver Todas las Peliculas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
