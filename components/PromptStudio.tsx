'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import {
  Bookmark,
  Captions,
  Check,
  Copy,
  ExternalLink,
  FolderClock,
  Mic,
  Monitor,
  Smartphone,
  Square,
  Trash2,
  Volume2,
} from 'lucide-react';
import {
  ALL_STATIONS,
  MOTION_STYLES,
  QUICK_BRIEF_PRESETS,
  REPO_LINKS,
  type MotionStyle,
} from '@/lib/motion-styles';
import {
  buildMotionPrompt,
  buildPhase2FollowUpPrompt,
  estimateSceneCount,
  type AspectRatio,
  type DurationSec,
  type SavedDraft,
  type TtsTarget,
  type VoLanguage,
  type VoTone,
} from '@/lib/prompt-engine';

const STORAGE_KEY = 'motion_graphic_studio_drafts_v2';
const DRAFTS_EVENT = 'mg-studio-drafts-updated';
const EMPTY_DRAFTS_RAW = '[]';

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

interface PromptStudioProps {
  selectedStyle: MotionStyle;
  onSelectStyle: (style: MotionStyle) => void;
  aspectRatio: AspectRatio;
  onChangeAspectRatio: (ratio: AspectRatio) => void;
}

export default function PromptStudio({
  selectedStyle,
  onSelectStyle,
  aspectRatio,
  onChangeAspectRatio,
}: PromptStudioProps) {
  const [durationSec, setDurationSec] = useState<DurationSec>(30);
  const [topic, setTopic] = useState<string>(QUICK_BRIEF_PRESETS[0].topic);
  const [targetAudience, setTargetAudience] = useState<string>(
    QUICK_BRIEF_PRESETS[0].audience
  );

  // Voice Over, SFX & Word-by-Word Running Text
  const [voEnabled, setVoEnabled] = useState<boolean>(true);
  const [voLanguage, setVoLanguage] = useState<VoLanguage>('id');
  const [voTone, setVoTone] = useState<VoTone>('storytelling');
  const [ttsTarget, setTtsTarget] = useState<TtsTarget>('elevenlabs');
  const [includeTimecodes, setIncludeTimecodes] = useState<boolean>(true);
  const [includeIntonationCues, setIncludeIntonationCues] =
    useState<boolean>(true);
  const [includeSfx, setIncludeSfx] = useState<boolean>(true);
  const [includeRunningText, setIncludeRunningText] = useState<boolean>(true);

  // Director controls
  const [antiSlideEnforcement, setAntiSlideEnforcement] =
    useState<boolean>(true);
  const [includeInlineStyleRules, setIncludeInlineStyleRules] =
    useState<boolean>(true);

  // UI feedback & local drafts
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedPhase2, setCopiedPhase2] = useState<boolean>(false);
  const [savedFeedback, setSavedFeedback] = useState<boolean>(false);
  const [showDrafts, setShowDrafts] = useState<boolean>(false);
  const [copiedDraftId, setCopiedDraftId] = useState<string | null>(null);

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

  const persistDrafts = (next: SavedDraft[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(DRAFTS_EVENT));
    } catch {
      // Ignore storage quota errors
    }
  };

  const generatedPrompt = useMemo(
    () =>
      buildMotionPrompt({
        style: selectedStyle,
        aspectRatio,
        durationSec,
        topic,
        targetAudience,
        voiceOver: {
          enabled: voEnabled,
          language: voLanguage,
          tone: voTone,
          ttsTarget,
          includeTimecodes,
          includeIntonationCues,
          includeSfx,
          includeRunningText,
        },
        antiSlideEnforcement,
        includeInlineStyleRules,
      }),
    [
      selectedStyle,
      aspectRatio,
      durationSec,
      topic,
      targetAudience,
      voEnabled,
      voLanguage,
      voTone,
      ttsTarget,
      includeTimecodes,
      includeIntonationCues,
      includeSfx,
      includeRunningText,
      antiSlideEnforcement,
      includeInlineStyleRules,
    ]
  );

  const phase2Prompt = useMemo(
    () =>
      buildPhase2FollowUpPrompt({
        style: selectedStyle,
        aspectRatio,
        includeSfx,
        includeRunningText,
      }),
    [selectedStyle, aspectRatio, includeSfx, includeRunningText]
  );

  const sceneCount = estimateSceneCount(durationSec);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  };

  const handleCopyPrompt = async () => {
    await copyText(generatedPrompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  const handleCopyPhase2 = async () => {
    await copyText(phase2Prompt);
    setCopiedPhase2(true);
    window.setTimeout(() => setCopiedPhase2(false), 2400);
  };

  const handleSaveDraft = () => {
    const cleanTitle = topic.trim()
      ? topic.trim().slice(0, 56) + (topic.trim().length > 56 ? '…' : '')
      : `Draft ${selectedStyle.name}`;

    const entry: SavedDraft = {
      id: `${Date.now()}`,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      title: cleanTitle,
      styleId: selectedStyle.id,
      styleName: selectedStyle.name,
      skillHandle: selectedStyle.skillHandle,
      aspectRatio,
      durationSec,
      voEnabled,
      prompt: generatedPrompt,
      configSnapshot: {
        styleId: selectedStyle.id,
        aspectRatio,
        durationSec,
        topic,
        targetAudience,
        voiceOver: {
          enabled: voEnabled,
          language: voLanguage,
          tone: voTone,
          ttsTarget,
          includeTimecodes,
          includeIntonationCues,
          includeSfx,
          includeRunningText,
        },
        antiSlideEnforcement,
        includeInlineStyleRules,
      },
    };

    const next = [entry, ...drafts].slice(0, 12);
    persistDrafts(next);
    setSavedFeedback(true);
    window.setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleLoadDraft = (draft: SavedDraft) => {
    const foundStyle = MOTION_STYLES.find(
      (s) => s.id === draft.configSnapshot.styleId
    );
    if (foundStyle) onSelectStyle(foundStyle);
    onChangeAspectRatio(draft.configSnapshot.aspectRatio);
    setDurationSec(draft.configSnapshot.durationSec);
    setTopic(draft.configSnapshot.topic);
    setTargetAudience(draft.configSnapshot.targetAudience);
    setVoEnabled(draft.configSnapshot.voiceOver.enabled);
    setVoLanguage(draft.configSnapshot.voiceOver.language);
    setVoTone(draft.configSnapshot.voiceOver.tone);
    setTtsTarget(draft.configSnapshot.voiceOver.ttsTarget);
    setIncludeTimecodes(draft.configSnapshot.voiceOver.includeTimecodes);
    setIncludeIntonationCues(
      draft.configSnapshot.voiceOver.includeIntonationCues
    );
    setIncludeSfx(draft.configSnapshot.voiceOver.includeSfx);
    setIncludeRunningText(draft.configSnapshot.voiceOver.includeRunningText);
    setAntiSlideEnforcement(draft.configSnapshot.antiSlideEnforcement);
    setIncludeInlineStyleRules(draft.configSnapshot.includeInlineStyleRules);
    setShowDrafts(false);
  };

  const handleDeleteDraft = (id: string) => {
    persistDrafts(drafts.filter((d) => d.id !== id));
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = QUICK_BRIEF_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const foundStyle = MOTION_STYLES.find((s) => s.id === preset.styleId);
    if (foundStyle) onSelectStyle(foundStyle);
    onChangeAspectRatio(preset.aspectRatio);
    setDurationSec(preset.durationSec);
    setTopic(preset.topic);
    setTargetAudience(preset.audience);
  };

  return (
    <section
      id="studio"
      className="border-t border-zinc-800/80 bg-[#0C0C0F] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#F2B705]">
              02. Studio Prompt &amp; Pendamping Gemini Web
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl [text-wrap:balance]">
              Rakit brief motion graphic untuk Mode Tugas Gemini Web
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Prompt otomatis diawali dengan{' '}
              <code className="font-mono text-[#F2B705]">
                {selectedStyle.skillHandle}
              </code>{' '}
              untuk memanggil keahlian yang sudah terpasang. Gunakan selalu{' '}
              <strong className="font-medium text-zinc-200">Mode Tugas</strong>{' '}
              (bukan Obrolan) di Gemini Web.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDrafts((prev) => !prev)}
            className="inline-flex min-h-[42px] items-center gap-2 self-start rounded-lg border border-zinc-800 bg-[#121215] px-4 py-2 text-xs sm:text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-zinc-50 whitespace-nowrap sm:self-auto"
          >
            <FolderClock className="h-4 w-4 text-zinc-400" aria-hidden="true" />
            <span>Draft Tersimpan</span>
            <span className="font-mono text-xs text-[#F2B705] tabular-nums">
              ({drafts.length})
            </span>
          </button>
        </div>

        {/* Saved Drafts Drawer */}
        {showDrafts && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-[#121215] p-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-display text-base font-semibold text-zinc-100">
                Riwayat Draft Lokal di Perangkat Ini
              </h3>
              <button
                type="button"
                onClick={() => setShowDrafts(false)}
                className="text-xs font-medium text-zinc-400 hover:text-zinc-100"
              >
                Tutup
              </button>
            </div>

            {drafts.length === 0 ? (
              <p className="py-6 text-sm text-zinc-400">
                Belum ada draft tersimpan. Klik tombol &ldquo;Simpan Draft&rdquo;
                di panel prompt untuk menyimpan konfigurasi favoritmu.
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
                        {draft.skillHandle} · {draft.styleName} ·{' '}
                        {draft.aspectRatio} · {draft.durationSec} dtk ·{' '}
                        {draft.voEnabled ? '2-Tahap VO → MP4' : 'Langsung MP4'}{' '}
                        · {draft.createdAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleLoadDraft(draft)}
                        className="min-h-[36px] rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:text-zinc-50 whitespace-nowrap"
                      >
                        Muat
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await copyText(draft.prompt);
                          setCopiedDraftId(draft.id);
                          window.setTimeout(() => setCopiedDraftId(null), 1800);
                        }}
                        className="min-h-[36px] rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-100 hover:bg-zinc-700 whitespace-nowrap"
                      >
                        {copiedDraftId === draft.id ? 'Tersalin' : 'Salin'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDraft(draft.id)}
                        aria-label={`Hapus draft ${draft.title}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-800 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main 12-column Studio Split */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Production Controls (7 cols) */}
          <div className="space-y-8 rounded-xl border border-zinc-800 bg-[#121215] p-5 sm:p-7 lg:col-span-7">
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
                    onClick={() => handleApplyPreset(preset.id)}
                    className="min-h-[38px] rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-50 whitespace-nowrap"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Style selector covering all 112 styles grouped by station */}
            <div className="border-t border-zinc-800/80 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="style-select"
                  className="text-sm font-semibold text-zinc-100"
                >
                  Gaya Visual &amp; Pemanggil Keahlian ({MOTION_STYLES.length}{' '}
                  gaya)
                </label>
                <span className="font-mono text-xs text-[#F2B705]">
                  Awalan Prompt: {selectedStyle.skillHandle}
                </span>
              </div>
              <select
                id="style-select"
                value={selectedStyle.id}
                onChange={(e) => {
                  const found = MOTION_STYLES.find(
                    (s) => s.id === e.target.value
                  );
                  if (found) onSelectStyle(found);
                }}
                className="mt-2.5 h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
              >
                {ALL_STATIONS.map((station) => (
                  <optgroup key={station} label={station}>
                    {MOTION_STYLES.filter((s) => s.station === station).map(
                      (s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.skillHandle})
                        </option>
                      )
                    )}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Aspect Ratio & Duration */}
            <div className="grid grid-cols-1 gap-6 border-t border-zinc-800/80 pt-6 sm:grid-cols-2">
              <div>
                <span className="block text-sm font-semibold text-zinc-100">
                  Layout &amp; Rasio Aspek
                </span>
                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  {(
                    [
                      {
                        id: '9:16',
                        label: '9:16',
                        sub: 'Vertikal',
                        Icon: Smartphone,
                      },
                      {
                        id: '16:9',
                        label: '16:9',
                        sub: 'Lanskap',
                        Icon: Monitor,
                      },
                      {
                        id: '1:1',
                        label: '1:1',
                        sub: 'Persegi',
                        Icon: Square,
                      },
                    ] as const
                  ).map(({ id, label, sub, Icon }) => {
                    const active = aspectRatio === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => onChangeAspectRatio(id)}
                        className={`flex min-h-[60px] flex-col items-center justify-center rounded-lg border px-2 py-2.5 text-center transition-colors ${
                          active
                            ? 'border-[#F2B705] bg-[#F2B705]/10 text-[#F2B705]'
                            : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span className="mt-1 font-mono text-xs font-semibold tabular-nums">
                          {label}
                        </span>
                        <span className="text-[11px] opacity-80">{sub}</span>
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
                  {([15, 30, 45, 60] as const).map((sec) => {
                    const active = durationSec === sec;
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setDurationSec(sec)}
                        className={`flex min-h-[60px] flex-col items-center justify-center rounded-lg border px-2 py-2 font-mono transition-colors tabular-nums ${
                          active
                            ? 'border-[#F2B705] bg-[#F2B705]/10 text-[#F2B705]'
                            : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        <span className="text-sm font-semibold">{sec}s</span>
                        <span className="mt-0.5 font-sans text-[10px] opacity-75">
                          ~{estimateSceneCount(sec)} scene
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Topic & Audience */}
            <div className="space-y-4 border-t border-zinc-800/80 pt-6">
              <div>
                <label
                  htmlFor="topic-input"
                  className="block text-sm font-semibold text-zinc-100"
                >
                  Ide atau Topik Video Motion Graphic
                </label>
                <textarea
                  id="topic-input"
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Contoh: Jelaskan cara kerja panel surya dalam 30 detik dengan alur yang mudah dipahami pemula..."
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-500 focus:border-[#F2B705] focus:outline-none"
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
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Contoh: Penonton Reels & TikTok usia 18-30 tahun"
                  className="mt-2 h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#F2B705] focus:outline-none"
                />
              </div>
            </div>

            {/* Voice Over 2-Step Gate + SFX + Word-by-Word Running Text */}
            <div className="border-t border-zinc-800/80 pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <Mic
                    className="mt-0.5 h-4 w-4 text-[#F2B705] shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-zinc-100">
                      Alur 2 Tahap dengan Voice Over (Upload Audio → MP4)
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">
                      Gemini diminta membuat naskah VO dulu dan TIDAK langsung
                      membuat video/HTML. Setelah kamu generate audio VO dan
                      upload ke Gemini, barulah video MP4 final dirender.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={voEnabled}
                  aria-label="Aktifkan alur 2 tahap Voice Over"
                  onClick={() => setVoEnabled((prev) => !prev)}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors ${
                    voEnabled
                      ? 'border-[#F2B705] bg-[#F2B705]'
                      : 'border-zinc-700 bg-zinc-900'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-[#09090B] transition-transform ${
                      voEnabled ? 'translate-x-6' : 'translate-x-1 bg-zinc-400'
                    }`}
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
                      onChange={(e) =>
                        setVoLanguage(e.target.value as VoLanguage)
                      }
                      className="mt-1.5 h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-xs sm:text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
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
                      onChange={(e) => setVoTone(e.target.value as VoTone)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-xs sm:text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
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
                      onChange={(e) =>
                        setTtsTarget(e.target.value as TtsTarget)
                      }
                      className="mt-1.5 h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-xs sm:text-sm text-zinc-100 focus:border-[#F2B705] focus:outline-none"
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
                        onChange={(e) => setIncludeTimecodes(e.target.checked)}
                        className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 accent-[#F2B705]"
                      />
                      <span>Sertakan timecode (00:00–00:04)</span>
                    </label>

                    <label className="inline-flex min-h-[36px] cursor-pointer items-center gap-2 text-xs text-zinc-300">
                      <input
                        type="checkbox"
                        checked={includeIntonationCues}
                        onChange={(e) =>
                          setIncludeIntonationCues(e.target.checked)
                        }
                        className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 accent-[#F2B705]"
                      />
                      <span>Catatan intonasi + blok teks bersih TTS</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Mandatory SFX & Word-by-Word Running Text Controls */}
              <div className="mt-5 grid grid-cols-1 gap-3 border-t border-zinc-800/70 pt-5 sm:grid-cols-2">
                <label className="flex min-h-[54px] cursor-pointer items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3">
                  <input
                    type="checkbox"
                    checked={includeSfx}
                    onChange={(e) => setIncludeSfx(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-700 bg-zinc-900 accent-[#F2B705]"
                  />
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
                      <Volume2
                        className="h-3.5 w-3.5 text-[#F2B705] shrink-0"
                        aria-hidden="true"
                      />
                      <span>Sound Effect (SFX)</span>
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-zinc-400">
                      Tambahkan whoosh, pop, click &amp; riser pada transisi dan
                      objek.
                    </span>
                  </span>
                </label>

                <label
                  className={`flex min-h-[54px] items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 ${
                    voEnabled
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed opacity-45'
                  }`}
                >
                  <input
                    type="checkbox"
                    disabled={!voEnabled}
                    checked={voEnabled && includeRunningText}
                    onChange={(e) => setIncludeRunningText(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-700 bg-zinc-900 accent-[#F2B705]"
                  />
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-100">
                      <Captions
                        className="h-3.5 w-3.5 text-[#F2B705] shrink-0"
                        aria-hidden="true"
                      />
                      <span>Running Text Per Kata</span>
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-zinc-400">
                      Subtitle kinetik sinkron untuk setiap kata yang diucapkan
                      di audio VO.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            {/* Director switches */}
            <div className="space-y-3 border-t border-zinc-800/80 pt-6">
              <label className="flex min-h-[40px] cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={antiSlideEnforcement}
                  onChange={(e) => setAntiSlideEnforcement(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-950 accent-[#F2B705]"
                />
                <span className="text-xs sm:text-sm text-zinc-300">
                  <strong className="font-semibold text-zinc-100">
                    Aktifkan Aturan Anti-Slide
                  </strong>{' '}
                  — Mencegah Gemini membuat slide statis; memastikan kamera dan
                  objek bergerak kontinyu setiap detik.
                </span>
              </label>

              <label className="flex min-h-[40px] cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={includeInlineStyleRules}
                  onChange={(e) => setIncludeInlineStyleRules(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-950 accent-[#F2B705]"
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
          </div>

          {/* Right: Sticky Gemini Web Companion Panel (5 cols) */}
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
                    · {selectedStyle.name} · {aspectRatio} · ~{sceneCount}{' '}
                    adegan
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50 whitespace-nowrap"
                >
                  {savedFeedback ? (
                    <>
                      <Check
                        className="h-3.5 w-3.5 text-[#F2B705]"
                        aria-hidden="true"
                      />
                      <span>Tersimpan</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
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
                    onClick={handleCopyPrompt}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#F2B705] px-4 py-2.5 text-sm font-semibold text-[#09090B] transition-colors duration-150 hover:bg-[#FFD038] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Prompt Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Salin Prompt</span>
                      </>
                    )}
                  </button>

                  <a
                    href={REPO_LINKS.geminiWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      void copyText(generatedPrompt);
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 2400);
                    }}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition-colors duration-150 hover:border-zinc-500 hover:bg-zinc-800 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
                  >
                    <span>Salin &amp; Buka Gemini</span>
                    <ExternalLink
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Companion workflow explanation */}
                <div className="mt-5 border-t border-zinc-800/80 pt-4">
                  <p className="text-xs font-semibold text-zinc-200">
                    Alur Wajib di Gemini Web (Mode Tugas)
                  </p>
                  <ol className="mt-2.5 space-y-2 text-xs leading-relaxed text-zinc-400">
                    <li>
                      <span className="font-mono text-zinc-200">01.</span> Buka
                      Gemini Web dengan akun Google milikmu, lalu pastikan
                      toggle di bawah kolom input berada di{' '}
                      <strong className="font-medium text-zinc-200">
                        Tugas
                      </strong>{' '}
                      (bukan Obrolan).
                    </li>
                    <li>
                      <span className="font-mono text-zinc-200">02.</span>{' '}
                      Tempel prompt di atas (sudah diawali{' '}
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
                        <span className="font-mono text-zinc-200">03.</span>{' '}
                        Generate audio VO dari naskah tersebut di layanan TTS
                        pilihanmu, lalu{' '}
                        <strong className="font-medium text-zinc-200">
                          upload file audio VO ke chat Mode Tugas yang sama
                        </strong>{' '}
                        agar Gemini langsung merender video final{' '}
                        <code className="font-mono text-zinc-200">.mp4</code>{' '}
                        lengkap dengan SFX &amp; running text per kata.
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
                    onClick={handleCopyPhase2}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-100 transition-colors hover:border-zinc-500 whitespace-nowrap shrink-0"
                  >
                    {copiedPhase2 ? (
                      <>
                        <Check
                          className="h-3.5 w-3.5 text-[#F2B705]"
                          aria-hidden="true"
                        />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
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
        </div>
      </div>
    </section>
  );
}
