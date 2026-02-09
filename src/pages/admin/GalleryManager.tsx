import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, EyeOff, Plus, Pencil, Trash2, Image, Upload } from 'lucide-react';
import type { GalleryImage } from '@/types';

const categories = [
  { value: 'interior', label: 'Interior' },
  { value: 'food', label: 'Food' },
  { value: 'team', label: 'Team' },
  { value: 'events', label: 'Events' },
];

export default function GalleryManager() {
  const { data, addGalleryImage, updateGalleryImage, deleteGalleryImage, togglePublish } = useData();
  const { gallery } = data;
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    alt: '',
    category: 'interior',
    published: true,
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      alt: '',
      category: 'interior',
      published: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: GalleryImage) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      updateGalleryImage(editingItem.id, formData);
    } else {
      if (!formData.src) {
        alert('Please upload an image');
        return;
      }
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        src: formData.src || '',
        alt: formData.alt || '',
        category: (formData.category as any) || 'interior',
        published: formData.published ?? true,
      };
      addGalleryImage(newImage);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteGalleryImage(id);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, src: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gallery Manager</h1>
          <p className="text-stone-400 mt-1">Manage your restaurant gallery images</p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((image) => (
          <Card 
            key={image.id}
            className={`bg-stone-900 border-stone-800 overflow-hidden ${!image.published ? 'opacity-50' : ''}`}
          >
            <div className="aspect-square relative">
              {image.src ? (
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-stone-800 flex items-center justify-center">
                  <Image className="w-12 h-12 text-stone-600" />
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors group">
                <div className="absolute top-2 left-2">
                  <button
                    onClick={() => togglePublish('gallery', image.id)}
                    className="p-2 bg-black/50 rounded-lg text-white hover:bg-amber-600 transition-colors"
                  >
                    {image.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => handleEdit(image)}
                    className="p-2 bg-black/50 rounded-lg text-white hover:bg-amber-600 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-2 bg-black/50 rounded-lg text-white hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <CardContent className="p-3">
              <p className="text-white text-sm truncate">{image.alt}</p>
              <p className="text-stone-500 text-xs capitalize">{image.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg bg-stone-900 border-stone-800 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Image' : 'Add Image'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Image</Label>
              <div className="border-2 border-dashed border-stone-700 rounded-lg p-8 text-center">
                {formData.src ? (
                  <div className="relative">
                    <img 
                      src={formData.src} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, src: undefined }))}
                      className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="w-12 h-12 text-stone-500 mx-auto mb-4" />
                    <p className="text-stone-400">Click to upload an image</p>
                    <p className="text-stone-500 text-sm mt-1">JPG, PNG, WebP supported</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Alt Text */}
            <div className="space-y-2">
              <Label>Image Description (Alt Text)</Label>
              <Input
                value={formData.alt}
                onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
                className="bg-stone-950 border-stone-700 text-white"
                placeholder="Describe the image"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full h-10 px-3 bg-stone-950 border border-stone-700 rounded-md text-white"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
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
                {editingItem ? 'Save Changes' : 'Add Image'}
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
