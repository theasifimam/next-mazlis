// app/_components/emoji-picker.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { cn } from "@/lib/utils";

interface EmojiPickerProps {
  children: React.ReactNode;
  onChange: (emoji: string) => void;
  className?: string;
}

export const MyEmojiPicker = ({
  children,
  onChange,
  className,
}: EmojiPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange(emojiData.emoji);
    setIsOpen(false);
  };

  return (
    <div ref={pickerRef} className={cn("relative", className)}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {children}
      </div>

      {isOpen && (
        <div className="absolute bottom-12 right-0 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={300}
            height={350}
            previewConfig={{ showPreview: false }}
            searchDisabled={false}
            skinTonesDisabled
          />
        </div>
      )}
    </div>
  );
};
