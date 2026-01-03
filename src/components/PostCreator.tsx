import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Image as ImageIcon } from "lucide-react";

export function PostCreator() {
  return (
    <div className="p-4 border-b border-white/5 bg-white/[0.01]">
      <div className="flex gap-4">
        <Avatar className="w-10 h-10 rounded-xl">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="flex-1">
          <textarea
            placeholder="What's happening?"
            className="w-full bg-transparent border-none outline-none text-lg placeholder:text-zinc-600 resize-none h-12"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="text-indigo-400 p-2 hover:bg-white/5 rounded-full cursor-pointer transition-colors">
              <ImageIcon size={20} />
            </div>
            <button className="px-5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all text-sm shadow-lg shadow-indigo-500/20">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
