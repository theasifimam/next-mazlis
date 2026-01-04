"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface PostCommentBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostCommentBox({ isOpen, onClose }: PostCommentBoxProps) {
  const handleReply = () => {
    // Handle reply logic
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="mt-4 flex gap-3 items-start p-4 bg-secondary/20 rounded-[24px] border border-border">
            <Avatar className="w-8 h-8 rounded-xl border border-border flex-none">
              <AvatarImage src="https://i.pravatar.cc/150?u=currentuser" />
            </Avatar>
            <div className="flex-1 space-y-3">
              <textarea
                placeholder="Post your reply..."
                className="w-full bg-transparent rounded-3xl p-2 border-none text-sm resize-none focus:ring-0 text-foreground placeholder:text-muted-foreground font-medium"
                rows={2}
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-xs font-black uppercase tracking-widest"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleReply}
                  className="text-xs font-black uppercase tracking-widest rounded-xl"
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
