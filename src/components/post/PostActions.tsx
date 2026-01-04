"use client";

import { useState, memo } from "react";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { ActionButton } from "./index";

interface PostActionsProps {
  postId: number;
  isCommenting: boolean;
  onToggleComment: () => void;
}

export const PostActions = memo(function PostActions({
  isCommenting,
  onToggleComment,
}: PostActionsProps) {
  const [likes, setLikes] = useState(1200);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(48);
  const [reposts, setReposts] = useState(12);
  const [isReposted, setIsReposted] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleRepost = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReposts(isReposted ? reposts - 1 : reposts + 1);
    setIsReposted(!isReposted);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComment();
    setComments(isCommenting ? comments - 1 : comments + 1);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You can add a toast notification here
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  //   const formatCount = (num: number): string => {
  //     return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num.toString();
  //   };

  return (
    <div className="flex justify-between items-center pt-2 text-muted-foreground max-w-sm">
      <ActionButton
        icon={Heart}
        count={likes}
        isActive={isLiked}
        activeColor="text-rose-500"
        hoverColor="hover:bg-rose-500/10 hover:text-rose-500"
        onClick={handleLike}
        fillWhenActive
      />

      <ActionButton
        icon={MessageCircle}
        count={comments}
        isActive={isCommenting}
        activeColor="text-primary"
        hoverColor="hover:bg-primary/10 hover:text-primary"
        onClick={handleComment}
      />

      <ActionButton
        icon={Repeat2}
        count={reposts}
        isActive={isReposted}
        activeColor="text-emerald-500"
        hoverColor="hover:bg-emerald-500/10 hover:text-emerald-500"
        onClick={handleRepost}
        rotateWhenActive
      />

      <button
        onClick={handleShare}
        className="hover:text-foreground transition-all p-2 hover:bg-secondary rounded-xl"
      >
        <Share size={18} />
      </button>
    </div>
  );
});
