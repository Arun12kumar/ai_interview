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
    <div className="relative w-full h-[100dvh] overflow-hidden">
     
      {/* ── Chat view ───────────────────────────────────────────────── */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          view === "chat" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <AiChat />
      </div>

    </div>
  );
}
