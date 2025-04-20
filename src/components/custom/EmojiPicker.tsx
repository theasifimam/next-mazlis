"use client";

import EmojiPicker from "emoji-picker-react";

export function MyEmojiPicker({ onSelect }: { onSelect: (e: string) => void }) {
  return (
    <div className="relative">
      {
        <div className="absolute z-50">
          <EmojiPicker
            onEmojiClick={(e) => {
              onSelect(e.emoji);
            }}
            width={300}
            height={350}
          />
        </div>
      }
    </div>
  );
}
