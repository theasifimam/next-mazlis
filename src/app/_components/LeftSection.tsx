// app/components/LeftSection.tsx
"use client";

import {
  Compass,
  Telescope,
  TrendingUp,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export function LeftSection() {
  // Sample trending topics with growth metrics
  const trendingDiscoveries = [
    {
      name: "AI Art Revolution",
      icon: <Sparkles className="h-4 w-4" />,
      growth: 78,
      participants: "1.2M",
    },
    {
      name: "Neuro Fitness",
      icon: <Zap className="h-4 w-4" />,
      growth: 42,
      participants: "856K",
    },
    {
      name: "Bio Hacking",
      icon: <TrendingUp className="h-4 w-4" />,
      growth: 65,
      participants: "2.3M",
    },
  ];

  return (
    <aside className="w-64  p-4 hidden md:flex flex-col h-[calc(100vh-56px)] sticky top-14">
      {/* Personalized Discovery Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Compass className="h-6 w-6 text-primary" />
          <h3 className="font-semibold">Your Discovery Hub</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Emerging trends tailored for you
        </p>
      </div>

      {/* Trending Now Visualization */}
      <div className="space-y-4 flex-1">
        {trendingDiscoveries.map((item, index) => (
          <div key={index} className="group">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-accent">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.participants} exploring
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={item.growth} className="h-2" />
              <span className="text-xs font-medium text-primary">
                +{item.growth}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Collaborative Space */}
      <div className="mt-auto pt-4 border-t">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Users className="h-4 w-4" /> Collaborative Spaces
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Design Thinkers", "Future Tech", "Creative Coders"].map(
            (space) => (
              <Button
                key={space}
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8"
              >
                {space}
              </Button>
            )
          )}
        </div>
      </div>
    </aside>
  );
}
