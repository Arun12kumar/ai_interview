import React from "react";
import {
  Brain,
  MessageSquare,
  MessageSquarePlus,
  Archive,
  Library,
  FolderPlus,
  Folder,
  Sidebar as SidebarIcon,
  Zap,
  History,
  ChevronDown
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { cn } from "../components/ui/utils";

const CHAT_HISTORY = [
  {
    group: "Today",
    chats: [
      { id: 101, title: "Django vs FastAPI comparison", time: "10:30 AM" },
      { id: 102, title: "React vs Vue performance metrics", time: "09:15 AM" },
    ],
  },
  {
    group: "Yesterday",
    chats: [
      { id: 103, title: "System design principles and best practices for scaling", time: "04:45 PM" },
      { id: 104, title: "TypeScript advanced types", time: "02:20 PM" },
      { id: 105, title: "Next.js server components", time: "11:10 AM" },
    ],
  },
  {
    group: "Jan 28, 2026",
    chats: [
      { id: 106, title: "GraphQL vs REST architectures", time: "03:00 PM" },
      { id: 107, title: "Docker containerization guide", time: "01:30 PM" },
    ],
  },
];

function StatBadge({ icon, value, isSidebarOpen = true }: { icon: React.ReactNode; value: string; isSidebarOpen?: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border-white/20 bg-white/10 text-[#EAE7EC] hover:bg-white/15 backdrop-blur-sm [&>svg]:size-3.5 cursor-default transition-all duration-300",
        isSidebarOpen ? "gap-1.5 px-3 py-1.5" : "px-0 size-8 justify-center [&>svg]:size-[15px]"
      )}
    >
      {icon}
      {isSidebarOpen && <span className="text-[13px]">{value}</span>}
    </Badge>
  );
}

function NavItem({ icon: Icon, label, isActive, onClick, isSidebarOpen }: { icon: any, label: string, isActive: boolean, onClick: () => void, isSidebarOpen: boolean }) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={onClick}
          className={cn(
            "rounded-xl transition-all h-auto",
            isSidebarOpen ? "w-full justify-start gap-3.5 px-4 py-2.5 text-[14px]" : "size-11 p-0 justify-center mx-auto",
            isActive
              ? "text-white bg-white/[.07]"
              : "text-white/60 hover:bg-white/[.07] hover:text-white/90"
          )}
        >
          <Icon className="size-4 shrink-0 opacity-80" />
          {isSidebarOpen && <span className="truncate font-normal">{label}</span>}
        </Button>
      </TooltipTrigger>
      {!isSidebarOpen && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  );
}

function HistoryItem({ title, time, isActive, onClick, isSidebarOpen }: { title: string, time: string, isActive: boolean, onClick: () => void, isSidebarOpen: boolean }) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={onClick}
          className={cn(
            "rounded-xl transition-all h-auto",
            isSidebarOpen ? "w-full justify-between gap-3 px-3 py-2 text-[13px]" : "size-11 p-0 justify-center mx-auto",
            isActive
              ? "text-white bg-white/[.07]"
              : "text-white/60 hover:bg-white/[.07] hover:text-white/90"
          )}
        >
          {isSidebarOpen ? (
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="truncate w-full text-left font-normal">{title}</span>
              <span className="text-[11.5px] text-white/40 mt-0.5">{time}</span>
            </div>
          ) : (
            <MessageSquare className="size-4 shrink-0 opacity-80" />
          )}
        </Button>
      </TooltipTrigger>
      {!isSidebarOpen && (
        <TooltipContent side="right">
          <div className="flex flex-col gap-0.5">
            <span>{title}</span>
            <span className="text-[10px] text-white/50">{time}</span>
          </div>
        </TooltipContent>
      )}
    </Tooltip>
  );
}

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (v: boolean) => void;
  activeChat: number;
  setActiveChat: (v: number) => void;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (v: boolean) => void;
}

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  activeChat,
  setActiveChat,
  isHistoryOpen,
  setIsHistoryOpen
}: SidebarProps) {
  return (
    <>
      {/* ── Mobile Sidebar Overlay ── */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity duration-200",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ touchAction: "none", WebkitTapHighlightColor: "transparent" }}
        onClick={() => setIsSidebarOpen(false)}
        onTouchEnd={(e) => { e.preventDefault(); setIsSidebarOpen(false); }}
      />

      {/* ── Sidebar ── */}
      <aside 
        className={cn(
          "flex flex-col shrink-0 h-full border-r border-white/[.08] z-40 overflow-hidden",
          "absolute md:relative bg-[#211825] md:bg-transparent",
          isSidebarOpen ? "translate-x-0 w-[261px]" : "-translate-x-full md:translate-x-0 w-[68px]"
        )}
        style={{
          transition: "transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), width 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform, width",
          transform: isSidebarOpen ? "translate3d(0,0,0)" : undefined,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className={cn("flex flex-col h-full", isSidebarOpen ? "w-[261px]" : "w-[68px]")}>
          {/* Logo — extra top padding so toggle pill doesn't overlap */}
          <div className={cn("flex items-center pt-5 pb-5 transition-all overflow-hidden", isSidebarOpen ? "justify-between px-5" : "flex-col justify-center px-0 gap-4")}>
            <div className={cn("flex items-center gap-3", !isSidebarOpen && "hidden")}>
              <Brain className="size-7 text-white/90 shrink-0" />
              <span
                className="text-white text-2xl tracking-tight"
                style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
              >
                <span style={{ fontStyle: "normal" }}>AI</span>
                <span style={{ fontStyle: "italic" }}> Interview</span>
              </span>
            </div>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="size-8 text-white/50 hover:text-white hover:bg-white/10 rounded-md shrink-0"
                >
                  <SidebarIcon className="size-4.5" />
                </Button>
              </TooltipTrigger>
              {!isSidebarOpen && <TooltipContent side="right">Expand</TooltipContent>}
            </Tooltip>
          </div>

          <Separator className={cn("bg-white/[.08] transition-all", isSidebarOpen ? "mx-5 w-auto" : "mx-auto w-8")} />

          {/* New Chat */}
          <div className={cn("py-2", isSidebarOpen ? "px-4" : "px-0 flex justify-center")}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "rounded-xl bg-white/[.12] text-white hover:bg-white/[.16] shadow-none transition-all",
                    isSidebarOpen ? "w-full justify-start gap-3 px-4 py-3 h-auto" : "justify-center p-0 size-[44px]"
                  )}
                >
                  <MessageSquarePlus className={cn("opacity-80 shrink-0", isSidebarOpen ? "size-[18px]" : "size-5")} />
                  {isSidebarOpen && <span className="font-normal text-[14.5px]">New Chat</span>}
                </Button>
              </TooltipTrigger>
              {!isSidebarOpen && <TooltipContent side="right">New Chat</TooltipContent>}
            </Tooltip>
          </div>

          {/* Navigation list */}
          <ScrollArea className={cn("flex-1 mt-2", isSidebarOpen ? "px-4" : "px-0")}>
            <div className={cn("pb-6", isSidebarOpen ? "space-y-6" : "space-y-4 flex flex-col items-center")}>
              
              {/* Features */}
              <div className={cn(!isSidebarOpen && "w-full flex flex-col items-center")}>
                {isSidebarOpen && (
                  <div className="px-4 pb-2 text-[12px] font-medium text-white/40 tracking-wide uppercase">
                    Features
                  </div>
                )}
                <nav className={cn("space-y-0.5", !isSidebarOpen && "w-full flex flex-col items-center gap-1")}>
                  {/* Chat Dropdown */}
                  <div className="w-full flex flex-col">
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            if (!isSidebarOpen) {
                              setIsSidebarOpen(true);
                              setIsHistoryOpen(true);
                            } else {
                              setIsHistoryOpen(!isHistoryOpen);
                            }
                          }}
                          className={cn(
                            "rounded-xl transition-all h-auto",
                            isSidebarOpen ? "w-full justify-between gap-3 px-4 py-2.5 text-[14px]" : "size-11 p-0 justify-center mx-auto",
                            (activeChat >= 100 || activeChat === 1)
                              ? "text-white bg-white/[.07]"
                              : "text-white/60 hover:bg-white/[.07] hover:text-white/90"
                          )}
                        >
                          <div className={cn("flex items-center", isSidebarOpen ? "gap-3.5" : "")}>
                            <History className="size-4 shrink-0 opacity-80" />
                            {isSidebarOpen && <span className="font-normal text-left truncate">Chat</span>}
                          </div>
                          {isSidebarOpen && (
                            <ChevronDown className={cn("size-4 text-white/40 transition-transform", isHistoryOpen && "rotate-180")} />
                          )}
                        </Button>
                      </TooltipTrigger>
                      {!isSidebarOpen && <TooltipContent side="right">Chat</TooltipContent>}
                    </Tooltip>

                    {/* Chat History Dropdown Content */}
                    <div
                      className={cn(
                        "grid transition-all duration-200 ease-in-out",
                        isHistoryOpen && isSidebarOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="max-h-[130px] md:max-h-[180px] md:max-h-[250px] overflow-y-auto w-full custom-scrollbar pr-1">
                          <div className="pl-3 pr-2 py-1 flex flex-col gap-3">
                            {CHAT_HISTORY.map((group, idx) => (
                              <div key={idx} className="w-full">
                                <div className="px-2 pb-1.5 pt-1 text-[11px] font-medium text-white/40 tracking-wide uppercase">
                                  {group.group}
                                </div>
                                <nav className="space-y-0.5">
                                  {group.chats.map((chat) => (
                                    <HistoryItem 
                                      key={chat.id} 
                                      title={chat.title} 
                                      time={chat.time} 
                                      isActive={activeChat === chat.id} 
                                      onClick={() => setActiveChat(chat.id)} 
                                      isSidebarOpen={isSidebarOpen} 
                                    />
                                  ))}
                                </nav>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <NavItem icon={Archive} label="Archived" isActive={activeChat === 2} onClick={() => setActiveChat(2)} isSidebarOpen={isSidebarOpen} />
                  <NavItem icon={Library} label="Library" isActive={activeChat === 3} onClick={() => setActiveChat(3)} isSidebarOpen={isSidebarOpen} />
                </nav>
              </div>

              {/* Workspaces */}
              <div className={cn(!isSidebarOpen && "w-full flex flex-col items-center")}>
                {isSidebarOpen && (
                  <div className="px-4 pb-2 text-[12px] font-medium text-white/40 tracking-wide uppercase">
                    Workspaces
                  </div>
                )}
                <nav className={cn("space-y-0.5", !isSidebarOpen && "w-full flex flex-col items-center gap-1")}>
                  <NavItem icon={FolderPlus} label="New Project" isActive={activeChat === 4} onClick={() => setActiveChat(4)} isSidebarOpen={isSidebarOpen} />
                  <NavItem icon={Folder} label="Image" isActive={activeChat === 5} onClick={() => setActiveChat(5)} isSidebarOpen={isSidebarOpen} />
                </nav>
              </div>
            </div>
          </ScrollArea>

          {/* Stats */}
          <div className={cn("flex gap-2 py-5 mt-auto", isSidebarOpen ? "px-5 items-center" : "flex-col items-center px-0")}>
            <StatBadge icon={<Brain />} value="0" isSidebarOpen={isSidebarOpen} />
            <StatBadge icon={<Zap />} value="12" isSidebarOpen={isSidebarOpen} />
            <StatBadge icon={<MessageSquare />} value="10" isSidebarOpen={isSidebarOpen} />
          </div>
        </div>
      </aside>
    </>
  );
}
