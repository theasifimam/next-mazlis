"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SettingBreadCrumb({
  children,
}: {
  children?: React.ReactNode;
}) {
  const pathname = usePathname();

  // Split pathname into segments: e.g., "/settings/account" -> ["settings", "account"]
  const segments = pathname.split("/").filter((item) => item !== "");

  return (
    <div className="w-full flex flex-col gap-6 bg-card">
      <nav className="flex items-center gap-2 p-4">
        {/* Root Link */}
        <Link
          href="/"
          className="text-muted-foreground hover:text-primary transition-colors p-1"
        >
          <Home size={26} />
        </Link>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;

          return (
            <React.Fragment key={segment}>
              <ChevronRight size={14} className="text-muted-foreground/50" />
              <Link
                href={href}
                className={cn(
                  "text-[16px] font-black uppercase tracking-[0.2em] transition-colors",
                  isLast
                    ? "text-primary cursor-default"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {segment.replace("-", " ")}
              </Link>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Main Content Slot */}
      <div className="w-full animate-in fade-in slide-in-from-left-4 duration-500">
        {children}
      </div>
    </div>
  );
}
