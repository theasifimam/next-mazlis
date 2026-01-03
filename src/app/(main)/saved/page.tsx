"use client";

import { motion } from "framer-motion";
import { Bookmark, MoreHorizontal, Share2, Heart, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const SAVED_CATEGORIES = [
  "All",
  "Design",
  "Tech",
  "Inspiration",
  "Videos",
  "Articles",
];

const SAVED_POSTS = [
  {
    id: 1,
    type: "image",
    title: "Minimalist Setup",
    author: "@alex_design",
    img: "https://picsum.photos/seed/save1/600/800",
  },
  {
    id: 2,
    type: "article",
    title: "The Future of AI in UI",
    author: "@tech_insights",
    img: "https://picsum.photos/seed/save2/600/400",
  },
  {
    id: 3,
    type: "image",
    title: "Glassmorphism Guide",
    author: "@nexus_team",
    img: "https://picsum.photos/seed/save3/600/900",
  },
  {
    id: 4,
    type: "image",
    title: "Cyberpunk Aesthetic",
    author: "@neon_vibes",
    img: "https://picsum.photos/seed/save4/600/700",
  },
  {
    id: 5,
    type: "video",
    title: "NextJS 15 Tutorial",
    author: "@dev_mode",
    img: "https://picsum.photos/seed/save5/600/500",
  },
  {
    id: 6,
    type: "image",
    title: "Typography Trends",
    author: "@font_master",
    img: "https://picsum.photos/seed/save6/600/850",
  },
];

export default function SavedPostsPage() {
  return (
    <div className="flex flex-col h-full w-full bg-[#09090b]">
      {/* 1. Header Section */}
      <header className="p-8 pb-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <Bookmark size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Saved Posts
              </h1>
              <p className="text-zinc-500 text-sm">
                Your private collection of inspiration
              </p>
            </div>
          </div>

          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-zinc-400 transition-all">
            <Search size={20} />
          </button>
        </div>

        {/* Categories Chip List */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SAVED_CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                i === 0
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* 2. Masonry Grid Content */}
      <ScrollArea className="flex-1 px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pb-20 mt-4">
          {SAVED_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className="relative group break-inside-avoid rounded-3xl overflow-hidden border border-white/[0.08] bg-zinc-900 shadow-2xl transition-all hover:border-indigo-500/50"
            >
              {/* Media Container */}
              <div className="relative overflow-hidden">
                <Image
                  src={post.img}
                  alt={post.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width={600}
                  height={600}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="flex justify-end gap-2">
                    <OverlayButton Icon={Share2} />
                    <OverlayButton Icon={Bookmark} active />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart
                        size={18}
                        className="text-rose-500 fill-rose-500"
                      />
                      <span className="text-xs font-bold text-white">2.4k</span>
                    </div>
                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-5 space-y-2 bg-gradient-to-b from-zinc-900/50 to-zinc-900">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-[9px] uppercase tracking-tighter bg-indigo-500/5 border-indigo-500/20 text-indigo-400"
                  >
                    {post.type}
                  </Badge>
                  <span className="text-[10px] text-zinc-500 font-medium">
                    {post.author}
                  </span>
                </div>
                <h3 className="font-bold text-zinc-100 leading-tight group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function OverlayButton({
  Icon,
  active = false,
}: {
  Icon: React.ElementType;
  active?: boolean;
}) {
  return (
    <button
      className={`p-2.5 rounded-xl backdrop-blur-md transition-all active:scale-90 ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-white/10 hover:bg-white/20 text-white"
      }`}
    >
      <Icon size={18} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
