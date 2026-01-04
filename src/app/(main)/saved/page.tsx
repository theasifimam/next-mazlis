"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

import Image from "next/image";
import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState("All");

  return (
    // Added overflow-hidden to prevent horizontal scroll
    <div className="flex flex-col h-screen w-full bg-background transition-colors duration-300 overflow-hidden">
      {/* 1. Header Section - flex-none ensures it doesn't shrink or grow */}
      <header className="flex-none p-6 md:p-10 pb-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Bookmark size={28} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-foreground">
                Saved Posts
              </h1>
              <p className="text-muted-foreground text-sm font-medium">
                Your private collection of{" "}
                <span className="text-primary">inspiration</span>
              </p>
            </div>
          </div>
        </div>

        {/* Categories Chip List */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {SAVED_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap border ${
                activeTab === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* 2. Content Area - Using a native scroll div for better Masonry stability */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden px-6 md:px-10 custom-scrollbar">
        {/* max-w-full and w-full prevent the right-side overflow */}
        <div className="max-w-full w-full mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pb-32">
            {SAVED_POSTS.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group break-inside-avoid rounded-[2rem] overflow-hidden border border-border bg-card shadow-sm"
              >
                {/* Image Container */}
                <div className="relative w-full">
                  <Image
                    src={post.img}
                    alt={post.title}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                  {/* ... rest of your overlay code ... */}
                </div>

                {/* Text Content */}
                <div className="p-6">
                  <h3 className="font-bold text-foreground text-lg">
                    {post.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
