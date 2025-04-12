// components/ui/textarea-autosize.tsx
"use client";

import { Textarea } from "../ui/textarea";
import { useEffect, useRef } from "react";

export function TextareaAutosize({
  value,
  onChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof Textarea>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <Textarea ref={textareaRef} value={value} onChange={onChange} {...props} />
  );
}
