"use client";

import CommunityNav from "@/components/community/communityNav";
import ConversationList from "@/components/community/conversationList";

export default function CommunityMessages() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
          Mensajes Directos
        </h1>
        <p className="text-[#8B7F9D]">
          Conversaciones privadas con otros cinéfilos.
        </p>
      </div>
      <CommunityNav />
      <ConversationList />
    </div>
  );
}
