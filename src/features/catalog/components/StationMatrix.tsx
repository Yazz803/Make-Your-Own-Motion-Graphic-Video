'use client';

import {
  ALL_STATIONS,
  BANG_MOTION_COUNT,
  LEMO_OPUSCAR_COUNT,
  MOTION_STYLES,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { CatalogRepoFilter } from '../hooks/useStyleCatalogFilter';

interface StationMatrixProps {
  repoFilter: CatalogRepoFilter;
  stationFilter: string;
  onSelectRepo: (repo: CatalogRepoFilter) => void;
  onSelectStation: (station: string) => void;
}

const STATION_COUNTS = ALL_STATIONS.map((station) => {
  const items = MOTION_STYLES.filter((s) => s.station === station);
  return {
    station,
    shortLabel: station.replace(/^\d+\s*·\s*/, '').replace(/^Bang Motion\s*·\s*/, 'BM · '),
    count: items.length,
    repo: items[0]?.repo ?? 'lemo-opuscar',
  };
});

const HEATMAP_SCALE = [
  '#1F1F23',
  '#0E4429',
  '#006D32',
  '#26A641',
  '#33E092',
] as const;

function getIntensityColor(count: number, isActive: boolean): string {
  if (isActive) return '#33E092';
  if (count >= 8) return '#26A641';
  if (count >= 6) return '#006D32';
  if (count >= 5) return '#0E4429';
  return '#1F1F23';
}

export default function StationMatrix({
  repoFilter,
  stationFilter,
  onSelectRepo,
  onSelectStation,
}: StationMatrixProps) {
  const repoTabs: { id: CatalogRepoFilter; label: string }[] = [
    { id: 'all', label: `Semua (${MOTION_STYLES.length})` },
    { id: 'bang-motion', label: `bang-motion (${BANG_MOTION_COUNT})` },
    { id: 'lemo-opuscar', label: `lemo-opuscar (${LEMO_OPUSCAR_COUNT})` },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
      {/* Left: Contribution-Graph-inspired 17-station activity matrix */}
      <div className="rounded-lg border border-zinc-800 bg-[#111114]/90 p-4 sm:p-5 lg:col-span-9">
        <div className="flex flex-wrap gap-2">
          {STATION_COUNTS.map((item) => {
            const isSelected = stationFilter === item.station;
            const isDimmed =
              repoFilter !== 'all' && item.repo !== repoFilter;
            const swatchColor = getIntensityColor(item.count, isSelected);

            return (
              <button
                key={item.station}
                type="button"
                onClick={() =>
                  onSelectStation(isSelected ? 'all' : item.station)
                }
                aria-pressed={isSelected}
                className={cn(
                  'group inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                  isSelected
                    ? 'border-[#33E092] bg-[#33E092]/10 text-zinc-50'
                    : isDimmed
                      ? 'border-zinc-800/60 bg-[#111114]/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      : 'border-zinc-800/90 bg-[#18181B]/70 text-zinc-300 hover:border-zinc-700 hover:text-zinc-50'
                )}
              >
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: swatchColor }}
                  className="h-2.5 w-2.5 shrink-0 rounded-[2px] border border-white/10"
                />
                <span className="text-xs font-medium whitespace-nowrap">
                  {item.shortLabel}
                </span>
                <span className="font-mono text-xs text-zinc-400 tabular-nums shrink-0">
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Matrix footer matching reference Contribution Graph legend */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-3 text-xs text-zinc-400">
          <span className="tabular-nums">
            {MOTION_STYLES.length} gaya visual dalam {ALL_STATIONS.length}{' '}
            kategori stasiun
          </span>

          <div className="flex items-center gap-1.5">
            <span>Sedikit</span>
            {HEATMAP_SCALE.map((hex) => (
              <span
                key={hex}
                aria-hidden="true"
                style={{ backgroundColor: hex }}
                className="h-2.5 w-2.5 rounded-[2px] border border-white/10"
              />
            ))}
            <span>Banyak</span>
          </div>
        </div>
      </div>

      {/* Right: Vertical selector stack matching reference year buttons */}
      <div
        role="tablist"
        aria-label="Filter sumber repositori"
        className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1"
      >
        {repoTabs.map((tab) => {
          const active = repoFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectRepo(tab.id)}
              className={cn(
                'min-h-[40px] rounded-md border px-3.5 py-2 text-left font-mono text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
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
    </div>
  );
}
