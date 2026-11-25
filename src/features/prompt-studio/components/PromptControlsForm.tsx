'use client';

import { useState } from 'react';
import {
  LuClapperboard,
  LuLayoutGrid,
  LuMonitor,
  LuSmartphone,
  LuSquare,
  LuWandSparkles,
} from 'react-icons/lu';
import { StyleCatalogModal, StylePreviewThumb } from '@/features/catalog';
import { MOTION_STYLES, QUICK_BRIEF_PRESETS } from '@/lib/constants';
import { estimateSceneCount } from '@/lib/prompt-engine';
import { cn } from '@/lib/utils';
import type {
  AspectRatio,
  DurationSec,
  HybridClipBalance,
  HybridClipConfig,
  MotionStyle,
  ProductionMode,
  TtsTarget,
  VideoClipCategory,
  VoLanguage,
  VoTone,
} from '@/types';
import HybridClipControlsSection from './HybridClipControlsSection';
import VoiceOverControlsSection from './VoiceOverControlsSection';

interface PromptControlsFormProps {
  selectedStyle: MotionStyle;
  onSelectStyle: (style: MotionStyle) => void;
  aspectRatio: AspectRatio;
  onChangeAspectRatio: (ratio: AspectRatio) => void;
  durationSec: DurationSec;
  onChangeDurationSec: (sec: DurationSec) => void;
  productionMode: ProductionMode;
  onChangeProductionMode: (mode: ProductionMode) => void;
  hybridClip: HybridClipConfig;
  onChangeHybridCategory: (category: VideoClipCategory) => void;
  onChangeHybridBalance: (balance: HybridClipBalance) => void;
  onChangeHybridClipFocusNote: (note: string) => void;
  onChangeHybridIncludeSfx: (checked: boolean) => void;
  onChangeHybridIncludeRunningText: (checked: boolean) => void;
  topic: string;
  onChangeTopic: (topic: string) => void;
  targetAudience: string;
  onChangeTargetAudience: (audience: string) => void;
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
  antiSlideEnforcement: boolean;
  onChangeAntiSlideEnforcement: (checked: boolean) => void;
  includeInlineStyleRules: boolean;
  onChangeIncludeInlineStyleRules: (checked: boolean) => void;
  onApplyPreset: (presetId: string) => void;
}

const ASPECT_RATIO_OPTIONS = [
  { id: '9:16', label: '9:16', sub: 'Vertikal', Icon: LuSmartphone },
  { id: '16:9', label: '16:9', sub: 'Lanskap', Icon: LuMonitor },
  { id: '1:1', label: '1:1', sub: 'Persegi', Icon: LuSquare },
] as const;

const DURATION_OPTIONS: readonly DurationSec[] = [15, 30, 45, 60];

export default function PromptControlsForm({
  selectedStyle,
  onSelectStyle,
  aspectRatio,
  onChangeAspectRatio,
  durationSec,
  onChangeDurationSec,
  productionMode,
  onChangeProductionMode,
  hybridClip,
  onChangeHybridCategory,
  onChangeHybridBalance,
  onChangeHybridClipFocusNote,
  onChangeHybridIncludeSfx,
  onChangeHybridIncludeRunningText,
  topic,
  onChangeTopic,
  targetAudience,
  onChangeTargetAudience,
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
  antiSlideEnforcement,
  onChangeAntiSlideEnforcement,
  includeInlineStyleRules,
  onChangeIncludeInlineStyleRules,
  onApplyPreset,
}: PromptControlsFormProps) {
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState<boolean>(false);
  const isHybridMode = productionMode === 'hybrid-clip';
  const stationLabel = selectedStyle.station
    .replace(/^\d+\s*·\s*/, '')
    .replace(/^Bang Motion\s*·\s*/, '');

  return (
    <div
      data-tour-target="studio-form"
      className="space-y-8 rounded-lg border border-zinc-800 bg-[#111114]/90 p-5 sm:p-7 lg:col-span-7"
    >
      {/* Quick-start presets */}
      <div>
        <span className="block text-xs font-medium text-zinc-400">
          Contoh Brief Cepat
        </span>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {QUICK_BRIEF_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset.id)}
              className="min-h-[38px] rounded-md border border-zinc-800 bg-[#18181B] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-[#33E092]/60 hover:text-[#33E092] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected style preview card opening the 110-style catalog modal */}
      <div className="border-t border-zinc-800/80 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            id="style-picker-label"
            className="text-sm font-semibold text-zinc-100"
          >
            Gaya Visual &amp; Pemanggil Keahlian ({MOTION_STYLES.length} gaya)
          </span>
          <span className="font-mono text-xs text-[#33E092]">
            Awalan Prompt: {selectedStyle.skillHandle}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsCatalogModalOpen(true)}
          aria-labelledby="style-picker-label"
          aria-describedby="style-picker-summary"
          className="group mt-2.5 flex w-full flex-col gap-3.5 rounded-lg border border-zinc-800 bg-[#09090B] p-3.5 text-left transition-colors duration-150 hover:border-[#33E092]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] sm:flex-row sm:items-center sm:gap-4"
        >
          <div className="w-full shrink-0 overflow-hidden rounded-md border border-zinc-800/80 sm:w-52">
            <StylePreviewThumb style={selectedStyle} />
          </div>

          <div
            id="style-picker-summary"
            className="flex min-w-0 flex-1 flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2 text-xs text-zinc-400">
                  <span className="font-mono text-[#33E092]">
                    {selectedStyle.skillHandle}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{stationLabel}</span>
                </div>

                <div
                  className="flex shrink-0 items-center gap-1"
                  aria-label="Palet warna gaya"
                >
                  {selectedStyle.palette.slice(0, 4).map((hex) => (
                    <span
                      key={hex}
                      style={{ backgroundColor: hex }}
                      className="h-2.5 w-2.5 rounded-[2px] border border-white/15"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-1.5 font-display text-base font-bold tracking-tight text-zinc-50 sm:text-lg">
                {selectedStyle.name}
              </div>

              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                {selectedStyle.shortDesc}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/80 pt-2.5">
              <span className="truncate text-[11px] text-zinc-400">
                Cocok: {selectedStyle.bestFor.slice(0, 2).join(' · ')}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#33E092] transition-colors group-hover:text-[#0CCE6B] whitespace-nowrap">
                <LuLayoutGrid
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>Pilih dari Katalog</span>
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Aspect Ratio & Duration */}
      <div className="grid grid-cols-1 gap-6 border-t border-zinc-800/80 pt-6 sm:grid-cols-2">
        <div>
          <span className="block text-sm font-semibold text-zinc-100">
            Layout &amp; Rasio Aspek
          </span>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {ASPECT_RATIO_OPTIONS.map(({ id, label, sub, Icon }) => {
              const active = aspectRatio === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onChangeAspectRatio(id)}
                  className={cn(
                    'flex min-h-[60px] flex-col items-center justify-center rounded-md border px-2 py-2.5 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                    active
                      ? 'border-[#33E092] bg-[#33E092] text-[#09090B]'
                      : 'border-zinc-800 bg-[#18181B] text-zinc-300 hover:border-zinc-700 hover:text-zinc-50'
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="mt-1 font-mono text-xs font-semibold tabular-nums">
                    {label}
                  </span>
                  <span
                    className={cn(
                      'text-[11px]',
                      active ? 'text-[#09090B]/80 font-medium' : 'text-zinc-400'
                    )}
                  >
                    {sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <span className="block text-sm font-semibold text-zinc-100">
            Target Durasi Video
          </span>
          <div className="mt-2.5 grid grid-cols-4 gap-2">
            {DURATION_OPTIONS.map((sec) => {
              const active = durationSec === sec;
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => onChangeDurationSec(sec)}
                  className={cn(
                    'flex min-h-[60px] flex-col items-center justify-center rounded-md border px-1 sm:px-2 py-2 font-mono transition-colors tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                    active
                      ? 'border-[#33E092] bg-[#33E092] text-[#09090B]'
                      : 'border-zinc-800 bg-[#18181B] text-zinc-300 hover:border-zinc-700 hover:text-zinc-50'
                  )}
                >
                  <span className="text-sm font-semibold">{sec}s</span>
                  <span
                    className={cn(
                      'mt-0.5 font-sans text-[11px] whitespace-nowrap',
                      active ? 'text-[#09090B]/80 font-medium' : 'text-zinc-400'
                    )}
                  >
                    ~{estimateSceneCount(sec)} scene
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Production Mode, Topic & Audience */}
      <div className="space-y-5 border-t border-zinc-800/80 pt-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              id="production-mode-label"
              className="block text-sm font-semibold text-zinc-100"
            >
              Mode Produksi Video
            </span>
            <span className="font-mono text-[11px] text-[#33E092]">
              {isHybridMode
                ? 'Audio dari Video Clip · 1-Tahap'
                : voEnabled
                  ? 'Alur 2-Tahap VO → MP4'
                  : 'Langsung MP4'}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-labelledby="production-mode-label"
            className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
          >
            <button
              type="button"
              role="radio"
              aria-checked={!isHybridMode}
              onClick={() => onChangeProductionMode('full-motion')}
              className={cn(
                'flex min-h-[68px] items-start gap-3 rounded-md border px-3.5 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                !isHybridMode
                  ? 'border-[#33E092] bg-[#33E092] text-[#09090B]'
                  : 'border-zinc-800 bg-[#18181B] text-zinc-200 hover:border-zinc-700 hover:text-zinc-50'
              )}
            >
              <LuWandSparkles
                className={cn(
                  'mt-0.5 h-4 w-4 shrink-0',
                  !isHybridMode ? 'text-[#09090B]' : 'text-[#33E092]'
                )}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block text-xs sm:text-sm font-semibold leading-snug">
                  Full Motion Graphic
                </span>
                <span
                  className={cn(
                    'mt-0.5 block text-[11px] leading-snug',
                    !isHybridMode
                      ? 'text-[#09090B]/80 font-medium'
                      : 'text-zinc-400'
                  )}
                >
                  100% animasi grafis dengan alur VO 2 tahap atau tanpa VO.
                </span>
              </span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={isHybridMode}
              onClick={() => onChangeProductionMode('hybrid-clip')}
              className={cn(
                'flex min-h-[68px] items-start gap-3 rounded-md border px-3.5 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                isHybridMode
                  ? 'border-[#33E092] bg-[#33E092] text-[#09090B]'
                  : 'border-zinc-800 bg-[#18181B] text-zinc-200 hover:border-zinc-700 hover:text-zinc-50'
              )}
            >
              <LuClapperboard
                className={cn(
                  'mt-0.5 h-4 w-4 shrink-0',
                  isHybridMode ? 'text-[#09090B]' : 'text-[#33E092]'
                )}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block text-xs sm:text-sm font-semibold leading-snug">
                  Hybrid (Motion Graphic + Video Clip)
                </span>
                <span
                  className={cn(
                    'mt-0.5 block text-[11px] leading-snug',
                    isHybridMode
                      ? 'text-[#09090B]/80 font-medium'
                      : 'text-zinc-400'
                  )}
                >
                  Padukan cuplikan video clip asli + motion graphic; suara pakai
                  audio clip.
                </span>
              </span>
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="topic-input"
            className="block text-sm font-semibold text-zinc-100"
          >
            Ide atau Topik Video Motion Graphic
          </label>
          <textarea
            id="topic-input"
            rows={4}
            value={topic}
            onChange={(e) => onChangeTopic(e.target.value)}
            placeholder={
              isHybridMode
                ? 'Contoh: Sorot bagian pembicara menjelaskan kesalahan umum pemula di video clip, lalu visualisasikan 3 poin solusinya dengan motion graphic...'
                : 'Contoh: Jelaskan cara kerja panel surya dalam 30 detik dengan alur yang mudah dipahami pemula...'
            }
            className="mt-2 min-h-[104px] w-full rounded-md border border-zinc-800 bg-[#09090B] px-3.5 py-2.5 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-400 focus:border-[#33E092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          />
        </div>

        <div>
          <label
            htmlFor="audience-input"
            className="block text-sm font-semibold text-zinc-100"
          >
            Target Penonton / Platform
          </label>
          <input
            id="audience-input"
            type="text"
            value={targetAudience}
            onChange={(e) => onChangeTargetAudience(e.target.value)}
            placeholder="Contoh: Penonton Reels & TikTok usia 18-30 tahun"
            className="mt-2 h-11 w-full rounded-md border border-zinc-800 bg-[#09090B] px-3.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:border-[#33E092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          />
        </div>
      </div>

      {isHybridMode ? (
        <HybridClipControlsSection
          hybridClip={hybridClip}
          onChangeCategory={onChangeHybridCategory}
          onChangeBalance={onChangeHybridBalance}
          onChangeClipFocusNote={onChangeHybridClipFocusNote}
          onChangeIncludeSfx={onChangeHybridIncludeSfx}
          onChangeIncludeRunningText={onChangeHybridIncludeRunningText}
        />
      ) : (
        <VoiceOverControlsSection
          voEnabled={voEnabled}
          onToggleVoEnabled={onToggleVoEnabled}
          voLanguage={voLanguage}
          onChangeVoLanguage={onChangeVoLanguage}
          voTone={voTone}
          onChangeVoTone={onChangeVoTone}
          ttsTarget={ttsTarget}
          onChangeTtsTarget={onChangeTtsTarget}
          includeTimecodes={includeTimecodes}
          onChangeIncludeTimecodes={onChangeIncludeTimecodes}
          includeIntonationCues={includeIntonationCues}
          onChangeIncludeIntonationCues={onChangeIncludeIntonationCues}
          includeSfx={includeSfx}
          onChangeIncludeSfx={onChangeIncludeSfx}
          includeRunningText={includeRunningText}
          onChangeIncludeRunningText={onChangeIncludeRunningText}
        />
      )}

      {/* Director switches */}
      <div className="space-y-3 border-t border-zinc-800/80 pt-6">
        <label className="flex min-h-[40px] cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={antiSlideEnforcement}
            onChange={(e) => onChangeAntiSlideEnforcement(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-700 bg-[#09090B] accent-[#33E092]"
          />
          <span className="text-xs sm:text-sm text-zinc-300">
            <strong className="font-semibold text-zinc-100">
              Aktifkan Aturan Anti-Slide
            </strong>{' '}
            — Mencegah Gemini membuat slide statis; memastikan kamera dan objek
            bergerak kontinyu setiap detik.
          </span>
        </label>

        <label className="flex min-h-[40px] cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={includeInlineStyleRules}
            onChange={(e) => onChangeIncludeInlineStyleRules(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-700 bg-[#09090B] accent-[#33E092]"
          />
          <span className="text-xs sm:text-sm text-zinc-300">
            <strong className="font-semibold text-zinc-100">
              Sertakan detail arahan gaya di prompt
            </strong>{' '}
            — Menyisipkan palet &amp; aturan kamera spesifik gaya terpilih
            sebagai penguat keahlian{' '}
            <code className="font-mono text-zinc-200">
              {selectedStyle.skillHandle}
            </code>
            .
          </span>
        </label>
      </div>

      <StyleCatalogModal
        isOpen={isCatalogModalOpen}
        selectedStyle={selectedStyle}
        onClose={() => setIsCatalogModalOpen(false)}
        onSelectStyle={onSelectStyle}
      />
    </div>
  );
}
