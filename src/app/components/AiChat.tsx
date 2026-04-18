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
function StatBadge({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <Badge
      variant="outline"
      className="gap-1.5 px-3 py-1.5 rounded-full border-white/20 bg-white/10 text-[#EAE7EC] hover:bg-white/15 backdrop-blur-sm [&>svg]:size-3.5 cursor-default"
    >
      {icon}
      <span className="text-[13px]">{value}</span>
    </Badge>
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
          "rounded-[21px] px-5 py-4 shadow-[0_15px_33px_rgba(0,0,0,0.10),0_60px_60px_rgba(0,0,0,0.09)]",
          isAI ? "bg-[#1d1721] text-white" : "bg-white text-[#1a141f]"
        )}
        style={{
          /* φ-based widths: AI 55.9%, User 38.2% */
          maxWidth: isAI ? "55.9%" : "38.2%",
        }}
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
      {/* ── Sidebar  width = 161.8 × φ ≈ 261 px ── */}
      <aside className="flex flex-col shrink-0 h-full border-r border-white/[.08]" style={{ width: 261 }}>

        {/* Logo — extra top padding so toggle pill doesn't overlap */}
        <div className="flex items-center justify-between px-5 pt-16 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-7 rounded-full bg-white/10 shrink-0">
               <Target className="size-4 text-white/90" />
            </div>
            <span
              className="text-white text-[19px] tracking-tight font-medium"
            >
              Zyricon
            </span>
          </div>
          <Button variant="ghost" size="icon" className="size-8 text-white/50 hover:text-white hover:bg-white/10 rounded-md">
            <Sidebar className="size-4.5" />
          </Button>
        </div>

        <Separator className="mx-5 w-auto bg-transparent border-t border-white/[.08] mt-2 mb-2" />

        {/* New Chat */}
        <div className="px-4 py-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl px-4 py-3 bg-white/[.12] text-white hover:bg-white/[.16] shadow-none h-auto transition-colors"
          >
            <MessageSquare className="size-[18px] opacity-80 shrink-0" />
            <span className="font-normal text-[14.5px]">New Chat</span>
          </Button>
        </div>

        {/* Navigation list */}
        <ScrollArea className="flex-1 px-4 mt-2">
          <div className="space-y-6 pb-6">
            
            {/* Features */}
            <div>
              <div className="px-4 pb-2 text-[12px] font-medium text-white/40 tracking-wide uppercase">
                Features
              </div>
              <nav className="space-y-0.5">
                <Button
                  variant="ghost"
                  onClick={() => setActiveChat(1)}
                  className={cn(
                    "w-full justify-start gap-3.5 rounded-xl px-4 py-2.5 text-[14px] transition-all h-auto",
                    activeChat === 1
                      ? "text-white bg-white/[.07]"
                      : "text-white/60 hover:bg-white/[.07] hover:text-white/90"
                  )}
                >
                  <MessageSquare className="size-4 shrink-0 opacity-80" />
                  <span className="truncate font-normal">Chat</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveChat(2)}
                  className={cn(
                    "w-full justify-start gap-3.5 rounded-xl px-4 py-2.5 text-[14px] transition-all h-auto",
                    activeChat === 2
                      ? "text-white bg-white/[.07]"
                      : "text-white/60 hover:bg-white/[.07] hover:text-white/90"
                  )}
                >
                  <Archive className="size-4 shrink-0 opacity-80" />
                  <span className="truncate font-normal">Archived</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveChat(3)}
                  className={cn(
                    "w-full justify-start gap-3.5 rounded-xl px-4 py-2.5 text-[14px] transition-all h-auto",
                    activeChat === 3
                      ? "text-white bg-white/[.07]"
                      : "text-white/60 hover:bg-white/[.07] hover:text-white/90"
                  )}
                >
                  <Library className="size-4 shrink-0 opacity-80" />
                  <span className="truncate font-normal">Library</span>
                </Button>
              </nav>
            </div>

            {/* Workspaces */}
            <div>
              <div className="px-4 pb-2 text-[12px] font-medium text-white/40 tracking-wide uppercase">
                Workspaces
              </div>
              <nav className="space-y-0.5">
                <Button
                  variant="ghost"
                  onClick={() => setActiveChat(4)}
                  className={cn(
                    "w-full justify-start gap-3.5 rounded-xl px-4 py-2.5 text-[14px] transition-all h-auto",
                    activeChat === 4
                      ? "text-white bg-white/[.07]"
                      : "text-white/60 hover:bg-white/[.07] hover:text-white/90"
                  )}
                >
                  <FolderPlus className="size-4 shrink-0 opacity-80" />
                  <span className="truncate font-normal">New Project</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveChat(5)}
                  className={cn(
                    "w-full justify-start gap-3.5 rounded-xl px-4 py-2.5 text-[14px] transition-all h-auto",
                    activeChat === 5
                      ? "text-white bg-white/[.07]"
                      : "text-white/60 hover:bg-white/[.07] hover:text-white/90"
                  )}
                >
                  <Folder className="size-4 shrink-0 opacity-80" />
                  <span className="truncate font-normal">Image</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveChat(6)}
                  className={cn(
                    "w-full justify-start gap-3.5 rounded-xl px-4 py-2.5 text-[14px] transition-all h-auto",
                    activeChat === 6
                      ? "text-white bg-white/[.07]"
                      : "text-white/60 hover:bg-white/[.07] hover:text-white/90"
                  )}
                >
                  <Folder className="size-4 shrink-0 opacity-80" />
                  <span className="truncate font-normal">Presentation</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveChat(7)}
                  className={cn(
                    "w-full justify-start gap-3.5 rounded-xl px-4 py-2.5 text-[14px] transition-all h-auto",
                    activeChat === 7
                      ? "text-white bg-white/[.07]"
                      : "text-white/60 hover:bg-white/[.07] hover:text-white/90"
                  )}
                >
                  <Folder className="size-4 shrink-0 opacity-80" />
                  <span className="truncate font-normal">Riset</span>
                </Button>
              </nav>
            </div>
          </div>
        </ScrollArea>

        {/* Premium Upgrade */}
        <div className="px-5 pb-6 mt-auto">
          <div className="relative overflow-hidden rounded-[20px] bg-white/[.04] p-4.5 border border-white/10 flex flex-col items-center text-center">
             <div className="size-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
               <Crown className="size-[18px] text-white/90" />
             </div>
             <h4 className="text-[14px] font-medium text-white mb-2">Upgrade to premium</h4>
             <p className="text-[11.5px] text-white/50 leading-[1.6] mb-4 max-w-[180px]">
               Boost productivity with seamless automation and responsive AI, built to adapt to your needs.
             </p>
             <Button className="w-full rounded-[14px] bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-none text-[13px] h-9 transition-colors">
               Upgrade
             </Button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">

        {/* Header — extra top padding so toggle pill clears */}
        <header className="flex items-center gap-2 px-8 pt-14 pb-5">
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
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 px-8">
          <div className="space-y-5 py-2 pb-4">
            {MESSAGES.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Waveform */}
        <div className="flex justify-center px-8 py-2">
          <Waveform active={recording} />
        </div>

        {/* Action bar ── centred, max 580px, Fibonacci px spacing */}
        <div className="flex items-center justify-between pb-8 pt-2 px-14 mx-auto w-full max-w-[580px]">
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
