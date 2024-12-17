export interface TMessage {
    id: number;
    message_text: string;
    is_bot: boolean;
    created_at: string;
    updated_at: string;
    conversation_id: number;
}

export interface CreateMessagePayload {
    message_text: string;
    conversation_id: number;
    is_bot: boolean;
}