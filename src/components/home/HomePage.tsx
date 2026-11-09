import React, { useState } from 'react';
import { BRAND } from '../../constants/theme';
import {
  MOCK_PACKAGES,
  QUICK_PROMPTS,
  DEFAULT_TWEAKS,
  DEFAULT_PROMPT,
  HomePackage,
  TweaksState,
} from '../../data/homePackages';
import useVoiceAssistant from '../../hooks/useVoiceAssistant';

import { HomeHeader } from './HomeHeader';
import { HomeHero } from './HomeHero';
import { HomePromptBar } from './HomePromptBar';
import { HomePlannerBanner } from './HomePlannerBanner';
import { HomeFeaturedPackage } from './HomeFeaturedPackage';
import { HomePackageGrid } from './HomePackageGrid';
import { HomePackageDrawer } from './HomePackageDrawer';
import { HomeTweakerModal } from './HomeTweakerModal';
import { Footer } from '../Footer';

const FEATURED = MOCK_PACKAGES[0];

interface HomePageProps {
  onLaunchPlanner: (presetPackage?: HomePackage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onLaunchPlanner }) => {
  const [promptInput, setPromptInput] = useState(DEFAULT_PROMPT);
  const [isTweakerOpen, setIsTweakerOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<HomePackage | null>(null);
  const [tweaks, setTweaks] = useState<TweaksState>(DEFAULT_TWEAKS);

  const voice = useVoiceAssistant(setPromptInput);

  const updateTweaks = (patch: Partial<TweaksState>) =>
    setTweaks((prev) => ({ ...prev, ...patch }));

  const applyTweaks = () => {
    setPromptInput(
      `${tweaks.travelers} planning a ${tweaks.days}-day trip to ${tweaks.destination} with budget ₹${tweaks.budget.toLocaleString()} (${tweaks.hotelRating})`
    );
    setIsTweakerOpen(false);
  };

  const handleGenerateFromPrompt = () => {
    // If prompt mentions destination, find matching or default to featured
    const matched =
      MOCK_PACKAGES.find((p) =>
        promptInput.toLowerCase().includes(p.destinationId.toLowerCase())
      ) || FEATURED;
    setSelectedPackage(matched);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans antialiased text-[#172B4D]"
      style={{ backgroundColor: BRAND.background }}
    >
      {/* 1. Header with direct button to 7-Stage Planner */}
      <HomeHeader onLaunchPlanner={() => onLaunchPlanner()} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* 2. Hero Section with AI Prompt Bar & Voice Assistant */}
        <HomeHero>
          <HomePromptBar
            value={promptInput}
            onChange={setPromptInput}
            onOpenTweaker={() => setIsTweakerOpen(true)}
            onGenerate={handleGenerateFromPrompt}
            voice={{
              isListening: voice.isListening,
              transcript: voice.transcript,
              onToggle: voice.toggle,
            }}
            suggestions={QUICK_PROMPTS}
          />
        </HomeHero>

        {/* 3. Eye-Catching Banner leading users directly to our 7-Stage Planner */}
        <HomePlannerBanner onLaunchPlanner={() => onLaunchPlanner()} />

        {/* 4. Featured Package Case Study Card */}
        <HomeFeaturedPackage
          pkg={FEATURED}
          onViewItinerary={() => setSelectedPackage(FEATURED)}
          onTweak={() => setIsTweakerOpen(true)}
          onCustomizeInPlanner={() => onLaunchPlanner(FEATURED)}
        />

        {/* 5. Popular AI-Curated Packages Grid with Filter */}
        <HomePackageGrid
          packages={MOCK_PACKAGES}
          onSelect={(pkg) => setSelectedPackage(pkg)}
        />
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* 7. Manual Tweaker Modal */}
      <HomeTweakerModal
        isOpen={isTweakerOpen}
        values={tweaks}
        onChange={updateTweaks}
        onReset={() => setTweaks(DEFAULT_TWEAKS)}
        onApply={applyTweaks}
        onClose={() => setIsTweakerOpen(false)}
      />

      {/* 8. Package Overview & Itinerary Drawer */}
      <HomePackageDrawer
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onCustomizeInStages={(pkg) => {
          setSelectedPackage(null);
          onLaunchPlanner(pkg);
        }}
        onBookDirect={(pkg) => {
          setSelectedPackage(null);
          onLaunchPlanner(pkg);
        }}
      />
    </div>
  );
};
