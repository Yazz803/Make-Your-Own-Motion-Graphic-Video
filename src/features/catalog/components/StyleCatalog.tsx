'use client';

import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import {
  BANG_MOTION_COUNT,
  LEMO_OPUSCAR_COUNT,
  MOTION_STYLES,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { MotionStyle } from '@/types';
import { useStyleCatalogFilter } from '../hooks/useStyleCatalogFilter';
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

  const repoTabs = [
    { id: 'all', label: `Semua (${MOTION_STYLES.length})` },
    { id: 'bang-motion', label: `bang-motion (${BANG_MOTION_COUNT})` },
    { id: 'lemo-opuscar', label: `lemo-opuscar (${LEMO_OPUSCAR_COUNT})` },
  ] as const;

  return (
    <section
      id="katalog"
      className="border-t border-zinc-800/80 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section header + repository tabs */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#F2B705]">
              01. Referensi Gaya Visual Lengkap
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl [text-wrap:balance]">
              Semua {MOTION_STYLES.length} gaya visual dari bang-motion &amp;
              lemo-opuscar
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

          <div
            role="tablist"
            aria-label="Filter sumber repositori"
            className="inline-flex items-center gap-1 self-start rounded-lg border border-zinc-800 bg-zinc-950 p-1 lg:self-auto"
          >
            {repoTabs.map((tab) => {
              const active = repoFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleRepoChange(tab.id)}
                  className={cn(
                    'min-h-[38px] rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]',
                    active
                      ? 'bg-zinc-800 text-zinc-50'
                      : 'text-zinc-400 hover:text-zinc-100'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Station Filter Toolbar */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-12">
          <div className="relative sm:col-span-7">
            <LuSearch
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              aria-label="Cari gaya visual"
              placeholder="Cari gaya visual (mis. Ukiyo-e, Teardown, Risograph, Blueprint, Cartoon, Pixel)..."
              className="h-11 w-full rounded-lg border border-zinc-800 bg-[#121215] pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#F2B705] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-5">
            <select
              aria-label="Filter kategori stasiun gaya"
              value={stationFilter}
              onChange={(e) => handleStationChange(e.target.value)}
              className="h-11 w-full rounded-lg border border-zinc-800 bg-[#121215] px-3.5 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
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
              className="font-medium text-[#F2B705] hover:underline underline-offset-4"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Cards grid */}
        {displayedStyles.length === 0 ? (
          <div className="mt-8 rounded-xl border border-zinc-800 bg-[#121215] p-10 text-center">
            <p className="text-sm font-medium text-zinc-200">
              Tidak ada gaya visual yang cocok dengan pencarianmu.
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Coba kata kunci lain atau reset filter kategori di atas.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-zinc-700 bg-[#121215] px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900 whitespace-nowrap tabular-nums"
            >
              Tampilkan {Math.min(pageIncrement, remainingCount)} Gaya Lagi
            </button>
            <button
              type="button"
              onClick={showAll}
              className="inline-flex min-h-[44px] items-center justify-center px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100 whitespace-nowrap tabular-nums"
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
