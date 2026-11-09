import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function Breadcrumb({ trail = ['Home', 'AI Trip Planner'], current = 'Custom Packages Studio' }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 text-xs text-[#667085]">
        {trail.map((label) => (
          <React.Fragment key={label}>
            <span>{label}</span>
            <ChevronRight className="w-3 h-3" />
          </React.Fragment>
        ))}
        <span className="text-[#F07828] font-semibold">{current}</span>
      </div>
      <span className="inline-flex items-center gap-1.5 text-xs text-[#12B76A] bg-[#12B76A]/10 font-medium px-2.5 py-1 rounded-full">
        <ShieldCheck className="w-3.5 h-3.5" /> 100% Guaranteed AI Price Matching
      </span>
    </div>
  );
}
