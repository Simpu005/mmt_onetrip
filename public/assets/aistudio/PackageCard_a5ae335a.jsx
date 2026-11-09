import React from 'react';
import { Clock, MapPin, CheckCircle2, Star, Flame, ChevronRight } from 'lucide-react';
import { BRAND } from '../theme';

export default function PackageCard({ pkg, onSelect }) {
  return (
    <div
      className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
      style={{ borderColor: BRAND.border }}
    >
      <div>
        {/* Image + badges */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 bg-[#172B4D]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md">
            {pkg.badge}
          </div>
          <div className="absolute bottom-2 left-2 bg-white/95 text-[#172B4D] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
            <Clock className="w-3 h-3 text-[#F07828]" />
            <span>{pkg.duration}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <div>
            <p className="text-[11px] font-bold text-[#F07828] uppercase tracking-wide flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {pkg.destination}
            </p>
            <h4 className="font-bold text-base text-[#172B4D] leading-snug line-clamp-1 group-hover:text-[#F07828] transition-colors mt-0.5">
              {pkg.title}
            </h4>
          </div>

          <div className="flex flex-wrap gap-1">
            {pkg.tags.map((tag) => (
              <span key={tag} className="bg-[#F0F1F3] text-[#667085] text-[10px] font-medium px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <ul className="space-y-1 text-xs text-[#172B4D]">
            {pkg.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex items-start space-x-1.5 text-[11px] text-[#667085]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#12B76A] flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-[#F7F8FA] space-y-3" style={{ borderColor: BRAND.border }}>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-200/60">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{pkg.rating}</span>
            <span className="text-[10px] text-amber-600 font-normal">({pkg.reviewsCount})</span>
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-[#667085] font-medium">
            <Flame className="w-3.5 h-3.5 text-[#F07828]" />
            <span>{pkg.bookedCount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xs text-[#667085] block">Starts at</span>
            <span className="text-lg font-extrabold text-[#172B4D] leading-none">{pkg.budget}</span>
          </div>
          <button
            onClick={() => onSelect(pkg)}
            className="px-3 py-2 rounded-xl text-white font-bold text-xs shadow transition-all hover:brightness-110 flex items-center space-x-1"
            style={{ backgroundColor: BRAND.primary }}
          >
            <span>Customize</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
