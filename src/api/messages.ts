import api from "./client";
import type { Conversation, Message, SendMessageRequest } from "./types";

export const messagesApi = {
  getConversations: () =>
    api.get<Conversation[]>("/messages/conversations"),

  getConversation: (id: string) =>
    api.get<Conversation>(`/messages/conversations/${id}`),

  sendMessage: (data: SendMessageRequest) =>
    api.post<Message>("/messages/send", data),

  markAsRead: (conversationId: string) =>
    api.patch<void>(`/messages/conversations/${conversationId}/read`, {}),

  getUnreadCount: () =>
    api.get<{ count: number }>("/messages/unread-count"),
};
