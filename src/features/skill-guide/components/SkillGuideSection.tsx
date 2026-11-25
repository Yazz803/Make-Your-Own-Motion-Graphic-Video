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
      className="scroll-mt-16 border-t border-zinc-800/80 bg-[#09090B]/60 py-16 sm:py-20 lg:py-24"
    >
      <div
        data-tour-target="panduan"
        className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header + Path Switch */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl [text-wrap:balance]">
              Panduan Instalasi Skill Gemini Web
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
              Pasang skill{' '}
              <code className="font-mono text-zinc-200">@bang-motion</code> dan{' '}
              <code className="font-mono text-zinc-200">@lemo-opuscar</code>{' '}
              langsung di{' '}
              <strong className="font-medium text-zinc-200">Mode Tugas</strong>{' '}
              Gemini Web menggunakan prompt URL GitHub di bawah ini. Jika prompt
              pertama gagal karena akses internet komputer jarak jauh belum
              aktif, ikuti langkah aktivasi di bagian bawah.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Pilih jalur instalasi skill"
            className="grid w-full grid-cols-2 gap-1.5 rounded-md border border-zinc-800 bg-[#111114]/90 p-1 sm:inline-flex sm:w-auto md:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'gemini-web'}
              onClick={() => setActiveTab('gemini-web')}
              className={cn(
                'inline-flex min-h-[40px] items-center justify-center gap-1.5 sm:gap-2 rounded-md px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                activeTab === 'gemini-web'
                  ? 'bg-[#33E092] font-semibold text-[#09090B]'
                  : 'text-zinc-300 hover:text-[#33E092]'
              )}
            >
              <LuWandSparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="sm:hidden">Gemini Web</span>
              <span className="hidden sm:inline">Gemini Web (Mode Tugas)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'cli-local'}
              onClick={() => setActiveTab('cli-local')}
              className={cn(
                'inline-flex min-h-[40px] items-center justify-center gap-1.5 sm:gap-2 rounded-md px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                activeTab === 'cli-local'
                  ? 'bg-[#33E092] font-semibold text-[#09090B]'
                  : 'text-zinc-300 hover:text-[#33E092]'
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
