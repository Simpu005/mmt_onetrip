import React from 'react';
import PackageCard from './PackageCard';
import { BRAND } from '../theme';

export default function PackageGrid({
  packages,
  onSelect,
  title = 'Popular AI-Curated Packages',
  subtitle = 'Instant ready-to-customize plans highly rated by recent travelers',
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-[#172B4D]">{title}</h3>
          <p className="text-xs sm:text-sm text-[#667085]">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-[#667085]">Filter by:</span>
          <select
            className="text-xs font-bold border rounded-lg px-2.5 py-1.5 bg-white text-[#172B4D]"
            style={{ borderColor: BRAND.border }}
          >
            <option>Most Popular</option>
            <option>Price: Low to High</option>
            <option>Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
