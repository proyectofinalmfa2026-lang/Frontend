"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
}

// Datos de ejemplo - luego conectarás con tu API
const trendingMovies: Movie[] = [
  { id: 1, title: "Dune: Part Two", posterPath: "/dune2.jpg", rating: 8.5 },
  { id: 2, title: "Oppenheimer", posterPath: "/oppenheimer.jpg", rating: 8.8 },
  { id: 3, title: "Poor Things", posterPath: "/poor-things.jpg", rating: 8.4 },
  {
    id: 4,
    title: "The Boy and the Heron",
    posterPath: "/heron.jpg",
    rating: 8.3,
  },
  {
    id: 5,
    title: "Anatomy of a Fall",
    posterPath: "/anatomy.jpg",
    rating: 8.2,
  },
  {
    id: 6,
    title: "The Zone of Interest",
    posterPath: "/zone.jpg",
    rating: 8.1,
  },
  {
    id: 7,
    title: "Oppenheimer",
    posterPath: "/oppenheimer.jpg",
    rating: 8.8,
  },
  {
    id: 8,
    title: "Past Lives",
    posterPath: "/past-lives.jpg",
    rating: 8.0,
  },
];

const MovieStrip = ({
  movies,
  direction = "up",
  speed = 40,
}: {
  movies: Movie[];
  direction?: "up" | "down";
  speed?: number;
}) => {
  const [duplicatedMovies, setDuplicatedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Duplicar películas para crear efecto infinito
    setDuplicatedMovies([...movies, ...movies, ...movies]);
  }, [movies]);

  return (
    <motion.div
      className="flex flex-col gap-3 sm:gap-4"
      animate={{
        y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
    >
      {duplicatedMovies.map((movie, idx) => (
        <motion.div
          key={`${movie.id}-${idx}`}
          className="relative group cursor-pointer"
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <div className="w-32 h-48 sm:w-40 sm:h-56 md:w-44 md:h-64 lg:w-48 lg:h-72 rounded-lg overflow-hidden bg-linear-to-b from-[#161131] to-[#0e0a2b] border border-[#22194a] group-hover:border-[#c13a82] transition-all duration-300">
            {/* Placeholder del poster - luego reemplazar con imagen real */}
            <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 text-center bg-[#0e0a2b]">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">
                🎬
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#d6d0dc] line-clamp-2">
                {movie.title}
              </p>
              <div className="mt-1 sm:mt-2 flex items-center gap-1">
                <span className="text-[#c13a82] text-xs sm:text-sm">★</span>
                <span className="text-[10px] sm:text-xs text-[#7b7497]">
                  {movie.rating}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dividir películas según dispositivo
  const leftMovies = trendingMovies.slice(0, 4);
  const middleMovies = trendingMovies.slice(4, 8);
  const rightMovies = trendingMovies.slice(4, 8);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#02010f]">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-linear-to-b from-[#02010f] via-[#0e0a2b]/50 to-[#02010f]" />

      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#c13a82] rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#8c63c9] rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-4 py-12 sm:py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
          {/* Columna Izquierda - Mensaje */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center lg:text-left z-10"
          >
            {/* Logo/Badge para mobile */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-6"
              >
                <p className="font-serif text-2xl font-bold text-[#D6D0DC]">
                  Cine<span className="text-[#C13A82]">Sphere</span>
                </p>
              </motion.div>
            )}

            {/* Badge */}
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
                {isMobile
                  ? "500K+ películas"
                  : "Más de 500K películas rankeadas"}
              </span>
            </motion.div>

            {/* Título principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              <span className="bg-linear-to-b from-[#d6d0dc] via-[#c13a82] to-[#8c63c9] bg-clip-text text-transparent">
                Descubre
              </span>
              <br />
              <span className="text-[#d6d0dc]">tu próxima</span>
              <br />
              <span className="bg-linear-to-b from-[#c13a82] to-[#8c63c9] bg-clip-text text-transparent">
                película favorita
              </span>
            </motion.h1>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-base sm:text-lg text-[#7b7497] mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {isMobile
                ? "Únete y descubre ratings personalizados, recomendaciones y reviews."
                : "Únete a nuestra comunidad y descubre ratings personalizados, recomendaciones inteligentes y reviews de usuarios apasionados por el cine."}
            </motion.p>

            {/* Botones CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-linear-to-b from-[#c13a82] to-[#8c63c9] hover:from-[#a92f71] hover:to-[#7b53b0] text-white font-semibold px-6 sm:px-8 py-5 sm:py-6 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  Comenzar ahora
                  <span className="ml-2">→</span>
                </Button>
              </Link>
              <Link href="/movies" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-[#22194a] text-[#d6d0dc] hover:bg-[#0e0a2b] hover:border-[#c13a82] px-6 sm:px-8 py-5 sm:py-6 rounded-full transition-all duration-300 text-sm sm:text-base"
                >
                  Explorar películas
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Columna Derecha - Carrusel de películas */}
          {!isMobile ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1 hidden md:block"
            >
              <div className="flex gap-3 lg:gap-4 justify-center">
                {/* Columna izquierda - subiendo lento */}
                <div className="relative overflow-hidden h-[500px] sm:h-[550px] md:h-[600px] w-32 sm:w-40 md:w-44 lg:w-48">
                  <div className="absolute inset-0 bg-linear-to-b from-[#02010f] via-transparent to-[#02010f] pointer-events-none z-10" />
                  <MovieStrip movies={leftMovies} direction="up" speed={45} />
                </div>

                {/* Columna central - bajando rápido */}
                <div className="relative overflow-hidden h-[500px] sm:h-[550px] md:h-[600px] w-32 sm:w-40 md:w-44 lg:w-48">
                  <div className="absolute inset-0 bg-linear-to-b from-[#02010f] via-transparent to-[#02010f] pointer-events-none z-10" />
                  <MovieStrip
                    movies={middleMovies}
                    direction="down"
                    speed={35}
                  />
                </div>

                {/* Columna derecha - subiendo medio */}
                <div className="relative overflow-hidden h-[500px] sm:h-[550px] md:h-[600px] w-32 sm:w-40 md:w-44 lg:w-48">
                  <div className="absolute inset-0 bg-linear-to-b from-[#02010f] via-transparent to-[#02010f] pointer-events-none z-10" />
                  <MovieStrip movies={rightMovies} direction="up" speed={40} />
                </div>
              </div>
            </motion.div>
          ) : (
            /* Versión mobile - carrusel horizontal simplificado */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full md:hidden mt-8"
            >
              <div className="relative overflow-x-auto pb-4">
                <div className="flex gap-3 px-1">
                  {trendingMovies.map((movie, idx) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                      className="shrink-0 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-28 h-40 rounded-lg overflow-hidden bg-linear-to-bfrom-[#161131] to-[#0e0a2b] border border-[#22194a]">
                        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-[#0e0a2b]">
                          <div className="text-3xl mb-1">🎬</div>
                          <p className="text-xs font-medium text-[#d6d0dc] line-clamp-2 px-1">
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
                    </motion.div>
                  ))}
                </div>
                {/* Indicador de scroll horizontal */}
                <div className="flex justify-center gap-1 mt-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c13a82]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22194a]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22194a]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22194a]" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Indicador de scroll - solo visible en desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
    </section>
  );
};
