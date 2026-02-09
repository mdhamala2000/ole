import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Save, Image } from 'lucide-react';

export default function HeroEditor() {
  const { data, updateHero, togglePublish } = useData();
  const { hero } = data;
  
  const [formData, setFormData] = useState(hero);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateHero(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('backgroundImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Home Section</h1>
          <p className="text-stone-400 mt-1">Edit your homepage hero content</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {hero.published ? <Eye className="w-5 h-5 text-green-500" /> : <EyeOff className="w-5 h-5 text-stone-500" />}
            <Switch
              checked={hero.published}
              onCheckedChange={() => togglePublish('hero')}
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
          <CardTitle className="text-white">Hero Content</CardTitle>
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

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-stone-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="bg-stone-950 border-stone-700 text-white"
            />
          </div>

          {/* CTA Buttons */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ctaPrimary" className="text-stone-300">Primary CTA Text</Label>
              <Input
                id="ctaPrimary"
                value={formData.ctaPrimary}
                onChange={(e) => handleChange('ctaPrimary', e.target.value)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaSecondary" className="text-stone-300">Secondary CTA Text</Label>
              <Input
                id="ctaSecondary"
                value={formData.ctaSecondary}
                onChange={(e) => handleChange('ctaSecondary', e.target.value)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>
          </div>

          {/* Background Image */}
          <div className="space-y-2">
            <Label className="text-stone-300">Background Image</Label>
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
              {formData.backgroundImage && (
                <span className="text-green-500 text-sm">Image uploaded</span>
              )}
            </div>
            {formData.backgroundImage && (
              <div className="mt-4 aspect-video rounded-lg overflow-hidden bg-stone-800">
                <img 
                  src={formData.backgroundImage} 
                  alt="Hero background"
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
