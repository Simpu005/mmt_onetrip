import React from 'react';
import { X, Info } from 'lucide-react';
import ItineraryTimeline from './ItineraryTimeline';
import { BRAND } from '../theme';

export default function PackageDrawer({ pkg, itinerary, onClose, onEdit, onBook }) {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Hero */}
          <div className="relative h-60">
            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="bg-[#F07828] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                AI Guaranteed Itinerary
              </span>
              <h3 className="text-xl font-extrabold mt-1">{pkg.title}</h3>
            </div>
          </div>

          {/* Summary */}
          <div className="p-6 border-b space-y-3" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#667085]">
                Duration: <strong className="text-[#172B4D]">{pkg.duration}</strong>
              </span>
              <span className="text-[#667085]">
                Est. Cost: <strong className="text-[#F07828] text-base">{pkg.budget}</strong>
              </span>
            </div>
            <div className="bg-[#F07828]/5 p-3 rounded-xl border border-[#F07828]/20 flex items-center space-x-3 text-xs text-[#172B4D]">
              <Info className="w-5 h-5 text-[#F07828] flex-shrink-0" />
              <span>
                This package matches your family budget criteria. All inclusions like cab, transfers, breakfast, and
                snow passes are bundled.
              </span>
            </div>
          </div>

          <ItineraryTimeline items={itinerary} />
        </div>

        {/* Sticky action bar */}
        <div
          className="p-4 border-t bg-white sticky bottom-0 flex items-center justify-between gap-3"
          style={{ borderColor: BRAND.border }}
        >
          <div>
            <span className="text-[11px] text-[#667085] block">Total for 4 Guests</span>
            <span className="text-xl font-black text-[#172B4D]">{pkg.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="px-3 py-2.5 rounded-xl border text-xs font-bold text-[#172B4D] hover:bg-[#F0F1F3]"
              style={{ borderColor: BRAND.border }}
            >
              Edit Package
            </button>
            <button
              onClick={onBook}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg transition-all hover:brightness-110"
              style={{ backgroundColor: BRAND.primary }}
            >
              Proceed to Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
