// app/chat/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  MoreVertical,
  Smile,
  Paperclip,
  Send,
  Check,
  CheckCheck,
  Heart,
  MessageSquare,
  ArrowLeft,
  Image as ImageIcon,
  Video,
  FileText,
  Download,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MyEmojiPicker } from "@/app/_components/emoji-picker";
import { pics } from "@/lib/data/images";

type Message = {
  id: string;
  sender: "me" | "them";
  content: {
    type: "text" | "image" | "video" | "file";
    text?: string;
    url?: string;
    fileName?: string;
    fileSize?: string;
  };
  time: string;
  status: "sent" | "delivered" | "read";
  reactions?: string[];
  replyTo?: {
    id: string;
    text: string;
    sender: string;
  };
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "them",
      content: {
        type: "text",
        text: "Hey there! How's it going?",
      },
      time: "10:30 AM",
      status: "read",
    },
    {
      id: "2",
      sender: "me",
      content: {
        type: "text",
        text: "Pretty good! Just working on that project we discussed.",
      },
      time: "10:32 AM",
      status: "read",
    },
    {
      id: "3",
      sender: "them",
      content: {
        type: "text",
        text: "Nice! Do you need any help with it?",
      },
      time: "10:33 AM",
      status: "read",
    },
    {
      id: "4",
      sender: "me",
      content: {
        type: "image",
        url: pics[0],
        text: "Here's the design mockup",
      },
      time: "10:35 AM",
      status: "delivered",
    },
    {
      id: "5",
      sender: "them",
      content: {
        type: "text",
        text: "This looks great! I'll review it and send feedback soon.",
      },
      time: "10:36 AM",
      status: "read",
      replyTo: {
        id: "4",
        text: "Here's the design mockup",
        sender: "me",
      },
    },
    {
      id: "6",
      sender: "them",
      content: {
        type: "file",
        fileName: "Project_Specs.pdf",
        fileSize: "2.4 MB",
        text: "Here's the project specs document",
      },
      time: "10:38 AM",
      status: "read",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [reactingTo, setReactingTo] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim() && !replyingTo) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "me",
      content: {
        type: "text",
        text: newMessage,
      },
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    if (replyingTo) {
      newMsg.replyTo = {
        id: replyingTo.id,
        text: replyingTo.content.text || "",
        sender: replyingTo.sender,
      };
    }

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setReplyingTo(null);
  };

  const addReaction = (messageId: string, reaction: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          return {
            ...msg,
            reactions: [...(msg.reactions || []), reaction],
          };
        }
        return msg;
      })
    );
    setReactingTo(null);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessageContent = (message: Message) => {
    switch (message.content.type) {
      case "image":
        return (
          <div className="space-y-1">
            <div className="rounded-lg overflow-hidden">
              <img
                src={message.content.url}
                alt="Shared image"
                className="max-w-full max-h-64 object-cover"
              />
            </div>
            {message.content.text && <p>{message.content.text}</p>}
          </div>
        );
      case "video":
        return (
          <div className="space-y-1">
            <div className="rounded-lg overflow-hidden">
              <video
                src={message.content.url}
                controls
                className="max-w-full max-h-64"
              />
            </div>
            {message.content.text && <p>{message.content.text}</p>}
          </div>
        );
      case "file":
        return (
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
            <div className="bg-background p-2 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{message.content.fileName}</p>
              <p className="text-xs text-muted-foreground">
                {message.content.fileSize}
              </p>
              {message.content.text && (
                <p className="text-sm mt-1">{message.content.text}</p>
              )}
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        );
      default:
        return <p>{message.content.text}</p>;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3rem)]">
      {/* Chat header */}
      <div className="border-b p-4 flex items-center justify-between sticky top-0 bg-background z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/sarah.jpg" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Sarah Johnson</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Online
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "me" ? "justify-end" : "justify-start"
            )}
          >
            <div className="max-w-[85%]">
              {/* Reply indicator */}
              {message.replyTo && (
                <div
                  className={cn(
                    "text-xs p-2 mb-1 rounded-t-xl border border-b-0",
                    message.sender === "me"
                      ? "bg-primary/10 text-primary border-primary/20 ml-8"
                      : "bg-muted/50 text-muted-foreground border-muted mr-8"
                  )}
                >
                  Replying to{" "}
                  {message.replyTo.sender === "me"
                    ? "yourself"
                    : message.replyTo.sender}
                  <p className="font-medium truncate">
                    "{message.replyTo.text}"
                  </p>
                </div>
              )}

              {/* Message bubble */}
              <div
                className={cn(
                  "rounded-2xl px-2 py-2 relative group",
                  message.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted rounded-tl-none"
                )}
              >
                {renderMessageContent(message)}

                <div
                  className={cn(
                    "flex items-center justify-end gap-1 text-xs",
                    message.sender === "me"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  <span>{message.time}</span>
                  {message.sender === "me" && (
                    <span>
                      {message.status === "sent" && (
                        <Check className="h-3 w-3" />
                      )}
                      {message.status === "delivered" && (
                        <CheckCheck className="h-3 w-3" />
                      )}
                      {message.status === "read" && (
                        <CheckCheck className="h-3 w-3 text-blue-400" />
                      )}
                    </span>
                  )}
                </div>

                {/* Reaction button (hover) */}
                <div
                  className={cn(
                    "absolute -bottom-3 flex items-center justify-center gap-1 w-full",
                    message.sender === "me" ? "right-0" : "left-0"
                  )}
                >
                  {message.reactions?.map((reaction, i) => (
                    <span
                      key={i}
                      className="text-xs bg-background border rounded-full h-6 w-6 flex items-center justify-center"
                    >
                      {reaction}
                    </span>
                  ))}
                </div>

                {/* Message actions (hover) */}
                <div
                  className={cn(
                    "absolute -top-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                    message.sender === "me" ? "right-2" : "left-2"
                  )}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full p-0 bg-background"
                      >
                        <Heart className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align={message.sender === "me" ? "end" : "start"}
                    >
                      <div className="flex gap-1 p-1">
                        {["❤️", "😂", "😮", "😢", "👍", "👎"].map((emoji) => (
                          <Button
                            key={emoji}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-lg"
                            onClick={() => addReaction(message.id, emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full p-0 bg-background"
                    onClick={() => setReplyingTo(message)}
                  >
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply preview */}
      {replyingTo && (
        <div className="border-t p-2 bg-muted/50 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium">
              Replying to{" "}
              {replyingTo.sender === "me" ? "yourself" : replyingTo.sender}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-[80%]">
              {replyingTo.content.text}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setReplyingTo(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Message input */}
      <div className="border-t p-4 bg-background">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem className="gap-2">
                <ImageIcon className="h-4 w-4" />
                Photo/Video
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Video className="h-4 w-4" />
                Camera
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <FileText className="h-4 w-4" />
                Document
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            placeholder="Type a message..."
            className="flex-1 rounded-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />

          {newMessage ? (
            <Button
              size="icon"
              className="rounded-full"
              onClick={handleSendMessage}
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <MyEmojiPicker
              onChange={(emoji) => setNewMessage((prev) => prev + emoji)}
            >
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
            </MyEmojiPicker>
          )}
        </div>
      </div>
    </div>
  );
}
