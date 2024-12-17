import { TMessage } from "@/types/messageTypes";

export interface Conversation {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    messages: TMessage[];
}

export interface CreateConversationPayload {
    title?: string;
}