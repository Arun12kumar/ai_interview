import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  Pause,
  Send,
  Mic,
  Trash2,
  Sidebar as SidebarIcon
} from "lucide-react";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";

import { cn } from "../components/ui/utils";

const AVATAR_SRC = "figma:asset/e5f0f2d7139f813f1a88a42e4e0de996589f0f91.png";

const MESSAGES = [
  {
    id: 1,
    role: "ai" as const,
    title: "Bottom Line",
    bullets: [
      "Django = best when you need a complete web platform, not just an API",
      "FastAPI = best when performance and developer ergonomics for APIs matter most — it's quickly becoming the go-to for modern Python API development",
    ],
    time: "03:10:05 PM",
  },
  {
    id: 2,
    role: "user" as const,
    text: "command is the most reliable terminal approach and works across desktop",
    time: "03:11:15 PM",
  },
  {
    id: 3,
    role: "ai" as const,
    title: "Bottom Line",
    bullets: [
      "Django = best when you need a complete web platform, not just an API",
      "FastAPI = best when performance and developer ergonomics for APIs matter most — it's quickly becoming the go-to for modern Python API development",
    ],
    time: "03:12:10 PM",
  },
  {
    id: 4,
    role: "user" as const,
    text: "command is the most reliable terminal approach and works across desktop",
    time: "03:12:20 PM",
  },
];

const WAVE_HEIGHTS = [
  12, 20, 32, 48, 55, 44, 36, 28, 40, 54, 60, 50, 38, 26, 34, 46, 58,
  48, 36, 24, 30, 42, 56, 52, 40, 28, 18, 26, 44, 56, 60, 52, 38, 26,
  32, 48, 58, 50, 40, 30, 22, 34, 50, 58, 54, 42, 30, 20, 14, 10,
];

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-[70px]">
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

function MessageBubble({ msg }: { msg: (typeof MESSAGES)[number] }) {
  const isAI = msg.role === "ai";

  return (
    <div className={cn("flex items-start gap-3 md:gap-5", isAI ? "justify-start" : "justify-end")}>
      {isAI && (
        <div className="mt-[3px]">
          <AIAvatar />
        </div>
      )}

      <div className={cn("flex flex-col gap-1.5 max-w-[90%]", isAI ? "md:max-w-[55.9%] items-start" : "md:max-w-[38.2%] items-end")}>
        <div
          className={cn(
            "rounded-[21px] px-4 md:px-7 py-3 md:py-5 backdrop-blur-md shadow-[0_15px_33px_rgba(0,0,0,0.10),0_60px_60px_rgba(0,0,0,0.09)] w-fit",
            isAI 
              ? "bg-[#1d1721]/70 border border-white/[.08] text-white" 
              : "bg-white/[.12] border border-white/[.15] text-white"
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
        {"time" in msg && msg.time && (
          <span className="text-[11px] text-white/40 px-2 font-medium tracking-wide">{msg.time}</span>
        )}
      </div>
    </div>
  );
}

export function AiChatPage() {
  const [recording, setRecording] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="flex flex-col flex-1 min-w-0 h-full overflow-hidden relative">
      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0 px-4 md:px-8">
        <div className="space-y-4 md:space-y-6 py-2 pb-4 max-w-4xl mx-auto w-full">
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
  );
}
