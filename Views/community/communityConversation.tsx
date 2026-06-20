"use client";

import Link from "next/link";
import ConversationView from "@/components/community/conversationView";

interface Props {
  conversationId: string;
}

export default function CommunityConversation({ conversationId }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/community/messages"
        className="mb-4 inline-flex items-center gap-1 text-sm text-[#8B7F9D] transition hover:text-white"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver a mensajes
      </Link>
      <ConversationView conversationId={conversationId} />
    </div>
  );
}
