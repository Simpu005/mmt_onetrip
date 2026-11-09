export const BRAND = {
  // MakeMyTrip identity
  primary: '#008CFF',
  primaryDark: '#006FCC',
  secondary: '#172B4D',
  secondaryDark: '#0D1B35',

  // Accent (used for icons, chips, highlights)
  accent: '#F07828',
  accentDark: '#D96518',

  // Neutral foundation
  white: '#FFFFFF',
  background: '#F5F8FC',
  surface: '#EAF2FA',
  border: '#D9E5F2',

  // Typography
  primaryText: '#172B4D',
  secondaryText: '#52657D',
  disabledText: '#98A9BC',

  // Semantic
  success: '#12A66A',
  warning: '#E99A20',
  error: '#D92D36',
} as const;

export const STEP_NAMES = [
  { id: 1, label: 'Budget Setting', subtitle: 'Target spend & travelers' },
  { id: 2, label: 'Destination', subtitle: 'Choose your dream spot' },
  { id: 3, label: 'Home City', subtitle: 'Departure location' },
  { id: 4, label: 'Transit Booking', subtitle: 'Flights, Trains & Buses' },
  { id: 5, label: 'Excursions & Scenes', subtitle: 'Must-visit spots' },
  { id: 6, label: 'Hotel Selection', subtitle: 'Main & scenic stays' },
  { id: 7, label: 'Travel Flow', subtitle: 'Final itinerary & summary' },
] as const;
