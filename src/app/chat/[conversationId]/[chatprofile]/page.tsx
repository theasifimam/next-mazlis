// app/chat/[userId]/page.tsx
"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MoreVertical,
  Phone,
  Video,
  MapPin,
  Calendar,
  Link as LinkIcon,
  MessageSquare,
  UserPlus,
  Shield,
  Users,
  Download,
  FolderArchive,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pics } from "@/lib/data/images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChatProfilePage() {
  const user = {
    id: "user_123",
    name: "Alex Johnson",
    username: "alexcreative",
    avatar: pics[0],
    bio: "Digital designer & photography enthusiast. Love hiking and coffee chats!",
    status: "online",
    lastSeen: "Active 5m ago",
    connections: 428,
    mutualConnections: 12,
    location: "San Francisco, CA",
    website: "alexjohnson.design",
    joinedDate: "March 2021",
    isFollowing: true,
    isBlocked: false,
  };

  const media = [
    { id: 1, url: pics[1], type: "image", aspect: "portrait" },
    { id: 2, url: pics[2], type: "image", aspect: "landscape" },
    { id: 3, url: pics[3], type: "video", aspect: "square" },
    { id: 4, url: pics[4], type: "image", aspect: "portrait" },
  ];

  const sharedFiles = [
    { id: 1, name: "Project_Brief.pdf", type: "pdf", size: "2.4 MB" },
    { id: 2, name: "Design_Inspiration.zip", type: "zip", size: "15.2 MB" },
  ];

  return (
    <div className="flex-1 p-4 flex-col">
      {/* Profile Header - Side by Side */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Column - Avatar */}
        <div className="flex-shrink-0 w-full md:w-auto">
          <div className="relative">
            <Avatar className="h-28 w-28 md:h-36 md:w-36 border-2 border-primary/20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl font-medium bg-primary/10">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {user.status === "online" && (
              <Badge
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs"
                variant="default"
              >
                Online
              </Badge>
            )}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="flex-1 w-full space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>

          <p className="text-foreground/80 text-sm md:text-base">{user.bio}</p>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-sm bg-muted/50 px-3 py-1.5 rounded-full">
              <Users className="h-4 w-4" />
              <span>{user.connections.toLocaleString()} connections</span>
            </div>
            {user.mutualConnections > 0 && (
              <div className="flex items-center gap-1.5 text-sm bg-muted/50 px-3 py-1.5 rounded-full">
                <span className="text-muted-foreground">
                  {user.mutualConnections} mutual
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button variant="default" size="sm" className="gap-2 rounded-full">
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
            <Button
              variant={user.isFollowing ? "outline" : "default"}
              size="sm"
              className="gap-2 rounded-full"
            >
              {user.isFollowing ? (
                "Following"
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Follow
                </>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-lg p-1">
                <DropdownMenuItem className="rounded-md gap-2 px-3 py-2">
                  <Phone className="h-4 w-4" />
                  Call
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md gap-2 px-3 py-2">
                  <Video className="h-4 w-4" />
                  Video
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md gap-2 px-3 py-2 text-red-500">
                  <Shield className="h-4 w-4" />
                  Block
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <Card className="p-4 rounded-lg mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-medium text-sm">{user.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <LinkIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Website</p>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener"
                className="font-medium text-sm hover:underline"
              >
                {user.website}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Joined</p>
              <p className="font-medium text-sm">{user.joinedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Seen</p>
              <p className="font-medium text-sm">{user.lastSeen}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="media" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger className="rounded-full" value="media">
            Media
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="files">
            Files
          </TabsTrigger>
        </TabsList>

        <TabsContent value="media" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {media.map((item) => (
              <Card
                key={item.id}
                className={`overflow-hidden ${
                  item.aspect === "portrait"
                    ? "aspect-[4/5]"
                    : item.aspect === "landscape"
                    ? "aspect-[5/3]"
                    : "aspect-square"
                }`}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    loop
                  />
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="files" className="mt-4">
          <div className="space-y-2">
            {sharedFiles.map((file) => (
              <Card
                key={file.id}
                className="p-3 flex items-center gap-3 hover:bg-muted/50"
              >
                <div className="bg-muted p-2 rounded-lg">
                  {file.type === "pdf" ? (
                    <FileText className="h-5 w-5 text-primary" />
                  ) : (
                    <FolderArchive className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full gap-1 h-8"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="sr-only md:not-sr-only">Download</span>
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
