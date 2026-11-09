import React from 'react';
import { BRAND } from '../constants/theme';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white border-t py-8 text-xs text-[#52657D]" style={{ borderColor: BRAND.border }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-xs"
              style={{ backgroundColor: BRAND.primary }}
            >
              my
            </div>
            <span className="font-bold text-[#172B4D]">
              make<span style={{ color: BRAND.primary }}>my</span>trip AI Smart Planner
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#12A66A] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Price Protected & Verified Inventory
            </span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <a href="#security" className="hover:text-[#008CFF] transition-colors">Safe & Secure Booking</a>
            <a href="#cancellation" className="hover:text-[#008CFF] transition-colors">Free Cancellation Policy</a>
            <a href="#help" className="hover:text-[#008CFF] transition-colors">24/7 Trip Support</a>
            <a href="#terms" className="hover:text-[#008CFF] transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#98A9BC]" style={{ borderColor: BRAND.border }}>
          <p>© 2026 MakeMyTrip India Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-1 sm:mt-0">
            Crafted for unforgettable journeys with <Sparkles className="w-3 h-3 text-[#F07828]" /> AI Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
};
