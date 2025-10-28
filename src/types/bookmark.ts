export interface Bookmark {
    id: string;
    url: string;
    title: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface CreateBookmarkInput {
    url: string;
    title: string;
    notes: string;
}