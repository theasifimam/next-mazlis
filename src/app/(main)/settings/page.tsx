"use client";

import React, { useState } from "react";
import {
  User,
  Bell,
  Eye,
  Globe,
  LogOut,
  Smartphone,
  LucideIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

// 1. Explicitly type the tabs for better TS support
interface SettingTab {
  id: string;
  label: string;
  icon: LucideIcon;
}

const SETTINGS_TABS: SettingTab[] = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Safety", icon: Eye },
  { id: "appearance", label: "Appearance", icon: Smartphone },
  { id: "language", label: "Language", icon: Globe },
];

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="flex flex-col h-screen w-full bg-background transition-colors duration-300 overflow-hidden">
      {/* Header - Aligned with the Nexus brand */}
      <header className="flex-none p-6 md:p-10 pb-6">
        <h1 className="text-3xl font-black tracking-tighter text-foreground italic uppercase">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Manage your account and app preferences
        </p>
      </header>

      <div className="flex flex-1 overflow-hidden px-4 md:px-10 pb-6 md:pb-10 gap-4 md:gap-8">
        {/* Left Sidebar - Navigation */}
        <aside className="hidden md:flex flex-col w-full gap-1">
          {SETTINGS_TABS.map((tab) => (
            <Link
              href={`/settings/${tab.id}`}
              key={tab.id}
              className="flex items-center gap-3 px-5 py-3.5  transition-all text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary "
            >
              <tab.icon size={18} strokeWidth={activeTab === tab.id ? 3 : 2} />
              {tab.label}
            </Link>
          ))}

          <div className="px-4 py-4">
            <Separator className="bg-border/60" />
          </div>

          <button className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all text-sm font-black uppercase tracking-widest active:scale-95">
            <LogOut size={18} />
            Log out
          </button>
        </aside>

        {/* Mobile Horizontal Scroll (Hidden on MD+) */}
        <div className="md:hidden flex-none overflow-x-auto no-scrollbar flex gap-2 mb-4">
          {SETTINGS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
