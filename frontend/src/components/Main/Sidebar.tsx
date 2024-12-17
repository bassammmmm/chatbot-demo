"use client";

import { Button } from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Loading from "../Common/Loading";
import { useEffect, useState } from "react";
import { createConversation, getConversations } from "@/services/requests/conversationApi";
import { Conversation } from "@/types/conversationTypes";
import { createMessage } from "@/services/requests/messageApi";
import DeleteConfirmDialog from "../Common/DeleteConfirmDialog";

interface SidebarProps {
  selectedConversationId?: number;
  setSelectedConversationId?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function Sidebar({ selectedConversationId, setSelectedConversationId }: SidebarProps) {

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleConversationClick = (id: number) => {
    setSelectedConversationId?.(id);
  }

  const handleAddConversation = () => {

    //ID - Created Date are auto generated. Title is not mandatory (Will be auto-generated if not provided).
    //That's why passing empty payload is ok.
    createConversation({}).then(async (res) => {

      const firstMessagePayload = {
        message_text: "How can I help you?",
        conversation_id: res?.id,
        is_bot: true
      }

      await createMessage(firstMessagePayload);
      setConversations([...conversations, res]);
      setSelectedConversationId?.(res.id);
    })

  }

  useEffect(() => {
    setIsLoading(true);

    getConversations()
      .then((res) => {
        setConversations(res);
        setSelectedConversationId?.(res[0]?.id);
        setIsLoading(false);

      })
  }, [setSelectedConversationId]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3 w-full">
        <Button
          disabled={isLoading}
          className="w-full h-[56px]"
          onClick={handleAddConversation}
          sx={{
            borderRadius: "16px",
            backgroundColor: "var(--primary-container)",
            color: "var(--on-primary-container)",
          }}
          variant="contained"
          startIcon={<ControlPointIcon />}
        >
          <span className="labelLarge truncate">Conversations</span>
        </Button>
      </div>

      {conversations.map((conversation) => (
        <div key={conversation.id} className="mb-3 w-full">
          <Button
            disabled={selectedConversationId === conversation.id}
            onClick={() => handleConversationClick(conversation.id)}
            className="w-full h-[56px] mb-3"
            sx={{
              borderRadius: "16px",
              backgroundColor: "var(--secondary-container)",
              color: "var(--on-secondary-container)",
              borderColor: "transparent",
              justifyContent: "space-between",
              padding: "0 16px",
            }}
            variant="outlined"
            endIcon={
              <div
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <DeleteConfirmDialog
                  conversationTitle={conversation.title}
                  conversationId={conversation.id}
                  setConversations={setConversations} />
              </div>
            }
          >
            <span className="bodyLarge truncate">{conversation.title}</span>
          </Button>
        </div>
      ))}

      <div className="flex flex-1 items-center justify-center">
        {isLoading && <Loading />}
      </div>
    </div>
  );
}


