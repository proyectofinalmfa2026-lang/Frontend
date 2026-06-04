// components/home/trending.tsx
// Local MovieCard fallback (file movieCard.tsx isn't a module in some setups)
type Movie = {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  year: number;
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="bg-[#0b0b12] rounded overflow-hidden text-[#d6d0dc]">
      <div className="h-40 bg-gray-800 flex items-center justify-center">
        <img
          src={movie.posterPath}
          alt={movie.title}
          className="h-full w-auto"
        />
      </div>
      <div className="p-2">
        <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
        <p className="text-xs text-gray-400">
          {movie.year} • {movie.rating}
        </p>
      </div>
    </div>
  );
};

// Esto es un placeholder - luego conectarás con tu API real
const trendingData = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterPath: "/dune2.jpg",
    rating: 8.5,
    year: 2024,
  },
  {
    id: 2,
    title: "Oppenheimer",
    posterPath: "/oppenheimer.jpg",
    rating: 8.8,
    year: 2023,
  },
  // ... más películas
];

export const TrendingMovies = () => {
  return (
    <section className="py-16 bg-[#02010f]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-[#d6d0dc]">
          Tendencias
          <span className="text-[#c13a82]"> 🔥</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trendingData.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};
