'use client';

import { LuTrash2 } from 'react-icons/lu';
import type { SavedDraft } from '@/types';

interface SavedDraftsDrawerProps {
  drafts: SavedDraft[];
  copiedDraftId: string | null;
  onClose: () => void;
  onLoadDraft: (draft: SavedDraft) => void;
  onCopyDraft: (draft: SavedDraft) => void;
  onDeleteDraft: (id: string) => void;
}

export default function SavedDraftsDrawer({
  drafts,
  copiedDraftId,
  onClose,
  onLoadDraft,
  onCopyDraft,
  onDeleteDraft,
}: SavedDraftsDrawerProps) {
  return (
    <div className="mt-6 rounded-lg border border-zinc-800 bg-[#111114]/95 p-5">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <h3 className="font-display text-base font-bold text-zinc-100">
          Riwayat Draft Lokal di Perangkat Ini
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-sm text-xs font-medium text-zinc-400 hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
        >
          Tutup
        </button>
      </div>

      {drafts.length === 0 ? (
        <p className="py-6 text-sm text-zinc-400">
          Belum ada draft tersimpan. Klik tombol &ldquo;Simpan Draft&rdquo; di
          panel prompt untuk menyimpan konfigurasi favoritmu.
        </p>
      ) : (
        <div className="mt-4 divide-y divide-zinc-800/80">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-100">
                  {draft.title}
                </p>
                <p className="mt-0.5 text-xs text-zinc-400 tabular-nums">
                  {draft.skillHandle} · {draft.styleName} · {draft.aspectRatio}{' '}
                  · {draft.durationSec} dtk ·{' '}
                  {draft.voEnabled ? '2-Tahap VO → MP4' : 'Langsung MP4'} ·{' '}
                  {draft.createdAt}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => onLoadDraft(draft)}
                  className="min-h-[36px] rounded-md border border-zinc-800 bg-[#18181B] px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-[#33E092]/60 hover:text-[#33E092] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  Muat
                </button>
                <button
                  type="button"
                  onClick={() => onCopyDraft(draft)}
                  className="min-h-[36px] rounded-md bg-[#33E092] px-3 py-1.5 text-xs font-semibold text-[#09090B] hover:bg-[#0CCE6B] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  {copiedDraftId === draft.id ? 'Tersalin' : 'Salin'}
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteDraft(draft.id)}
                  aria-label={`Hapus draft ${draft.title}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  <LuTrash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
