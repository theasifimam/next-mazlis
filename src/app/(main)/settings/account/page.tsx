"use client"; // <--- THIS IS THE FIX

import { ScrollArea } from "@/components/ScrollArea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="flex-1 bg-card border border-border overflow-hidden flex flex-col shadow-inner">
      <ScrollArea className="flex-1 p-6 md:p-12">
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <section>
              <h2 className="text-xl font-bold mb-4 text-foreground">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl border border-border">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Email Address
                    </p>
                    <p className="text-xs text-muted-foreground">
                      johndoe@example.com
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-secondary"
                  >
                    Change
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl border border-border">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Password
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-secondary"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </section>

            <section className="pt-4">
              <h2 className="text-xl font-bold text-rose-500 mb-4 uppercase italic tracking-tighter">
                Danger Zone
              </h2>
              <div className="p-4 border border-rose-500/20 bg-rose-500/5 rounded-2xl">
                <p className="text-sm font-bold text-foreground">
                  Deactivate account
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  This will temporarily hide your profile and posts.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-xl font-bold"
                >
                  Deactivate
                </Button>
              </div>
            </section>
          </motion.div>
        </div>
      </ScrollArea>
    </main>
  );
}

// Small helper component if you don't have ScrollArea globally defined
