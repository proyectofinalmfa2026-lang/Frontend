"use client";

import CommunityNav from "@/components/community/communityNav";
import AiChat from "@/components/community/aiChat";

export default function CommunityAi() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
          CineSphere AI
        </h1>
        <p className="text-[#8B7F9D]">
          Pregúntame sobre películas, actores, directores o recomendaciones.
        </p>
      </div>
      <CommunityNav />
      <AiChat />
    </div>
  );
}
