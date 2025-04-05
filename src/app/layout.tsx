import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNavBar } from "./_components/TopNavbar";
import { LeftSection } from "./_components/LeftSection";
import { RightSection } from "./_components/RightSection";
import { NavigationEvents } from "./_components/NavigationEvents";
import ConditionalLeftSection from "./_components/ConditionalLeftSection";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="flex flex-col min-h-screen justify-center items-center">
            <TopNavBar />
            <div className="flex justify-center flex-1 max-w-[1200px]">
              {/* Client-side check for chat page */}
              <NavigationEvents>
                <ConditionalLeftSection />
                {children}
              </NavigationEvents>
              <RightSection />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
