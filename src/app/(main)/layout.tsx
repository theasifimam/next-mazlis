import Header from "@/components/main/Header";
import { RightPanel } from "@/components/RightPanel";
import { Sidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="h-screen w-full text-zinc-100 overflow-hidden relative pt-16">
        {/* Background Glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[700px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* CHANGED: Removed justify-center to keep sidebars and main flush against each other */}
        <div className="flex h-full w-full max-w-[1400px] justify-center mx-auto relative z-10">
          {/* Left Sidebar */}
          <aside className="hidden lg:flex w-[350px] flex-col h-full px-4  border-white/5 shrink-0 pt-16">
            <Sidebar />
          </aside>

          {/* Main Feed - Removed flex-1 to prevent it from growing away from sidebar */}
          <main className="w-full max-w-[700px] min-w-0 h-full flex flex-col overflow-hidden">
            {children}
          </main>

          {/* Right Panel */}
          <aside className="hidden lg:flex w-[350px] flex-col pt-6 pb-6 h-full px-4  border-white/5 shrink-0">
            <RightPanel />
          </aside>
        </div>
      </div>
    </>
  );
}
