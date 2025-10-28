'use client'
import { useState } from 'react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { CreateBookmarkInput } from '@/types/bookmark';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import BookmarkForm from '@/components/BookmarkForm';
import BookmarkList from '@/components/BookmarkList';
import { Plus, Search, Bookmark, Sparkles } from 'lucide-react';

export default function Home() {
  const { bookmarks, loading, error, addBookmark, deleteBookmark, refetch } = useBookmarks();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddBookmark = async (data: CreateBookmarkInput) => {
    try {
      setIsSubmitting(true);
      await addBookmark(data);
      setShowAddForm(false);
    } catch (err) {
      console.log('Failed to add bookmark', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await deleteBookmark(id);
      } catch (error) {
        console.log('Failed to delete bookmark', error);
      }
    }
  };

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading your bookmarks...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Bookmark className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Bookmark Manager
                </h1>
                <p className="text-gray-600 mt-1">Organize and manage your favorite links</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80"
                />
              </div>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Bookmark
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-6 py-4">
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center justify-between">
              <p className="text-red-800">Error: {error}</p>
              <Button onClick={refetch} variant="outline" size="sm" className="text-red-600 border-red-300">
                Retry
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Bookmarks</p>
                <p className="text-3xl font-bold">{bookmarks.length}</p>
              </div>
              <Bookmark className="w-8 h-8 text-blue-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold">
                  {bookmarks.filter(b => new Date(b.createdAt).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <Plus className="w-8 h-8 text-green-200" />
            </div>
          </Card>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              Found {filteredBookmarks.length} bookmark{filteredBookmarks.length !== 1 ? 's' : ''} matching &quot;{searchQuery}&quot;
            </p>
          </div>
        )}

        {/* Bookmark List */}
        <BookmarkList bookmarks={filteredBookmarks} onDelete={handleDeleteBookmark} />
      </div>

      {/* Add Bookmark Form Modal */}
      {showAddForm && (
        <BookmarkForm
          onSubmit={handleAddBookmark}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Close modal on backdrop click */}
      {showAddForm && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}