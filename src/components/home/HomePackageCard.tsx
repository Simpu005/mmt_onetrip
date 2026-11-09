import React from 'react';
import { Clock, MapPin, CheckCircle2, Star, Flame, ChevronRight } from 'lucide-react';
import { BRAND } from '../../constants/theme';
import { HomePackage } from '../../data/homePackages';

interface HomePackageCardProps {
  pkg: HomePackage;
  onSelect: (pkg: HomePackage) => void;
}

export const HomePackageCard: React.FC<HomePackageCardProps> = ({ pkg, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(pkg)}
      className="bg-white rounded-3xl border overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
      style={{ borderColor: BRAND.border }}
    >
      <div>
        {/* Image + Badges */}
        <div className="relative h-44 sm:h-48 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2.5 left-2.5 bg-[#172B4D]/90 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-xs">
            {pkg.badge}
          </div>
          <div className="absolute bottom-2.5 left-2.5 bg-white/95 text-[#172B4D] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
            <Clock className="w-3 h-3 text-[#F07828]" />
            <span>{pkg.duration}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          <div>
            <p className="text-[11px] font-extrabold text-[#F07828] uppercase tracking-wide flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{pkg.destination}</span>
            </p>
            <h4 className="font-black text-base text-[#172B4D] leading-snug line-clamp-1 group-hover:text-[#008CFF] transition-colors mt-0.5">
              {pkg.title}
            </h4>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {pkg.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#F0F1F3] text-[#52657D] text-[10px] font-bold px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Key Highlights */}
          <ul className="space-y-1.5 pt-1">
            {pkg.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex items-start space-x-1.5 text-[11px] text-[#52657D]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#12A66A] shrink-0 mt-0.5 stroke-[2.5]" />
                <span className="line-clamp-1 font-medium">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer */}
      <div
        className="p-4 border-t bg-[#F7F8FA] space-y-3"
        style={{ borderColor: BRAND.border }}
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 bg-amber-50 text-amber-800 font-extrabold px-2 py-0.5 rounded-md border border-amber-200/60">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{pkg.rating}</span>
            <span className="text-[10px] text-amber-700 font-normal">({pkg.reviewsCount})</span>
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-[#52657D] font-bold">
            <Flame className="w-3.5 h-3.5 text-[#F07828]" />
            <span>{pkg.bookedCount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[10px] text-[#52657D] block font-medium">Starts at</span>
            <span className="text-lg sm:text-xl font-black text-[#172B4D] leading-none">
              {pkg.budget}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(pkg);
            }}
            className="px-3.5 py-2 rounded-xl text-white font-black text-xs shadow-sm transition-all hover:brightness-110 flex items-center space-x-1 cursor-pointer"
            style={{ backgroundColor: BRAND.primary }}
          >
            <span>Customize</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
