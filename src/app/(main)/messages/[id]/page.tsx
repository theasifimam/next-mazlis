"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Phone,
  Video,
  Info,
  Send,
  PlusCircle,
  Smile,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"; // Ensure your cn utility is set up

export default function ChatIdPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id;

  const chatData = { name: "Sarah Tech", online: true };

  return (
    <div className="relative flex flex-col h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden">
      {/* Background Mesh Decor */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Chat Header */}
      <header className="z-10 flex-none px-6 py-4 border-b border-white/5 flex items-center justify-between backdrop-blur-md bg-black/20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/messages")}
            className="group p-2 hover:bg-white/5 rounded-full text-zinc-400 hover:text-white transition-all"
          >
            <ChevronLeft
              size={24}
              className="group-active:scale-90 transition-transform"
            />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-11 h-11 border border-white/10 shadow-2xl">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${chatId}`} />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#09090b] rounded-full" />
            </div>
            <div>
              <h3 className="font-semibold text-[15px] tracking-tight text-white">
                {chatData.name}
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium">
                Active now
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <HeaderAction icon={<Phone size={19} />} />
          <HeaderAction icon={<Video size={19} />} />
          <HeaderAction icon={<Info size={19} />} />
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-6">
        <div className="max-w-3xl mx-auto py-8 space-y-8">
          <div className="flex justify-center">
            <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest text-zinc-500 font-bold border border-white/5">
              Today
            </span>
          </div>

          <MessageBubble
            type="received"
            text="Hey! I just updated the design tokens. The new glassmorphism looks incredible in dark mode."
            time="2:15 PM"
          />
          <MessageBubble
            type="sent"
            text="I see it! The depth with the mesh gradients is exactly what the project needed. 🚀"
            time="2:16 PM"
          />
          <MessageBubble
            type="received"
            text="Perfect. Let's push to production tonight."
            time="2:18 PM"
          />
        </div>
      </ScrollArea>

      {/* Input Footer */}
      <footer className="p-6 bg-gradient-to-t from-black/40 to-transparent">
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[32px] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />

          <div className="relative bg-[#121214] border border-white/10 rounded-[28px] p-2 flex items-center gap-1 backdrop-blur-xl shadow-2xl">
            <button className="p-3 text-zinc-400 hover:text-indigo-400 hover:bg-white/5 rounded-full transition-colors">
              <PlusCircle size={22} />
            </button>

            <input
              type="text"
              placeholder="Message..."
              className="flex-1 bg-transparent border-none outline-none px-2 py-2 text-[15px] text-zinc-200 placeholder:text-zinc-600"
            />

            <button className="p-3 text-zinc-400 hover:text-yellow-400 hover:bg-white/5 rounded-full transition-colors">
              <Smile size={22} />
            </button>

            <button className="ml-1 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-95">
              <Send size={18} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Helper Components to keep code clean */

function HeaderAction({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-90">
      {icon}
    </button>
  );
}

function MessageBubble({
  type,
  text,
  time,
}: {
  type: "sent" | "received";
  text: string;
  time: string;
}) {
  const isSent = type === "sent";

  return (
    <div
      className={cn(
        "flex w-full mb-2",
        isSent ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex flex-col max-w-[80%] lg:max-w-[60%]",
          isSent ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "relative px-4 py-3 text-[15px] leading-relaxed shadow-sm",
            isSent
              ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-[20px] rounded-br-none"
              : "bg-white/5 border border-white/10 text-zinc-100 rounded-[20px] rounded-bl-none backdrop-blur-sm"
          )}
        >
          {text}
        </div>
        <span className="mt-1.5 px-1 text-[10px] font-semibold text-zinc-600 uppercase tracking-tighter">
          {time}
        </span>
      </div>
    </div>
  );
}
