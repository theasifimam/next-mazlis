"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import Image from "next/image";

interface StoryViewerProps {
  activeId: number | null;
  stories: { id: number; username: string }[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StoryViewer({
  activeId,
  stories,
  onClose,
  onNext,
  onPrev,
}: StoryViewerProps) {
  const currentStory = stories.find((s) => s.id === activeId);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, onNext, onPrev]);

  if (!activeId || !currentStory) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white z-[110]"
      >
        <X size={32} />
      </button>

      {/* Navigation - Left */}
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-10 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-20"
        disabled={stories.indexOf(currentStory) === 0}
      >
        <ChevronLeft size={32} />
      </button>

      {/* Content Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: -100 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="relative w-full max-w-[450px] aspect-[9/16] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 bg-zinc-900"
        >
          {/* Progress Bar Header */}
          <div className="absolute top-0 inset-x-0 p-4 z-20 bg-gradient-to-b from-black/60 to-transparent flex flex-col gap-3">
            <div className="flex gap-1">
              {stories.map((s) => (
                <div
                  key={s.id}
                  className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
                >
                  <div
                    className={`h-full bg-white ${
                      s.id === activeId
                        ? "w-full"
                        : s.id < activeId
                        ? "w-full"
                        : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${activeId}`} />
              </Avatar>
              <span className="text-white font-bold text-sm">
                {currentStory.username}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <Image
            src={`https://picsum.photos/seed/${activeId + 50}/1080/1920`}
            className="w-full h-full object-cover"
            alt="story"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Right */}
      <button
        onClick={onNext}
        className="absolute right-4 md:right-10 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-20"
        disabled={stories.indexOf(currentStory) === stories.length - 1}
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
