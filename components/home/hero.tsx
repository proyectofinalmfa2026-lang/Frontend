// components/home/hero.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MovieStrip } from "@/components/ui/movieStrip";
import { trendingMovies, Movie } from "@/lib/moviesList";

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dividir películas para desktop
  const third = Math.ceil(trendingMovies.length / 3);
  const col1 = trendingMovies.slice(0, third);
  const col2 = trendingMovies.slice(third, third * 2);
  const col3 = trendingMovies.slice(third * 2);

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
              <Link href="/Register">
                <Button className="bg-linear-to-r from-[#c13a82] to-[#8c63c9] text-white font-semibold px-8 py-6 rounded-full">
                  Comenzar ahora
                  <span className="ml-2">→</span>
                </Button>
              </Link>
              <Link href="/movies">
                <Button
                  variant="outline"
                  className="border-[#22194a] text-[#d6d0dc] px-8 py-6 rounded-full"
                >
                  Explorar películas
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
                {trendingMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="shrink-0 w-28 h-40 rounded-lg overflow-hidden bg-linear-to-b from-[#161131] to-[#0e0a2b] border border-[#22194a]"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                      <div className="text-3xl mb-1">🎬</div>
                      <p className="text-xs font-medium text-[#d6d0dc] line-clamp-2">
                        {movie.title}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="text-[#c13a82] text-xs">★</span>
                        <span className="text-[10px] text-[#7b7497]">
                          {movie.rating}
                        </span>
                      </div>
                    </div>
                  </div>
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
