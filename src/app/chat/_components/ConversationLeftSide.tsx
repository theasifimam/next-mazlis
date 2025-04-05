import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import Link from "next/link";
import { avatars } from "@/lib/data/images";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

export default function ConversationLeftSection() {
  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Hey, how's the project going?",
      time: "2h ago",
      unread: 3,
      avatar: avatars[0],
    },
    {
      id: 2,
      name: "Mike Chen",
      lastMessage: "Let's meet tomorrow at the cafe",
      time: "5h ago",
      unread: 0,
      avatar: avatars[1],
    },
    {
      id: 3,
      name: "Design Team",
      lastMessage: "Alex: I've updated the Figma file",
      time: "1d ago",
      unread: 0,
      avatar: avatars[2],
    },
    {
      id: 4,
      name: "Emma Wilson",
      lastMessage: "Thanks for your help!",
      time: "2d ago",
      unread: 0,
      avatar: "/avatars/emma.jpg",
    },
    {
      id: 5,
      name: "Sarah Johnson",
      lastMessage: "Hey, how's the project going?",
      time: "2h ago",
      unread: 3,
      avatar: avatars[0],
    },
    {
      id: 6,
      name: "Mike Chen",
      lastMessage: "Let's meet tomorrow at the cafe",
      time: "5h ago",
      unread: 0,
      avatar: avatars[1],
    },
    {
      id: 7,
      name: "Design Team",
      lastMessage: "Alex: I've updated the Figma file",
      time: "1d ago",
      unread: 0,
      avatar: avatars[2],
    },
    {
      id: 8,
      name: "Emma Wilson",
      lastMessage: "Thanks for your help!",
      time: "2d ago",
      unread: 0,
      avatar: "/avatars/emma.jpg",
    },
    {
      id: 9,
      name: "Sarah Johnson",
      lastMessage: "Hey, how's the project going?",
      time: "2h ago",
      unread: 3,
      avatar: avatars[0],
    },
    {
      id: 10,
      name: "Mike Chen",
      lastMessage: "Let's meet tomorrow at the cafe",
      time: "5h ago",
      unread: 0,
      avatar: avatars[1],
    },
    {
      id: 11,
      name: "Design Team",
      lastMessage: "Alex: I've updated the Figma file",
      time: "1d ago",
      unread: 0,
      avatar: avatars[2],
    },
    {
      id: 12,
      name: "Emma Wilson",
      lastMessage: "Thanks for your help!",
      time: "2d ago",
      unread: 0,
      avatar: "/avatars/emma.jpg",
    },
    {
      id: 13,
      name: "Sarah Johnson",
      lastMessage: "Hey, how's the project going?",
      time: "2h ago",
      unread: 3,
      avatar: avatars[0],
    },
    {
      id: 14,
      name: "Mike Chen",
      lastMessage: "Let's meet tomorrow at the cafe",
      time: "5h ago",
      unread: 0,
      avatar: avatars[1],
    },
    {
      id: 15,
      name: "Design Team",
      lastMessage: "Alex: I've updated the Figma file",
      time: "1d ago",
      unread: 0,
      avatar: avatars[2],
    },
    {
      id: 16,
      name: "Emma Wilson",
      lastMessage: "Thanks for your help!",
      time: "2d ago",
      unread: 0,
      avatar: "/avatars/emma.jpg",
    },
    {
      id: 17,
      name: "Sarah Johnson",
      lastMessage: "Hey, how's the project going?",
      time: "2h ago",
      unread: 3,
      avatar: avatars[0],
    },
    {
      id: 18,
      name: "Mike Chen",
      lastMessage: "Let's meet tomorrow at the cafe",
      time: "5h ago",
      unread: 0,
      avatar: avatars[1],
    },
    {
      id: 19,
      name: "Design Team",
      lastMessage: "Alex: I've updated the Figma file",
      time: "1d ago",
      unread: 0,
      avatar: avatars[2],
    },
    {
      id: 20,
      name: "Emma Wilson",
      lastMessage: "Thanks for your help!",
      time: "2d ago",
      unread: 0,
      avatar: "/avatars/emma.jpg",
    },
  ];

  return (
    <div className="w-80 border-r bg-background h-full overflow-y-auto">
      <div className="p-2 sticky top-0 bg-background z-10 border-b">
        <h2 className="text-xl font-semibold mb-1">Messages</h2>
        <div className="relative mb-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder="Search messages"
            className="pl-10 bg-muted/50 rounded-full"
            aria-label="Search conversations"
          />
        </div>
      </div>

      <nav className="p-2" aria-label="Conversation list">
        {conversations.map((convo) => (
          <Link
            key={convo.id}
            href={`/chat/${convo.id}`}
            className={`flex items-center p-3 rounded-3xl transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              convo.id === 1 ? "bg-muted/50 " : ""
            }`}
            aria-current={convo.id === 1 ? "page" : undefined}
          >
            <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
              <AvatarImage src={convo.avatar} alt={`${convo.name}'s avatar`} />
              <AvatarFallback>
                {convo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex justify-between items-center gap-2">
                <h3 className="font-medium truncate">{convo.name}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {convo.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {convo.lastMessage}
              </p>
            </div>
            {convo.unread > 0 && (
              <span
                className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0"
                aria-label={`${convo.unread} unread messages`}
              >
                {convo.unread}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
