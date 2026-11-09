import React from 'react';
import { X, Wallet, Check } from 'lucide-react';
import { BRAND } from '../constants/theme';
import { formatINR } from '../utils/calculator';

interface BudgetAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget: number;
  onBudgetChange: (val: number) => void;
}

export const BudgetAdjustModal: React.FC<BudgetAdjustModalProps> = ({
  isOpen,
  onClose,
  budget,
  onBudgetChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border space-y-5"
        style={{ borderColor: BRAND.border }}
      >
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: BRAND.border }}>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#008CFF]/10 text-[#008CFF]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#172B4D]">Quick Adjust Budget</h3>
              <p className="text-[11px] text-[#52657D]">Update target spending limit</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F5F8FC] text-[#52657D]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#F5F8FC] border text-center" style={{ borderColor: BRAND.border }}>
            <span className="text-xs uppercase font-extrabold text-[#52657D]">New Target Budget</span>
            <p className="text-3xl font-black text-[#008CFF] mt-1">{formatINR(budget)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#52657D]">
              <span>₹15,000</span>
              <span>₹2,50,000</span>
            </div>
            <input
              type="range"
              min={15000}
              max={250000}
              step={2500}
              value={budget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              className="w-full h-2.5 bg-[#EAF2FA] rounded-lg cursor-pointer accent-[#008CFF]"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[35000, 50000, 80000, 125000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => onBudgetChange(amt)}
                className={`py-1.5 text-[11px] font-bold rounded-xl border transition-all ${
                  budget === amt
                    ? 'bg-[#008CFF] text-white border-transparent'
                    : 'bg-[#F5F8FC] text-[#172B4D] hover:bg-[#EAF2FA]'
                }`}
                style={{ borderColor: BRAND.border }}
              >
                {formatINR(amt)}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t flex justify-end" style={{ borderColor: BRAND.border }}>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-white font-extrabold text-xs shadow-sm hover:brightness-105 flex items-center gap-1.5"
            style={{ backgroundColor: BRAND.primary }}
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Apply Budget</span>
          </button>
        </div>
      </div>
    </div>
  );
};
