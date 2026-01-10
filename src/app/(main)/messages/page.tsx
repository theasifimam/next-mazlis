"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Trash2,
  Zap,
  MessageSquare,
  LayoutGrid,
  List,
  MoreVertical,
  X,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const INITIAL_CHATS = [
  {
    id: "1",
    name: "Aquib Imam",
    msg: "The update is live! 🚀",
    time: "2m",
    online: true,
    unread: 2,
    category: "PRIMARY",
    color: "bg-[#E2FF54]/10",
  },
  {
    id: "2",
    name: "Hanjalah Rahmani",
    msg: "Check the latest Figma link for the Bento updates.",
    time: "1h",
    online: false,
    unread: 0,
    category: "DESIGN",
    color: "bg-blue-500/5",
  },
  {
    id: "3",
    name: "John Doe",
    msg: "Meeting at 5?",
    time: "3h",
    online: true,
    unread: 0,
    category: "SYSTEM",
    color: "bg-purple-500/5",
  },
  {
    id: "4",
    name: "Ishaaq Alam",
    msg: "Welcome to the transmission dashboard.",
    time: "1d",
    online: false,
    unread: 1,
    category: "LOGS",
    color: "bg-orange-500/5",
  },
  {
    id: "5",
    name: "John Doe",
    msg: "Meeting at 5?",
    time: "3h",
    online: true,
    unread: 0,
    category: "SYSTEM",
    color: "bg-purple-500/5",
  },
  {
    id: "6",
    name: "Ishaaq Alam",
    msg: "Welcome to the transmission dashboard.",
    time: "1d",
    online: false,
    unread: 1,
    category: "LOGS",
    color: "bg-orange-500/5",
  },
  {
    id: "7",
    name: "John Doe",
    msg: "Meeting at 5?",
    time: "3h",
    online: true,
    unread: 0,
    category: "SYSTEM",
    color: "bg-purple-500/5",
  },
  {
    id: "8",
    name: "Ishaaq Alam",
    msg: "Welcome to the transmission dashboard.",
    time: "1d",
    online: false,
    unread: 1,
    category: "LOGS",
    color: "bg-orange-500/5",
  },
  {
    id: "9",
    name: "John Doe",
    msg: "Meeting at 5?",
    time: "3h",
    online: true,
    unread: 0,
    category: "SYSTEM",
    color: "bg-purple-500/5",
  },
  {
    id: "10",
    name: "Ishaaq Alam",
    msg: "Welcome to the transmission dashboard.",
    time: "1d",
    online: false,
    unread: 1,
    category: "LOGS",
    color: "bg-orange-500/5",
  },
];

export default function ChatListPage() {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeOptionId, setActiveOptionId] = useState<string | null>(null);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setChats(chats.filter((c) => c.id !== id));
    setActiveOptionId(null);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide w-full bg-white dark:bg-[#050505] text-black dark:text-white transition-colors">
      {/* 1. HERO SECTION */}
      <section className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-[#E2FF54] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(226,255,84,0.3)]">
            <MessageSquare size={20} className="text-black" />
          </div>
          <span className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase">
            Secure_Transmissions
          </span>
        </div>
        <h1 className="text-6xl font-black tracking-tighter italic uppercase leading-[0.9]">
          Inbox
          <br />
          Protocol.
        </h1>
      </section>
      {/* 1. HEADER & CONTROLS */}
      <section className="px-8 pt-12 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black dark:bg-[#E2FF54] rounded-xl flex items-center justify-center">
              <MessageSquare
                size={20}
                className="text-[#E2FF54] dark:text-black"
              />
            </div>
            <h1 className="text-4xl font-black tracking-tighter italic uppercase">
              Registry
            </h1>
          </div>

          <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "list"
                  ? "bg-white dark:bg-zinc-800 shadow-sm"
                  : "text-gray-400"
              )}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "grid"
                  ? "bg-white dark:bg-zinc-800 shadow-sm"
                  : "text-gray-400"
              )}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>

        {/* SEARCH PROTOCOL */}
        <div className="relative group">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ADFF00] transition-colors"
            size={18}
          />
          <input
            placeholder="IDENTIFY_SENDER..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F3F4F6] dark:bg-white/5 border-none rounded-[20px] py-5 pl-16 pr-6 text-xs font-black tracking-[0.2em] outline-none focus:ring-2 focus:ring-[#E2FF54]/20 transition-all"
          />
        </div>
      </section>

      <ScrollArea className="flex-1 px-8 scrollbar-hide">
        <div
          className={cn(
            "pb-24 transition-all duration-500",
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-6 gap-4"
              : "flex flex-col gap-3"
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredChats.map((chat, i) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                viewMode={viewMode}
                isFeatured={i === 0 && viewMode === "grid"}
                onOpenOptions={() => setActiveOptionId(chat.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* OPTIONS MODAL OVERLAY */}
      <AnimatePresence>
        {activeOptionId && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveOptionId(null)}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xs bg-white dark:bg-zinc-900 rounded-[32px] p-8 shadow-2xl"
            >
              <h3 className="text-xl font-black uppercase mb-6 italic">
                Channel Options
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl font-bold text-sm hover:bg-[#E2FF54] hover:text-black transition-all">
                  Archive Thread <ArrowUpRight size={16} />
                </button>
                <button
                  onClick={() => handleDelete(activeOptionId)}
                  className="w-full flex items-center justify-between p-4 bg-rose-500/10 text-rose-500 rounded-2xl font-bold text-sm hover:bg-rose-500 hover:text-white transition-all"
                >
                  Delete Transmission <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setActiveOptionId(null)}
                  className="w-full p-4 text-gray-400 font-bold text-xs uppercase tracking-widest"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChatCard({ chat, viewMode, isFeatured, onOpenOptions }: any) {
  const isGrid = viewMode === "grid";

  return (
    <motion.div
      layout
      className={cn(
        "relative group rounded-[32px] overflow-hidden transition-all duration-500",
        isGrid
          ? isFeatured
            ? "md:col-span-4 h-[280px]"
            : "md:col-span-2 h-[280px]"
          : "w-full"
      )}
    >
      <div
        className={cn(
          "h-full w-full p-6 flex transition-all",
          isGrid ? "flex-col justify-between" : "flex-row items-center gap-6",
          chat.unread > 0
            ? "bg-gray-50 dark:bg-[#0D0D0D]"
            : "bg-transparent border border-gray-100 dark:border-white/5"
        )}
      >
        {/* Duo-Tone Accent Element */}
        <div
          className={cn(
            "absolute top-0 right-0 w-32 h-32 blur-[60px] -z-10 rounded-full transition-opacity opacity-50 group-hover:opacity-100",
            chat.unread > 0 ? "bg-[#ADFF00]/20" : "bg-blue-500/10"
          )}
        />

        <div className="flex justify-between items-start">
          <div className="relative">
            <Avatar className="h-14 w-14 rounded-2xl shadow-lg">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${chat.id}`} />
              <AvatarFallback className="bg-black text-white font-black italic">
                {chat.name[0]}
              </AvatarFallback>
            </Avatar>
            {chat.online && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#ADFF00] rounded-full border-4 border-white dark:border-[#0D0D0D]" />
            )}
          </div>

          {isGrid && (
            <button
              onClick={onOpenOptions}
              className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-xl transition-all"
            >
              <MoreVertical size={18} className="text-gray-400" />
            </button>
          )}
        </div>

        <div className={cn(isGrid ? "mt-4" : "flex-1")}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black text-[#ADFF00] tracking-widest uppercase">
              {chat.category}
            </span>
            {chat.unread > 0 && (
              <Zap size={10} className="text-[#E2FF54] fill-[#E2FF54]" />
            )}
          </div>
          <Link href={`/messages/${chat.id}`}>
            <h3 className="text-xl font-black tracking-tighter uppercase leading-tight group-hover:text-[#ADFF00] transition-colors">
              {chat.name}
            </h3>
            <p className="text-sm text-gray-400 font-bold line-clamp-1 italic mt-1">
              &quot;{chat.msg}&quot;
            </p>
          </Link>
        </div>

        {!isGrid && (
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-gray-400 uppercase">
              {chat.time}
            </span>
            <button
              onClick={onOpenOptions}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        )}

        {isGrid && chat.unread > 0 && (
          <div className="absolute top-6 right-16 bg-[#E2FF54] text-black text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
            {chat.unread} NEW
          </div>
        )}
      </div>
    </motion.div>
  );
}
