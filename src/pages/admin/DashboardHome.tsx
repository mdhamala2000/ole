import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UtensilsCrossed, 
  Image, 
  Star, 
  Calendar, 
  Eye, 
  EyeOff,
  ExternalLink,
  Link2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function DashboardHome() {
  const { data } = useData();
  const navigate = useNavigate();

  const stats = [
    { 
      title: 'Menu Items', 
      count: data.menu.length, 
      published: data.menu.filter(m => m.published).length,
      icon: UtensilsCrossed,
      path: '/admin/menu',
      color: 'text-amber-500'
    },
    { 
      title: 'Gallery Images', 
      count: data.gallery.length, 
      published: data.gallery.filter(g => g.published).length,
      icon: Image,
      path: '/admin/gallery',
      color: 'text-blue-500'
    },
    { 
      title: 'Reviews', 
      count: data.reviews.length, 
      published: data.reviews.filter(r => r.published).length,
      icon: Star,
      path: '/admin/reviews',
      color: 'text-yellow-500'
    },
    { 
      title: 'Events', 
      count: data.events.length, 
      published: data.events.filter(e => e.published).length,
      icon: Calendar,
      path: '/admin/events',
      color: 'text-green-500'
    },
    { 
      title: 'Review Links', 
      count: data.reviewPlatforms.length, 
      published: data.reviewPlatforms.filter(p => p.published).length,
      icon: Link2,
      path: '/admin/platforms',
      color: 'text-purple-500'
    },
  ];

  const sectionStatus = [
    { name: 'Home', published: data.hero.published, path: '/admin/hero' },
    { name: 'About', published: data.about.published, path: '/admin/about' },
    { name: 'Contact', published: data.contact.published, path: '/admin/contact' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-stone-400 mt-1">Welcome to your restaurant management dashboard</p>
        </div>
        <Button 
          onClick={() => window.open('/', '_blank')}
          variant="outline"
          className="border-stone-700 text-stone-300 hover:bg-stone-800"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Website
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.title}
            className="bg-stone-900 border-stone-800 cursor-pointer hover:border-amber-500/50 transition-colors"
            onClick={() => navigate(stat.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-stone-400">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stat.count}</div>
              <p className="text-xs text-stone-500 mt-1">
                {stat.published} published, {stat.count - stat.published} unpublished
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section Status */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-white">Section Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sectionStatus.map((section) => (
              <div 
                key={section.name}
                onClick={() => navigate(section.path)}
                className="flex items-center justify-between p-4 bg-stone-950 rounded-lg cursor-pointer hover:bg-stone-800 transition-colors"
              >
                <span className="text-white font-medium">{section.name}</span>
                <div className="flex items-center gap-2">
                  {section.published ? (
                    <>
                      <Eye className="w-4 h-4 text-green-500" />
                      <span className="text-green-500 text-sm">Published</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-500 text-sm">Unpublished</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-stone-400 text-sm">
            <li>• Click on any stat card to manage that section</li>
            <li>• Use the toggle switches to publish/unpublish content</li>
            <li>• Images can be uploaded in any format (JPG, PNG, WebP)</li>
            <li>• Changes are saved automatically</li>
            <li>• Book Table button redirects to https://book.bistrochat.com/ole</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
