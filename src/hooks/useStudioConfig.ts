'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import {
  DEFAULT_STUDIO_CONFIG,
  DEFAULT_STUDIO_CONFIG_RAW,
  parseStudioConfig,
  STUDIO_CONFIG_STORAGE_KEY,
} from '@/lib/studio-config';
import type { StudioConfigSnapshot } from '@/types';

const STUDIO_CONFIG_EVENT = 'mg-studio-config-updated';

let memoryFallbackRaw: string = DEFAULT_STUDIO_CONFIG_RAW;

function subscribeToStudioConfig(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(STUDIO_CONFIG_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(STUDIO_CONFIG_EVENT, callback);
  };
}

function getStudioConfigSnapshot(): string {
  try {
    const stored = window.localStorage.getItem(STUDIO_CONFIG_STORAGE_KEY);
    if (stored !== null) {
      memoryFallbackRaw = stored;
      return stored;
    }
    return DEFAULT_STUDIO_CONFIG_RAW;
  } catch {
    return memoryFallbackRaw;
  }
}

function getStudioConfigServerSnapshot(): string {
  return DEFAULT_STUDIO_CONFIG_RAW;
}

function persistStudioConfig(next: StudioConfigSnapshot) {
  const serialized = JSON.stringify(next);
  memoryFallbackRaw = serialized;
  try {
    window.localStorage.setItem(STUDIO_CONFIG_STORAGE_KEY, serialized);
  } catch {
    // Ignore storage quota/access errors; memoryFallbackRaw preserves session state
  }
  window.dispatchEvent(new Event(STUDIO_CONFIG_EVENT));
}

export function useStudioConfig() {
  const configRaw = useSyncExternalStore(
    subscribeToStudioConfig,
    getStudioConfigSnapshot,
    getStudioConfigServerSnapshot
  );

  const config = useMemo<StudioConfigSnapshot>(
    () => parseStudioConfig(configRaw),
    [configRaw]
  );

  const updateConfig = useCallback(
    (updater: (prev: StudioConfigSnapshot) => StudioConfigSnapshot) => {
      const current = parseStudioConfig(getStudioConfigSnapshot());
      const next = updater(current);
      persistStudioConfig(next);
    },
    []
  );

  const resetConfig = useCallback(() => {
    persistStudioConfig(DEFAULT_STUDIO_CONFIG);
  }, []);

  return { config, updateConfig, resetConfig };
}
