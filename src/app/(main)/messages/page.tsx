"use client";

import Link from "next/link";
import { Search, Edit3, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const CONVERSATIONS = [
  {
    id: "1",
    name: "Sarah Tech",
    lastMsg: "Did you see the new update?",
    time: "2m",
    online: true,
    unread: 2,
  },
  {
    id: "2",
    name: "Design Studio",
    lastMsg: "The prototype looks amazing!",
    time: "1h",
    online: false,
    unread: 0,
  },
  {
    id: "3",
    name: "Alex Rivera",
    lastMsg: "Let's catch up later today.",
    time: "3h",
    online: true,
    unread: 0,
  },
];

export default function MessagesListPage() {
  return (
    <div className="flex flex-col h-full w-full bg-black/10">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          <button className="p-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 rounded-xl text-indigo-400 transition-all">
            <Edit3 size={20} />
          </button>
        </div>

        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 pb-20">
          {CONVERSATIONS.map((chat) => (
            <Link
              key={chat.id}
              href={`/messages/${chat.id}`}
              className="flex items-center gap-4 p-4 rounded-[24px] hover:bg-white/[0.05] border border-transparent hover:border-white/5 transition-all group"
            >
              <div className="relative">
                <Avatar className="w-14 h-14 rounded-2xl border border-white/5">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${chat.id}`} />
                </Avatar>
                {chat.online && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-[3px] border-[#09090b] rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-zinc-100">{chat.name}</span>
                  <span className="text-xs text-zinc-500">{chat.time}</span>
                </div>
                <p className="text-sm text-zinc-400 truncate pr-4 font-light leading-relaxed">
                  {chat.lastMsg}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                {chat.unread > 0 && (
                  <Badge className="bg-indigo-500 hover:bg-indigo-500 h-5 min-w-5 flex items-center justify-center rounded-full text-[10px] p-1">
                    {chat.unread}
                  </Badge>
                )}
                <ChevronRight
                  size={16}
                  className="text-zinc-600 group-hover:text-indigo-400 transition-colors"
                />
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
