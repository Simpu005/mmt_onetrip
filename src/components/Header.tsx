import React from 'react';
import { Sparkles, ArrowLeft, RefreshCw, ShieldCheck, User } from 'lucide-react';
import { BRAND } from '../constants/theme';

interface HeaderProps {
  onResetTrip?: () => void;
  onGoHome?: () => void;
  onReturnHome?: () => void;
  currentStep: number;
}

export const Header: React.FC<HeaderProps> = ({ onResetTrip, onGoHome, onReturnHome, currentStep }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-xs" style={{ borderColor: BRAND.border }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand identity (Left) */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 min-w-0">
          {onReturnHome && (
            <button
              onClick={onReturnHome}
              className="flex items-center space-x-1 text-xs font-bold text-[#52657D] hover:text-[#008CFF] transition-colors p-1.5 rounded-lg hover:bg-[#F5F8FC] shrink-0 cursor-pointer"
              title="Return to Home Page"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}

          {currentStep > 1 && !onReturnHome && (
            <button
              onClick={onGoHome}
              className="flex items-center space-x-1 text-xs font-semibold text-[#52657D] hover:text-[#008CFF] transition-colors p-1.5 rounded-lg hover:bg-[#F5F8FC] shrink-0 cursor-pointer"
              title="Return to start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden md:inline">Start Over</span>
            </button>
          )}

          <div className="flex items-center space-x-2 shrink-0">
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-black text-white shadow-xs text-sm sm:text-base tracking-tighter shrink-0"
              style={{ backgroundColor: BRAND.primary }}
            >
              my
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#172B4D] leading-tight">
                  make<span style={{ color: BRAND.primary }}>my</span>trip
                </span>
                <span
                  className="text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 shrink-0"
                  style={{ backgroundColor: `${BRAND.accent}15`, color: BRAND.accent }}
                >
                  <Sparkles className="w-2.5 h-2.5" /> ONE TRIP
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#52657D] hidden lg:block leading-none mt-0.5">
                Smart Budget Allocator & Hyper-Personalized Booking Flow
              </p>
            </div>
          </div>
        </div>

        {/* Right side info & user */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
          {/* Guaranteed Price Badge - hidden on small mobile */}
          <div className="hidden sm:flex items-center space-x-1.5 text-[11px] font-semibold text-[#12A66A] bg-[#12A66A]/10 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden md:inline">Guaranteed Best Price</span>
            <span className="md:hidden">Best Price</span>
          </div>

          {/* Compact Currency Chip */}
          <div
            className="flex items-center space-x-1 bg-[#F5F8FC] border px-2 py-1 rounded-lg text-[11px] sm:text-xs font-bold text-[#172B4D] shrink-0"
            style={{ borderColor: BRAND.border }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#12A66A] shrink-0" />
            <span>₹ INR</span>
          </div>

          {/* Reset Plan Button */}
          {onResetTrip && (
            <button
              onClick={onResetTrip}
              className="text-xs text-[#52657D] hover:text-[#D92D36] p-1.5 rounded-lg hover:bg-[#F5F8FC] transition-colors flex items-center gap-1 shrink-0"
              title="Reset all preferences"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Reset</span>
            </button>
          )}

          {/* Account Profile - compact avatar on mobile, name on desktop */}
          <div className="flex items-center space-x-2 pl-1.5 sm:pl-2 border-l shrink-0" style={{ borderColor: BRAND.border }}>
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0"
              style={{ backgroundColor: BRAND.secondary }}
              title="Rahul Kumar (MMT Black Member)"
            >
              RK
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold leading-tight text-[#172B4D] truncate max-w-[100px]">Rahul Kumar</p>
              <p className="text-[10px] text-[#008CFF] font-medium leading-none">MMT Black</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
