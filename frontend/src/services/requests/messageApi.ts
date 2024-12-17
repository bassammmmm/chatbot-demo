import { apiClient } from '@/apiClient';
import { TMessage, CreateMessagePayload } from '@/types/messageTypes';

export const createMessage = async (data: CreateMessagePayload): Promise<TMessage> => {
    return apiClient.post<TMessage, CreateMessagePayload>('/messages/', data);
};