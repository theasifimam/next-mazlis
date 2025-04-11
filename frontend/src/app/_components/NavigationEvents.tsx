"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationEvents({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This effect doesn't need to do anything,
    // but it ensures the component re-renders on route changes
  }, [pathname, searchParams]);

  return <>{children}</>;
}
