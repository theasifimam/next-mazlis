"use client";

import { useState } from "react";
import { MoreHorizontal, CheckCircle2 } from "lucide-react";
import { PostMenu } from "./PostMenu";

interface PostHeaderProps {
  username: string;
  handle: string;
  timeAgo: string;
}

export function PostHeader({ username, handle, timeAgo }: PostHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1.5 overflow-hidden">
        <span className="font-black text-foreground hover:underline cursor-pointer truncate">
          {username}
        </span>
        <CheckCircle2
          size={14}
          className="fill-primary text-background flex-none"
        />
        <span className="text-muted-foreground text-xs font-bold truncate">
          @{handle} • {timeAgo}
        </span>
      </div>

      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-all p-1.5 rounded-lg"
        >
          <MoreHorizontal size={18} />
        </button>

        <PostMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
      </div>
    </div>
  );
}
