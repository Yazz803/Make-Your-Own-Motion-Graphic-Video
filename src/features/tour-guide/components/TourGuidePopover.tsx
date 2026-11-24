'use client';

import { useEffect, useRef } from 'react';
import {
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuCompass,
  LuX,
} from 'react-icons/lu';
import { cn } from '@/lib/utils';
import type { TourGuideStep } from '@/types';

interface TourGuidePopoverProps {
  step: TourGuideStep;
  stepIndex: number;
  totalSteps: number;
  top: number;
  left: number;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onGoToStep: (index: number) => void;
}

export default function TourGuidePopover({
  step,
  stepIndex,
  totalSteps,
  top,
  left,
  popoverRef,
  onNext,
  onPrev,
  onSkip,
  onGoToStep,
}: TourGuidePopoverProps) {
  const primaryBtnRef = useRef<HTMLButtonElement | null>(null);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === totalSteps - 1;

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      primaryBtnRef.current?.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(timerId);
  }, []);

  const stepNumberLabel = String(stepIndex + 1).padStart(2, '0');
  const totalStepsLabel = String(totalSteps).padStart(2, '0');

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-guide-title"
      aria-describedby="tour-guide-description"
      style={{ top: `${top}px`, left: `${left}px` }}
      className="fixed z-[60] max-h-[calc(100dvh-24px)] w-[min(390px,calc(100vw-24px))] overflow-y-auto overscroll-contain rounded-lg border border-zinc-700/90 bg-[#111114]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.78)] backdrop-blur-md transition-[top,left] duration-200 ease-out motion-reduce:transition-none"
    >
      {/* Top metadata row */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-md border border-[#33E092]/30 bg-[#33E092]/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#33E092] tabular-nums">
          <LuCompass className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>
            {stepNumberLabel}/{totalStepsLabel} · {step.badge}
          </span>
        </div>

        <button
          type="button"
          onClick={onSkip}
          aria-label="Tutup panduan tur"
          title="Tutup panduan tur"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-[#18181B] text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]"
        >
          <LuX className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Title & Description */}
      <div className="mt-3">
        <h3
          id="tour-guide-title"
          className="font-display text-base sm:text-lg font-bold tracking-tight text-zinc-50"
        >
          {step.title}
        </h3>
        <p
          id="tour-guide-description"
          className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-300"
        >
          {step.description}
        </p>

        {step.tip && (
          <p className="mt-2.5 rounded-md border border-zinc-800/90 border-l-2 border-l-[#33E092] bg-[#09090B]/85 px-3 py-2 text-xs leading-relaxed text-zinc-300">
            {step.tip}
          </p>
        )}
      </div>

      {/* Segmented step progress bar */}
      <div
        className="mt-3.5 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}
        role="group"
        aria-label="Progres langkah panduan tur"
      >
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isCurrent = idx === stepIndex;
          const isVisited = idx < stepIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onGoToStep(idx)}
              aria-label={`Lompat ke langkah ${idx + 1}`}
              aria-current={isCurrent ? 'step' : undefined}
              className={cn(
                'h-1.5 rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-1 focus-visible:ring-offset-[#111114]',
                isCurrent
                  ? 'bg-[#33E092]'
                  : isVisited
                    ? 'bg-[#33E092]/45 hover:bg-[#33E092]/70'
                    : 'bg-zinc-800 hover:bg-zinc-700'
              )}
            />
          );
        })}
      </div>

      {/* Footer controls */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/80 pt-3">
        {!isLastStep ? (
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex min-h-[36px] items-center rounded-md px-2 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]"
          >
            Lewati Tur
          </button>
        ) : (
          <span className="font-mono text-[11px] text-zinc-400">
            Langkah terakhir
          </span>
        )}

        <div className="flex items-center gap-2">
          {!isFirstStep && (
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-zinc-800 bg-[#18181B] px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-zinc-50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]"
            >
              <LuArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Sebelumnya</span>
            </button>
          )}

          <button
            ref={primaryBtnRef}
            type="button"
            onClick={onNext}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md bg-[#33E092] px-3.5 py-1.5 text-xs font-semibold text-[#09090B] transition-colors hover:bg-[#0CCE6B] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]"
          >
            <span>{isLastStep ? 'Selesai' : 'Lanjut'}</span>
            {isLastStep ? (
              <LuCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <LuArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
