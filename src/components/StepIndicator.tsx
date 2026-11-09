import React, { useRef, useEffect } from 'react';
import { Check, Wallet, Compass, Home, PlaneTakeoff, MountainSnow, BedDouble, CalendarCheck } from 'lucide-react';
import { STEP_NAMES, BRAND } from '../constants/theme';
import { StepId } from '../types/travel';

interface StepIndicatorProps {
  currentStep: StepId;
  completedSteps: StepId[];
  onSelectStep: (step: StepId) => void;
}

const STEP_ICONS = {
  1: Wallet,
  2: Compass,
  3: Home,
  4: PlaneTakeoff,
  5: MountainSnow,
  6: BedDouble,
  7: CalendarCheck,
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  completedSteps,
  onSelectStep,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // Auto-scroll to current stage when currentStep changes
  useEffect(() => {
    const activeEl = stepRefs.current[currentStep];
    const container = scrollContainerRef.current;
    if (activeEl && container) {
      const scrollLeft =
        activeEl.offsetLeft -
        container.clientWidth / 2 +
        activeEl.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth',
      });
    }
  }, [currentStep]);

  return (
    <div
      className="w-full bg-white border-b py-2 sm:py-2.5 shadow-xs sticky top-14 sm:top-16 z-30 overflow-hidden"
      style={{ borderColor: BRAND.border }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Horizontal scrollable stepper with ref and auto-scroll */}
        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto no-scrollbar scroll-smooth gap-1.5 sm:gap-3 py-1 px-3 sm:px-6 w-full"
        >
          {STEP_NAMES.map((step, index) => {
            const stepId = step.id as StepId;
            const isCurrent = currentStep === stepId;
            const isCompleted = completedSteps.includes(stepId) && !isCurrent;
            const isClickable = isCompleted || stepId <= currentStep;
            const Icon = STEP_ICONS[stepId as keyof typeof STEP_ICONS] || Compass;

            return (
              <React.Fragment key={step.id}>
                {index > 0 && (
                  <div
                    className={`h-[2px] w-3 sm:w-6 lg:flex-1 shrink-0 transition-colors duration-300 ${
                      isCompleted || isCurrent ? 'bg-[#008CFF]' : 'bg-[#D9E5F2]'
                    }`}
                  />
                )}

                <button
                  ref={(el) => {
                    stepRefs.current[stepId] = el;
                  }}
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onSelectStep(stepId)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all duration-200 shrink-0 text-left whitespace-nowrap ${
                    isCurrent
                      ? 'bg-[#008CFF]/10 ring-2 ring-[#008CFF] shadow-xs'
                      : isCompleted
                      ? 'hover:bg-[#F5F8FC] cursor-pointer'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  {/* Step icon node */}
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all shrink-0 ${
                      isCurrent
                        ? 'bg-[#008CFF] text-white shadow-xs'
                        : isCompleted
                        ? 'bg-[#12A66A] text-white'
                        : 'bg-[#EAF2FA] text-[#52657D]'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Icon className="w-3.5 h-3.5" />}
                  </div>

                  {/* Desktop label */}
                  <div className="hidden lg:block">
                    <p
                      className={`text-xs font-bold leading-tight ${
                        isCurrent
                          ? 'text-[#008CFF]'
                          : isCompleted
                          ? 'text-[#172B4D]'
                          : 'text-[#98A9BC]'
                      }`}
                    >
                      {step.id}. {step.label}
                    </p>
                    <p className="text-[10px] text-[#52657D] leading-none mt-0.5">{step.subtitle}</p>
                  </div>

                  {/* Compact label for tablet & mobile */}
                  <span
                    className={`lg:hidden text-xs font-bold ${
                      isCurrent ? 'text-[#008CFF]' : isCompleted ? 'text-[#172B4D]' : 'text-[#98A9BC]'
                    }`}
                  >
                    {step.id}. {step.label.split(' ')[0]}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
