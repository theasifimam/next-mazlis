"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  ArrowUpRight,
  Heart,
  MessageCircle,
  Send,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";

type Post = {
  id: string;
  user: string;
  tag: string;
  content: string;
  image: string | null;
  likes: string;
};

// --- DUMMY DATA ---
const POSTS = [
  {
    id: "1",
    user: "SARAH.SH",
    tag: "DESIGN_SYSTEM",
    content: "The glassmorphism is real in the new design system. 🧊✨",
    image: "https://picsum.photos/seed/glass/800/800",
    likes: "1.2K",
  },
  {
    id: "2",
    user: "MARK_TECH",
    tag: "CODE_PURITY",
    content:
      "Clean code is better than clever code. Always optimize for readability first.",
    image: "https://picsum.photos/seed/code/800/800",
    likes: "856",
  },
  {
    id: "3",
    user: "SARAH.SH",
    tag: "DESIGN_SYSTEM",
    content: "The glassmorphism is real in the new design system. 🧊✨",
    image: "https://picsum.photos/seed/glass/800/800",
    likes: "1.2K",
  },
  {
    id: "4",
    user: "MARK_TECH",
    tag: "CODE_PURITY",
    content:
      "Clean code is better than clever code. Always optimize for readability first.",
    image: "https://picsum.photos/seed/code/800/800",
    likes: "856",
  },
  {
    id: "5",
    user: "SARAH.SH",
    tag: "DESIGN_SYSTEM",
    content: "The glassmorphism is real in the new design system. 🧊✨",
    image: "https://picsum.photos/seed/glass/800/800",
    likes: "1.2K",
  },
  {
    id: "6",
    user: "MARK_TECH",
    tag: "CODE_PURITY",
    content:
      "Clean code is better than clever code. Always optimize for readability first.",
    image: "https://picsum.photos/seed/code/800/800",
    likes: "856",
  },
];

export function Feed() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden text-black font-sans selection:bg-[#E2FF54]">
      <ScrollArea className="flex-1 w-full overflow-y-auto scrollbar-hide">
        {/* MAIN CONTAINER: grid-cols-1 and min-w-0 prevents image expansion overflow */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-20 w-full grid grid-cols-1 min-w-0">
          {/* 1. BRAND HEADER */}
          <section className="mt-6 sm:mt-10 mb-8 overflow-hidden">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 bg-black dark:bg-[#E2FF54] rounded-xl flex-shrink-0 flex items-center justify-center">
                <span className="text-[#E2FF54] dark:text-black text-xl font-black">
                  M
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black dark:text-white leading-tight tracking-tight uppercase">
                  MAZLIS
                </span>
                <span className="text-[8px] font-extrabold text-gray-400 dark:text-gray-300 tracking-widest uppercase">
                  LIVE_ARCHIVE_v2
                </span>
              </div>
            </div>

            <h1 className="text-[38px] xs:text-[44px] sm:text-[52px] font-black dark:text-white leading-[0.95] tracking-tighter mb-8 sm:mb-10 uppercase italic break-words">
              Social
              <br />
              Registry.
            </h1>
          </section>

          {/* 2. STORY RAIL - Edge-to-Edge Scroll on Mobile */}
          <section className="mb-10 w-full overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase shrink-0">
                ACTIVE_SOULS
              </span>
              <div className="h-[1px] flex-1 bg-gray-100 dark:bg-gray-900" />
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
              {/* Add Story Button */}
              <button className="flex-shrink-0 w-[85px] sm:w-[95px] h-[120px] sm:h-[130px] rounded-[28px] sm:rounded-[32px] bg-[#E2FF54] flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform">
                <Plus size={28} strokeWidth={2.5} />
                <span className="text-[9px] font-black">ADD</span>
              </button>

              {/* Dummy Stories */}
              {["Sara", "Faiz", "Maleeha", "Abdul", "Zain"].map((name, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[85px] sm:w-[95px] h-[120px] sm:h-[130px] rounded-[28px] sm:rounded-[32px] dark:bg-gray-800 bg-gray-100 overflow-hidden relative group cursor-pointer"
                >
                  <Image
                    src={`https://i.pravatar.cc/150?u=${i + 40}`}
                    alt={name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-black text-white uppercase italic truncate block">
                      {name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. POST FEED - Fixed Width Logic */}
          <div className="space-y-6 w-full min-w-0">
            {POSTS.map((post) => (
              <div key={post.id} className="w-full min-w-0">
                <div className="bg-white dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-white/5 p-3 sm:p-6 transition-all hover:bg-gray-50/50 dark:hover:bg-white/[0.01] group w-full overflow-hidden">
                  {/* Meta */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-4">
                    <div className="bg-black dark:bg-[#E2FF54] px-2 py-0.5 rounded-md shrink-0">
                      <span className="text-[#E2FF54] dark:text-black text-[8px] sm:text-[10px] font-black uppercase">
                        {post.user}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black text-gray-400 dark:text-zinc-500 tracking-widest uppercase flex-1 italic truncate">
                      #{post.tag}
                    </span>
                    <MoreHorizontal size={16} className="text-gray-300" />
                  </div>

                  {/* Content */}
                  <p className="font-bold text-black dark:text-white mb-4 text-[15px] sm:text-[17px] leading-snug tracking-tight break-words">
                    {post.content}
                  </p>

                  {/* FIXED IMAGE BLOCK: aspect-[4/5] is best for mobile stability */}
                  <div className="relative w-full aspect-[4/5] sm:aspect-video rounded-[28px] sm:rounded-[30px] overflow-hidden mb-5 border border-gray-100 dark:border-white/5 shadow-xl">
                    <Image
                      src={post.image}
                      className="object-cover"
                      alt="transmission"
                      fill
                      sizes="(max-width: 500px) 100vw, 700px"
                    />
                    <button className="absolute top-2 right-2 w-9 h-9 sm:w-12 sm:h-12 bg-[#E2FF54] text-black rounded-2xl flex items-center justify-center shadow-2xl z-10">
                      <ArrowUpRight size={18} strokeWidth={3} />
                    </button>
                  </div>

                  {/* Actions - Condensed for < 500px */}
                  <div className="flex gap-1.5 sm:gap-3 w-full">
                    <button className="flex-1 min-w-0 h-[44px] sm:h-[58px] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[14px] sm:rounded-[22px] flex items-center justify-center gap-2">
                      <Heart size={18} className="text-gray-400 shrink-0" />
                      <span className="text-[11px] sm:text-[13px] font-black dark:text-white truncate">
                        {post.likes}
                      </span>
                    </button>
                    <button className="w-[44px] sm:w-[58px] h-[44px] sm:h-[58px] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[14px] sm:rounded-[22px] flex items-center justify-center shrink-0">
                      <MessageCircle size={18} className="text-gray-400" />
                    </button>
                    <button className="w-[44px] sm:w-[58px] h-[44px] sm:h-[58px] bg-black dark:bg-[#E2FF54] rounded-[14px] sm:rounded-[22px] flex items-center justify-center shrink-0">
                      <Send
                        size={18}
                        className="text-[#E2FF54] dark:text-black"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export function WebPostCard({ post }: { post: Post }) {
  const isTextOnly = !post.image;

  return (
    <div
      className="bg-white dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-white/5 
                p-3 sm:p-6 w-full overflow-hidden transition-all group"
    >
      {/* 1. META PROTOCOL - Flex Wrap for tiny screens */}
      <div className="flex items-center gap-2 mb-3 sm:mb-5 w-full">
        <div className="bg-black dark:bg-[#E2FF54] px-2 py-0.5 rounded-md shrink-0">
          <span className="text-[#E2FF54] dark:text-black text-[8px] sm:text-[10px] font-black uppercase tracking-tighter">
            {post.user}
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-black text-gray-400 dark:text-zinc-500 tracking-widest uppercase flex-1 italic truncate">
          #{post.tag}
        </span>
        <button className="text-gray-300 dark:text-zinc-600 p-1">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* 2. CONTENT TYPOGRAPHY - Adjusted line height and size */}
      <p
        className={cn(
          "font-bold text-black dark:text-white mb-3 sm:mb-5 break-words",
          isTextOnly
            ? "text-[22px] sm:text-3xl leading-[1.1] tracking-tighter italic"
            : "text-[14px] sm:text-[16px] leading-snug tracking-tight"
        )}
      >
        {post.content}
      </p>

      {/* 3. MEDIA BENTO BLOCK - The "Bleed" Fix */}
      {post.image && (
        <div
          className="relative w-full aspect-[4/5] sm:aspect-video lg:h-[450px] 
                        /* Negative margin trick for screens under 500px */
                        -mx-0 rounded-[16px] sm:rounded-[32px] 
                        overflow-hidden mb-4 sm:mb-6 border border-gray-100 dark:border-white/5 shadow-xl"
        >
          <Image
            src={post.image}
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            alt="post content"
            fill
            sizes="(max-width: 500px) 100vw, 800px"
          />
          {/* Action Overlay - Smaller for Mobile */}
          <button className="absolute top-2 right-2 w-8 h-8 sm:w-12 sm:h-12 bg-[#E2FF54] text-black rounded-lg flex items-center justify-center shadow-lg z-10">
            <ArrowUpRight size={14} className="sm:size-22" strokeWidth={3} />
          </button>
        </div>
      )}

      {/* 4. ACTION INTERFACE - Condensed for < 500px */}
      <div className="flex gap-1.5 sm:gap-3 w-full items-center">
        {/* Like Button */}
        <button className="flex-[2.5] min-w-0 h-[42px] sm:h-[58px] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[12px] sm:rounded-[22px] flex items-center justify-center gap-1.5 transition-all">
          <Heart
            size={16}
            className={cn(
              "shrink-0 sm:size-20",
              post.id === "1"
                ? "text-black dark:text-[#E2FF54] fill-current"
                : "text-gray-400"
            )}
          />
          <span className="text-[10px] sm:text-[13px] font-black dark:text-white truncate">
            {post.likes}
          </span>
        </button>

        {/* Comment & Share - Fixed Square Ratio */}
        <div className="flex gap-1.5 shrink-0">
          <button className="w-[42px] sm:w-[58px] h-[42px] sm:h-[58px] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[12px] sm:rounded-[22px] flex items-center justify-center">
            <MessageCircle size={16} className="text-gray-400 sm:size-20" />
          </button>

          <button className="w-[42px] sm:w-[58px] h-[42px] sm:h-[58px] bg-black dark:bg-[#E2FF54] rounded-[12px] sm:rounded-[22px] flex items-center justify-center">
            <Send
              size={16}
              className="text-[#E2FF54] dark:text-black sm:size-20"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
