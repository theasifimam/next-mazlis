"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Heart,
  UserPlus,
  MessageCircle,
  Zap,
  Bell,
  CheckCheck,
  ArrowUpRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  type: "mention" | "zap" | "follow" | "like";
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  time: string;
  isUnread: boolean;
  reference: string;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "mention",
    user: {
      name: "Vitalik",
      handle: "@v.eth",
      avatar: "https://i.pravatar.cc/150?u=vitalik",
    },
    content: 'linked your soul_id in the "Neural Mesh" research thread.',
    time: "2m",
    isUnread: true,
    reference: "The scalability of decentralized registries relies on...",
  },
  {
    id: "2",
    type: "zap",
    user: {
      name: "Elena",
      handle: "@elena_x",
      avatar: "https://i.pravatar.cc/150?u=elena",
    },
    content: "transmitted 1.2k Zaps to your recent archive.",
    time: "15m",
    isUnread: true,
    reference: "The scalability of decentralized registries relies on...",
  },
  {
    id: "3",
    type: "follow",
    user: {
      name: "Alex",
      handle: "@alx",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    content: "is now monitoring your registry updates.",
    time: "1h",
    isUnread: false,
    reference: "The scalability of decentralized registries relies on...",
  },
];

export default function NotificationPage() {
  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="flex flex-col h-full w-full scrollbar-hide overflow-y-auto bg-white dark:bg-[#050505] text-black dark:text-white selection:bg-[#E2FF54]">
      {/* 1. STICKY NAV (Matches Explore/Feed blur) */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] h-16 transition-all duration-500",
          scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-b border-gray-100 dark:border-white/5" />
        <div className="relative flex items-center justify-between px-8 h-full max-w-2xl mx-auto">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-80">
            NOTICES — PROTOCOL_v1
          </span>
          <CheckCheck size={16} className="text-[#ADFF00] cursor-pointer" />
        </div>
      </header>

      <ScrollArea
        onScrollCapture={(e) => setScrolled(e.currentTarget.scrollTop > 60)}
        className="flex-1 w-full scrollbar-hide"
      >
        <div className="max-w-2xl mx-auto px-6 pb-24">
          {/* 2. PAGE TITLE (The Editorial Hero) */}
          <section className="mt-12 mb-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-black dark:bg-[#E2FF54] rounded-2xl flex items-center justify-center shadow-xl shadow-black/10">
                <Bell size={22} className="text-[#E2FF54] dark:text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black leading-tight tracking-tight uppercase">
                  MAZLIS
                </span>
                <span className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                  NOTIFICATIONS_LOG
                </span>
              </div>
            </div>

            <h1 className="text-[58px] font-black leading-[0.85] tracking-tighter italic uppercase">
              System
              <br />
              Notices.
            </h1>
          </section>

          {/* 3. NOTIFICATION CARDS (Bento Style) */}
          <section className="space-y-4">
            <AnimatePresence>
              {NOTIFICATIONS.map((notif: Notification) => (
                <div key={notif.id} className="relative">
                  {/* UNREAD GLOW ANCHOR */}
                  {notif.isUnread && (
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#E2FF54] rounded-full shadow-[0_0_15px_#E2FF54] z-10" />
                  )}

                  <div
                    className={cn(
                      "group flex flex-col gap-5 p-8 rounded-[40px] transition-all duration-500 cursor-pointer",
                      notif.isUnread
                        ? "bg-[#F9FAFB] dark:bg-[#0D0D0D] shadow-2xl shadow-black/[0.02]"
                        : "opacity-40 grayscale-[0.8] hover:opacity-100 hover:grayscale-0 hover:bg-gray-50 dark:hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 rounded-2xl">
                          <AvatarImage src={notif.user.avatar} />
                          <AvatarFallback className="bg-black text-[#E2FF54] font-black italic">
                            {notif.user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-black text-[13px] tracking-tight group-hover:text-[#ADFF00] transition-colors uppercase">
                            {notif.user.name}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase opacity-60">
                            {notif.user.handle}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                        {notif.time}
                      </span>
                    </div>

                    <div className="flex gap-4">
                      {/* TYPE ICON INDICATOR */}
                      <div
                        className={cn(
                          "w-10 h-10 shrink-0 rounded-xl flex items-center justify-center",
                          notif.type === "mention"
                            ? "bg-[#ADFF00] text-black"
                            : "bg-white dark:bg-black shadow-sm"
                        )}
                      >
                        <NotificationIcon type={notif.type} />
                      </div>

                      <p className="text-lg leading-tight font-bold tracking-tight text-gray-800 dark:text-gray-200">
                        {notif.content}
                      </p>
                    </div>

                    {/* MENTION-SPECIFIC PREVIEW (Differentiates Mentions) */}
                    {notif.type === "mention" && notif.reference && (
                      <div className="mt-2 ml-14 p-5 bg-white dark:bg-black/40 rounded-[24px] border-l-4 border-[#ADFF00] shadow-sm">
                        <p className="text-sm text-gray-400 italic font-medium line-clamp-2">
                          &quot;{notif.reference}&quot;
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-[#ADFF00] text-[10px] font-black tracking-widest uppercase">
                          View Reference <ArrowUpRight size={12} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}

function NotificationIcon({ type }: { type: string }) {
  const size = 18;
  switch (type) {
    case "zap":
      return <Zap size={size} className="fill-[#E2FF54] text-[#E2FF54]" />;
    case "mention":
      return <MessageCircle size={size} />;
    case "follow":
      return <UserPlus size={size} className="text-blue-500" />;
    default:
      return <Heart size={size} />;
  }
}
