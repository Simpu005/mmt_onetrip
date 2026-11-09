import React from 'react';
import { X, MapPin, Sliders, Sparkles } from 'lucide-react';
import { BRAND } from '../../constants/theme';
import { TweaksState, TRAVELER_TYPES, HOTEL_TIERS } from '../../data/homePackages';

const SELECTED = 'bg-[#F07828]/10 border-[#F07828] text-[#D96518] shadow-2xs font-black';
const IDLE = 'bg-[#F0F1F3] border-transparent text-[#172B4D] hover:bg-[#E7E9ED] font-bold';

interface HomeTweakerModalProps {
  isOpen: boolean;
  values: TweaksState;
  onChange: (patch: Partial<TweaksState>) => void;
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
}

export const HomeTweakerModal: React.FC<HomeTweakerModalProps> = ({
  isOpen,
  values,
  onChange,
  onReset,
  onApply,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border flex flex-col"
        style={{ borderColor: BRAND.border }}
      >
        {/* Header */}
        <div
          className="p-5 border-b sticky top-0 bg-white z-10 flex items-center justify-between"
          style={{ borderColor: BRAND.border }}
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#F07828]/10 text-[#F07828]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#172B4D]">Manual Package Tweaker</h3>
              <p className="text-xs text-[#52657D] font-medium">Fine-tune trip parameters to refine AI package matches</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F0F1F3] text-[#52657D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#172B4D]">
              Destination
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-[#52657D]" />
              <input
                type="text"
                value={values.destination}
                onChange={(e) => onChange({ destination: e.target.value })}
                className="w-full pl-10 pr-3 py-2.5 text-sm border rounded-xl font-bold text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#F07828]"
                style={{ borderColor: BRAND.border }}
              />
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Trip Duration */}
            <div className="p-3.5 bg-[#F5F8FC] rounded-2xl border space-y-2" style={{ borderColor: BRAND.border }}>
              <div className="flex justify-between text-xs font-bold text-[#172B4D]">
                <span>Trip Duration</span>
                <span className="text-[#F07828] font-black">{values.days} Days / {values.days - 1} Nights</span>
              </div>
              <input
                type="range"
                min="3"
                max="14"
                value={values.days}
                onChange={(e) => onChange({ days: parseInt(e.target.value, 10) })}
                className="w-full accent-[#F07828] cursor-pointer"
              />
            </div>

            {/* Total Budget */}
            <div className="p-3.5 bg-[#F5F8FC] rounded-2xl border space-y-2" style={{ borderColor: BRAND.border }}>
              <div className="flex justify-between text-xs font-bold text-[#172B4D]">
                <span>Total Target Budget</span>
                <span className="text-[#F07828] font-black">₹{values.budget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="150000"
                step="2500"
                value={values.budget}
                onChange={(e) => onChange({ budget: parseInt(e.target.value, 10) })}
                className="w-full accent-[#F07828] cursor-pointer"
              />
            </div>
          </div>

          {/* Group / Traveler Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#172B4D]">
              Group / Traveler Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TRAVELER_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange({ travelers: type })}
                  className={`py-2 px-3 rounded-xl text-xs border transition-all cursor-pointer ${
                    values.travelers === type ? SELECTED : IDLE
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Accommodation Standard */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#172B4D]">
              Accommodation Standard
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {HOTEL_TIERS.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => onChange({ hotelRating: tier })}
                  className={`py-2 px-3 rounded-xl text-xs border transition-all cursor-pointer ${
                    values.hotelRating === tier ? SELECTED : IDLE
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div
          className="p-4 sm:p-5 border-t bg-[#F7F8FA] flex items-center justify-between sticky bottom-0"
          style={{ borderColor: BRAND.border }}
        >
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-bold text-[#52657D] hover:text-[#172B4D] cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={onApply}
            className="px-6 py-2.5 rounded-xl text-white font-black text-xs sm:text-sm shadow-md transition-all hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
            style={{ backgroundColor: BRAND.primary }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Apply Tweaks &amp; Update Prompt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
