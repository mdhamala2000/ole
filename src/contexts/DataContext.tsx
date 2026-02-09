import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SiteData, HeroContent, AboutContent, MenuItem, Event, Review, GalleryImage, ContactContent, ReviewPlatform } from '@/types';

interface DataContextType {
  data: SiteData;
  updateHero: (hero: HeroContent) => void;
  updateAbout: (about: AboutContent) => void;
  updateContact: (contact: ContactContent) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addGalleryImage: (image: GalleryImage) => void;
  updateGalleryImage: (id: string, image: Partial<GalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;
  addReview: (review: Review) => void;
  updateReview: (id: string, review: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addReviewPlatform: (platform: ReviewPlatform) => void;
  updateReviewPlatform: (id: string, platform: Partial<ReviewPlatform>) => void;
  deleteReviewPlatform: (id: string) => void;
  togglePublish: (section: keyof SiteData, id?: string) => void;
}

const defaultData: SiteData = {
  hero: {
    subtitle: "Hong Kong's Iconic Spanish Restaurant Since 1998",
    title: "Experience Authentic Spanish Cuisine",
    description: "Opened since 1998 in Hong Kong as the brain-child of veteran restaurateur, Mr. Carmelo Lopez. A native Spaniard himself, he came to Asia in the 70's but remained nostalgically attached to the richness and exquisite taste of his motherland's cuisine.",
    ctaPrimary: "Reserve Your Table",
    ctaSecondary: "Explore Menu",
    backgroundImage: "/images/hero-paella.jpg",
    published: true
  },
  about: {
    subtitle: "Our Story",
    title: "A Taste of Spain in Hong Kong",
    paragraph1: "Ole was created from a crave for authenticity! Experience the genuine touch of Spain the moment you step inside: the lemon yellow plastered walls and glazed terracotta tiles of the Mediterranean, the lighting fixtures and decorative potteries directly flown from Spain.",
    paragraph2: "Executive Chef Jesus Pascual was recruited directly from Madrid. Trained in Michelin-starred restaurants including Arzak in San Sebastian and Fogony in Catalonia, he earned his Master's in Executive and Creative Cuisine. He endeavors authentic Spanish cooking with modern presentations.",
    chefQuote: "An attentive and energetic team is at your service to provide each customer a satisfactory dining experience.",
    chefName: "Executive Chef Jesus Pascual",
    stats: { chefs: 8, wines: 150, guests: 300, dishes: 80 },
    image: "/images/about-chef.jpg",
    published: true
  },
  contact: {
    address: "1/F, Shun Ho Tower\n24-30 Ice House Street\nCentral, Hong Kong",
    phone: "(852) 2523-8624",
    email: "ole@ad-caterers.com",
    businessHours: {
      weekday: "Mon – Fri: 12Noon-3:00pm & 6:00pm-11:00pm",
      weekend: "Sat, Sun & Public Holidays: 11:30am-3:00pm & 6:00pm-11:00pm"
    },
    nearbyMTR: "Central station exit D1",
    nearbyParking: "New World Tower",
    facebook: "www.facebook.com/OleSpanishRestaurant",
    published: true
  },
  menu: [
    {
      id: "1",
      name: "Patatas Bravas",
      description: "Crispy fried potatoes served with spicy tomato sauce and aioli",
      price: 12,
      category: "tapas",
      tags: ["vegetarian", "gluten-free"],
      isPopular: true,
      image: "/images/menu-tapas.jpg",
      published: true
    },
    {
      id: "2",
      name: "Gambas al Ajillo",
      description: "Sizzling prawns in garlic chili oil with fresh herbs",
      price: 18,
      category: "tapas",
      tags: ["gluten-free", "spicy"],
      published: true
    },
    {
      id: "3",
      name: "Jamón Ibérico",
      description: "Premium cured Iberian ham, aged 36 months",
      price: 28,
      category: "tapas",
      tags: [],
      published: true
    },
    {
      id: "4",
      name: "Croquetas de Jamón",
      description: "Creamy ham croquettes with béchamel filling",
      price: 14,
      category: "tapas",
      tags: [],
      published: true
    },
    {
      id: "5",
      name: "Tortilla Española",
      description: "Traditional Spanish potato omelette with caramelized onions",
      price: 13,
      category: "tapas",
      tags: ["vegetarian", "gluten-free"],
      published: true
    },
    {
      id: "6",
      name: "Paella Valenciana",
      description: "Authentic saffron rice with chicken, rabbit, green beans, and snails",
      price: 48,
      category: "mains",
      tags: [],
      isPopular: true,
      published: true
    },
    {
      id: "7",
      name: "Paella de Marisco",
      description: "Seafood paella with prawns, mussels, clams, and squid",
      price: 56,
      category: "mains",
      tags: ["gluten-free"],
      published: true
    },
    {
      id: "8",
      name: "Churros con Chocolate",
      description: "Crispy fried dough with thick hot chocolate dipping sauce",
      price: 12,
      category: "desserts",
      tags: ["vegetarian"],
      isPopular: true,
      published: true
    },
    {
      id: "9",
      name: "Crema Catalana",
      description: "Catalan-style crème brûlée with citrus and cinnamon",
      price: 10,
      category: "desserts",
      tags: ["vegetarian", "gluten-free"],
      published: true
    },
    {
      id: "10",
      name: "Sangria Roja",
      description: "Traditional red wine sangria with fresh fruits",
      price: 14,
      category: "drinks",
      tags: [],
      isPopular: true,
      published: true
    },
    {
      id: "11",
      name: "Sangria Blanca",
      description: "Refreshing white wine sangria with peach and apple",
      price: 14,
      category: "drinks",
      tags: [],
      published: true
    },
    {
      id: "12",
      name: "Tinto de Verano",
      description: "Spanish summer wine with lemon soda",
      price: 10,
      category: "drinks",
      tags: [],
      published: true
    }
  ],
  events: [
    {
      id: "1",
      title: "Private Dining",
      description: "Intimate gatherings for up to 20 guests in our exclusive private room",
      published: true
    },
    {
      id: "2",
      title: "Corporate Events",
      description: "Business lunches, team dinners, and company celebrations",
      published: true
    },
    {
      id: "3",
      title: "Special Celebrations",
      description: "Birthdays, anniversaries, and milestone events",
      published: true
    }
  ],
  reviews: [
    {
      id: "1",
      author: "Maria Gonzalez",
      rating: 5,
      text: "Absolutely incredible experience! The paella was authentic and the service was impeccable. This is the closest you'll get to Spain without leaving the city.",
      date: "Jan 15, 2024",
      source: "google",
      verified: true,
      likes: 24,
      published: true
    },
    {
      id: "2",
      author: "James Chen",
      rating: 5,
      text: "The tapas selection is outstanding. We tried the patatas bravas, gambas al ajillo, and jamón ibérico - all perfection. The sangria is a must-try!",
      date: "Jan 12, 2024",
      source: "facebook",
      verified: true,
      likes: 18,
      published: true
    },
    {
      id: "3",
      author: "Sarah Williams",
      rating: 4,
      text: "Beautiful ambiance and delicious food. The churros with chocolate were heavenly. Only wish the wait was a bit shorter.",
      date: "Jan 10, 2024",
      source: "google",
      verified: true,
      likes: 12,
      published: true
    },
    {
      id: "4",
      author: "David Park",
      rating: 5,
      text: "Best Spanish restaurant in town! The tortilla española reminds me of my grandmother's cooking. Highly recommend for date nights.",
      date: "Jan 8, 2024",
      source: "instagram",
      verified: true,
      likes: 31,
      published: true
    },
    {
      id: "5",
      author: "Emma Thompson",
      rating: 5,
      text: "Celebrated my birthday here and they made it so special. The staff went above and beyond. Food was phenomenal!",
      date: "Jan 5, 2024",
      source: "google",
      verified: true,
      likes: 45,
      published: true
    },
    {
      id: "6",
      author: "Michael Rodriguez",
      rating: 4,
      text: "Great atmosphere and authentic flavors. The wine selection is impressive. Will definitely be coming back.",
      date: "Jan 3, 2024",
      source: "yelp",
      verified: true,
      likes: 8,
      published: true
    },
    {
      id: "7",
      author: "Lisa Wong",
      rating: 5,
      text: "Hidden gem! The outdoor terrace is perfect for summer evenings. Try the seafood paella - it's amazing!",
      date: "Dec 28, 2023",
      source: "openrice",
      verified: true,
      likes: 22,
      published: true
    },
    {
      id: "8",
      author: "Robert Kim",
      rating: 5,
      text: "From the moment we walked in, we felt transported to Barcelona. The attention to detail in every dish is remarkable.",
      date: "Dec 25, 2023",
      source: "tripadvisor",
      verified: true,
      likes: 16,
      published: true
    }
  ],
  gallery: [
    { id: "1", src: "/images/hero-bg.jpg", alt: "Elegant restaurant interior", category: "interior", published: true },
    { id: "2", src: "/images/menu-tapas.jpg", alt: "Spanish tapas selection", category: "food", published: true },
    { id: "3", src: "/images/gallery-terrace.jpg", alt: "Outdoor terrace dining", category: "interior", published: true },
    { id: "4", src: "/images/gallery-paella.jpg", alt: "Traditional paella", category: "food", published: true },
    { id: "5", src: "/images/about-chef.jpg", alt: "Our head chef", category: "team", published: true },
    { id: "6", src: "/images/gallery-churros.jpg", alt: "Churros with chocolate", category: "food", published: true }
  ],
  reviewPlatforms: [
    { id: "1", name: "Google", url: "https://g.co/kgs/xyz123", icon: "google", rating: 4.5, reviewCount: 328, published: true },
    { id: "2", name: "Facebook", url: "https://www.facebook.com/OleSpanishRestaurant/reviews", icon: "facebook", rating: 4.7, reviewCount: 156, published: true },
    { id: "3", name: "TripAdvisor", url: "https://www.tripadvisor.com/Restaurant_Review-g294217-d1234567", icon: "tripadvisor", rating: 4.5, reviewCount: 89, published: true },
    { id: "4", name: "OpenRice", url: "https://www.openrice.com/en/hongkong/r-ole-spanish-restaurant", icon: "openrice", rating: 4.0, reviewCount: 234, published: true }
  ]
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    const stored = localStorage.getItem('ole_restaurant_data');
    return stored ? JSON.parse(stored) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('ole_restaurant_data', JSON.stringify(data));
  }, [data]);

  const updateHero = (hero: HeroContent) => setData(prev => ({ ...prev, hero }));
  const updateAbout = (about: AboutContent) => setData(prev => ({ ...prev, about }));
  const updateContact = (contact: ContactContent) => setData(prev => ({ ...prev, contact }));

  const addMenuItem = (item: MenuItem) => {
    setData(prev => ({ ...prev, menu: [...prev.menu, item] }));
  };

  const updateMenuItem = (id: string, item: Partial<MenuItem>) => {
    setData(prev => ({
      ...prev,
      menu: prev.menu.map(m => m.id === id ? { ...m, ...item } : m)
    }));
  };

  const deleteMenuItem = (id: string) => {
    setData(prev => ({ ...prev, menu: prev.menu.filter(m => m.id !== id) }));
  };

  const addGalleryImage = (image: GalleryImage) => {
    setData(prev => ({ ...prev, gallery: [...prev.gallery, image] }));
  };

  const updateGalleryImage = (id: string, image: Partial<GalleryImage>) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.map(g => g.id === id ? { ...g, ...image } : g)
    }));
  };

  const deleteGalleryImage = (id: string) => {
    setData(prev => ({ ...prev, gallery: prev.gallery.filter(g => g.id !== id) }));
  };

  const addReview = (review: Review) => {
    setData(prev => ({ ...prev, reviews: [...prev.reviews, review] }));
  };

  const updateReview = (id: string, review: Partial<Review>) => {
    setData(prev => ({
      ...prev,
      reviews: prev.reviews.map(r => r.id === id ? { ...r, ...review } : r)
    }));
  };

  const deleteReview = (id: string) => {
    setData(prev => ({ ...prev, reviews: prev.reviews.filter(r => r.id !== id) }));
  };

  const addEvent = (event: Event) => {
    setData(prev => ({ ...prev, events: [...prev.events, event] }));
  };

  const updateEvent = (id: string, event: Partial<Event>) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === id ? { ...e, ...event } : e)
    }));
  };

  const deleteEvent = (id: string) => {
    setData(prev => ({ ...prev, events: prev.events.filter(e => e.id !== id) }));
  };

  const addReviewPlatform = (platform: ReviewPlatform) => {
    setData(prev => ({ ...prev, reviewPlatforms: [...prev.reviewPlatforms, platform] }));
  };

  const updateReviewPlatform = (id: string, platform: Partial<ReviewPlatform>) => {
    setData(prev => ({
      ...prev,
      reviewPlatforms: prev.reviewPlatforms.map(p => p.id === id ? { ...p, ...platform } : p)
    }));
  };

  const deleteReviewPlatform = (id: string) => {
    setData(prev => ({ ...prev, reviewPlatforms: prev.reviewPlatforms.filter(p => p.id !== id) }));
  };

  const togglePublish = (section: keyof SiteData, id?: string) => {
    setData(prev => {
      const sectionData = prev[section];
      if (Array.isArray(sectionData) && id) {
        return {
          ...prev,
          [section]: sectionData.map((item: any) => 
            item.id === id ? { ...item, published: !item.published } : item
          )
        };
      } else if (!Array.isArray(sectionData) && !id) {
        return {
          ...prev,
          [section]: { ...sectionData, published: !sectionData.published }
        };
      }
      return prev;
    });
  };

  return (
    <DataContext.Provider value={{
      data,
      updateHero,
      updateAbout,
      updateContact,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      addGalleryImage,
      updateGalleryImage,
      deleteGalleryImage,
      addReview,
      updateReview,
      deleteReview,
      addEvent,
      updateEvent,
      deleteEvent,
      addReviewPlatform,
      updateReviewPlatform,
      deleteReviewPlatform,
      togglePublish
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
