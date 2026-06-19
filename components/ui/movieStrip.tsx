"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface StripMovie {
  id: string;
  title: string;
  poster: string | null;
  rating: number;
}

interface MovieStripProps {
  movies: StripMovie[];
  direction?: "up" | "down";
  speed?: number;
}

export const MovieStrip = ({
  movies,
  direction = "up",
  speed = 40,
}: MovieStripProps) => {
  const [duplicated, setDuplicated] = useState<StripMovie[]>([]);

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
          <Link href={`/movies/${movie.id}`}>
            <div className="w-32 h-48 sm:w-40 sm:h-56 md:w-44 md:h-64 lg:w-48 lg:h-72 rounded-lg overflow-hidden border border-[#22194a] group-hover:border-[#c13a82] transition-all duration-300 relative">
              {movie.poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#0e0a2b] px-3 text-center text-xs text-[#7b7497]">
                  Sin póster
                </div>
              )}
              <div className="absolute inset-0 bg-[#02010f]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3">
                <p className="text-xs font-medium text-[#d6d0dc] line-clamp-2 text-center">
                  {movie.title}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-[#c13a82] text-xs">★</span>
                  <span className="text-[10px] text-[#7b7497]">
                    {movie.rating > 0 ? movie.rating.toFixed(1) : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};
