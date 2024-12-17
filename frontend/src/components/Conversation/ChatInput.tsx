"use client";

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateConversation } from "@/store/conversation/conversationSlice";
import { createMessage } from "@/services/requests/messageApi";
import { RootState } from "@/store";

const StyledInput = styled(OutlinedInput)(({ }) => ({
  borderRadius: "28px",
  backgroundColor: "var(--surface-container-high)",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  opacity: 1,
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&:hover": { backgroundColor: "var(--surface-container-low)" },
  "&.Mui-focused": {
    backgroundColor: "var(--surface-container-low)",
    border: "1px solid var(--outline)",
  },
  "&.Mui-disabled": {
    cursor: "not-allowed",
    opacity: 0.6,
  },
  "& input": { color: "var(--on-surface)", fontSize: "14px", lineHeight: "24px" },
}));

interface ChatInputProps {
  conversationId: number;
  setIsTexting: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatInput({ conversationId, setIsTexting }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  const existingMessages = useSelector(
    (state: RootState) => state.conversation.conversations[conversationId]?.messages || []
  );


  const handleSendMessage = async () => {
    if (!value.trim()) return;

    const userMessagePayload = {
      message_text: value,
      conversation_id: conversationId,
      is_bot: false,
    };

    const botMessagePayload = {
      message_text: "This is an AI generated response",
      conversation_id: conversationId,
      is_bot: true,
    };

    try {
      setIsDisabled(true);

      const userMessage = await createMessage(userMessagePayload);
      const updatedMessages = [...existingMessages, userMessage];

      //Update the cache with the user message
      dispatch(updateConversation({ conversationId, data: { messages: updatedMessages } }));

      setValue("");
      setIsTexting(true);

      const botMessage = await createMessage(botMessagePayload);
      const finalMessages = [...updatedMessages, botMessage];

      //Update the cache with the bot message
      dispatch(updateConversation({ conversationId, data: { messages: finalMessages } }));

      setTimeout(async () => {
        setIsDisabled(false);
        setIsTexting(false);
      }, 1500);

    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="mt-3">
      <StyledInput
        placeholder="Reply to Chatbot"
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isDisabled && value.trim()) {
            handleSendMessage();
          }
        }}
        onChange={(e) => setValue(e.target.value)}
        disabled={isDisabled}
        className="w-full p-2 h-[56px]"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleSendMessage}
              disabled={isDisabled || !value.trim()}
              edge="end"
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
}