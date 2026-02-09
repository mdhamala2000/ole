import { useData } from '@/contexts/DataContext';
import { ChefHat, Wine, Users, UtensilsCrossed, Quote } from 'lucide-react';

export default function About() {
  const { data } = useData();
  const { about } = data;

  if (!about.published) return null;

  const stats = [
    { icon: ChefHat, value: `${about.stats.chefs}+`, label: 'Expert Chefs' },
    { icon: Wine, value: `${about.stats.wines}+`, label: 'Wine Selection' },
    { icon: Users, value: `${about.stats.guests}+`, label: 'Daily Guests' },
    { icon: UtensilsCrossed, value: `${about.stats.dishes}+`, label: 'Dishes' },
  ];

  return (
    <div className="py-20 md:py-32 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-900">
              {about.image ? (
                <img 
                  src={about.image} 
                  alt="Restaurant" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-900/30 to-stone-800 flex items-center justify-center">
                  <ChefHat className="w-32 h-32 text-amber-500/30" />
                </div>
              )}
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
          </div>

          {/* Content Side */}
          <div>
            <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">
              {about.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
              {about.title.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i >= arr.length - 3 ? (
                    <span className="text-amber-500">{word} </span>
                  ) : (
                    `${word} `
                  )}
                </span>
              ))}
            </h2>
            
            <div className="space-y-4 text-stone-300 leading-relaxed">
              <p>{about.paragraph1}</p>
              <p>{about.paragraph2}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-stone-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-10 p-6 bg-stone-900/50 rounded-xl border-l-4 border-amber-500">
              <Quote className="w-8 h-8 text-amber-500/50 mb-3" />
              <p className="text-stone-300 italic mb-3">{about.chefQuote}</p>
              <p className="text-amber-500 font-medium">— {about.chefName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
