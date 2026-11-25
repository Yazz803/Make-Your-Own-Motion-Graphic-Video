'use client';

import type { IconType } from 'react-icons';
import {
  LuBrain,
  LuCaptions,
  LuFilm,
  LuFlame,
  LuHeart,
  LuLaugh,
  LuLightbulb,
  LuMessageSquareWarning,
  LuVolume2,
} from 'react-icons/lu';
import {
  HYBRID_CLIP_BALANCES,
  VIDEO_CLIP_CATEGORIES,
  VIDEO_CLIP_CATEGORY_MAP,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import type {
  HybridClipBalance,
  HybridClipConfig,
  VideoClipCategory,
} from '@/types';

interface HybridClipControlsSectionProps {
  hybridClip: HybridClipConfig;
  onChangeCategory: (category: VideoClipCategory) => void;
  onChangeBalance: (balance: HybridClipBalance) => void;
  onChangeClipFocusNote: (note: string) => void;
  onChangeIncludeSfx: (checked: boolean) => void;
  onChangeIncludeRunningText: (checked: boolean) => void;
}

const CATEGORY_ICONS: Record<VideoClipCategory, IconType> = {
  'viral-hook': LuFlame,
  'meme-comedy': LuLaugh,
  'education-insight': LuLightbulb,
  'debate-controversy': LuMessageSquareWarning,
  'story-emotional': LuHeart,
  'deep-talk-philosophy': LuBrain,
};

export default function HybridClipControlsSection({
  hybridClip,
  onChangeCategory,
  onChangeBalance,
  onChangeClipFocusNote,
  onChangeIncludeSfx,
  onChangeIncludeRunningText,
}: HybridClipControlsSectionProps) {
  const activeCategory =
    VIDEO_CLIP_CATEGORY_MAP[hybridClip.category] ?? VIDEO_CLIP_CATEGORIES[0];

  return (
    <div className="space-y-5 border-t border-zinc-800/80 pt-6">
      {/* Original Clip Audio Notice (No separate VO upload needed) */}
      <div className="flex items-start gap-2.5 rounded-md border border-[#33E092]/35 bg-[#09090B] p-3.5">
        <LuFilm
          className="mt-0.5 h-4 w-4 shrink-0 text-[#33E092]"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold text-zinc-100">
              Audio &amp; Cuplikan Video Clip Asli (Tanpa Upload Audio VO)
            </span>
            <span className="shrink-0 rounded-sm border border-[#33E092]/40 bg-[#33E092]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#33E092]">
              1-Tahap · Upload Clip
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">
            Suara narasi/dialog langsung memakai audio asli dari video clip yang
            kamu upload ke Gemini Web. Hasil video memadukan beberapa cuplikan
            video clip asli dengan adegan motion graphic (bukan full motion
            graphic).
          </p>
        </div>
      </div>

      {/* 6 Video Clip Categories */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            id="hybrid-category-label"
            className="text-xs font-semibold text-zinc-200"
          >
            Kategori Video Clip
          </span>
          <span className="text-[11px] text-zinc-400">
            {activeCategory.shortDesc}
          </span>
        </div>

        <div
          role="radiogroup"
          aria-labelledby="hybrid-category-label"
          className="mt-2.5 grid auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {VIDEO_CLIP_CATEGORIES.map((item) => {
            const active = hybridClip.category === item.id;
            const Icon = CATEGORY_ICONS[item.id];
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChangeCategory(item.id)}
                className={cn(
                  'flex min-h-[52px] items-center gap-2 rounded-md border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                  active
                    ? 'border-[#33E092] bg-[#33E092] text-[#09090B]'
                    : 'border-zinc-800 bg-[#18181B] text-zinc-200 hover:border-zinc-700 hover:text-zinc-50'
                )}
              >
                <Icon
                  className={cn(
                    'h-4 w-4 shrink-0',
                    active ? 'text-[#09090B]' : 'text-[#33E092]'
                  )}
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold leading-snug">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hybrid Clip vs Motion Graphic Balance */}
      <div>
        <span
          id="hybrid-balance-label"
          className="block text-xs font-semibold text-zinc-200"
        >
          Porsi Cuplikan Video Clip vs Motion Graphic
        </span>
        <div
          role="radiogroup"
          aria-labelledby="hybrid-balance-label"
          className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3"
        >
          {HYBRID_CLIP_BALANCES.map((option) => {
            const active = hybridClip.balance === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChangeBalance(option.id)}
                className={cn(
                  'flex min-h-[60px] flex-col justify-center rounded-md border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                  active
                    ? 'border-[#33E092] bg-[#33E092] text-[#09090B]'
                    : 'border-zinc-800 bg-[#18181B] text-zinc-200 hover:border-zinc-700 hover:text-zinc-50'
                )}
              >
                <span className="text-xs font-semibold leading-snug">
                  {option.label}
                </span>
                <span
                  className={cn(
                    'mt-0.5 font-mono text-[11px] tabular-nums',
                    active ? 'text-[#09090B]/80 font-medium' : 'text-zinc-400'
                  )}
                >
                  {option.ratioLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Clip Moment / Timestamp Note */}
      <div>
        <label
          htmlFor="hybrid-focus-note"
          className="block text-xs font-semibold text-zinc-200"
        >
          Catatan Momen / Timestamp Clip (Opsional)
        </label>
        <input
          id="hybrid-focus-note"
          type="text"
          value={hybridClip.clipFocusNote}
          onChange={(e) => onChangeClipFocusNote(e.target.value)}
          placeholder="Contoh: Pakai detik 00:04–00:12 untuk hook, lalu sisipkan motion graphic saat penjelasan angka"
          className="mt-1.5 h-10 w-full rounded-md border border-zinc-800 bg-[#09090B] px-3.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-400 focus:border-[#33E092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
        />
      </div>

      {/* SFX & Word-by-Word Running Text synced to Video Clip Audio */}
      <div className="grid grid-cols-1 gap-3 border-t border-zinc-800/70 pt-5 sm:grid-cols-2">
        <label className="flex min-h-[54px] cursor-pointer items-start gap-3 rounded-md border border-zinc-800 bg-[#09090B] p-3">
          <input
            type="checkbox"
            checked={hybridClip.includeSfx}
            onChange={(e) => onChangeIncludeSfx(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-700 bg-[#18181B] accent-[#33E092]"
          />
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
              <LuVolume2
                className="h-3.5 w-3.5 shrink-0 text-[#33E092]"
                aria-hidden="true"
              />
              <span>Sound Effect (SFX)</span>
            </span>
            <span className="mt-0.5 block text-[11px] leading-snug text-zinc-400">
              Tambahkan whoosh, pop &amp; riser saat transisi antara clip dan
              motion graphic.
            </span>
          </span>
        </label>

        <label className="flex min-h-[54px] cursor-pointer items-start gap-3 rounded-md border border-zinc-800 bg-[#09090B] p-3">
          <input
            type="checkbox"
            checked={hybridClip.includeRunningText}
            onChange={(e) => onChangeIncludeRunningText(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-700 bg-[#18181B] accent-[#33E092]"
          />
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
              <LuCaptions
                className="h-3.5 w-3.5 shrink-0 text-[#33E092]"
                aria-hidden="true"
              />
              <span>Running Text Per Kata</span>
            </span>
            <span className="mt-0.5 block text-[11px] leading-snug text-zinc-400">
              Subtitle kinetik sinkron untuk setiap kata yang diucapkan di audio
              video clip.
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
