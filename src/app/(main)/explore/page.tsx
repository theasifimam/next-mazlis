"use client";

import React, { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";

const TRENDS = [
  { category: "SYSTEM_SYNC", topic: "#NEXTJS_15", posts: "42.5K" },
  { category: "CULTURE_SHIFT", topic: "GTA_VI", posts: "128K" },
  { category: "DESIGN_LAB", topic: "BENTO_MODERN", posts: "12.2K" },
];

export default function ExplorePage() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 60);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-auto scrollbar-hide bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      {/* 1. CLEAN STICKY NAV (No heavy borders) */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] h-16 transition-all duration-500",
          scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-b border-gray-100 dark:border-white/5" />
        <div className="relative flex items-center justify-between px-8 h-full max-w-2xl mx-auto">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-80">
            EXPLORE — 01
          </span>
          <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
            <Search size={16} className="text-gray-400" />
          </div>
        </div>
      </header>

      <ScrollArea onScrollCapture={handleScroll} className="flex-1 w-full">
        <div className="max-w-2xl mx-auto px-6 pb-24">
          {/* 2. BRAND HEADER AREA */}
          <section className="mt-12 mb-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-black dark:bg-[#E2FF54] rounded-2xl flex items-center justify-center shadow-lg shadow-black/5">
                <span className="text-[#E2FF54] dark:text-black text-2xl font-black italic">
                  M
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black leading-tight tracking-tight uppercase">
                  MAZLIS
                </span>
                <span className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                  DISCOVERY_PROTOCOL
                </span>
              </div>
            </div>

            <h1 className="text-[58px] font-black leading-[0.85] tracking-tighter text-black dark:text-white italic uppercase">
              Global
              <br />
              Intelligence.
            </h1>
          </section>

          {/* 3. SEARCH BOX (Clean & Minimal) */}
          <section className="mb-12">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search the archive..."
                className="w-full bg-[#F5F5F7] dark:bg-[#111] rounded-[24px] py-5 px-8 outline-none focus:ring-2 focus:ring-[#E2FF54]/50 transition-all font-bold text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black dark:bg-[#E2FF54] rounded-2xl shadow-xl">
                <Search size={20} className="text-[#E2FF54] dark:text-black" />
              </div>
            </div>
          </section>

          {/* 4. FEATURED HERO (Super-Rounded, No Borders) */}
          <section className="mb-14">
            <div className="relative w-full h-[480px] rounded-[48px] overflow-hidden group shadow-2xl shadow-black/10">
              <Image
                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000"
                alt="featured"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Expand Button - Style from your mobile expandBtn */}
              <div className="absolute top-8 right-8 w-14 h-14 bg-[#E2FF54] rounded-[20px] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-black/20">
                <ArrowUpRight size={26} className="text-black" />
              </div>

              <div className="absolute bottom-10 left-10 right-10">
                <Badge className="bg-[#E2FF54]/20 backdrop-blur-md text-[#E2FF54] border-none font-black mb-4 px-4 py-1">
                  #TRENDING_SYNC
                </Badge>
                <h2 className="text-4xl font-black text-white leading-none tracking-tight uppercase italic">
                  Visual
                  <br />
                  Dynamics 01.
                </h2>
              </div>
            </div>
          </section>

          {/* 5. SYSTEM_TRENDS (Asymmetric Bento Grid) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black text-[#ADFF00] tracking-[0.3em] uppercase bg-black px-2 py-0.5 rounded-sm">
                  LIVE
                </span>
                <span className="text-[11px] font-black text-gray-400 tracking-[0.2em] uppercase">
                  SYSTEM_TRENDS
                </span>
              </div>
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                Updated Just Now
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRENDS.map((trend, i) => (
                <div
                  key={i}
                  className={cn(
                    "group relative flex flex-col justify-between bg-[#F9FAFB] dark:bg-[#0D0D0D] hover:bg-white dark:hover:bg-[#151515] rounded-[36px] p-8 transition-all cursor-pointer hover:shadow-2xl hover:shadow-black/[0.04] border border-transparent hover:border-gray-100 dark:hover:border-white/5",
                    // Make the first item span two columns for editorial hierarchy
                    i === 0
                      ? "md:col-span-2 min-h-[200px]"
                      : "aspect-square md:aspect-auto min-h-[180px]"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                        {trend.category}
                      </span>
                      {i === 0 && (
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((n) => (
                            <div
                              key={n}
                              className="w-6 h-6 rounded-full border-2 border-[#F9FAFB] dark:border-[#0D0D0D] bg-gray-200 overflow-hidden"
                            >
                              <Image
                                src={`https://i.pravatar.cc/100?u=${n + i}`}
                                alt="user"
                                width={100}
                                height={100}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <h3
                      className={cn(
                        "font-black tracking-tight leading-[1.1] transition-colors group-hover:text-[#ADFF00]",
                        i === 0 ? "text-4xl italic" : "text-2xl"
                      )}
                    >
                      {trend.topic}
                    </h3>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-black dark:text-white uppercase tracking-tighter">
                        {trend.posts}
                      </span>
                      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest opacity-60">
                        ENTRIES_LOGGED
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-black flex items-center justify-center group-hover:rotate-12 transition-all shadow-sm">
                      <ArrowUpRight
                        size={18}
                        className="text-gray-400 group-hover:text-[#ADFF00]"
                      />
                    </div>
                  </div>

                  {/* Subtle Background Glow for the Top Trend */}
                  {i === 0 && (
                    <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#E2FF54]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[36px]" />
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}
