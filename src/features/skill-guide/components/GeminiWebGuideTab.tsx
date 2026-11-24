'use client';

import Image from 'next/image';
import {
  LuArrowUpRight,
  LuCheck,
  LuCopy,
  LuDownload,
  LuExternalLink,
} from 'react-icons/lu';
import {
  GEMINI_SCREENSHOT_REFS,
  GEMINI_WEB_INSTALL_STEPS,
  INSTALL_SKILL_PROMPT,
  REPO_LINKS,
} from '@/lib/constants';
import type { GeminiScreenshotRef } from '@/types';

interface GeminiWebGuideTabProps {
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
  onZoomScreenshot: (shot: GeminiScreenshotRef) => void;
}

export default function GeminiWebGuideTab({
  copiedId,
  onCopy,
  onZoomScreenshot,
}: GeminiWebGuideTabProps) {
  return (
    <div className="mt-10 space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Steps list */}
        <div className="divide-y divide-zinc-800/80 rounded-xl border border-zinc-800 bg-[#121215] px-5 sm:px-7 lg:col-span-7">
          {GEMINI_WEB_INSTALL_STEPS.map((step) => (
            <div key={step.number} className="py-6">
              <div className="flex items-start gap-4">
                <span className="font-mono text-sm font-semibold text-[#F2B705] tabular-nums">
                  {step.number}.
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base sm:text-lg font-semibold text-zinc-50">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                  {step.tip && (
                    <p className="mt-2.5 text-xs leading-relaxed text-zinc-300">
                      Catatan: {step.tip}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Card: Download ZIPs + Copy Install Prompt */}
        <div className="flex flex-col justify-between gap-6 rounded-xl border border-zinc-800 bg-[#121215] p-5 sm:p-6 lg:col-span-5">
          <div className="space-y-6">
            {/* Step A: Download both ZIPs */}
            <div>
              <h3 className="font-display text-base font-semibold text-zinc-50">
                1. Unduh File ZIP Kedua Repositori
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                Simpan kedua berkas ZIP di bawah ini ke perangkatmu tanpa perlu
                diekstrak terlebih dahulu.
              </p>

              <div className="mt-3.5 space-y-2.5">
                <a
                  href={REPO_LINKS.bangMotionZip}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] items-center justify-between gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-[#F2B705] hover:text-[#F2B705]"
                >
                  <span className="min-w-0 truncate">
                    <span className="block font-mono text-xs text-zinc-400">
                      bangtutorial/bang-motion
                    </span>
                    <span>Download bang-motion.zip</span>
                  </span>
                  <LuDownload className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <a
                  href={REPO_LINKS.lemoOpuscarZip}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] items-center justify-between gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-[#F2B705] hover:text-[#F2B705]"
                >
                  <span className="min-w-0 truncate">
                    <span className="block font-mono text-xs text-zinc-400">
                      lemomo-ai/lemo-opuscar
                    </span>
                    <span>Download lemo-opuscar.zip</span>
                  </span>
                  <LuDownload className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Step B: Copy exact installation prompt */}
            <div className="border-t border-zinc-800/80 pt-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-base font-semibold text-zinc-50">
                  2. Prompt Instalasi di Mode Tugas
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    onCopy('install-skill-prompt', INSTALL_SKILL_PROMPT)
                  }
                  className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-lg bg-[#F2B705] px-3 py-1.5 text-xs font-semibold text-[#09090B] transition-colors hover:bg-[#FFD038] whitespace-nowrap"
                >
                  {copiedId === 'install-skill-prompt' ? (
                    <>
                      <LuCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <LuCopy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Salin Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                Upload kedua file ZIP ke kolom input{' '}
                <strong className="font-medium text-zinc-200">
                  Mode Tugas
                </strong>{' '}
                Gemini Web, lalu kirim teks berikut:
              </p>

              <div className="mt-3 rounded-lg border border-zinc-800 bg-[#09090B] px-4 py-3.5 font-mono text-sm font-medium text-[#F2B705]">
                {INSTALL_SKILL_PROMPT}
              </div>
            </div>
          </div>

          {/* Launch Gemini Web */}
          <div className="space-y-3 border-t border-zinc-800/80 pt-5">
            <a
              href={REPO_LINKS.geminiWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#F2B705] px-4 py-2.5 text-sm font-semibold text-[#09090B] transition-colors hover:bg-[#FFD038]"
            >
              <span>Buka Gemini Web (Pilih Mode Tugas)</span>
              <LuExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
              <a
                href={REPO_LINKS.bangMotion}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-zinc-100"
              >
                <span>Repo bang-motion</span>
                <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={REPO_LINKS.lemoOpuscar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-zinc-100"
              >
                <span>Repo lemo-opuscar</span>
                <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Visual UI Reference Screenshots from Gemini Web */}
      <div className="rounded-xl border border-zinc-800 bg-[#121215] p-5 sm:p-6">
        <div className="max-w-2xl">
          <h3 className="font-display text-base sm:text-lg font-semibold text-zinc-50">
            Panduan Visual Antarmuka Gemini Web Terbaru
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Klik gambar mana pun untuk memperbesar letak Mode Tugas dan menu
            Keahlian (Keterampilan).
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GEMINI_SCREENSHOT_REFS.map((shot) => (
            <figure key={shot.src} className="flex flex-col">
              <button
                type="button"
                onClick={() => onZoomScreenshot(shot)}
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-800 bg-[#09090B] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
                aria-label={`Perbesar gambar ${shot.title}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                />
              </button>
              <figcaption className="mt-2.5">
                <p className="text-xs font-semibold text-zinc-100">
                  {shot.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  {shot.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
