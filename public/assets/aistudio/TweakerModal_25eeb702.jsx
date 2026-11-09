import React from 'react';
import { X, MapPin, Sliders } from 'lucide-react';
import { BRAND } from '../theme';
import { TRAVELER_TYPES, HOTEL_TIERS } from '../data/packages';

const SELECTED = 'bg-[#F07828]/10 border-[#F07828] text-[#D96518]';
const IDLE = 'bg-[#F0F1F3] border-transparent text-[#172B4D] hover:bg-[#E7E9ED]';

function FieldLabel({ children }) {
  return <label className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">{children}</label>;
}

function OptionButtons({ options, value, onSelect, className }) {
  return (
    <div className={`grid gap-2 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
            value === opt ? SELECTED : IDLE
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function RangeField({ label, valueLabel, ...inputProps }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold text-[#172B4D]">
        <span>{label}</span>
        <span className="text-[#F07828]">{valueLabel}</span>
      </div>
      <input type="range" className="w-full accent-[#F07828]" {...inputProps} />
    </div>
  );
}

export default function TweakerModal({ isOpen, values, onChange, onReset, onApply, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border flex flex-col"
        style={{ borderColor: BRAND.border }}
      >
        {/* Header */}
        <div
          className="p-5 border-b sticky top-0 bg-white z-10 flex items-center justify-between"
          style={{ borderColor: BRAND.border }}
        >
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-[#F07828]/10 text-[#F07828]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#172B4D]">Manual Package Tweaker</h3>
              <p className="text-xs text-[#667085]">Customize trip parameters to refine AI package matches</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[#F0F1F3] text-[#667085] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <FieldLabel>Destination</FieldLabel>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#667085]" />
              <input
                type="text"
                value={values.destination}
                onChange={(e) => onChange({ destination: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#F07828]"
                style={{ borderColor: BRAND.border }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RangeField
              label="Trip Duration"
              valueLabel={`${values.days} Days / ${values.days - 1} Nights`}
              min="3"
              max="14"
              value={values.days}
              onChange={(e) => onChange({ days: parseInt(e.target.value, 10) })}
            />
            <RangeField
              label="Total Family Budget"
              valueLabel={`₹${values.budget.toLocaleString()}`}
              min="20000"
              max="150000"
              step="2500"
              value={values.budget}
              onChange={(e) => onChange({ budget: parseInt(e.target.value, 10) })}
            />
          </div>

          <div className="space-y-2">
            <FieldLabel>Group / Traveler Type</FieldLabel>
            <OptionButtons
              options={TRAVELER_TYPES}
              value={values.travelers}
              onSelect={(travelers) => onChange({ travelers })}
              className="grid-cols-2 sm:grid-cols-4"
            />
          </div>

          <div className="space-y-2">
            <FieldLabel>Accommodation Standard</FieldLabel>
            <OptionButtons
              options={HOTEL_TIERS}
              value={values.hotelRating}
              onSelect={(hotelRating) => onChange({ hotelRating })}
              className="grid-cols-3"
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-5 border-t bg-[#F7F8FA] flex items-center justify-between sticky bottom-0"
          style={{ borderColor: BRAND.border }}
        >
          <button onClick={onReset} className="text-xs font-bold text-[#667085] hover:text-[#172B4D]">
            Reset Defaults
          </button>
          <button
            onClick={onApply}
            className="px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition-all hover:brightness-110"
            style={{ backgroundColor: BRAND.primary }}
          >
            Apply Tweaks & Update Prompt
          </button>
        </div>
      </div>
    </div>
  );
}
