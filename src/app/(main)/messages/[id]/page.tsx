"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Phone,
  Video,
  Info,
  PlusCircle,
  Smile,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function ChatIdPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id;

  const chatData = {
    name: "Sarah Tech",
    status: "ENCRYPTED_LINE_04",
    category: "CORE_DEV",
  };

  return (
    <div className="relative flex flex-col h-screen w-full bg-white dark:bg-[#050505] text-black dark:text-white overflow-hidden font-sans">
      {/* 1. BENTO COMMAND HEADER */}
      <header className="z-20 px-8 py-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-2xl">
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push("/messages")}
            className="p-3 bg-gray-100 dark:bg-white/5 hover:bg-[#E2FF54] hover:text-black rounded-2xl transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-14 h-14 rounded-2xl border-2 border-[#ADFF00]/20 shadow-xl shadow-[#ADFF00]/5">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${chatId}`} />
                <AvatarFallback className="font-black italic bg-zinc-900 text-white">
                  ST
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#ADFF00] rounded-full border-4 border-white dark:border-[#050505]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-black text-[#ADFF00] tracking-[0.2em] uppercase">
                  {chatData.category}
                </span>
                <ShieldCheck size={10} className="text-blue-500" />
              </div>
              <h3 className="font-black text-xl tracking-tighter uppercase italic leading-none">
                {chatData.name}
              </h3>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest mt-1 uppercase">
                {chatData.status}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-gray-50 dark:bg-white/5 p-2 rounded-[24px]">
          <HeaderAction icon={<Phone size={18} />} />
          <HeaderAction icon={<Video size={18} />} />
          <div className="w-[1px] h-4 bg-gray-200 dark:bg-white/10 mx-1" />
          <HeaderAction icon={<Info size={18} />} />
        </div>
      </header>

      {/* 2. CONVERSATION GRID */}
      <ScrollArea className="flex-1 px-8">
        <div className="max-w-4xl mx-auto py-12 space-y-12">
          {/* System Timestamp Bento */}
          <div className="flex items-center gap-4 opacity-30">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-400" />
            <span className="text-[9px] font-black tracking-[0.4em] uppercase">
              Session_Start_01.10.26
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-400" />
          </div>

          <MessageBlock
            type="received"
            text="The design system is now fully modular. I've removed all heavy borders. Everything relies on soft depth and duo-tone card colors now."
            time="14:15"
            meta="DATA_INBOUND"
          />

          <MessageBlock
            type="sent"
            text="Acknowledged. The Bento transition for the Registry looks clean. Applying the same logic to the input protocol now."
            time="14:16"
            meta="ENCRYPTED_OUT"
          />

          <MessageBlock
            type="received"
            text="Perfect. Also, check the new Volt-Green accent for unread indicators. It cuts through the dark mode perfectly."
            time="14:18"
            meta="DESIGN_SPEC"
            isHighPriority
          />
        </div>
      </ScrollArea>

      {/* 3. BENTO INPUT PROTOCOL */}
      <footer className="p-8">
        <div className="max-w-4xl mx-auto relative group">
          {/* Subtle Duo-tone glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#ADFF00]/10 to-blue-500/10 rounded-[40px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />

          <div className="relative bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-[32px] p-3 flex items-center gap-3 backdrop-blur-3xl shadow-2xl shadow-black/5">
            <button className="p-4 text-gray-400 hover:text-[#ADFF00] hover:bg-white dark:hover:bg-white/5 rounded-2xl transition-all">
              <PlusCircle size={22} />
            </button>

            <input
              type="text"
              placeholder="WRITE_MESSAGE_TO_SARAH..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm font-bold tracking-tight text-black dark:text-white placeholder:text-gray-400 placeholder:text-[10px] placeholder:tracking-[0.2em]"
            />

            <div className="flex items-center gap-2">
              <button className="hidden sm:flex p-4 text-gray-400 hover:text-[#ADFF00] rounded-2xl transition-colors">
                <Smile size={22} />
              </button>
              <button className="bg-[#E2FF54] text-black px-8 py-4 rounded-[22px] font-black text-xs tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#E2FF54]/20 flex items-center gap-3">
                Send <Zap size={14} fill="black" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MessageBlock({
  type,
  text,
  time,
  meta,
  isHighPriority,
}: {
  type: "received" | "sent";
  text: string;
  time: string;
  meta: string;
  isHighPriority?: boolean;
}) {
  const isSent = type === "sent";

  return (
    <div
      className={cn(
        "flex w-full group",
        isSent ? "justify-end pl-12" : "justify-start pr-12"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2",
          isSent ? "items-end" : "items-start"
        )}
      >
        {/* Editorial Meta Tag */}
        <div className="flex items-center gap-3 mb-1">
          {!isSent && (
            <span className="text-[8px] font-black text-gray-400 tracking-widest uppercase opacity-40">
              {meta}
            </span>
          )}
          {isHighPriority && (
            <span className="flex items-center gap-1 text-[8px] font-black text-[#ADFF00] tracking-widest uppercase bg-[#ADFF00]/10 px-2 py-0.5 rounded">
              Priority
            </span>
          )}
        </div>

        <div
          className={cn(
            "relative p-6 rounded-[32px] text-sm leading-[1.6] font-bold shadow-2xl transition-all",
            isSent
              ? "bg-zinc-900 dark:bg-white text-white dark:text-black rounded-tr-none italic"
              : "bg-gray-50 dark:bg-white/[0.04] text-black dark:text-white rounded-tl-none border border-gray-100 dark:border-white/5"
          )}
        >
          {text}

          {/* Duo-tone light reflection inside bubble */}
          <div
            className={cn(
              "absolute inset-0 rounded-[32px] opacity-20 pointer-events-none",
              isSent
                ? "bg-gradient-to-br from-white/20 to-transparent"
                : "bg-gradient-to-br from-[#ADFF00]/10 to-transparent"
            )}
          />
        </div>

        <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase mt-1 px-2">
          {time} / ACK_RECEIVED
        </span>
      </div>
    </div>
  );
}

function HeaderAction({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-3 text-gray-400 hover:text-[#ADFF00] hover:bg-white dark:hover:bg-white/10 rounded-xl transition-all active:scale-90">
      {icon}
    </button>
  );
}
