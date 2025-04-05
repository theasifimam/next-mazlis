// components/ui/poll-creator.tsx
"use client";

import { useState } from "react";
import { X, Check, Clock, ListChecks } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type PollOption = {
  id: string;
  text: string;
};

export function PollCreator({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (poll: {
    question: string;
    options: PollOption[];
    duration: number;
    multipleAnswers: boolean;
  }) => void;
}) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<PollOption[]>([
    { id: crypto.randomUUID(), text: "" },
    { id: crypto.randomUUID(), text: "" },
  ]);
  const [duration, setDuration] = useState(24);
  const [multipleAnswers, setMultipleAnswers] = useState(false);

  const addOption = () => {
    setOptions([...options, { id: crypto.randomUUID(), text: "" }]);
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter((option) => option.id !== id));
    }
  };

  const updateOption = (id: string, text: string) => {
    setOptions(
      options.map((option) => (option.id === id ? { ...option, text } : option))
    );
  };

  const handleSubmit = () => {
    if (!question.trim() || options.some((opt) => !opt.text.trim())) return;

    onCreate({
      question,
      options: options.filter((opt) => opt.text.trim()),
      duration,
      multipleAnswers,
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]  rounded-3xl">
        <DialogHeader>
          <DialogTitle>Create Poll</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 max-h-[300px] overflow-y-scroll">
          <div>
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="rounded-full"
            />
          </div>

          <div>
            <Label>Options</Label>
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option.id} className="flex items-center gap-2">
                  <Input
                    value={option.text}
                    onChange={(e) => updateOption(option.id, e.target.value)}
                    placeholder="Option"
                    className="rounded-full"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(option.id)}
                    disabled={options.length <= 2}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addOption}>
                Add Option
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <Label>Duration</Label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="bg-background border rounded-3xl px-2 py-1 text-sm "
              >
                <option value="1">1 hour</option>
                <option value="6">6 hours</option>
                <option value="24">1 day</option>
                <option value="72">3 days</option>
                <option value="168">1 week</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              <Label>Multiple answers</Label>
              <Switch
                checked={multipleAnswers}
                onCheckedChange={setMultipleAnswers}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Check className="h-4 w-4 mr-2" />
            Create Poll
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
