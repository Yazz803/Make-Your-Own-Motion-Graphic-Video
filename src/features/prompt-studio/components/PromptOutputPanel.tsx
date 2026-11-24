'use client';

import {
  LuBookmark,
  LuCheck,
  LuCopy,
  LuExternalLink,
} from 'react-icons/lu';
import { REPO_LINKS } from '@/lib/constants';
import type { AspectRatio, MotionStyle } from '@/types';

interface PromptOutputPanelProps {
  selectedStyle: MotionStyle;
  aspectRatio: AspectRatio;
  sceneCount: number;
  voEnabled: boolean;
  generatedPrompt: string;
  phase2Prompt: string;
  copiedPrompt: boolean;
  copiedPhase2: boolean;
  savedFeedback: boolean;
  onSaveDraft: () => void;
  onCopyPrompt: () => void;
  onCopyPhase2: () => void;
}

export default function PromptOutputPanel({
  selectedStyle,
  aspectRatio,
  sceneCount,
  voEnabled,
  generatedPrompt,
  phase2Prompt,
  copiedPrompt,
  copiedPhase2,
  savedFeedback,
  onSaveDraft,
  onCopyPrompt,
  onCopyPhase2,
}: PromptOutputPanelProps) {
  return (
    <div className="space-y-5 lg:sticky lg:top-20 lg:col-span-5">
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#121215]">
        {/* Top metadata bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 px-5 py-4">
          <div>
            <h3 className="font-display text-base font-semibold text-zinc-50">
              Prompt Siap Tempel · Mode Tugas
            </h3>
            <p className="mt-0.5 font-mono text-xs text-zinc-400 tabular-nums">
              <span className="text-[#F2B705]">
                {selectedStyle.skillHandle}
              </span>{' '}
              · {selectedStyle.name} · {aspectRatio} · ~{sceneCount} adegan
            </p>
          </div>

          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50 whitespace-nowrap"
          >
            {savedFeedback ? (
              <>
                <LuCheck
                  className="h-3.5 w-3.5 text-[#F2B705]"
                  aria-hidden="true"
                />
                <span>Tersimpan</span>
              </>
            ) : (
              <>
                <LuBookmark className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Simpan Draft</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt output block */}
        <div className="p-5">
          <pre className="max-h-[320px] overflow-y-auto whitespace-pre-wrap rounded-lg border border-zinc-800/90 bg-[#09090B] p-4 font-mono text-xs leading-relaxed text-zinc-200">
            {generatedPrompt}
          </pre>

          {/* Primary action buttons */}
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={onCopyPrompt}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#F2B705] px-4 py-2.5 text-sm font-semibold text-[#09090B] transition-colors duration-150 hover:bg-[#FFD038] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
            >
              {copiedPrompt ? (
                <>
                  <LuCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Prompt Tersalin</span>
                </>
              ) : (
                <>
                  <LuCopy className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Salin Prompt</span>
                </>
              )}
            </button>

            <a
              href={REPO_LINKS.geminiWeb}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCopyPrompt}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition-colors duration-150 hover:border-zinc-500 hover:bg-zinc-800 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
            >
              <span>Salin &amp; Buka Gemini</span>
              <LuExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* Companion workflow explanation */}
          <div className="mt-5 border-t border-zinc-800/80 pt-4">
            <p className="text-xs font-semibold text-zinc-200">
              Alur Wajib di Gemini Web (Mode Tugas)
            </p>
            <ol className="mt-2.5 space-y-2 text-xs leading-relaxed text-zinc-400">
              <li>
                <span className="font-mono text-zinc-200">01.</span> Buka Gemini
                Web dengan akun Google milikmu, lalu pastikan toggle di bawah
                kolom input berada di{' '}
                <strong className="font-medium text-zinc-200">Tugas</strong>{' '}
                (bukan Obrolan).
              </li>
              <li>
                <span className="font-mono text-zinc-200">02.</span> Tempel
                prompt di atas (sudah diawali{' '}
                <code className="font-mono text-[#F2B705]">
                  {selectedStyle.skillHandle}
                </code>
                ).{' '}
                {voEnabled
                  ? 'Gemini akan menulis naskah VO & storyboard terlebih dahulu tanpa langsung membuat video.'
                  : 'Gemini akan langsung memproses video motion graphic format MP4.'}
              </li>
              {voEnabled && (
                <li>
                  <span className="font-mono text-zinc-200">03.</span> Generate
                  audio VO dari naskah tersebut di layanan TTS pilihanmu, lalu{' '}
                  <strong className="font-medium text-zinc-200">
                    upload file audio VO ke chat Mode Tugas yang sama
                  </strong>{' '}
                  agar Gemini langsung merender video final{' '}
                  <code className="font-mono text-zinc-200">.mp4</code> lengkap
                  dengan SFX &amp; running text per kata.
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>

      {/* Phase 2 Follow-Up Prompt Card (when VO is enabled) */}
      {voEnabled && (
        <div className="rounded-xl border border-zinc-800 bg-[#121215] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="font-display text-sm font-semibold text-zinc-100">
                Prompt Tahap 2 (Setelah Upload Audio VO)
              </h4>
              <p className="mt-0.5 text-xs text-zinc-400">
                Tempel bersama file audio VO (.mp3/.wav) untuk render MP4.
              </p>
            </div>
            <button
              type="button"
              onClick={onCopyPhase2}
              className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-100 transition-colors hover:border-zinc-500 whitespace-nowrap"
            >
              {copiedPhase2 ? (
                <>
                  <LuCheck
                    className="h-3.5 w-3.5 text-[#F2B705]"
                    aria-hidden="true"
                  />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <LuCopy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Salin Tahap 2</span>
                </>
              )}
            </button>
          </div>
          <pre className="mt-3 max-h-[140px] overflow-y-auto whitespace-pre-wrap rounded-lg border border-zinc-800/80 bg-[#09090B] p-3 font-mono text-[11px] leading-relaxed text-zinc-300">
            {phase2Prompt}
          </pre>
        </div>
      )}
    </div>
  );
}
