"use client";

import { Search, Settings, MoreHorizontal, TrendingUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const TRENDS = [
  { category: "Technology • Trending", topic: "#NextJS15", posts: "42.5K" },
  { category: "Gaming • Trending", topic: "GTA VI", posts: "128K" },
  { category: "Design", topic: "Bentogrids", posts: "12.2K" },
  { category: "AI • Live", topic: "Gemini 3 Flash", posts: "89K" },
];

export default function ExplorePage() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* 1. Search Header */}
      <div className="flex-none z-50 p-4 bg-black/40 backdrop-blur-xl border-b border-white/5 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Nexus"
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/10 transition-all text-sm"
            />
          </div>
          <button className="p-3 hover:bg-white/5 rounded-xl transition-colors text-zinc-400">
            <Settings size={20} />
          </button>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-6">
            {["Trending", "News", "Sports", "Entertainment"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="bg-transparent p-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-white text-zinc-500 transition-all"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* 2. Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col pb-20">
          {/* Featured Hero Post */}
          <div className="relative aspect-[16/7] w-full overflow-hidden group cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000"
              alt="Featured"
              fill // Makes image fill the parent container
              priority // Best practice for "Hero" or "Featured" images to load faster
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge className="mb-2 bg-indigo-600 hover:bg-indigo-600">
                Featured
              </Badge>
              <h3 className="text-2xl font-bold text-white leading-tight">
                The Future of Spatial UI Design
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                Discovery • 4.2k people reading
              </p>
            </div>
          </div>

          {/* Trending List */}
          <div className="p-4 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-indigo-400" size={20} />
              <h4 className="font-bold text-lg">Trends for you</h4>
            </div>

            {TRENDS.map((trend, i) => (
              <div
                key={i}
                className="flex justify-between items-start group cursor-pointer hover:bg-white/[0.02] -mx-4 px-4 py-2 transition-colors"
              >
                <div>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
                    {trend.category}
                  </p>
                  <p className="text-[15px] font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                    {trend.topic}
                  </p>
                  <p className="text-[13px] text-zinc-500">
                    {trend.posts} Posts
                  </p>
                </div>
                <MoreHorizontal size={16} className="text-zinc-600" />
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 my-4" />

          {/* Media Discovery Grid */}
          <div className="p-1 grid grid-cols-3 gap-1">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group cursor-pointer border border-white/5 
                  ${i === 1 ? "row-span-2 col-span-2" : "aspect-square"}`}
              >
                <Image
                  src={`https://picsum.photos/seed/exp${i}/600/800`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Discovery"
                />
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
