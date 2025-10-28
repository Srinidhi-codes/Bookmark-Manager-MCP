"use client";

import { useState } from "react";
import { CreateBookmarkInput } from "@/types/bookmark";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BookmarkFormProps {
  onSubmit: (data: CreateBookmarkInput) => void;
  initialData?: Partial<CreateBookmarkInput>;
  isSubmitting?: boolean;
}

const categories = ['Development', 'Design', 'Tools', 'Learning', 'Entertainment', 'News', 'Other'];

export default function BookmarkForm({
  onSubmit,
  initialData = {},
  isSubmitting = false,
}: BookmarkFormProps) {
  const [formData, setFormData] = useState<CreateBookmarkInput>({
    url: initialData.url || "",
    title: initialData.title || "",
    notes: initialData.notes || "",
    category: initialData.category || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url.trim() || !formData.title.trim() || isSubmitting) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border-0 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add New Bookmark
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-gray-700">
                URL *
              </label>
              <Input
                type="url"
                id="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, url: e.target.value }))
                }
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="https://example.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title *
              </label>
              <Input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Enter Title"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Notes
              </label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                placeholder="Enter any notes"
                disabled={isSubmitting}
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.url.trim() || !formData.title.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isSubmitting ? "Saving..." : "Save Bookmark"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}