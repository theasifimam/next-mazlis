// app/profile/[username]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Bookmark,
  MessageSquare,
  Settings,
  Link as LinkIcon,
  Grid3X3,
  Clapperboard,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { avatars, pics } from "@/lib/data/images";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const isCurrentUser = true;
  const user = {
    username: "asifimam",
    name: "Saifi Imam",
    bio: "Digital artisan crafting meaningful experiences | Minimalism advocate | Coffee alchemist",
    avatar: avatars[1],
    stats: {
      works: 42,
      collaborators: 128,
    },
    links: [
      { title: "Portfolio", url: "https://morgan.design" },
      { title: "Principles", url: "https://morgan.design/philosophy" },
    ],
  };

  const posts = pics.slice(0, 9); // Sample posts

  return (
    <div className="flex-1 border-x p-4">
      {/* Profile Header - Side by Side */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Column - Avatar */}
        <div className="flex-shrink-0">
          <div className="relative group">
            <Avatar className="h-64 w-64 md:h-40 md:w-40 border-2 border-foreground/10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-background text-foreground font-medium">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-primary/30 transition-all pointer-events-none" />
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="flex-1 space-y-1">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-light">{user.name}</h1>
            <p className="text-muted-foreground text-lg">@{user.username}</p>
          </div>

          <p className="text-muted-foreground max-w-prose">{user.bio}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            {user.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkIcon className="h-3.5 w-3.5" />
                {link.title}
              </a>
            ))}
          </div>

          <div className="flex gap-4 pt-2">
            <div className="text-center">
              <p className="text-xl font-light">{user.stats.works}</p>
              <p className="text-sm text-muted-foreground">Works</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-light">{user.stats.collaborators}</p>
              <p className="text-sm text-muted-foreground">Collaborators</p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="gap-2 px-6">
              <MessageSquare className="h-4 w-4" />
              {isCurrentUser ? "Share" : "Message"}
            </Button>
            {isCurrentUser ? (
              <Button variant="outline" className="gap-2 px-6">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            ) : (
              <Button
                variant={isFollowing ? "outline" : "default"}
                className="gap-2 px-6"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts" className="gap-2 rounded-3xl">
            <Grid3X3 className="h-4 w-4" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="reels" className="gap-2 rounded-3xl">
            <Clapperboard className="h-4 w-4" />
            Reels
          </TabsTrigger>
          <TabsTrigger value="saved" className="gap-2 rounded-3xl">
            <Bookmark className="h-4 w-4" />
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-1 mt-4">
            {posts.map((post, index) => (
              <Link key={index} href={`/u/${user.username}/post/${index}`}>
                <Card className="aspect-square overflow-hidden relative">
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={post}
                      alt={`Post ${index + 1}`}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                      loading="lazy"
                    />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reels">
          <div className="text-center py-12 text-muted-foreground">
            <Clapperboard className="mx-auto h-8 w-8 mb-2" />
            <p>No reels yet</p>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="text-center py-12 text-muted-foreground">
            <Bookmark className="mx-auto h-8 w-8 mb-2" />
            <p>No saved posts</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
