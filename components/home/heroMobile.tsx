"use client";
// components/home/heroMobile.tsx
// Versión mobile del carrusel: scroll horizontal simple, sin animaciones verticales.

import { motion } from "framer-motion";
import { Movie } from "@/lib/moviesList";

interface HeroMobileProps {
  movies: Movie[];
  isLoaded: boolean;
}

export const HeroMobile = ({ movies, isLoaded }: HeroMobileProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full md:hidden mt-8"
    >
      <div className="relative overflow-x-auto pb-4">
        <div className="flex gap-3 px-1">
          {movies.map((movie, idx) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
              className="shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-28 h-40 rounded-lg overflow-hidden bg-linear-to-b from-[#161131] to-[#0e0a2b] border border-[#22194a]">
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

        {/* Indicadores de scroll */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c13a82]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#22194a]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#22194a]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#22194a]" />
        </div>
      </div>
    </motion.div>
  );
};
