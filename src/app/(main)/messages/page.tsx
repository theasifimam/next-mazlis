"use client";

import React from "react";
import {
  ChevronLeft,
  MoreVertical,
  Plus,
  Smile,
  SendHorizontal,
  Image as ImageIcon,
  Phone,
  Video,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// 1. Types for Chat
interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMe: boolean;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    senderId: "user",
    text: "Hey! Did you finish the spatial UI prototype?",
    time: "10:00 AM",
    isMe: false,
  },
  {
    id: "2",
    senderId: "me",
    text: "Almost! Just tweaking the glassmorphism effects on the sidebar.",
    time: "10:02 AM",
    isMe: true,
  },
  {
    id: "3",
    senderId: "user",
    text: "Nice. The client really wants that 'Nexus' feel for the launch. ✨",
    time: "10:05 AM",
    isMe: false,
  },
  {
    id: "4",
    senderId: "me",
    text: "Definitely. I'm using the new semantic color tokens we discussed.",
    time: "10:06 AM",
    isMe: true,
  },
];

export default function MessageDetailPage(): React.ReactElement {
  return (
    <div className="flex flex-col h-full w-full bg-background transition-colors duration-300">
      {/* 1. Header: Contact Info & Actions */}
      <header className="flex-none p-4 flex items-center justify-between border-b border-border bg-background/60 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-colors md:hidden">
            <ChevronLeft size={20} />
          </button>

          <div className="relative">
            <Avatar className="h-10 w-10 rounded-xl border border-border shadow-sm">
              <AvatarImage
                src="https://i.pravatar.cc/150?u=1"
                alt="Sarah Tech"
              />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                S
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-black text-foreground tracking-tight italic">
              Sarah Tech
            </span>
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
              Online
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          <button className="hidden md:flex p-2.5 hover:bg-secondary rounded-xl text-muted-foreground transition-all">
            <Phone size={18} />
          </button>
          <button className="hidden md:flex p-2.5 hover:bg-secondary rounded-xl text-muted-foreground transition-all">
            <Video size={18} />
          </button>
          <button className="p-2.5 hover:bg-secondary rounded-xl text-muted-foreground transition-all">
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* 2. Chat Area */}
      <ScrollArea className="flex-1 p-4 md:p-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <span className="bg-secondary/50 text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-border/50">
              Today
            </span>
          </div>

          {MOCK_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex w-full max-w-[85%] md:max-w-[70%]",
                msg.isMe ? "ml-auto justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "relative group px-5 py-3.5 rounded-[28px] shadow-sm transition-all",
                  msg.isMe
                    ? "bg-primary text-primary-foreground rounded-tr-lg"
                    : "bg-secondary/80 text-foreground border border-border rounded-tl-lg"
                )}
              >
                <p className="text-sm font-medium leading-relaxed">
                  {msg.text}
                </p>
                <span
                  className={cn(
                    "absolute bottom-[-20px] text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",
                    msg.isMe
                      ? "right-2 text-muted-foreground"
                      : "left-2 text-muted-foreground"
                  )}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="h-10" />
      </ScrollArea>

      {/* 3. Input Bar */}
      <footer className="p-4 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <div className="flex-1 flex items-end gap-2 bg-secondary/50 border border-border rounded-[32px] px-4 py-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <button className="p-2 hover:bg-background rounded-full text-muted-foreground transition-colors mb-1">
              <Plus size={20} />
            </button>
            <textarea
              placeholder="Message Sarah..."
              rows={1}
              className="w-full bg-transparent border-none outline-none py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none"
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
            <button className="p-2 hover:bg-background rounded-full text-muted-foreground transition-colors mb-1">
              <Smile size={20} />
            </button>
            <button className="p-2 hover:bg-background rounded-full text-muted-foreground transition-colors mb-1">
              <ImageIcon size={20} />
            </button>
          </div>

          <button className="h-12 w-12 flex items-center justify-center bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
            <SendHorizontal size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}
