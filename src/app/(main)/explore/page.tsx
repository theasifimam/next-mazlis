"use client";

import {
  Search,
  Settings,
  MoreHorizontal,
  TrendingUp,
  Play,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";

const TRENDS = [
  { category: "Technology • Trending", topic: "#NextJS15", posts: "42.5K" },
  { category: "Gaming • Trending", topic: "GTA VI", posts: "128K" },
  { category: "Design", topic: "Bentogrids", posts: "12.2K" },
  { category: "AI • Live", topic: "Gemini 3 Flash", posts: "89K" },
];

export default function ExplorePage() {
  return (
    <div className="flex flex-col h-full w-full bg-background transition-colors duration-300">
      {/* 1. Integrated Search Header */}
      <div className="flex-none sticky top-0 z-50 p-4 bg-background/60 backdrop-blur-xl border-b border-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Nexus"
              className="w-full bg-secondary/50 border border-border rounded-2xl py-2.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:bg-secondary transition-all text-sm"
            />
          </div>
          <button className="p-2.5 hover:bg-secondary transition-colors text-muted-foreground border border-transparent hover:border-border">
            <Settings size={20} />
          </button>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-8 overflow-x-auto no-scrollbar">
            {["Trending", "News", "Sports", "Entertainment"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground font-bold transition-all"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* 2. Content Area */}
      <ScrollArea className="flex-1 h-full">
        <div className="flex flex-col pb-24">
          {/* Featured Hero Card - Enhanced UI */}
          <div className="p-4">
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl group cursor-pointer shadow-xl shadow-black/5">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000"
                alt="Featured"
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary hover:bg-primary text-primary-foreground border-none">
                    Featured
                  </Badge>
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Play size={10} fill="currentColor" /> Live Now
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                  The Future of <br /> Spatial UI Design
                </h3>
                <p className="text-white/70 text-sm mt-2 font-medium">
                  Discovery • 4.2k people interacting
                </p>
              </div>
            </div>
          </div>

          {/* Trending Section */}
          <div className="px-6 py-4 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <TrendingUp className="text-primary" size={18} />
                </div>
                <h4 className="font-black text-xl tracking-tight">
                  Trends for you
                </h4>
              </div>
            </div>

            <div className="grid gap-1">
              {TRENDS.map((trend, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start group cursor-pointer hover:bg-secondary/50 -mx-4 px-4 py-3 rounded-2xl transition-all"
                >
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-black">
                      {trend.category}
                    </p>
                    <p className="text-[16px] font-black text-foreground group-hover:text-primary transition-colors">
                      {trend.topic}
                    </p>
                    <p className="text-[12px] text-muted-foreground font-medium">
                      {trend.posts} Posts
                    </p>
                  </div>
                  <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background rounded-full">
                    <MoreHorizontal
                      size={16}
                      className="text-muted-foreground"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-border mx-6 my-2" />

          {/* Media Discovery Bento Grid - Cleaned up */}
          <div className="p-4">
            <h4 className="font-black text-xl tracking-tight mb-4 px-2">
              Discover Media
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative overflow-hidden group cursor-pointer rounded-2xl bg-secondary",
                    i === 0 ? "row-span-2 col-span-2" : "aspect-square"
                  )}
                >
                  <Image
                    src={`https://picsum.photos/seed/exp${i + 10}/600/800`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                    alt="Discovery"
                    fill
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
