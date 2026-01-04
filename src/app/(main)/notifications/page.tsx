"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  UserPlus,
  MessageCircle,
  Zap,
  MoreHorizontal,
  Bell,
  Settings,
  CheckCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// 1. Precise Type Definitions
type NotificationType = "like" | "follow" | "mention" | "zap";

interface User {
  name: string;
  handle: string;
  avatar: string;
}

interface NotificationData {
  id: number;
  type: NotificationType;
  user: User;
  content: string;
  time: string;
  isUnread: boolean;
}

// 2. Mock Data with Explicit Typing
const NOTIFICATIONS: NotificationData[] = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Sarah Chen",
      handle: "@schen_ui",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    content: "liked your post: 'The Future of Spatial UI Design'",
    time: "2m ago",
    isUnread: true,
  },
  {
    id: 2,
    type: "follow",
    user: {
      name: "Marcus Wright",
      handle: "@mwright",
      avatar: "https://i.pravatar.cc/150?u=marcus",
    },
    content: "started following you",
    time: "15m ago",
    isUnread: true,
  },
  {
    id: 3,
    type: "mention",
    user: {
      name: "John Doe",
      handle: "@johndoe",
      avatar: "https://i.pravatar.cc/150?u=johndoe",
    },
    content:
      "Mentioned you in a comment: 'The Future of Spatial UI Design' by @schen_ui",
    time: "1h ago",
    isUnread: false,
  },
  {
    id: 4,
    type: "zap",
    user: {
      name: "Jane Doe",
      handle: "@janedoe",
      avatar: "https://i.pravatar.cc/150?u=janedoe",
    },
    content: "Zapped you: 'The Future of Spatial UI Design' by @schen_ui",
    time: "2h ago",
    isUnread: false,
  },
  {
    id: 5,
    type: "like",
    user: {
      name: "Sarah Chen",
      handle: "@schen_ui",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    content: "liked your post: 'The Future of Spatial UI Design'",
    time: "2m ago",
    isUnread: true,
  },
];

export default function NotificationPage(): React.ReactElement {
  return (
    <div className="flex flex-col h-full w-full bg-background transition-colors duration-300">
      <header className="flex-none sticky top-0 z-50 p-4 bg-background/60 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Bell className="text-primary" size={20} />
            </div>
            <h1 className="text-2xl font-black tracking-tight italic text-primary">
              Notifications
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 hover:bg-secondary rounded-xl transition-colors text-muted-foreground group">
              <CheckCheck size={20} className="group-hover:text-primary" />
            </button>
            <button className="p-2.5 hover:bg-secondary rounded-xl transition-colors text-muted-foreground">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-8">
            {["All", "Mentions", "Verified"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="bg-transparent p-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground font-black text-xs uppercase tracking-widest transition-all"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </header>

      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          <AnimatePresence initial={false}>
            {NOTIFICATIONS.map((notif) => (
              <NotificationItem key={notif.id} notif={notif} />
            ))}
          </AnimatePresence>
        </div>
        <div className="h-24 w-full" />
      </ScrollArea>
    </div>
  );
}

// 3. Sub-component Props Interface
interface NotificationItemProps {
  notif: NotificationData;
}

function NotificationItem({
  notif,
}: NotificationItemProps): React.ReactElement {
  // Use React.ReactNode for the icon lookup to avoid strict Lucide component type issues
  const icons: Record<NotificationType, React.ReactNode> = {
    like: <Heart size={16} className="fill-rose-500 text-rose-500" />,
    follow: <UserPlus size={16} className="text-blue-500" />,
    mention: <MessageCircle size={16} className="text-emerald-500" />,
    zap: <Zap size={16} className="fill-amber-500 text-amber-500" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "group relative flex gap-4 p-5 border-b border-border/50 hover:bg-secondary/30 transition-all cursor-pointer",
        notif.isUnread && "bg-primary/5 border-l-4 border-l-primary"
      )}
    >
      <div className="flex-none pt-1">
        <div className="relative">
          <Avatar className="h-12 w-12 rounded-2xl border border-border shadow-sm">
            <AvatarImage src={notif.user.avatar} alt={notif.user.name} />
            <AvatarFallback className="bg-secondary font-bold text-xs text-foreground">
              {notif.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 p-1 bg-background border border-border rounded-lg shadow-sm">
            {icons[notif.type]}
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className="font-black text-sm text-foreground truncate">
              {notif.user.name}
            </span>
            <span className="text-muted-foreground text-xs truncate">
              {notif.user.handle}
            </span>
          </div>
          <span className="flex-none text-[10px] font-black text-muted-foreground uppercase tracking-tight">
            {notif.time}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
          {notif.content}
        </p>
      </div>

      <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-background rounded-xl transition-all h-fit self-center">
        <MoreHorizontal size={16} className="text-muted-foreground" />
      </button>
    </motion.div>
  );
}
