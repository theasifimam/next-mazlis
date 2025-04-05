// app/notifications/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  BellOff,
  Check,
  X,
  UserPlus,
  Heart,
  MessageSquare,
  Users,
  Share2,
  MoreHorizontal,
  Settings,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { avatars, pics } from "@/lib/data/images";

type Notification = {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "reaction" | "share";
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content?: string;
  target?: string;
  time: string;
  read: boolean;
  meta?: {
    postImage?: string;
    commentText?: string;
  };
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [muteAll, setMuteAll] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "like",
        user: {
          name: "Sarah Johnson",
          avatar: avatars[3],
          username: "sarahj",
        },
        content: "liked your post",
        target: "Morning coffee routine",
        time: "2m ago",
        read: false,
        meta: {
          postImage: pics[0],
        },
      },
      {
        id: "2",
        type: "comment",
        user: {
          name: "Mike Chen",
          avatar: avatars[0],
          username: "mikec",
        },
        content: "commented on your post",
        target: "Weekend hiking trip",
        time: "15m ago",
        read: false,
        meta: {
          commentText: "This looks amazing! Where was this taken?",
          postImage: pics[0],
        },
      },
      {
        id: "3",
        type: "follow",
        user: {
          name: "Alex Taylor",
          avatar: avatars[1],
          username: "alext",
        },
        content: "started following you",
        time: "1h ago",
        read: true,
      },
      {
        id: "4",
        type: "mention",
        user: {
          name: "Emma Wilson",
          avatar: "/avatars/emma.jpg",
          username: "emmaw",
        },
        content: "mentioned you in a comment",
        target: "Team project update",
        time: "3h ago",
        read: true,
        meta: {
          commentText: "Hey @you, what do you think about this design?",
        },
      },
      {
        id: "5",
        type: "reaction",
        user: {
          name: "Design Team",
          avatar: avatars[2],
          username: "designteam",
        },
        content: "reacted to your comment",
        target: "New branding concepts",
        time: "1d ago",
        read: true,
        meta: {
          postImage: pics[0],
        },
      },
      {
        id: "6",
        type: "share",
        user: {
          name: "James Rodriguez",
          avatar: avatars[3],
          username: "jamesr",
        },
        content: "shared your post",
        target: "My photography workflow",
        time: "2d ago",
        read: true,
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications
    .filter((notification) => {
      if (activeTab === "all") return true;
      if (activeTab === "unread") return !notification.read;
      return notification.type === activeTab;
    })
    .filter((notification) => {
      if (!searchQuery) return true;
      return (
        notification.user.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (notification.content &&
          notification.content
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (notification.target &&
          notification.target.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5 text-rose-500" />;
      case "comment":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-5 w-5 text-emerald-500" />;
      case "mention":
        return <Users className="h-5 w-5 text-amber-500" />;
      case "reaction":
        return <Share2 className="h-5 w-5 text-purple-500" />;
      case "share":
        return <Share2 className="h-5 w-5 text-indigo-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
          </h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} new notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              className="pl-10 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                className="flex items-center justify-between"
                onSelect={(e) => e.preventDefault()}
              >
                <span>Mute all</span>
                <Switch checked={muteAll} onCheckedChange={setMuteAll} />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={markAllAsRead}>
                Mark all as read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="like">Likes</TabsTrigger>
          <TabsTrigger value="comment">Comments</TabsTrigger>
          <TabsTrigger value="follow" className="hidden sm:block">
            Follows
          </TabsTrigger>
          <TabsTrigger value="mention" className="hidden sm:block">
            Mentions
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 flex  justify-between w-full gap-3 hover:bg-muted/50 transition-colors ${
                !notification.read ? "border-l-4 border-green-500" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0 pt-1">
                    <Avatar className="h-10 w-10 relative">
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback>
                        {notification.user.name.charAt(0)}
                      </AvatarFallback>
                      <div className="absolute w-[10px] -bottom-1 -right-1 bg-background p-0.5 rounded-full">
                        <div className="bg-primary/10 p-1 rounded-full">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                    </Avatar>
                  </div>
                  <div className="w-100 ml-[10px]">
                    <p className="font-medium">{notification.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      @{notification.user.username}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={() => markAsRead(notification.id)}
                          disabled={notification.read}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Mark as read
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-500"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <p className="mt-1">
                  <span>{notification.content}</span>
                  {notification.target && (
                    <span className="font-medium">
                      {" "}
                      "{notification.target}"
                    </span>
                  )}
                </p>

                {notification.meta?.commentText && (
                  <Card className="mt-2 p-3 bg-muted/50 text-sm">
                    {notification.meta.commentText}
                  </Card>
                )}

                {notification.meta?.postImage && (
                  <div className="mt-2 w-20 h-20 rounded-md overflow-hidden">
                    <img
                      src={notification.meta.postImage}
                      alt="Post preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <BellOff className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium">No notifications</h3>
            <p className="text-muted-foreground text-sm">
              {activeTab === "unread"
                ? "You're all caught up with unread notifications"
                : "You don't have any notifications in this category"}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
