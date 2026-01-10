"use client";

import { motion } from "framer-motion";
import { Heart, MessageSquare, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FEED_POSTS = [
  {
    id: 1,
    type: "IMG",
    title: "Spatial Depth Protocol",
    likes: "4.2K",
    comments: "128",
    img: "https://picsum.photos/seed/post1/800/1000",
    size: "tall",
  },
  {
    id: 2,
    type: "TXT",
    title: "Decentralized social interfaces are the future of user agency.",
    likes: "1.1K",
    comments: "45",
    size: "small",
  },
  {
    id: 3,
    type: "IMG",
    title: "Glassmorphism v3",
    likes: "2.8K",
    comments: "92",
    img: "https://picsum.photos/seed/post3/800/600",
    size: "wide",
  },
  {
    id: 4,
    type: "VID",
    title: "NextJS 15 Motion",
    likes: "3.5K",
    comments: "210",
    img: "https://picsum.photos/seed/post4/800/800",
    size: "small",
  },
  {
    id: 5,
    type: "IMG",
    title: "Nexus Core System",
    likes: "5.0K",
    comments: "300",
    img: "https://picsum.photos/seed/post5/800/1200",
    size: "tall",
  },
];

export default function UserPostFeed() {
  return (
    <div className="w-full p-4 lg:p-6 pt-0">
      {/* Feed System Header */}
      <div className="flex items-center gap-4 mb-6 px-2">
        <div className="h-px flex-1 bg-gray-100 dark:bg-white/5" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
          Transmissions
        </span>
        <div className="h-px flex-1 bg-gray-100 dark:bg-white/5" />
      </div>

      {/* DENSE ASYMMETRIC GRID */}
      <div className="grid grid-cols-2 gap-4 grid-flow-dense">
        {FEED_POSTS.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "group relative overflow-hidden rounded-[40px] border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.03] flex flex-col transition-all hover:border-[#ADFF00]/50",
              post.size === "tall" && "row-span-2 min-h-[420px]",
              post.size === "wide" && "col-span-2 min-h-[220px]",
              post.size === "small" && "h-[200px]"
            )}
          >
            {/* Background Media (for IMG/VID types) */}
            {post.img && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-[#E2FF54]/90 group-hover:via-[#E2FF54]/40 transition-colors duration-500" />
              </div>
            )}

            {/* Content Overlay */}
            <div className="relative z-10 flex h-full w-full flex-col justify-between p-6">
              <div className="flex justify-between items-start">
                <div className="bg-black/20 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg">
                  <span className="text-[8px] font-black text-white tracking-widest uppercase">
                    {post.type}
                  </span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-all bg-white text-black p-2 rounded-xl scale-75 group-hover:scale-100">
                  <ArrowUpRight size={16} strokeWidth={3} />
                </button>
              </div>

              <div className="space-y-3">
                <h3
                  className={cn(
                    "font-black tracking-tighter uppercase italic leading-tight transition-colors",
                    post.img
                      ? "text-white group-hover:text-black text-xl"
                      : "text-black dark:text-white text-lg",
                    post.size === "wide" && "text-2xl md:text-3xl"
                  )}
                >
                  {post.title}
                </h3>

                {/* Post Stats */}
                <div
                  className={cn(
                    "flex items-center gap-4 text-[10px] font-black tracking-widest transition-colors",
                    post.img
                      ? "text-white/60 group-hover:text-black/60"
                      : "text-gray-400"
                  )}
                >
                  <div className="flex items-center gap-1.5 hover:text-[#ADFF00] cursor-pointer">
                    <Heart
                      size={14}
                      className={
                        post.img
                          ? "group-hover:fill-black"
                          : "group-hover:fill-[#ADFF00]"
                      }
                    />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-[#ADFF00] cursor-pointer">
                    <MessageSquare size={14} />
                    {post.comments}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Trigger */}
      <div className="mt-8 flex justify-center">
        <button className="px-8 py-4 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:border-[#ADFF00] hover:text-[#ADFF00] transition-all">
          Load_More_Archive
        </button>
      </div>
    </div>
  );
}
