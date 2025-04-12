// app/reels/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { vids } from "@/lib/data/videos";
import { avatars } from "@/lib/data/images";

type Reel = {
  id: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  videoUrl: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

export default function ReelsPage() {
  const [reels, setReels] = useState<Reel[]>([
    {
      id: "1",
      user: {
        name: "TravelAdventures",
        avatar: avatars[0],
        handle: "@traveler",
      },
      videoUrl: vids[0],
      caption: "Sunset views from Bali beaches 🌅 #Travel #Wanderlust",
      likes: 1243,
      comments: 42,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "2",
      user: {
        name: "FoodieDelights",
        avatar: avatars[1],
        handle: "@foodlover",
      },
      videoUrl: vids[1],
      caption: "Making homemade pasta from scratch! #Cooking #Foodie",
      likes: 892,
      comments: 15,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: "1",
      user: {
        name: "TravelAdventures",
        avatar: avatars[0],
        handle: "@traveler",
      },
      videoUrl: vids[2],
      caption: "Sunset views from Bali beaches 🌅 #Travel #Wanderlust",
      likes: 1243,
      comments: 42,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "2",
      user: {
        name: "FoodieDelights",
        avatar: avatars[1],
        handle: "@foodlover",
      },
      videoUrl: vids[3],
      caption: "Making homemade pasta from scratch! #Cooking #Foodie",
      likes: 892,
      comments: 15,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: "1",
      user: {
        name: "TravelAdventures",
        avatar: avatars[0],
        handle: "@traveler",
      },
      videoUrl: vids[0],
      caption: "Sunset views from Bali beaches 🌅 #Travel #Wanderlust",
      likes: 1243,
      comments: 42,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "2",
      user: {
        name: "FoodieDelights",
        avatar: avatars[1],
        handle: "@foodlover",
      },
      videoUrl: vids[1],
      caption: "Making homemade pasta from scratch! #Cooking #Foodie",
      likes: 892,
      comments: 15,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: "1",
      user: {
        name: "TravelAdventures",
        avatar: avatars[0],
        handle: "@traveler",
      },
      videoUrl: vids[2],
      caption: "Sunset views from Bali beaches 🌅 #Travel #Wanderlust",
      likes: 1243,
      comments: 42,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "2",
      user: {
        name: "FoodieDelights",
        avatar: avatars[1],
        handle: "@foodlover",
      },
      videoUrl: vids[3],
      caption: "Making homemade pasta from scratch! #Cooking #Foodie",
      likes: 892,
      comments: 15,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: "1",
      user: {
        name: "TravelAdventures",
        avatar: avatars[0],
        handle: "@traveler",
      },
      videoUrl: vids[0],
      caption: "Sunset views from Bali beaches 🌅 #Travel #Wanderlust",
      likes: 1243,
      comments: 42,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "2",
      user: {
        name: "FoodieDelights",
        avatar: avatars[1],
        handle: "@foodlover",
      },
      videoUrl: vids[1],
      caption: "Making homemade pasta from scratch! #Cooking #Foodie",
      likes: 892,
      comments: 15,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: "1",
      user: {
        name: "TravelAdventures",
        avatar: avatars[0],
        handle: "@traveler",
      },
      videoUrl: vids[2],
      caption: "Sunset views from Bali beaches 🌅 #Travel #Wanderlust",
      likes: 1243,
      comments: 42,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "2",
      user: {
        name: "FoodieDelights",
        avatar: avatars[1],
        handle: "@foodlover",
      },
      videoUrl: vids[3],
      caption: "Making homemade pasta from scratch! #Cooking #Foodie",
      likes: 892,
      comments: 15,
      isLiked: true,
      isBookmarked: true,
    },
  ]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-play current reel and pause others
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index === currentReelIndex) {
        video?.play().catch((e) => console.log("Auto-play prevented", e));
      } else {
        video?.pause();
      }
    });
  }, [currentReelIndex]);

  const handleLike = (id: string) => {
    setReels(
      reels.map((reel) =>
        reel.id === id
          ? {
              ...reel,
              isLiked: !reel.isLiked,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
            }
          : reel
      )
    );
  };

  const handleBookmark = (id: string) => {
    setReels(
      reels.map((reel) =>
        reel.id === id ? { ...reel, isBookmarked: !reel.isBookmarked } : reel
      )
    );
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const reelHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / reelHeight);

    if (newIndex !== currentReelIndex) {
      setCurrentReelIndex(newIndex);
    }
  };

  return (
    <div className="relative h-[calc(100vh-3rem)] w-full max-w-md mx-auto overflow-hidden bg-black">
      {/* Reels Container */}
      <div
        className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
        onScroll={handleScroll}
      >
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            className="relative h-full w-full snap-start flex items-center justify-center"
          >
            {/* Video */}
            <video
              ref={(el: HTMLVideoElement) => (videoRefs.current[index] = el)}
              src={reel.videoUrl}
              className="h-full w-full object-cover"
              loop
              muted={muted}
              playsInline
            />

            {/* Overlay UI */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent via-transparent flex flex-col justify-end p-4">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={reel.user.avatar} />
                  <AvatarFallback>{reel.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-white">{reel.user.name}</p>
                  <p className="text-sm text-white/80">{reel.user.handle}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  Follow
                </Button>
              </div>

              {/* Caption */}
              <p className="text-white mb-6">{reel.caption}</p>

              {/* Right Side Actions */}
              <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/10 hover:bg-white/20"
                    onClick={() => handleLike(reel.id)}
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        reel.isLiked
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                  </Button>
                  <span className="text-white text-xs mt-1">
                    {reel.likes.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <MessageSquare className="h-6 w-6 text-white" />
                  </Button>
                  <span className="text-white text-xs mt-1">
                    {reel.comments.toLocaleString()}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20"
                >
                  <Share2 className="h-6 w-6 text-white" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20"
                  onClick={() => handleBookmark(reel.id)}
                >
                  <Bookmark
                    className={`h-6 w-6 ${
                      reel.isBookmarked ? "fill-white text-white" : "text-white"
                    }`}
                  />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <h1 className="font-bold text-white text-xl">Reels</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/20"
          onClick={() => setMuted(!muted)}
        >
          {muted ? (
            <VolumeX className="h-5 w-5 text-white" />
          ) : (
            <Volume2 className="h-5 w-5 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
}
