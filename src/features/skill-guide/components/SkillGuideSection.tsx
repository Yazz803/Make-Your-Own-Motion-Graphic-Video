'use client';

import { useState } from 'react';
import { LuTerminal, LuWandSparkles } from 'react-icons/lu';
import { useCopyFeedback } from '@/hooks';
import { cn } from '@/lib/utils';
import type { GeminiScreenshotRef, GuideTab } from '@/types';
import CliLocalGuideTab from './CliLocalGuideTab';
import GeminiWebGuideTab from './GeminiWebGuideTab';
import ScreenshotLightboxModal from './ScreenshotLightboxModal';

export default function SkillGuideSection() {
  const [activeTab, setActiveTab] = useState<GuideTab>('gemini-web');
  const [zoomedShot, setZoomedShot] = useState<GeminiScreenshotRef | null>(
    null
  );
  const { copiedKey, copy } = useCopyFeedback(2200);

  return (
    <section
      id="panduan"
      className="border-t border-zinc-800/80 bg-[#0C0C0F] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header + Path Switch */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#F2B705]">
              04. Panduan Instalasi Skill
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl [text-wrap:balance]">
              Cara memasang skill bang-motion &amp; lemo-opuscar di Gemini Web
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
              Pada tampilan Gemini Web terbaru, Gem telah dialihkan ke menu{' '}
              <strong className="font-medium text-zinc-200">Keahlian</strong>{' '}
              dan tidak lagi memakai mode Canvas. Cukup unduh ZIP kedua
              repositori lalu unggah di{' '}
              <strong className="font-medium text-zinc-200">Mode Tugas</strong>.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Pilih jalur instalasi skill"
            className="inline-flex items-center gap-1 self-start rounded-lg border border-zinc-800 bg-zinc-950 p-1 md:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'gemini-web'}
              onClick={() => setActiveTab('gemini-web')}
              className={cn(
                'inline-flex min-h-[40px] items-center gap-2 rounded-md px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0',
                activeTab === 'gemini-web'
                  ? 'bg-zinc-800 text-zinc-50'
                  : 'text-zinc-400 hover:text-zinc-100'
              )}
            >
              <LuWandSparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Gemini Web (Mode Tugas)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'cli-local'}
              onClick={() => setActiveTab('cli-local')}
              className={cn(
                'inline-flex min-h-[40px] items-center gap-2 rounded-md px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0',
                activeTab === 'cli-local'
                  ? 'bg-zinc-800 text-zinc-50'
                  : 'text-zinc-400 hover:text-zinc-100'
              )}
            >
              <LuTerminal className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Gemini CLI / Lokal</span>
            </button>
          </div>
        </div>

        {activeTab === 'gemini-web' ? (
          <GeminiWebGuideTab
            copiedId={copiedKey}
            onCopy={copy}
            onZoomScreenshot={setZoomedShot}
          />
        ) : (
          <CliLocalGuideTab copiedId={copiedKey} onCopy={copy} />
        )}
      </div>

      <ScreenshotLightboxModal
        screenshot={zoomedShot}
        onClose={() => setZoomedShot(null)}
      />
    </section>
  );
}
