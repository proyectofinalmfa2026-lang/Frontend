"use client";
import Link from "next/link";

interface TopMovie {
  id: number;
  title: string;
  year: number;
  duration: string;
  score: number;
  votes: string;
  description: string;
  posterPath: string | null;
}

// TODO: reemplazar con llamada al backend cuando esté listo
// movieService.getTopRated().then(...)

const TOP_MOVIES: TopMovie[] = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    duration: "2h 28min",
    score: 8.8,
    votes: "2.4M",
    description:
      "Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños recibe la tarea inversa de plantar una idea en la mente de un CEO.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    duration: "2h 55min",
    score: 9.2,
    votes: "1.9M",
    description:
      "El envejecido patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su reluctante hijo.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLeBHka4eeFh.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    duration: "2h 49min",
    score: 8.6,
    votes: "2.1M",
    description:
      "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de garantizar la supervivencia de la humanidad.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 4,
    title: "The Dark Knight",
    year: 2008,
    duration: "2h 32min",
    score: 9.0,
    votes: "2.8M",
    description:
      "Batman enfrenta al Joker, un criminal que busca sumir Gotham en el caos absoluto.",
    posterPath:
      "https://m.media-amazon.com/images/M/MV5BOGI5OGIwOGUtMzM4MC00MTZkLWI0MWMtZDkzNzE2ZjYxYWZlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: 1994,
    duration: "2h 34min",
    score: 8.9,
    votes: "2.1M",
    description:
      "Las historias de dos sicarios, un boxeador y una pareja de ladrones se entrelazan en el Los Ángeles criminal.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
  {
    id: 6,
    title: "Schindler's List",
    year: 1993,
    duration: "3h 15min",
    score: 9.0,
    votes: "1.4M",
    description:
      "Un empresario alemán salva la vida de más de mil judíos polacos durante el Holocausto.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    duration: "3h 21min",
    score: 9.0,
    votes: "1.8M",
    description:
      "Gandalf y Aragorn lideran al mundo de los hombres contra el ejército de Sauron.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
  },
  {
    id: 8,
    title: "Fight Club",
    year: 1999,
    duration: "2h 19min",
    score: 8.8,
    votes: "2.1M",
    description:
      "Un oficinista insomne y un fabricante de jabón forman un club de lucha clandestino.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 9,
    title: "Forrest Gump",
    year: 1994,
    duration: "2h 22min",
    score: 8.8,
    votes: "2.1M",
    description:
      "La vida del ingenuo Forrest Gump transcurre entre los eventos más importantes de la historia americana del siglo XX.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  },
  {
    id: 10,
    title: "The Matrix",
    year: 1999,
    duration: "2h 16min",
    score: 8.7,
    votes: "1.9M",
    description:
      "Un hacker descubre que la realidad tal como la conoce es una simulación creada por máquinas.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
];

// ─── Subcomponentes ────────────────────────────────────────────────────────────

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-medium z-10 ${
        rank === 1
          ? "bg-[#C13A82] text-white"
          : "bg-[#02010F]/80 border border-[#22194A] text-[#7B7497]"
      }`}
    >
      #{rank}
    </span>
  );
}

function PosterPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0E0A2B]">
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
  );
}

// (top 3)
function TopCard({ movie, rank }: { movie: TopMovie; rank: number }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl overflow-hidden hover:border-[#3D3460] transition-colors h-full flex flex-row cursor-pointer">
        {/* Imagen izquierda */}
        <div className="relative w- sm:w-32 shrink-0">
          <RankBadge rank={rank} />
          {movie.posterPath ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={movie.posterPath}
              alt={movie.title}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <PosterPlaceholder />
          )}
        </div>

        {/* Info derecha */}
        <div className="p-2.5 sm:p-3 flex flex-col gap-1 sm:gap-1.5 flex-1 justify-center">
          <p className="text-xs sm:text-sm font-medium text-[#D6D0DC] truncate">
            {movie.title}
          </p>
          <p className="text-[10px] sm:text-xs text-[#7B7497]">
            {movie.year} · {movie.duration}
          </p>
          <p className="text-xs sm:text-sm font-medium text-[#C13A82] flex items-center gap-1">
            ★ {movie.score}
            <span className="text-[10px] sm:text-xs text-[#7B7497] font-normal">
              ({movie.votes})
            </span>
          </p>
          {movie.description && (
            <p className="hidden sm:block text-xs text-[#7B7497] leading-relaxed line-clamp-3 mt-1">
              {movie.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

//  Responsive (#4 al #10) — desktop
function PosterCard({ movie, rank }: { movie: TopMovie; rank: number }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="cursor-pointer group">
        <div className="relative rounded-lg overflow-hidden border border-[#22194A] group-hover:border-[#3D3460] transition-colors aspect-2/3 w-full">
          {" "}
          <RankBadge rank={rank} />
          {movie.posterPath ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={movie.posterPath}
              alt={movie.title}
              className="w-full h-full object-bottom object-cover"
            />
          ) : (
            <PosterPlaceholder />
          )}
        </div>
        <p className="text-[10px] sm:text-xs font-medium text-[#D6D0DC] mt-1.5 truncate">
          {movie.title}
        </p>
        <p className="text-[10px] sm:text-xs text-[#C13A82] font-medium mt-0.5">
          ★ {movie.score}
        </p>
      </div>
    </Link>
  );
}

// Row horizontal para mobile (#4 al #10)
function MobileRow({ movie, rank }: { movie: TopMovie; rank: number }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="flex items-center gap-3 bg-[#0E0A2B] border border-[#22194A] rounded-lg p-2.5 hover:border-[#3D3460] transition-colors cursor-pointer">
        <span className="text-xs font-medium text-[#7B7497] w-6 shrink-0">
          #{rank}
        </span>
        <div className="relative w-10 h-14 shrink-0 rounded overflow-hidden border border-[#22194A]">
          {movie.posterPath ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={movie.posterPath}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <PosterPlaceholder />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[#D6D0DC] truncate">
            {movie.title}
          </p>
          <p className="text-[10px] text-[#7B7497] mt-0.5">
            {movie.year} · {movie.duration}
          </p>
        </div>
        <span className="text-xs font-medium text-[#C13A82] shrink-0">
          ★ {movie.score}
        </span>
      </div>
    </Link>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────────

export default function TopRatedMovies() {
  const top3 = TOP_MOVIES.slice(0, 3);
  const rest = TOP_MOVIES.slice(3);

  return (
    <section className="py-8 px-8 bg-[#02010F]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <h2 className="text-lg sm:text-xl font-medium text-[#D6D0DC]">
          Mejores 10 en CineSphere esta semana
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#7B7497]"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>

      {/* Top 3 — siempre 3 columnas */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
        {top3.map((movie, i) => (
          <TopCard key={movie.id} movie={movie} rank={i + 1} />
        ))}
      </div>

      {/* #4 al #10 — grid en desktop, lista en mobile */}
      <div className="hidden sm:grid sm:grid-cols-7 gap-2">
        {rest.map((movie, i) => (
          <PosterCard key={movie.id} movie={movie} rank={i + 4} />
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:hidden">
        {rest.map((movie, i) => (
          <MobileRow key={movie.id} movie={movie} rank={i + 4} />
        ))}
      </div>
    </section>
  );
}
