"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  Plus,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ToggleTheme";

const NAV_ITEMS = [
  { icon: Home, label: "HOME", href: "/home" },
  { icon: Search, label: "EXPLORE", href: "/explore" },
  { icon: Bell, label: "NOTICES", href: "/notifications" },
  { icon: Mail, label: "MESSAGES", href: "/messages" },
  { icon: Bookmark, label: "ARCHIVE", href: "/saved", desktopOnly: true },
  { icon: User, label: "SOUL_ID", href: "/profile" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="mt-[-64px] fixed bottom-0 inset-x-0 z-[100] lg:sticky lg:top-0 lg:h-screen lg:w-full flex flex-col lg:p-6 gap-4 transition-colors duration-300">
      {/* 1. ACTION POD (Volt Tone Focus) */}
      <button className="hidden lg:flex bg-black dark:bg-[#E2FF54] text-[#E2FF54] dark:text-black rounded-[32px] p-6 items-center justify-between gap-2 group hover:shadow-2xl hover:shadow-[#E2FF54]/10 transition-all active:scale-95">
        <div className="flex flex-col items-start">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-60">
            System_Input
          </span>
          <span className="text-xs font-black tracking-widest">NEW_ENTRY</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-black/10 flex items-center justify-center group-hover:rotate-90 transition-transform">
          <Plus size={20} strokeWidth={3} />
        </div>
      </button>

      {/* 2. NAVIGATION POD (The Main Bento Tile) */}
      <nav className="flex flex-row lg:flex-col justify-around lg:justify-start w-full gap-1 p-2 lg:p-3 rounded-[32px] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 overflow-hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative group flex items-center justify-center lg:justify-start gap-4 p-4 rounded-[24px] transition-all duration-300 outline-none",
                item.desktopOnly && "hidden lg:flex",
                isActive
                  ? "bg-white dark:bg-white/10 shadow-sm"
                  : "hover:bg-black dark:hover:bg-[#E2FF54]"
              )}
            >
              <div className="relative z-10 flex items-center gap-4 group">
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 3 : 2}
                  className={cn(
                    "transition-colors duration-300",
                    isActive
                      ? "text-[#ADFF00]"
                      : "text-gray-400 group-hover:text-white dark:group-hover:text-black"
                  )}
                />
                <span
                  className={cn(
                    "hidden lg:block text-[11px] font-black tracking-[0.2em] transition-colors duration-300",
                    isActive
                      ? "text-black dark:text-white"
                      : "text-gray-400 group-hover:text-white dark:group-hover:text-black"
                  )}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        {/* 4. SETTINGS/THEME POD */}
        <div className="hidden lg:flex items-center justify-center p-3 rounded-[28px] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
          <ThemeToggle />
        </div>

        {/* 5. SOUL_ID POD (Profile Tile) */}
        <button className="flex items-center justify-between w-full p-4 rounded-[32px] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:bg-black dark:hover:bg-[#E2FF54] group transition-all">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <Avatar className="h-12 w-12 rounded-[20px] border-2 border-white dark:border-black shadow-lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="grayscale group-hover:grayscale-0 transition-all"
                />
                <AvatarFallback className="bg-[#E2FF54] text-black font-black">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#ADFF00] rounded-full ring-2 ring-white dark:ring-[#050505]" />
            </div>
            <div className="hidden lg:flex flex-col items-start uppercase font-black tracking-tighter">
              <span className="text-[10px] text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors leading-none mb-1">
                John Doe
              </span>
              <span className="text-[8px] text-gray-400 group-hover:text-white/50 dark:group-hover:text-black/50 transition-colors tracking-widest">
                @johndoe
              </span>
            </div>
          </div>
          <Zap
            size={14}
            className="hidden lg:block text-gray-300 group-hover:text-[#ADFF00] dark:group-hover:text-black transition-colors"
          />
        </button>
      </div>
    </aside>
  );
}
