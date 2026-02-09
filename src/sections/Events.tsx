import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Wine, Building2, PartyPopper } from 'lucide-react';

const eventIcons: Record<string, React.ElementType> = {
  'Private Dining': Wine,
  'Corporate Events': Building2,
  'Special Celebrations': PartyPopper,
};

export default function Events() {
  const { data } = useData();
  const { events } = data;

  const publishedEvents = events.filter(e => e.published);

  if (publishedEvents.length === 0) return null;

  return (
    <div className="py-20 md:py-32 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">
            Events & Catering
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Celebrate with <span className="text-amber-500">Us</span>
          </h2>
          <p className="text-stone-400 mt-4 max-w-2xl mx-auto">
            From intimate dinners to grand celebrations, we create unforgettable experiences
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {publishedEvents.map((event) => {
            const IconComponent = eventIcons[event.title] || Wine;
            return (
              <div 
                key={event.id}
                className="group relative bg-stone-900 rounded-2xl p-8 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                  <IconComponent className="w-8 h-8 text-amber-500" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {event.title}
                </h3>
                <p className="text-stone-400 mb-6 leading-relaxed">
                  {event.description}
                </p>

                {/* Image if available */}
                {event.image && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-6">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* CTA */}
                <Button 
                  variant="outline"
                  className="w-full border-stone-700 text-stone-300 hover:bg-amber-600 hover:border-amber-600 hover:text-white transition-all"
                >
                  Inquire Now
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
