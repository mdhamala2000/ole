import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Home, 
  Info, 
  UtensilsCrossed, 
  Calendar, 
  Star, 
  Image, 
  Contact, 
  LogOut,
  Menu,
  X,
  Link2
} from 'lucide-react';
import DashboardHome from './DashboardHome';
import HeroEditor from './HeroEditor';
import AboutEditor from './AboutEditor';
import MenuManager from './MenuManager';
import EventsManager from './EventsManager';
import ReviewsManager from './ReviewsManager';
import GalleryManager from './GalleryManager';
import ContactEditor from './ContactEditor';
import ReviewPlatformsManager from './ReviewPlatformsManager';

const navItems = [
  { path: '', label: 'Dashboard', icon: LayoutDashboard },
  { path: 'hero', label: 'Home', icon: Home },
  { path: 'about', label: 'About', icon: Info },
  { path: 'menu', label: 'Menu', icon: UtensilsCrossed },
  { path: 'events', label: 'Events', icon: Calendar },
  { path: 'reviews', label: 'Reviews', icon: Star },
  { path: 'gallery', label: 'Gallery', icon: Image },
  { path: 'contact', label: 'Contact', icon: Contact },
  { path: 'platforms', label: 'Review Links', icon: Link2 },
];

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-stone-950 flex">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-stone-800 rounded-lg text-white"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-stone-900 border-r border-stone-800 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-stone-800">
            <h1 className="text-xl font-bold text-amber-500">Ole Restaurant</h1>
            <p className="text-stone-500 text-sm">Admin Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/admin/${item.path}`}
                end={item.path === ''}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white'
                      : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-stone-800">
            <div className="mb-4 px-4">
              <p className="text-stone-500 text-sm">Logged in as</p>
              <p className="text-white font-medium">{user?.username}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-stone-700 text-stone-400 hover:bg-red-900/20 hover:text-red-400 hover:border-red-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="p-4 lg:p-8">
          <Routes>
            <Route path="" element={<DashboardHome />} />
            <Route path="hero" element={<HeroEditor />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="menu" element={<MenuManager />} />
            <Route path="events" element={<EventsManager />} />
            <Route path="reviews" element={<ReviewsManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="contact" element={<ContactEditor />} />
            <Route path="platforms" element={<ReviewPlatformsManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
