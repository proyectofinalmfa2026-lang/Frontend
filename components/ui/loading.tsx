"use client";

import { useEffect, useState } from "react";
import { Clapperboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "Descubriendo tu próxima película favorita",
  "Preparando el catálogo...",
  "Cargando reseñas de la comunidad...",
];

export default function Loading() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-2 flex flex-col items-center justify-center bg-[#02010F] overflow-hidden">
      {/* Glow animado */}
      <motion.div
        className="absolute w-52 h-52 rounded-full bg-[#C13A82]/20 blur-3xl"
        animate={{
          scale: [2, 2.3, 2],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Claqueta */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{
            rotate: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          <Clapperboard size={80} className="text-[#C13A82]" />
        </motion.div>

        <p className="mt-6 text-[#D6D0DC] font-medium text-lg">
          Cargando CineSphere...
        </p>

        {/* Texto rotativo */}
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-2 text-sm text-[#7B7497]"
          >
            {MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Barra de progreso */}
        <div className="mt-6 w-48 h-1 bg-[#22194A] rounded-full overflow-hidden">
          <motion.div
            className="h-full w-20 bg-[#C13A82] rounded-full"
            animate={{
              x: ["-100%", "300%"],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
