import React, { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function MainLayout() {
  const [activeChat, setActiveChat] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' && window.innerWidth >= 768);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  return (
    <div
      className="flex h-full w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(234.318deg,rgba(145,126,132,.92) 12.773%,rgba(59,43,64,.9) 68.824%,rgb(26,20,31) 100%)",
      }}
    >
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        isHistoryOpen={isHistoryOpen}
        setIsHistoryOpen={setIsHistoryOpen}
      />
      <main className="flex flex-col flex-1 min-w-0 h-full overflow-hidden relative">
        <Header setIsSidebarOpen={setIsSidebarOpen} title="Chat" />
        <div className="flex-1 overflow-hidden relative flex flex-col">
          <Outlet context={{ setIsSidebarOpen }} />
        </div>
      </main>
    </div>
  );
}
