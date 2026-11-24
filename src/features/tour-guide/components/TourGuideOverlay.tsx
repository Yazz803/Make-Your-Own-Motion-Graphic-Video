'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  computeSpotlightRect,
  computeTourPopoverPosition,
  type TourPopoverSize,
} from '@/lib/tour-guide';
import type { TourGuideStep } from '@/types';
import { useTourTargetRect } from '../hooks/useTourTargetRect';
import TourGuidePopover from './TourGuidePopover';

interface TourGuideOverlayProps {
  isOpen: boolean;
  openedManually: boolean;
  step: TourGuideStep;
  stepIndex: number;
  totalSteps: number;
  restoreFocusRef?: React.RefObject<HTMLButtonElement | null>;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onGoToStep: (index: number) => void;
}

const DEFAULT_POPOVER_SIZE: TourPopoverSize = { width: 390, height: 270 };

export default function TourGuideOverlay({
  isOpen,
  openedManually,
  step,
  stepIndex,
  totalSteps,
  restoreFocusRef,
  onNext,
  onPrev,
  onSkip,
  onGoToStep,
}: TourGuideOverlayProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef(false);
  const wasManualRef = useRef(false);
  const [popoverSize, setPopoverSize] =
    useState<TourPopoverSize>(DEFAULT_POPOVER_SIZE);

  const { targetRect, viewport } = useTourTargetRect(isOpen, step.targetId);

  useEffect(() => {
    if (!isOpen) return;
    const node = popoverRef.current;
    if (!node) return;

    const updateSize = () => {
      const rect = node.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      setPopoverSize((prev) =>
        Math.abs(prev.width - rect.width) < 1 &&
        Math.abs(prev.height - rect.height) < 1
          ? prev
          : { width: rect.width, height: rect.height }
      );
    };

    const timerId = window.setTimeout(updateSize, 0);
    const rafId = window.requestAnimationFrame(updateSize);
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateSize)
        : null;
    observer?.observe(node);

    return () => {
      window.clearTimeout(timerId);
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [isOpen, stepIndex]);

  useEffect(() => {
    if (isOpen) {
      wasManualRef.current = openedManually;
    } else if (wasOpenRef.current && wasManualRef.current) {
      wasManualRef.current = false;
      restoreFocusRef?.current?.focus({ preventScroll: true });
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, openedManually, restoreFocusRef]);

  if (!isOpen || typeof document === 'undefined') return null;

  const spotlightRect = computeSpotlightRect(targetRect, viewport, step.id);
  const popoverPos = computeTourPopoverPosition(
    spotlightRect ?? targetRect,
    popoverSize,
    viewport,
    step.preferredPlacement,
    step.id
  );

  return createPortal(
    <>
      {/* Click-blocking backdrop layer */}
      <div
        aria-hidden="true"
        className={
          spotlightRect
            ? 'fixed inset-0 z-50 bg-transparent'
            : 'fixed inset-0 z-50 bg-[#09090B]/80 backdrop-blur-[2px]'
        }
      />

      {/* Spotlight cutout frame */}
      {spotlightRect && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[55] overflow-hidden"
        >
          <div
            style={{
              top: `${spotlightRect.top}px`,
              left: `${spotlightRect.left}px`,
              width: `${spotlightRect.width}px`,
              height: `${spotlightRect.height}px`,
            }}
            className="fixed rounded-lg border-2 border-[#33E092] shadow-[0_0_0_9999px_rgba(9,9,11,0.78),0_0_28px_rgba(51,224,146,0.22)] transition-[top,left,width,height] duration-200 ease-out motion-reduce:transition-none"
          />
        </div>
      )}

      <TourGuidePopover
        step={step}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        top={popoverPos.top}
        left={popoverPos.left}
        popoverRef={popoverRef}
        onNext={onNext}
        onPrev={onPrev}
        onSkip={onSkip}
        onGoToStep={onGoToStep}
      />
    </>,
    document.body
  );
}
