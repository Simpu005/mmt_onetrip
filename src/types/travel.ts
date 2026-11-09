export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface TravelerConfig {
  type: 'solo' | 'couple' | 'family' | 'friends';
  label: string;
  count: number;
  nights: number;
}

export interface ReviewSentiment {
  rating: number;
  count: number;
  percentageLoved: number;
  topLovedAspect: string;
  sampleQuote: string;
  author: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  badge: string;
  tagline: string;
  description: string;
  image: string;
  category: 'hill' | 'beach' | 'heritage' | 'nature' | 'adventure' | 'snow';
  tags: string[];
  durationDefault: number;
  idealSeason: string;
  tierPrices: {
    budget: number;
    standard: number;
    luxury: number;
  };
  dailyIncidentalApprox: number;
  reviews: ReviewSentiment;
}

export interface HomeCity {
  id: string;
  name: string;
  code: string;
  state: string;
  popular?: boolean;
  distanceNote?: string;
}

export interface TransitOption {
  id: string;
  destinationId: string;
  type: 'flight' | 'train' | 'bus';
  carrier: string;
  number: string;
  badge?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  originHub: string;
  destHub: string;
  stops: string;
  pricePerPerson: number;
  classType: string;
  features: string[];
  onTimeRating: number;
  reviewHighlight: string;
  foodIncluded: boolean;
  baggage: string;
}

export interface ExcursionItem {
  id: string;
  destinationId: string;
  title: string;
  locationArea: string;
  image: string;
  category: 'snow' | 'nature' | 'heritage' | 'adventure' | 'scenic';
  transitMode: string;
  transitDuration: string;
  accommodationType: 'homestay' | 'luxury_resort' | 'day_trip' | 'campsite' | 'heritage_inn';
  accommodationLabel: string;
  attractions: string[];
  approxCostPerPerson: number;
  recommendedTime: string;
  reviews: ReviewSentiment;
}

export interface HotelItem {
  id: string;
  destinationId: string;
  name: string;
  locationCategory: 'main' | 'distant_excursion';
  areaName: string;
  image: string;
  rating: number;
  reviewsCount: number;
  tier: 'luxury_5star' | 'heritage_boutique' | 'mountain_resort' | 'budget_cozy';
  pricePerNight: number;
  amenities: string[];
  distanceToCenter: string;
  reviewSentiment: {
    percentageLoved: number;
    whatTheyLiked: string;
    guestQuote: string;
    guestName: string;
    guestType: string;
  };
}

export interface TripState {
  currentStep: StepId;
  totalBudget: number;
  travelers: TravelerConfig;
  selectedDestination: Destination | null;
  selectedHomeCity: HomeCity | null;
  selectedTransit: TransitOption | null;
  selectedExcursions: ExcursionItem[];
  selectedMainHotel: HotelItem | null;
  selectedExcursionHotel: HotelItem | null;
  startDate: string;
}
