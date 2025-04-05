import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

// app/chat/default.tsx
export default function ChatDefault() {
  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <div className="text-center p-8">
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Select a conversation</h3>
        <p className="mt-1 text-muted-foreground">
          Choose from your existing conversations or start a new one
        </p>
        <Button className="mt-2 rounded-full">New Message</Button>
      </div>
    </div>
  );
}
