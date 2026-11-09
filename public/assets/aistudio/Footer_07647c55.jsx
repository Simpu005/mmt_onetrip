import React from 'react';
import { BRAND } from '../theme';

export default function Footer() {
  return (
    <footer className="mt-12 bg-white border-t py-8 text-xs text-[#667085]" style={{ borderColor: BRAND.border }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#172B4D]">MakeMyTrip AI Trip Planner Prototype</span>
          <span>•</span>
          <span>Powered by Material M3 Design Studio</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#terms" className="hover:underline">Terms of Service</a>
          <a href="#support" className="hover:underline">Help & Support</a>
        </div>
      </div>
    </footer>
  );
}
