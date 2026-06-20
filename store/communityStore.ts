import { create } from "zustand";

interface User {
  id: number;
  name: string;
  username: string;
  avatar?: string;
}

interface Conversation {
  id: string;
  participant1: User;
  participant2: User;
}

interface Message {
  id: string;
  content: string;
  sender: { id: number };
  createdAt: string;
}

interface CommunityStore {
  conversations: Conversation[];
  currentConversationId: string | null;
  messages: Record<string, Message[]>;
  setConversations: (convs: Conversation[]) => void;
  setCurrentConversationId: (id: string | null) => void;
  addMessage: (conversationId: string, msg: Message) => void;
  setMessages: (conversationId: string, msgs: Message[]) => void;
}

export const useCommunityStore = create<CommunityStore>((set) => ({
  conversations: [],
  currentConversationId: null,
  messages: {},
  setConversations: (conversations) => set({ conversations }),
  setCurrentConversationId: (id) => set({ currentConversationId: id }),
  addMessage: (conversationId, msg) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [
          ...(state.messages[conversationId] || []),
          msg,
        ],
      },
    })),
  setMessages: (conversationId, msgs) =>
    set((state) => ({
      messages: { ...state.messages, [conversationId]: msgs },
    })),
}));
