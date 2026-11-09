import React, { useState } from 'react';
import { BRAND } from '../theme';
import {
  MOCK_PACKAGES,
  SHIMLA_ITINERARY,
  QUICK_PROMPTS,
  DEFAULT_TWEAKS,
  DEFAULT_PROMPT,
} from '../data/packages';
import useVoiceAssistant from '../hooks/useVoiceAssistant';

import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import HeroSection from '../components/HeroSection';
import PromptBar from '../components/PromptBar';
import FeaturedPackage from '../components/FeaturedPackage';
import PackageGrid from '../components/PackageGrid';
import Footer from '../components/Footer';
import TweakerModal from '../components/TweakerModal';
import PackageDrawer from '../components/PackageDrawer';

const FEATURED = MOCK_PACKAGES[0];

export default function HomePage() {
  const [promptInput, setPromptInput] = useState(DEFAULT_PROMPT);
  const [isTweakerOpen, setIsTweakerOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [tweaks, setTweaks] = useState(DEFAULT_TWEAKS);

  const voice = useVoiceAssistant(setPromptInput);

  const updateTweaks = (patch) => setTweaks((prev) => ({ ...prev, ...patch }));

  const applyTweaks = () => {
    setPromptInput(
      `${tweaks.travelers} planning a ${tweaks.days}-day trip to ${tweaks.destination} with budget ₹${tweaks.budget.toLocaleString()} (${tweaks.hotelRating})`
    );
    setIsTweakerOpen(false);
  };

  const editSelectedPackage = () => {
    setSelectedPackage(null);
    setIsTweakerOpen(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans antialiased text-[#172B4D]"
      style={{ backgroundColor: BRAND.background }}
    >
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* <Breadcrumb /> */}

        <HeroSection>
          <PromptBar
            value={promptInput}
            onChange={setPromptInput}
            onOpenTweaker={() => setIsTweakerOpen(true)}
            onGenerate={() => setSelectedPackage(FEATURED)}
            voice={{ isListening: voice.isListening, transcript: voice.transcript, onToggle: voice.toggle }}
            suggestions={QUICK_PROMPTS}
          />
        </HeroSection>

        <FeaturedPackage
          pkg={FEATURED}
          onViewItinerary={() => setSelectedPackage(FEATURED)}
          onTweak={() => setIsTweakerOpen(true)}
        />

        <PackageGrid packages={MOCK_PACKAGES} onSelect={setSelectedPackage} />
      </main>

      <Footer />

      <TweakerModal
        isOpen={isTweakerOpen}
        values={tweaks}
        onChange={updateTweaks}
        onReset={() => setTweaks(DEFAULT_TWEAKS)}
        onApply={applyTweaks}
        onClose={() => setIsTweakerOpen(false)}
      />

      <PackageDrawer
        pkg={selectedPackage}
        itinerary={SHIMLA_ITINERARY}
        onClose={() => setSelectedPackage(null)}
        onEdit={editSelectedPackage}
        onBook={() => alert('Redirecting to MakeMyTrip Booking & Payment Gateway for Shimla Family Special!')}
      />
    </div>
  );
}
