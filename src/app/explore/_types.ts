export interface Post {
    id: number;
    user: {
        name: string;
        avatar: string;
        handle: string;
    };
    media: {
        type: "image" | "video";
        url: string;
    };
    likes: number;
    caption: string;
    tags: string[];
    comments: number;
    timestamp: string;
}