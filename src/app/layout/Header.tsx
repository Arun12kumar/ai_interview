import React from "react";
import {
  Bell,
  LogOut,
  User,
  ChevronDown,
  Sidebar as SidebarIcon
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface HeaderProps {
  setIsSidebarOpen: (v: boolean) => void;
  title?: string;
}

export function Header({ setIsSidebarOpen, title = "Interview Chat" }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 pt-4 md:pt-5 pb-3 md:pb-5">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden size-9 text-white/60 hover:text-white hover:bg-white/10 rounded-lg shrink-0 mr-1"
          style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
        >
          <SidebarIcon className="size-5" />
        </Button>
        <Button
          variant="ghost"
          className="gap-2 px-1 text-white hover:bg-white/10 group"
        >
          <span
            className="text-xl tracking-tight"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
          >
            {title}
          </span>
          {/* <ChevronDown className="size-5 text-white/60 group-hover:text-white/90 transition-colors" /> */}
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
        {/* User Profile Pill - Desktop (No Dropdown) */}
        <div className="hidden sm:flex items-center gap-3 p-1 pr-4 bg-white/[.05] border border-white/[.08] hover:bg-white/[.09] transition-colors rounded-full shadow-sm">
          <div className="size-[30px] rounded-full overflow-hidden border border-white/20 bg-white/10 shrink-0 flex items-center justify-center">
            <User className="size-4.5 text-white/90" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[13px] font-medium text-white/90 leading-tight">arun@ai-interview.io</span>
            <span className="text-[11px] text-white/50 leading-tight">Administrator</span>
          </div>
        </div>

        {/* User Profile Pill - Mobile (With Dropdown) */}
        <div className="sm:hidden flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                role="button"
                className="flex items-center p-1 bg-white/[.05] border border-white/[.08] hover:bg-white/[.09] transition-colors rounded-full cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
              >
                <div className="size-[30px] rounded-full overflow-hidden border border-white/20 bg-white/10 shrink-0 flex items-center justify-center">
                  <User className="size-4.5 text-white/90" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] border border-white/[.08] bg-[#1d1721]/70 backdrop-blur-md text-white rounded-[13px] shadow-xl">
              <div className="px-3 py-2.5">
                <p className="text-[13px] font-medium text-white/90">arun@ai-interview.io</p>
                <p className="text-[11px] text-white/50 mt-0.5">Administrator</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
