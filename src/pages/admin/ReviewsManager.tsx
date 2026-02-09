import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Plus, Pencil, Trash2, Star, ThumbsUp } from 'lucide-react';
import type { Review } from '@/types';

const sources = [
  { value: 'google', label: 'Google' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'openrice', label: 'OpenRice' },
  { value: 'yelp', label: 'Yelp' },
  { value: 'tripadvisor', label: 'TripAdvisor' },
];

export default function ReviewsManager() {
  const { data, addReview, updateReview, deleteReview, togglePublish } = useData();
  const { reviews } = data;
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Review | null>(null);
  const [formData, setFormData] = useState<Partial<Review>>({
    author: '',
    rating: 5,
    text: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    source: 'google',
    verified: true,
    likes: 0,
    published: true,
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      author: '',
      rating: 5,
      text: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      source: 'google',
      verified: true,
      likes: 0,
      published: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Review) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      updateReview(editingItem.id, formData);
    } else {
      const newReview: Review = {
        id: Date.now().toString(),
        author: formData.author || '',
        rating: formData.rating || 5,
        text: formData.text || '',
        date: formData.date || '',
        source: (formData.source as any) || 'google',
        verified: formData.verified ?? true,
        likes: formData.likes || 0,
        published: formData.published ?? true,
      };
      addReview(newReview);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      deleteReview(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Reviews Manager</h1>
          <p className="text-stone-400 mt-1">Manage customer reviews and testimonials</p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Review
        </Button>
      </div>

      {/* Reviews Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <Card 
            key={review.id}
            className={`bg-stone-900 border-stone-800 ${!review.published ? 'opacity-50' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish('reviews', review.id)}
                    className="text-stone-400 hover:text-amber-500"
                  >
                    {review.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  {review.verified && (
                    <Badge className="bg-green-600 text-white text-xs">Verified</Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(review)}
                    className="p-2 text-stone-400 hover:text-amber-500 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{review.author}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-white">{review.rating}</span>
                </div>
              </div>

              <Badge variant="outline" className="mb-3 text-xs border-stone-700 text-stone-400 capitalize">
                {review.source}
              </Badge>

              <p className="text-stone-400 text-sm mb-3 line-clamp-4">"{review.text}"</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">{review.date}</span>
                <div className="flex items-center gap-1 text-stone-400">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.likes}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg bg-stone-900 border-stone-800 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Review' : 'Add Review'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {/* Author */}
            <div className="space-y-2">
              <Label>Author Name</Label>
              <Input
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Rating & Source */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rating (1-5)</Label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) || 5 }))}
                  className="bg-stone-950 border-stone-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Source</Label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value as any }))}
                  className="w-full h-10 px-3 bg-stone-950 border border-stone-700 rounded-md text-white"
                >
                  {sources.map(src => (
                    <option key={src.value} value={src.value}>{src.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <Label>Review Text</Label>
              <Textarea
                value={formData.text}
                onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                rows={4}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Likes */}
            <div className="space-y-2">
              <Label>Likes</Label>
              <Input
                type="number"
                value={formData.likes}
                onChange={(e) => setFormData(prev => ({ ...prev, likes: parseInt(e.target.value) || 0 }))}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Options */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.verified}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, verified: checked }))}
                />
                <Label className="text-stone-300">Verified</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                />
                <Label className="text-stone-300">Published</Label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
              >
                {editingItem ? 'Save Changes' : 'Add Review'}
              </Button>
              <Button
                onClick={() => setIsDialogOpen(false)}
                variant="outline"
                className="border-stone-700 text-stone-300 hover:bg-stone-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
