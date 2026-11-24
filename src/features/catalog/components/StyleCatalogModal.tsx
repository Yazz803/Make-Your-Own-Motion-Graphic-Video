'use client';

import { useState } from 'react';
import { LuArrowLeft, LuSearch, LuX } from 'react-icons/lu';
import { Modal } from '@/components/ui';
import {
  BANG_MOTION_COUNT,
  LEMO_OPUSCAR_COUNT,
  MOTION_STYLES,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { MotionStyle } from '@/types';
import {
  type CatalogRepoFilter,
  useStyleCatalogFilter,
} from '../hooks/useStyleCatalogFilter';
import StyleCard from './StyleCard';
import StyleDetailContent from './StyleDetailContent';

interface StyleCatalogModalProps {
  isOpen: boolean;
  selectedStyle: MotionStyle;
  onClose: () => void;
  onSelectStyle: (style: MotionStyle) => void;
}

const REPO_TABS: { id: CatalogRepoFilter; label: string }[] = [
  { id: 'all', label: `Semua (${MOTION_STYLES.length})` },
  { id: 'bang-motion', label: `bang-motion (${BANG_MOTION_COUNT})` },
  { id: 'lemo-opuscar', label: `lemo-opuscar (${LEMO_OPUSCAR_COUNT})` },
];

export default function StyleCatalogModal({
  isOpen,
  selectedStyle,
  onClose,
  onSelectStyle,
}: StyleCatalogModalProps) {
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
  } = useStyleCatalogFilter(12);

  const handleClose = () => {
    setInspectedStyle(null);
    onClose();
  };

  const handleUseStyle = (style: MotionStyle) => {
    onSelectStyle(style);
    setInspectedStyle(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      ariaLabelledBy="catalog-modal-title"
      maxWidthClassName="max-w-5xl"
      backdropClassName="p-0 sm:p-6 backdrop-blur-none sm:backdrop-blur-sm"
      panelClassName="flex h-[100dvh] sm:h-auto sm:max-h-[85vh] flex-col rounded-none sm:rounded-lg border-0 sm:border"
    >
      {/* Modal Header */}
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-zinc-800 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <h3
            id="catalog-modal-title"
            className="font-display text-lg font-bold tracking-tight text-zinc-50 sm:text-xl"
          >
            Katalog {MOTION_STYLES.length} Gaya Visual
          </h3>
          <p className="mt-1 text-xs text-zinc-400">
            Gaya aktif:{' '}
            <span className="font-medium text-zinc-200">
              {selectedStyle.name}
            </span>{' '}
            <code className="font-mono text-[#33E092]">
              ({selectedStyle.skillHandle})
            </code>
          </p>
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup katalog gaya visual"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
        >
          <LuX className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {inspectedStyle ? (
        <>
          {/* Inline Detail Sub-header */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 bg-[#09090B]/60 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => setInspectedStyle(null)}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-md border border-zinc-800 bg-[#18181B] px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-[#33E092]/60 hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <LuArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Kembali ke Katalog</span>
            </button>

            <div className="flex min-w-0 items-center gap-2 text-xs text-zinc-400">
              <span className="font-mono text-[#33E092]">
                {inspectedStyle.skillHandle}
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate font-medium text-zinc-200">
                {inspectedStyle.name}
              </span>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <StyleDetailContent
              style={inspectedStyle}
              onUseStyle={handleUseStyle}
              ctaLabel="Gunakan Gaya Ini"
              layout="split"
            />
          </div>
        </>
      ) : (
        <>
          {/* Filter Toolbar */}
          <div className="shrink-0 space-y-3 border-b border-zinc-800/80 bg-[#09090B]/50 px-4 py-3.5 sm:px-6">
            <div
              role="tablist"
              aria-label="Filter sumber repositori di modal katalog"
              className="flex flex-wrap gap-2"
            >
              {REPO_TABS.map((tab) => {
                const active = repoFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleRepoChange(tab.id)}
                    className={cn(
                      'min-h-[36px] rounded-md border px-3 py-1.5 font-mono text-xs font-medium transition-colors whitespace-nowrap tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                      active
                        ? 'border-[#33E092] bg-[#33E092] font-semibold text-[#09090B]'
                        : 'border-zinc-800 bg-[#18181B] text-zinc-300 hover:border-zinc-700 hover:text-zinc-50'
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-12">
              <div className="relative sm:col-span-7">
                <LuSearch
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  aria-label="Cari gaya visual di modal katalog"
                  placeholder="Cari gaya (Ukiyo-e, Teardown, Pixel)..."
                  className="h-10 w-full rounded-md border border-zinc-800 bg-[#09090B] pl-10 pr-3.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:border-[#33E092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                />
              </div>

              <div className="sm:col-span-5">
                <select
                  aria-label="Filter kategori stasiun di modal katalog"
                  value={stationFilter}
                  onChange={(e) => handleStationChange(e.target.value)}
                  className="h-10 w-full rounded-md border border-zinc-800 bg-[#09090B] px-3 text-sm text-zinc-100 focus:border-[#33E092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
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

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400 tabular-nums">
              <span>
                Menampilkan {displayedStyles.length} dari{' '}
                {filteredStyles.length} gaya visual
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
          </div>

          {/* Scrollable Catalog Grid */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
            {displayedStyles.length === 0 ? (
              <div className="rounded-lg border border-zinc-800 bg-[#09090B]/70 p-8 text-center">
                <p className="text-sm font-medium text-zinc-200">
                  Tidak ada gaya visual yang cocok dengan pencarianmu.
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Coba kata kunci lain atau reset filter kategori di atas.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 inline-flex min-h-[38px] items-center justify-center rounded-md border border-zinc-800 bg-[#18181B] px-4 py-1.5 text-xs font-medium text-[#33E092] transition-colors hover:border-[#33E092]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {displayedStyles.map((style, index) => (
                  <StyleCard
                    key={style.id}
                    style={style}
                    isSelected={style.id === selectedStyle.id}
                    priority={index < 3}
                    onUseStyle={handleUseStyle}
                    onInspectStyle={setInspectedStyle}
                  />
                ))}
              </div>
            )}

            {remainingCount > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={showMore}
                  className="inline-flex min-h-[42px] items-center justify-center rounded-md border border-zinc-800 bg-[#18181B] px-4 py-2 text-xs sm:text-sm font-medium text-zinc-100 transition-colors hover:border-[#33E092]/60 hover:text-[#33E092] whitespace-nowrap tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  Tampilkan {Math.min(pageIncrement, remainingCount)} Gaya Lagi
                </button>
                <button
                  type="button"
                  onClick={showAll}
                  className="inline-flex min-h-[42px] items-center justify-center rounded-md px-4 py-2 text-xs sm:text-sm font-medium text-zinc-400 transition-colors hover:text-[#33E092] whitespace-nowrap tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  Tampilkan Semua ({filteredStyles.length})
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
