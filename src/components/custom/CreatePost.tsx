// app/components/CreatePost.tsx
"use client";

import {
  useState,
  useRef,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Smile,
  MapPin,
  Calendar,
  X,
  Vote,
  Image as ImageIcon,
  Video,
  FileText,
  Paperclip,
  User,
  Globe,
  Users,
  Lock,
  ChevronDown,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PollCreator } from "@/components/custom/PollCreator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MyEmojiPicker } from "./EmojiPicker";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Dummy data for locations
const DUMMY_LOCATIONS = [
  { id: "1", name: "New York, NY", lat: 40.7128, lng: -74.006 },
  { id: "2", name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
  { id: "3", name: "London, UK", lat: 51.5074, lng: -0.1278 },
  { id: "4", name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
  { id: "5", name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
];

// Dummy data for events
const DUMMY_EVENTS = [
  {
    id: "1",
    name: "Tech Conference 2025",
    date: "2025-05-15",
    location: "San Francisco Convention Center",
  },
  {
    id: "2",
    name: "Summer Music Festival",
    date: "2025-06-23",
    location: "Central Park",
  },
  {
    id: "3",
    name: "Product Launch",
    date: "2025-05-10",
    location: "Virtual Event",
  },
  {
    id: "4",
    name: "Community Meetup",
    date: "2025-05-05",
    location: "Downtown Coffee Shop",
  },
];

// Privacy options
const PRIVACY_OPTIONS = [
  { value: "public", label: "Public", icon: Globe },
  { value: "friends", label: "Friends", icon: Users },
  { value: "private", label: "Only me", icon: Lock },
];

// Tags for people
const DUMMY_FRIENDS = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "alexj",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Taylor Swift",
    username: "taylorswift",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Mike Roberts",
    username: "miker",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Sarah Connor",
    username: "sarahc",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "5",
    name: "David Liu",
    username: "davidl",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

type MediaItem = {
  id: string;
  type: "image" | "video" | "pdf" | "link";
  url: string;
  name: string;
  thumbnail?: string;
  caption?: string;
};

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

type TaggedPerson = {
  id: string;
  name: string;
  username: string;
  avatar?: string;
};

type LocationData = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type EventData = {
  id: string;
  name: string;
  date: string;
  location: string;
};

export function CreatePost() {
  const [content, setContent] = useState("");
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollData, setPollData] = useState<PollData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [caption, setCaption] = useState("");
  const [showCaptionInput, setShowCaptionInput] = useState(false);
  const [privacy, setPrivacy] = useState<string>("public");
  const [feelingActivity, setFeelingActivity] = useState<string>("");
  const [showEmojiForFeeling, setShowEmojiForFeeling] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [showEventPicker, setShowEventPicker] = useState(false);
  const [eventSearch, setEventSearch] = useState("");
  const [taggedPeople, setTaggedPeople] = useState<TaggedPerson[]>([]);
  const [showPeoplePicker, setShowPeoplePicker] = useState(false);
  const [peopleSearch, setPeopleSearch] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkPreview, setLinkPreview] = useState<MediaItem | null>(null);
  const [isLoadingLinkPreview, setIsLoadingLinkPreview] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const MAX_CHARACTERS = 2000;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captionInputRef = useRef<HTMLInputElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCharacterCount(content.length);
  }, [content]);

  const handleEmojiSelect = (emoji: string) => {
    if (showEmojiForFeeling) {
      setFeelingActivity((prev) => prev + emoji);
      setShowEmojiForFeeling(false);
      return;
    }

    const textarea = textareaRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const textBefore = content.substring(0, startPos);
    const textAfter = content.substring(endPos, content.length);

    const newContent = textBefore + emoji + textAfter;
    if (newContent.length <= MAX_CHARACTERS) {
      setContent(newContent);
    } else {
      toast("Character limit reached", {
        description: `You can use up to ${MAX_CHARACTERS} characters.`,
      });
    }

    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd =
          startPos + emoji.length;
      }
    }, 0);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the maximum (10 files)
    if (mediaItems.length + files.length > 10) {
      toast("Too many files", {
        description: "You can upload maximum 10 files per post.",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setIsUploading(true);

    // Simulate uploading with progress for demonstration
    const totalFiles = files.length;
    let loadedFiles = 0;
    const interval = setInterval(() => {
      loadedFiles++;
      setUploadProgress(Math.min((loadedFiles / totalFiles) * 100, 95));
      if (loadedFiles >= totalFiles) {
        clearInterval(interval);

        // Process each file
        const newMediaItems: MediaItem[] = [];

        Array.from(files).forEach((file, index) => {
          const fileId = `media-${Date.now()}-${index}`;
          const fileType = file.type.startsWith("image/")
            ? "image"
            : file.type.startsWith("video/")
            ? "video"
            : "pdf";

          // Create object URLs for preview
          const url = URL.createObjectURL(file);

          newMediaItems.push({
            id: fileId,
            type: fileType,
            url: url,
            name: file.name,
            thumbnail: fileType === "image" ? url : undefined,
          });
        });

        setMediaItems((prev) => [...prev, ...newMediaItems]);
        setIsUploading(false);
        setUploadProgress(100);

        // Show caption input if images were uploaded
        if (newMediaItems.some((item) => item.type === "image")) {
          setShowCaptionInput(true);
          setTimeout(() => {
            captionInputRef.current?.focus();
          }, 0);
        }

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        setTimeout(() => {
          setUploadProgress(0);
        }, 1000);
      }
    }, 500);
  };

  const removeMediaItem = (id: string) => {
    setMediaItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      if (updatedItems.length === 0) {
        setShowCaptionInput(false);
        setCaption("");
      }
      return updatedItems;
    });
  };

  const handleAddLink = () => {
    if (!linkUrl.trim()) {
      toast("Empty URL", { description: "Please enter a valid URL." });
      return;
    }

    // Basic URL validation
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(linkUrl)) {
      toast("Invalid URL", { description: "Please enter a valid URL format." });
      return;
    }

    setIsLoadingLinkPreview(true);

    // Simulate fetching link preview data
    setTimeout(() => {
      // Create dummy preview data
      const formattedUrl = linkUrl.startsWith("http")
        ? linkUrl
        : `https://${linkUrl}`;
      const domain = new URL(formattedUrl).hostname;

      const newLinkPreview: MediaItem = {
        id: `link-${Date.now()}`,
        type: "link",
        url: formattedUrl,
        name: `Content from ${domain}`,
        thumbnail: "https://picsum.photos/600/400",
        caption: `Preview of content from ${domain}`,
      };

      setLinkPreview(newLinkPreview);
      setMediaItems((prev) => [...prev, newLinkPreview]);
      setIsLoadingLinkPreview(false);
      setShowLinkInput(false);
      setLinkUrl("");
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!content.trim() && !pollData && mediaItems.length === 0) {
      toast("Nothing to post", {
        description:
          "Please add content, media, or create a poll before posting.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create dummy submission data
      const postData = {
        content,
        media: mediaItems,
        poll: pollData,
        caption: caption.trim() || null,
        privacy,
        location: selectedLocation,
        event: selectedEvent,
        taggedPeople,
        feelingActivity: feelingActivity || null,
        createdAt: new Date().toISOString(),
      };

      console.log("Post submitted:", postData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success message
      toast("Post created!", {
        description: "Your post has been published successfully.",
      });

      // Reset all fields
      setContent("");
      setPollData(null);
      setMediaItems([]);
      setCaption("");
      setShowCaptionInput(false);
      setTaggedPeople([]);
      setSelectedLocation(null);
      setSelectedEvent(null);
      setFeelingActivity("");
      setLinkPreview(null);
    } catch (error) {
      console.error("Error submitting post:", error);
      toast("Failed to create post", {
        description:
          "There was an error publishing your post. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadButtonClick = useCallback((fileType?: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute(
        "accept",
        fileType === "image"
          ? "image/*"
          : fileType === "video"
          ? "video/*"
          : fileType === "pdf"
          ? "application/pdf"
          : "image/*,video/*,application/pdf"
      );
      fileInputRef.current.click();
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_CHARACTERS) {
      setContent(newContent);
    } else {
      setContent(newContent.substring(0, MAX_CHARACTERS));
      toast("Character limit reached", {
        description: `You can use up to ${MAX_CHARACTERS} characters.`,
      });
    }
  };

  const filteredLocations = DUMMY_LOCATIONS.filter((location) =>
    location.name.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredEvents = DUMMY_EVENTS.filter(
    (event) =>
      event.name.toLowerCase().includes(eventSearch.toLowerCase()) ||
      event.location.toLowerCase().includes(eventSearch.toLowerCase())
  );

  const filteredPeople = DUMMY_FRIENDS.filter(
    (person) =>
      person.name.toLowerCase().includes(peopleSearch.toLowerCase()) ||
      person.username.toLowerCase().includes(peopleSearch.toLowerCase())
  );

  const handleAddTag = (person: TaggedPerson) => {
    // Check if person is already tagged
    if (!taggedPeople.some((p) => p.id === person.id)) {
      setTaggedPeople((prev) => [...prev, person]);
    }
    setPeopleSearch("");
  };

  const handleRemoveTag = (id: string) => {
    setTaggedPeople((prev) => prev.filter((person) => person.id !== id));
  };

  const handleSelectLocation = (location: LocationData) => {
    setSelectedLocation(location);
    setShowLocationPicker(false);
    setLocationSearch("");
  };

  const handleSelectEvent = (event: EventData) => {
    setSelectedEvent(event);
    setShowEventPicker(false);
    setEventSearch("");
  };

  const renderMediaPreview = () => {
    if (mediaItems.length === 0) return null;

    return (
      <div className="mt-4 mb-3">
        <Carousel className="w-full">
          <CarouselContent className="h-64">
            {mediaItems.map((item) => (
              <CarouselItem key={item.id} className="relative">
                <div className="h-full flex items-center justify-center rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {item.type === "image" && (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  )}
                  {item.type === "video" && (
                    <video
                      src={item.url}
                      controls
                      className="h-full w-full object-contain"
                    >
                      Your browser does not support video playback.
                    </video>
                  )}
                  {item.type === "pdf" && (
                    <div className="flex flex-col items-center justify-center p-4">
                      <FileText className="w-16 h-16 text-gray-400" />
                      <span className="mt-2 text-sm font-medium max-w-xs truncate">
                        {item.name}
                      </span>
                    </div>
                  )}
                  {item.type === "link" && (
                    <div className="h-full w-full relative">
                      <img
                        src={item.thumbnail}
                        alt="Link preview"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                        <div className="text-sm font-medium truncate">
                          {item.name}
                        </div>
                        <div className="text-xs truncate text-gray-300">
                          {item.url}
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    className="absolute top-2 right-2 bg-black/70 rounded-full p-1 hover:bg-black/90 transition-colors"
                    onClick={() => removeMediaItem(item.id)}
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {mediaItems.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>

        {showCaptionInput && (
          <div className="mt-3 flex items-center rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <input
              ref={captionInputRef}
              type="text"
              placeholder="Add a caption..."
              className="flex-1 px-3 py-2 bg-transparent focus:outline-none"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            {caption && (
              <button
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setCaption("")}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderMetadata = () => {
    if (
      !selectedLocation &&
      !selectedEvent &&
      !taggedPeople.length &&
      !feelingActivity
    )
      return null;

    return (
      <div className="mt-3 border-t border-gray-200 dark:border-gray-800 pt-3 space-y-2 text-sm">
        {feelingActivity && (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span>Feeling: {feelingActivity}</span>
            <button
              className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setFeelingActivity("")}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {selectedLocation && (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{selectedLocation.name}</span>
            <button
              className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setSelectedLocation(null)}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {selectedEvent && (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            <span>
              {selectedEvent.name} •{" "}
              {new Date(selectedEvent.date).toLocaleDateString()}
            </span>
            <button
              className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setSelectedEvent(null)}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {taggedPeople.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400">
            <User className="w-3 h-3" />
            <span>With:</span>
            <div className="flex flex-wrap gap-1">
              {taggedPeople.map((person) => (
                <Badge
                  key={person.id}
                  variant="secondary"
                  className="pl-1 pr-0 py-0 flex items-center"
                >
                  <span className="text-xs">{person.name}</span>
                  <button
                    className="ml-1 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                    onClick={() => handleRemoveTag(person.id)}
                  >
                    <X className="w-2 h-2" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://img.freepik.com/free-vector/young-man-with-glasses-illustration_1308-174706.jpg?t=st=1743313467~exp=1743317067~hmac=600f8b3e9729539ee6c7d141e5bd520eee15f4cee87b181d8c669b05dcdf03c5&w=740" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">David Anderson</div>
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger className="h-auto w-auto border-none px-0 py-0 font-normal text-xs bg-transparent">
                <SelectValue placeholder="Privacy" />
              </SelectTrigger>
              <SelectContent>
                {PRIVACY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <option.icon className="w-4 h-4 mr-2" />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {characterCount}/{MAX_CHARACTERS}
        </div>
      </div>

      <div className="flex gap-3 mb-3">
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            placeholder="What's on your mind?"
            className="min-h-[100px] border-none text-lg focus-visible:ring-0 resize-none bg-transparent"
            value={content}
            onChange={handleContentChange}
          />

          {renderMediaPreview()}
          {renderMetadata()}

          {isUploading && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Uploading files...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {showLinkInput && (
            <div className="mt-4 mb-3">
              <div className="flex gap-2">
                <Input
                  ref={linkInputRef}
                  type="text"
                  placeholder="Paste or type a link..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  disabled={isLoadingLinkPreview}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddLink}
                  disabled={isLoadingLinkPreview || !linkUrl.trim()}
                >
                  {isLoadingLinkPreview ? "Loading..." : "Add"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowLinkInput(false);
                    setLinkUrl("");
                  }}
                  disabled={isLoadingLinkPreview}
                >
                  Cancel
                </Button>
              </div>
              {isLoadingLinkPreview && (
                <div className="mt-2">
                  <Progress value={70} className="h-2" />
                  <div className="text-xs text-center mt-1 text-gray-500">
                    Fetching preview...
                  </div>
                </div>
              )}
            </div>
          )}

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
        <div className="flex gap-1 overflow-x-auto pb-1 -mb-1 !scrollbar-hide">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isSubmitting}
              >
                <Paperclip className="w-4 h-4 mr-2 text-blue-500" />
                <span className="hidden sm:inline">Attach</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => handleUploadButtonClick("image")}
                >
                  <ImageIcon className="w-4 h-4 mr-2 text-blue-500" />
                  Photo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => handleUploadButtonClick("video")}
                >
                  <Video className="w-4 h-4 mr-2 text-red-500" />
                  Video
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => handleUploadButtonClick("pdf")}
                >
                  <FileText className="w-4 h-4 mr-2 text-orange-500" />
                  Document
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => setShowLinkInput(true)}
                  disabled={showLinkInput}
                >
                  <LinkIcon className="w-4 h-4 mr-2 text-green-500" />
                  Link
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPollCreator(true)}
                  disabled={isSubmitting || !!pollData}
                >
                  <Vote className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="hidden sm:inline">Poll</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Create a poll</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isSubmitting}
              >
                <Smile className="w-4 h-4 mr-2 text-yellow-500" />
                <span className="hidden sm:inline">Emoji</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <MyEmojiPicker onSelect={handleEmojiSelect} />
            </PopoverContent>
          </Popover>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLocationPicker(true)}
                  disabled={isSubmitting || !!selectedLocation}
                >
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  <span className="hidden sm:inline">Location</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add location</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEventPicker(true)}
                  disabled={isSubmitting || !!selectedEvent}
                >
                  <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                  <span className="hidden sm:inline">Event</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tag an event</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPeoplePicker(true)}
                  disabled={isSubmitting}
                >
                  <User className="w-4 h-4 mr-2 text-green-500" />
                  <span className="hidden sm:inline">Tag</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tag people</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isSubmitting}
              >
                <span className="flex items-center">
                  <Smile className="w-4 h-4 mr-2 text-pink-500" />
                  <span className="hidden sm:inline">Feeling</span>
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <div className="p-2">
                <h3 className="text-sm font-medium mb-2">
                  How are you feeling?
                </h3>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Feeling..."
                    value={feelingActivity}
                    onChange={(e) => setFeelingActivity(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowEmojiForFeeling(true)}
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                {showEmojiForFeeling && (
                  <div className="mt-2">
                    <MyEmojiPicker onSelect={handleEmojiSelect} />
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            (!content.trim() && !pollData && mediaItems.length === 0)
          }
          className="rounded-full !cursor-pointer"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
        multiple
      />

      {/* Poll Creator Dialog */}
      {showPollCreator && (
        <PollCreator
          onClose={() => setShowPollCreator(false)}
          onCreate={(poll: SetStateAction<PollData | null>) => {
            setPollData(poll);
            setShowPollCreator(false);
          }}
        />
      )}

      {/* Location Picker Dialog */}
      <Dialog open={showLocationPicker} onOpenChange={setShowLocationPicker}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Location</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search locations..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="flex-1"
              />
              {locationSearch && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLocationSearch("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="max-h-60 overflow-y-auto border rounded-md">
              {filteredLocations.length > 0 ? (
                <div className="divide-y">
                  {filteredLocations.map((location) => (
                    <button
                      key={location.id}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                      onClick={() => handleSelectLocation(location)}
                    >
                      <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>{location.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No locations found
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLocationPicker(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Picker Dialog */}
      <Dialog open={showEventPicker} onOpenChange={setShowEventPicker}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search events..."
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                className="flex-1"
              />
              {eventSearch && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEventSearch("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="max-h-60 overflow-y-auto border rounded-md">
              {filteredEvents.length > 0 ? (
                <div className="divide-y">
                  {filteredEvents.map((event) => (
                    <button
                      key={event.id}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                      onClick={() => handleSelectEvent(event)}
                    >
                      <Calendar className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{event.name}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString()} •{" "}
                          {event.location}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No events found
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventPicker(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* People Tag Picker Dialog */}
      <Dialog open={showPeoplePicker} onOpenChange={setShowPeoplePicker}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tag People</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {taggedPeople.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {taggedPeople.map((person) => (
                  <Badge
                    key={person.id}
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    <span>{person.name}</span>
                    <button
                      className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                      onClick={() => handleRemoveTag(person.id)}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <Input
                placeholder="Search people..."
                value={peopleSearch}
                onChange={(e) => setPeopleSearch(e.target.value)}
                className="flex-1"
              />
              {peopleSearch && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPeopleSearch("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="max-h-60 overflow-y-auto border rounded-3xl">
              {filteredPeople.length > 0 ? (
                <div className="divide-y">
                  {filteredPeople.map((person) => (
                    <button
                      key={person.id}
                      className={cn(
                        "w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3",
                        taggedPeople.some((p) => p.id === person.id) &&
                          "bg-blue-50 dark:bg-blue-900/20"
                      )}
                      onClick={() => handleAddTag(person)}
                      disabled={taggedPeople.some((p) => p.id === person.id)}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={person.avatar} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{person.name}</div>
                        <div className="text-xs text-gray-500">
                          @{person.username}
                        </div>
                      </div>
                      {taggedPeople.some((p) => p.id === person.id) && (
                        <div className="ml-auto">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                          >
                            Tagged
                          </Badge>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No people found
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <div className="text-sm text-gray-500">
              {taggedPeople.length}{" "}
              {taggedPeople.length === 1 ? "person" : "people"} tagged
            </div>
            <Button
              variant="outline"
              onClick={() => setShowPeoplePicker(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
