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
import { Eye, EyeOff, Plus, Pencil, Trash2, Image } from 'lucide-react';
import type { MenuItem } from '@/types';

const categories = [
  { value: 'tapas', label: 'Tapas' },
  { value: 'mains', label: 'Mains' },
  { value: 'desserts', label: 'Desserts' },
  { value: 'drinks', label: 'Drinks' },
];

const availableTags = ['vegetarian', 'gluten-free', 'spicy'];

export default function MenuManager() {
  const { data, addMenuItem, updateMenuItem, deleteMenuItem, togglePublish } = useData();
  const { menu } = data;
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'tapas',
    tags: [],
    isPopular: false,
    published: true,
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'tapas',
      tags: [],
      isPopular: false,
      published: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      updateMenuItem(editingItem.id, formData);
    } else {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        price: formData.price || 0,
        category: (formData.category as any) || 'tapas',
        tags: formData.tags || [],
        image: formData.image,
        isPopular: formData.isPopular,
        published: formData.published ?? true,
      };
      addMenuItem(newItem);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(id);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Menu Manager</h1>
          <p className="text-stone-400 mt-1">Manage your restaurant menu items</p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menu.map((item) => (
          <Card 
            key={item.id}
            className={`bg-stone-900 border-stone-800 ${!item.published ? 'opacity-50' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish('menu', item.id)}
                    className="text-stone-400 hover:text-amber-500"
                  >
                    {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  {item.isPopular && (
                    <Badge className="bg-amber-600 text-white text-xs">Popular</Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-stone-400 hover:text-amber-500 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {item.image && (
                <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-stone-800">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{item.name}</h3>
                <span className="text-amber-500 font-bold">${item.price}</span>
              </div>

              <p className="text-stone-400 text-sm mb-3 line-clamp-2">{item.description}</p>

              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs border-stone-700 text-stone-400">
                  {item.category}
                </Badge>
                {item.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs border-stone-700 text-stone-400">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg bg-stone-900 border-stone-800 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  className="bg-stone-950 border-stone-700 text-white"
                />
              </div>
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
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      formData.tags?.includes(tag)
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'border-stone-700 text-stone-400 hover:border-amber-500'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label>Image</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-stone-800 rounded-lg cursor-pointer hover:bg-stone-700 transition-colors">
                  <Image className="w-4 h-4 text-stone-400" />
                  <span className="text-stone-300 text-sm">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {formData.image && (
                  <span className="text-green-500 text-sm">Image uploaded</span>
                )}
              </div>
              {formData.image && (
                <div className="mt-2 aspect-video rounded-lg overflow-hidden bg-stone-800">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isPopular}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: checked }))}
                />
                <Label className="text-stone-300">Popular</Label>
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
                {editingItem ? 'Save Changes' : 'Add Item'}
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
