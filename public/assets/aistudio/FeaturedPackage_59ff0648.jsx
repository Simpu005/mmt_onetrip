import React from 'react';
import { Award, ChevronRight, Sliders, Hotel, Car, Utensils, Compass } from 'lucide-react';
import { BRAND } from '../theme';

const INCLUSIONS = [
  { icon: Hotel, label: 'Heritage Hotel' },
  { icon: Car, label: 'Private SUV' },
  { icon: Utensils, label: 'Breakfast & Dinner' },
  { icon: Compass, label: 'Solang Excursion' },
];

export default function FeaturedPackage({ pkg, onViewItinerary, onTweak }) {
  return (
    <section
      className="bg-white rounded-3xl p-5 sm:p-6 border shadow-sm relative overflow-hidden"
      style={{ borderColor: BRAND.border }}
    >
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Visual */}
        <div className="relative w-full lg:w-2/5 h-56 lg:h-64 rounded-2xl overflow-hidden group">
          <img
            src={pkg.image}
            alt="Shimla Family Odyssey"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-[#172B4D]/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-[#F07828]" /> Featured Prototype Case Study
          </div>
          <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-xl text-white">
            <p className="text-xs font-medium text-gray-200">Shimla, Himachal Pradesh</p>
            <p className="text-lg font-extrabold">Shimla Family Odyssey</p>
          </div>
        </div>

        {/* Details */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#F07828] uppercase tracking-wider">7 Days / 6 Nights Package</span>
                <span className="bg-[#12B76A]/10 text-[#12B76A] text-xs font-bold px-2.5 py-0.5 rounded-full">Budget Match</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#172B4D] mt-1">Shimla Family Winter Special</h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-[#667085] block">Total Package Price</span>
              <span className="text-2xl font-extrabold text-[#172B4D]">{pkg.budget}</span>
              <span className="text-xs text-[#667085] block">for 4 travelers (All Inclusive)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INCLUSIONS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="p-2.5 rounded-xl bg-[#F0F1F3] text-xs font-medium flex items-center space-x-2 text-[#172B4D]"
              >
                <Icon className="w-4 h-4 text-[#F07828]" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-[#667085] line-clamp-2">
            Tailor-made for families seeking snow activities, comfortable heritage hotel stays near Mall Road, and
            hassle-free private cab sightseeing through Jakhoo Temple and Kufri.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onViewItinerary}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:brightness-105 flex items-center space-x-2"
              style={{ backgroundColor: BRAND.primary }}
            >
              <span>View 7-Day Itinerary Breakdown</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onTweak}
              className="px-4 py-2.5 rounded-xl bg-[#F0F1F3] hover:bg-[#E7E9ED] text-[#172B4D] font-semibold text-xs sm:text-sm transition-colors flex items-center space-x-1.5"
            >
              <Sliders className="w-4 h-4 text-[#667085]" />
              <span>Tweak Budget or Nights</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
