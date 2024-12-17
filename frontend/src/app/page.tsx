"use client";

import ChatNav from "@/components/Conversation/ChatNav";
import Chat from "../components/Conversation/Chat";
import Sidebar from "@/components/Main/Sidebar";
import { useState } from "react";

export default function Home() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | undefined>(undefined);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  return (
    <main className="flex flex-grow">
      <div className="h-screen">
        {isSidebarOpened && (
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-[10px] z-10"
            onClick={() => setIsSidebarOpened(false)}
          ></div>
        )}
        <div
          className={`fixed top-0 left-0 h-screen w-[340px] bg-surface transition-transform duration-300 z-20 p-4 overflow-y-auto
      ${isSidebarOpened ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
          style={{
            borderRadius: "0px 28px 28px 0px",
          }}
        >
          <Sidebar
            selectedConversationId={selectedConversationId}
            setSelectedConversationId={setSelectedConversationId}
          />
        </div>
      </div>
      <div className="flex-grow flex flex-col ms-5 p-4 mb-3 bg-chatbot-bg border-2 border-transparent rounded-[28px] min-h-0 bg-surfaceContainerLowest">
        <ChatNav setIsSidebarOpened={setIsSidebarOpened} />
        <Chat conversationId={selectedConversationId} />
      </div>
    </main>
  );
}