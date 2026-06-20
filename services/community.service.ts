import api from "@/lib/axios";

interface Conversation {
  id: string;
  participant1: { id: number; name: string; username: string; avatar?: string };
  participant2: { id: number; name: string; username: string; avatar?: string };
}

interface Message {
  id: string;
  content: string;
  sender: { id: number };
  createdAt: string;
}

interface UserSearchResult {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
}

export const communityService = {
  getConversations: (userId: number) =>
    api.get<Conversation[]>(`/conversations/user/${userId}`).then((r) => r.data),

  createConversation: (participant1Id: number, participant2Id: number) =>
    api
      .post<Conversation>("/conversations", { participant1Id, participant2Id })
      .then((r) => r.data),

  getMessages: (conversationId: string) =>
    api
      .get<Message[]>(`/messages/conversation/${conversationId}`)
      .then((r) => r.data),

  sendMessage: (conversationId: string, content: string) =>
    api
      .post<Message>("/messages", { conversationId, content })
      .then((r) => r.data),

  aiChat: (message: string) =>
    api.post<{ response: string }>("/ai/chat", { message }).then((r) => r.data),

  searchUsers: (query: string) =>
    api.get<UserSearchResult[]>("/users/search", { params: { q: query } }).then((r) => r.data),
};
