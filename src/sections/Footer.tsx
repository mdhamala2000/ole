import { useData } from '@/contexts/DataContext';
import { MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

const quickLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Menu', id: 'menu' },
  { label: 'Events', id: 'events' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
];

export default function Footer({ scrollToSection }: FooterProps) {
  const { data } = useData();
  const { contact } = data;

  return (
    <footer className="bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-amber-500 mb-4">
              Ole Spanish Restaurant
            </h3>
            <p className="text-stone-400 mb-6 max-w-md">
              Authentic Spanish cuisine bringing the flavors of Barcelona to your table since 2009.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-stone-400">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span className="text-sm">1/F, Shun Ho Tower, 24-30 Ice House Street, Central</span>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <Phone className="w-5 h-5 text-amber-500" />
                <span className="text-sm">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <Mail className="w-5 h-5 text-amber-500" />
                <span className="text-sm">{contact.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-stone-400 hover:text-amber-500 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-stone-400">
              <p>{contact.address}</p>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
            </div>
            
            <h4 className="text-lg font-semibold text-white mt-6 mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a 
                href={`https://${contact.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center text-stone-400 hover:bg-amber-600 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center text-stone-400 hover:bg-amber-600 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} Ole Spanish Restaurant. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <button className="text-stone-500 hover:text-amber-500 transition-colors">
              Privacy Policy
            </button>
            <button className="text-stone-500 hover:text-amber-500 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
