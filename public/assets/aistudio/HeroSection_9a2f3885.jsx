import React from 'react';
import { Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';

/**
 * Light, calm hero. One focal point: the prompt bar.
 * Pass the PromptBar (or anything) as children.
 * onOpenPlanner: navigates to the manual planner page.
 */
export default function HeroSection({ children }) {
  return (
    <section
      className="relative isolate overflow-hidden rounded-[28px] px-4 py-10 sm:rounded-[32px] sm:px-8 sm:py-14 lg:py-20"
      style={{
        fontFamily: "'Figtree', 'Google Sans', 'Segoe UI', Roboto, system-ui, sans-serif",
        background:
          'radial-gradient(900px 420px at 50% -10%, rgba(240,120,40,0.12), transparent 70%), #F7F8FA',
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap');`}</style>

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div
          className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FDEBDD] text-[#F07828]"
          aria-hidden="true"
        >
          <Sparkles className="h-5 w-5" strokeWidth={1.75} />
        </div>

        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-[#172B4D] sm:text-4xl lg:text-5xl">
          Where to next?
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#667085] sm:text-base">
          Describe your trip, say it out loud, or fine-tune it yourself. We'll build a day-by-day plan from live MMT
          inventory.
        </p>

        <div className="mt-8 w-full sm:mt-10">{children}</div>
      </div>
    </section>
  );
}