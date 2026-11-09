import React, { useState, useMemo } from 'react';
import { Search, MapPin, Building2, Check, ArrowRight, ArrowLeft, Sparkles, Navigation } from 'lucide-react';
import { POPULAR_HOME_CITIES } from '../../data/travelData';
import { HomeCity, Destination } from '../../types/travel';
import { BRAND } from '../../constants/theme';

interface Stage3HomeCityProps {
  selectedHomeCity: HomeCity | null;
  onSelectHomeCity: (city: HomeCity) => void;
  destination: Destination | null;
  onNext: () => void;
  onPrev: () => void;
}

export const Stage3HomeCity: React.FC<Stage3HomeCityProps> = ({
  selectedHomeCity,
  onSelectHomeCity,
  destination,
  onNext,
  onPrev,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return POPULAR_HOME_CITIES;
    return POPULAR_HOME_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#008CFF]/10 text-[#008CFF]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stage 3 of 7 • Origin City</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
          Where will you be starting your journey from?
        </h1>
        <p className="text-sm text-[#52657D] max-w-xl mx-auto">
          We will retrieve live flight, train, and luxury sleeper bus schedules directly connecting your home city to{' '}
          <strong className="text-[#008CFF]">{destination?.name || 'your destination'}</strong>.
        </p>
      </div>

      {/* Search & Selection Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6" style={{ borderColor: BRAND.border }}>
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-[#52657D]" />
          <input
            type="text"
            placeholder="Search by city name, state, or airport code (e.g. New Delhi, Mumbai, BLR)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-sm font-semibold border rounded-2xl bg-[#F5F8FC] text-[#172B4D] placeholder-[#98A9BC] focus:ring-2 focus:ring-[#008CFF] focus:bg-white focus:outline-none transition-all"
            style={{ borderColor: BRAND.border }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3 text-xs font-bold text-[#52657D] hover:text-[#172B4D] bg-[#EAF2FA] px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>

        {/* Popular Quick Chips */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#52657D] block">
            Popular Departure Hubs
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_HOME_CITIES.filter((c) => c.popular).map((city) => {
              const isSelected = selectedHomeCity?.id === city.id;
              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => onSelectHomeCity(city)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-[#008CFF] text-white shadow-sm'
                      : 'bg-[#F5F8FC] border text-[#172B4D] hover:bg-[#EAF2FA]'
                  }`}
                  style={{ borderColor: isSelected ? BRAND.primary : BRAND.border }}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{city.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${isSelected ? 'bg-white/20 text-white' : 'bg-[#EAF2FA] text-[#52657D]'}`}>
                    {city.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cities List / Grid */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#52657D] block">
            All Cities ({filteredCities.length})
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-1">
            {filteredCities.map((city) => {
              const isSelected = selectedHomeCity?.id === city.id;
              return (
                <div
                  key={city.id}
                  onClick={() => onSelectHomeCity(city)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#008CFF] bg-[#008CFF]/10 ring-2 ring-[#008CFF]'
                      : 'border-[#D9E5F2] hover:bg-[#F5F8FC]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                        isSelected ? 'bg-[#008CFF] text-white' : 'bg-[#EAF2FA] text-[#008CFF]'
                      }`}
                    >
                      {city.code}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#172B4D]">{city.name}</h4>
                      <p className="text-[10px] text-[#52657D]">{city.state}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#12A66A] text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Route Preview Banner */}
        {selectedHomeCity && destination && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#008CFF]/10 to-[#EAF2FA] border flex items-center justify-between gap-4" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#008CFF] text-white shadow-xs">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#008CFF]">
                  Configured Route Corridor
                </p>
                <h4 className="text-sm font-black text-[#172B4D]">
                  {selectedHomeCity.name} ({selectedHomeCity.code}) ➔ {destination.name} ({destination.state})
                </h4>
                <p className="text-[11px] text-[#52657D]">
                  Ready to fetch live flights, express trains, and Volvo sleeper buses for this route.
                </p>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <span className="text-[10px] font-bold text-[#12A66A] bg-[#12A66A]/10 px-2 py-0.5 rounded-full">
                Direct Routes Available
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: BRAND.border }}>
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl border text-xs font-bold text-[#172B4D] hover:bg-[#F5F8FC] flex items-center gap-1.5"
          style={{ borderColor: BRAND.border }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Destination</span>
        </button>

        <button
          type="button"
          disabled={!selectedHomeCity}
          onClick={onNext}
          className={`px-8 py-3 rounded-2xl text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2 ${
            selectedHomeCity
              ? 'hover:brightness-110'
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ backgroundColor: BRAND.primary }}
        >
          <span>Find Available Transits</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
