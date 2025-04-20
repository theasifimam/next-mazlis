import { avatars } from "./images";

export const suggestedUsers = [
  {
    id: "1",
    name: "John Doe",
    handle: "johndoe",
    followers: 12345,
    isVerified: true,
    bio: "Tech enthusiast",
  },
  {
    id: "2",
    name: "Design Daily",
    handle: "designdaily",
    followers: 125,
    isVerified: false,
    bio: "My Life- Design",
  },
  {
    id: "3",
    name: "Web Dev",
    handle: "webdev",
    followers: 45,
    isVerified: true,
    bio: "WEB Love",
  },
  {
    id: "4",
    name: "John Doe",
    handle: "johndoe",
    followers: 12345,
    isVerified: true,
    bio: "Tech enthusiast",
  },
  {
    id: "5",
    name: "Design Daily",
    handle: "designdaily",
    followers: 125,
    isVerified: false,
    bio: "My Life- Design",
  },
  {
    id: "6",
    name: "Web Dev",
    handle: "webdev",
    followers: 45,
    isVerified: true,
    bio: "WEB Love",
  },
];

export const trendingTopics = [
  { id: "1", tag: "#MinimalDesign", posts: "24.5K", category: "Design" },
  { id: "2", tag: "#NextJS", posts: "18.2K", category: "Development" },
  { id: "3", tag: "#UIUX", posts: "15.7K", category: "Design" },
];

export const postsData = [
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
];
