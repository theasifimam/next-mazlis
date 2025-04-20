// app/profile/[username]/post/[postId]/page.tsx
"use client";

import { pics } from "@/lib/data/images";
import { Post } from "@/components/custom/Post";
import { postsData } from "@/lib/data/data";

export default function PostDetailPage({
  params,
}: {
  params: { username: string; postId: string };
}) {
  const postId = Number(params.postId);

  // Mock post data - in a real app you'd fetch this
  const post = {
    id: params.postId,
    user: {
      name: "Saifi Imam",
      avatar: "/user-avatar.jpg",
      handle: params.username || "asifimam",
    },
    content: "This is a sample post content that would be displayed in detail.",
    media: [
      {
        type: "image" as "image" | "video" | "pdf",
        url: pics[postId],
        aspectRatio: "square" as const,
      },
    ],
    likes: 42,
    comments: [
      {
        id: "1",
        user: {
          name: "Jane Smith",
          avatar: "/user-1.jpg",
          handle: "janesmith",
        },
        text: "This is amazing!",
        likes: 3,
        isLiked: false,
        timestamp: "2h ago",
      },
    ],
    shares: 5,
    timestamp: "1 day ago",
    isLiked: false,
    isBookmarked: false,
  };

  return (
    <div className="flex-1 border-x max-w-2xl p-4">
      {/* Main post */}

      <Post {...post} />

      {/* Related posts section */}
      <div className="mt-4 p-4">
        <h3 className="text-lg font-medium mb-4">
          More from {params.username}
        </h3>

        {postsData.map((p, index) => (
          <Post
            {...{
              ...p,
              media: (p.media ?? []).map((m) => ({
                ...m,
                type: m.type as "image" | "video" | "pdf",
              })),
            }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
