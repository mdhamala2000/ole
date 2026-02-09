import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Leaf, WheatOff } from 'lucide-react';

type Category = 'all' | 'tapas' | 'mains' | 'desserts' | 'drinks';

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'tapas', label: 'Tapas' },
  { id: 'mains', label: 'Mains' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
];

const tagIcons: Record<string, React.ReactNode> = {
  'vegetarian': <Leaf className="w-3 h-3" />,
  'gluten-free': <WheatOff className="w-3 h-3" />,
  'spicy': <Flame className="w-3 h-3" />,
};

const tagColors: Record<string, string> = {
  'vegetarian': 'bg-green-500/20 text-green-400 border-green-500/30',
  'gluten-free': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'spicy': 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function Menu() {
  const { data } = useData();
  const { menu } = data;
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredMenu = activeCategory === 'all' 
    ? menu.filter(item => item.published)
    : menu.filter(item => item.category === activeCategory && item.published);

  if (menu.length === 0 || !menu.some(m => m.published)) {
    return null;
  }

  return (
    <div className="py-20 md:py-32 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">
            Our Menu
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Taste of <span className="text-amber-500">Spain</span>
          </h2>
          <p className="text-stone-400 mt-4 max-w-2xl mx-auto">
            From traditional tapas to our famous paella, explore our menu of authentic Spanish dishes
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat.id)}
              className={`${
                activeCategory === cat.id 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'border-stone-700 text-stone-400 hover:bg-stone-800 hover:text-white'
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-stone-950 rounded-xl overflow-hidden border border-stone-800 hover:border-amber-500/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-video bg-stone-800 relative overflow-hidden">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
                    <span className="text-stone-600 text-4xl">🍽️</span>
                  </div>
                )}
                {item.isPopular && (
                  <Badge className="absolute top-3 left-3 bg-amber-600 text-white">
                    Popular
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-amber-500 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold text-amber-500">
                    ${item.price}
                  </span>
                </div>
                <p className="text-stone-400 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag}
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${tagColors[tag] || 'bg-stone-800 text-stone-400 border-stone-700'}`}
                      >
                        {tagIcons[tag]}
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Download Menu Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
          >
            Download Full Menu (PDF)
          </Button>
        </div>
      </div>
    </div>
  );
}
