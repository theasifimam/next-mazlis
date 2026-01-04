"use client";

import { motion } from "framer-motion";
import {
  Settings,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Edit3,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function ProfilePage() {
  return (
    /* Removed hardcoded dark hex, using bg-background for theme support */
    <div className="h-full w-full bg-background overflow-y-auto no-scrollbar scroll-smooth transition-colors duration-300">
      {/* 1. Hero / Banner Section */}
      <div className="relative h-64 md:h-80 w-full flex-none">
        <Image
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070"
          className="w-full h-full object-cover"
          alt="Cover"
          fill
          priority
        />
        {/* The overlay now adapts to the background theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />

        <div className="absolute top-6 right-6 flex gap-3 z-30">
          <button className="p-3 bg-background/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-background/40 transition-all active:scale-95 shadow-xl">
            <Share2 size={20} />
          </button>
          <button className="p-3 bg-background/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-background/40 transition-all active:scale-95 shadow-xl">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* 2. Profile Content Wrapper */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 pb-20">
        {/* Profile Avatar & Actions Row */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-20 md:-mt-24 z-20">
          <div className="flex flex-col gap-5">
            <div className="relative inline-block group">
              <Avatar className="w-32 h-32 md:w-44 md:h-44 rounded-[42px] border-[8px] border-background shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] overflow-hidden">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="object-cover"
                />
                <AvatarFallback className="bg-secondary text-2xl font-black">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-4 right-4 w-7 h-7 bg-emerald-500 border-[5px] border-background rounded-full shadow-lg" />
            </div>

            <div className="space-y-1 px-2">
              <h1 className="text-4xl font-black text-foreground tracking-tight italic">
                John Doe
              </h1>
              <p className="text-primary font-bold text-lg tracking-tight">
                @johndoe
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2 px-2">
            <Button className="h-12 rounded-2xl px-8 bg-foreground text-background hover:opacity-90 font-black shadow-lg active:scale-95 transition-all gap-2">
              <Edit3 size={18} /> Edit Profile
            </Button>
            <button className="p-3 bg-secondary hover:bg-secondary/80 border border-border rounded-2xl text-foreground transition-all">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>

        {/* Bio & Stats Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10 border-b border-border">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-muted-foreground max-w-2xl leading-relaxed text-lg font-medium">
              Founding Designer{" "}
              <span className="text-foreground font-black underline decoration-primary/50 underline-offset-4 cursor-pointer">
                @Nexus
              </span>
              . Crafting the next generation of social interfaces. I build in
              public and share my process. ✨
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-muted-foreground text-sm font-bold">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" /> San Francisco, CA
              </div>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-primary transition-colors italic underline decoration-primary/20"
              >
                <LinkIcon size={16} /> nexus.design
              </a>
              <div className="flex items-center gap-2">
                <Calendar size={16} /> Joined Jan 2024
              </div>
            </div>
          </div>

          {/* Stats Box */}
          <div className="flex lg:flex-col justify-between lg:justify-center gap-6 bg-secondary/30 p-6 rounded-[32px] border border-border/50">
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-foreground font-black text-2xl tracking-tighter">
                12.8K
              </span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-black">
                Followers
              </span>
            </div>
            <div className="w-px lg:w-full h-8 lg:h-px bg-border" />
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-foreground font-black text-2xl tracking-tighter">
                842
              </span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-black">
                Following
              </span>
            </div>
          </div>
        </div>

        {/* 3. Tabbed Content Section */}
        <div className="mt-4">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-10">
              <TabsTrigger
                value="posts"
                className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 py-6 text-muted-foreground font-black text-sm uppercase tracking-widest transition-all"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 py-6 text-muted-foreground font-black text-sm uppercase tracking-widest transition-all"
              >
                Media
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="py-10 outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <ProfilePostCard key={i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="media" className="py-10 outline-none">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 0.98, rotate: 1 }}
                    className="aspect-square rounded-[32px] overflow-hidden group cursor-pointer border border-border bg-secondary"
                  >
                    <Image
                      src={`https://picsum.photos/seed/profmedia${i}/800/800`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      alt="Post content"
                      fill
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function ProfilePostCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-secondary/20 border border-border rounded-[40px] p-5 space-y-5 hover:bg-secondary/40 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] rounded-[28px] overflow-hidden border border-border shadow-inner">
        <Image
          src={`https://picsum.photos/seed/${Math.random()}/1200/800`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          alt="Post content"
          fill
        />
      </div>
      <div className="space-y-4 px-2">
        <h4 className="font-black text-foreground text-xl leading-tight tracking-tight group-hover:text-primary transition-colors">
          Spatial UI: The Intersection of Glass and Depth
        </h4>
        <div className="flex items-center gap-6 text-muted-foreground">
          <button className="flex items-center gap-2 hover:text-rose-500 transition-colors group/btn">
            <Heart size={18} className="group-hover/btn:fill-rose-500" />
            <span className="text-xs font-black tracking-tighter">4.2K</span>
          </button>
          <button className="flex items-center gap-2 hover:text-primary transition-colors group/btn">
            <MessageSquare size={18} className="group-hover/btn:fill-primary" />
            <span className="text-xs font-black tracking-tighter">128</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
