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
import { cn } from "@/lib/utils";

export default function ChatIdPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id;

  const chatData = { name: "Sarah Tech", online: true };

  return (
    <div className="relative flex flex-col h-screen w-full bg-background text-foreground overflow-hidden transition-colors duration-300">
      {/* Dynamic Background Mesh Decor - Adjusted for Light/Dark */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-100" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-100" />

      {/* Chat Header */}
      <header className="z-10 flex-none px-6 py-4 border-b border-border flex items-center justify-between backdrop-blur-md bg-background/60">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/messages")}
            className="group p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-all"
          >
            <ChevronLeft
              size={24}
              className="group-active:scale-90 transition-transform"
            />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-11 h-11 border border-border shadow-sm">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${chatId}`} />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] tracking-tight text-foreground">
                {chatData.name}
              </h3>
              <p className="text-[11px] text-muted-foreground font-semibold">
                Active now
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <HeaderAction icon={<Phone size={19} />} />
          <HeaderAction icon={<Video size={19} />} />
          <HeaderAction icon={<Info size={19} />} />
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-6">
        <div className="max-w-3xl mx-auto py-8 space-y-8">
          <div className="flex justify-center">
            <span className="px-4 py-1 rounded-full bg-secondary text-[10px] uppercase tracking-widest text-muted-foreground font-black border border-border">
              Today
            </span>
          </div>

          <MessageBubble
            type="received"
            text="Hey! I just updated the design tokens. The new glassmorphism looks incredible in both modes."
            time="2:15 PM"
          />
          <MessageBubble
            type="sent"
            text="I see it! The primary variables are scaling perfectly. 🚀"
            time="2:16 PM"
          />
          <MessageBubble
            type="received"
            text="Exactly. Nexus looks clean even in light mode."
            time="2:18 PM"
          />
        </div>
      </ScrollArea>

      {/* Input Footer */}
      <footer className="p-6 bg-gradient-to-t from-background via-background/80 to-transparent">
        <div className="max-w-3xl mx-auto relative group">
          {/* Subtle Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[32px] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />

          <div className="relative bg-secondary/50 border border-border rounded-[28px] p-2 flex items-center gap-1 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-none">
            <button className="p-3 text-muted-foreground hover:text-primary hover:bg-background rounded-full transition-colors">
              <PlusCircle size={22} />
            </button>

            <input
              type="text"
              placeholder="Message..."
              className="flex-1 bg-transparent border-none outline-none px-2 py-2 text-[15px] text-foreground placeholder:text-muted-foreground/60"
            />

            <button className="hidden sm:flex p-3 text-muted-foreground hover:text-yellow-500 hover:bg-background rounded-full transition-colors">
              <Smile size={22} />
            </button>

            <button className="ml-1 p-3 bg-primary text-primary-foreground hover:opacity-90 rounded-full transition-all shadow-lg shadow-primary/20 active:scale-95">
              <Send size={18} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Updated Helper Components */

function HeaderAction({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-all active:scale-90">
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
          "flex flex-col max-w-[85%] lg:max-w-[70%]",
          isSent ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "relative px-4 py-3 text-[15px] leading-relaxed transition-all shadow-sm",
            isSent
              ? "bg-primary text-primary-foreground rounded-[24px] rounded-br-none font-medium"
              : "bg-secondary text-foreground rounded-[24px] rounded-bl-none border border-border/50 font-medium"
          )}
        >
          {text}
        </div>
        <span className="mt-1.5 px-1 text-[10px] font-black text-muted-foreground/60 uppercase tracking-tight">
          {time}
        </span>
      </div>
    </div>
  );
}
