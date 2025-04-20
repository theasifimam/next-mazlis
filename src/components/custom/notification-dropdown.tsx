// components/NotificationDropdown.tsx
"use client";

import {
  Bell,
  Heart,
  MessageSquare,
  UserPlus,
  Users,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { pics } from "@/lib/data/images";

const notifications = [
  {
    id: 1,
    type: "like",
    user: {
      name: "jessica_24",
      avatar: pics[0],
    },
    postPreview: pics[1],
    time: "2m ago",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "mike_photography",
      avatar: pics[2],
    },
    text: "Nice shot! 📸",
    postPreview: pics[3],
    time: "15m ago",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: {
      name: "alex_traveler",
      avatar: pics[4],
    },
    time: "1h ago",
    read: true,
  },
  {
    id: 4,
    type: "mention",
    user: {
      name: "sarah_designs",
      avatar: pics[5],
    },
    postPreview: pics[6],
    time: "3h ago",
    read: true,
  },
];

const NotificationIcon = ({ type }: { type: string }) => {
  const baseClass = "h-4 w-4 p-0.5 rounded-full";
  switch (type) {
    case "like":
      return <Heart className={`${baseClass} text-white bg-rose-500`} />;
    case "comment":
      return (
        <MessageSquare className={`${baseClass} text-white bg-blue-500`} />
      );
    case "follow":
      return <UserPlus className={`${baseClass} text-white bg-emerald-500`} />;
    default:
      return <Users className={`${baseClass} text-white bg-purple-500`} />;
  }
};

export function NotificationDropdown() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 p-0 rounded-3xl border shadow-sm mt-2"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="px-4 py-3 border-b flex justify-between items-center bg-muted/50">
          <span className="font-semibold">Notifications</span>
          <Button variant="link" size="sm" className="text-primary h-6 px-0">
            Mark all as read
          </Button>
        </DropdownMenuLabel>

        <div className="divide-y">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={cn(
                "p-3 focus:bg-muted/30",
                !notification.read && "bg-muted/10"
              )}
              asChild
            >
              <Link href="#" className="flex gap-3 items-start w-full">
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={notification.user.avatar} />
                    <AvatarFallback>
                      {notification.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                    <NotificationIcon type={notification.type} />
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm line-clamp-2">
                    <span className="font-medium">
                      {notification.user.name}
                    </span>{" "}
                    <span className="text-muted-foreground">
                      liked your picture
                    </span>
                    {notification.type === "comment" && (
                      <span className="text-muted-foreground">
                        {" "}
                        commented : {notification.text}
                      </span>
                    )}
                    {notification.type === "follow" && (
                      <span className="text-muted-foreground">
                        {" "}
                        started following you
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>

                {notification.postPreview && (
                  <div className="ml-2 flex-shrink-0">
                    <div className="h-10 w-10 rounded border overflow-hidden">
                      <img
                        src={notification.postPreview}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>

        <div className="p-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground justify-center text-sm"
            asChild
          >
            <Link href="/notifications">
              View all notifications
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
