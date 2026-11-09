import React from 'react';
import { Award, ChevronRight, Sliders, Hotel, Car, Utensils, Compass, ArrowRight } from 'lucide-react';
import { BRAND } from '../../constants/theme';
import { HomePackage } from '../../data/homePackages';

const INCLUSIONS = [
  { icon: Hotel, label: 'Heritage Hotel' },
  { icon: Car, label: 'Private SUV' },
  { icon: Utensils, label: 'Breakfast & Dinner' },
  { icon: Compass, label: 'Solang Excursion' },
];

interface HomeFeaturedPackageProps {
  pkg: HomePackage;
  onViewItinerary: () => void;
  onTweak: () => void;
  onCustomizeInPlanner?: () => void;
}

export const HomeFeaturedPackage: React.FC<HomeFeaturedPackageProps> = ({
  pkg,
  onViewItinerary,
  onTweak,
  onCustomizeInPlanner,
}) => {
  return (
    <section
      className="bg-white rounded-3xl p-5 sm:p-7 border shadow-sm relative overflow-hidden"
      style={{ borderColor: BRAND.border }}
    >
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Visual Card */}
        <div className="relative w-full lg:w-2/5 h-56 sm:h-64 rounded-2xl overflow-hidden group shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-[#172B4D]/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Award className="w-3.5 h-3.5 text-[#F07828]" />
            <span>Featured Prototype Case Study</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 rounded-xl text-white">
            <p className="text-xs font-medium text-gray-200">Shimla, Himachal Pradesh</p>
            <p className="text-lg font-black leading-tight">Shimla Family Odyssey</p>
          </div>
        </div>

        {/* Details & Action */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-[#F07828] uppercase tracking-wider">
                  {pkg.duration} PACKAGE
                </span>
                <span className="bg-[#12A66A]/10 text-[#12A66A] text-xs font-black px-2.5 py-0.5 rounded-full">
                  Budget Match
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#172B4D] mt-1 leading-snug">
                {pkg.title}
              </h2>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs text-[#52657D] block font-medium">Total Package Price</span>
              <span className="text-2xl sm:text-3xl font-black text-[#172B4D]">{pkg.budget}</span>
              <span className="text-xs text-[#52657D] block font-medium">for 4 travelers (All Inclusive)</span>
            </div>
          </div>

          {/* 4 Inclusions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INCLUSIONS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="p-2.5 rounded-xl bg-[#F0F1F3] text-xs font-semibold flex items-center space-x-2 text-[#172B4D]"
              >
                <Icon className="w-4 h-4 text-[#F07828] shrink-0" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-[#52657D] line-clamp-2 leading-relaxed">
            {pkg.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onViewItinerary}
              className="px-5 py-2.5 rounded-xl text-white font-black text-xs sm:text-sm shadow-md transition-all hover:brightness-105 flex items-center space-x-1.5 cursor-pointer"
              style={{ backgroundColor: BRAND.primary }}
            >
              <span>View 7-Day Itinerary Breakdown</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onTweak}
              className="px-4 py-2.5 rounded-xl bg-[#F0F1F3] hover:bg-[#E7E9ED] text-[#172B4D] font-bold text-xs sm:text-sm transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#52657D]" />
              <span>Tweak Budget or Nights</span>
            </button>

            {onCustomizeInPlanner && (
              <button
                type="button"
                onClick={onCustomizeInPlanner}
                className="px-4 py-2.5 rounded-xl border-2 border-[#008CFF] text-[#008CFF] hover:bg-[#008CFF]/5 font-black text-xs sm:text-sm transition-colors flex items-center space-x-1.5 cursor-pointer ml-auto"
              >
                <span>Customize in Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
