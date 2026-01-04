"use client";

import { ThemeToggle } from "@/components/ToggleTheme";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";

export default function AppearanceSettings() {
  return (
    <main className="flex-1 bg-card border border-border overflow-hidden min-h-screen flex flex-col shadow-inner">
      <ScrollArea className="flex-1 p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-bold text-primary">
            Interface Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl border border-border">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Theme Mode
                </p>
                <p className="text-xs text-muted-foreground">
                  Switch between light and dark mode
                </p>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl border border-border">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Reduce Motion
                </p>
                <p className="text-xs text-muted-foreground">
                  Minimize animations in the interface
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </motion.div>
      </ScrollArea>
    </main>
  );
}
