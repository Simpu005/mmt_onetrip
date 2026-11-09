import React from 'react';
import { Sparkles } from 'lucide-react';

interface HomeHeroProps {
  children: React.ReactNode;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ children }) => {
  return (
    <section
      className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[32px] px-4 py-8 sm:px-8 sm:py-12 lg:py-16 shadow-xs border border-[#D9E5F2]/80"
      style={{
        background:
          'radial-gradient(900px 420px at 50% -10%, rgba(240,120,40,0.14), transparent 70%), #F7F8FA',
      }}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Sparkles Icon Badge */}
        <div
          className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FDEBDD] text-[#F07828] shadow-2xs"
          aria-hidden="true"
        >
          <Sparkles className="h-5 w-5 stroke-[2.5]" />
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-[#172B4D]">
          Where to next?
        </h1>

        {/* Subtitle */}
        <p className="mt-3 max-w-xl text-xs sm:text-sm lg:text-base leading-relaxed text-[#52657D] font-medium">
          Describe your trip, say it out loud, or fine-tune it yourself. We'll build a day-by-day plan from live MMT inventory.
        </p>

        {/* Child Prompt Bar */}
        <div className="mt-6 w-full sm:mt-8">{children}</div>
      </div>
    </section>
  );
};
