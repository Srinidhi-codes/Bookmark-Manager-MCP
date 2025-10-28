"use client";

import { Bookmark } from "@/types/bookmark";
import BookmarkCard from "./BookmarkCard";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
}

export default function BookmarkList({
  bookmarks,
  onDelete,
}: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <span className="text-4xl">📚</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookmarks Yet</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Add your first bookmark to get started. Click the "Add Bookmark" button to begin building your collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {bookmarks.map((bookmark, index) => (
        <div
          key={bookmark.id}
          className="animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <BookmarkCard bookmark={bookmark} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}