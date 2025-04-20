// app/explore/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Sliders } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { avatars, pics } from "@/lib/data/images";
import { vids } from "@/lib/data/videos";
import Image from "next/image";
import { Post } from "./_types";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Sample data - would come from API in real app

  const explorePosts: Post[] = [
    {
      id: 1,
      user: {
        name: "TravelEnthusiast",
        avatar: "/user-1.jpg",
        handle: "@traveler",
      },
      media: { type: "image", url: pics[2] },
      likes: 1243,
      caption: "Sunset views in Santorini 🌅 #TravelGoals",
      tags: ["#Wanderlust", "#Santorini"],
      comments: 42,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "TechGuru", avatar: avatars[1], handle: "@techlover" },
      media: { type: "video", url: vids[1] },
      likes: 892,
      caption: "Hands-on with the new AR glasses 👓 #Tech2025",
      tags: ["#AugmentedReality"],
      comments: 15,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      user: { name: "FoodArtist", avatar: avatars[2], handle: "@foodie" },
      media: { type: "image", url: pics[4] },
      likes: 2150,
      caption: "Homemade pasta from scratch! #Foodie",
      tags: ["#Cooking", "#Pasta"],
      comments: 87,
      timestamp: "1 day ago",
    },

    {
      id: 1,
      user: {
        name: "TravelEnthusiast",
        avatar: "/user-1.jpg",
        handle: "@traveler",
      },
      media: { type: "image", url: pics[3] },
      likes: 1243,
      caption: "Sunset views in Santorini 🌅 #TravelGoals",
      tags: ["#Wanderlust", "#Santorini"],
      comments: 42,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "TechGuru", avatar: avatars[3], handle: "@techlover" },
      media: { type: "video", url: vids[0] },
      likes: 892,
      caption: "Hands-on with the new AR glasses 👓 #Tech2025",
      tags: ["#AugmentedReality"],
      comments: 15,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      user: { name: "FoodArtist", avatar: avatars[0], handle: "@foodie" },
      media: { type: "image", url: pics[3] },
      likes: 2150,
      caption: "Homemade pasta from scratch! #Foodie",
      tags: ["#Cooking", "#Pasta"],
      comments: 87,
      timestamp: "1 day ago",
    },

    {
      id: 1,
      user: {
        name: "TravelEnthusiast",
        avatar: avatars[1],
        handle: "@traveler",
      },
      media: { type: "image", url: pics[0] },
      likes: 1243,
      caption: "Sunset views in Santorini 🌅 #TravelGoals",
      tags: ["#Wanderlust", "#Santorini"],
      comments: 42,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "TechGuru", avatar: avatars[0], handle: "@techlover" },
      media: { type: "video", url: vids[2] },
      likes: 892,
      caption: "Hands-on with the new AR glasses 👓 #Tech2025",
      tags: ["#AugmentedReality"],
      comments: 15,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      user: { name: "FoodArtist", avatar: "/user-3.jpg", handle: "@foodie" },
      media: { type: "image", url: pics[1] },
      likes: 2150,
      caption: "Homemade pasta from scratch! #Foodie",
      tags: ["#Cooking", "#Pasta"],
      comments: 87,
      timestamp: "1 day ago",
    },

    {
      id: 1,
      user: {
        name: "TravelEnthusiast",
        avatar: "/user-1.jpg",
        handle: "@traveler",
      },
      media: { type: "image", url: pics[0] },
      likes: 1243,
      caption: "Sunset views in Santorini 🌅 #TravelGoals",
      tags: ["#Wanderlust", "#Santorini"],
      comments: 42,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "TechGuru", avatar: avatars[0], handle: "@techlover" },
      media: { type: "video", url: vids[0] },
      likes: 892,
      caption: "Hands-on with the new AR glasses 👓 #Tech2025",
      tags: ["#AugmentedReality"],
      comments: 15,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      user: { name: "FoodArtist", avatar: "/user-3.jpg", handle: "@foodie" },
      media: { type: "image", url: pics[1] },
      likes: 2150,
      caption: "Homemade pasta from scratch! #Foodie",
      tags: ["#Cooking", "#Pasta"],
      comments: 87,
      timestamp: "1 day ago",
    },
    {
      id: 1,
      user: {
        name: "TravelEnthusiast",
        avatar: "/user-1.jpg",
        handle: "@traveler",
      },
      media: { type: "image", url: pics[1] },
      likes: 1243,
      caption: "Sunset views in Santorini 🌅 #TravelGoals",
      tags: ["#Wanderlust", "#Santorini"],
      comments: 42,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "TechGuru", avatar: avatars[0], handle: "@techlover" },
      media: { type: "video", url: vids[1] },
      likes: 892,
      caption: "Hands-on with the new AR glasses 👓 #Tech2025",
      tags: ["#AugmentedReality"],
      comments: 15,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      user: { name: "FoodArtist", avatar: "/user-3.jpg", handle: "@foodie" },
      media: { type: "image", url: pics[4] },
      likes: 2150,
      caption: "Homemade pasta from scratch! #Foodie",
      tags: ["#Cooking", "#Pasta"],
      comments: 87,
      timestamp: "1 day ago",
    },

    {
      id: 1,
      user: {
        name: "TravelEnthusiast",
        avatar: "/user-1.jpg",
        handle: "@traveler",
      },
      media: { type: "image", url: pics[3] },
      likes: 1243,
      caption: "Sunset views in Santorini 🌅 #TravelGoals",
      tags: ["#Wanderlust", "#Santorini"],
      comments: 42,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "TechGuru", avatar: avatars[0], handle: "@techlover" },
      media: { type: "video", url: vids[0] },
      likes: 892,
      caption: "Hands-on with the new AR glasses 👓 #Tech2025",
      tags: ["#AugmentedReality"],
      comments: 15,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      user: { name: "FoodArtist", avatar: "/user-3.jpg", handle: "@foodie" },
      media: { type: "image", url: pics[3] },
      likes: 2150,
      caption: "Homemade pasta from scratch! #Foodie",
      tags: ["#Cooking", "#Pasta"],
      comments: 87,
      timestamp: "1 day ago",
    },

    {
      id: 1,
      user: {
        name: "TravelEnthusiast",
        avatar: "/user-1.jpg",
        handle: "@traveler",
      },
      media: { type: "image", url: pics[0] },
      likes: 1243,
      caption: "Sunset views in Santorini 🌅 #TravelGoals",
      tags: ["#Wanderlust", "#Santorini"],
      comments: 42,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "TechGuru", avatar: avatars[0], handle: "@techlover" },
      media: { type: "video", url: vids[2] },
      likes: 892,
      caption: "Hands-on with the new AR glasses 👓 #Tech2025",
      tags: ["#AugmentedReality"],
      comments: 15,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      user: { name: "FoodArtist", avatar: "/user-3.jpg", handle: "@foodie" },
      media: { type: "image", url: pics[1] },
      likes: 2150,
      caption: "Homemade pasta from scratch! #Foodie",
      tags: ["#Cooking", "#Pasta"],
      comments: 87,
      timestamp: "1 day ago",
    },

    {
      id: 1,
      user: {
        name: "TravelEnthusiast",
        avatar: "/user-1.jpg",
        handle: "@traveler",
      },
      media: { type: "image", url: pics[0] },
      likes: 1243,
      caption: "Sunset views in Santorini 🌅 #TravelGoals",
      tags: ["#Wanderlust", "#Santorini"],
      comments: 42,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "TechGuru", avatar: avatars[0], handle: "@techlover" },
      media: { type: "video", url: vids[0] },
      likes: 892,
      caption: "Hands-on with the new AR glasses 👓 #Tech2025",
      tags: ["#AugmentedReality"],
      comments: 15,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      user: { name: "FoodArtist", avatar: "/user-3.jpg", handle: "@foodie" },
      media: { type: "image", url: pics[1] },
      likes: 2150,
      caption: "Homemade pasta from scratch! #Foodie",
      tags: ["#Cooking", "#Pasta"],
      comments: 87,
      timestamp: "1 day ago",
    },
    // Add more posts...
  ];

  return (
    <div className="flex-1 border-x  p-4">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search photos and videos..."
            className="w-full pl-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Sliders className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Masonry Grid Layout */}
      <div className="columns-2 sm:columns-3 gap-2 p-2">
        {explorePosts.map((post) => (
          <div
            key={post.id}
            className="mb-2 break-inside-avoid relative group"
            onClick={() => setSelectedPost(post)}
          >
            {post.media.type === "image" ? (
              <Image
                src={post.media.url}
                alt="Explore content"
                className="w-full rounded-lg object-cover cursor-pointer transition-transform hover:scale-95"
              />
            ) : (
              <video
                src={post.media.url}
                className="w-full rounded-lg object-cover cursor-pointer"
                muted
                autoPlay
                loop
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-3">
              <div className="text-white">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Modal */}
      <Dialog
        open={!!selectedPost}
        onOpenChange={(open) => !open && setSelectedPost(null)}
      >
        <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none">
          {selectedPost && (
            <div className="bg-background rounded-lg overflow-hidden flex flex-col md:flex-row">
              {/* Media Section */}
              <div className="md:w-2/3 bg-black flex items-center justify-center">
                {selectedPost.media.type === "image" ? (
                  <Image
                    src={selectedPost.media.url}
                    alt="Post content"
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                ) : (
                  <video
                    src={selectedPost.media.url}
                    controls
                    className="w-full h-auto max-h-[80vh]"
                    autoPlay
                  />
                )}
              </div>

              {/* Info Section */}
              <div className="md:w-1/3 p-4 flex flex-col">
                {/* User Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedPost.user.avatar} />
                      <AvatarFallback>
                        {selectedPost.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedPost.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedPost.user.handle}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Caption & Tags */}
                <div className="flex-1 overflow-y-auto">
                  <p className="mb-4">{selectedPost.caption}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {selectedPost.tags.map((tag: string) => (
                      <span key={tag} className="text-primary text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engagement Bar */}
                <div className="flex justify-between border-t pt-3">
                  <div className="flex gap-4">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>

                {/* Likes & Timestamp */}
                <div className="mt-2">
                  <p className="font-medium text-sm">
                    {selectedPost.likes.toLocaleString()} likes
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {selectedPost.timestamp}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
