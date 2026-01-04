import { RightPanel } from "@/components/RightPanel";
import { Sidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full text-zinc-100 overflow-hidden relative">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* CHANGED: Removed justify-center to keep sidebars and main flush against each other */}
      <div className="flex h-full w-full max-w-[1440px] justify-center mx-auto relative z-10">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Feed - Removed flex-1 to prevent it from growing away from sidebar */}
        <main className="w-full max-w-[650px] min-w-0 bg-black/20 backdrop-blur-sm h-full flex flex-col border-x border-white/5 overflow-hidden">
          {children}
        </main>

        {/* Right Panel */}
        <aside className="hidden lg:flex w-[350px] flex-col pt-6 pb-6 h-full px-4 border-r border-white/5 shrink-0">
          <RightPanel />
        </aside>
      </div>
    </div>
  );
}
