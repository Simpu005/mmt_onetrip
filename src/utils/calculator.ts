import { TripState } from '../types/travel';

export interface BudgetBreakdown {
  totalBudget: number;
  transitCost: number;
  mainHotelCost: number;
  excursionHotelCost: number;
  hotelTotalCost: number;
  excursionsCost: number;
  totalSpent: number;
  remainingBudget: number;
  percentSpent: number;
  isOverBudget: boolean;
  statusColor: string;
  statusMessage: string;
}

export function calculateBudgetBreakdown(state: TripState): BudgetBreakdown {
  const { totalBudget, travelers, selectedTransit, selectedMainHotel, selectedExcursionHotel, selectedExcursions } = state;
  const personCount = Math.max(1, travelers.count);
  const totalNights = Math.max(1, travelers.nights);

  // Transit: roundtrip for all travelers
  const transitCost = selectedTransit ? selectedTransit.pricePerPerson * personCount * 2 : 0;

  // If excursion hotel is chosen for 1 night of the stay, main hotel is for (totalNights - 1) nights
  const mainHotelNights = selectedExcursionHotel && totalNights > 1 ? totalNights - 1 : totalNights;
  const mainHotelCost = selectedMainHotel ? selectedMainHotel.pricePerNight * mainHotelNights : 0;
  const excursionHotelCost = selectedExcursionHotel ? selectedExcursionHotel.pricePerNight * 1 : 0;
  const hotelTotalCost = mainHotelCost + excursionHotelCost;

  // Excursions approx per person
  const excursionsCost = selectedExcursions.reduce(
    (acc, curr) => acc + curr.approxCostPerPerson * personCount,
    0
  );

  const totalSpent = transitCost + hotelTotalCost + excursionsCost;
  const remainingBudget = totalBudget - totalSpent;
  const percentSpent = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0;
  const isOverBudget = remainingBudget < 0;

  let statusColor = '#12A66A'; // Success green
  let statusMessage = 'Full budget available (₹0 spent)';

  if (isOverBudget) {
    statusColor = '#D92D36'; // Error red
    statusMessage = `Over budget by ₹${Math.abs(remainingBudget).toLocaleString('en-IN')}`;
  } else if (percentSpent > 85) {
    statusColor = '#E99A20'; // Warning orange
    statusMessage = 'Nearing budget limit (85%+ allocated)';
  } else if (percentSpent > 50) {
    statusColor = '#008CFF'; // Primary blue
    statusMessage = 'Balanced spending trajectory';
  } else if (totalSpent > 0) {
    statusColor = '#12A66A';
    statusMessage = 'Comfortably within budget';
  }

  return {
    totalBudget,
    transitCost,
    mainHotelCost,
    excursionHotelCost,
    hotelTotalCost,
    excursionsCost,
    totalSpent,
    remainingBudget,
    percentSpent,
    isOverBudget,
    statusColor,
    statusMessage,
  };
}

export function formatINR(val: number): string {
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}
