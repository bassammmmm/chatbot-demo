import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '@/types/conversationTypes';

interface ConversationState {
    conversations: Record<number, Conversation>;
}

const initialState: ConversationState = {
    conversations: {},
};

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        cacheConversation: (
            state,
            action: PayloadAction<{ conversationId: number; data: Conversation }>
        ) => {
            state.conversations[action.payload.conversationId] = action.payload.data;
        },
        invalidateConversation: (state, action: PayloadAction<{ conversationId: number }>) => {
            delete state.conversations[action.payload.conversationId];
        },
        updateConversation: (
            state,
            action: PayloadAction<{ conversationId: number; data: Partial<Conversation> }>
        ) => {
            const existingConversation = state.conversations[action.payload.conversationId];
            if (existingConversation) {
                state.conversations[action.payload.conversationId] = {
                    ...existingConversation,
                    ...action.payload.data,
                };
            }
        },
    },
});

export const { cacheConversation, invalidateConversation, updateConversation } =
    conversationSlice.actions;

export default conversationSlice.reducer;