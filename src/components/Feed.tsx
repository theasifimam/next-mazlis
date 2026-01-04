"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { StoryItem } from "./StoryItem";
import { PostCreator } from "./PostCreator";
import { PostCard } from "./post/PostCard";
import { useState } from "react";
import { StoryViewer } from "./StoryViewer";

const DUMMY_STORIES = [
  { id: 1, username: "alex_design" },
  { id: 2, username: "sarah_tech" },
  { id: 3, username: "nexus_official" },
  { id: 4, username: "dev_mode" },
];

export function Feed() {
  const [activeStoryId, setActiveStoryId] = useState<number | null>(null);

  const handleNext = () => {
    const currentIndex = DUMMY_STORIES.findIndex((s) => s.id === activeStoryId);
    if (currentIndex < DUMMY_STORIES.length - 1) {
      setActiveStoryId(DUMMY_STORIES[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = DUMMY_STORIES.findIndex((s) => s.id === activeStoryId);
    if (currentIndex > 0) {
      setActiveStoryId(DUMMY_STORIES[currentIndex - 1].id);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground transition-colors duration-300">
      {/* 1. Fixed Header - Removed bg-black/60, added bg-background/60 */}
      <header className="flex-none z-50 w-full border-b border-border bg-background/60 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-xl font-bold tracking-tight">Mazlis</h2>
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 border-green-500/20 gap-1 px-2 py-0.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
            Live
          </Badge>
        </div>
      </header>

      {/* 2. Scrollable Content */}
      <ScrollArea className="flex-1 w-full h-full">
        <div className="flex flex-col">
          {/* Horizontal Stories - Replaced border-white/5 with border-border */}
          <section className="p-4 border-b border-border overflow-x-auto no-scrollbar bg-card/30">
            <div className="flex gap-5 min-w-max">
              {DUMMY_STORIES.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setActiveStoryId(s.id)}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <StoryItem id={s.id} username={s.username} />
                </div>
              ))}
            </div>
          </section>
          {/* Story Viewer Modal */}
          <StoryViewer
            activeId={activeStoryId}
            stories={DUMMY_STORIES}
            onClose={() => setActiveStoryId(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
          <PostCreator />
          <section className="flex flex-col divide-y divide-border">
            {[1, 2, 3, 4, 5].map((post) => (
              <PostCard key={post} id={post} />
            ))}
          </section>
          <div className="h-24" /> {/* Bottom Spacer */}
        </div>
      </ScrollArea>
    </div>
  );
}
