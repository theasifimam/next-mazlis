// app/(chat)/layout.tsx

import ConversationLeftSection from "./_components/ConversationLeftSide";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <ConversationLeftSection />
        {children}
      </div>
    </div>
  );
}
