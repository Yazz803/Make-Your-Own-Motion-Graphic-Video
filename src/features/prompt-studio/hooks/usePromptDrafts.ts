'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import type { SavedDraft } from '@/types';

const STORAGE_KEY = 'motion_graphic_studio_drafts_v2';
const DRAFTS_EVENT = 'mg-studio-drafts-updated';
const EMPTY_DRAFTS_RAW = '[]';
const MAX_SAVED_DRAFTS = 12;

function subscribeToDrafts(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(DRAFTS_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(DRAFTS_EVENT, callback);
  };
}

function getDraftsSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_DRAFTS_RAW;
  } catch {
    return EMPTY_DRAFTS_RAW;
  }
}

function getDraftsServerSnapshot(): string {
  return EMPTY_DRAFTS_RAW;
}

function persistDrafts(next: SavedDraft[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(DRAFTS_EVENT));
  } catch {
    // Ignore storage quota errors
  }
}

export function usePromptDrafts() {
  const draftsRaw = useSyncExternalStore(
    subscribeToDrafts,
    getDraftsSnapshot,
    getDraftsServerSnapshot
  );

  const drafts = useMemo<SavedDraft[]>(() => {
    try {
      const parsed = JSON.parse(draftsRaw) as SavedDraft[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [draftsRaw]);

  const saveDraft = useCallback(
    (entry: SavedDraft) => {
      const next = [entry, ...drafts].slice(0, MAX_SAVED_DRAFTS);
      persistDrafts(next);
    },
    [drafts]
  );

  const deleteDraft = useCallback(
    (id: string) => {
      persistDrafts(drafts.filter((draft) => draft.id !== id));
    },
    [drafts]
  );

  return { drafts, saveDraft, deleteDraft };
}
