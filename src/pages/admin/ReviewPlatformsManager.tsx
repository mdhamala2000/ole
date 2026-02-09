import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, EyeOff, Plus, Pencil, Trash2, Star, ExternalLink } from 'lucide-react';
import type { ReviewPlatform } from '@/types';

const iconOptions = [
  { value: 'google', label: 'Google' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tripadvisor', label: 'TripAdvisor' },
  { value: 'openrice', label: 'OpenRice' },
  { value: 'yelp', label: 'Yelp' },
  { value: 'instagram', label: 'Instagram' },
];

export default function ReviewPlatformsManager() {
  const { data, addReviewPlatform, updateReviewPlatform, deleteReviewPlatform, togglePublish } = useData();
  const { reviewPlatforms } = data;
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ReviewPlatform | null>(null);
  const [formData, setFormData] = useState<Partial<ReviewPlatform>>({
    name: '',
    url: '',
    icon: 'google',
    rating: undefined,
    reviewCount: undefined,
    published: true,
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      url: '',
      icon: 'google',
      rating: undefined,
      reviewCount: undefined,
      published: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: ReviewPlatform) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      updateReviewPlatform(editingItem.id, formData);
    } else {
      const newPlatform: ReviewPlatform = {
        id: Date.now().toString(),
        name: formData.name || '',
        url: formData.url || '',
        icon: formData.icon || 'google',
        rating: formData.rating,
        reviewCount: formData.reviewCount,
        published: formData.published ?? true,
      };
      addReviewPlatform(newPlatform);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this platform link?')) {
      deleteReviewPlatform(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Review Platforms</h1>
          <p className="text-stone-400 mt-1">Manage review platform links that appear on your website</p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Platform
        </Button>
      </div>

      {/* Platforms Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviewPlatforms.map((platform) => (
          <Card 
            key={platform.id}
            className={`bg-stone-900 border-stone-800 ${!platform.published ? 'opacity-50' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <button
                  onClick={() => togglePublish('reviewPlatforms', platform.id)}
                  className="text-stone-400 hover:text-amber-500"
                >
                  {platform.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(platform)}
                    className="p-2 text-stone-400 hover:text-amber-500 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(platform.id)}
                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-amber-500 text-lg font-bold">{platform.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{platform.name}</h3>
                  <p className="text-stone-500 text-sm capitalize">{platform.icon}</p>
                </div>
              </div>

              {platform.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-white">{platform.rating}</span>
                  {platform.reviewCount && (
                    <span className="text-stone-500 text-sm">({platform.reviewCount} reviews)</span>
                  )}
                </div>
              )}

              <a 
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-400 text-sm"
              >
                <ExternalLink className="w-3 h-3" />
                View Link
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg bg-stone-900 border-stone-800 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Platform' : 'Add Platform'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {/* Name */}
            <div className="space-y-2">
              <Label>Platform Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Google Reviews"
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label>Review Page URL</Label>
              <Input
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://..."
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Icon */}
            <div className="space-y-2">
              <Label>Icon</Label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full h-10 px-3 bg-stone-950 border border-stone-700 rounded-md text-white"
              >
                {iconOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Rating & Review Count */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rating (Optional)</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value ? parseFloat(e.target.value) : undefined }))}
                  placeholder="4.5"
                  className="bg-stone-950 border-stone-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Review Count (Optional)</Label>
                <Input
                  type="number"
                  value={formData.reviewCount || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, reviewCount: e.target.value ? parseInt(e.target.value) : undefined }))}
                  placeholder="100"
                  className="bg-stone-950 border-stone-700 text-white"
                />
              </div>
            </div>

            {/* Published */}
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
              />
              <Label className="text-stone-300">Published</Label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
              >
                {editingItem ? 'Save Changes' : 'Add Platform'}
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
