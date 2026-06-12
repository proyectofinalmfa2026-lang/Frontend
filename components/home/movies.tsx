import Link from "next/link";

const FEATURED_MOVIES = [
  {
    id: 1,
    title: "Possession",
    year: 1981,
    rating: 4.2,
    description:
      "Tras una separación cada vez más conflictiva, una pareja se ve envuelta en una espiral de obsesión, paranoia y acontecimientos difíciles de explicar.",
    posterPath:
      "https://posterspy.com/wp-content/uploads/2022/12/Possession-Download-1.jpg",
  },
  {
    id: 2,
    title: "Hausu",
    year: 1977,
    rating: 3.9,
    description:
      "Un grupo de estudiantes visita una casa de campo donde comienzan a suceder eventos cada vez más extraños e impredecibles.",
    posterPath:
      "https://m.media-amazon.com/images/M/MV5BOGI5OGIwOGUtMzM4MC00MTZkLWI0MWMtZDkzNzE2ZjYxYWZlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 3,
    title: "Primer",
    year: 2004,
    rating: 4.0,
    description:
      "Dos ingenieros trabajan en un proyecto experimental que termina teniendo consecuencias inesperadas.",
    posterPath:
      "https://th.bing.com/th/id/OIP.2KdzZlXVsHHfWJm98RDM9QHaKw?w=208&h=301&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    id: 4,
    title: "Coherence",
    year: 2013,
    rating: 4.1,
    description:
      "Durante una cena entre amigos, un fenómeno astronómico coincide con una serie de sucesos inquietantes que alteran la realidad tal como la conocen.",
    posterPath:
      "https://www.themoviedb.org/t/p/original/iyKawgtVAPc966CUUQHCOkcFtTf.jpg",
  },
  {
    id: 5,
    title: "Aniara",
    year: 2018,
    rating: 3.8,
    description:
      "Una nave que transporta colonos hacia un nuevo hogar sufre un incidente que cambia por completo su destino.",
    posterPath:
      "https://www.deepfocusreview.com/wp-content/uploads/2025/02/Aniara-movie-poster.png",
  },
  {
    id: 6,
    title: "Mandy",
    year: 2018,
    rating: 4.0,
    description:
      "La tranquila vida de una pareja es destruida por la aparición de un grupo misterioso con inquietantes creencias.",
    posterPath:
      "https://th.bing.com/th/id/R.5cb7dd89f8d2fe8fba28ea6f47814885?rik=57282dLxhvpZ7w&riu=http%3a%2f%2fwww.slashfilm.com%2fwp%2fwp-content%2fimages%2fimage-2.jpeg&ehk=%2bJJVrYDNPgbaAcZ5VmOJ1PTQGiAO0yZg99fVz9afGPc%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 7,
    title: "Brick",
    year: 2005,
    rating: 4.1,
    description:
      "Cuando una joven desaparece, un estudiante decide investigar por su cuenta y descubre una red de secretos.",
    posterPath: "https://m.media-amazon.com/images/I/51CMP4MKYQL._SX385_.jpg",
  },
  {
    id: 8,
    title: "Fantastic Planet",
    year: 1973,
    rating: 4.3,
    description:
      "Tras una infancia marcada por experiencias traumáticas dentro de un ambiente circense y religioso, un joven intenta reconstruir su identidad. Una película perturbadora y fascinante que mezcla terror, drama y simbolismo.",
    posterPath:
      "https://cdn.posteritati.com/posters/000/000/020/091/santa-sangre-md-web.jpg",
  },
];

export default function Movies() {
  return (
    <section className="bg-[#02010F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        {/* Header */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_MOVIES.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col bg-[#0E0A2B] border border-[#22194A] rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-[#8C63C9] transition-all duration-300"
            >
              <div className="relative w-full h-72 sm:h-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(movie.rating) ? "text-yellow-400" : "text-[#7B7497]"}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-[#D6D0DC] font-semibold">
                    {movie.rating.toFixed(1)}
                  </span>
                </div>

                <h3 className="text-[#D6D0DC] font-semibold text-lg line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-[#7B7497] text-sm mt-2 line-clamp-2 flex-1">
                  {movie.description}
                </p>

                <Link
                  href={`/movies/${movie.id}`}
                  className="w-full mt-4 bg-[#C13A82] hover:bg-[#A92F71] text-white py-2.5 rounded-lg transition-colors text-center"
                >
                  Ver más
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Ver todas */}
        <div className="flex justify-center mt-12">
          <Link
            href="/movies"
            className="px-8 py-3 border border-[#8C63C9] text-[#8C63C9] rounded-xl hover:bg-[#8C63C9] hover:text-white transition-colors"
          >
            Ver todas las películas
          </Link>
        </div>
      </div>
    </section>
  );
}
