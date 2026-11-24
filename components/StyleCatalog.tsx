'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, Eye, Search, X } from 'lucide-react';
import {
  ALL_STATIONS,
  BANG_MOTION_COUNT,
  LEMO_OPUSCAR_COUNT,
  MOTION_STYLES,
  type MotionStyle,
  type RepoSource,
} from '@/lib/motion-styles';
import StylePreviewThumb from './StylePreviewThumb';

interface StyleCatalogProps {
  selectedStyleId: string;
  onSelectStyle: (style: MotionStyle) => void;
}

type FilterOption = 'all' | RepoSource;

const INITIAL_PAGE_SIZE = 9;
const PAGE_INCREMENT = 12;

export default function StyleCatalog({
  selectedStyleId,
  onSelectStyle,
}: StyleCatalogProps) {
  const [repoFilter, setRepoFilter] = useState<FilterOption>('all');
  const [stationFilter, setStationFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE);
  const [inspectedStyle, setInspectedStyle] = useState<MotionStyle | null>(null);

  const availableStations = useMemo(() => {
    if (repoFilter === 'all') return ALL_STATIONS;
    return Array.from(
      new Set(
        MOTION_STYLES.filter((s) => s.repo === repoFilter).map((s) => s.station)
      )
    );
  }, [repoFilter]);

  const filteredStyles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOTION_STYLES.filter((s) => {
      if (repoFilter !== 'all' && s.repo !== repoFilter) return false;
      if (stationFilter !== 'all' && s.station !== stationFilter) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.station.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.skillHandle.toLowerCase().includes(q)
      );
    });
  }, [repoFilter, stationFilter, query]);

  const displayedStyles = filteredStyles.slice(0, visibleCount);
  const remainingCount = Math.max(0, filteredStyles.length - visibleCount);

  const handleRepoChange = (next: FilterOption) => {
    setRepoFilter(next);
    setStationFilter('all');
    setVisibleCount(INITIAL_PAGE_SIZE);
  };

  const handleUseStyle = (style: MotionStyle) => {
    onSelectStyle(style);
    setInspectedStyle(null);
    const el = document.getElementById('studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
            {(
              [
                { id: 'all', label: `Semua (${MOTION_STYLES.length})` },
                { id: 'bang-motion', label: `bang-motion (${BANG_MOTION_COUNT})` },
                {
                  id: 'lemo-opuscar',
                  label: `lemo-opuscar (${LEMO_OPUSCAR_COUNT})`,
                },
              ] as const
            ).map((tab) => {
              const active = repoFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleRepoChange(tab.id)}
                  className={`min-h-[38px] rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] ${
                    active
                      ? 'bg-zinc-800 text-zinc-50'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
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
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(INITIAL_PAGE_SIZE);
              }}
              aria-label="Cari gaya visual"
              placeholder="Cari gaya visual (mis. Ukiyo-e, Teardown, Risograph, Blueprint, Cartoon, Pixel)..."
              className="h-11 w-full rounded-lg border border-zinc-800 bg-[#121215] pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#F2B705] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-5">
            <select
              aria-label="Filter kategori stasiun gaya"
              value={stationFilter}
              onChange={(e) => {
                setStationFilter(e.target.value);
                setVisibleCount(INITIAL_PAGE_SIZE);
              }}
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
          {(query || stationFilter !== 'all' || repoFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setStationFilter('all');
                setRepoFilter('all');
                setVisibleCount(INITIAL_PAGE_SIZE);
              }}
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
            {displayedStyles.map((style, index) => {
              const isSelected = style.id === selectedStyleId;
              return (
                <article
                  key={style.id}
                  className={`group flex flex-col overflow-hidden rounded-xl border bg-[#121215] transition-colors duration-200 ${
                    isSelected
                      ? 'border-[#F2B705]'
                      : 'border-zinc-800/90 hover:border-zinc-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setInspectedStyle(style)}
                    className="relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F2B705]"
                    aria-label={`Lihat detail gaya visual ${style.name}`}
                  >
                    <StylePreviewThumb style={style} priority={index < 3} />
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-zinc-400 truncate">
                        <span className="font-mono text-[#F2B705]">
                          {style.skillHandle}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{style.station}</span>
                      </div>

                      <div
                        className="flex items-center gap-1 shrink-0"
                        aria-label="Palet warna gaya"
                      >
                        {style.palette.slice(0, 4).map((hex) => (
                          <span
                            key={hex}
                            style={{ backgroundColor: hex }}
                            className="h-2.5 w-2.5 rounded-full border border-white/15"
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="mt-2.5 font-display text-lg font-semibold tracking-tight text-zinc-50">
                      {style.name}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                      {style.shortDesc}
                    </p>

                    <div className="mt-5 flex items-center gap-2.5 border-t border-zinc-800/80 pt-4">
                      <button
                        type="button"
                        onClick={() => handleUseStyle(style)}
                        className={`inline-flex min-h-[42px] flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] ${
                          isSelected
                            ? 'bg-[#F2B705] text-[#09090B]'
                            : 'bg-zinc-800/90 text-zinc-100 hover:bg-zinc-700'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check
                              className="h-4 w-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span>Gaya Dipilih</span>
                          </>
                        ) : (
                          <span>Pakai Gaya Ini</span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setInspectedStyle(style)}
                        aria-label={`Detail aturan ${style.name}`}
                        className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-zinc-800 px-3.5 py-2 text-xs sm:text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
                      >
                        <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Detail</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Progressive pagination controls */}
        {remainingCount > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_INCREMENT)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-zinc-700 bg-[#121215] px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900 whitespace-nowrap tabular-nums"
            >
              Tampilkan {Math.min(PAGE_INCREMENT, remainingCount)} Gaya Lagi
            </button>
            <button
              type="button"
              onClick={() => setVisibleCount(filteredStyles.length)}
              className="inline-flex min-h-[44px] items-center justify-center px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100 whitespace-nowrap tabular-nums"
            >
              Tampilkan Semua ({filteredStyles.length})
            </button>
          </div>
        )}
      </div>

      {/* Style Inspection Modal */}
      {inspectedStyle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="style-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setInspectedStyle(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#121215]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 sm:px-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="font-mono text-[#F2B705]">
                    {inspectedStyle.skillHandle}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{inspectedStyle.station}</span>
                </div>
                <h3
                  id="style-modal-title"
                  className="mt-0.5 font-display text-xl font-bold text-zinc-50"
                >
                  {inspectedStyle.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedStyle(null)}
                aria-label="Tutup jendela detail"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-50"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="overflow-hidden rounded-xl border border-zinc-800">
                <StylePreviewThumb style={inspectedStyle} />
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-300">
                    Bahasa Visual &amp; Tekstur
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {inspectedStyle.visualLanguage}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-300">
                    Pola Gerak Kamera &amp; Transisi
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {inspectedStyle.cameraGrammar}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-zinc-800/80 pt-5 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-300">
                      Cocok Digunakan Untuk
                    </h4>
                    <p className="mt-1.5 text-sm text-zinc-400">
                      {inspectedStyle.bestFor.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-300">
                      Palet Referensi
                    </h4>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {inspectedStyle.palette.map((hex) => (
                        <div
                          key={hex}
                          className="flex items-center gap-1.5 font-mono text-xs text-zinc-400"
                        >
                          <span
                            style={{ backgroundColor: hex }}
                            className="h-3.5 w-3.5 rounded-sm border border-white/15"
                          />
                          <span>{hex}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={inspectedStyle.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  <span>
                    Lihat sumber di GitHub ({inspectedStyle.stylePath})
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => handleUseStyle(inspectedStyle)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#F2B705] px-5 py-2.5 text-sm font-semibold text-[#09090B] transition-colors hover:bg-[#FFD038] whitespace-nowrap"
                >
                  Gunakan di Studio Prompt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
