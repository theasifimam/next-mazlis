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
import { cn } from "@/lib/utils"; // Your cn utility

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
        // Mobile Layout (Bottom Dock)
        "fixed bottom-0 inset-x-0 z-50 bg-black/60 backdrop-blur-xl border-t border-white/10 px-2 py-3",
        // Desktop Layout (Sidebar)
        "lg:sticky lg:top-0 lg:h-screen lg:w-fit lg:min-w-[80px] xl:min-w-[260px] lg:flex-col lg:border-t-0 lg:border-r lg:bg-transparent lg:p-4"
      )}
    >
      <div className="flex lg:flex-col h-full justify-between items-center lg:items-stretch">
        <div className="flex lg:flex-col w-full items-center lg:items-stretch lg:space-y-8">
          {/* Logo - Hidden on Mobile */}
          <div className="hidden lg:block px-4">
            <Link href="/" className="inline-block">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-2 transition-transform hover:scale-105 active:scale-95">
                <span className="text-white font-black text-xl">N</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-row lg:flex-col justify-around lg:justify-start w-full gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 outline-none",
                    item.desktopOnly && "hidden lg:flex" // Hide less important items on mobile
                  )}
                >
                  {/* Active Indicator Background */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-white/[0.08] border border-white/[0.08] rounded-2xl z-0"
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
                        "transition-colors duration-300",
                        isActive
                          ? "text-indigo-400"
                          : "text-zinc-500 group-hover:text-zinc-200"
                      )}
                    >
                      <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    </div>

                    {/* Label - Hidden on Mobile & Tablets, shown on Desktop XL */}
                    <span
                      className={cn(
                        "hidden xl:block text-[17px] tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-white font-semibold"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Notification Dot */}
                  {item.href === "/notifications" && (
                    <span className="absolute top-3 right-4 lg:right-auto lg:left-8 w-2 h-2 bg-indigo-500 rounded-full border-2 border-black z-20" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile - Hidden on Mobile, shown on Desktop */}
        <div className="hidden lg:block px-2">
          <button className="flex items-center justify-between w-full p-3 rounded-2xl hover:bg-white/[0.05] transition-all group border border-transparent hover:border-white/[0.05]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 rounded-xl border border-white/10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#09090b] rounded-full" />
              </div>
              <div className="hidden xl:flex flex-col items-start text-sm">
                <span className="font-bold text-zinc-100 leading-none mb-1">
                  John Doe
                </span>
                <span className="text-zinc-500 leading-none text-xs">
                  @johndoe
                </span>
              </div>
            </div>
            <MoreHorizontal
              className="hidden xl:block text-zinc-500 group-hover:text-zinc-200"
              size={18}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
