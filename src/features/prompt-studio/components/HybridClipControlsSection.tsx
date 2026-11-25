'use client';

import {
  LuCaptions,
  LuFilm,
  LuScissors,
  LuVolume2,
} from 'react-icons/lu';
import { HYBRID_CLIP_BALANCES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { HybridClipBalance, HybridClipConfig } from '@/types';

interface HybridClipControlsSectionProps {
  hybridClip: HybridClipConfig;
  onChangeBalance: (balance: HybridClipBalance) => void;
  onToggleReviewBeforeRender: () => void;
  onChangeAutoCutSilence: (checked: boolean) => void;
  onChangeClipFocusNote: (note: string) => void;
  onChangeIncludeSfx: (checked: boolean) => void;
  onChangeIncludeRunningText: (checked: boolean) => void;
}

export default function HybridClipControlsSection({
  hybridClip,
  onChangeBalance,
  onToggleReviewBeforeRender,
  onChangeAutoCutSilence,
  onChangeClipFocusNote,
  onChangeIncludeSfx,
  onChangeIncludeRunningText,
}: HybridClipControlsSectionProps) {
  return (
    <div className="space-y-5 border-t border-zinc-800/80 pt-6">
      {/* Original Clip Audio Notice + Review Before Render Switch */}
      <div className="rounded-md border border-[#33E092]/35 bg-[#09090B] p-3.5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <LuFilm
              className="mt-0.5 h-4 w-4 shrink-0 text-[#33E092]"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <span className="block text-sm font-semibold text-zinc-100">
                Audio Asli Video Clip · Review Transkrip Dulu
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
                Tidak perlu upload audio VO terpisah — suara memakai audio asli
                video clip dan durasi akhir fleksibel (boleh lebih pendek atau
                lebih panjang dari clip asli demi hasil semulus mungkin).
                Aktifkan switch ini agar Gemini menampilkan transkrip &amp;
                tabel segmen dulu sebelum render MP4.
              </span>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={hybridClip.reviewBeforeRender}
            aria-label="Review transkrip dan storyboard sebelum render MP4"
            onClick={onToggleReviewBeforeRender}
            className={cn(
              'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
              hybridClip.reviewBeforeRender
                ? 'border-[#33E092] bg-[#33E092]'
                : 'border-zinc-700 bg-[#18181B]'
            )}
          >
            <span
              className={cn(
                'inline-block h-5 w-5 rounded-full bg-[#09090B] transition-transform',
                hybridClip.reviewBeforeRender
                  ? 'translate-x-6'
                  : 'translate-x-1 bg-zinc-400'
              )}
            />
          </button>
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

      {/* Auto-Cut Silence, SFX & Word-by-Word Running Text */}
      <div className="grid grid-cols-1 gap-3 border-t border-zinc-800/70 pt-5 sm:grid-cols-2">
        <label className="flex min-h-[54px] cursor-pointer items-start gap-3 rounded-md border border-zinc-800 bg-[#09090B] p-3 sm:col-span-2">
          <input
            type="checkbox"
            checked={hybridClip.autoCutSilence}
            onChange={(e) => onChangeAutoCutSilence(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-700 bg-[#18181B] accent-[#33E092]"
          />
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
              <LuScissors
                className="h-3.5 w-3.5 shrink-0 text-[#33E092]"
                aria-hidden="true"
              />
              <span>Auto-Cut Jeda Hening (Dead Air)</span>
            </span>
            <span className="mt-0.5 block text-[11px] leading-snug text-zinc-400">
              Pangkas otomatis jeda hening atau bagian kosong di video clip
              dengan audio crossfade halus &amp; jembatan visual agar ritme
              semulus mungkin.
            </span>
          </span>
        </label>

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
