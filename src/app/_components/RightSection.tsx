// app/components/RightSection.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  ArrowDownUp,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Verified,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { avatars } from "@/lib/data/images";
import { suggestedUsers, trendingTopics } from "../../lib/data/data.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link.js";

export function RightSection() {
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [showMoreUsers, setShowMoreUsers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const handleFollow = (userId: string) => {
    setFollowedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const filteredUsers = suggestedUsers
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.handle.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "popular") return b.followers - a.followers;
      if (sortBy === "recent") return b.id.localeCompare(a.id);
      return 0;
    });

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
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Who to follow</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={() => setShowMoreUsers(true)}
          >
            See more
          </Button>
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

      <Dialog open={showMoreUsers} onOpenChange={setShowMoreUsers}>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="flex items-center justify-between">
              <span>Discover People</span>
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 rounded-3xl top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search people..."
                className="pl-10 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredUsers.length} results
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center gap-2">
                    <ArrowDownUp className="h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* // Update the filteredUsers.map section in the Dialog component */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="group hover:bg-muted/50 rounded-3xl transition-colors"
                >
                  <div className="flex items-center justify-between p-2">
                    <Link
                      href={`/u/${user.handle}`}
                      className="flex-1 flex items-center gap-3 hover:no-underline"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={avatars[Number(user.id)]} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <p className="font-medium hover:underline">
                            {user.name}
                          </p>
                          {user.isVerified && (
                            <Verified className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          @{user.handle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.followers.toLocaleString()} followers
                          {user.bio && " • " + user.bio}
                        </p>
                      </div>
                    </Link>
                    <Button
                      variant={
                        followedUsers.includes(user.id) ? "outline" : "default"
                      }
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollow(user.id);
                      }}
                      className="rounded-full"
                    >
                      {followedUsers.includes(user.id) ? "Following" : "Follow"}
                    </Button>
                  </div>
                  <div className="mt-1 h-px bg-muted/50 group-last:hidden" />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
