import React, { useEffect, useRef } from 'react';
import { Mic, SlidersHorizontal, Sparkles, X, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../theme';

/**
 * Prompt bar, laid out like AI Studio / NotebookLM:
 *   [ input area                       ]
 *   [ Customize ........ Speak  Generate ]
 * Primary actions (Speak, Generate) are filled / tonal and sit on the right.
 * The secondary action (Customize) is outlined and sits on the left.
 * Suggestions live outside the container as quiet assist chips.
 */
export default function PromptBar({
  value,
  onChange,
  onOpenTweaker,
  onGenerate,
  voice,            // { isListening, transcript, onToggle }
  suggestions = [], // [{ label, prompt }]
}) {
  const textareaRef = useRef(null);

  // Grow with content (min 2 rows, max ~200px) so long prompts never feel cramped.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  const handleKeyDown = (e) => {
    // Enter generates, Shift+Enter adds a new line
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
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
        .mmt-no-scrollbar::-webkit-scrollbar { display: none; }
        .mmt-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Input container */}
      <div
        className={`rounded-[28px] bg-white border transition-all duration-200 focus-within:border-[#F07828] focus-within:shadow-[0_4px_24px_rgba(240,120,40,0.18)] ${
          voice.isListening
            ? 'border-[#F07828] shadow-[0_4px_24px_rgba(240,120,40,0.18)]'
            : 'shadow-[0_2px_12px_rgba(23,43,77,0.08)]'
        }`}
        style={{ borderColor: voice.isListening ? undefined : BRAND.border }}
      >
        {/* Text input */}
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
            placeholder="Describe your trip, e.g. 7 days in Shimla with family of 4, under ₹45,000, with snow activities"
            className="block w-full resize-none bg-transparent border-0 p-0 pr-9 text-base leading-relaxed text-[#172B4D] placeholder-[#667085] focus:outline-none focus:ring-0"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                textareaRef.current?.focus();
              }}
              aria-label="Clear prompt"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 inline-flex items-center justify-center rounded-full text-[#667085] hover:bg-[#F0F1F3] hover:text-[#172B4D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F07828]"
            >
              <X className="w-[18px] h-[18px]" strokeWidth={1.75} />
            </button>
          )}
        </div>

        {/* Live voice transcript */}
        {voice.isListening && (
          <div
            className="mx-3 mt-2 sm:mx-4 flex items-center gap-3 rounded-2xl bg-[#FFF4EC] px-4 py-2.5"
            role="status"
            aria-live="polite"
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
            <p className="min-w-0 flex-1 truncate text-sm text-[#D96518]">
              {voice.transcript || 'Listening… describe your trip'}
            </p>
          </div>
        )}

        {/* Action row */}
        <div className="flex items-center gap-2 px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
          {/* Secondary: manual tweaker */}
          <button
            type="button"
            onClick={onOpenTweaker}
            className="inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium text-[#172B4D] transition-colors hover:bg-[#F0F1F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F07828]"
            style={{ borderColor: BRAND.border }}
          >
            <SlidersHorizontal className="h-[18px] w-[18px] text-[#667085]" strokeWidth={1.75} />
            <span>Customize</span>
          </button>

          <div className="flex-1" />

          {/* Primary: voice (tonal) */}
          <button
            type="button"
            onClick={voice.onToggle}
            aria-pressed={voice.isListening}
            aria-label={voice.isListening ? 'Stop listening' : 'Speak your prompt'}
            title={voice.isListening ? 'Stop listening' : 'Speak your prompt'}
            className={`relative inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F07828] w-11 sm:w-auto sm:px-4 ${
              voice.isListening
                ? 'bg-[#F07828] text-white shadow-md'
                : 'bg-[#FDEBDD] text-[#D96518] hover:bg-[#FADCC4]'
            }`}
          >
            <Mic className="h-5 w-5" strokeWidth={1.75} />
            <span className="hidden sm:inline">{voice.isListening ? 'Stop' : 'Speak'}</span>
            {voice.isListening && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>

          {/* Primary: generate (filled) */}
          <button
            type="button"
            onClick={onGenerate}
            aria-label="Generate itinerary"
            className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-105 active:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F07828] sm:w-auto sm:px-5"
            style={{ backgroundColor: BRAND.primary }}
          >
            <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            <span className="hidden sm:inline">Generate itinerary</span>
          </button>
        </div>
      </div>

      {/* Suggestion chips (quiet, outside the container) */}
      {suggestions.length > 0 && (
        <div
          className="mmt-no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible"
          role="list"
          aria-label="Prompt suggestions"
        >
          {suggestions.map((s) => (
            <button
              key={s.label}
              type="button"
              role="listitem"
              onClick={() => {
                onChange(s.prompt);
                textareaRef.current?.focus();
              }}
              className="group inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border bg-white/70 px-3.5 py-2 text-[13px] text-[#172B4D] transition-colors hover:bg-white hover:border-[#F07828]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F07828]"
              style={{ borderColor: BRAND.border }}
            >
              {s.label}
              <ArrowUpRight
                className="h-3.5 w-3.5 text-[#667085] transition-colors group-hover:text-[#F07828]"
                strokeWidth={1.75}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}