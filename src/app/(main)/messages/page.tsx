"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link
import { Search, Trash2, Edit3, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  },
  {
    id: "2",
    name: "Hanjalah Rahmani",
    msg: "Check the latest Figma link.",
    time: "1h",
    online: false,
    unread: 0,
  },
  {
    id: "3",
    name: "John Doe",
    msg: "Meeting at 5?",
    time: "3h",
    online: true,
    unread: 0,
  },
  {
    id: "4",
    name: "Ishaaq Alam",
    msg: "Welcome to the new dashboard.",
    time: "Yesterday",
    online: false,
    unread: 1,
  },
  {
    id: "5",
    name: "Faiz Alam",
    msg: "Welcome to the new dashboard.",
    time: "Yesterday",
    online: false,
    unread: 0,
  },
  {
    id: "6",
    name: "Saifi",
    msg: "Hey, you there?",
    online: "true",
    unread: 3,
  },
];

export default function ChatListPage() {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [searchQuery, setSearchQuery] = useState("");

  const deleteChat = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevents the Link from triggering
    e.stopPropagation(); // Prevents the click from bubbling up
    setChats(chats.filter((chat) => chat.id !== id));
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-background transition-colors mx-auto border-x border-border">
      {/* Header */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-primary">
            Messages
          </h1>
          <Button variant="secondary" size="icon" className="rounded-2xl">
            <Edit3 size={18} />
          </Button>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
            size={18}
          />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 rounded-[2rem] bg-secondary/50 border-border text-primary focus-visible:ring-primary/20"
          />
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1 px-4">
        <div className="flex flex-col gap-2 pb-10">
          <AnimatePresence mode="popLayout">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              >
                {/* 1. Navigation Link */}
                <Link
                  href={`/messages/${chat.id}`}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-[2.5rem] transition-all border border-transparent group relative",
                    "hover:bg-secondary/40 hover:border-border active:scale-[0.98]",
                    chat.unread > 0 ? "bg-primary/[0.03]" : "bg-transparent"
                  )}
                >
                  {/* Avatar */}
                  <div className="relative flex-none">
                    <Avatar className="h-14 w-14 rounded-2xl border border-border shadow-sm">
                      <AvatarImage
                        src={`https://i.pravatar.cc/150?u=${chat.id}`}
                      />
                      <AvatarFallback className="bg-secondary font-bold">
                        {chat.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-[3px] border-background rounded-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span
                        className={cn(
                          "font-black tracking-tight",
                          chat.unread > 0
                            ? "text-foreground"
                            : "text-foreground/80"
                        )}
                      >
                        {chat.name}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {chat.time}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "text-sm truncate pr-6 font-medium",
                        chat.unread > 0
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {chat.msg}
                    </p>
                  </div>

                  {/* Right Side: Unread Badge or Delete Icon */}
                  <div className="flex flex-col items-end gap-2 min-w-[32px]">
                    {/* Delete Action - Prevents Link Nav */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => deleteChat(e, chat.id)}
                      className="h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-500 transition-all absolute right-4"
                    >
                      <Trash2 size={16} />
                    </Button>

                    {/* Badge (Hidden when delete button shows) */}
                    {chat.unread > 0 && (
                      <div className="bg-primary text-primary-foreground h-5 min-w-[20px] rounded-full flex items-center justify-center text-[10px] font-black px-1 group-hover:opacity-0 transition-opacity">
                        {chat.unread}
                      </div>
                    )}

                    <ChevronRight
                      size={14}
                      className="text-muted-foreground/30 group-hover:text-primary transition-colors mt-auto"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
}
