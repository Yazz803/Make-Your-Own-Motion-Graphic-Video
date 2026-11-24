'use client';

import { useEffect, useState } from 'react';
import type { TourRectBox, TourViewportSize } from '@/lib/tour-guide';
import type { TourStepId } from '@/types';

interface MeasuredTourGeometry {
  targetRect: TourRectBox | null;
  viewport: TourViewportSize;
}

const DEFAULT_VIEWPORT: TourViewportSize = { width: 1280, height: 800 };

function readViewport(): TourViewportSize {
  if (typeof window === 'undefined') return DEFAULT_VIEWPORT;
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function toRectBox(rect: DOMRect): TourRectBox {
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    right: rect.right,
    bottom: rect.bottom,
  };
}

function scrollTargetIntoView(el: HTMLElement, targetId: TourStepId) {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth';

  if (targetId === 'navbar') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  if (targetId === 'footer') {
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    window.scrollTo({ top: maxScroll, behavior });
    return;
  }

  const computedPosition = window.getComputedStyle(el).position;
  const anchorEl =
    computedPosition === 'sticky' && el.parentElement ? el.parentElement : el;
  const rect = anchorEl.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  const desiredTopOffset = 76;
  const targetScrollY = Math.max(0, absoluteTop - desiredTopOffset);

  window.scrollTo({ top: targetScrollY, behavior });
}

export function useTourTargetRect(isOpen: boolean, targetId: TourStepId) {
  const [geometry, setGeometry] = useState<MeasuredTourGeometry>({
    targetRect: null,
    viewport: DEFAULT_VIEWPORT,
  });

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const el = document.querySelector<HTMLElement>(
      `[data-tour-target="${targetId}"]`
    );

    if (el) {
      scrollTargetIntoView(el, targetId);
    }

    let rafId = 0;
    let settleRafId = 0;
    let fallbackIntervalId = 0;

    const measure = () => {
      const currentEl = document.querySelector<HTMLElement>(
        `[data-tour-target="${targetId}"]`
      );
      setGeometry({
        targetRect: currentEl
          ? toRectBox(currentEl.getBoundingClientRect())
          : null,
        viewport: readViewport(),
      });
    };

    const scheduleMeasure = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        measure();
      });
    };

    const immediateTimerId = window.setTimeout(measure, 0);
    const settleStart = performance.now();
    const runSettleLoop = () => {
      measure();
      if (performance.now() - settleStart < 700) {
        settleRafId = window.requestAnimationFrame(runSettleLoop);
      }
    };
    settleRafId = window.requestAnimationFrame(runSettleLoop);

    fallbackIntervalId = window.setInterval(() => {
      measure();
      if (performance.now() - settleStart >= 800) {
        window.clearInterval(fallbackIntervalId);
        fallbackIntervalId = 0;
      }
    }, 160);

    window.addEventListener('scroll', scheduleMeasure, { passive: true });
    window.addEventListener('resize', scheduleMeasure, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(scheduleMeasure)
        : null;

    if (resizeObserver) {
      resizeObserver.observe(document.body);
      if (el) resizeObserver.observe(el);
    }

    return () => {
      window.clearTimeout(immediateTimerId);
      if (fallbackIntervalId !== 0) window.clearInterval(fallbackIntervalId);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      if (settleRafId !== 0) window.cancelAnimationFrame(settleRafId);
      window.removeEventListener('scroll', scheduleMeasure);
      window.removeEventListener('resize', scheduleMeasure);
      resizeObserver?.disconnect();
    };
  }, [isOpen, targetId]);

  return {
    targetRect: isOpen ? geometry.targetRect : null,
    viewport: geometry.viewport,
  };
}
