"use client";

import { motion } from "framer-motion";
import {
  Settings,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Grid,
  Image as ImageIcon,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function ProfilePage() {
  return (
    /* Main container must be h-full and overflow-y-auto */
    <div className="h-full w-full bg-[#09090b] overflow-y-auto no-scrollbar scroll-smooth">
      {/* 1. Hero / Banner Section */}
      <div className="relative h-64 md:h-96 w-full flex-none">
        <Image
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070"
          className="w-full h-full object-cover"
          alt="Cover"
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/40" />

        <div className="absolute top-6 right-6 flex gap-3">
          <button className="p-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-black/40 transition-all active:scale-95">
            <Share2 size={20} />
          </button>
          <button className="p-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-black/40 transition-all active:scale-95">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* 2. Profile Content Wrapper */}
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Profile Avatar & Actions Row */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-20 md:-mt-24 z-20">
          <div className="flex flex-col gap-6">
            <div className="relative inline-block group">
              <Avatar className="w-32 h-32 md:w-44 md:h-44 rounded-[42px] border-[8px] border-[#09090b] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-zinc-800 text-2xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-4 right-4 w-7 h-7 bg-indigo-500 border-[5px] border-[#09090b] rounded-full shadow-lg" />
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl font-black text-white tracking-tight">
                John Doe
              </h1>
              <p className="text-indigo-400 font-semibold text-lg">@johndoe</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <Button className="h-12 rounded-2xl px-10 bg-white text-black hover:bg-zinc-200 font-bold shadow-lg shadow-white/5 active:scale-95 transition-all">
              Edit Profile
            </Button>
            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white transition-all">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>

        {/* Bio & Links */}
        <div className="mt-8 space-y-6 pb-8 border-b border-white/5">
          <p className="text-zinc-300 max-w-2xl leading-relaxed text-lg">
            Founding Designer{" "}
            <span className="text-white font-bold underline decoration-indigo-500/50 underline-offset-4">
              @Nexus
            </span>
            . Crafting the next generation of social interfaces. I build in
            public and share my process. ✨
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-zinc-500 text-sm font-medium">
            <div className="flex items-center gap-2.5">
              <MapPin size={18} className="text-indigo-500" /> San Francisco, CA
            </div>
            <a
              href="#"
              className="flex items-center gap-2.5 text-zinc-300 hover:text-indigo-400 transition-colors"
            >
              <LinkIcon size={18} /> nexus.design
            </a>
            <div className="flex items-center gap-2.5">
              <Calendar size={18} /> Joined January 2024
            </div>
          </div>

          <div className="flex gap-10 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-white font-black text-xl">12.8K</span>
              <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">
                Followers
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-white font-black text-xl">842</span>
              <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">
                Following
              </span>
            </div>
          </div>
        </div>

        {/* 3. Tabbed Content Section */}
        <div className="mt-2">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-white/5 rounded-none h-auto p-0 gap-10">
              <TabsTrigger
                value="posts"
                className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-indigo-500 border-b-2 border-transparent rounded-none px-0 py-6 text-zinc-500 font-bold text-base transition-all"
              >
                <Grid size={20} className="mr-2.5" /> Posts
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-indigo-500 border-b-2 border-transparent rounded-none px-0 py-6 text-zinc-500 font-bold text-base transition-all"
              >
                <ImageIcon size={20} className="mr-2.5" /> Media
              </TabsTrigger>
              <TabsTrigger
                value="likes"
                className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-indigo-500 border-b-2 border-transparent rounded-none px-0 py-6 text-zinc-500 font-bold text-base transition-all"
              >
                <Heart size={20} className="mr-2.5" /> Likes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="py-8 outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProfilePostCard key={i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="media" className="py-8 outline-none">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 0.98 }}
                    className="aspect-square rounded-3xl overflow-hidden group cursor-pointer border border-white/5 bg-zinc-900"
                  >
                    <Image
                      src={`https://picsum.photos/seed/profmedia${i}/800/800`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                      alt="Post content"
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom padding for mobile/scroll room */}
      <div className="h-20 w-full" />
    </div>
  );
}

function ProfilePostCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white/[0.02] border border-white/[0.08] rounded-[32px] p-6 space-y-5 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
    >
      <div className="aspect-[16/10] rounded-[24px] overflow-hidden border border-white/5">
        <Image
          src={`https://picsum.photos/seed/${Math.random()}/1200/800`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt="Post content"
        />
      </div>
      <div className="space-y-3">
        <h4 className="font-bold text-zinc-100 text-xl leading-snug group-hover:text-white transition-colors">
          Designing for the Apple Vision Pro: A Glassmorphism Case Study
        </h4>
        <div className="flex items-center gap-6 text-zinc-500">
          <button className="flex items-center gap-2 hover:text-rose-500 transition-colors group/btn">
            <Heart size={20} className="group-hover/btn:fill-rose-500" />
            <span className="text-sm font-bold">4.2K</span>
          </button>
          <button className="flex items-center gap-2 hover:text-indigo-400 transition-colors group/btn">
            <MessageSquare
              size={20}
              className="group-hover/btn:fill-indigo-400"
            />
            <span className="text-sm font-bold">128</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
