// app/components/Post.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  FileText,
  BarChart2,
  Send,
  Bookmark,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Media = {
  type: "image" | "video" | "pdf";
  url: string;
  aspectRatio?: "portrait" | "landscape" | "square";
};

type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  text: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  replies?: Comment[];
};

type PostProps = {
  id: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  content: string;
  media?: Media[];
  poll?: {
    question: string;
    options: { id: string; text: string; percentage: number }[];
    totalVotes: number;
    userVote?: string;
  };
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
  isLiked: boolean;
  isBookmarked: boolean;
};

export function Post({
  id,
  user,
  content,
  media,
  poll,
  likes,
  comments,
  shares,
  timestamp,
  isLiked: initialIsLiked,
  isBookmarked: initialIsBookmarked,
}: PostProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [currentComments, setCurrentComments] = useState(comments);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: {
        name: "You",
        avatar: "/user.jpg",
        handle: "currentuser",
      },
      text: commentText,
      likes: 0,
      isLiked: false,
      timestamp: "Just now",
    };

    setCurrentComments([...currentComments, newComment]);
    setCommentText("");
  };

  return (
    <Card className="rounded-3xl overflow-hidden mb-4 border-0 py-2 shadow-sm">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="font-medium">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">
              @{user.handle} · {timestamp}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl p-1">
            <DropdownMenuItem className="rounded-lg px-3 py-2">
              Save post
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg px-3 py-2 text-red-500">
              Report post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-1">
        <p className="mb-3 text-sm">{content}</p>

        {/* Media Display */}
        {media && media.length > 0 && (
          <div className="mb-1 h-80 rounded-3xl overflow-hidden">
            {media.map((item, index) => (
              <div
                key={index}
                className={`relative ${
                  item.aspectRatio === "portrait"
                    ? "aspect-[4/5]"
                    : item.aspectRatio === "landscape"
                    ? "aspect-[5/3]"
                    : "aspect-square"
                }`}
              >
                {item.type === "image" && (
                  <img
                    src={item.url}
                    alt="Post media"
                    className="w-full h-full object-cover"
                  />
                )}
                {item.type === "video" && (
                  <video controls className="w-full h-full object-cover">
                    <source src={item.url} type="video/mp4" />
                  </video>
                )}
                {item.type === "pdf" && (
                  <div className="border rounded-lg p-3 flex items-center gap-2 h-full">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium text-sm">Document.pdf</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto rounded-lg"
                    >
                      View
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Poll Display */}
        {poll && <PollComponent {...poll} />}
      </div>

      {/* Post Actions */}
      <div className="px-3 pt-1 border-t flex justify-between">
        <div className="flex">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1.5 rounded-lg px-2 ${
              isLiked ? "text-rose-500 hover:text-rose-500" : ""
            }`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-sm">{likeCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 rounded-lg px-2"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm">{currentComments.length}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 rounded-lg px-2"
            onClick={() => setShowShareModal(true)}
          >
            <Share2 className="h-5 w-5" />
            <span className="text-sm">{shares}</span>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="rounded-lg px-2"
          onClick={handleBookmark}
        >
          <Bookmark
            className={`h-5 w-5 ${
              isBookmarked ? "fill-current text-yellow-500" : ""
            }`}
          />
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t p-3 space-y-3">
          <div className="flex gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/user.jpg" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="rounded-full text-sm h-9"
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={handleAddComment}
                disabled={!commentText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            {currentComments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={comment.user.avatar} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted/50 p-2 rounded-lg">
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-xs">
                        {comment.user.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        @{comment.user.handle}
                      </p>
                    </div>
                    <p className="mt-1 text-sm">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 ml-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-1.5 text-xs text-muted-foreground"
                    >
                      Like
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-1.5 text-xs text-muted-foreground"
                    >
                      Reply
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="rounded-xl sm:max-w-md p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-left">Share this post</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <Input
              placeholder="Search followers..."
              className="rounded-full mb-4"
            />
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground px-2">
                SUGGESTED
              </p>
              <div className="space-y-1">
                {[
                  {
                    name: "Jane Smith",
                    handle: "janesmith",
                    avatar: "/user-1.jpg",
                  },
                  {
                    name: "Mike Johnson",
                    handle: "mikej",
                    avatar: "/user-2.jpg",
                  },
                  {
                    name: "Sarah Williams",
                    handle: "sarahw",
                    avatar: "/user-3.jpg",
                  },
                ].map((user) => (
                  <div
                    key={user.handle}
                    className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        @{user.handle}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8 px-3 text-xs"
                    >
                      Send
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function PollComponent({
  question,
  options,
  totalVotes,
  userVote,
}: {
  question: string;
  options: { id: string; text: string; percentage: number }[];
  totalVotes: number;
  userVote?: string;
}) {
  return (
    <Card className="p-3 rounded-lg mb-2">
      <p className="font-medium text-sm mb-2">{question}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="space-y-1">
            <Button
              variant={userVote === option.id ? "default" : "outline"}
              className={`w-full justify-start h-9 rounded-lg text-sm ${
                userVote ? "pointer-events-none" : ""
              }`}
            >
              {option.text}
              {userVote && (
                <span className="ml-auto text-xs font-medium">
                  {option.percentage}%
                </span>
              )}
            </Button>
            {userVote && (
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${option.percentage}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">{totalVotes} votes</p>
    </Card>
  );
}
