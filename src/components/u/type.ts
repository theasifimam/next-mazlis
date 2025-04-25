export
    interface UserType {
    username: string;
    name: string;
    bio: string;
    avatar: string;
    verified: boolean;
    stats: {
        works: number;
        collaborators: number;
    };
    links: {
        title: string;
        url: string;
    }[];
}
