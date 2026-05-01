export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    profile_picture: string;
    background: string;
}

export type Role = 'admin' | 'editor' | 'reviewer' | 'author' | 'reader';