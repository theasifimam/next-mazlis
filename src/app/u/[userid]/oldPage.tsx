// app/profile/[username]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Settings,
  MoreVertical,
  Bookmark,
  Grid3X3,
  Clapperboard,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { pics } from "@/lib/data/images";

export default function ProfilePage() {
  const isCurrentUser = true; // Would come from auth state
  const user = {
    username: "johndoe",
    name: "John Doe",
    bio: "Digital creator | Photography enthusiast | Travel lover",
    avatar: "/avatars/john.jpg",
    followers: 1243,
    following: 562,
    posts: 28,
  };

  const posts = pics.slice(0, 9); // Sample posts

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <div className="flex gap-2">
              {isCurrentUser ? (
                <>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="default" size="sm">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Following
                  </Button>
                  <Button variant="outline" size="sm">
                    Message
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-6">
            <div className="text-center">
              <span className="font-semibold">{user.posts}</span>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <span className="font-semibold">{user.followers}</span>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <span className="font-semibold">{user.following}</span>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts" className="gap-2">
            <Grid3X3 className="h-4 w-4" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="reels" className="gap-2">
            <Clapperboard className="h-4 w-4" />
            Reels
          </TabsTrigger>
          <TabsTrigger value="saved" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-1 mt-4">
            {posts.map((post, index) => (
              <Card
                key={index}
                className="aspect-square object-cover overflow-hidden"
              >
                <img
                  src={post}
                  alt={`Post ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
              </Card>
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
