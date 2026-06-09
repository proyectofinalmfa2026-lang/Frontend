import Link from "next/link";
const averageRating = 4.2;
export default function Movies() {
  return (
    <section className="bg-[#02010F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="mb-10 text-center">
          <span className="text-[#C13A82] text-sm font-medium">
            ✦ Destacadas
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#D6D0DC]">
            Películas Populares
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#7B7497] max-w-2xl mx-auto">
            Descubre algunas de las películas mejor valoradas por la comunidad.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-3 cursor-pointer">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((movie) => (
            <div
              key={movie}
              className="
          flex
          flex-col
          bg-[#0E0A2B]
          border
          border-[#22194A]
          rounded-2xl
          overflow-hidden
          hover:-translate-y-2
          hover:border-[#8C63C9]
          transition-all
          duration-300
        "
            >
              <div className="relative w-full flex items-center justify-center h-60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#f8f8f8]"
                >
                  <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1z" />
                </svg>
              </div>

              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(averageRating)
                            ? "text-yellow-400"
                            : "text-[#7B7497]"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}

                    <span className="ml-2 text-[#D6D0DC] font-semibold">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <h3 className="text-[#D6D0DC] font-semibold text-lg line-clamp-1">
                  Nombre de la Película
                </h3>

                <p className="text-[#7B7497] text-sm mt-2 line-clamp-2 flex-1">
                  Breve descripción de la película para mostrar información
                  rápida.
                </p>

                <Link
                  href="Login"
                  className="
              w-full
              mt-4
              bg-[#C13A82]
              hover:bg-[#A92F71]
              text-white
              py-2.5
              rounded-lg
              transition-colors
              text-center
            "
                >
                  Ver más
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12 cursor-pointer">
          <Link
            href="/movies"
            className="
        px-8
        py-3
        border
        border-[#8C63C9]
        text-[#8C63C9]
        rounded-xl
        hover:bg-[#8C63C9]
        hover:text-white
        transition-colors
        
      "
          >
            Ver todas las películas
          </Link>
        </div>
      </div>
    </section>
  );
}
