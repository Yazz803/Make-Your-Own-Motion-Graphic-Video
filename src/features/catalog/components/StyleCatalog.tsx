'use client';

import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import {
  BANG_MOTION_COUNT,
  LEMO_OPUSCAR_COUNT,
  MOTION_STYLES,
} from '@/lib/constants';
import type { MotionStyle } from '@/types';
import { useStyleCatalogFilter } from '../hooks/useStyleCatalogFilter';
import StationMatrix from './StationMatrix';
import StyleCard from './StyleCard';
import StyleDetailModal from './StyleDetailModal';

interface StyleCatalogProps {
  selectedStyleId: string;
  onSelectStyle: (style: MotionStyle) => void;
}

export default function StyleCatalog({
  selectedStyleId,
  onSelectStyle,
}: StyleCatalogProps) {
  const [inspectedStyle, setInspectedStyle] = useState<MotionStyle | null>(null);
  const {
    repoFilter,
    stationFilter,
    query,
    availableStations,
    filteredStyles,
    displayedStyles,
    remainingCount,
    hasActiveFilters,
    pageIncrement,
    handleRepoChange,
    handleStationChange,
    handleQueryChange,
    showMore,
    showAll,
    resetFilters,
  } = useStyleCatalogFilter();

  const handleUseStyle = (style: MotionStyle) => {
    onSelectStyle(style);
    setInspectedStyle(null);
    const studioEl = document.getElementById('studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="katalog"
      className="scroll-mt-16 border-t border-zinc-800/80 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div data-tour-target="catalog">
          {/* Section header */}
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl [text-wrap:balance]">
              Katalog {MOTION_STYLES.length} Gaya Visual
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
              Menampilkan foto pratinjau langsung dari sumber repositori untuk{' '}
              {BANG_MOTION_COUNT} gaya resmi{' '}
              <code className="font-mono text-zinc-200">@bang-motion</code> (6
              Explainer + 5 Opener &amp; Promo) dan {LEMO_OPUSCAR_COUNT} gaya
              resmi{' '}
              <code className="font-mono text-zinc-200">@lemo-opuscar</code> (15
              kategori lengkap).
            </p>
          </div>

          {/* Contribution-Graph-inspired Station Matrix + Vertical Repo Selector */}
          <StationMatrix
            repoFilter={repoFilter}
            stationFilter={stationFilter}
            onSelectRepo={handleRepoChange}
            onSelectStation={handleStationChange}
          />

          {/* Search & Station Filter Toolbar */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-12">
            <div className="relative sm:col-span-7">
              <LuSearch
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                aria-label="Cari gaya visual"
                placeholder="Cari gaya (Ukiyo-e, Teardown, Pixel)..."
                className="h-11 w-full rounded-md border border-zinc-800 bg-[#111114]/90 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-400 focus:border-[#33E092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              />
            </div>

            <div className="sm:col-span-5">
              <select
                aria-label="Filter kategori stasiun gaya"
                value={stationFilter}
                onChange={(e) => handleStationChange(e.target.value)}
                className="h-11 w-full rounded-md border border-zinc-800 bg-[#111114]/90 px-3.5 text-sm text-zinc-100 focus:border-[#33E092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <option value="all">
                  Semua Kategori ({availableStations.length} kategori)
                </option>
                {availableStations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result summary */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400 tabular-nums">
          <span>
            Menampilkan {displayedStyles.length} dari {filteredStyles.length}{' '}
            gaya visual
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-sm font-medium text-[#33E092] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Cards grid */}
        {displayedStyles.length === 0 ? (
          <div className="mt-8 rounded-lg border border-zinc-800 bg-[#111114]/90 p-10 text-center">
            <p className="text-sm font-medium text-zinc-200">
              Tidak ada gaya visual yang cocok dengan pencarianmu.
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Coba kata kunci lain atau reset filter kategori di atas.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayedStyles.map((style, index) => (
              <StyleCard
                key={style.id}
                style={style}
                isSelected={style.id === selectedStyleId}
                priority={index < 3}
                onUseStyle={handleUseStyle}
                onInspectStyle={setInspectedStyle}
              />
            ))}
          </div>
        )}

        {/* Progressive pagination controls */}
        {remainingCount > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={showMore}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-zinc-800 bg-[#18181B] px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-[#33E092]/60 hover:text-[#33E092] whitespace-nowrap tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              Tampilkan {Math.min(pageIncrement, remainingCount)} Gaya Lagi
            </button>
            <button
              type="button"
              onClick={showAll}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-[#33E092] whitespace-nowrap tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              Tampilkan Semua ({filteredStyles.length})
            </button>
          </div>
        )}
      </div>

      <StyleDetailModal
        style={inspectedStyle}
        onClose={() => setInspectedStyle(null)}
        onUseStyle={handleUseStyle}
      />
    </section>
  );
}
