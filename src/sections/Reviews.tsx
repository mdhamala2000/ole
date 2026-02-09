import { useData } from '@/contexts/DataContext';
import { Star, ThumbsUp, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const sourceColors: Record<string, string> = {
  google: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  facebook: 'bg-blue-600/20 text-blue-500 border-blue-600/30',
  instagram: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  openrice: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  yelp: 'bg-red-500/20 text-red-400 border-red-500/30',
  tripadvisor: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const sourceLabels: Record<string, string> = {
  google: 'Google',
  facebook: 'Facebook',
  instagram: 'Instagram',
  openrice: 'OpenRice',
  yelp: 'Yelp',
  tripadvisor: 'TripAdvisor',
};

const platformIcons: Record<string, React.ReactNode> = {
  google: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  tripadvisor: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  openrice: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
  ),
};

export default function Reviews() {
  const { data } = useData();
  const { reviews, reviewPlatforms } = data;

  const publishedReviews = reviews.filter(r => r.published);
  const publishedPlatforms = reviewPlatforms.filter(p => p.published);

  if (publishedReviews.length === 0 && publishedPlatforms.length === 0) return null;

  // Calculate average rating
  const avgRating = publishedReviews.length > 0 
    ? publishedReviews.reduce((acc, r) => acc + r.rating, 0) / publishedReviews.length 
    : 0;

  // Count reviews by source
  const sourceCounts = publishedReviews.reduce((acc, r) => {
    acc[r.source] = (acc[r.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="py-20 md:py-32 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            What Our <span className="text-amber-500">Guests Say</span>
          </h2>
          
          {/* Rating Summary */}
          {publishedReviews.length > 0 && (
            <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-6 bg-stone-950 px-8 py-6 rounded-2xl border border-stone-800">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                  <span className="text-3xl font-bold text-white">{avgRating.toFixed(1)}</span>
                </div>
                <p className="text-stone-400 text-sm">Based on</p>
                <p className="text-stone-300 font-medium">{publishedReviews.length} reviews</p>
              </div>
              
              <div className="hidden sm:block w-px h-16 bg-stone-800" />
              
              <div className="flex flex-wrap justify-center gap-2">
                {Object.entries(sourceCounts).map(([source, count]) => (
                  <Badge 
                    key={source}
                    variant="outline"
                    className={`${sourceColors[source]} capitalize`}
                  >
                    {sourceLabels[source]} {count}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Review Platform Links */}
        {publishedPlatforms.length > 0 && (
          <div className="mb-12">
            <h3 className="text-center text-lg font-semibold text-white mb-6">Find Us On</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {publishedPlatforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/50 rounded-xl px-6 py-4 transition-all duration-300"
                >
                  <div className="text-stone-400 group-hover:text-amber-500 transition-colors">
                    {platformIcons[platform.icon] || <Star className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{platform.name}</span>
                      <ExternalLink className="w-3 h-3 text-stone-500" />
                    </div>
                    {platform.rating && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-stone-300">{platform.rating}</span>
                        {platform.reviewCount && (
                          <span className="text-stone-500">({platform.reviewCount} reviews)</span>
                        )}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        {publishedReviews.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedReviews.map((review) => (
              <div 
                key={review.id}
                className="bg-stone-950 rounded-xl p-6 border border-stone-800 hover:border-amber-500/30 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-white">{review.author}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${sourceColors[review.source]}`}
                      >
                        {sourceLabels[review.source]}
                      </Badge>
                      {review.verified && (
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-white font-medium">{review.rating}</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-stone-300 text-sm leading-relaxed mb-4">
                  "{review.text}"
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">{review.date}</span>
                  <button className="flex items-center gap-1 text-stone-400 hover:text-amber-500 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
