"use client";

import { useState } from "react";
import { CreatePost } from "@/components/custom/CreatePost";
import { Post } from "@/components/custom/Post";
import { postsData } from "@/lib/data/data";

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
  const [posts, setPosts] = useState<PostData[]>(postsData);

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
