"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ToggleTheme";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Mail, label: "Messages", href: "/messages" },
  { icon: Bookmark, label: "Saved", href: "/saved", desktopOnly: true },
  { icon: User, label: "Profile", href: "/profile" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        // Mobile: Fixed Bottom
        "fixed bottom-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border px-2 py-3",
        // Desktop: Changed lg:items-stretch to lg:items-center to keep icons centered
        "lg:sticky lg:top-0 lg:h-screen lg:w-fit lg:min-w-[80px] xl:min-w-[260px] lg:flex lg:flex-col lg:border-t-0 lg:border-r lg:bg-background lg:p-4 lg:items-center xl:items-stretch"
      )}
    >
      <div className="flex lg:flex-col h-full justify-between items-center w-full">
        <div className="flex lg:flex-col w-full items-center xl:items-stretch lg:space-y-6">
          {/* Logo - Centered for mid-screens, Left for XL */}
          <div className="hidden lg:flex xl:block justify-center xl:justify-start xl:px-4 w-full">
            <Link href="/" className="inline-block">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-2 transition-transform hover:scale-105 active:scale-95">
                <span className="text-white font-black text-2xl">N</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-row lg:flex-col justify-around lg:justify-start w-full gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative group flex items-center justify-center xl:justify-start gap-4 p-3.5 xl:px-4 rounded-2xl transition-all duration-300 outline-none",
                    item.desktopOnly && "hidden lg:flex"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-primary/10 border border-primary/10 rounded-2xl z-0"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className={cn(
                        "transition-colors duration-300 flex items-center justify-center",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      <item.icon size={26} strokeWidth={isActive ? 2.5 : 2} />
                    </div>

                    <span
                      className={cn(
                        "hidden xl:block text-[17px] tracking-tight transition-colors duration-300 whitespace-nowrap",
                        isActive
                          ? "text-foreground font-bold"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="hidden lg:flex flex-col items-center xl:items-stretch gap-4 w-full">
          <div className="flex justify-center xl:justify-start xl:px-2">
            <ThemeToggle />
          </div>

          <button className="flex items-center justify-center xl:justify-between w-full p-3 rounded-2xl hover:bg-muted/50 transition-all group border border-transparent hover:border-border/50">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <Avatar className="h-10 w-10 rounded-xl border border-border">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
              </div>
              <div className="hidden xl:flex flex-col items-start text-sm overflow-hidden">
                <span className="font-bold text-foreground leading-none mb-1 truncate w-full">
                  John Doe
                </span>
                <span className="text-muted-foreground leading-none text-xs truncate w-full">
                  @johndoe
                </span>
              </div>
            </div>
            <MoreHorizontal
              className="hidden xl:block text-muted-foreground group-hover:text-foreground shrink-0"
              size={18}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
