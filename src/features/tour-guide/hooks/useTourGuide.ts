'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  clampTourStepIndex,
  DEFAULT_TOUR_GUIDE_STATE,
  DEFAULT_TOUR_GUIDE_STATE_RAW,
  parseTourGuideState,
  TOUR_GUIDE_STEPS,
  TOUR_GUIDE_STORAGE_KEY,
  TOUR_GUIDE_VERSION,
} from '@/lib/tour-guide';
import type { TourGuideStatus, TourGuideStorageState } from '@/types';

const TOUR_GUIDE_EVENT = 'mg-studio-tour-updated';
const SERVER_SENTINEL = '__SSR__';
const AUTO_START_DELAY_MS = 450;

let memoryFallbackRaw: string = DEFAULT_TOUR_GUIDE_STATE_RAW;

function subscribeToTourState(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(TOUR_GUIDE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(TOUR_GUIDE_EVENT, callback);
  };
}

function getTourStateSnapshot(): string {
  try {
    const stored = window.localStorage.getItem(TOUR_GUIDE_STORAGE_KEY);
    if (stored !== null) {
      memoryFallbackRaw = stored;
      return stored;
    }
    return DEFAULT_TOUR_GUIDE_STATE_RAW;
  } catch {
    return memoryFallbackRaw;
  }
}

function getTourStateServerSnapshot(): string {
  return SERVER_SENTINEL;
}

function persistTourState(next: TourGuideStorageState) {
  const serialized = JSON.stringify(next);
  memoryFallbackRaw = serialized;
  try {
    window.localStorage.setItem(TOUR_GUIDE_STORAGE_KEY, serialized);
  } catch {
    // Ignore storage quota/access errors; memoryFallbackRaw preserves session state
  }
  window.dispatchEvent(new Event(TOUR_GUIDE_EVENT));
}

export function useTourGuide() {
  const raw = useSyncExternalStore(
    subscribeToTourState,
    getTourStateSnapshot,
    getTourStateServerSnapshot
  );

  const isHydrated = raw !== SERVER_SENTINEL;
  const persistedState = useMemo<TourGuideStorageState>(
    () => (isHydrated ? parseTourGuideState(raw) : DEFAULT_TOUR_GUIDE_STATE),
    [isHydrated, raw]
  );

  const [autoReady, setAutoReady] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!isHydrated || persistedState.status !== 'pending') return;
    const timer = window.setTimeout(() => {
      setAutoReady(true);
    }, AUTO_START_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [isHydrated, persistedState.status]);

  const isOpen =
    manualOpen ||
    (isHydrated && persistedState.status === 'pending' && autoReady);

  const safeStepIndex = clampTourStepIndex(stepIndex);
  const currentStep = TOUR_GUIDE_STEPS[safeStepIndex];
  const totalSteps = TOUR_GUIDE_STEPS.length;

  const saveOutcome = useCallback(
    (status: TourGuideStatus, finalStepIndex: number) => {
      setManualOpen(false);
      setAutoReady(false);
      persistTourState({
        version: TOUR_GUIDE_VERSION,
        status,
        lastStepIndex: clampTourStepIndex(finalStepIndex),
        updatedAt: new Date().toISOString(),
      });
    },
    []
  );

  const startTour = useCallback(() => {
    setStepIndex(0);
    setManualOpen(true);
  }, []);

  const skipTour = useCallback(() => {
    saveOutcome('skipped', safeStepIndex);
  }, [safeStepIndex, saveOutcome]);

  const completeTour = useCallback(() => {
    saveOutcome('completed', totalSteps - 1);
  }, [saveOutcome, totalSteps]);

  const nextStep = useCallback(() => {
    if (safeStepIndex >= totalSteps - 1) {
      completeTour();
      return;
    }
    setStepIndex(safeStepIndex + 1);
  }, [completeTour, safeStepIndex, totalSteps]);

  const prevStep = useCallback(() => {
    if (safeStepIndex <= 0) return;
    setStepIndex(safeStepIndex - 1);
  }, [safeStepIndex]);

  const goToStep = useCallback((index: number) => {
    setStepIndex(clampTourStepIndex(index));
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        skipTour();
        return;
      }

      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;
      if (
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT'
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextStep();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextStep, prevStep, skipTour]);

  return {
    isOpen,
    openedManually: manualOpen,
    currentStepIndex: safeStepIndex,
    currentStep,
    totalSteps,
    persistedStatus: persistedState.status,
    startTour,
    nextStep,
    prevStep,
    goToStep,
    skipTour,
    completeTour,
  };
}
