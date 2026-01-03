import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface PostCardProps {
  id: number;
}

export function PostCard({ id }: PostCardProps) {
  const [likes, setLikes] = useState(1200);
  const [isLiked, setIsLiked] = useState(false);

  const [comments, setComments] = useState(48);
  const [isCommenting, setIsCommenting] = useState(false);

  const [reposts, setReposts] = useState(12);
  const [isReposted, setIsReposted] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    setIsCommenting(!isCommenting);
  };

  const handleRepost = () => {
    setReposts(isReposted ? reposts - 1 : reposts + 1);
    setIsReposted(!isReposted);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.log("Failed to copy", err);
    }
  };

  const formatCount = (num: number): string => {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num.toString();
  };

  return (
    <div className="p-5 border-b border-white/5 hover:bg-white/[0.02] transition-all cursor-pointer">
      <div className="flex gap-4">
        <Avatar className="w-11 h-11 rounded-xl">
          <AvatarImage src={`https://i.pravatar.cc/150?u=nexus${id}`} />
        </Avatar>

        <div className="flex-1 space-y-3">
          {/* Header with Menu */}
          <div className="flex justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-bold hover:underline cursor-pointer">
                Nexus Design
              </span>
              <CheckCircle2 size={14} className="fill-indigo-500 text-black" />
              <span className="text-zinc-500 text-sm">@nexus_ui • 3h</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-zinc-600 hover:text-zinc-400 transition-colors p-1"
              >
                <MoreHorizontal size={20} />
              </button>

              {showMenu && (
                <>
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-xl z-10">
                    <button
                      onClick={() => {
                        alert("Followed @nexus_ui");
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors rounded-t-xl"
                    >
                      Follow @nexus_ui
                    </button>
                    <button
                      onClick={() => {
                        alert("Muted this account");
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors"
                    >
                      Mute this account
                    </button>
                    <button
                      onClick={() => {
                        alert("Blocked @nexus_ui");
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors"
                    >
                      Block @nexus_ui
                    </button>
                    <button
                      onClick={() => {
                        alert("Post reported");
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-white/5 transition-colors rounded-b-xl"
                    >
                      Report post
                    </button>
                  </div>
                  <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowMenu(false)}
                  />
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <p className="text-[15px] leading-relaxed text-zinc-200 font-light">
            Ultra-modern social media UI built with{" "}
            <span className="text-indigo-400 cursor-pointer hover:underline">
              #NextJS
            </span>
            .
          </p>

          {/* Image */}
          <div className="rounded-[24px] overflow-hidden border border-white/10 aspect-video relative group">
            <Image
              src={`https://picsum.photos/seed/${id + 10}/800/450`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Post content"
            />
          </div>

          {/* Interaction Buttons */}
          <div className="flex justify-between items-center pt-2 text-zinc-500 max-w-sm">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-all p-2 rounded-full hover:bg-white/5 ${
                isLiked ? "text-rose-500" : "hover:text-rose-500"
              }`}
            >
              <Heart size={18} className={isLiked ? "fill-rose-500" : ""} />
              <span className="text-xs">{formatCount(likes)}</span>
            </button>

            <button
              onClick={handleComment}
              className={`flex items-center gap-2 transition-all p-2 rounded-full hover:bg-white/5 ${
                isCommenting ? "text-sky-500" : "hover:text-sky-500"
              }`}
            >
              <MessageCircle size={18} />
              <span className="text-xs">{formatCount(comments)}</span>
            </button>

            <button
              onClick={handleRepost}
              className={`flex items-center gap-2 transition-all p-2 rounded-full hover:bg-white/5 ${
                isReposted ? "text-emerald-500" : "hover:text-emerald-500"
              }`}
            >
              <Repeat2 size={18} />
              <span className="text-xs">{formatCount(reposts)}</span>
            </button>

            <button
              onClick={handleShare}
              className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Share size={18} />
            </button>
          </div>

          {/* Comment Input */}
          {isCommenting && (
            <div className="mt-3 flex gap-3 items-start animate-in fade-in duration-200">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=currentuser" />
              </Avatar>
              <div className="flex-1">
                <textarea
                  placeholder="Post your reply..."
                  className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-indigo-500 transition-colors"
                  rows={2}
                  autoFocus
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setIsCommenting(false)}
                    className="px-3 py-1.5 text-xs rounded-full hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setComments(comments + 1);
                      setIsCommenting(false);
                      alert("Reply posted!");
                    }}
                    className="px-3 py-1.5 text-xs bg-indigo-500 hover:bg-indigo-600 rounded-full transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
