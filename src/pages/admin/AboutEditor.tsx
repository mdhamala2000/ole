import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Save, Image } from 'lucide-react';

export default function AboutEditor() {
  const { data, updateAbout, togglePublish } = useData();
  const { about } = data;
  
  const [formData, setFormData] = useState(about);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleStatsChange = (field: string, value: number) => {
    setFormData(prev => ({ 
      ...prev, 
      stats: { ...prev.stats, [field]: value }
    }));
    setSaved(false);
  };

  const handleSave = () => {
    updateAbout(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">About Section</h1>
          <p className="text-stone-400 mt-1">Edit your restaurant's story</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {about.published ? <Eye className="w-5 h-5 text-green-500" /> : <EyeOff className="w-5 h-5 text-stone-500" />}
            <Switch
              checked={about.published}
              onCheckedChange={() => togglePublish('about')}
            />
          </div>
          <Button 
            onClick={handleSave}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-white">About Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Subtitle */}
          <div className="space-y-2">
            <Label htmlFor="subtitle" className="text-stone-300">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="bg-stone-950 border-stone-700 text-white"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-stone-300">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="bg-stone-950 border-stone-700 text-white"
            />
          </div>

          {/* Paragraph 1 */}
          <div className="space-y-2">
            <Label htmlFor="paragraph1" className="text-stone-300">Paragraph 1</Label>
            <Textarea
              id="paragraph1"
              value={formData.paragraph1}
              onChange={(e) => handleChange('paragraph1', e.target.value)}
              rows={4}
              className="bg-stone-950 border-stone-700 text-white"
            />
          </div>

          {/* Paragraph 2 */}
          <div className="space-y-2">
            <Label htmlFor="paragraph2" className="text-stone-300">Paragraph 2</Label>
            <Textarea
              id="paragraph2"
              value={formData.paragraph2}
              onChange={(e) => handleChange('paragraph2', e.target.value)}
              rows={4}
              className="bg-stone-950 border-stone-700 text-white"
            />
          </div>

          {/* Chef Quote */}
          <div className="space-y-2">
            <Label htmlFor="chefQuote" className="text-stone-300">Chef Quote</Label>
            <Textarea
              id="chefQuote"
              value={formData.chefQuote}
              onChange={(e) => handleChange('chefQuote', e.target.value)}
              rows={3}
              className="bg-stone-950 border-stone-700 text-white"
            />
          </div>

          {/* Chef Name */}
          <div className="space-y-2">
            <Label htmlFor="chefName" className="text-stone-300">Chef Name</Label>
            <Input
              id="chefName"
              value={formData.chefName}
              onChange={(e) => handleChange('chefName', e.target.value)}
              className="bg-stone-950 border-stone-700 text-white"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chefs" className="text-stone-300">Chefs</Label>
              <Input
                id="chefs"
                type="number"
                value={formData.stats.chefs}
                onChange={(e) => handleStatsChange('chefs', parseInt(e.target.value) || 0)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wines" className="text-stone-300">Wines</Label>
              <Input
                id="wines"
                type="number"
                value={formData.stats.wines}
                onChange={(e) => handleStatsChange('wines', parseInt(e.target.value) || 0)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests" className="text-stone-300">Daily Guests</Label>
              <Input
                id="guests"
                type="number"
                value={formData.stats.guests}
                onChange={(e) => handleStatsChange('guests', parseInt(e.target.value) || 0)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dishes" className="text-stone-300">Dishes</Label>
              <Input
                id="dishes"
                type="number"
                value={formData.stats.dishes}
                onChange={(e) => handleStatsChange('dishes', parseInt(e.target.value) || 0)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label className="text-stone-300">About Image</Label>
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
              <div className="mt-4 aspect-[4/5] max-w-sm rounded-lg overflow-hidden bg-stone-800">
                <img 
                  src={formData.image} 
                  alt="About"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
