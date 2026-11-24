'use client';

import { LuArrowUpRight } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import type { MotionStyle } from '@/types';
import StylePreviewThumb from './StylePreviewThumb';

interface StyleDetailContentProps {
  style: MotionStyle;
  onUseStyle: (style: MotionStyle) => void;
  ctaLabel?: string;
  layout?: 'stacked' | 'split';
}

export default function StyleDetailContent({
  style,
  onUseStyle,
  ctaLabel = 'Gunakan di Studio Prompt',
  layout = 'stacked',
}: StyleDetailContentProps) {
  const isSplit = layout === 'split';

  return (
    <div className="p-5 sm:p-6">
      <div
        className={cn(
          isSplit ? 'grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start' : ''
        )}
      >
        <div
          className={cn(
            'overflow-hidden rounded-lg border border-zinc-800',
            isSplit ? 'lg:col-span-5' : ''
          )}
        >
          <StylePreviewThumb style={style} />
        </div>

        <div
          className={cn(
            'space-y-5',
            isSplit ? 'lg:col-span-7' : 'mt-6'
          )}
        >
          <div>
            <h4 className="text-xs font-semibold text-zinc-300">
              Bahasa Visual &amp; Tekstur
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
              {style.visualLanguage}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-300">
              Pola Gerak Kamera &amp; Transisi
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
              {style.cameraGrammar}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-zinc-800/80 pt-5 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold text-zinc-300">
                Cocok Digunakan Untuk
              </h4>
              <p className="mt-1.5 text-sm text-zinc-400">
                {style.bestFor.join(' · ')}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-300">
                Palet Referensi
              </h4>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                {style.palette.map((hex) => (
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
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={style.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-sm text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
        >
          <span>Lihat sumber di GitHub ({style.stylePath})</span>
          <LuArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={() => onUseStyle(style)}
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#33E092] px-5 py-2.5 text-sm font-semibold text-[#09090B] transition-colors hover:bg-[#0CCE6B] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
