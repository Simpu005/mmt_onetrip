import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, Wallet, Plane, Bed, Sparkles, Download, Share2, ShieldCheck, Star, ThumbsUp, ArrowLeft, Check, Users, Building2, Train, Mountain, Coffee, Sunset, Utensils, PlaneTakeoff, Key, Camera, Compass, ArrowDown } from 'lucide-react';
import { TripState } from '../../types/travel';
import { BudgetBreakdown, formatINR } from '../../utils/calculator';
import { BRAND } from '../../constants/theme';

interface Stage7FinalSummaryProps {
  state: TripState;
  breakdown: BudgetBreakdown;
  onEditStep: (step: 1 | 2 | 3 | 4 | 5 | 6) => void;
  onResetTrip: () => void;
  onReturnHome?: () => void;
}

export const Stage7FinalSummary: React.FC<Stage7FinalSummaryProps> = ({
  state,
  breakdown,
  onEditStep,
  onResetTrip,
  onReturnHome,
}) => {
  const [isBooked, setIsBooked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    selectedDestination: dest,
    selectedHomeCity: home,
    selectedTransit: transit,
    selectedMainHotel: hotel,
    selectedExcursionHotel: excursionHotel,
    selectedExcursions: excursions,
    travelers,
  } = state;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownload = () => {
    window.print();
  };

  const totalDays = travelers.nights + 1;
  const heroImage = dest?.image || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80';

  // Dynamic realistic trip dates starting upcoming weekend (5 days ahead)
  const getTripDate = (dayOffset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + 5 + dayOffset);
    return d;
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const formatShortDay = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const day1Date = getTripDate(0);
  const day2Date = getTripDate(1);
  const day3Date = getTripDate(2);
  const returnDate = getTripDate(totalDays - 1);
  const startDateStr = formatFullDate(day1Date);
  const endDateStr = formatFullDate(returnDate);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12 px-1">
      {/* 5. Scenic High-Contrast Success Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#D9E5F2]">
        {/* Background Scenery Image */}
        <img
          src={heroImage}
          alt={dest?.name || 'Destination scenery'}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Deep Contrast Multi-Stop Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B35]/95 via-[#0D1B35]/85 to-[#006FCC]/65 backdrop-blur-[1px]" />

        {/* Content Container */}
        <div className="relative z-10 p-5 sm:p-8 lg:p-10 text-white space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 text-white backdrop-blur-md border border-white/25">
                <ShieldCheck className="w-3.5 h-3.5 text-[#12A66A]" />
                <span>MakeMyTrip Guaranteed Itinerary • Instant Confirmation</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
                {dest?.name || 'Dream Vacation'} Odyssey
              </h1>

              {/* Metadata Badges with Explicit Dates */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-blue-100">
                <span className="inline-flex items-center gap-1 bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
                  <MapPin className="w-3.5 h-3.5 text-[#F07828]" />
                  <span>{home?.name || 'Home'} ➔ {dest?.name || 'Destination'}</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
                  <Calendar className="w-3.5 h-3.5 text-[#12A66A]" />
                  <span>{startDateStr} – {endDateStr}</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-[#008CFF]" />
                  <span>{travelers.nights} Nights / {totalDays} Days</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
                  <Users className="w-3.5 h-3.5 text-blue-200" />
                  <span>{travelers.label} ({travelers.count} Pax)</span>
                </span>
              </div>
            </div>

            {/* Right Cost Glass Card */}
            <div className="bg-white/15 backdrop-blur-lg p-5 rounded-2xl border border-white/25 text-left lg:text-right shrink-0 shadow-lg">
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-blue-100 block">
                Total Package Price
              </span>
              <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-sm">
                {formatINR(breakdown.totalSpent)}
              </span>
              <div className="mt-1 flex items-center lg:justify-end gap-1.5">
                <span
                  className="text-xs font-black px-2.5 py-0.5 rounded-full inline-flex items-center gap-1"
                  style={{
                    backgroundColor: breakdown.isOverBudget ? '#D92D36' : '#12A66A',
                    color: '#FFFFFF',
                  }}
                >
                  {breakdown.isOverBudget ? (
                    <>Over budget by {formatINR(Math.abs(breakdown.remainingBudget))}</>
                  ) : (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      <span>{formatINR(breakdown.remainingBudget)} unspent buffer</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsBooked(true)}
              className="px-6 py-3 rounded-2xl bg-[#F07828] hover:bg-[#D96518] text-white font-black text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Confirm & Instant Book All</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-md border border-white/20"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Itinerary</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-md border border-white/20"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Itinerary'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Toast with Explicit Travel Dates */}
      {isBooked && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#12A66A]/10 border-2 border-[#12A66A] animate-fadeIn flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#12A66A] text-white flex items-center justify-center shrink-0 shadow-md">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#172B4D]">
                Booking Confirmed! Reference ID: MMT-AI-994218
              </h3>
              <p className="text-xs text-[#52657D] mt-0.5">
                Travel Dates: <strong className="text-[#172B4D]">{startDateStr} to {endDateStr}</strong>. Digital vouchers for {transit?.carrier || 'transit'}, {hotel?.name || 'hotel stay'}, and {excursions.length} excursion passes are active on your registered account.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsBooked(false)}
            className="px-4 py-2 rounded-xl bg-[#12A66A] text-white font-bold text-xs hover:brightness-105 cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Financial Breakdown Ledger with Step Dates */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border shadow-sm space-y-6" style={{ borderColor: BRAND.border }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-black text-[#172B4D] flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#008CFF]" />
              <span>Itemized Spending Ledger vs Total Budget</span>
            </h2>
            <p className="text-xs text-[#52657D]">Every milestone with transparent prices, scheduled dates, and zero hidden fees.</p>
          </div>

          <span
            className="text-xs font-black px-3 py-1 rounded-full self-start sm:self-auto"
            style={{
              backgroundColor: breakdown.isOverBudget ? '#D92D3615' : '#12A66A15',
              color: breakdown.isOverBudget ? '#D92D36' : '#12A66A',
            }}
          >
            {breakdown.isOverBudget ? 'Exceeded Target Budget' : 'Within Set Budget'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Transit */}
          <div className="p-4 rounded-2xl bg-[#F5F8FC] border space-y-1.5 relative group" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#52657D] flex items-center gap-1">
                <Plane className="w-3.5 h-3.5 text-[#008CFF]" /> 1. Transit
              </span>
              <button
                onClick={() => onEditStep(4)}
                className="text-[10px] text-[#008CFF] font-bold hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <p className="text-xl font-black text-[#172B4D]">{formatINR(breakdown.transitCost)}</p>
            <p className="text-[11px] text-[#52657D] line-clamp-1 font-medium">
              {transit?.carrier || 'None selected'} ({travelers.count} seats)
            </p>
            <p className="text-[10px] font-semibold text-[#008CFF] flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatShortDate(day1Date)} &amp; {formatShortDate(returnDate)}</span>
            </p>
          </div>

          {/* Hotel */}
          <div className="p-4 rounded-2xl bg-[#F5F8FC] border space-y-1.5 relative group" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#52657D] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#F07828]" /> 2. Accommodations
              </span>
              <button
                onClick={() => onEditStep(6)}
                className="text-[10px] text-[#008CFF] font-bold hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <p className="text-xl font-black text-[#172B4D]">{formatINR(breakdown.hotelTotalCost)}</p>
            <p className="text-[11px] text-[#52657D] line-clamp-1 font-medium">
              {hotel?.name || 'Primary Stay'}
            </p>
            <p className="text-[10px] font-semibold text-[#F07828] flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatShortDay(day1Date)} – {formatShortDay(returnDate)} ({travelers.nights}N)</span>
            </p>
          </div>

          {/* Excursions */}
          <div className="p-4 rounded-2xl bg-[#F5F8FC] border space-y-1.5 relative group" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#52657D] flex items-center gap-1">
                <Mountain className="w-3.5 h-3.5 text-[#12A66A]" /> 3. Excursions &amp; Entry
              </span>
              <button
                onClick={() => onEditStep(5)}
                className="text-[10px] text-[#008CFF] font-bold hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <p className="text-xl font-black text-[#172B4D]">{formatINR(breakdown.excursionsCost)}</p>
            <p className="text-[11px] text-[#52657D] line-clamp-1 font-medium">
              {excursions.length} Curated Excursion{excursions.length === 1 ? '' : 's'}
            </p>
            <p className="text-[10px] font-semibold text-[#12A66A] flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Day 2 ({formatShortDay(day2Date)}) {excursions.length > 1 ? `& Day 3 (${formatShortDay(day3Date)})` : ''}</span>
            </p>
          </div>

          {/* Pocket Buffer */}
          <div className="p-4 rounded-2xl bg-[#F5F8FC] border space-y-1.5 relative group" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#52657D] flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-[#7B2CBF]" /> 4. Unspent Pocket Buffer
              </span>
              <button
                onClick={() => onEditStep(1)}
                className="text-[10px] text-[#008CFF] font-bold hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <p
              className="text-xl font-black"
              style={{ color: breakdown.statusColor }}
            >
              {formatINR(breakdown.remainingBudget)}
            </p>
            <p className="text-[11px] text-[#52657D]">For meals, shopping &amp; tips</p>
            <p className="text-[10px] font-semibold text-[#7B2CBF] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>All {totalDays} Days Buffer</span>
            </p>
          </div>
        </div>
      </div>

      {/* 6. Dynamic Day-by-Day Milestone Travel Flow with Clean Straight Line Indicators */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border shadow-sm space-y-8" style={{ borderColor: BRAND.border }}>
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#172B4D] flex items-center gap-2">
              <Compass className="w-6 h-6 text-[#008CFF]" />
              <span>Chronological Travel Flow &amp; Milestone Timetable</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#12A66A]/10 text-[#12A66A] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{startDateStr} – {endDateStr}</span>
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#008CFF]/10 text-[#008CFF]">
                {totalDays} Days Roadmap
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#52657D] mt-1">
            Follow the connected journey path with scheduled dates, milestone timings, transit checkpoints, accommodation check-ins, and curated excursions.
          </p>
        </div>

        {/* Visual Roadmap with Normal Straight Line Connectors & Fixed Non-Cutting Day Badges */}
        <div className="space-y-6 relative">
          {/* Day 1 Milestone Card */}
          <div className="relative bg-gradient-to-br from-white to-[#F5F8FC] rounded-3xl border-2 p-5 sm:p-6 shadow-xs" style={{ borderColor: BRAND.border }}>
            {/* Top Milestone Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: BRAND.border }}>
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Fixed Non-Cutting Day Badge with Date */}
                <div className="px-3.5 py-1.5 rounded-xl bg-[#008CFF] text-white flex flex-col items-center justify-center font-black shadow-xs shrink-0 whitespace-nowrap min-w-[72px]">
                  <span className="text-xs tracking-wider">DAY 1</span>
                  <span className="text-[10px] font-semibold text-blue-100">{formatShortDay(day1Date)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-[#172B4D] leading-tight">
                      Departure &amp; Seamless Base Check-In
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#008CFF]/10 text-[#008CFF] text-xs font-bold whitespace-nowrap">
                      <Calendar className="w-3 h-3" />
                      <span>{formatFullDate(day1Date)}</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#52657D] mt-0.5">Journey from {home?.name || 'Origin Hub'} to {dest?.name || 'Destination'}</p>
                </div>
              </div>

              <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white border text-xs font-black text-[#008CFF] shadow-2xs shrink-0 whitespace-nowrap" style={{ borderColor: BRAND.border }}>
                Milestone Spend: {formatINR(breakdown.transitCost / 2 + (hotel?.pricePerNight || 0))}
              </div>
            </div>

            {/* Time Stops Visual Grid with Explicit Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {/* Departure Node */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border shadow-2xs" style={{ borderColor: BRAND.border }}>
                <div className="p-2.5 rounded-xl bg-[#008CFF]/10 text-[#008CFF] shrink-0 mt-0.5">
                  <PlaneTakeoff className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-[#008CFF] flex items-center gap-1.5 flex-wrap">
                    <Calendar className="w-3 h-3 text-[#008CFF]" />
                    <span>{formatShortDate(day1Date)}</span>
                    <span>•</span>
                    <span>{transit?.departureTime || '07:15 AM'} • Boarding</span>
                  </span>
                  <p className="text-xs font-bold text-[#172B4D]">
                    {transit?.carrier || 'Carrier Express'} ({transit?.number || 'Direct'})
                  </p>
                  <p className="text-[11px] text-[#52657D]">
                    Depart from {transit?.originHub || home?.name}. Luggage check completed.
                  </p>
                </div>
              </div>

              {/* Arrival Node */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border shadow-2xs" style={{ borderColor: BRAND.border }}>
                <div className="p-2.5 rounded-xl bg-[#12A66A]/10 text-[#12A66A] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-[#12A66A] flex items-center gap-1.5 flex-wrap">
                    <Calendar className="w-3 h-3 text-[#12A66A]" />
                    <span>{formatShortDate(day1Date)}</span>
                    <span>•</span>
                    <span>{transit?.arrivalTime || '09:25 AM'} • Touchdown &amp; Transfer</span>
                  </span>
                  <p className="text-xs font-bold text-[#172B4D]">
                    Arrival at {transit?.destHub || dest?.name}
                  </p>
                  <p className="text-[11px] text-[#52657D]">
                    Pre-booked private driver waiting at arrivals with name placard.
                  </p>
                </div>
              </div>

              {/* Hotel Check-in Node */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border shadow-2xs" style={{ borderColor: BRAND.border }}>
                <div className="p-2.5 rounded-xl bg-[#F07828]/10 text-[#F07828] shrink-0 mt-0.5">
                  <Key className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-[#F07828] flex items-center gap-1.5 flex-wrap">
                    <Calendar className="w-3 h-3 text-[#F07828]" />
                    <span>{formatShortDate(day1Date)}</span>
                    <span>•</span>
                    <span>01:30 PM • Hotel Check-In</span>
                  </span>
                  <p className="text-xs font-bold text-[#172B4D]">
                    {hotel?.name || 'Selected Base Hotel'}
                  </p>
                  <p className="text-[11px] text-[#52657D]">
                    Welcome refreshments, room keycard handover, and scenic balcony relaxation.
                  </p>
                </div>
              </div>

              {/* Sunset Leisure Node */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border shadow-2xs" style={{ borderColor: BRAND.border }}>
                <div className="p-2.5 rounded-xl bg-[#7B2CBF]/10 text-[#7B2CBF] shrink-0 mt-0.5">
                  <Sunset className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-[#7B2CBF] flex items-center gap-1.5 flex-wrap">
                    <Calendar className="w-3 h-3 text-[#7B2CBF]" />
                    <span>{formatShortDate(day1Date)}</span>
                    <span>•</span>
                    <span>05:30 PM • Sunset Stroll &amp; Bazaar</span>
                  </span>
                  <p className="text-xs font-bold text-[#172B4D]">
                    Promenade &amp; Heritage Bazaar
                  </p>
                  <p className="text-[11px] text-[#52657D]">
                    Sample hot regional snacks, watch the sunset, and enjoy evening leisure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Normal Straight Line Connector 1 (Replacing curved SVG) */}
          <div className="flex items-center justify-center my-2 relative z-10" aria-label="Path to Day 2">
            <div className="w-full max-w-md flex items-center justify-center gap-3">
              <div className="flex-1 h-0.5 border-t-2 border-dashed border-[#008CFF]/50" />
              <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F8FC] border border-[#008CFF]/30 text-xs font-extrabold text-[#008CFF] shadow-2xs whitespace-nowrap">
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Next Leg • Day 2 ({formatShortDate(day2Date)})</span>
              </div>
              <div className="flex-1 h-0.5 border-t-2 border-dashed border-[#008CFF]/50" />
            </div>
          </div>

          {/* Day 2 Milestone Card */}
          {excursions.length > 0 && (
            <div className="relative bg-gradient-to-br from-white to-[#F5F8FC] rounded-3xl border-2 p-5 sm:p-6 shadow-xs" style={{ borderColor: BRAND.border }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: BRAND.border }}>
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Fixed Non-Cutting Day 2 Badge */}
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#F07828] text-white flex flex-col items-center justify-center font-black shadow-xs shrink-0 whitespace-nowrap min-w-[72px]">
                    <span className="text-xs tracking-wider">DAY 2</span>
                    <span className="text-[10px] font-semibold text-orange-100">{formatShortDay(day2Date)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-[#172B4D] leading-tight">
                        {excursions[0].title}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#F07828]/10 text-[#F07828] text-xs font-bold whitespace-nowrap">
                        <Calendar className="w-3 h-3" />
                        <span>{formatFullDate(day2Date)}</span>
                      </span>
                    </div>
                    <p className="text-xs text-[#52657D] mt-0.5">{excursions[0].locationArea}</p>
                  </div>
                </div>

                <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white border text-xs font-black text-[#F07828] shadow-2xs shrink-0 whitespace-nowrap" style={{ borderColor: BRAND.border }}>
                  Milestone Spend: {formatINR(excursions[0].approxCostPerPerson * travelers.count + (hotel?.pricePerNight || 0))}
                </div>
              </div>

              {/* Day 2 Content Grid with Scenery Thumbnail and Explicit Dates */}
              <div className="flex flex-col md:flex-row gap-5 pt-4">
                <div className="w-full md:w-56 h-40 rounded-2xl overflow-hidden shrink-0 relative group border" style={{ borderColor: BRAND.border }}>
                  <img
                    src={excursions[0].image}
                    alt={excursions[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Signature Highlight
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl border space-y-1" style={{ borderColor: BRAND.border }}>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#008CFF] flex-wrap">
                      <Calendar className="w-3 h-3 text-[#008CFF]" />
                      <span>{formatShortDate(day2Date)}</span>
                      <span>•</span>
                      <Coffee className="w-3.5 h-3.5" />
                      <span>08:30 AM • Buffet Breakfast</span>
                    </div>
                    <p className="text-xs text-[#52657D]">Hot morning spread at {hotel?.name}.</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border space-y-1" style={{ borderColor: BRAND.border }}>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#F07828] flex-wrap">
                      <Calendar className="w-3 h-3 text-[#F07828]" />
                      <span>{formatShortDate(day2Date)}</span>
                      <span>•</span>
                      <Compass className="w-3.5 h-3.5" />
                      <span>09:30 AM • Scenic Transit</span>
                    </div>
                    <p className="text-xs text-[#52657D]">{excursions[0].transitMode} ({excursions[0].transitDuration}).</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border space-y-1 sm:col-span-2" style={{ borderColor: BRAND.border }}>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#12A66A] flex-wrap">
                      <Calendar className="w-3 h-3 text-[#12A66A]" />
                      <span>{formatShortDate(day2Date)}</span>
                      <span>•</span>
                      <Camera className="w-3.5 h-3.5" />
                      <span>10:30 AM - 04:00 PM • Key Attractions</span>
                    </div>
                    <p className="text-xs text-[#172B4D] font-medium">
                      {excursions[0].attractions.join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Normal Straight Line Connector 2 (Replacing curved SVG) */}
          {excursions.length > 1 && (
            <div className="flex items-center justify-center my-2 relative z-10" aria-label="Path to Day 3">
              <div className="w-full max-w-md flex items-center justify-center gap-3">
                <div className="flex-1 h-0.5 border-t-2 border-dashed border-[#12A66A]/50" />
                <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F8FC] border border-[#12A66A]/30 text-xs font-extrabold text-[#12A66A] shadow-2xs whitespace-nowrap">
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Next Leg • Day 3 ({formatShortDate(day3Date)})</span>
                </div>
                <div className="flex-1 h-0.5 border-t-2 border-dashed border-[#12A66A]/50" />
              </div>
            </div>
          )}

          {/* Day 3 Milestone Card */}
          {excursions.length > 1 && (
            <div className="relative bg-gradient-to-br from-white to-[#F5F8FC] rounded-3xl border-2 p-5 sm:p-6 shadow-xs" style={{ borderColor: BRAND.border }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: BRAND.border }}>
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Fixed Non-Cutting Day 3 Badge */}
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#12A66A] text-white flex flex-col items-center justify-center font-black shadow-xs shrink-0 whitespace-nowrap min-w-[72px]">
                    <span className="text-xs tracking-wider">DAY 3</span>
                    <span className="text-[10px] font-semibold text-emerald-100">{formatShortDay(day3Date)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-[#172B4D] leading-tight">
                        {excursions[1].title} {excursionHotel ? '• Scenic Stay Transition' : ''}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#12A66A]/10 text-[#12A66A] text-xs font-bold whitespace-nowrap">
                        <Calendar className="w-3 h-3" />
                        <span>{formatFullDate(day3Date)}</span>
                      </span>
                    </div>
                    <p className="text-xs text-[#52657D] mt-0.5">{excursions[1].locationArea}</p>
                  </div>
                </div>

                <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white border text-xs font-black text-[#12A66A] shadow-2xs shrink-0 whitespace-nowrap" style={{ borderColor: BRAND.border }}>
                  Milestone Spend: {formatINR(excursions[1].approxCostPerPerson * travelers.count + (excursionHotel?.pricePerNight || hotel?.pricePerNight || 0))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5 pt-4">
                <div className="w-full md:w-56 h-40 rounded-2xl overflow-hidden shrink-0 relative group border" style={{ borderColor: BRAND.border }}>
                  <img
                    src={excursions[1].image}
                    alt={excursions[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Scenic Outpost
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="p-3 bg-white rounded-xl border space-y-1" style={{ borderColor: BRAND.border }}>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#12A66A] flex-wrap">
                      <Calendar className="w-3 h-3" />
                      <span>{formatShortDate(day3Date)}</span>
                      <span>•</span>
                      <Compass className="w-3.5 h-3.5" />
                      <span>Full Day Activities &amp; Natural Vista</span>
                    </div>
                    <p className="text-xs text-[#52657D]">{excursions[1].attractions.join(' • ')}</p>
                  </div>

                  {excursionHotel && (
                    <div className="p-3 bg-[#008CFF]/5 border border-[#008CFF]/20 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#008CFF] flex-wrap">
                        <Calendar className="w-3 h-3" />
                        <span>{formatShortDate(day3Date)}</span>
                        <span>•</span>
                        <Bed className="w-3.5 h-3.5" />
                        <span>Overnight Scenic Outpost Stay: {excursionHotel.name}</span>
                      </div>
                      <p className="text-xs text-[#52657D]">
                        Check-in at {excursionHotel.areaName} with starlit dinner under clear skies.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Normal Straight Line Connector 3 (Replacing curved SVG) */}
          <div className="flex items-center justify-center my-2 relative z-10" aria-label="Path to Return Day">
            <div className="w-full max-w-md flex items-center justify-center gap-3">
              <div className="flex-1 h-0.5 border-t-2 border-dashed border-[#172B4D]/40" />
              <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F8FC] border border-[#172B4D]/30 text-xs font-extrabold text-[#172B4D] shadow-2xs whitespace-nowrap">
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Final Journey Leg • Day {totalDays} ({formatShortDate(returnDate)})</span>
              </div>
              <div className="flex-1 h-0.5 border-t-2 border-dashed border-[#172B4D]/40" />
            </div>
          </div>

          {/* Final Return Day Milestone Card */}
          <div className="relative bg-gradient-to-br from-white to-[#F5F8FC] rounded-3xl border-2 p-5 sm:p-6 shadow-xs" style={{ borderColor: BRAND.border }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: BRAND.border }}>
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Fixed Non-Cutting Final Day Badge */}
                <div className="px-3.5 py-1.5 rounded-xl bg-[#172B4D] text-white flex flex-col items-center justify-center font-black shadow-xs shrink-0 whitespace-nowrap min-w-[72px]">
                  <span className="text-xs tracking-wider">DAY {totalDays}</span>
                  <span className="text-[10px] font-semibold text-slate-300">{formatShortDay(returnDate)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-[#172B4D] leading-tight">
                      Souvenir Trails &amp; Return Transit to {home?.name || 'Home'}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#172B4D]/10 text-[#172B4D] text-xs font-bold whitespace-nowrap">
                      <Calendar className="w-3 h-3" />
                      <span>{formatFullDate(returnDate)}</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#52657D] mt-0.5">Safe return journey with verified baggage handling</p>
                </div>
              </div>

              <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white border text-xs font-black text-[#172B4D] shadow-2xs shrink-0 whitespace-nowrap" style={{ borderColor: BRAND.border }}>
                Milestone Spend: {formatINR(breakdown.transitCost / 2)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="p-3 bg-white rounded-xl border space-y-1" style={{ borderColor: BRAND.border }}>
                <span className="text-xs font-black text-[#008CFF] flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#008CFF]" />
                  <span>{formatShortDate(returnDate)} • 10:00 AM • Checkout</span>
                </span>
                <p className="text-xs text-[#52657D]">Luggage storage &amp; farewell tea at hotel lobby.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border space-y-1" style={{ borderColor: BRAND.border }}>
                <span className="text-xs font-black text-[#F07828] flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#F07828]" />
                  <span>{formatShortDate(returnDate)} • 12:30 PM • Souvenirs</span>
                </span>
                <p className="text-xs text-[#52657D]">Handicrafts, tea leaves, local spices &amp; sweets.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border space-y-1" style={{ borderColor: BRAND.border }}>
                <span className="text-xs font-black text-[#12A66A] flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#12A66A]" />
                  <span>{formatShortDate(returnDate)} • Afternoon • Return</span>
                </span>
                <p className="text-xs text-[#52657D]">Board {transit?.carrier || 'transit'} safely back to {home?.name || 'Home'}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Reviews on Chosen Selections (Clean SVG Icons, No Emoji) */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border shadow-sm space-y-6" style={{ borderColor: BRAND.border }}>
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#172B4D] flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>Past Guest Experiences on Your Selected Items</span>
          </h2>
          <p className="text-xs text-[#52657D] mt-0.5">
            Here is what verified travelers loved most about the specific hotel, transit, and excursions in your plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hotel review */}
          {hotel && (
            <div className="p-4 rounded-2xl bg-[#F5F8FC] border space-y-2" style={{ borderColor: BRAND.border }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#172B4D] truncate max-w-[220px] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#008CFF] shrink-0" />
                  <span>{hotel.name}</span>
                </span>
                <span className="text-[11px] font-bold text-[#12A66A]">
                  {hotel.reviewSentiment.percentageLoved}% Loved
                </span>
              </div>
              <p className="text-xs text-[#52657D] font-semibold">
                Liked: {hotel.reviewSentiment.whatTheyLiked}
              </p>
              <p className="text-xs text-[#172B4D] italic bg-white p-2.5 rounded-xl border" style={{ borderColor: BRAND.border }}>
                "{hotel.reviewSentiment.guestQuote}"
              </p>
              <p className="text-[10px] text-[#98A9BC]">
                — {hotel.reviewSentiment.guestName} ({hotel.reviewSentiment.guestType})
              </p>
            </div>
          )}

          {/* Transit review */}
          {transit && (
            <div className="p-4 rounded-2xl bg-[#F5F8FC] border space-y-2" style={{ borderColor: BRAND.border }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#172B4D] truncate max-w-[220px] flex items-center gap-1.5">
                  <Train className="w-4 h-4 text-[#F07828] shrink-0" />
                  <span>{transit.carrier} ({transit.number})</span>
                </span>
                <span className="text-[11px] font-bold text-[#008CFF]">
                  {transit.onTimeRating}% Punctual
                </span>
              </div>
              <p className="text-xs text-[#52657D] font-semibold">
                Class: {transit.classType} • {transit.stops}
              </p>
              <p className="text-xs text-[#172B4D] italic bg-white p-2.5 rounded-xl border" style={{ borderColor: BRAND.border }}>
                "{transit.reviewHighlight}"
              </p>
              <p className="text-[10px] text-[#98A9BC]">— MMT Verified Booking Reviews</p>
            </div>
          )}

          {/* Excursion reviews */}
          {excursions.map((ex) => (
            <div key={ex.id} className="p-4 rounded-2xl bg-[#F5F8FC] border space-y-2" style={{ borderColor: BRAND.border }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#172B4D] truncate max-w-[220px] flex items-center gap-1.5">
                  <Mountain className="w-4 h-4 text-[#12A66A] shrink-0" />
                  <span>{ex.title}</span>
                </span>
                <span className="text-[11px] font-bold text-[#F07828]">
                  {ex.reviews.percentageLoved}% Recommended
                </span>
              </div>
              <p className="text-xs text-[#52657D] font-semibold">
                Highlights: {ex.reviews.topLovedAspect}
              </p>
              <p className="text-xs text-[#172B4D] italic bg-white p-2.5 rounded-xl border" style={{ borderColor: BRAND.border }}>
                "{ex.reviews.sampleQuote}"
              </p>
              <p className="text-[10px] text-[#98A9BC]">— {ex.reviews.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: BRAND.border }}>
        <button
          type="button"
          onClick={() => onEditStep(6)}
          className="px-4 sm:px-5 py-2.5 rounded-xl border text-xs font-bold text-[#172B4D] hover:bg-[#F5F8FC] flex items-center gap-1.5 cursor-pointer"
          style={{ borderColor: BRAND.border }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hotel Selection</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {onReturnHome && (
            <button
              type="button"
              onClick={onReturnHome}
              className="px-4 py-2.5 rounded-xl border text-xs font-bold text-[#52657D] hover:bg-[#F5F8FC] hover:text-[#008CFF] cursor-pointer"
              style={{ borderColor: BRAND.border }}
            >
              Explore Home
            </button>
          )}

          <button
            type="button"
            onClick={onResetTrip}
            className="px-4 py-2.5 rounded-xl border text-xs font-bold text-[#D92D36] hover:bg-red-50 cursor-pointer"
            style={{ borderColor: BRAND.border }}
          >
            Start New Plan
          </button>

          <button
            type="button"
            onClick={() => setIsBooked(true)}
            className="px-6 sm:px-8 py-3 rounded-2xl text-white font-black text-xs sm:text-sm shadow-md transition-all hover:brightness-110 flex items-center gap-2 cursor-pointer"
            style={{ backgroundColor: BRAND.primary }}
          >
            <span>Proceed to Payment Gateway</span>
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
