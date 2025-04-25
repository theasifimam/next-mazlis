import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNavBar } from "./_components/TopNavbar";
import { RightSection } from "./_components/RightSection";
import { NavigationEvents } from "./_components/NavigationEvents";
import ConditionalLeftSection from "./_components/ConditionalLeftSection";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minimal Social",
  description: "A modern minimalist social media platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = true;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="flex flex-col min-h-screen justify-center items-center">
            <Toaster position="top-right" className="!rounded-3xl bg-black" />
            {isAuthenticated && <TopNavBar />}
            <div className="flex justify-center flex-1 max-w-[1200px]">
              {/* Client-side check for chat page */}
              <NavigationEvents>
                {isAuthenticated && <ConditionalLeftSection />}
                {children}
              </NavigationEvents>
              {isAuthenticated && <RightSection />}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
