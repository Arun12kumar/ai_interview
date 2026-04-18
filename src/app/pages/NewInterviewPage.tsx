import React, { useState, useEffect } from "react";
import { Mic } from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "../components/ui/utils";

export function NewInterviewPage() {
  const [isListening, setIsListening] = useState(false);
  const [textStage, setTextStage] = useState(0);

  // Simple animation sequence for the text
  useEffect(() => {
    if (!isListening) {
      setTextStage(0);
      return;
    }
    
    const timeouts = [
      setTimeout(() => setTextStage(1), 500),
      setTimeout(() => setTextStage(2), 2000),
      setTimeout(() => setTextStage(3), 4000),
    ];
    
    return () => timeouts.forEach(clearTimeout);
  }, [isListening]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full relative px-4">
      
      {/* ── Main Orb/Mic Container ── */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Glowing Pulse Rings (Visible when listening) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className={cn(
              "absolute rounded-full border border-[#B39EBC] transition-all duration-1000",
              isListening ? "size-[250px] md:size-[350px] opacity-20 animate-ping" : "size-[100px] opacity-0"
            )}
            style={{ animationDuration: '3s' }}
          />
          <div 
            className={cn(
              "absolute rounded-full border border-[#B39EBC] transition-all duration-1000 delay-300",
              isListening ? "size-[200px] md:size-[280px] opacity-30 animate-ping" : "size-[100px] opacity-0"
            )}
            style={{ animationDuration: '3s' }}
          />
          
          {/* Constant ambient glow when active */}
          <div 
            className={cn(
              "absolute rounded-full bg-[#B39EBC] blur-3xl transition-all duration-700",
              isListening ? "size-[150px] opacity-20" : "size-0 opacity-0"
            )}
          />
        </div>

        {/* Central Button */}
        <Button
          variant="ghost"
          onClick={() => setIsListening(!isListening)}
          className={cn(
            "relative z-10 size-[100px] md:size-[120px] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-105",
            isListening 
              ? "bg-[#B39EBC]/20 border border-[#B39EBC]/40 text-white" 
              : "bg-white/[.08] border border-white/[.12] text-white/70 hover:text-white hover:bg-white/[.12]"
          )}
        >
          <Mic className={cn("transition-all duration-500", isListening ? "size-10 md:size-12" : "size-8 md:size-10")} />
        </Button>
      </div>

      {/* ── Animated Text Status ── */}
      <div className="mt-12 h-16 flex items-center justify-center text-center">
        {!isListening ? (
          <p className="text-[#EAE7EC]/60 text-lg md:text-xl font-medium tracking-wide">
            Tap the microphone to start
          </p>
        ) : (
          <div className="flex flex-col items-center">
            <h2 
              className="text-white text-2xl md:text-3xl tracking-wide transition-all duration-500"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {textStage === 0 && <span className="animate-pulse">Connecting...</span>}
              {textStage >= 1 && <span className="animate-in fade-in zoom-in duration-500">Ready for Interview</span>}
            </h2>
            {textStage >= 2 && (
              <p className="text-[#B39EBC] text-sm mt-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
                {textStage === 2 ? "Calibrating microphone..." : "Listening to your voice..."}
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
