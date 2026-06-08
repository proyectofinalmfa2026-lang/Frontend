// components/ui/MovieStrip.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Movie } from "@/lib/moviesList";

interface MovieStripProps {
  movies: Movie[];
  direction?: "up" | "down";
  speed?: number;
}

export const MovieStrip = ({
  movies,
  direction = "up",
  speed = 40,
}: MovieStripProps) => {
  const [duplicated, setDuplicated] = useState<Movie[]>([]);

  useEffect(() => {
    setDuplicated([...movies, ...movies, ...movies]);
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
      {duplicated.map((movie, idx) => (
        <motion.div
          key={`${movie.id}-${idx}`}
          className="relative group cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-32 h-48 sm:w-40 sm:h-56 md:w-44 md:h-64 lg:w-48 lg:h-72 rounded-lg overflow-hidden bg-linear-to-b from-[#161131] to-[#0e0a2b] border border-[#22194a] group-hover:border-[#c13a82] transition-all duration-300">
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
