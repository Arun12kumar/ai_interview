import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  MessageSquare,
  Plus,
  Zap,
  Trash2,
  Pause,
  Send,
  ChevronDown,
  Mic,
  Archive,
  Library,
  FolderPlus,
  Folder,
  Crown,
  Sidebar,
  Target,
  Bell,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "./ui/utils";

/* ─── Constants ─────────────────────────────────────────────────────── */
const AVATAR_SRC = "figma:asset/e5f0f2d7139f813f1a88a42e4e0de996589f0f91.png";

const CHAT_SESSIONS = [
  { id: 1, title: "Django vs FastAPI comparison" },
  { id: 2, title: "React vs Vue performance" },
  { id: 3, title: "System design principles" },
  { id: 4, title: "TypeScript best practices" },
];

const MESSAGES = [
  {
    id: 1,
    role: "ai" as const,
    title: "Bottom Line",
    bullets: [
      "Django = best when you need a complete web platform, not just an API",
      "FastAPI = best when performance and developer ergonomics for APIs matter most — it's quickly becoming the go-to for modern Python API development",
    ],
  },
  {
    id: 2,
    role: "user" as const,
    text: "command is the most reliable terminal approach and works across desktop",
  },
  {
    id: 3,
    role: "ai" as const,
    title: "Bottom Line",
    bullets: [
      "Django = best when you need a complete web platform, not just an API",
      "FastAPI = best when performance and developer ergonomics for APIs matter most — it's quickly becoming the go-to for modern Python API development",
    ],
  },
  {
    id: 4,
    role: "user" as const,
    text: "command is the most reliable terminal approach and works across desktop",
  },
];

/* heights for 50 waveform bars  */
const WAVE_HEIGHTS = [
  12, 20, 32, 48, 55, 44, 36, 28, 40, 54, 60, 50, 38, 26, 34, 46, 58,
  48, 36, 24, 30, 42, 56, 52, 40, 28, 18, 26, 44, 56, 60, 52, 38, 26,
  32, 48, 58, 50, 40, 30, 22, 34, 50, 58, 54, 42, 30, 20, 14, 10,
];

/* ─── Waveform ──────────────────────────────────────────────────────── */
function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-[70px]">
      {/* @keyframes injected once */}
      <style>{`
        @keyframes wavePulse {
          0%,100% { transform:scaleY(.35); opacity:.5 }
          50%      { transform:scaleY(1);   opacity:1   }
        }
      `}</style>
      {WAVE_HEIGHTS.map((h, i) => (
        <div
          key={i}
          style={{
            height: h,
            width: 3.5,
            borderRadius: 4,
            backgroundColor: "#D5CFDA",
            transformOrigin: "center",
            animation: active
              ? `wavePulse ${0.9 + (i % 7) * 0.12}s ease-in-out ${(i * 0.045) % 0.9}s infinite`
              : "none",
            transform: active ? undefined : "scaleY(0.35)",
            opacity: active ? 1 : 0.45,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Stat Badge ────────────────────────────────────────────────────── */
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

/* ─── Avatar ────────────────────────────────────────────────────────── */
function AIAvatar() {
  const [errored, setErrored] = useState(false);
  return (
    <div className="shrink-0 size-[42px] rounded-full overflow-hidden bg-white/15 border border-white/25 flex items-center justify-center">
      {!errored ? (
        <img
          src={AVATAR_SRC}
          alt="AI"
          className="size-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <Brain className="size-5 text-white/70" />
      )}
    </div>
  );
}

/* ─── Message Bubble ────────────────────────────────────────────────── */
function MessageBubble({ msg }: { msg: (typeof MESSAGES)[number] }) {
  const isAI = msg.role === "ai";

  return (
    <div className={cn("flex items-start gap-3", isAI ? "justify-start" : "justify-end")}>
      {isAI && (
        <div className="mt-[3px]">
          <AIAvatar />
        </div>
      )}

      <div
        className={cn(
          "rounded-[21px] px-4 md:px-5 py-3 md:py-4 shadow-[0_15px_33px_rgba(0,0,0,0.10),0_60px_60px_rgba(0,0,0,0.09)]",
          isAI ? "bg-[#1d1721] text-white max-w-[90%] md:max-w-[55.9%]" : "bg-white text-[#1a141f] max-w-[90%] md:max-w-[38.2%]"
        )}
      >
        {"title" in msg && msg.title && (
          <p className="mb-2 text-sm font-medium leading-snug">{msg.title}</p>
        )}

        {"bullets" in msg && msg.bullets ? (
          <ul className="list-disc pl-4 space-y-1.5">
            {msg.bullets.map((b, i) => (
              <li key={i} className="text-[15px] leading-relaxed">
                {b}
              </li>
            ))}
          </ul>
        ) : (
          "text" in msg && (
            <p className="text-[15px] leading-relaxed">{msg.text}</p>
          )
        )}
      </div>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────── */
export function AiChat() {
  const [activeChat, setActiveChat] = useState(1);
  const [recording, setRecording] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' && window.innerWidth >= 768);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      className="flex h-full w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(234.318deg,rgba(145,126,132,.92) 12.773%,rgba(59,43,64,.9) 68.824%,rgb(26,20,31) 100%)",
      }}
    >
      {/* ── Mobile Sidebar Overlay ── */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* ── Sidebar ── */}
      <aside 
        className={cn(
          "flex flex-col shrink-0 h-full border-r border-white/[.08] transition-all duration-300 ease-in-out z-40 overflow-hidden",
          "absolute md:relative bg-[#211825] md:bg-transparent",
          isSidebarOpen ? "translate-x-0 w-[261px]" : "-translate-x-full md:translate-x-0 w-[68px]"
        )}
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
            
            {/* {!isSidebarOpen && (
              <Brain className="size-7 text-white/90 shrink-0" />
            )} */}

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="size-8 text-white/50 hover:text-white hover:bg-white/10 rounded-md shrink-0"
                >
                  <Sidebar className="size-4.5" />
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
                  <MessageSquare className={cn("opacity-80 shrink-0", isSidebarOpen ? "size-[18px]" : "size-5")} />
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
                  <NavItem icon={MessageSquare} label="Chat" isActive={activeChat === 1} onClick={() => setActiveChat(1)} isSidebarOpen={isSidebarOpen} />
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
                  <NavItem icon={Folder} label="Presentation" isActive={activeChat === 6} onClick={() => setActiveChat(6)} isSidebarOpen={isSidebarOpen} />
                  <NavItem icon={Folder} label="Riset" isActive={activeChat === 7} onClick={() => setActiveChat(7)} isSidebarOpen={isSidebarOpen} />
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

      {/* ── Main ── */}
      <main className="flex flex-col flex-1 min-w-0 h-full overflow-hidden relative">

        {/* Header — extra top padding so toggle pill clears */}
        <header className="flex items-center justify-between px-4 md:px-8 pt-4 md:pt-5 pb-3 md:pb-5">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden size-9 text-white/60 hover:text-white hover:bg-white/10 rounded-lg shrink-0 mr-1"
            >
              <Sidebar className="size-5" />
            </Button>
            <Button
              variant="ghost"
              className="gap-2 px-1 text-white hover:bg-white/10 group"
            >
              <span
                className="text-xl tracking-tight"
                style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
              >
                Chat
              </span>
              <ChevronDown className="size-5 text-white/60 group-hover:text-white/90 transition-colors" />
            </Button>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Notification */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="size-[38px] bg-white/[.05] border border-white/[.08] text-white/80 hover:text-white hover:bg-white/[.12] rounded-full relative shrink-0 transition-colors shadow-sm"
                >
                  <Bell className="size-4" strokeWidth={2.5} />
                  <span className="absolute top-[8px] right-[8px] size-2 bg-[#F24C4C] rounded-full border border-[#2b2132] shadow-sm animate-pulse" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>

            {/* Logout */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="size-[38px] bg-white/[.05] border border-white/[.08] text-white/80 hover:text-red-300 hover:bg-red-500/15 hover:border-red-500/30 rounded-full shrink-0 transition-colors shadow-sm"
                >
                  <LogOut className="size-4" strokeWidth={2.5} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Log out</TooltipContent>
            </Tooltip>

            {/* User Profile Pill */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center gap-2 sm:gap-3 p-1 sm:pr-4 pr-1 bg-white/[.05] border border-white/[.08] hover:bg-white/[.09] transition-all rounded-full cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-white/20">
                  <div className="size-[30px] rounded-full overflow-hidden border border-white/20 bg-white/10 shrink-0 flex items-center justify-center">
                    <User className="size-4.5 text-white/90" />
                  </div>
                  <div className="flex-col justify-center hidden sm:flex">
                    <span className="text-[13px] font-medium text-white/90 leading-tight">arun@ai-interview.io</span>
                    <span className="text-[11px] text-white/50 leading-tight">Administrator</span>
                  </div>
                  <ChevronDown className="size-3.5 text-white/40 hidden sm:block shrink-0" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] border-white/10 bg-[#1d1721] text-white rounded-[13px] shadow-xl">
                <div className="px-3 py-2.5 sm:hidden">
                  <p className="text-[13px] font-medium text-white/90">arun@ai-interview.io</p>
                  <p className="text-[11px] text-white/50 mt-0.5">Administrator</p>
                </div>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 min-h-0 px-4 md:px-8">
          <div className="space-y-4 md:space-y-5 py-2 pb-4">
            {MESSAGES.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Waveform */}
        <div className="flex justify-center px-4 md:px-8 py-2">
          <Waveform active={recording} />
        </div>

        {/* Action bar ── centred, max 580px, Fibonacci px spacing */}
        <div className="flex items-center justify-between pb-6 md:pb-8 pt-2 px-6 md:px-14 mx-auto w-full max-w-[580px]">
          {/* Delete */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-[50px] rounded-full text-[#F24C4C] hover:bg-[#F24C4C]/10 hover:text-[#F24C4C]"
              >
                <Trash2 className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete recording</TooltipContent>
          </Tooltip>

          {/* Pause / Resume */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setRecording(!recording)}
                className="size-[63px] rounded-full bg-white/[.18] border border-white/[.28] text-white hover:bg-white/[.28] active:scale-95 transition-all backdrop-blur-sm"
                size="icon"
              >
                {recording ? <Pause className="size-6" /> : <Mic className="size-6" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{recording ? "Pause" : "Resume recording"}</TooltipContent>
          </Tooltip>

          {/* Send */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-[50px] rounded-full text-white/90 hover:bg-white/10"
              >
                <Send className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </main>
    </div>
  );
}
