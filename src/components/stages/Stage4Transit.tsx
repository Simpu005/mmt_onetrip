import React, { useState, useMemo } from 'react';
import { Plane, Train, Bus, Clock, ShieldCheck, Star, ArrowRight, ArrowLeft, Check, Utensils, Luggage, Layers, Sparkles, Zap, Award, Calendar } from 'lucide-react';
import { getTransitsForRoute } from '../../data/travelData';
import { TransitOption, Destination, HomeCity, TravelerConfig } from '../../types/travel';
import { BRAND } from '../../constants/theme';
import { formatINR } from '../../utils/calculator';

interface Stage4TransitProps {
  destination: Destination | null;
  homeCity: HomeCity | null;
  travelers: TravelerConfig;
  selectedTransit: TransitOption | null;
  onSelectTransit: (transit: TransitOption) => void;
  onNext: () => void;
  onPrev: () => void;
}

const FILTER_CHIPS = [
  { id: 'all', label: 'All Modes', Icon: Layers },
  { id: 'flight', label: 'Flights', Icon: Plane },
  { id: 'train', label: 'Express Trains', Icon: Train },
  { id: 'bus', label: 'Volvo Sleeper Buses', Icon: Bus },
  { id: 'budget', label: 'Budget Friendly', Icon: Zap },
  { id: 'fastest', label: 'Fastest Route', Icon: Clock },
  { id: 'luxury', label: 'Premium Class', Icon: Award },
];

export const Stage4Transit: React.FC<Stage4TransitProps> = ({
  destination,
  homeCity,
  travelers,
  selectedTransit,
  onSelectTransit,
  onNext,
  onPrev,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const destId = destination?.id || 'shimla';
  const originName = homeCity?.name || 'New Delhi';

  const transits = useMemo(() => {
    return getTransitsForRoute(destId, originName);
  }, [destId, originName]);

  const filtered = useMemo(() => {
    return transits.filter((t) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'flight') return t.type === 'flight';
      if (activeFilter === 'train') return t.type === 'train';
      if (activeFilter === 'bus') return t.type === 'bus';
      if (activeFilter === 'budget') return t.pricePerPerson <= 1500;
      if (activeFilter === 'fastest') return t.duration.includes('2h');
      if (activeFilter === 'luxury') return t.pricePerPerson >= 3000;
      return true;
    });
  }, [transits, activeFilter]);

  const getTransitIcon = (type: TransitOption['type']) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-4 h-4 text-[#008CFF]" />;
      case 'train':
        return <Train className="w-4 h-4 text-[#F07828]" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-[#12A66A]" />;
    }
  };

  const outboundDate = new Date();
  outboundDate.setDate(outboundDate.getDate() + 5);
  const returnDate = new Date(outboundDate);
  returnDate.setDate(outboundDate.getDate() + travelers.nights);
  const outboundDateStr = outboundDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const returnDateStr = returnDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn px-1">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
          Choose how you wish to travel
        </h1>
        <p className="text-xs sm:text-sm text-[#52657D] max-w-xl mx-auto">
          From {homeCity?.name || 'Home'} to {destination?.name || 'Destination'} for {travelers.count} traveler{travelers.count > 1 ? 's' : ''}. Round-trip costs are factored directly into your live budget.
        </p>
        <div className="pt-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#008CFF] shadow-2xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>Outbound: {outboundDateStr} • Return: {returnDateStr} ({travelers.nights} Nights)</span>
          </div>
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

      {/* Transit Cards List */}
      <div className="space-y-4">
        {filtered.map((transit) => {
          const isSelected = selectedTransit?.id === transit.id;
          const totalCostRoundTrip = transit.pricePerPerson * travelers.count * 2;

          return (
            <div
              key={transit.id}
              onClick={() => onSelectTransit(transit)}
              className={`bg-white rounded-3xl border p-4 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5 group ${
                isSelected
                  ? 'ring-3 ring-[#008CFF] border-transparent shadow-md'
                  : 'hover:border-[#008CFF]/40 hover:shadow-xs'
              }`}
              style={{ borderColor: isSelected ? BRAND.primary : BRAND.border }}
            >
              {/* Left Details */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F5F8FC] border text-xs font-extrabold text-[#172B4D]" style={{ borderColor: BRAND.border }}>
                    {getTransitIcon(transit.type)}
                    <span className="uppercase text-[11px]">{transit.carrier}</span>
                    <span className="text-[#52657D] text-[10px]">({transit.number})</span>
                  </div>

                  {transit.badge && (
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#F07828]/10 text-[#F07828]">
                      {transit.badge}
                    </span>
                  )}

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#12A66A]/10 text-[#12A66A]">
                    {transit.classType}
                  </span>
                </div>

                {/* Timeline row */}
                <div className="flex items-center gap-3 sm:gap-8 pt-1">
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-[#172B4D]">
                      {transit.departureTime}
                    </span>
                    <p className="text-[11px] font-semibold text-[#52657D]">{transit.originHub}</p>
                  </div>

                  {/* Graphic indicator */}
                  <div className="flex-1 max-w-[140px] text-center">
                    <span className="text-[10px] font-extrabold text-[#52657D] block mb-0.5">
                      {transit.duration}
                    </span>
                    <div className="relative flex items-center justify-center">
                      <div className="w-full h-0.5 bg-[#D9E5F2]" />
                      <div className="absolute w-2 h-2 rounded-full bg-[#008CFF]" />
                    </div>
                    <span className="text-[9px] font-bold text-[#12A66A] block mt-0.5">
                      {transit.stops}
                    </span>
                  </div>

                  <div>
                    <span className="text-xl sm:text-2xl font-black text-[#172B4D]">
                      {transit.arrivalTime}
                    </span>
                    <p className="text-[11px] font-semibold text-[#52657D]">{transit.destHub}</p>
                  </div>
                </div>

                {/* Inclusions & Highlights */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#52657D]">
                  <span className="inline-flex items-center gap-1 bg-[#F5F8FC] px-2 py-0.5 rounded border" style={{ borderColor: BRAND.border }}>
                    <Luggage className="w-3 h-3 text-[#52657D]" />
                    <span>{transit.baggage}</span>
                  </span>

                  {transit.foodIncluded && (
                    <span className="inline-flex items-center gap-1 bg-[#12A66A]/10 text-[#12A66A] font-bold px-2 py-0.5 rounded">
                      <Utensils className="w-3 h-3" />
                      <span>Complimentary Meals</span>
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 text-[#12A66A] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{transit.onTimeRating}% On-Time Arrival</span>
                  </span>
                </div>

                {/* Traveler Experience / Review */}
                <div className="bg-[#F5F8FC] p-2.5 rounded-xl border text-[11px] text-[#52657D] italic flex items-center gap-2" style={{ borderColor: BRAND.border }}>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                  <span>"{transit.reviewHighlight}"</span>
                </div>
              </div>

              {/* Right Pricing & Action */}
              <div className="md:border-l md:pl-6 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 sm:gap-4 shrink-0 border-t md:border-t-0 pt-3 md:pt-0" style={{ borderColor: BRAND.border }}>
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-[#52657D] uppercase tracking-wider block font-bold">
                    Per Traveler / One-Way
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#172B4D]">
                    {formatINR(transit.pricePerPerson)}
                  </span>
                  <span className="text-[10px] text-[#F07828] font-extrabold block">
                    Round-trip: {formatINR(totalCostRoundTrip)} ({travelers.count} pax)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTransit(transit);
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
                      <span>Selected Option</span>
                    </>
                  ) : (
                    <span>Select Transit</span>
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
          <span>Back to Home City</span>
        </button>

        <button
          type="button"
          disabled={!selectedTransit}
          onClick={onNext}
          className={`px-6 sm:px-8 py-3 rounded-2xl text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
            selectedTransit
              ? 'hover:brightness-110'
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ backgroundColor: BRAND.primary }}
        >
          <span>Continue to Must-Go Excursions</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
