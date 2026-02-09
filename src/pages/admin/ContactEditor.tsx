import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Save } from 'lucide-react';

export default function ContactEditor() {
  const { data, updateContact, togglePublish } = useData();
  const { contact } = data;
  
  const [formData, setFormData] = useState(contact);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleBusinessHoursChange = (field: string, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      businessHours: { ...prev.businessHours, [field]: value }
    }));
    setSaved(false);
  };

  const handleSave = () => {
    updateContact(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Contact Section</h1>
          <p className="text-stone-400 mt-1">Edit your contact information and business hours</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {contact.published ? <Eye className="w-5 h-5 text-green-500" /> : <EyeOff className="w-5 h-5 text-stone-500" />}
            <Switch
              checked={contact.published}
              onCheckedChange={() => togglePublish('contact')}
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
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-stone-300">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={4}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-stone-300">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-stone-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Facebook */}
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-stone-300">Facebook URL</Label>
              <Input
                id="facebook"
                value={formData.facebook}
                onChange={(e) => handleChange('facebook', e.target.value)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <CardTitle className="text-white">Business Hours & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Weekday Hours */}
            <div className="space-y-2">
              <Label htmlFor="weekday" className="text-stone-300">Weekday Hours</Label>
              <Input
                id="weekday"
                value={formData.businessHours.weekday}
                onChange={(e) => handleBusinessHoursChange('weekday', e.target.value)}
                className="bg-stone-950 border-stone-700 text-white"
                placeholder="Mon – Fri: 12Noon-3:00pm & 6:00pm-11:00pm"
              />
            </div>

            {/* Weekend Hours */}
            <div className="space-y-2">
              <Label htmlFor="weekend" className="text-stone-300">Weekend Hours</Label>
              <Input
                id="weekend"
                value={formData.businessHours.weekend}
                onChange={(e) => handleBusinessHoursChange('weekend', e.target.value)}
                className="bg-stone-950 border-stone-700 text-white"
                placeholder="Sat, Sun & Public Holidays: 11:30am-3:00pm & 6:00pm-11:00pm"
              />
            </div>

            {/* Nearby MTR */}
            <div className="space-y-2">
              <Label htmlFor="nearbyMTR" className="text-stone-300">Nearby MTR</Label>
              <Input
                id="nearbyMTR"
                value={formData.nearbyMTR}
                onChange={(e) => handleChange('nearbyMTR', e.target.value)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>

            {/* Nearby Parking */}
            <div className="space-y-2">
              <Label htmlFor="nearbyParking" className="text-stone-300">Nearby Parking</Label>
              <Input
                id="nearbyParking"
                value={formData.nearbyParking}
                onChange={(e) => handleChange('nearbyParking', e.target.value)}
                className="bg-stone-950 border-stone-700 text-white"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-white">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="text-stone-500 mb-2">Address</h4>
              <p className="text-white whitespace-pre-line">{formData.address}</p>
            </div>
            <div>
              <h4 className="text-stone-500 mb-2">Contact</h4>
              <p className="text-white">{formData.phone}</p>
              <p className="text-white">{formData.email}</p>
            </div>
            <div>
              <h4 className="text-stone-500 mb-2">Business Hours</h4>
              <p className="text-white">{formData.businessHours.weekday}</p>
              <p className="text-white">{formData.businessHours.weekend}</p>
            </div>
            <div>
              <h4 className="text-stone-500 mb-2">Getting Here</h4>
              <p className="text-white">MTR: {formData.nearbyMTR}</p>
              <p className="text-white">Parking: {formData.nearbyParking}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
