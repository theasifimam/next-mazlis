"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PostMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostMenu({ isOpen, onClose }: PostMenuProps) {
  const menuItems = ["Follow @mazlis_ui", "Mute", "Block"];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            {menuItems.map((item, i) => (
              <button
                key={item}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(item);
                  onClose();
                }}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-xs font-black uppercase tracking-widest hover:bg-secondary transition-colors text-foreground",
                  i !== 0 && "border-t border-border/50"
                )}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />
      )}
    </>
  );
}
