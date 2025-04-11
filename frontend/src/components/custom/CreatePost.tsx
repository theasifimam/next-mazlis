// app/components/CreatePost.tsx
"use client";

import { useState, useRef, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Smile, MapPin, Calendar, X, Vote } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PollCreator } from "@/components/custom/PollCreator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MyEmojiPicker } from "./EmojiPicker";

type PollOption = {
  id: string;
  text: string;
};

type PollData = {
  question: string;
  options: PollOption[];
  duration: number; // in hours
  multipleAnswers: boolean;
};

export function CreatePost() {
  const [content, setContent] = useState("");
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollData, setPollData] = useState<PollData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const textBefore = content.substring(0, startPos);
    const textAfter = content.substring(endPos, content.length);

    setContent(textBefore + emoji + textAfter);

    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd =
          startPos + emoji.length;
      }
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !pollData) return;

    setIsSubmitting(true);

    try {
      const postData = {
        content,
        poll: pollData,
        createdAt: new Date().toISOString(),
      };

      console.log("Post submitted:", postData);

      setContent("");
      setPollData(null);
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 mb-4">
      <div className="flex gap-3 mb-3">
        <Avatar>
          <AvatarImage src="https://img.freepik.com/free-vector/young-man-with-glasses-illustration_1308-174706.jpg?t=st=1743313467~exp=1743317067~hmac=600f8b3e9729539ee6c7d141e5bd520eee15f4cee87b181d8c669b05dcdf03c5&w=740" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            placeholder="What's on your mind?"
            className="min-h-[100px] border-none text-lg focus-visible:ring-0 resize-none bg-transparent"
            value={content}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setContent(e.target.value)
            }
          />

          {pollData && (
            <div className="mb-4 border rounded-3xl p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{pollData.question}</h4>
                <button
                  type="button"
                  onClick={() => setPollData(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {pollData.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-8 px-3 flex items-center">
                      {option.text}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {pollData.multipleAnswers
                  ? "Multiple answers allowed"
                  : "Single answer only"}{" "}
                • Closes in {pollData.duration}{" "}
                {pollData.duration === 1 ? "hour" : "hours"}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-800">
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPollCreator(true)}
            disabled={isSubmitting || !!pollData}
          >
            <Vote className="w-4 h-4 mr-2 text-purple-500" />
            Poll
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isSubmitting}
              >
                <Smile className="w-4 h-4 mr-2 text-yellow-500" />
                Emoji
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <MyEmojiPicker onSelect={handleEmojiSelect} />
            </PopoverContent>
          </Popover>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isSubmitting}
          >
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            Location
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isSubmitting}
          >
            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
            Event
          </Button>
        </div>

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting || (!content.trim() && !pollData)}
          className="rounded-full !cursor-pointer"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>

      {showPollCreator && (
        <PollCreator
          onClose={() => setShowPollCreator(false)}
          onCreate={(poll: SetStateAction<PollData | null>) => {
            setPollData(poll);
            setShowPollCreator(false);
          }}
        />
      )}
    </div>
  );
}
