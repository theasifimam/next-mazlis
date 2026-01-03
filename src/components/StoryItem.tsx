import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StoryItemProps {
  id: number;
  username: string;
}

export function StoryItem({ id, username }: StoryItemProps) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group shrink-0">
      <div className="p-[2.5px] rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 group-hover:scale-105 transition-all">
        <Avatar className="w-14 h-14 rounded-[14px] border-2 border-black">
          <AvatarImage src={`https://i.pravatar.cc/150?u=${id}`} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
      <span className="text-[10px] text-zinc-500 font-medium">{username}</span>
    </div>
  );
}
