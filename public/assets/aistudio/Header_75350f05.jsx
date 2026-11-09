import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { BRAND } from '../theme';

export default function Header({ userName = 'Rahul Kumar', userInitials = 'RK', membership = 'MMT Black Member' }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm" style={{ borderColor: BRAND.border }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo & Back Link */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-[#667085] hover:text-[#F07828] transition-colors p-1.5 rounded-lg hover:bg-[#F0F1F3]">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to MMT Main</span>
          </button>
          <div className="h-5 w-px bg-[#E7E9ED]" />
          <div className="flex items-center space-x-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-lg"
              style={{ backgroundColor: BRAND.primary }}
            >
              my
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#172B4D]">
                  make<span style={{ color: BRAND.primary }}>my</span>trip
                </span>
                <span className="bg-[#F07828]/10 text-[#F07828] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> AI Planner
                </span>
              </div>
              <p className="text-[11px] text-[#667085] hidden sm:block">Intelligent Hyper-Personalized Itineraries</p>
            </div>
          </div>
        </div>

        {/* User & Settings */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-[#F0F1F3] px-3 py-1.5 rounded-full text-xs font-semibold text-[#172B4D]">
            <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
            <span>INR (₹)</span>
          </div>
          <div className="flex items-center space-x-2 pl-2 border-l" style={{ borderColor: BRAND.border }}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F07828] to-[#D96518] text-white flex items-center justify-center font-bold text-sm shadow">
              {userInitials}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold leading-tight text-[#172B4D]">{userName}</p>
              <p className="text-[10px] text-[#667085]">{membership}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
