import React, { useState, useMemo } from 'react';
import { BedDouble, Star, Check, ArrowRight, ArrowLeft, Coffee, Waves, MapPin, ThumbsUp, Building, Crown, Landmark, Mountain, Tag, Layers, Calendar } from 'lucide-react';
import { getHotelsForDestination } from '../../data/travelData';
import { HotelItem, Destination, TravelerConfig } from '../../types/travel';
import { BRAND } from '../../constants/theme';
import { formatINR } from '../../utils/calculator';

interface Stage6HotelsProps {
  destination: Destination | null;
  travelers: TravelerConfig;
  selectedMainHotel: HotelItem | null;
  onSelectMainHotel: (hotel: HotelItem) => void;
  selectedExcursionHotel: HotelItem | null;
  onSelectExcursionHotel: (hotel: HotelItem | null) => void;
  onNext: () => void;
  onPrev: () => void;
}

const FILTER_CHIPS = [
  { id: 'all', label: 'All Stays', Icon: Layers },
  { id: '5star', label: '5-Star Luxury', Icon: Crown },
  { id: 'heritage', label: 'Heritage & Boutique', Icon: Landmark },
  { id: 'mountain', label: 'Mountain & View Resort', Icon: Mountain },
  { id: 'pool', label: 'Heated Pool / Spa', Icon: Waves },
  { id: 'breakfast', label: 'Free Breakfast Included', Icon: Coffee },
  { id: 'budget', label: 'Value (< ₹4,000/nt)', Icon: Tag },
];

export const Stage6Hotels: React.FC<Stage6HotelsProps> = ({
  destination,
  travelers,
  selectedMainHotel,
  onSelectMainHotel,
  selectedExcursionHotel,
  onSelectExcursionHotel,
  onNext,
  onPrev,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeLocationTab, setActiveLocationTab] = useState<'main' | 'distant'>('main');

  const destId = destination?.id || 'shimla';
  const allHotels = useMemo(() => getHotelsForDestination(destId), [destId]);

  const mainHotels = useMemo(
    () => allHotels.filter((h) => h.locationCategory === 'main'),
    [allHotels]
  );
  const distantHotels = useMemo(
    () => allHotels.filter((h) => h.locationCategory === 'distant_excursion'),
    [allHotels]
  );

  const currentList = activeLocationTab === 'main' ? mainHotels : distantHotels;

  const filteredHotels = useMemo(() => {
    return currentList.filter((h) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === '5star') return h.tier === 'luxury_5star';
      if (activeFilter === 'heritage') return h.tier === 'heritage_boutique';
      if (activeFilter === 'mountain') return h.tier === 'mountain_resort';
      if (activeFilter === 'pool') return h.amenities.some((a) => a.toLowerCase().includes('pool') || a.toLowerCase().includes('spa') || a.toLowerCase().includes('jacuzzi'));
      if (activeFilter === 'breakfast') return h.amenities.some((a) => a.toLowerCase().includes('breakfast'));
      if (activeFilter === 'budget') return h.pricePerNight < 4000;
      return true;
    });
  }, [currentList, activeFilter]);

  // Main stay nights vs distant stay nights
  const mainNights = selectedExcursionHotel && travelers.nights > 1 ? travelers.nights - 1 : travelers.nights;

  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + 5);
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkInDate.getDate() + travelers.nights);
  const checkInStr = checkInDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  const checkOutStr = checkOutDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn px-1">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
          Choose hotels for your stay in {destination?.name || 'Destination'}
        </h1>
        <p className="text-xs sm:text-sm text-[#52657D] max-w-xl mx-auto">
          Select your primary hotel for the trip duration, and optionally add a special overnight stay at a scenic distant outpost.
        </p>
        <div className="pt-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#F07828] shadow-2xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>Check-in: {checkInStr} ➔ Check-out: {checkOutStr} ({travelers.nights} Nights)</span>
          </div>
        </div>
      </div>

      {/* Location Section Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 bg-white rounded-2xl border shadow-xs" style={{ borderColor: BRAND.border }}>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveLocationTab('main')}
            className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeLocationTab === 'main'
                ? 'bg-[#008CFF] text-white shadow-xs'
                : 'text-[#52657D] hover:bg-[#F5F8FC]'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>1. Primary Base Hotel ({mainNights} Nights)</span>
            {selectedMainHotel && <span className="w-2 h-2 rounded-full bg-[#12A66A] ring-2 ring-white" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveLocationTab('distant')}
            className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeLocationTab === 'distant'
                ? 'bg-[#008CFF] text-white shadow-xs'
                : 'text-[#52657D] hover:bg-[#F5F8FC]'
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span>2. Scenic Outpost (Optional)</span>
            {selectedExcursionHotel && <span className="w-2 h-2 rounded-full bg-[#12A66A] ring-2 ring-white" />}
          </button>
        </div>

        <div className="text-xs text-[#52657D] font-semibold pr-3 hidden md:block">
          {activeLocationTab === 'main'
            ? `Selected: ${selectedMainHotel ? selectedMainHotel.name.slice(0, 24) : 'None yet'}`
            : `Scenic Stay: ${selectedExcursionHotel ? selectedExcursionHotel.name.slice(0, 24) : 'None (Optional)'}`}
        </div>
      </div>

      {/* Smart Filter Chips with Lucide Icons */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 py-1 px-1">
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeFilter === chip.id;
          const ChipIcon = chip.Icon;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setActiveFilter(chip.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#172B4D] text-white shadow-xs'
                  : 'bg-white border text-[#172B4D] hover:bg-[#F5F8FC]'
              }`}
              style={{ borderColor: isActive ? BRAND.secondary : BRAND.border }}
            >
              <ChipIcon className="w-3.5 h-3.5" />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Distant Outpost Opt-out Button */}
      {activeLocationTab === 'distant' && (
        <div className="p-4 rounded-2xl bg-[#F5F8FC] border flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderColor: BRAND.border }}>
          <div>
            <h4 className="text-xs font-bold text-[#172B4D]">Keep all {travelers.nights} nights at primary hotel?</h4>
            <p className="text-[11px] text-[#52657D]">
              If you don't wish to change hotels for an overnight excursion, you can skip this section.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectExcursionHotel(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              !selectedExcursionHotel
                ? 'bg-[#12A66A] text-white shadow-xs'
                : 'bg-white border text-[#52657D] hover:bg-[#EAF2FA]'
            }`}
            style={{ borderColor: BRAND.border }}
          >
            {!selectedExcursionHotel ? '✓ Staying At Main Hotel Only' : 'Skip Distant Stay'}
          </button>
        </div>
      )}

      {/* Hotels List */}
      <div className="space-y-5 sm:space-y-6">
        {filteredHotels.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border" style={{ borderColor: BRAND.border }}>
            <p className="text-sm text-[#52657D]">No hotels match the selected filter. Try choosing "All Stays".</p>
          </div>
        ) : (
          filteredHotels.map((hotel) => {
            const isMainSelected = selectedMainHotel?.id === hotel.id;
            const isDistantSelected = selectedExcursionHotel?.id === hotel.id;
            const isSelected = activeLocationTab === 'main' ? isMainSelected : isDistantSelected;

            const nightsForThis = activeLocationTab === 'main' ? mainNights : 1;
            const calculatedTotal = hotel.pricePerNight * nightsForThis;

            return (
              <div
                key={hotel.id}
                onClick={() => {
                  if (activeLocationTab === 'main') {
                    onSelectMainHotel(hotel);
                  } else {
                    onSelectExcursionHotel(isDistantSelected ? null : hotel);
                  }
                }}
                className={`bg-white rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col md:flex-row cursor-pointer group ${
                  isSelected
                    ? 'ring-3 ring-[#008CFF] border-transparent shadow-md'
                    : 'hover:shadow-sm hover:border-[#008CFF]/40'
                }`}
                style={{ borderColor: isSelected ? BRAND.primary : BRAND.border }}
              >
                {/* Hotel Thumbnail Image */}
                <div className="md:w-72 h-52 sm:h-56 md:h-auto relative overflow-hidden shrink-0">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#172B4D]/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-400" />
                    <span>{hotel.tier === 'luxury_5star' ? '5-Star Luxury' : hotel.tier === 'heritage_boutique' ? 'Heritage Boutique' : 'Resort & Spa'}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-[#172B4D] leading-snug group-hover:text-[#008CFF] transition-colors">
                          {hotel.name}
                        </h3>
                        <p className="text-xs text-[#52657D] flex items-center gap-1 mt-0.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#F07828] shrink-0" />
                          <span>{hotel.areaName} • {hotel.distanceToCenter}</span>
                        </p>
                      </div>

                      {/* Rating pill */}
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200/60 px-2.5 py-1 rounded-xl text-xs font-black shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{hotel.rating}</span>
                        <span className="text-[10px] text-amber-700 font-normal">({hotel.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Key Amenities */}
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F5F8FC] text-[#172B4D] border"
                          style={{ borderColor: BRAND.border }}
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Verified Sentiment Box */}
                    <div className="p-3 rounded-2xl bg-[#F5F8FC] border space-y-1.5" style={{ borderColor: BRAND.border }}>
                      <div className="flex items-center justify-between text-[11px] font-extrabold text-[#12A66A]">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{hotel.reviewSentiment.percentageLoved}% of travelers loved this stay</span>
                        </span>
                        <span className="text-[#52657D] text-[10px] font-medium">
                          {hotel.reviewSentiment.guestType}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#172B4D] font-semibold">
                        What they liked: <span className="font-normal text-[#52657D]">{hotel.reviewSentiment.whatTheyLiked}</span>
                      </p>

                      <p className="text-[11px] text-[#52657D] italic">
                        "{hotel.reviewSentiment.guestQuote}"
                      </p>
                      <p className="text-[9px] text-[#98A9BC] font-medium">— {hotel.reviewSentiment.guestName}</p>
                    </div>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="pt-3 border-t flex flex-wrap items-center justify-between gap-3" style={{ borderColor: BRAND.border }}>
                    <div>
                      <span className="text-[10px] text-[#52657D] uppercase tracking-wider block font-bold">
                        Price Per Night (Taxes & Fees Included)
                      </span>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xl font-black text-[#172B4D]">
                          {formatINR(hotel.pricePerNight)}
                        </span>
                        <span className="text-xs text-[#52657D]">/ night</span>
                        <span className="text-xs font-black text-[#008CFF] ml-1">
                          Total: {formatINR(calculatedTotal)} ({nightsForThis} night{nightsForThis > 1 ? 's' : ''})
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeLocationTab === 'main') {
                          onSelectMainHotel(hotel);
                        } else {
                          onSelectExcursionHotel(isDistantSelected ? null : hotel);
                        }
                      }}
                      className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#12A66A] text-white shadow-xs'
                          : 'bg-[#008CFF] text-white hover:brightness-105'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>{activeLocationTab === 'main' ? 'Selected Base Hotel' : 'Selected Scenic Stay'}</span>
                        </>
                      ) : (
                        <span>Select This Hotel</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: BRAND.border }}>
        <button
          type="button"
          onClick={onPrev}
          className="px-4 sm:px-5 py-2.5 rounded-xl border text-xs font-bold text-[#172B4D] hover:bg-[#F5F8FC] flex items-center gap-1.5 cursor-pointer"
          style={{ borderColor: BRAND.border }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Excursions</span>
        </button>

        <button
          type="button"
          disabled={!selectedMainHotel}
          onClick={onNext}
          className={`px-6 sm:px-8 py-3 rounded-2xl text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
            selectedMainHotel
              ? 'hover:brightness-110'
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ backgroundColor: BRAND.primary }}
        >
          <span>Generate Final Travel Flow</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
