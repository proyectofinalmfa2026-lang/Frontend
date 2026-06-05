import { Hero } from "@/components/home/hero";
import PremiumBanner from "@/components/home/premiumBanner";
import TopRatedMovies from "@/components/home/topRatedMovies";
import MoviesPage from "@/components/home/movies";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TopRatedMovies />
      <MoviesPage />
      <PremiumBanner />
    </main>
  );
}
