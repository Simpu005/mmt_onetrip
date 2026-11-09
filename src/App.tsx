import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { BudgetTrackerBar } from './components/BudgetTrackerBar';
import { BudgetAdjustModal } from './components/BudgetAdjustModal';
import { Footer } from './components/Footer';

import { Stage1Budget } from './components/stages/Stage1Budget';
import { Stage2Destination } from './components/stages/Stage2Destination';
import { Stage3HomeCity } from './components/stages/Stage3HomeCity';
import { Stage4Transit } from './components/stages/Stage4Transit';
import { Stage5Excursions } from './components/stages/Stage5Excursions';
import { Stage6Hotels } from './components/stages/Stage6Hotels';
import { Stage7FinalSummary } from './components/stages/Stage7FinalSummary';
import { HomePage } from './components/home/HomePage';
import { HomePackage } from './data/homePackages';

import { DESTINATIONS, POPULAR_HOME_CITIES, getTransitsForRoute, getExcursionsForDestination, getHotelsForDestination } from './data/travelData';
import { TripState, StepId, Destination, HomeCity, TransitOption, ExcursionItem, HotelItem, TravelerConfig } from './types/travel';
import { calculateBudgetBreakdown } from './utils/calculator';
import { BRAND } from './constants/theme';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'planner'>('home');
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [completedSteps, setCompletedSteps] = useState<StepId[]>([]);

  const [totalBudget, setTotalBudget] = useState<number>(50000);
  const [travelers, setTravelers] = useState<TravelerConfig>({
    type: 'family',
    label: 'Family with Kids',
    count: 4,
    nights: 5,
  });

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedHomeCity, setSelectedHomeCity] = useState<HomeCity | null>(null);
  const [selectedTransit, setSelectedTransit] = useState<TransitOption | null>(null);
  const [selectedExcursions, setSelectedExcursions] = useState<ExcursionItem[]>([]);
  const [selectedMainHotel, setSelectedMainHotel] = useState<HotelItem | null>(null);
  const [selectedExcursionHotel, setSelectedExcursionHotel] = useState<HotelItem | null>(null);

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  // Complete Trip State object
  const tripState: TripState = useMemo(() => ({
    currentStep,
    totalBudget,
    travelers,
    selectedDestination,
    selectedHomeCity,
    selectedTransit,
    selectedExcursions,
    selectedMainHotel,
    selectedExcursionHotel,
    startDate: '2026-12-15',
  }), [
    currentStep,
    totalBudget,
    travelers,
    selectedDestination,
    selectedHomeCity,
    selectedTransit,
    selectedExcursions,
    selectedMainHotel,
    selectedExcursionHotel,
  ]);

  // Live real-time budget calculation
  const budgetBreakdown = useMemo(() => {
    return calculateBudgetBreakdown(tripState);
  }, [tripState]);

  // Handle stage completion
  const handleNextStep = () => {
    setCompletedSteps((prev) => Array.from(new Set([...prev, currentStep])));
    if (currentStep < 7) {
      const next = (currentStep + 1) as StepId;
      setCurrentStep(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      const prev = (currentStep - 1) as StepId;
      setCurrentStep(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (step: StepId) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete reset to clean slate
  const handleResetTrip = () => {
    setTotalBudget(50000);
    setTravelers({
      type: 'family',
      label: 'Family with Kids',
      count: 4,
      nights: 5,
    });
    setSelectedDestination(null);
    setSelectedHomeCity(null);
    setSelectedTransit(null);
    setSelectedExcursions([]);
    setSelectedMainHotel(null);
    setSelectedExcursionHotel(null);
    setCurrentStep(1);
    setCompletedSteps([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Destination Change Handler: resets downstream transit, excursions, and hotels so old spending is cleared!
  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setSelectedTransit(null);
    setSelectedExcursions([]);
    setSelectedMainHotel(null);
    setSelectedExcursionHotel(null);
  };

  // Home City Change Handler: resets transit since transit routes depend on departure hub
  const handleSelectHomeCity = (city: HomeCity) => {
    setSelectedHomeCity(city);
    setSelectedTransit(null);
  };

  // Excursion Toggle Handler
  const handleToggleExcursion = (item: ExcursionItem) => {
    setSelectedExcursions((prev) => {
      const exists = prev.some((e) => e.id === item.id);
      if (exists) {
        return prev.filter((e) => e.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  // Launch Planner from Home Page (optionally prefilling preset package data)
  const handleLaunchPlanner = (presetPackage?: HomePackage) => {
    if (presetPackage) {
      const dest = DESTINATIONS.find((d) => d.id === presetPackage.destinationId);
      if (dest) {
        setSelectedDestination(dest);
      }
      if (presetPackage.numericBudget) {
        setTotalBudget(presetPackage.numericBudget);
      }
      if (presetPackage.nights) {
        setTravelers((prev) => ({
          ...prev,
          nights: presetPackage.nights,
        }));
      }
      // Reset downstream selections for clean customisation
      setSelectedTransit(null);
      setSelectedExcursions([]);
      setSelectedMainHotel(null);
      setSelectedExcursionHotel(null);
      setCurrentStep(1);
      setCompletedSteps([]);
    }
    setCurrentView('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to Home Page view
  const handleReturnHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Render Home Page if current view is 'home'
  if (currentView === 'home') {
    return <HomePage onLaunchPlanner={handleLaunchPlanner} />;
  }

  // 2. Render 7-Stage Smart Planner flow
  return (
    <div
      className="min-h-screen flex flex-col font-sans antialiased text-[#172B4D]"
      style={{ backgroundColor: BRAND.background }}
    >
      {/* 1. MakeMyTrip Main Header */}
      <Header
        currentStep={currentStep}
        onResetTrip={handleResetTrip}
        onGoHome={handleResetTrip}
        onReturnHome={handleReturnHome}
      />

      {/* 2. Top Step Indicator (Always on top showing current booking stage) */}
      <StepIndicator
        currentStep={currentStep}
        completedSteps={completedSteps}
        onSelectStep={handleJumpToStep}
      />

      {/* 3. Persistent Real-Time Budget Tracker (Always visible on all stages) */}
      <BudgetTrackerBar
        breakdown={budgetBreakdown}
        state={tripState}
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
      />

      {/* 4. Active Subscreen Stage Panel */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 && (
          <Stage1Budget
            budget={totalBudget}
            onBudgetChange={setTotalBudget}
            travelers={travelers}
            onTravelersChange={setTravelers}
            onNext={handleNextStep}
          />
        )}

        {currentStep === 2 && (
          <Stage2Destination
            selectedDestination={selectedDestination}
            onSelectDestination={handleSelectDestination}
            userBudget={totalBudget}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}

        {currentStep === 3 && (
          <Stage3HomeCity
            selectedHomeCity={selectedHomeCity}
            onSelectHomeCity={handleSelectHomeCity}
            destination={selectedDestination}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}

        {currentStep === 4 && (
          <Stage4Transit
            destination={selectedDestination}
            homeCity={selectedHomeCity}
            travelers={travelers}
            selectedTransit={selectedTransit}
            onSelectTransit={setSelectedTransit}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}

        {currentStep === 5 && (
          <Stage5Excursions
            destination={selectedDestination}
            travelers={travelers}
            selectedExcursions={selectedExcursions}
            onToggleExcursion={handleToggleExcursion}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}

        {currentStep === 6 && (
          <Stage6Hotels
            destination={selectedDestination}
            travelers={travelers}
            selectedMainHotel={selectedMainHotel}
            onSelectMainHotel={setSelectedMainHotel}
            selectedExcursionHotel={selectedExcursionHotel}
            onSelectExcursionHotel={setSelectedExcursionHotel}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}

        {currentStep === 7 && (
          <Stage7FinalSummary
            state={tripState}
            breakdown={budgetBreakdown}
            onEditStep={handleJumpToStep}
            onResetTrip={handleResetTrip}
            onReturnHome={handleReturnHome}
          />
        )}
      </main>

      {/* 5. In-flight Quick Budget Adjust Modal */}
      <BudgetAdjustModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        budget={totalBudget}
        onBudgetChange={setTotalBudget}
      />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
