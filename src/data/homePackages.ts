export interface HomePackage {
  id: string;
  title: string;
  destination: string;
  badge: string;
  duration: string;
  days: number;
  nights: number;
  budget: string;
  numericBudget: number;
  image: string;
  tags: string[];
  highlights: string[];
  rating: number;
  reviewsCount: number;
  bookedCount: string;
  destinationId: string;
  description: string;
}

export interface ItineraryItem {
  day: string;
  title: string;
  details: string;
}

export interface PromptSuggestion {
  label: string;
  prompt: string;
}

export interface TweaksState {
  destination: string;
  days: number;
  budget: number;
  travelers: string;
  hotelRating: string;
}

export const DEFAULT_PROMPT =
  'Family of 4 planning a 7-day budget trip to Shimla in December with snow activities and cozy stay...';

export const QUICK_PROMPTS: PromptSuggestion[] = [
  {
    label: '❄️ 7 Days Shimla Family Budget ₹45k',
    prompt:
      'Family of 4 planning a 7-day budget trip to Shimla in December with snow activities and cozy stay under ₹45,000',
  },
  {
    label: '🏔️ Kashmir Gulmarg Gondola Escape',
    prompt:
      'Couple planning a 6-day scenic romantic trip to Kashmir Srinagar and Gulmarg with gondola rides under ₹58,000',
  },
  {
    label: '🌴 Kerala Backwaters & Munnar',
    prompt:
      'Family trip for 4 to Kerala Munnar tea gardens and Alleppey houseboat cruise for 6 days under ₹42,000',
  },
];

export const DEFAULT_TWEAKS: TweaksState = {
  destination: 'Shimla & Kufri',
  days: 7,
  budget: 45000,
  travelers: 'Family with Kids',
  hotelRating: '4-Star Premium',
};

export const TRAVELER_TYPES = [
  'Solo Traveler',
  'Couple / Duo',
  'Family with Kids',
  'Friends Squad',
];

export const HOTEL_TIERS = [
  'Budget Homestay',
  '3-Star Standard',
  '4-Star Premium',
  '5-Star Luxury',
];

export const SHIMLA_ITINERARY: ItineraryItem[] = [
  {
    day: 'Day 1',
    title: 'Arrival in Chandigarh & Scenic Drive to Shimla',
    details:
      'Pickup from Chandigarh Airport in private SUV. Scenic uphill drive along Himalayan Expressway. Evening check-in at Heritage Hotel near Mall Road with welcome tea.',
  },
  {
    day: 'Day 2',
    title: 'Shimla Heritage Walking Tour & Jakhoo Temple Ropeway',
    details:
      'Morning stroll through colonial architecture, Christ Church, and Gaiety Theatre. Ascend to Jakhoo Temple via scenic ropeway for panoramic snow-capped mountain vistas.',
  },
  {
    day: 'Day 3',
    title: 'Kufri Snow Viewpoint & Adventure Fun Park Excursion',
    details:
      'Full-day private cab excursion to Kufri. Enjoy yak rides, snow sledging, and tobogganing. Evening hot kahwa and regional shopping at Lakkar Bazaar.',
  },
  {
    day: 'Day 4',
    title: 'Naldehra Pine Valley & High Altitude Cedar Glades',
    details:
      'Picturesque pine forest trail walk, apple orchard visits, and serene picnic lunch overlooking cedar glades and Sutlej River gorges.',
  },
  {
    day: 'Day 5',
    title: 'Mashobra Forest Trail & Craignano Nature Reserve',
    details:
      'Light family hike through shaded oak and rhododendron canopies with outdoor hot lunch and mountain bird-watching.',
  },
  {
    day: 'Day 6',
    title: 'Mall Road Souvenirs, Local Bakery Hopping & Sunset Ridge',
    details:
      'Leisurely day for woolens, wooden crafts, hot chocolate at iconic bakeries, and breathtaking golden-hour sunset photos at the Ridge.',
  },
  {
    day: 'Day 7',
    title: 'Farewell Himalayas & Transfer to Chandigarh Airport',
    details:
      'Scenic descent with optional stopover at Timber Trail ropeway resort. Private airport drop-off with verified luggage assistance and souvenirs in hand.',
  },
];

export const MOCK_PACKAGES: HomePackage[] = [
  {
    id: 'shimla-family-winter',
    title: 'Shimla Family Winter Special',
    destination: 'SHIMLA & KUFRI',
    badge: 'Popular Choice',
    duration: '7 Days / 6 Nights',
    days: 7,
    nights: 6,
    budget: '₹45,000',
    numericBudget: 45000,
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    tags: ['Family Friendly', 'Snow Excursions', 'Heritage Stay'],
    highlights: [
      'Solang Valley & Kufri Snow Activities',
      'Jakhoo Temple Ropeway Experience',
    ],
    rating: 4.9,
    reviewsCount: 840,
    bookedCount: '1,420+ booked recently',
    destinationId: 'shimla',
    description:
      'Tailor-made for families seeking snow activities, comfortable heritage hotel stays near Mall Road, and hassle-free private cab sightseeing through Jakhoo Temple and Kufri.',
  },
  {
    id: 'manali-snow-thrill',
    title: 'Manali Snow & Thrill Escape',
    destination: 'MANALI & ATAL TUNNEL',
    badge: 'Top Rated',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    budget: '₹38,500',
    numericBudget: 38500,
    image:
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Adventure', 'Paragliding', 'River Rafting'],
    highlights: [
      'Sissu & Lahaul Valley Excursion',
      'Solang Valley Paragliding Voucher',
    ],
    rating: 4.8,
    reviewsCount: 620,
    bookedCount: '980+ booked recently',
    destinationId: 'shimla',
    description:
      'Thrilling alpine expedition exploring the engineering marvel of Atal Tunnel into snow-draped Sissu, river rafting in Beas, and paragliding in Solang.',
  },
  {
    id: 'kashmir-valley-gulmarg',
    title: 'Kashmir Valley & Gulmarg Odyssey',
    destination: 'SRINAGAR, GULMARG, PAHALGAM',
    badge: 'Best Seller',
    duration: '7 Days / 6 Nights',
    days: 7,
    nights: 6,
    budget: '₹58,000',
    numericBudget: 58000,
    image:
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Houseboat Stay', 'Gondola Ride', 'Romantic & Family'],
    highlights: [
      'Luxury Shikara Ride on Dal Lake',
      'Phase 1 Gondola Ride in Gulmarg',
    ],
    rating: 4.9,
    reviewsCount: 1150,
    bookedCount: '2,100+ booked recently',
    destinationId: 'kashmir',
    description:
      'Wake up on a heritage wooden Dal Lake houseboat, ride the highest cable car over powder snow in Gulmarg, and walk through scenic Betaab Valley pine trails.',
  },
  {
    id: 'kerala-backwaters-tea',
    title: 'Kerala Backwaters & Tea Gardens',
    destination: 'MUNNAR, THEKKADY, ALLEPPEY',
    badge: 'Trending',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    budget: '₹42,000',
    numericBudget: 42000,
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    tags: ['Nature & Wildlife', 'Private Houseboat', 'Relaxation'],
    highlights: [
      'Overnight Houseboat Stay with Meals',
      'Tea Plantation & Factory Visit in Munnar',
    ],
    rating: 4.7,
    reviewsCount: 530,
    bookedCount: '870+ booked recently',
    destinationId: 'kerala',
    description:
      'Immerse in the emerald tea estates of Munnar, take a spice plantation tour in Thekkady, and cruise the tranquil palm-fringed backwaters of Alleppey on a private houseboat.',
  },
];
