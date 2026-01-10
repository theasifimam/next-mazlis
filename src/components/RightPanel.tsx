"use client";

import { Search, TrendingUp, Zap, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RightPanel() {
  return (
    <div className="space-y-4 min-h-screen bg-transparent">
      {/* 1. SEARCH BENTO TILE */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#ADFF00] transition-colors" />
        </div>
        <input
          type="text"
          placeholder="DISCOVER_NETWORK..."
          // Added text-black dark:text-white to ensure visibility
          className="w-full bg-gray-100 dark:bg-white/[0.03] border-none rounded-[20px] py-5 pl-14 pr-4 outline-none focus:ring-2 focus:ring-[#E2FF54]/20 transition-all placeholder:text-[10px] placeholder:font-black placeholder:tracking-[0.2em] placeholder:text-gray-500 text-xs font-bold text-black dark:text-white"
        />
      </div>

      {/* 2. TRENDING BENTO GRID */}
      <div className="bg-gray-50 dark:bg-white/[0.03] rounded-[32px] p-6 space-y-6 overflow-hidden relative border border-gray-100 dark:border-transparent">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#ADFF00]/5 blur-[40px] rounded-full -z-10" />

        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-[#ADFF00] tracking-widest uppercase mb-1">
              Live_Stream
            </span>
            {/* Changed to text-black dark:text-white */}
            <h3 className="font-black text-2xl tracking-tighter italic uppercase leading-none text-black dark:text-white">
              Trending
            </h3>
          </div>
          <TrendingUp size={20} className="text-gray-400 opacity-50" />
        </div>

        <div className="space-y-1">
          {[
            {
              topic: "System",
              tag: "NEXT_JS_26",
              posts: "52K",
              growth: "+12%",
            },
            {
              topic: "Visuals",
              tag: "BENTO_CORE",
              posts: "12K",
              growth: "+5%",
            },
            {
              topic: "Protocol",
              tag: "UI_UX_DIR",
              posts: "98K",
              growth: "+24%",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group px-3 py-4 hover:bg-white dark:hover:bg-white/5 rounded-2xl cursor-pointer transition-all border border-transparent hover:shadow-xl hover:shadow-black/5"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[8px] font-black text-gray-400 dark:text-zinc-500 tracking-widest uppercase">
                  {item.topic} / {item.growth}
                </span>
                <Hash
                  size={12}
                  className="text-[#ADFF00] opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              {/* Changed to text-black dark:text-white */}
              <p className="font-black text-lg tracking-tight uppercase text-black dark:text-white group-hover:text-[#ADFF00] dark:group-hover:text-[#ADFF00] transition-colors">
                {item.tag}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-gray-500 italic">
                  {item.posts} TRANSMISSIONS
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-3 text-[10px] font-black tracking-widest uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          Show_More_Data
        </button>
      </div>

      {/* 3. WHO TO FOLLOW (Directory Style) */}
      {/* Changed bg-zinc-900 to black dark:bg-white so it flips correctly */}
      <div className="bg-black dark:bg-white rounded-[32px] p-6 space-y-6 shadow-2xl">
        <div className="flex flex-col px-2">
          <span className="text-[9px] font-black text-zinc-500 tracking-widest uppercase mb-1 opacity-60">
            Verified_Nodes
          </span>
          <h3 className="font-black text-2xl tracking-tighter italic uppercase leading-none text-white dark:text-black">
            Sync With
          </h3>
        </div>

        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              // Adjust colors for the row inside the dark/light tile
              className="flex items-center justify-between bg-white/10 dark:bg-black/5 p-3 rounded-[24px]"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-11 w-11 rounded-xl border border-white/10 dark:border-black/10">
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?u=follow${i}`}
                    />
                    <AvatarFallback className="bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1">
                    <Zap size={10} className="text-[#ADFF00] fill-[#ADFF00]" />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-black tracking-tight text-white dark:text-black uppercase truncate leading-none">
                    Nexus_Admin_{i}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 italic mt-1">
                    @node_protocol
                  </span>
                </div>
              </div>
              <Button className="h-9 rounded-xl bg-[#E2FF54] text-black hover:scale-105 transition-all font-black text-[10px] uppercase px-4 border-none shadow-lg shadow-[#E2FF54]/20">
                Link
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
