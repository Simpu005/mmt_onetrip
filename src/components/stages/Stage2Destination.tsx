import React, { useState } from 'react';
import { MapPin, Star, ThumbsUp, Sparkles, ArrowRight, ArrowLeft, Check, Compass, MountainSnow, Palmtree, Landmark, Trees, Layers } from 'lucide-react';
import { DESTINATIONS } from '../../data/travelData';
import { Destination } from '../../types/travel';
import { BRAND } from '../../constants/theme';
import { formatINR } from '../../utils/calculator';

interface Stage2DestinationProps {
  selectedDestination: Destination | null;
  onSelectDestination: (dest: Destination) => void;
  userBudget: number;
  onNext: () => void;
  onPrev: () => void;
}

const FILTER_CHIPS = [
  { id: 'all', label: 'All Destinations', Icon: Layers },
  { id: 'snow', label: 'Snow & Hills', Icon: MountainSnow },
  { id: 'beach', label: 'Beaches & Coastal', Icon: Palmtree },
  { id: 'heritage', label: 'Royal & Heritage', Icon: Landmark },
  { id: 'nature', label: 'Nature & Tea Gardens', Icon: Trees },
  { id: 'adventure', label: 'High Adventure', Icon: Compass },
];

export const Stage2Destination: React.FC<Stage2DestinationProps> = ({
  selectedDestination,
  onSelectDestination,
  userBudget,
  onNext,
  onPrev,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = DESTINATIONS.filter((d) => {
    if (activeFilter === 'all') return true;
    return d.category === activeFilter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn px-1">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
          Where would you like to travel?
        </h1>
        <p className="text-xs sm:text-sm text-[#52657D] max-w-xl mx-auto">
          Explore curated Indian destinations with transparent tier pricing, daily spending estimates, and authentic traveler sentiments.
        </p>
      </div>

      {/* Filter chips with Lucide icons */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 py-1 px-1">
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeFilter === chip.id;
          const ChipIcon = chip.Icon;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setActiveFilter(chip.id)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#008CFF] text-white shadow-xs'
                  : 'bg-white border text-[#172B4D] hover:bg-[#F5F8FC]'
              }`}
              style={{ borderColor: isActive ? BRAND.primary : BRAND.border }}
            >
              <ChipIcon className="w-3.5 h-3.5" />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filtered.map((dest) => {
          const isSelected = selectedDestination?.id === dest.id;

          // Budget analysis for this destination against userBudget
          const isStandardWithinBudget = dest.tierPrices.standard <= userBudget;
          const isBudgetTierWithinBudget = dest.tierPrices.budget <= userBudget;
          const isLuxuryWithinBudget = dest.tierPrices.luxury <= userBudget;

          let budgetBadge = {
            label: 'Matches Budget',
            bg: 'bg-[#12A66A]/10 text-[#12A66A] border-[#12A66A]/30',
            hasSparkles: false,
          };

          if (isLuxuryWithinBudget) {
            budgetBadge = {
              label: 'Luxury Tier Unlocked',
              bg: 'bg-[#008CFF]/10 text-[#008CFF] border-[#008CFF]/30',
              hasSparkles: true,
            };
          } else if (!isBudgetTierWithinBudget) {
            budgetBadge = {
              label: `Out of Budget (+${formatINR(dest.tierPrices.budget - userBudget)})`,
              bg: 'bg-[#D92D36]/10 text-[#D92D36] border-[#D92D36]/30',
              hasSparkles: false,
            };
          } else if (!isStandardWithinBudget) {
            budgetBadge = {
              label: 'Budget Tier Fit',
              bg: 'bg-[#E99A20]/10 text-[#E99A20] border-[#E99A20]/30',
              hasSparkles: false,
            };
          }

          return (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className={`bg-white rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                isSelected
                  ? 'ring-3 ring-[#008CFF] shadow-lg border-transparent'
                  : 'hover:shadow-md hover:border-[#008CFF]/40'
              }`}
              style={{ borderColor: isSelected ? BRAND.primary : BRAND.border }}
            >
              {/* Photo & Badges */}
              <div>
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="bg-[#172B4D]/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-full truncate">
                      {dest.badge}
                    </span>

                    <span
                      className={`text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border backdrop-blur-md flex items-center gap-1 shrink-0 ${budgetBadge.bg}`}
                    >
                      {budgetBadge.hasSparkles && <Sparkles className="w-3 h-3 text-[#008CFF]" />}
                      <span>{budgetBadge.label}</span>
                    </span>
                  </div>

                  {/* Bottom Image Overlay text */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] sm:text-[11px] font-bold text-[#F07828] uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {dest.state}
                    </p>
                    <h3 className="text-lg sm:text-xl font-black leading-tight drop-shadow-sm">{dest.name}</h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  {/* Tagline */}
                  <p className="text-xs font-semibold text-[#52657D] line-clamp-2">
                    {dest.description}
                  </p>

                  {/* Tag chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {dest.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F5F8FC] text-[#52657D] border"
                        style={{ borderColor: BRAND.border }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Tier Pricing Breakdown */}
                  <div className="p-3 rounded-2xl bg-[#F5F8FC] border space-y-2" style={{ borderColor: BRAND.border }}>
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#52657D]">
                      <span>Estimated Tier Cost:</span>
                      <span className="text-[10px] text-[#008CFF] font-extrabold">All-inclusive est.</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <div className="bg-white p-1.5 rounded-lg border text-[11px]" style={{ borderColor: BRAND.border }}>
                        <span className="text-[9px] text-[#52657D] block">Budget</span>
                        <span className="font-extrabold text-[#172B4D]">{formatINR(dest.tierPrices.budget)}</span>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border text-[11px] ring-1 ring-[#008CFF]/30" style={{ borderColor: BRAND.border }}>
                        <span className="text-[9px] text-[#008CFF] font-bold block">Standard</span>
                        <span className="font-extrabold text-[#008CFF]">{formatINR(dest.tierPrices.standard)}</span>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border text-[11px]" style={{ borderColor: BRAND.border }}>
                        <span className="text-[9px] text-[#52657D] block">Luxury</span>
                        <span className="font-extrabold text-[#172B4D]">{formatINR(dest.tierPrices.luxury)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#52657D] pt-1">
                      <span>Daily Incidentals & Food:</span>
                      <span className="font-bold text-[#172B4D]">~{formatINR(dest.dailyIncidentalApprox)}/day</span>
                    </div>
                  </div>

                  {/* Customer Reviews & Feedback */}
                  <div className="pt-2 border-t space-y-2" style={{ borderColor: BRAND.border }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200/60 text-xs font-black">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{dest.reviews.rating}</span>
                        <span className="text-[10px] text-amber-600 font-normal">({dest.reviews.count})</span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#12A66A]">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{dest.reviews.percentageLoved}% loved this</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#52657D] italic line-clamp-2">
                      "{dest.reviews.sampleQuote}"
                    </p>
                    <p className="text-[10px] text-[#98A9BC] font-medium">— {dest.reviews.author}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDestination(dest);
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#12A66A] text-white shadow-xs'
                      : 'bg-[#008CFF] text-white hover:brightness-105'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Selected Destination</span>
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4" />
                      <span>Select {dest.name}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
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
          <span>Back to Budget</span>
        </button>

        <button
          type="button"
          disabled={!selectedDestination}
          onClick={onNext}
          className={`px-6 sm:px-8 py-3 rounded-2xl text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
            selectedDestination
              ? 'hover:brightness-110'
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ backgroundColor: BRAND.primary }}
        >
          <span>Continue with {selectedDestination?.name || 'Selected Place'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
