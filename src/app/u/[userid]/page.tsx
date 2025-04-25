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
  Lock,
  Heart,
  Share2,
  CheckCircle,
  Plus,
  Camera,
  Video,
  SaveIcon,
  MessageCircle,
} from "lucide-react";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { avatars, pics } from "@/lib/data/images";
import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import UpdateProfileModal from "@/components/u/UpdateProfileModal";
import { UserType } from "@/components/u/type";
import ViewStoryModal from "@/components/u/ViewStoryModal";

// Example usage:
const userProfile: UserType = {
  username: "saifiimam",
  name: "Saifi Imam",
  bio: "Digital artisan crafting meaningful experiences | Minimalism advocate | Coffee alchemist",
  avatar: avatars[1],
  verified: true,
  stats: {
    works: 42,
    collaborators: 128,
  },
  links: [
    { title: "Portfolio", url: "https://morgan.design" },
    { title: "Principles", url: "https://morgan.design/philosophy" },
  ],
};

export default function ProfilePage({
  isPrivate = false,
  isCurrentUser = false,
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState<UserType>(userProfile);
  type StoryCategories = "Design" | "Travel" | "Work" | "Ideas";
  const stories: Record<StoryCategories, string[]> = {
    Design: [pics[0], pics[2], pics[4]],
    Travel: [pics[1], pics[3], pics[5]],
    Work: [pics[3], pics[3], pics[2]],
    Ideas: [pics[2], pics[4], pics[3]],
  };

  const posts = pics.slice(0, 9); // Sample posts

  return (
    <div className="flex-1 border-x border-border/10 bg-background">
      {/* Header Bar - Removed menu button and profile arrow */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/10">
        <h2 className="font-medium">Profile</h2>
      </div>

      {/* Profile Header - Redesigned with avatar, name, and bio in same row */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex gap-6">
          {/* Left side - Avatar */}
          <div className="relative">
            {isCurrentUser && (
              <div className="absolute top-[65px] z-10  right-0 bg-black rounded-full p-1 border-2 border-background">
                <Camera className="h-4 w-4 text-white" />
              </div>
            )}
            <Avatar className="h-24 w-24 rounded-full border-2">
              <AvatarImage
                src={userInfo.avatar}
                className="object-cover rounded-full"
              />
              <AvatarFallback className="bg-black/10 rounded-full">
                {userInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Right side - Info and buttons */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              {/* Name, username, verification */}
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">{userInfo.name}</h1>
                  {userInfo.verified && (
                    <span className="ml-1 text-black">
                      <CheckCircle className="h-5 w-5 fill-black" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  @{userInfo.username}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                {isCurrentUser ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 rounded-full border-black hover:bg-black/5"
                    onClick={() => setUpdateModalOpen(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant={isFollowing ? "outline" : "default"}
                      size="sm"
                      className={`h-9 rounded-full ${
                        !isFollowing
                          ? "bg-black hover:bg-black/80"
                          : "border-black hover:bg-black/5"
                      }`}
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      {isFollowing ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1.5" />
                          Following
                        </>
                      ) : (
                        "Follow"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 rounded-full border-black hover:bg-black/5"
                      onClick={() => setUpdateModalOpen(true)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full border-black hover:bg-black/5"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{userInfo.bio}</p>

            <div className="flex gap-x-5 mb-3">
              <div className="flex items-baseline gap-1">
                <span className="font-semibold">{userInfo.stats.works}</span>
                <span className="text-xs text-muted-foreground">works</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-semibold">
                  {userInfo.stats.collaborators}
                </span>
                <span className="text-xs text-muted-foreground">
                  collaborators
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {userInfo.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="text-xs flex items-center gap-1 px-2.5 py-1 rounded-full border border-black/20 hover:bg-black/5 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="h-3 w-3" />
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story Highlights - Now clickable */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
          {isCurrentUser && (
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-16 h-24 rounded-full border-2 border-dashed border-black/40 flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground mt-1">New</span>
            </div>
          )}

          {Object.keys(stories).map((story, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div className="w-16 h-24 rounded-full border-2 border-black/40 bg-black/5 flex items-center justify-center text-xs font-medium overflow-hidden">
                <img
                  src={stories[story as StoryCategories][0]}
                  alt={story}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {story}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-2" />

      {/* Content Tabs */}
      {isPrivate && !isCurrentUser && !isFollowing ? (
        <PrivateAccountView onFollow={() => setIsFollowing(true)} />
      ) : (
        <Tabs
          defaultValue="posts"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 h-10 bg-gray-200 mb-2">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-black rounded-full"
            >
              <Grid3X3 className="h-5 w-5" />
              Grid
            </TabsTrigger>
            <TabsTrigger
              value="reels"
              className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-black rounded-full h-full"
            >
              <Video className="h-5 w-5" />
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-black rounded-full"
            >
              <SaveIcon className="h-5 w-5" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0">
            <div className="grid grid-cols-3 gap-1 bg-border/10">
              {posts.map((post, index) => (
                <Link key={index} href={`/post/${index}`} className="block">
                  <div className="aspect-square relative group overflow-hidden bg-muted rounded-lg">
                    <img
                      src={post}
                      alt={`Post ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 text-white text-xs flex items-center gap-2">
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          24
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />8
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reels">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black/5 mb-4">
                <Clapperboard className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">No Videos Yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs text-center">
                {isCurrentUser
                  ? "Create and share your first video with your followers"
                  : "This user hasn't created any videos yet"}
              </p>
              {isCurrentUser && (
                <Button
                  className="mt-6 rounded-full bg-black hover:bg-black/80"
                  size="sm"
                >
                  Create Video
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black/5 mb-4">
                <Bookmark className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">No Saved Posts</h3>
              <p className="text-sm text-muted-foreground max-w-xs text-center">
                {isCurrentUser
                  ? "Save posts to find them easily later"
                  : "This user hasn't saved any posts yet"}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Update Profile Modal */}
      <UpdateProfileModal
        userInfo={userInfo}
        updateModalOpen={updateModalOpen}
        setUpdateModalOpen={setUpdateModalOpen}
        setUserInfo={setUserInfo}
      />

      {/* Story Viewer Dialog */}
      <ViewStoryModal
        selectedStory={selectedStory}
        setSelectedStory={setSelectedStory}
        stories={stories}
        userInfo={userInfo}
      />

      <style jsx global>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 5s linear;
        }
      `}</style>
    </div>
  );
}

// Private account view component
function PrivateAccountView({ onFollow }: { onFollow: () => void }) {
  return (
    <div className="py-16 px-4 text-center">
      <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center border-2 border-black/20 mb-4">
        <Lock className="h-10 w-10 text-muted-foreground/50" />
      </div>
      <h2 className="text-xl font-medium mb-2">Private Account</h2>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
        This account is private. Follow this account to see their photos and
        videos.
      </p>
      <Button
        onClick={onFollow}
        className="rounded-full bg-black hover:bg-black/80"
      >
        Request to Follow
      </Button>
    </div>
  );
}
