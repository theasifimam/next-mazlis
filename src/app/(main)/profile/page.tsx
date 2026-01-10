"use client";

import { Edit3, MapPin, Link as LinkIcon, Zap, Terminal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserPostFeed from "@/components/post/UserPostFeed";

export default function BentoProfile() {
  return (
    <div className="w-full space-y-4 p-4 lg:p-6 bg-white dark:bg-[#050505] overflow-y-auto scrollbar-hide">
      {/* 1. THE MEGA IDENTITY POD */}
      <div className="relative overflow-hidden rounded-[48px] border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.03] p-8 lg:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-10">
          {/* MASSIVE BENTO DP */}
          <div className="relative shrink-0 group">
            <div className="absolute inset-0 bg-[#E2FF54] blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
            <Avatar className="h-40 w-40 md:h-44 md:w-44 rounded-[54px] border-[8px] border-white dark:border-[#121212] shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              />
              <AvatarFallback className="bg-[#E2FF54] font-black text-black text-4xl">
                JD
              </AvatarFallback>
            </Avatar>
            {/* Protocol Status Badge */}
            <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-[20px] border-4 border-white bg-[#E2FF54] text-black dark:border-[#050505] z-20 shadow-xl">
              <Zap size={22} fill="currentColor" />
            </div>
          </div>

          {/* ALIGNED IDENTITY TEXT */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-black dark:text-white leading-none">
                  John Doe
                </h1>
                <button className="p-2.5 rounded-2xl bg-black dark:bg-[#E2FF54] text-[#E2FF54] dark:text-black hover:scale-110 transition-all active:scale-95 shadow-lg border-none">
                  <Edit3 size={16} />
                </button>
              </div>
              <p className="text-sm font-black tracking-[0.3em] uppercase text-[#ADFF00] italic">
                @system_protocol_alpha
              </p>
            </div>

            {/* Meta Data Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className="flex items-center gap-2 bg-white dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-100 dark:border-white/5">
                <MapPin size={14} className="text-[#ADFF00]" /> SF_DISTRICT_01
              </span>
              <span className="flex items-center gap-2 text-black dark:text-white underline decoration-[#ADFF00] decoration-2 underline-offset-4 cursor-pointer">
                <LinkIcon size={14} /> nexus.io/registry
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATS & BIO BENTO CLUSTER */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bio Pod - Spans full width for readability */}
        <div className="col-span-2 rounded-[40px] border border-gray-100 bg-gray-50 p-8 dark:border-white/5 dark:bg-white/[0.03]">
          <div className="mb-4 flex items-center gap-2">
            <Terminal size={16} className="text-[#ADFF00]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
              Manifesto_Stream
            </span>
          </div>
          <p className="text-lg md:text-xl font-bold italic leading-relaxed tracking-tight text-black dark:text-white/90">
            Synthesizing next-gen social architecture.{" "}
            <span className="text-[#ADFF00]">Building in public.</span> Sharing
            logs for the network decentralized core.
          </p>
        </div>

        {/* Stats: Subscribers */}
        <div className="flex flex-col justify-center rounded-[40px] border border-gray-100 bg-gray-50 p-7 lg:p-9 dark:border-white/5 dark:bg-white/[0.03] group hover:bg-[#E2FF54]/5 transition-colors">
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
            Subscribers
          </span>
          <p className="text-3xl font-black italic tracking-tighter text-black dark:text-white leading-none">
            12.8K
          </p>
        </div>

        {/* Stats: Network (Volt Tone) */}
        <div className="flex flex-col justify-center rounded-[40px] bg-black dark:bg-[#E2FF54] p-7 lg:p-9 shadow-2xl shadow-[#E2FF54]/10 group transition-transform active:scale-95 cursor-pointer">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#ADFF00] dark:text-black/50 mb-2">
            Network_Size
          </span>
          <p className="text-3xl font-black italic tracking-tighter text-white dark:text-black leading-none">
            842
          </p>
        </div>
      </div>
      <UserPostFeed />
    </div>
  );
}
