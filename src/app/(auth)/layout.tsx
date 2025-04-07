"use client";

import { motion } from "framer-motion";
import { Telescope, Sparkles } from "lucide-react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Side - Branding */}
      <div className="lg:w-1/2 bg-background p-6 lg:p-12 flex flex-col justify-center border-r">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto space-y-6 lg:space-y-8"
        >
          <div className="flex items-center gap-3">
            <Telescope className="h-7 w-7 lg:h-8 lg:w-8 text-foreground" />
            <span className="text-lg lg:text-xl font-medium tracking-tight">
              MAZLIS
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-medium leading-tight">
            The <span className="font-semibold">antidote</span> to
            <br />
            <span className="font-semibold">digital</span> loneliness
          </h1>

          <p className="text-base lg:text-lg text-muted-foreground">
            Private by design. Meaningful by default.
          </p>

          <div className="space-y-2 lg:space-y-3">
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-foreground" />
              <span className="text-sm lg:text-base text-muted-foreground">
                No algorithms. No nonsense.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-foreground" />
              <span className="text-sm lg:text-base text-muted-foreground">
                Human connections, amplified.
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
