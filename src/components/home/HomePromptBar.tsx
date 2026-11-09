import React, { useEffect, useRef } from 'react';
import { Mic, SlidersHorizontal, Sparkles, X, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../../constants/theme';
import { PromptSuggestion } from '../../data/homePackages';

interface HomePromptBarProps {
  value: string;
  onChange: (val: string) => void;
  onOpenTweaker: () => void;
  onGenerate: () => void;
  voice: {
    isListening: boolean;
    transcript: string;
    onToggle: () => void;
  };
  suggestions: PromptSuggestion[];
}

export const HomePromptBar: React.FC<HomePromptBarProps> = ({
  value,
  onChange,
  onOpenTweaker,
  onGenerate,
  voice,
  suggestions,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="w-full text-left">
      <style>{`
        @keyframes mmt-wave { 0%,100% { transform: scaleY(.35); } 50% { transform: scaleY(1); } }
        .mmt-wave-bar { transform-origin: center; animation: mmt-wave 1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .mmt-wave-bar { animation: none; } }
      `}</style>

      {/* Input Container */}
      <div
        className={`rounded-[28px] bg-white border transition-all duration-200 focus-within:border-[#F07828] focus-within:shadow-[0_4px_24px_rgba(240,120,40,0.18)] ${
          voice.isListening
            ? 'border-[#F07828] shadow-[0_4px_24px_rgba(240,120,40,0.18)]'
            : 'shadow-[0_2px_14px_rgba(23,43,77,0.08)]'
        }`}
        style={{ borderColor: voice.isListening ? '#F07828' : BRAND.border }}
      >
        {/* Text Input Area */}
        <div className="relative px-5 pt-4 sm:px-6 sm:pt-5">
          <label htmlFor="mmt-trip-prompt" className="sr-only">
            Describe your trip
          </label>
          <textarea
            id="mmt-trip-prompt"
            ref={textareaRef}
            rows={2}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your trip, e.g. 7 days in Shimla with family of 4, under ₹45,000, with snow activities..."
            className="block w-full resize-none bg-transparent border-0 p-0 pr-9 text-base leading-relaxed text-[#172B4D] placeholder-[#52657D] focus:outline-none focus:ring-0 font-medium"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                textareaRef.current?.focus();
              }}
              aria-label="Clear prompt"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 inline-flex items-center justify-center rounded-full text-[#52657D] hover:bg-[#F0F1F3] hover:text-[#172B4D] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Voice Audio Waveform Transcript */}
        {voice.isListening && (
          <div
            className="mx-3 mt-2 sm:mx-4 flex items-center gap-3 rounded-2xl bg-[#FFF4EC] px-4 py-2.5"
            role="status"
          >
            <div className="flex h-5 items-center gap-[3px]" aria-hidden="true">
              {[0, 150, 300, 450].map((d) => (
                <span
                  key={d}
                  className="mmt-wave-bar block h-5 w-[3px] rounded-full bg-[#F07828]"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </div>
            <p className="min-w-0 flex-1 truncate text-xs sm:text-sm font-semibold text-[#D96518]">
              {voice.transcript || 'Listening… describe your dream destination, budget, or travelers'}
            </p>
          </div>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 px-3 pb-3 pt-3 sm:px-4 sm:pb-4 flex-wrap">
          {/* Customize Manual Tweaker */}
          <button
            type="button"
            onClick={onOpenTweaker}
            className="inline-flex h-11 items-center gap-2 rounded-full border px-4 text-xs sm:text-sm font-bold text-[#172B4D] transition-colors hover:bg-[#F0F1F3] cursor-pointer"
            style={{ borderColor: BRAND.border }}
          >
            <SlidersHorizontal className="h-4 w-4 text-[#52657D]" />
            <span>Customize</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Speak Voice Assistant */}
            <button
              type="button"
              onClick={voice.onToggle}
              aria-label={voice.isListening ? 'Stop listening' : 'Speak prompt'}
              className={`relative inline-flex h-11 items-center justify-center gap-2 rounded-full text-xs sm:text-sm font-bold transition-all px-4 cursor-pointer ${
                voice.isListening
                  ? 'bg-[#F07828] text-white shadow-md animate-pulse'
                  : 'bg-[#FDEBDD] text-[#D96518] hover:bg-[#FADCC4]'
              }`}
            >
              <Mic className="h-4 w-4" />
              <span>{voice.isListening ? 'Listening…' : 'Speak'}</span>
              {voice.isListening && (
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </button>

            {/* Generate Itinerary Button */}
            <button
              type="button"
              onClick={onGenerate}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full text-xs sm:text-sm font-black text-white shadow-sm transition-all hover:brightness-110 active:brightness-95 px-5 cursor-pointer"
              style={{ backgroundColor: BRAND.primary }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate itinerary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion Chips Below */}
      {suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => {
                onChange(s.prompt);
                textareaRef.current?.focus();
              }}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#172B4D] transition-colors hover:bg-white hover:border-[#F07828] shadow-2xs cursor-pointer group"
              style={{ borderColor: BRAND.border }}
            >
              <span>{s.label}</span>
              <ArrowUpRight className="h-3 w-3 text-[#52657D] group-hover:text-[#F07828] transition-colors" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
