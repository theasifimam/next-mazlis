// app/components/TopNavBar.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Clapperboard,
  MessageSquare,
  Bookmark,
  Search,
  Plus,
  Bell,
  Telescope,
  UserCogIcon,
  SearchSlash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationDropdown } from "@/components/custom/notification-dropdown";
import UserDropdown from "@/components/custom/UserDropdown";

export function TopNavBar() {
  const pathname = usePathname();
  console.log(pathname);

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Home", href: "/" },
    {
      icon: <Clapperboard className="h-5 w-5" />,
      label: "Reels",
      href: "/reels",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Chat",
      href: "/chat",
    },
    {
      icon: <SearchSlash className="h-5 w-5" />,
      label: "Explore",
      href: "/explore",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center px-4">
        {/* Logo - Left */}
        <div className="flex items-center gap-2 w-64">
          <Telescope className="h-6 w-6 text-primary" />
          <h1 className="font-bold text-lg">Nexus</h1>
        </div>

        {/* Centered Navigation */}
        <div className="flex-1 flex justify-center">
          <nav className="flex gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.label}
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  className={`rounded-full gap-2 ${
                    isActive ? "font-semibold" : ""
                  }`}
                  size="sm"
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="w-64 flex justify-end items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <div className="hidden md:block">
            <Input
              placeholder="Search Nexus..."
              className="h-8 w-40 text-sm rounded-full"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
          <NotificationDropdown />
          <UserDropdown />

          {/* User Dropdown */}
        </div>
      </div>
    </header>
  );
}
