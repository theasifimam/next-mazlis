"use client";

import { usePathname } from "next/navigation";
import { LeftSection } from "./LeftSection";

// Client component to conditionally render LeftSection
export default function ConditionalLeftSection() {
  const pathname = usePathname();
  const isChatPage = pathname?.startsWith("/chat");

  return !isChatPage ? <LeftSection /> : null;
}
