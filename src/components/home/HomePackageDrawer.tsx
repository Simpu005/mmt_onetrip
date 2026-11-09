import React from 'react';
import { X, Info, Calendar, ArrowRight, ShieldCheck, Check, Sparkles, MapPin } from 'lucide-react';
import { HomePackage, ItineraryItem, SHIMLA_ITINERARY } from '../../data/homePackages';
import { BRAND } from '../../constants/theme';

interface HomePackageDrawerProps {
  pkg: HomePackage | null;
  onClose: () => void;
  onCustomizeInStages: (pkg: HomePackage) => void;
  onBookDirect: (pkg: HomePackage) => void;
}

export const HomePackageDrawer: React.FC<HomePackageDrawerProps> = ({
  pkg,
  onClose,
  onCustomizeInStages,
  onBookDirect,
}) => {
  if (!pkg) return null;

  const itinerary: ItineraryItem[] = SHIMLA_ITINERARY.slice(0, pkg.days);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Hero Banner */}
          <div className="relative h-64 sm:h-72">
            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Floating Title Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bg-[#F07828] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  AI Guaranteed Itinerary
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                  {pkg.badge}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm">
                {pkg.title}
              </h3>
              <p className="text-xs text-blue-100 flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#F07828]" />
                <span>{pkg.destination} • {pkg.duration}</span>
              </p>
            </div>
          </div>

          {/* Pricing & Value Summary Card */}
          <div className="p-5 sm:p-6 border-b space-y-4" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#52657D] font-bold block uppercase tracking-wider">
                  Duration &amp; Nights
                </span>
                <strong className="text-sm sm:text-base text-[#172B4D] font-black">{pkg.duration}</strong>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#52657D] font-bold block uppercase tracking-wider">
                  Estimated Total Cost
                </span>
                <strong className="text-xl sm:text-2xl text-[#F07828] font-black">{pkg.budget}</strong>
              </div>
            </div>

            <div className="bg-[#F07828]/5 p-3.5 rounded-2xl border border-[#F07828]/20 flex items-start space-x-3 text-xs text-[#172B4D]">
              <Info className="w-5 h-5 text-[#F07828] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-extrabold text-[#D96518]">100% Bundled &amp; Price Protected</p>
                <p className="text-[#52657D] font-medium leading-relaxed">
                  All inclusions like private cab transit, verified hotel stay, daily breakfast, and excursions are bundled with zero surprise charges.
                </p>
              </div>
            </div>

            {/* Package Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {pkg.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-[#F5F8FC] border text-[11px] font-bold text-[#172B4D]"
                  style={{ borderColor: BRAND.border }}
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Day-by-Day Timeline Itinerary Breakdown */}
          <div className="p-5 sm:p-6 space-y-4">
            <h4 className="font-black text-xs sm:text-sm text-[#172B4D] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#F07828]" />
              <span>{pkg.days}-Day Curated Journey Schedule</span>
            </h4>

            <div className="space-y-3.5 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E7E9ED]">
              {itinerary.map((item, idx) => (
                <div key={item.day} className="relative pl-8 space-y-1">
                  <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-white border-2 border-[#F07828] text-[#F07828] text-[11px] font-black flex items-center justify-center shadow-xs">
                    {idx + 1}
                  </div>
                  <div
                    className="p-3.5 bg-[#F7F8FA] rounded-2xl border space-y-1"
                    style={{ borderColor: BRAND.border }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#F07828]">{item.day}</span>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded-md text-[#52657D] border font-bold" style={{ borderColor: BRAND.border }}>
                        Verified Route
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-black text-[#172B4D] leading-snug">
                      {item.title}
                    </h5>
                    <p className="text-[11px] sm:text-xs text-[#52657D] font-medium leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div
          className="p-4 sm:p-5 border-t bg-white sticky bottom-0 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg"
          style={{ borderColor: BRAND.border }}
        >
          <div className="text-left w-full sm:w-auto">
            <span className="text-[10px] text-[#52657D] block font-bold uppercase tracking-wider">
              Total for 4 Travelers
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#172B4D] leading-none">
              {pkg.budget}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Eye-catching Launch in 7-Stage Planner */}
            <button
              type="button"
              onClick={() => onCustomizeInStages(pkg)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border-2 border-[#008CFF] text-[#008CFF] hover:bg-[#008CFF]/5 text-xs font-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#008CFF]" />
              <span>Customize in Planner</span>
            </button>

            {/* Direct Proceed */}
            <button
              type="button"
              onClick={() => onBookDirect(pkg)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-white font-black text-xs sm:text-sm shadow-md transition-all hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: BRAND.primary }}
            >
              <span>Instant Book</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
