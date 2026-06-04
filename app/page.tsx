import { Hero } from "@/components/home/hero";
import TopRatedMovies from "@/components/home/topRatedMovies";
import { TrendingMovies } from "@/components/home/trending";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TopRatedMovies />
      <TrendingMovies />
    </main>
  );
}
