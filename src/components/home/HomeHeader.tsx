import React from 'react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { BRAND } from '../../constants/theme';

interface HomeHeaderProps {
  onLaunchPlanner: () => void;
  userName?: string;
  userInitials?: string;
  membership?: string;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onLaunchPlanner,
  userName = 'Rahul Kumar',
  userInitials = 'RK',
  membership = 'MMT Black Member',
}) => {
  return (
    <header
      className="sticky top-0 z-40 bg-white border-b shadow-xs"
      style={{ borderColor: BRAND.border }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2">
        {/* Logo & Branding */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white shadow-sm text-base sm:text-lg shrink-0"
            style={{ backgroundColor: BRAND.primary }}
          >
            my
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-base sm:text-lg tracking-tight text-[#172B4D]">
                make<span style={{ color: BRAND.primary }}>my</span>trip
              </span>
              <span className="bg-[#F07828]/10 text-[#F07828] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shrink-0">
                <Sparkles className="w-2.5 h-2.5" /> AI Planner
              </span>
            </div>
            <p className="text-[11px] text-[#52657D] hidden sm:block font-medium">
              Intelligent Hyper-Personalized Itineraries
            </p>
          </div>
        </div>

        {/* Center / Action: Eye-Catching Header Button to 7-Stage Planner */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onLaunchPlanner}
            className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-sm transition-all hover:brightness-110 flex items-center gap-1.5 cursor-pointer whitespace-nowrap animate-pulse hover:animate-none"
            style={{
              background: 'linear-gradient(135deg, #008CFF 0%, #006FCC 100%)',
            }}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Launch 7-Stage Planner</span>
            <span className="sm:hidden">7-Stage Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Currency Chip */}
          <div className="hidden md:flex items-center space-x-1.5 bg-[#F0F1F3] px-3 py-1.5 rounded-full text-xs font-bold text-[#172B4D]">
            <span className="w-2 h-2 rounded-full bg-[#12A66A]" />
            <span>INR (₹)</span>
          </div>

          {/* User Profile */}
          <div
            className="flex items-center space-x-2 pl-2 border-l"
            style={{ borderColor: BRAND.border }}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F07828] to-[#D96518] text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
              {userInitials}
            </div>
            <div className="hidden lg:block text-left leading-tight">
              <p className="text-xs font-black text-[#172B4D]">{userName}</p>
              <p className="text-[10px] font-semibold text-[#52657D]">{membership}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
