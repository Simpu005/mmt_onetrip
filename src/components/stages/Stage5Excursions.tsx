import React from 'react';
import { MountainSnow, Car, Bed, Sparkles, Star, ThumbsUp, Check, Plus, ArrowRight, ArrowLeft, Clock, Ticket, Calendar } from 'lucide-react';
import { getExcursionsForDestination } from '../../data/travelData';
import { ExcursionItem, Destination, TravelerConfig } from '../../types/travel';
import { BRAND } from '../../constants/theme';
import { formatINR } from '../../utils/calculator';

interface Stage5ExcursionsProps {
  destination: Destination | null;
  travelers: TravelerConfig;
  selectedExcursions: ExcursionItem[];
  onToggleExcursion: (item: ExcursionItem) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Stage5Excursions: React.FC<Stage5ExcursionsProps> = ({
  destination,
  travelers,
  selectedExcursions,
  onToggleExcursion,
  onNext,
  onPrev,
}) => {
  const destId = destination?.id || 'shimla';
  const excursions = getExcursionsForDestination(destId);

  const totalExcursionCost = selectedExcursions.reduce(
    (acc, curr) => acc + curr.approxCostPerPerson * travelers.count,
    0
  );

  const excursionDay1 = new Date();
  excursionDay1.setDate(excursionDay1.getDate() + 6);
  const excursionDay2 = new Date();
  excursionDay2.setDate(excursionDay2.getDate() + 7);
  const excursionDatesStr = `${excursionDay1.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} & ${excursionDay2.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#008CFF]/10 text-[#008CFF]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stage 5 of 7 • Must-Go Excursions &amp; Scenic Points</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
          Select side scenes &amp; attractions around {destination?.name || 'Destination'}
        </h1>
        <p className="text-sm text-[#52657D] max-w-xl mx-auto">
          Choose which signature viewpoints and day trips you want in your plan. We detail transit modes, stay facilities, and expected activity expenses.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#12A66A]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Scheduled for {excursionDatesStr}</span>
          </div>

          {/* Selected Summary Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12A66A]/10 text-[#12A66A] text-xs font-extrabold">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>
              {selectedExcursions.length} Excursion{selectedExcursions.length === 1 ? '' : 's'} Selected •{' '}
              {formatINR(totalExcursionCost)} total for {travelers.count} traveler{travelers.count > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Excursions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {excursions.map((item) => {
          const isSelected = selectedExcursions.some((e) => e.id === item.id);
          const totalForItem = item.approxCostPerPerson * travelers.count;

          return (
            <div
              key={item.id}
              onClick={() => onToggleExcursion(item)}
              className={`bg-white rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                isSelected
                  ? 'ring-3 ring-[#12A66A] border-transparent shadow-md'
                  : 'hover:shadow-sm hover:border-[#008CFF]/40'
              }`}
              style={{ borderColor: isSelected ? BRAND.success : BRAND.border }}
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-[#172B4D]/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F07828]" />
                      <span>{item.recommendedTime}</span>
                    </span>

                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${
                        isSelected
                          ? 'bg-[#12A66A] text-white border-transparent'
                          : 'bg-white/90 text-[#172B4D] border-white/50'
                      }`}
                    >
                      {isSelected ? '✓ Added to Plan' : '+ Click to Add'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] font-bold text-[#F07828] uppercase tracking-wider">
                      {item.locationArea}
                    </p>
                    <h3 className="text-lg font-black leading-tight drop-shadow-sm">{item.title}</h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-4">
                  {/* Mode of Transit */}
                  <div className="p-2.5 rounded-xl bg-[#F5F8FC] border space-y-1" style={{ borderColor: BRAND.border }}>
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#172B4D]">
                      <Car className="w-3.5 h-3.5 text-[#008CFF]" />
                      <span>Available Transit Mode:</span>
                    </div>
                    <p className="text-[11px] text-[#52657D] font-medium leading-relaxed pl-5">
                      {item.transitMode} <strong className="text-[#008CFF]">({item.transitDuration})</strong>
                    </p>
                  </div>

                  {/* Accommodation Facilities */}
                  <div className="p-2.5 rounded-xl bg-[#F5F8FC] border space-y-1" style={{ borderColor: BRAND.border }}>
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#172B4D]">
                      <Bed className="w-3.5 h-3.5 text-[#F07828]" />
                      <span>Stay & Accommodation Facility:</span>
                    </div>
                    <p className="text-[11px] text-[#52657D] font-medium leading-relaxed pl-5">
                      {item.accommodationLabel}
                    </p>
                  </div>

                  {/* Key Attractions */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#52657D] block">
                      Attractions & Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.attractions.map((att) => (
                        <span
                          key={att}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F5F8FC] text-[#172B4D] border"
                          style={{ borderColor: BRAND.border }}
                        >
                          • {att}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* User Review Experience */}
                  <div className="pt-2 border-t space-y-1.5" style={{ borderColor: BRAND.border }}>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200/60 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{item.reviews.rating}</span>
                        <span className="text-[10px] text-amber-600 font-normal">({item.reviews.count})</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#12A66A] flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{item.reviews.percentageLoved}% recommended</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-[#52657D] italic">
                      "{item.reviews.sampleQuote}"
                    </p>
                    <p className="text-[9px] text-[#98A9BC] font-medium">— {item.reviews.author}</p>
                  </div>
                </div>
              </div>

              {/* Footer with Price and Selection */}
              <div className="p-4 border-t bg-[#F5F8FC] flex items-center justify-between" style={{ borderColor: BRAND.border }}>
                <div>
                  <span className="text-[10px] text-[#52657D] uppercase tracking-wider block font-bold">
                    Approx Expenses (Passes + Food)
                  </span>
                  <span className="text-base font-black text-[#172B4D]">
                    {formatINR(item.approxCostPerPerson)} <span className="text-xs font-normal text-[#52657D]">/ person</span>
                  </span>
                  <span className="text-[10px] text-[#008CFF] font-bold block">
                    {formatINR(totalForItem)} for {travelers.count} travelers
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleExcursion(item);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#12A66A] text-white shadow-xs'
                      : 'bg-[#008CFF] text-white hover:brightness-105'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Excursion</span>
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
          className="px-5 py-2.5 rounded-xl border text-xs font-bold text-[#172B4D] hover:bg-[#F5F8FC] flex items-center gap-1.5"
          style={{ borderColor: BRAND.border }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Transit</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3 rounded-2xl text-white font-extrabold text-sm shadow-md transition-all hover:brightness-110 flex items-center gap-2"
          style={{ backgroundColor: BRAND.primary }}
        >
          <span>Continue to Hotel Selection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
