'use client';

import Image from 'next/image';
import {
  LuCheck,
  LuCopy,
  LuSettings,
  LuShieldCheck,
  LuSlidersHorizontal,
  LuWifi,
  LuZoomIn,
} from 'react-icons/lu';
import { GEMINI_RECOVERY_STEPS } from '@/lib/constants';
import type { GeminiScreenshotRef } from '@/types';

interface GeminiRecoveryTimelineProps {
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
  onZoomScreenshot: (shot: GeminiScreenshotRef) => void;
}

const RECOVERY_STEP_ICONS = [
  LuSettings,
  LuShieldCheck,
  LuSlidersHorizontal,
  LuWifi,
  LuCheck,
] as const;

export default function GeminiRecoveryTimeline({
  copiedId,
  onCopy,
  onZoomScreenshot,
}: GeminiRecoveryTimelineProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-[#111114]/90 p-5 sm:p-7">
      <div className="max-w-2xl border-b border-zinc-800/80 pb-5">
        <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-50">
          Langkah Lanjutan: Aktifkan Izin Browser &amp; Akses Jaringan
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-400">
          Ikuti 5 langkah berurutan di bawah ini pada pengaturan Gemini Web,
          lalu kirim prompt konfirmasi di chat awal. Klik gambar pada setiap
          langkah untuk memperbesar.
        </p>
      </div>

      <div className="mt-6 space-y-0">
        {GEMINI_RECOVERY_STEPS.map((step, index) => {
          const StepIcon = RECOVERY_STEP_ICONS[index] ?? LuSettings;
          const isLast = index === GEMINI_RECOVERY_STEPS.length - 1;
          const promptToCopy = step.promptToCopy;

          return (
            <div
              key={step.number}
              className="relative flex gap-4 sm:gap-5 pb-8 last:pb-0"
            >
              {/* Left icon box + vertical timeline connector */}
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-[#18181B] text-[#33E092]">
                  <StepIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="mt-2 w-px flex-1 bg-zinc-800"
                  />
                )}
              </div>

              {/* Right step content + screenshot */}
              <div className="min-w-0 flex-1 grid grid-cols-1 gap-5 pt-0.5 md:grid-cols-12 md:items-start">
                <div className="min-w-0 space-y-3 md:col-span-7">
                  <h4 className="font-display text-base sm:text-lg font-bold text-zinc-50">
                    <span className="mr-2 font-mono text-sm text-[#33E092] tabular-nums">
                      {step.number}.
                    </span>
                    {step.title}
                  </h4>

                  <p className="text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>

                  {promptToCopy && (
                    <div className="space-y-3 rounded-md border border-zinc-800 bg-[#09090B] p-3.5">
                      <p className="font-mono text-xs sm:text-sm leading-relaxed text-[#33E092] break-words">
                        {promptToCopy.text}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          onCopy(promptToCopy.id, promptToCopy.text)
                        }
                        className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-md bg-[#33E092] px-3.5 py-1.5 text-xs font-semibold text-[#09090B] transition-colors hover:bg-[#0CCE6B] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                      >
                        {copiedId === promptToCopy.id ? (
                          <>
                            <LuCheck
                              className="h-3.5 w-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>Prompt Tersalin</span>
                          </>
                        ) : (
                          <>
                            <LuCopy
                              className="h-3.5 w-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{promptToCopy.label}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {step.tip && (
                    <p className="text-xs leading-relaxed text-zinc-300">
                      Catatan: {step.tip}
                    </p>
                  )}
                </div>

                <figure className="md:col-span-5">
                  <button
                    type="button"
                    onClick={() => onZoomScreenshot(step.screenshot)}
                    aria-label={`Perbesar gambar ${step.screenshot.title}`}
                    className="group relative h-[210px] sm:h-[230px] w-full overflow-hidden rounded-md border border-zinc-800 bg-[#09090B] text-left transition-colors hover:border-[#33E092]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                  >
                    <Image
                      src={step.screenshot.src}
                      alt={step.screenshot.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-contain p-2 transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                    <span className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-[#09090B]/90 px-2.5 py-1 text-xs font-medium text-zinc-100">
                      <LuZoomIn
                        className="h-3.5 w-3.5 text-[#33E092]"
                        aria-hidden="true"
                      />
                      <span>Perbesar</span>
                    </span>
                  </button>
                  <figcaption className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {step.screenshot.caption}
                  </figcaption>
                </figure>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
