export interface Bookmark {
    id: string;
    favicon?: string;
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
    notes?: string;
    category?: string; // ✅ add this line
  }
  