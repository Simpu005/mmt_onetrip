import React, { useState } from 'react';
import { Wallet, TrendingUp, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Plane, Bed, MapPin } from 'lucide-react';
import { BRAND } from '../constants/theme';
import { BudgetBreakdown, formatINR } from '../utils/calculator';
import { TripState } from '../types/travel';

interface BudgetTrackerBarProps {
  breakdown: BudgetBreakdown;
  state: TripState;
  onOpenBudgetModal?: () => void;
}

export const BudgetTrackerBar: React.FC<BudgetTrackerBarProps> = ({
  breakdown,
  state,
  onOpenBudgetModal,
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const {
    totalBudget,
    totalSpent,
    remainingBudget,
    percentSpent,
    isOverBudget,
    statusColor,
    statusMessage,
    transitCost,
    hotelTotalCost,
    excursionsCost,
  } = breakdown;

  return (
    <div
      className="bg-white border-b transition-all duration-300 shadow-xs"
      style={{ borderColor: BRAND.border }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Summary Metrics */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: isOverBudget ? BRAND.error : BRAND.primary }}
              >
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#52657D] block leading-none">
                  Total Budget
                </span>
                <span className="text-sm sm:text-base font-extrabold text-[#172B4D]">
                  {formatINR(totalBudget)}
                </span>
              </div>
            </div>

            <div className="h-6 w-px bg-[#D9E5F2] hidden sm:block" />

            {/* Spent So Far */}
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#52657D] block leading-none">
                Spent So Far
              </span>
              <span className="text-sm sm:text-base font-black text-[#F07828]">
                {formatINR(totalSpent)}
              </span>
            </div>

            <div className="h-6 w-px bg-[#D9E5F2] hidden sm:block" />

            {/* Remaining Balance */}
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#52657D] block leading-none">
                {isOverBudget ? 'Deficit / Over Budget' : 'Remaining Balance'}
              </span>
              <span
                className="text-sm sm:text-base font-black flex items-center gap-1"
                style={{ color: statusColor }}
              >
                {formatINR(Math.abs(remainingBudget))}
                {isOverBudget ? (
                  <AlertTriangle className="w-4 h-4 text-[#D92D36]" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-[#12A66A]" />
                )}
              </span>
            </div>
          </div>

          {/* Center / Right: Progress Bar & Category Badges */}
          <div className="flex-1 max-w-md w-full flex flex-col justify-center">
            <div className="flex items-center justify-between text-[11px] mb-1 font-semibold text-[#172B4D]">
              <span className="flex items-center gap-1" style={{ color: statusColor }}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{statusMessage}</span>
              </span>
              <span className="font-extrabold text-[#52657D]">{percentSpent}% allocated</span>
            </div>

            {/* Bar */}
            <div className="w-full bg-[#EAF2FA] h-2.5 rounded-full overflow-hidden p-0.5 border" style={{ borderColor: BRAND.border }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${percentSpent === 0 ? 0 : Math.min(100, Math.max(2, percentSpent))}%`,
                  backgroundColor: isOverBudget ? '#D92D36' : percentSpent > 85 ? '#E99A20' : '#008CFF',
                }}
              />
            </div>
          </div>

          {/* Right Actions & Details Toggle */}
          <div className="flex items-center gap-2 self-end lg:self-center">
            {onOpenBudgetModal && (
              <button
                type="button"
                onClick={onOpenBudgetModal}
                className="text-xs font-bold text-[#008CFF] hover:bg-[#008CFF]/10 px-3 py-1.5 rounded-lg transition-colors border border-[#008CFF]/20"
              >
                Adjust Budget
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowDetail(!showDetail)}
              className="flex items-center gap-1 text-xs font-bold text-[#52657D] hover:text-[#172B4D] hover:bg-[#F5F8FC] px-2.5 py-1.5 rounded-lg border transition-colors"
              style={{ borderColor: BRAND.border }}
            >
              <span>Breakdown</span>
              {showDetail ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expandable itemized subtraction breakdown */}
        {showDetail && (
          <div className="mt-3 pt-3 border-t grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#F5F8FC] p-3 rounded-xl animate-fadeIn" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border" style={{ borderColor: BRAND.border }}>
              <div className="p-1.5 rounded-md bg-[#008CFF]/10 text-[#008CFF]">
                <Plane className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#52657D] font-bold">Transit (Round-trip)</p>
                <p className="text-xs font-extrabold text-[#172B4D] truncate">
                  {transitCost > 0 ? formatINR(transitCost) : 'None selected'}
                </p>
                {state.selectedTransit && (
                  <p className="text-[9px] text-[#52657D] truncate">
                    {state.selectedTransit.carrier} ({state.travelers.count} pax)
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border" style={{ borderColor: BRAND.border }}>
              <div className="p-1.5 rounded-md bg-[#F07828]/10 text-[#F07828]">
                <Bed className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#52657D] font-bold">Hotels & Stays</p>
                <p className="text-xs font-extrabold text-[#172B4D] truncate">
                  {hotelTotalCost > 0 ? formatINR(hotelTotalCost) : 'None selected'}
                </p>
                {state.selectedMainHotel && (
                  <p className="text-[9px] text-[#52657D] truncate">
                    {state.selectedMainHotel.name.slice(0, 24)}...
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border" style={{ borderColor: BRAND.border }}>
              <div className="p-1.5 rounded-md bg-[#12A66A]/10 text-[#12A66A]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#52657D] font-bold">Excursions & Entry</p>
                <p className="text-xs font-extrabold text-[#172B4D] truncate">
                  {excursionsCost > 0 ? formatINR(excursionsCost) : '0 selected'}
                </p>
                <p className="text-[9px] text-[#52657D] truncate">
                  {state.selectedExcursions.length} must-visit spot{state.selectedExcursions.length === 1 ? '' : 's'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border" style={{ borderColor: BRAND.border }}>
              <div className="p-1.5 rounded-md bg-[#52657D]/10 text-[#52657D]">
                <Wallet className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#52657D] font-bold">Pocket Buffer Left</p>
                <p
                  className="text-xs font-extrabold truncate"
                  style={{ color: statusColor }}
                >
                  {formatINR(remainingBudget)}
                </p>
                <p className="text-[9px] text-[#52657D]">For food, shopping & local cabs</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
