import { apiClient } from '@/apiClient';
import { Conversation, CreateConversationPayload } from '@/types/conversationTypes';

export const getConversations = async (): Promise<Conversation[]> => {
    return apiClient.get<Conversation[]>('/conversations');
};

export const createConversation = async (data: CreateConversationPayload): Promise<Conversation> => {
    return apiClient.post<Conversation, CreateConversationPayload>('/conversations/', data);
};

export const getConversation = async (id: number): Promise<Conversation> => {
    return apiClient.get<Conversation>(`/conversations/${id}`);
};

export const deleteConversation = async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/conversations/${id}/`);
};