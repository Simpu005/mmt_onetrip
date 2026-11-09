import React from 'react';
import { Compass, Sparkles, ArrowRight, ShieldCheck, Wallet, MapPin } from 'lucide-react';
import { BRAND } from '../../constants/theme';

interface HomePlannerBannerProps {
  onLaunchPlanner: () => void;
}

export const HomePlannerBanner: React.FC<HomePlannerBannerProps> = ({ onLaunchPlanner }) => {
  return (
    <div
      onClick={onLaunchPlanner}
      className="relative rounded-3xl p-5 sm:p-7 border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.008] cursor-pointer overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, #172B4D 0%, #0D1B35 60%, #006FCC 100%)',
        borderColor: '#008CFF',
      }}
    >
      {/* Decorative Gradient Glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#008CFF]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#008CFF]/30 transition-all" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#F07828]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F07828]/30 transition-all" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-white">
        {/* Left Info */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#F07828] text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Interactive Experience</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/15 text-blue-200 border border-white/20">
              <ShieldCheck className="w-3 h-3 text-[#12A66A]" />
              <span>Live MMT Inventory &amp; Budget Tracker</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
            Prefer building step-by-step with real-time budget subtraction?
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            Walk through our 7 guided stages: set total budget, choose verified destinations, pick flights/trains/buses, customize must-visit excursions, lock hand-picked stays, and generate your dynamic day-by-day milestone travel flow!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-blue-200 font-bold">
            <span className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-md">
              <Wallet className="w-3 h-3 text-[#12A66A]" /> Live Budget Subtraction
            </span>
            <span className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-md">
              <MapPin className="w-3 h-3 text-[#F07828]" /> 17 Origin Hubs
            </span>
            <span className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-md">
              <Compass className="w-3 h-3 text-[#008CFF]" /> Dynamic Milestone Flow
            </span>
          </div>
        </div>

        {/* Right Eyecatching CTA Button */}
        <div className="shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLaunchPlanner();
            }}
            className="w-full md:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#F07828] to-[#D96518] hover:brightness-110 text-white font-black text-sm sm:text-base shadow-xl flex items-center justify-center gap-2.5 transition-all transform group-hover:scale-105 cursor-pointer ring-4 ring-orange-500/30"
          >
            <Compass className="w-5 h-5 stroke-[2.5]" />
            <span>Launch 7-Stage Smart Planner</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
