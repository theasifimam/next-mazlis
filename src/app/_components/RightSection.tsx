// app/components/RightSection.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Search, Sparkles, TrendingUp, Users, Verified } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { avatars } from "@/lib/data/images";

export function RightSection() {
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);

  const suggestedUsers = [
    {
      id: "1",
      name: "Tech News",
      handle: "@technews",
      followers: "1.2M",
      isVerified: true,
    },
    {
      id: "2",
      name: "Design Daily",
      handle: "@designdaily",
      followers: "856K",
      isVerified: false,
    },
    {
      id: "3",
      name: "Web Dev",
      handle: "@webdev",
      followers: "723K",
      isVerified: true,
    },
  ];

  const trendingTopics = [
    { id: "1", tag: "#MinimalDesign", posts: "24.5K", category: "Design" },
    { id: "2", tag: "#NextJS", posts: "18.2K", category: "Development" },
    { id: "3", tag: "#UIUX", posts: "15.7K", category: "Design" },
  ];

  const handleFollow = (userId: string) => {
    setFollowedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <aside className="w-80 p-4 hidden lg:block space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search Mazlis"
          className="pl-10 rounded-full bg-muted/50 border-none"
        />
      </div>

      {/* Who to follow */}
      <Card className="p-4 ">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Who to follow</h3>
        </div>
        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={avatars[Number(user.id)]} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-medium hover:underline cursor-pointer">
                        {user.name}
                      </p>
                      {user.isVerified && (
                        <Verified className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {user.handle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.followers} followers
                    </p>
                  </div>
                </div>
                <Button
                  variant={
                    followedUsers.includes(user.id) ? "outline" : "default"
                  }
                  size="sm"
                  onClick={() => handleFollow(user.id)}
                  className="rounded-full"
                >
                  {followedUsers.includes(user.id) ? "Following" : "Follow"}
                </Button>
              </div>
              <div className="mt-3 h-px bg-muted/50 group-last:hidden" />
            </div>
          ))}
        </div>
      </Card>

      {/* Trending now */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Trending now</h3>
        </div>
        <div className="space-y-4">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium hover:text-primary cursor-pointer">
                    {topic.tag}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {topic.posts} posts
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {topic.category}
                </Badge>
              </div>
              <div className="mt-3 h-px bg-muted/50 group-last:hidden" />
            </div>
          ))}
        </div>
      </Card>

      {/* Promo Card */}
      <Card className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Premium Features</h3>
            <p className="text-sm text-muted-foreground">
              Unlock advanced analytics and more
            </p>
          </div>
        </div>
      </Card>
    </aside>
  );
}
