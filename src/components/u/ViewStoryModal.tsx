"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ViewStoryModalProps {
  selectedStory: StoryCategories | null;
  setSelectedStory: (story: StoryCategories | null) => void;
  stories: Record<StoryCategories, string[]>;
  userInfo: {
    name: string;
    username: string;
    avatar: string;
  };
}

type StoryCategories = string;

export default function ViewStoryModal({
  selectedStory,
  setSelectedStory,
  stories,
  userInfo,
}: ViewStoryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0); // Reset index when new story is opened
  }, [selectedStory]);

  if (!selectedStory) return null;

  const currentStoryMedia = stories[selectedStory];
  const currentMedia = currentStoryMedia[currentIndex];

  const handleNext = () => {
    if (currentIndex < currentStoryMedia.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSelectedStory(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <Dialog
      open={selectedStory !== null}
      onOpenChange={(open) => !open && setSelectedStory(null)}
    >
      <DialogContent className="p-0 bg-transparent border-0 max-w-none w-full h-full sm:w-full sm:h-full">
        <div className="relative w-full h-full bg-black">
          {/* Top info */}
          <div className="absolute top-4 left-4 z-10 flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={userInfo.avatar} />
              <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-white font-medium text-sm">
              {userInfo.username}
            </span>
            <span className="text-white/60 text-xs ml-2">{selectedStory}</span>
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 rounded-full bg-black/20 hover:bg-black/40"
            onClick={() => setSelectedStory(null)}
          >
            <X className="h-4 w-4 text-white" />
          </Button>

          {/* Prev/Next buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50"
            onClick={handleNext}
            disabled={currentIndex === currentStoryMedia.length - 1}
          >
            <ChevronRight className="text-white w-6 h-6" />
          </Button>

          {/* Media */}
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={currentMedia}
              alt={`Story item ${currentIndex + 1}`}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 flex p-2 gap-1">
            {currentStoryMedia.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i === currentIndex
                    ? "bg-white animate-progress"
                    : i < currentIndex
                    ? "bg-white"
                    : "bg-white/20"
                }`}
                style={{
                  animation:
                    i === currentIndex ? "progress 5s linear forwards" : "none",
                }}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
