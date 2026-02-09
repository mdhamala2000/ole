import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Mail, Clock, Train, Car, Facebook, Instagram } from 'lucide-react';

export default function Contact() {
  const { data } = useData();
  const { contact } = data;

  if (!contact.published) return null;

  return (
    <div className="py-20 md:py-32 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">
            Visit Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Come Say <span className="text-amber-500">Hola</span>
          </h2>
          <p className="text-stone-400 mt-4 max-w-2xl mx-auto">
            We'd love to welcome you to Ole Spanish Restaurant. Whether it's a romantic dinner, family celebration, or casual lunch, we're here to make it special.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                <p className="text-stone-300 whitespace-pre-line">{contact.address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                <a 
                  href={`tel:${contact.phone.replace(/\D/g, '')}`}
                  className="text-stone-300 hover:text-amber-500 transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-stone-300 hover:text-amber-500 transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Business Hours</h3>
                <div className="space-y-1 text-stone-300">
                  <p>{contact.businessHours.weekday}</p>
                  <p>{contact.businessHours.weekend}</p>
                </div>
              </div>
            </div>

            {/* Nearby */}
            <div className="bg-stone-950 rounded-xl p-6 border border-stone-800">
              <h3 className="text-lg font-semibold text-white mb-4">Getting Here</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Train className="w-5 h-5 text-amber-500" />
                  <span className="text-stone-300">
                    <span className="text-stone-500">NEARBY MTR:</span> {contact.nearbyMTR}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-amber-500" />
                  <span className="text-stone-300">
                    <span className="text-stone-500">NEARBY PARKING:</span> {contact.nearbyParking}
                  </span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a 
                href={`https://${contact.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center text-stone-400 hover:bg-amber-600 hover:text-white transition-all"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center text-stone-400 hover:bg-amber-600 hover:text-white transition-all"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Newsletter & Map */}
          <div className="space-y-8">
            {/* Newsletter */}
            <div className="bg-stone-950 rounded-2xl p-8 border border-stone-800">
              <h3 className="text-xl font-semibold text-white mb-2">
                Join Our Mailing List
              </h3>
              <p className="text-stone-400 mb-6">
                Subscribe to receive exclusive offers, event invitations, and seasonal menu updates
              </p>
              <div className="flex gap-3">
                <Input 
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-stone-900 border-stone-700 text-white placeholder:text-stone-500"
                />
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-stone-800 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <p className="text-white font-medium">Ole Spanish Restaurant</p>
                  <p className="text-stone-400 text-sm">1/F, Shun Ho Tower, Central</p>
                  <a 
                    href="https://maps.google.com/?q=Shun+Ho+Tower+Ice+House+Street+Central+Hong+Kong"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-amber-500 hover:text-amber-400 transition-colors"
                  >
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Book Table CTA */}
            <Button 
              size="lg"
              onClick={() => window.open('https://book.bistrochat.com/ole', '_blank')}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg"
            >
              Book a Table
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
