import React, { useState, useMemo } from 'react';
import { HomePackage } from '../../data/homePackages';
import { HomePackageCard } from './HomePackageCard';
import { BRAND } from '../../constants/theme';

interface HomePackageGridProps {
  packages: HomePackage[];
  onSelect: (pkg: HomePackage) => void;
  title?: string;
  subtitle?: string;
}

export const HomePackageGrid: React.FC<HomePackageGridProps> = ({
  packages,
  onSelect,
  title = 'Popular AI-Curated Packages',
  subtitle = 'Instant ready-to-customize plans highly rated by recent travelers',
}) => {
  const [filterBy, setFilterBy] = useState('popular');

  const sortedPackages = useMemo(() => {
    const list = [...packages];
    if (filterBy === 'price_asc') {
      return list.sort((a, b) => a.numericBudget - b.numericBudget);
    }
    if (filterBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [packages, filterBy]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-[#172B4D]">{title}</h3>
          <p className="text-xs sm:text-sm text-[#52657D] font-medium mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="text-xs font-bold text-[#52657D]">Filter by:</span>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="text-xs font-bold border rounded-xl px-3 py-1.5 bg-white text-[#172B4D] shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#008CFF] cursor-pointer"
            style={{ borderColor: BRAND.border }}
          >
            <option value="popular">Most Popular</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {sortedPackages.map((pkg) => (
          <HomePackageCard key={pkg.id} pkg={pkg} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
};
