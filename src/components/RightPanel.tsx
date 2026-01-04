"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RightPanel() {
  return (
    <div className="space-y-6">
      {/* Modern Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search Nexus"
          className="w-full bg-muted/50 border border-border rounded-full py-3 pl-10 pr-4 outline-none focus:border-primary/50 focus:bg-background transition-all placeholder:text-muted-foreground"
        />
      </div>

      {/* Trending Card */}
      <div className="bg-muted/30 rounded-[24px] border border-border p-4 space-y-4">
        <h3 className="font-bold text-xl px-2 text-foreground">
          Trending for you
        </h3>
        <div className="space-y-4">
          {[
            { topic: "Technology", tag: "#NextJS14", posts: "52.4K" },
            { topic: "Design", tag: "#UIUX", posts: "12.1K" },
            { topic: "Politics", tag: "#Elections2024", posts: "98.2K" },
          ].map((item, i) => (
            <div
              key={i}
              className="px-2 py-2 hover:bg-muted/80 rounded-xl cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs text-muted-foreground">
                  {item.topic}
                </span>
                <span className="text-xs text-muted-foreground">...</span>
              </div>
              <p className="font-bold text-foreground mt-0.5">{item.tag}</p>
              <span className="text-xs text-muted-foreground">
                {item.posts} posts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Who to Follow */}
      <div className="bg-muted/30 rounded-[24px] border border-border p-4 space-y-4">
        <h3 className="font-bold text-xl px-2 text-foreground">
          Who to follow
        </h3>
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={`https://i.pravatar.cc/150?u=follow${i}`} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold hover:underline cursor-pointer text-foreground">
                  Jane Doe
                </span>
                <span className="text-xs text-muted-foreground">
                  @janedesign
                </span>
              </div>
            </div>
            <Button className="h-8 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-xs px-4">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
