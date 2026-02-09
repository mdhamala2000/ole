import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, EyeOff, Plus, Pencil, Trash2, Image } from 'lucide-react';
import type { Event } from '@/types';

export default function EventsManager() {
  const { data, addEvent, updateEvent, deleteEvent, togglePublish } = useData();
  const { events } = data;
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    published: true,
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      published: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Event) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      updateEvent(editingItem.id, formData);
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: formData.title || '',
        description: formData.description || '',
        image: formData.image,
        published: formData.published ?? true,
      };
      addEvent(newEvent);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Events Manager</h1>
          <p className="text-stone-400 mt-1">Manage your events and catering services</p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card 
            key={event.id}
            className={`bg-stone-900 border-stone-800 ${!event.published ? 'opacity-50' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <button
                  onClick={() => togglePublish('events', event.id)}
                  className="text-stone-400 hover:text-amber-500"
                >
                  {event.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 text-stone-400 hover:text-amber-500 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {event.image && (
                <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-stone-800">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
              )}

              <h3 className="font-semibold text-white mb-2">{event.title}</h3>
              <p className="text-stone-400 text-sm line-clamp-3">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg bg-stone-900 border-stone-800 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Event' : 'Add Event'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {/* Title */}
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="bg-stone-950 border-stone-700 text-white"
              />
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
                {editingItem ? 'Save Changes' : 'Add Event'}
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
