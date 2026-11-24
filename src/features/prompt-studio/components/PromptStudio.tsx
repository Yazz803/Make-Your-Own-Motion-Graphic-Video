'use client';

import { useEffect, useRef, useState } from 'react';
import { LuFolderClock } from 'react-icons/lu';
import { useCopyFeedback } from '@/hooks';
import type { AspectRatio, MotionStyle, SavedDraft } from '@/types';
import { usePromptBuilder } from '../hooks/usePromptBuilder';
import { usePromptDrafts } from '../hooks/usePromptDrafts';
import PromptControlsForm from './PromptControlsForm';
import PromptOutputPanel from './PromptOutputPanel';
import SavedDraftsDrawer from './SavedDraftsDrawer';

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
  const [showDrafts, setShowDrafts] = useState<boolean>(false);
  const [savedFeedback, setSavedFeedback] = useState<boolean>(false);
  const savedTimerRef = useRef<number | null>(null);

  const { drafts, saveDraft, deleteDraft } = usePromptDrafts();
  const { copiedKey, copy } = useCopyFeedback(2400);
  const builder = usePromptBuilder({
    selectedStyle,
    onSelectStyle,
    aspectRatio,
    onChangeAspectRatio,
  });

  useEffect(() => {
    return () => {
      if (savedTimerRef.current !== null) {
        window.clearTimeout(savedTimerRef.current);
      }
    };
  }, []);

  const handleSaveDraft = () => {
    saveDraft(builder.createDraftEntry());
    setSavedFeedback(true);
    if (savedTimerRef.current !== null) {
      window.clearTimeout(savedTimerRef.current);
    }
    savedTimerRef.current = window.setTimeout(() => {
      setSavedFeedback(false);
      savedTimerRef.current = null;
    }, 2000);
  };

  const handleLoadDraft = (draft: SavedDraft) => {
    builder.loadDraft(draft);
    setShowDrafts(false);
  };

  return (
    <section
      id="studio"
      className="scroll-mt-16 border-t border-zinc-800/80 bg-[#09090B]/60 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl [text-wrap:balance]">
              Studio Prompt Mode Tugas Gemini Web
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Prompt otomatis diawali dengan{' '}
              <code className="font-mono text-[#33E092]">
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
            className="inline-flex min-h-[42px] items-center gap-2 self-start rounded-md border border-zinc-800 bg-[#111114]/90 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-200 transition-colors hover:border-[#33E092]/60 hover:text-zinc-50 whitespace-nowrap sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <LuFolderClock
              className="h-4 w-4 text-zinc-400"
              aria-hidden="true"
            />
            <span>Draft Tersimpan</span>
            <span className="font-mono text-xs text-[#33E092] tabular-nums">
              ({drafts.length})
            </span>
          </button>
        </div>

        {showDrafts && (
          <SavedDraftsDrawer
            drafts={drafts}
            copiedDraftId={
              copiedKey?.startsWith('draft:')
                ? copiedKey.slice('draft:'.length)
                : null
            }
            onClose={() => setShowDrafts(false)}
            onLoadDraft={handleLoadDraft}
            onCopyDraft={(draft) => void copy(`draft:${draft.id}`, draft.prompt)}
            onDeleteDraft={deleteDraft}
          />
        )}

        {/* Main 12-column Studio Split */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <PromptControlsForm
            selectedStyle={selectedStyle}
            onSelectStyle={onSelectStyle}
            aspectRatio={aspectRatio}
            onChangeAspectRatio={onChangeAspectRatio}
            durationSec={builder.durationSec}
            onChangeDurationSec={builder.setDurationSec}
            topic={builder.topic}
            onChangeTopic={builder.setTopic}
            targetAudience={builder.targetAudience}
            onChangeTargetAudience={builder.setTargetAudience}
            voEnabled={builder.voEnabled}
            onToggleVoEnabled={() => builder.setVoEnabled((prev) => !prev)}
            voLanguage={builder.voLanguage}
            onChangeVoLanguage={builder.setVoLanguage}
            voTone={builder.voTone}
            onChangeVoTone={builder.setVoTone}
            ttsTarget={builder.ttsTarget}
            onChangeTtsTarget={builder.setTtsTarget}
            includeTimecodes={builder.includeTimecodes}
            onChangeIncludeTimecodes={builder.setIncludeTimecodes}
            includeIntonationCues={builder.includeIntonationCues}
            onChangeIncludeIntonationCues={builder.setIncludeIntonationCues}
            includeSfx={builder.includeSfx}
            onChangeIncludeSfx={builder.setIncludeSfx}
            includeRunningText={builder.includeRunningText}
            onChangeIncludeRunningText={builder.setIncludeRunningText}
            antiSlideEnforcement={builder.antiSlideEnforcement}
            onChangeAntiSlideEnforcement={builder.setAntiSlideEnforcement}
            includeInlineStyleRules={builder.includeInlineStyleRules}
            onChangeIncludeInlineStyleRules={builder.setIncludeInlineStyleRules}
            onApplyPreset={builder.applyPreset}
          />

          <PromptOutputPanel
            selectedStyle={selectedStyle}
            aspectRatio={aspectRatio}
            sceneCount={builder.sceneCount}
            voEnabled={builder.voEnabled}
            ttsTarget={builder.ttsTarget}
            generatedPrompt={builder.generatedPrompt}
            phase2Prompt={builder.phase2Prompt}
            copiedPrompt={copiedKey === 'main-prompt'}
            copiedPhase2={copiedKey === 'phase2-prompt'}
            savedFeedback={savedFeedback}
            onSaveDraft={handleSaveDraft}
            onCopyPrompt={() => void copy('main-prompt', builder.generatedPrompt)}
            onCopyPhase2={() => void copy('phase2-prompt', builder.phase2Prompt)}
          />
        </div>
      </div>
    </section>
  );
}
