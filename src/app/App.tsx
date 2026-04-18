import React, { useState } from "react";
import { AiChat } from "./components/AiChat";
import { SystemDesign } from "./components/SystemDesign";
import { Button } from "./components/ui/button";
import { Brain, Layers } from "lucide-react";
import { cn } from "./components/ui/utils";

type View = "chat" | "system";

export default function App() {
  const [view, setView] = useState<View>("chat");

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ── Floating top-centre view toggle ─────────────────────────── */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md shadow-lg">
        <Button
          size="sm"
          onClick={() => setView("chat")}
          className={cn(
            "gap-1.5 rounded-lg transition-all",
            view === "chat"
              ? "bg-white/20 text-white hover:bg-white/25 shadow-sm"
              : "bg-transparent text-white/50 hover:bg-white/10 hover:text-white/80"
          )}
        >
          <Brain className="size-3.5" />
          Chat UI
        </Button>
        <Button
          size="sm"
          onClick={() => setView("system")}
          className={cn(
            "gap-1.5 rounded-lg transition-all",
            view === "system"
              ? "bg-white/20 text-white hover:bg-white/25 shadow-sm"
              : "bg-transparent text-white/50 hover:bg-white/10 hover:text-white/80"
          )}
        >
          <Layers className="size-3.5" />
          System Design
        </Button>
      </div>

      {/* ── Chat view ───────────────────────────────────────────────── */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          view === "chat" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <AiChat />
      </div>

      {/* ── System Design view ──────────────────────────────────────── */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          view === "system" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <SystemDesign />
      </div>
    </div>
  );
}
