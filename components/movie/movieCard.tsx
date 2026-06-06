import Link from "next/link";
import { Movie } from "@/types/movie.types";
interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    description: string;
    rating: number;
  };
}
type Props = {
  movie: Movie;
};
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div
      className="
      bg-[#0E0A2B]
      border
      border-[#22194A]
      rounded-2xl
      overflow-hidden
      hover:border-[#8C63C9]
      hover:-translate-y-2
      transition-all
    "
    >
      <div className="h-72 bg-[#161131]" />

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400">★</span>

          <span className="text-[#D6D0DC]">{movie.rating}</span>
        </div>

        <h3 className="text-[#D6D0DC] font-semibold">{movie.title}</h3>

        <p className="text-[#7B7497] text-sm mt-2">{movie.description}</p>

        <Link
          href={`/movies/${movie.id}`}
          className="
            mt-4
            w-full
            block
            text-center
            bg-[#C13A82]
            hover:bg-[#A92F71]
            text-white
            py-2.5
            rounded-lg
            transition-colors
          "
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}
