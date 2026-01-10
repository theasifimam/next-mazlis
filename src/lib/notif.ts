// 1. Precise Type Definitions
export type NotificationType = "like" | "follow" | "mention" | "zap";

export interface User {
    name: string;
    handle: string;
    avatar: string;
}


export interface NotificationData {
    id: number;
    type: NotificationType;
    user: User;
    content: string;
    time: string;
    isUnread: boolean;
}

// 2. Mock Data with Explicit Typing
export const NOTIFICATIONS: NotificationData[] = [
    {
        id: 1,
        type: "like",
        user: {
            name: "Sarah Chen",
            handle: "@schen_ui",
            avatar: "https://i.pravatar.cc/150?u=sarah",
        },
        content: "liked your post: 'The Future of Spatial UI Design'",
        time: "2m ago",
        isUnread: true,
    },
    {
        id: 2,
        type: "follow",
        user: {
            name: "Marcus Wright",
            handle: "@mwright",
            avatar: "https://i.pravatar.cc/150?u=marcus",
        },
        content: "started following you",
        time: "15m ago",
        isUnread: true,
    },
    {
        id: 3,
        type: "mention",
        user: {
            name: "John Doe",
            handle: "@johndoe",
            avatar: "https://i.pravatar.cc/150?u=johndoe",
        },
        content:
            "Mentioned you in a comment: 'The Future of Spatial UI Design' by @schen_ui",
        time: "1h ago",
        isUnread: false,
    },
    {
        id: 4,
        type: "zap",
        user: {
            name: "Jane Doe",
            handle: "@janedoe",
            avatar: "https://i.pravatar.cc/150?u=janedoe",
        },
        content: "Zapped you: 'The Future of Spatial UI Design' by @schen_ui",
        time: "2h ago",
        isUnread: false,
    },
    {
        id: 5,
        type: "like",
        user: {
            name: "Sarah Chen",
            handle: "@schen_ui",
            avatar: "https://i.pravatar.cc/150?u=sarah",
        },
        content: "liked your post: 'The Future of Spatial UI Design'",
        time: "2m ago",
        isUnread: true,
    },
];