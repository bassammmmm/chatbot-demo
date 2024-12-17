"use client";

import { useEffect, useState } from "react";
import Loading from "../Common/Loading";
import ConversationDate from "./ConversationDate";
import ChatInput from "./ChatInput";
import { getConversation } from "@/services/requests/conversationApi";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/store';
import { cacheConversation } from "@/store/conversation/conversationSlice";

interface ChatProps {
    conversationId?: number;
}

const Chat = ({ conversationId }: ChatProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isTexting, setIsTexting] = useState(false);

    const dispatch = useDispatch();

    const conversation = useSelector((state: RootState) => {
        if (!conversationId) return;
        return state.conversation.conversations[conversationId];
    });

    useEffect(() => {
        if (!conversationId) return;

        const fetchConversation = async () => {
            setIsLoading(true);
            try {
                const res = await getConversation(conversationId);
                dispatch(cacheConversation({ conversationId, data: res }));
            } catch (error) {
                console.error("Failed to fetch conversation:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!conversation) {
            fetchConversation();
        } else {
            setIsLoading(false);
        }
    }, [conversation, conversationId, dispatch]);

    const messages = conversation?.messages || [];
    const date = conversation?.created_at || "";

    return (
        <>
            <hr className="border-t-3 border-outline-variant my-2" />
            <div className="flex flex-col h-full min-h-0">
                {isLoading && (
                    <div className="flex items-center justify-center flex-grow">
                        <Loading />
                    </div>
                )}

                {!isLoading && messages && (
                    <>
                        <div className="flex-grow overflow-y-auto min-h-0">
                            <ConversationDate date={date} />
                            {messages.map((message, index) => (
                                <Message
                                    key={message.id}
                                    isBot={message.is_bot}
                                    textMessage={message.message_text}
                                    isTexting={isTexting && message.is_bot && index === messages.length - 1}
                                />
                            ))}
                        </div>

                        {conversationId && (
                            <div className="mt-2">
                                <ChatInput
                                    conversationId={conversationId}
                                    setIsTexting={setIsTexting}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Chat;