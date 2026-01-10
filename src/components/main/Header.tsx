import { Bell } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-16 transition-opacity duration-300">
      <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5" />
      <div className="relative flex items-center justify-between h-full max-w-[1280px] mx-auto">
        <div className="hidden lg:flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <span className="text-[#E2FF54] text-xl font-black">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black dark:text-white leading-tight tracking-tight">
                  MAZLIS
                </span>
                <span className="text-[8px] font-extrabold text-gray-400 dark:text-gray-300 tracking-widest">
                  LIVE_ARCHIVE_v2
                </span>
              </div>
            </div>
          </Link>
          <div className="w-2 h-2 rounded-full bg-[#ADFF00] animate-pulse" />
        </div>
        <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
          <Bell size={16} className="text-black fill-[#E2FF54]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
