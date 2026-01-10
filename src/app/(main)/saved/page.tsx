"use client";

import { motion } from "framer-motion";
import { Bookmark, Terminal, ArrowUpRight, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SAVED_CATEGORIES = ["All", "Design", "Tech", "Videos", "Inspo"];

const SAVED_POSTS = [
  {
    id: 1,
    type: "IMG",
    title: "Minimalist Setup",
    author: "@alex",
    img: "https://picsum.photos/seed/save1/600/800",
    size: "tall",
  },
  {
    id: 2,
    type: "DOC",
    title: "AI in UI",
    author: "@tech",
    img: "https://picsum.photos/seed/save2/600/400",
    size: "wide",
  },
  {
    id: 3,
    type: "IMG",
    title: "Glassmorphism",
    author: "@nexus",
    img: "https://picsum.photos/seed/save3/600/600",
    size: "small",
  },
  {
    id: 4,
    type: "VID",
    title: "NextJS 15",
    author: "@dev",
    img: "https://picsum.photos/seed/save5/600/500",
    size: "small",
  },
  {
    id: 5,
    type: "IMG",
    title: "Cyber Protocol",
    author: "@neon",
    img: "https://picsum.photos/seed/save8/600/900",
    size: "tall",
  },
  {
    id: 6,
    type: "IMG",
    title: "Design Systems",
    author: "@core",
    img: "https://picsum.photos/seed/save9/600/600",
    size: "small",
  },
];

export default function SavedPostsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#050505] overflow-hidden">
      {/* 1. HEADER SECTION (Flush) */}
      <header className="flex-none py-5 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-12 h-12 rounded-xl bg-black dark:bg-[#E2FF54] flex items-center justify-center text-[#E2FF54] dark:text-black shadow-lg">
            <Bookmark size={24} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none text-black dark:text-white">
            Vault<span className="opacity-20">.01</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SAVED_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-4 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all border",
                activeTab === cat
                  ? "bg-[#E2FF54] text-black border-[#E2FF54]"
                  : "bg-transparent text-gray-400 border-gray-100 dark:border-white/5 hover:border-black dark:hover:border-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* 2. DENSE BENTO GRID 
          - grid-flow-dense: Tells CSS to fill gaps automatically.
          - gap-0: Makes cards touch each other perfectly.
      */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-2 grid-flow-dense gap-4">
          {SAVED_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "group relative overflow-hidden rounded-[40px] border-r border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02]",
                post.size === "tall" && "row-span-2 min-h-[400px]",
                post.size === "wide" && "col-span-2 min-h-[200px]",
                post.size === "small" && "h-[200px]"
              )}
            >
              {/* Media Layer */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover grayscale overflow-hidden rounded-[40px] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {/* Visual Finish */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-[#E2FF54]/80 transition-all duration-500" />
              </div>

              {/* Content Layer */}
              <div className="relative h-full w-full p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all transform -translate-y-2 group-hover:translate-y-0">
                  <div className="bg-black px-2 py-1 rounded text-[8px] font-black text-[#ADFF00] tracking-widest">
                    {post.type}
                  </div>
                  <Zap size={14} className="text-black animate-pulse" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100">
                    <Terminal
                      size={10}
                      className="text-[#ADFF00] group-hover:text-black"
                    />
                    <span className="text-[8px] font-bold text-white group-hover:text-black uppercase tracking-tighter">
                      {post.author}
                    </span>
                  </div>
                  <h3 className="font-black text-lg lg:text-xl tracking-tight text-white group-hover:text-black uppercase italic leading-none truncate">
                    {post.title}
                  </h3>
                </div>
              </div>

              {/* Hover Action Link */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#E2FF54] shadow-2xl">
                  <ArrowUpRight size={24} strokeWidth={3} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
