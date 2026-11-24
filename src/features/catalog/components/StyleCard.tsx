'use client';

import { LuCheck, LuEye } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import type { MotionStyle } from '@/types';
import StylePreviewThumb from './StylePreviewThumb';

interface StyleCardProps {
  style: MotionStyle;
  isSelected: boolean;
  priority?: boolean;
  onUseStyle: (style: MotionStyle) => void;
  onInspectStyle: (style: MotionStyle) => void;
}

export default function StyleCard({
  style,
  isSelected,
  priority = false,
  onUseStyle,
  onInspectStyle,
}: StyleCardProps) {
  const stationLabel = style.station
    .replace(/^\d+\s*·\s*/, '')
    .replace(/^Bang Motion\s*·\s*/, '');

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border bg-[#111114]/90 transition-colors duration-200',
        isSelected
          ? 'border-[#33E092]'
          : 'border-zinc-800/90 hover:border-zinc-700'
      )}
    >
      <button
        type="button"
        onClick={() => onInspectStyle(style)}
        className="relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#33E092]"
        aria-label={`Lihat detail gaya visual ${style.name}`}
      >
        <StylePreviewThumb style={style} priority={priority} />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate text-xs text-zinc-400">
            <span className="font-mono text-[#33E092]">
              {style.skillHandle}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{stationLabel}</span>
          </div>

          <div
            className="flex shrink-0 items-center gap-1"
            aria-label="Palet warna gaya"
          >
            {style.palette.slice(0, 4).map((hex) => (
              <span
                key={hex}
                style={{ backgroundColor: hex }}
                className="h-2.5 w-2.5 rounded-[2px] border border-white/15"
              />
            ))}
          </div>
        </div>

        <h3 className="mt-2.5 font-display text-lg font-bold tracking-tight text-zinc-50">
          {style.name}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {style.shortDesc}
        </p>

        <div className="mt-5 flex items-center gap-2.5 border-t border-zinc-800/80 pt-4">
          <button
            type="button"
            onClick={() => onUseStyle(style)}
            className={cn(
              'inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
              isSelected
                ? 'bg-[#33E092] text-[#09090B]'
                : 'bg-[#18181B] text-zinc-100 border border-zinc-800 hover:border-[#33E092]/60 hover:text-[#33E092]'
            )}
          >
            {isSelected ? (
              <>
                <LuCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Gaya Dipilih</span>
              </>
            ) : (
              <span>Pakai Gaya Ini</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onInspectStyle(style)}
            aria-label={`Detail aturan ${style.name}`}
            className="inline-flex min-h-[40px] shrink-0 items-center justify-center gap-1.5 rounded-md border border-zinc-800 bg-[#18181B]/60 px-3.5 py-2 text-xs sm:text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <LuEye className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Detail</span>
          </button>
        </div>
      </div>
    </article>
  );
}
