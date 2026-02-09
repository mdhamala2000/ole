import { useState } from 'react';
import { Menu, X, ChevronDown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  scrollY: number;
  scrollToSection: (id: string) => void;
}

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Menu', id: 'menu' },
  { label: 'Events', id: 'events' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
];

export default function Navigation({ scrollY, scrollToSection }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const isScrolled = scrollY > 100;
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    navigate('/admin/login');
    setMoreOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-stone-950/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <img 
              src="/images/logo.png" 
              alt="Ole Spanish Restaurant" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-2 text-sm text-stone-300 hover:text-amber-500 transition-colors rounded-md hover:bg-stone-800/50"
              >
                {item.label}
              </button>
            ))}
            
            {/* More Dropdown */}
            <DropdownMenu open={moreOpen} onOpenChange={setMoreOpen}>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 text-sm text-stone-300 hover:text-amber-500 transition-colors rounded-md hover:bg-stone-800/50 flex items-center gap-1">
                  More
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-stone-900 border-stone-800">
                <DropdownMenuItem 
                  onClick={handleAdminClick}
                  className="text-stone-300 hover:text-amber-500 hover:bg-stone-800 cursor-pointer"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Admin Login
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Book Table Button */}
          <div className="hidden lg:block">
            <Button 
              onClick={() => window.open('https://book.bistrochat.com/ole', '_blank')}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Book Table
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/98 backdrop-blur-md border-t border-stone-800">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-4 py-3 text-stone-300 hover:text-amber-500 hover:bg-stone-800/50 rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleAdminClick}
              className="block w-full text-left px-4 py-3 text-stone-300 hover:text-amber-500 hover:bg-stone-800/50 rounded-md transition-colors flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Admin Login
            </button>
            <Button 
              onClick={() => window.open('https://book.bistrochat.com/ole', '_blank')}
              className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white"
            >
              Book Table
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
