// Menu Item Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'tapas' | 'mains' | 'desserts' | 'drinks';
  tags: string[];
  image?: string;
  isPopular?: boolean;
  published: boolean;
}

// Gallery Types
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'interior' | 'food' | 'team' | 'events';
  published: boolean;
}

// Review Platform Links
export interface ReviewPlatform {
  id: string;
  name: string;
  url: string;
  icon: string;
  rating?: number;
  reviewCount?: number;
  published: boolean;
}

// Review Types
export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: 'google' | 'facebook' | 'instagram' | 'openrice' | 'yelp' | 'tripadvisor';
  verified: boolean;
  likes: number;
  published: boolean;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  image?: string;
  published: boolean;
}

// Hero Content
export interface HeroContent {
  subtitle: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage?: string;
  published: boolean;
}

// About Content
export interface AboutContent {
  subtitle: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  chefQuote: string;
  chefName: string;
  stats: {
    chefs: number;
    wines: number;
    guests: number;
    dishes: number;
  };
  image?: string;
  published: boolean;
}

// Contact Content
export interface ContactContent {
  address: string;
  phone: string;
  email: string;
  businessHours: {
    weekday: string;
    weekend: string;
  };
  nearbyMTR: string;
  nearbyParking: string;
  facebook: string;
  published: boolean;
}

// User Type
export interface User {
  username: string;
  isAuthenticated: boolean;
}

// Site Data
export interface SiteData {
  hero: HeroContent;
  about: AboutContent;
  menu: MenuItem[];
  events: Event[];
  reviews: Review[];
  gallery: GalleryImage[];
  contact: ContactContent;
  reviewPlatforms: ReviewPlatform[];
}
