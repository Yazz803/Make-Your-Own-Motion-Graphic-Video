'use client';

import { useState } from 'react';
import {
  LuChevronDown,
  LuChevronUp,
  LuSlidersHorizontal,
  LuTag,
} from 'react-icons/lu';
import {
  ELEVENLABS_V4_ALL_TAGS,
  ELEVENLABS_V4_STABILITY_PERCENT,
  ELEVENLABS_V4_TAG_GROUPS,
} from '@/lib/constants';

export default function ElevenLabsV4Guidance() {
  const [showTags, setShowTags] = useState<boolean>(false);

  return (
    <div className="rounded-md border border-zinc-800 bg-[#09090B] p-4 sm:col-span-3">
      {/* Stability 60% instruction */}
      <div className="flex items-start gap-2.5">
        <LuSlidersHorizontal
          className="mt-0.5 h-4 w-4 shrink-0 text-[#33E092]"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold text-zinc-100">
              Pengaturan ElevenLabs V4: Ubah Stability ke{' '}
              {ELEVENLABS_V4_STABILITY_PERCENT}%
            </p>
            <span className="shrink-0 rounded-sm border border-[#33E092]/40 bg-[#33E092]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#33E092] tabular-nums">
              Stability: {ELEVENLABS_V4_STABILITY_PERCENT}%
            </span>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400">
            Saat men-generate audio di web ElevenLabs V4, atur slider{' '}
            <strong className="font-medium text-zinc-200">Stability</strong>{' '}
            menjadi{' '}
            <strong className="font-medium text-[#33E092]">
              {ELEVENLABS_V4_STABILITY_PERCENT}%
            </strong>{' '}
            (geser sedikit ke kanan dari titik tengah pada rentang{' '}
            <span className="text-zinc-300">Creative → Robust</span>, di area{' '}
            <span className="text-zinc-300">Natural–Robust</span>) agar Audio
            Tags terbaca ekspresif namun pelafalan tetap stabil.
          </p>
        </div>
      </div>

      {/* Visual reference matching ElevenLabs Stability slider */}
      <div className="mt-3 rounded-sm border border-zinc-800/80 bg-[#111114] px-3 py-2.5">
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span>Creative</span>
          <span className="text-zinc-300">Natural</span>
          <span>Robust</span>
        </div>
        <div
          aria-hidden="true"
          className="relative mt-1.5 h-2 w-full rounded-sm border border-zinc-800 bg-[#18181B]"
        >
          <div className="h-full w-[60%] rounded-l-sm bg-[#33E092]" />
          <div className="absolute top-1/2 left-[60%] h-3.5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-xs bg-zinc-50" />
        </div>
      </div>

      {/* Mandatory Audio Tags summary & expandable reference */}
      <div className="mt-3.5 border-t border-zinc-800/80 pt-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-start gap-2">
            <LuTag
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#33E092]"
              aria-hidden="true"
            />
            <p className="text-[11px] leading-relaxed text-zinc-300">
              Naskah VO wajib menyertakan Audio Tags resmi ElevenLabs V4 (
              <span className="font-mono text-[#33E092] tabular-nums">
                {ELEVENLABS_V4_ALL_TAGS.length} tag
              </span>{' '}
              dari <code className="font-mono text-zinc-200">[pause]</code>,{' '}
              <code className="font-mono text-zinc-200">[excited]</code>,{' '}
              <code className="font-mono text-zinc-200">[softly]</code>, dll.).
            </p>
          </div>

          <button
            type="button"
            aria-expanded={showTags}
            onClick={() => setShowTags((prev) => !prev)}
            className="inline-flex min-h-[32px] shrink-0 items-center gap-1.5 rounded-md border border-zinc-800 bg-[#18181B] px-2.5 py-1 text-[11px] font-medium text-zinc-200 transition-colors hover:border-[#33E092]/60 hover:text-[#33E092] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <span>
              {showTags
                ? 'Tutup Daftar Tag'
                : `Lihat ${ELEVENLABS_V4_ALL_TAGS.length} Tag`}
            </span>
            {showTags ? (
              <LuChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <LuChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        </div>

        {showTags && (
          <div className="mt-3 space-y-2.5 border-t border-zinc-800/70 pt-3">
            {ELEVENLABS_V4_TAG_GROUPS.map((group) => (
              <div key={group.key}>
                <p className="text-[11px] font-semibold text-zinc-300">
                  {group.label}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {group.tags.map((tag) => (
                    <code
                      key={tag}
                      className="rounded-sm border border-zinc-800 bg-[#18181B] px-1.5 py-0.5 font-mono text-[11px] text-zinc-300"
                    >
                      {tag}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
