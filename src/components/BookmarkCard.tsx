import { Bookmark } from '@/types/bookmark';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Trash2, Calendar } from 'lucide-react';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
}

export default function BookmarkCard({ bookmark, onDelete }: BookmarkCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch (error) {
      return 'Invalid URL';
    }
  };

  const getCategoryColor = (category?: string) => {
    const colors = {
      Development: 'bg-blue-100 text-blue-800 border-blue-200',
      Design: 'bg-purple-100 text-purple-800 border-purple-200',
      Tools: 'bg-green-100 text-green-800 border-green-200',
      Learning: 'bg-orange-100 text-orange-800 border-orange-200',
      Entertainment: 'bg-pink-100 text-pink-800 border-pink-200',
      News: 'bg-red-100 text-red-800 border-red-200',
      Other: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category as keyof typeof colors] || colors.Other;
  };

  return (
    <Card className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:border-blue-300/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold shadow-lg">
              {bookmark.favicon || bookmark.title.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-wrap text-gray-900 text-lg mb-1 truncate group-hover:text-blue-600 transition-colors">
                {bookmark.title}
              </h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(bookmark.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium group/link"
          >
            <span className="truncate">{getDomain(bookmark.url)}</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>

          {bookmark.notes && (
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {bookmark.notes}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
            <Calendar className="w-3 h-3" />
            <span>Added {formatDate(bookmark.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}