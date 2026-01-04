import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  icon: LucideIcon;
  count: number;
  isActive: boolean;
  activeColor: string;
  hoverColor: string;
  onClick: (e: React.MouseEvent) => void;
  fillWhenActive?: boolean;
  rotateWhenActive?: boolean;
}
export function ActionButton({
  icon: Icon,
  count,
  isActive,
  activeColor,
  hoverColor,
  onClick,
  fillWhenActive,
  rotateWhenActive,
}: ActionButtonProps) {
  const formatCount = (num: number): string => {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num.toString();
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 transition-all p-2 rounded-xl",
        hoverColor,
        isActive && activeColor
      )}
    >
      <Icon
        size={18}
        className={cn(
          "transition-transform active:scale-125",
          fillWhenActive && isActive && cn("fill-current", activeColor),
          rotateWhenActive && isActive && "rotate-180"
        )}
      />
      <span className="text-xs font-black">{formatCount(count)}</span>
    </button>
  );
}
