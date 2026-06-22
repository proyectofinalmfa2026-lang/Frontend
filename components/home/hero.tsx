// components/home/hero.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MovieStrip, StripMovie } from "@/components/ui/movieStrip";
import { useMovies } from "@/hooks/useMovies";
import { useAuthStore } from "@/store/authStore";
import { Movie } from "@/types/movie.types";

const HERO_MOVIE_LIMIT = 12;

function getMovieRating(movie: Movie) {
  const reviews = movie.reviews ?? [];

  if (reviews.length > 0) {
    return (
      reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    );
  }

  return movie.rating ?? 0;
}

function getRandomMovies(movies: Movie[]): StripMovie[] {
  const shuffled = [...movies];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled.slice(0, HERO_MOVIE_LIMIT).map((movie) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster,
    rating: getMovieRating(movie),
  }));
}

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { movies } = useMovies();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const heroMovies = useMemo(() => getRandomMovies(movies), [movies]);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dividir películas para desktop
  const third = Math.ceil(heroMovies.length / 3);
  const col1 = heroMovies.slice(0, third);
  const col2 = heroMovies.slice(third, third * 2);
  const col3 = heroMovies.slice(third * 2);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#02010f]">
      {/* Fondos */}
      <div className="absolute inset-0 bg-linear-to-br from-[#02010f] via-[#0e0a2b]/50 to-[#02010f]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#c13a82] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8c63c9] rounded-full blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Columna izquierda - Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center lg:text-left z-10"
          >
            {isMobile && (
              <p className="font-serif text-2xl font-bold text-[#D6D0DC] mb-6">
                Cine<span className="text-[#C13A82]">Sphere</span>
              </p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c13a82]/10 border border-[#c13a82]/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c13a82] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c13a82]" />
              </span>
              <span className="text-xs font-medium text-[#c13a82]">
                Más de 500K películas rankeadas
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-linear-to-r from-[#d6d0dc] via-[#c13a82] to-[#8c63c9] bg-clip-text text-transparent">
                Descubre
              </span>
              <br />
              <span className="text-[#d6d0dc]">tu próxima</span>
              <br />
              <span className="bg-linear-to-r from-[#c13a82] to-[#8c63c9] bg-clip-text text-transparent">
                película favorita
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-lg text-[#7b7497] mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Únete a nuestra comunidad y descubre ratings personalizados,
              recomendaciones inteligentes y reviews de usuarios apasionados por
              el cine.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href={isAuthenticated ? "/movies" : "/Register"}>
                <Button className="bg-linear-to-r from-[#c13a82] to-[#8c63c9] text-white font-semibold px-8 py-6 rounded-full">
                  {isAuthenticated ? "Ir a películas" : "Comenzar ahora"}
                  <span className="ml-2">→</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Columna derecha - Películas */}
          {!isMobile ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1 hidden md:block"
            >
              <div className="flex gap-4 justify-center">
                <div className="relative overflow-hidden h-125 w-48">
                  <div className="absolute inset-0 bg-linear-to-t from-[#02010f] via-transparent to-[#02010f] pointer-events-none z-10" />
                  <MovieStrip movies={col1} direction="up" speed={45} />
                </div>
                <div className="relative overflow-hidden h-125 w-48">
                  <div className="absolute inset-0 bg-linear-to-t from-[#02010f] via-transparent to-[#02010f] pointer-events-none z-10" />
                  <MovieStrip movies={col2} direction="down" speed={35} />
                </div>
                <div className="relative overflow-hidden h-125 w-48">
                  <div className="absolute inset-0 bg-linear-to-t from-[#02010f] via-transparent to-[#02010f] pointer-events-none z-10" />
                  <MovieStrip movies={col3} direction="up" speed={40} />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="w-full md:hidden mt-8 overflow-x-auto pb-4">
              <div className="flex gap-3 px-1">
                {heroMovies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    className="shrink-0 w-28 h-40 rounded-lg overflow-hidden bg-linear-to-b from-[#161131] to-[#0e0a2b] border border-[#22194a]"
                  >
                    <div className="relative w-full h-full">
                      {movie.poster ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-2 text-center text-xs text-[#7b7497]">
                          Sin póster
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-[#02010f]/85 p-2">
                        <p className="text-xs font-medium text-[#d6d0dc] line-clamp-1">
                          {movie.title}
                        </p>
                        <span className="text-[10px] text-[#c13a82]">
                          ★ {movie.rating > 0 ? movie.rating.toFixed(1) : "N/A"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-[#7b7497]">Descubre más</span>
            <div className="w-6 h-10 border-2 border-[#22194a] rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 bg-[#c13a82] rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
