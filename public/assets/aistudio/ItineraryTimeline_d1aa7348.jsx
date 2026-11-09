import React from 'react';
import { Calendar } from 'lucide-react';
import { BRAND } from '../theme';

/** One day card in the timeline. */
export function ItineraryDayCard({ index, item }) {
  return (
    <div className="relative pl-8 space-y-1">
      <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-white border-2 border-[#F07828] text-[#F07828] text-[10px] font-extrabold flex items-center justify-center shadow-sm">
        {index + 1}
      </div>
      <div className="p-3 bg-[#F7F8FA] rounded-xl border" style={{ borderColor: BRAND.border }}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-[#F07828]">{item.day}</span>
          <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#667085] border">Verified Route</span>
        </div>
        <h5 className="text-xs font-bold text-[#172B4D] mt-0.5">{item.title}</h5>
        <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">{item.details}</p>
      </div>
    </div>
  );
}

export default function ItineraryTimeline({ items, heading = '7-Day Shimla Itinerary Breakdown' }) {
  return (
    <div className="p-6 space-y-4">
      <h4 className="font-bold text-sm text-[#172B4D] uppercase tracking-wider flex items-center gap-1.5">
        <Calendar className="w-4 h-4 text-[#F07828]" /> {heading}
      </h4>
      <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E7E9ED]">
        {items.map((item, idx) => (
          <ItineraryDayCard key={item.day} index={idx} item={item} />
        ))}
      </div>
    </div>
  );
}
