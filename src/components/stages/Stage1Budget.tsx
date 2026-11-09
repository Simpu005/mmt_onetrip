import React, { useMemo } from 'react';
import { Users, Moon, ArrowRight, Backpack, Sparkles, Crown, Gem } from 'lucide-react';
import { BRAND } from '../../constants/theme';
import { TravelerConfig } from '../../types/travel';
import { formatINR } from '../../utils/calculator';

interface Stage1BudgetProps {
  budget: number;
  onBudgetChange: (val: number) => void;
  travelers: TravelerConfig;
  onTravelersChange: (cfg: TravelerConfig) => void;
  onNext: () => void;
}

const PRESET_BUDGETS = [
  { label: 'Pocket Saver', amount: 25000, desc: 'Solo / Backpacking' },
  { label: 'Popular Value', amount: 48000, desc: 'Couples / Small Family' },
  { label: 'Premium Holiday', amount: 85000, desc: '4-Star Stays & Cabs' },
  { label: 'Ultra Luxury', amount: 150000, desc: '5-Star Resorts & Flights' },
];

const GROUP_PRESETS: { type: TravelerConfig['type']; label: string; count: number; desc: string }[] = [
  { type: 'solo', label: 'Solo Traveler', count: 1, desc: '1 Adult' },
  { type: 'couple', label: 'Couple / Duo', count: 2, desc: '2 Adults' },
  { type: 'family', label: 'Family with Kids', count: 4, desc: '2 Adults, 2 Children' },
  { type: 'friends', label: 'Friends Squad', count: 4, desc: '4 Adults' },
];

export const Stage1Budget: React.FC<Stage1BudgetProps> = ({
  budget,
  onBudgetChange,
  travelers,
  onTravelersChange,
  onNext,
}) => {
  // Visual feedback calculations
  const perPersonPerDay = useMemo(() => {
    const totalDays = travelers.nights + 1;
    const persons = Math.max(1, travelers.count);
    return Math.round(budget / (persons * totalDays));
  }, [budget, travelers]);

  const persona = useMemo(() => {
    if (perPersonPerDay < 2500) {
      return {
        title: 'Smart Backpacker / Budget Explorer',
        subtitle: 'Optimal for scenic trains, cozy boutique homestays, and self-guided excursions.',
        badgeColor: '#12A66A',
        IconComponent: Backpack,
      };
    }
    if (perPersonPerDay < 5500) {
      return {
        title: 'Comfort Family Experience (Most Popular)',
        subtitle: 'Great for express trains or direct flights, 3-4 star view resorts, and private mountain cabs.',
        badgeColor: '#008CFF',
        IconComponent: Sparkles,
      };
    }
    if (perPersonPerDay < 11000) {
      return {
        title: 'Premium Leisure Vacation',
        subtitle: 'Enables luxury heritage properties, flight flexi-fares, private guided tours, and fine dining.',
        badgeColor: '#F07828',
        IconComponent: Crown,
      };
    }
    return {
      title: 'Ultra-Luxury VIP Holiday',
      subtitle: '5-Star palatial resorts, suites with private balconies, priority chauffeur cabs, and bespoke itineraries.',
      badgeColor: '#7B2CBF',
      IconComponent: Gem,
    };
  }, [perPersonPerDay]);

  const recommendedAllocations = useMemo(() => {
    return {
      transit: Math.round(budget * 0.28),
      hotel: Math.round(budget * 0.44),
      activitiesFood: Math.round(budget * 0.28),
    };
  }, [budget]);

  const PersonaIcon = persona.IconComponent;

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn px-1">
      {/* Intro Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
          What is your total target budget for this trip?
        </h1>
        <p className="text-xs sm:text-sm text-[#52657D] max-w-xl mx-auto">
          We’ll continuously track your spending against this budget as you choose your destination, transit, hotels, and excursions.
        </p>
      </div>

      {/* Main Budget Input Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 border shadow-sm space-y-6 sm:space-y-8" style={{ borderColor: BRAND.border }}>
        {/* Display Amount & Manual Numeric Input */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#F5F8FC] border" style={{ borderColor: BRAND.border }}>
          <div className="w-full sm:w-auto text-left">
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#52657D] block">
              Configured Trip Budget
            </span>
            <div className="flex flex-wrap items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-4xl font-black text-[#172B4D]">
                {formatINR(budget)}
              </span>
              <span className="text-xs font-semibold text-[#52657D]">
                (~{formatINR(perPersonPerDay)} / traveler / day)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2.5 sm:pt-0 border-t sm:border-0 border-[#D9E5F2]">
            <label className="text-xs font-bold text-[#52657D] shrink-0">Enter Exact:</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm font-bold text-[#52657D]">₹</span>
              <input
                type="number"
                min={10000}
                max={300000}
                step={1000}
                value={budget}
                onChange={(e) => onBudgetChange(Math.max(5000, Number(e.target.value) || 0))}
                className="w-32 pl-7 pr-3 py-1.5 sm:py-2 text-sm font-extrabold border rounded-xl bg-white text-[#172B4D] focus:ring-2 focus:ring-[#008CFF] focus:outline-none"
                style={{ borderColor: BRAND.border }}
              />
            </div>
          </div>
        </div>

        {/* Visual Slider */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-xs font-bold text-[#52657D]">
            <span>₹15,000 (Min Saver)</span>
            <span className="text-[#008CFF] font-extrabold text-sm">{formatINR(budget)}</span>
            <span>₹2,50,000+ (Luxury)</span>
          </div>
          <input
            type="range"
            min={15000}
            max={200000}
            step={2500}
            value={budget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="w-full h-3 bg-[#EAF2FA] rounded-lg appearance-none cursor-pointer accent-[#008CFF]"
          />
        </div>

        {/* Quick Preset Buttons */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#52657D] block">
            Popular Pre-Configured Budgets
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {PRESET_BUDGETS.map((item) => {
              const isSelected = budget === item.amount;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onBudgetChange(item.amount)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#008CFF] bg-[#008CFF]/10 ring-2 ring-[#008CFF]'
                      : 'border-[#D9E5F2] hover:bg-[#F5F8FC]'
                  }`}
                >
                  <p className="text-xs font-bold text-[#172B4D]">{item.label}</p>
                  <p className="text-base font-extrabold text-[#008CFF]">{formatINR(item.amount)}</p>
                  <p className="text-[10px] text-[#52657D] mt-0.5">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Group / Travelers Selection */}
        <div className="pt-4 border-t space-y-4" style={{ borderColor: BRAND.border }}>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#008CFF]" />
            <h3 className="text-xs sm:text-sm font-extrabold text-[#172B4D]">Who is traveling with you?</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {GROUP_PRESETS.map((grp) => {
              const isSelected = travelers.type === grp.type;
              return (
                <button
                  key={grp.type}
                  type="button"
                  onClick={() =>
                    onTravelersChange({
                      ...travelers,
                      type: grp.type,
                      label: grp.label,
                      count: grp.count,
                    })
                  }
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#F07828] bg-[#F07828]/10 ring-2 ring-[#F07828]'
                      : 'border-[#D9E5F2] hover:bg-[#F5F8FC]'
                  }`}
                >
                  <p className="text-xs font-bold text-[#172B4D]">{grp.label}</p>
                  <p className="text-xs font-semibold text-[#F07828] mt-0.5">{grp.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Nights Duration */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-[#008CFF]" />
              <div>
                <p className="text-xs font-extrabold text-[#172B4D]">Trip Duration</p>
                <p className="text-[11px] text-[#52657D]">
                  {travelers.nights} Nights / {travelers.nights + 1} Days
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {[3, 4, 5, 6, 7, 8].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onTravelersChange({ ...travelers, nights: n })}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    travelers.nights === n
                      ? 'bg-[#008CFF] text-white shadow-xs'
                      : 'bg-[#F5F8FC] border text-[#172B4D] hover:bg-[#EAF2FA]'
                  }`}
                  style={{ borderColor: BRAND.border }}
                >
                  {n}N
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Visual & Text Feedback Panel with Clean Responsive Layout (No Emoji) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#EAF2FA] to-[#F5F8FC] border space-y-3.5" style={{ borderColor: BRAND.border }}>
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
              style={{ backgroundColor: `${persona.badgeColor}18`, color: persona.badgeColor }}
            >
              <PersonaIcon className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#52657D] block">
                AI Budget Assessment
              </span>
              <div className="mt-0.5">
                <span
                  className="inline-block text-xs font-black px-2.5 py-0.5 rounded-md border leading-snug"
                  style={{
                    backgroundColor: `${persona.badgeColor}12`,
                    color: persona.badgeColor,
                    borderColor: `${persona.badgeColor}30`,
                  }}
                >
                  {persona.title}
                </span>
              </div>
              <p className="text-xs text-[#172B4D] mt-1.5 leading-relaxed">{persona.subtitle}</p>
            </div>
          </div>

          {/* Recommended allocation guidelines */}
          <div className="pt-3 border-t grid grid-cols-3 gap-2 text-center" style={{ borderColor: BRAND.border }}>
            <div className="bg-white/80 p-2 sm:p-2.5 rounded-xl border" style={{ borderColor: BRAND.border }}>
              <p className="text-[9px] sm:text-[10px] text-[#52657D] font-bold">Transit (28%)</p>
              <p className="text-xs sm:text-sm font-extrabold text-[#008CFF]">{formatINR(recommendedAllocations.transit)}</p>
            </div>
            <div className="bg-white/80 p-2 sm:p-2.5 rounded-xl border" style={{ borderColor: BRAND.border }}>
              <p className="text-[9px] sm:text-[10px] text-[#52657D] font-bold">Stays (44%)</p>
              <p className="text-xs sm:text-sm font-extrabold text-[#F07828]">{formatINR(recommendedAllocations.hotel)}</p>
            </div>
            <div className="bg-white/80 p-2 sm:p-2.5 rounded-xl border" style={{ borderColor: BRAND.border }}>
              <p className="text-[9px] sm:text-[10px] text-[#52657D] font-bold">Activities (28%)</p>
              <p className="text-xs sm:text-sm font-extrabold text-[#12A66A]">{formatINR(recommendedAllocations.activitiesFood)}</p>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-white font-extrabold text-sm shadow-md transition-all hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: BRAND.primary }}
          >
            <span>Lock Budget & Choose Destination</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
