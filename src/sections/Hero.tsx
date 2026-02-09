import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Star, Users, Calendar, ChevronDown } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  const { data } = useData();
  const { hero } = data;

  if (!hero.published) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Paella Image */}
      <div className="absolute inset-0">
        {hero.backgroundImage ? (
          <>
            <img 
              src={hero.backgroundImage} 
              alt="Delicious Seafood Paella" 
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-950/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-black" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full">
              {hero.subtitle}
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {hero.title.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i >= arr.length - 2 ? (
                    <span className="text-amber-500">{word} </span>
                  ) : (
                    `${word} `
                  )}
                </span>
              ))}
            </h1>
            
            <p className="text-lg sm:text-xl text-stone-300 mb-8 leading-relaxed">
              {hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                onClick={() => window.open('https://book.bistrochat.com/ole', '_blank')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg"
              >
                {hero.ctaPrimary}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('menu')}
                className="border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white px-8 py-6 text-lg"
              >
                {hero.ctaSecondary}
              </Button>
            </div>
          </div>

          {/* Right Stats Card */}
          <div className="hidden lg:block">
            <div className="bg-stone-950/60 backdrop-blur-md rounded-2xl p-8 border border-stone-800">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Why Diners Love Us</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Star className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">4.5+</div>
                    <p className="text-stone-400">Average Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">800+</div>
                    <p className="text-stone-400">Happy Reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">25+</div>
                    <p className="text-stone-400">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="lg:hidden mt-12 grid grid-cols-3 gap-4">
          <div className="text-center bg-stone-950/60 backdrop-blur-md rounded-xl p-4 border border-stone-800">
            <Star className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">4.5+</div>
            <p className="text-xs text-stone-400">Rating</p>
          </div>
          <div className="text-center bg-stone-950/60 backdrop-blur-md rounded-xl p-4 border border-stone-800">
            <Users className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">800+</div>
            <p className="text-xs text-stone-400">Reviews</p>
          </div>
          <div className="text-center bg-stone-950/60 backdrop-blur-md rounded-xl p-4 border border-stone-800">
            <Calendar className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">25+</div>
            <p className="text-xs text-stone-400">Years</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-400 hover:text-amber-500 transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </div>
  );
}
