'use client';

import { LuCaptions, LuMic, LuVolume2 } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import type { TtsTarget, VoLanguage, VoTone } from '@/types';

interface VoiceOverControlsSectionProps {
  voEnabled: boolean;
  onToggleVoEnabled: () => void;
  voLanguage: VoLanguage;
  onChangeVoLanguage: (lang: VoLanguage) => void;
  voTone: VoTone;
  onChangeVoTone: (tone: VoTone) => void;
  ttsTarget: TtsTarget;
  onChangeTtsTarget: (target: TtsTarget) => void;
  includeTimecodes: boolean;
  onChangeIncludeTimecodes: (checked: boolean) => void;
  includeIntonationCues: boolean;
  onChangeIncludeIntonationCues: (checked: boolean) => void;
  includeSfx: boolean;
  onChangeIncludeSfx: (checked: boolean) => void;
  includeRunningText: boolean;
  onChangeIncludeRunningText: (checked: boolean) => void;
}

export default function VoiceOverControlsSection({
  voEnabled,
  onToggleVoEnabled,
  voLanguage,
  onChangeVoLanguage,
  voTone,
  onChangeVoTone,
  ttsTarget,
  onChangeTtsTarget,
  includeTimecodes,
  onChangeIncludeTimecodes,
  includeIntonationCues,
  onChangeIncludeIntonationCues,
  includeSfx,
  onChangeIncludeSfx,
  includeRunningText,
  onChangeIncludeRunningText,
}: VoiceOverControlsSectionProps) {
  return (
    <div className="border-t border-zinc-800/80 pt-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-2.5">
          <LuMic
            className="mt-0.5 h-4 w-4 shrink-0 text-[#33E092]"
            aria-hidden="true"
          />
          <div>
            <span className="block text-sm font-semibold text-zinc-100">
              Alur 2 Tahap dengan Voice Over (Upload Audio → MP4)
            </span>
            <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">
              Gemini diminta membuat naskah VO dulu dan TIDAK langsung membuat
              video/HTML. Setelah kamu generate audio VO dan upload ke Gemini,
              barulah video MP4 final dirender.
            </span>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={voEnabled}
          aria-label="Aktifkan alur 2 tahap Voice Over"
          onClick={onToggleVoEnabled}
          className={cn(
            'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
            voEnabled
              ? 'border-[#33E092] bg-[#33E092]'
              : 'border-zinc-700 bg-[#18181B]'
          )}
        >
          <span
            className={cn(
              'inline-block h-5 w-5 rounded-full bg-[#09090B] transition-transform',
              voEnabled ? 'translate-x-6' : 'translate-x-1 bg-zinc-400'
            )}
          />
        </button>
      </div>

      {voEnabled && (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="vo-lang"
              className="block text-xs font-medium text-zinc-400"
            >
              Bahasa Naskah
            </label>
            <select
              id="vo-lang"
              value={voLanguage}
              onChange={(e) => onChangeVoLanguage(e.target.value as VoLanguage)}
              className="mt-1.5 h-10 w-full rounded-md border border-zinc-800 bg-[#09090B] px-3 text-xs sm:text-sm text-zinc-100 focus:border-[#33E092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="vo-tone"
              className="block text-xs font-medium text-zinc-400"
            >
              Gaya Narasi
            </label>
            <select
              id="vo-tone"
              value={voTone}
              onChange={(e) => onChangeVoTone(e.target.value as VoTone)}
              className="mt-1.5 h-10 w-full rounded-md border border-zinc-800 bg-[#09090B] px-3 text-xs sm:text-sm text-zinc-100 focus:border-[#33E092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <option value="storytelling">Storytelling</option>
              <option value="santai">Santai &amp; Akrab</option>
              <option value="enerjik">Enerjik (Hook Cepat)</option>
              <option value="formal">Formal &amp; Dokumenter</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="vo-tts"
              className="block text-xs font-medium text-zinc-400"
            >
              Target Layanan VO
            </label>
            <select
              id="vo-tts"
              value={ttsTarget}
              onChange={(e) => onChangeTtsTarget(e.target.value as TtsTarget)}
              className="mt-1.5 h-10 w-full rounded-md border border-zinc-800 bg-[#09090B] px-3 text-xs sm:text-sm text-zinc-100 focus:border-[#33E092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <option value="elevenlabs">ElevenLabs</option>
              <option value="capcut">CapCut TTS / Voice</option>
              <option value="general">Umum / Dubbing Manual</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 sm:col-span-3">
            <label className="inline-flex min-h-[36px] cursor-pointer items-center gap-2 text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={includeTimecodes}
                onChange={(e) => onChangeIncludeTimecodes(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 bg-[#09090B] accent-[#33E092]"
              />
              <span>Sertakan timecode (00:00–00:04)</span>
            </label>

            <label className="inline-flex min-h-[36px] cursor-pointer items-center gap-2 text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={includeIntonationCues}
                onChange={(e) =>
                  onChangeIncludeIntonationCues(e.target.checked)
                }
                className="h-4 w-4 rounded border-zinc-700 bg-[#09090B] accent-[#33E092]"
              />
              <span>Catatan intonasi + blok teks bersih TTS</span>
            </label>
          </div>
        </div>
      )}

      {/* Mandatory SFX & Word-by-Word Running Text Controls */}
      <div className="mt-5 grid grid-cols-1 gap-3 border-t border-zinc-800/70 pt-5 sm:grid-cols-2">
        <label className="flex min-h-[54px] cursor-pointer items-start gap-3 rounded-md border border-zinc-800 bg-[#09090B] p-3">
          <input
            type="checkbox"
            checked={includeSfx}
            onChange={(e) => onChangeIncludeSfx(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-700 bg-[#18181B] accent-[#33E092]"
          />
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
              <LuVolume2
                className="h-3.5 w-3.5 shrink-0 text-[#33E092]"
                aria-hidden="true"
              />
              <span>Sound Effect (SFX)</span>
            </span>
            <span className="mt-0.5 block text-[11px] leading-snug text-zinc-400">
              Tambahkan whoosh, pop, click &amp; riser pada transisi dan objek.
            </span>
          </span>
        </label>

        <label
          className={cn(
            'flex min-h-[54px] items-start gap-3 rounded-md border border-zinc-800 bg-[#09090B] p-3',
            voEnabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-45'
          )}
        >
          <input
            type="checkbox"
            disabled={!voEnabled}
            checked={voEnabled && includeRunningText}
            onChange={(e) => onChangeIncludeRunningText(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-700 bg-[#18181B] accent-[#33E092]"
          />
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
              <LuCaptions
                className="h-3.5 w-3.5 shrink-0 text-[#33E092]"
                aria-hidden="true"
              />
              <span>Running Text Per Kata</span>
            </span>
            <span className="mt-0.5 block text-[11px] leading-snug text-zinc-400">
              Subtitle kinetik sinkron untuk setiap kata yang diucapkan di audio
              VO.
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
