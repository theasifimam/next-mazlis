"use client";

import { useState } from "react";
import { CreatePost } from "@/components/custom/CreatePost";
import { Post } from "@/components/custom/Post";
import { avatars } from "@/lib/data/images";

type Media = {
  type: "image" | "video" | "pdf";
  url: string;
};

type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  text: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  replies?: Comment[];
};

type PostData = {
  id: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  content: string;
  media?: Media[];
  poll?: {
    question: string;
    options: { id: string; text: string; percentage: number }[];
    totalVotes: number;
    userVote?: string;
  };
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
  isLiked: boolean;
  isBookmarked: boolean;
};

export default function page() {
  const [posts, setPosts] = useState<PostData[]>([
    {
      id: "1",
      user: {
        name: "Jane Cooper",
        avatar: avatars[0],
        handle: "janecooper",
      },
      content:
        "Just finished my morning hike! The view was absolutely breathtaking. 🏞️ #NatureLover #Outdoors",
      media: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
      likes: 124,
      comments: [
        {
          id: "c1",
          user: {
            name: "Alex Morgan",
            avatar: avatars[1],
            handle: "alexmorgan",
          },
          text: "Amazing view! Where was this taken?",
          likes: 3,
          isLiked: false,
          timestamp: "1h ago",
        },
      ],
      shares: 5,
      timestamp: "2h ago",
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "2",
      user: {
        name: "Alex Morgan",
        avatar: avatars[1],
        handle: "alexmorgan",
      },
      content:
        "Working on a new project using Next.js and Tailwind CSS. The developer experience is amazing! #WebDev #Frontend",
      likes: 89,
      comments: [],
      shares: 7,
      timestamp: "4h ago",
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "3",
      user: {
        name: "Sam Wilson",
        avatar: avatars[2],
        handle: "samwilson",
      },
      content:
        "Check out this delicious recipe I tried today! Perfect for a cozy weekend meal.",
      media: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/631988/pexels-photo-631988.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
      likes: 215,
      comments: [
        {
          id: "c2",
          user: {
            name: "Jane Cooper",
            avatar: avatars[0],
            handle: "janecooper",
          },
          text: "Looks delicious! Can you share the recipe?",
          likes: 2,
          isLiked: true,
          timestamp: "30m ago",
        },
        {
          id: "c3",
          user: {
            name: "Taylor Swift",
            avatar: avatars[3],
            handle: "taylorswift",
          },
          text: "I made this last week! So good!",
          likes: 5,
          isLiked: false,
          timestamp: "15m ago",
        },
      ],
      shares: 12,
      timestamp: "6h ago",
      isLiked: false,
      isBookmarked: true,
    },
  ]);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `comment-${Date.now()}`,
            user: {
              name: "You",
              avatar: "/user.jpg",
              handle: "currentuser",
            },
            text,
            likes: 0,
            isLiked: false,
            timestamp: "Just now",
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  const handleAddPost = (content: string, media?: Media[]) => {
    const newPost: PostData = {
      id: `post-${Date.now()}`,
      user: {
        name: "Current User",
        avatar: "/user.jpg",
        handle: "currentuser",
      },
      content,
      media,
      likes: 0,
      comments: [],
      shares: 0,
      timestamp: "Just now",
      isLiked: false,
      isBookmarked: false,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <main className="flex-1 border-x max-w-2xl p-4">
      <CreatePost />
      <div className="divide-y">
        {posts.map((post) => (
          <Post
            key={post.id}
            {...post}
            onLike={() => handleLike(post.id)}
            onAddComment={(text: string) => handleAddComment(post.id, text)}
          />
        ))}
      </div>
    </main>
  );
}
