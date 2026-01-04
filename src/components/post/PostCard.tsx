"use client";

import { useState } from "react";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostImage } from "./PostImage";
import { PostActions } from "./PostActions";
import { PostCommentBox } from "./PostCommentBox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PostCardProps {
  id: number;
}

export function PostCard({ id }: PostCardProps) {
  const [isCommenting, setIsCommenting] = useState(false);

  return (
    <div className="p-5 border-b border-border hover:bg-secondary/30 transition-all cursor-pointer group/card bg-background">
      <div className="flex gap-4">
        {/* Avatar */}
        <Avatar className="w-12 h-12 rounded-2xl border border-border shadow-sm flex-none">
          <AvatarImage src={`https://i.pravatar.cc/150?u=nexus${id}`} />
          <AvatarFallback className="bg-secondary font-black">M</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3 min-w-0">
          <PostHeader username="Asif Imam" handle="asifimam" timeAgo="3h" />

          <PostContent>
            Ultra-modern social media UI built with{" "}
            <span className="text-primary font-black cursor-pointer hover:underline">
              #NextJS
            </span>
            . Designing the future of the web.
          </PostContent>

          <PostImage id={id} />

          <PostActions
            postId={id}
            isCommenting={isCommenting}
            onToggleComment={() => setIsCommenting(!isCommenting)}
          />

          <PostCommentBox
            isOpen={isCommenting}
            onClose={() => setIsCommenting(false)}
          />
        </div>
      </div>
    </div>
  );
}
