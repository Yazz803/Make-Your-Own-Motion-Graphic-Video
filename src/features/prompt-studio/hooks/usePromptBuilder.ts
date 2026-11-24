'use client';

import { useCallback, useMemo, useState } from 'react';
import { MOTION_STYLES, QUICK_BRIEF_PRESETS } from '@/lib/constants';
import {
  buildMotionPrompt,
  buildPhase2FollowUpPrompt,
  estimateSceneCount,
} from '@/lib/prompt-engine';
import type {
  AspectRatio,
  DurationSec,
  MotionStyle,
  SavedDraft,
  TtsTarget,
  VoLanguage,
  VoTone,
} from '@/types';

interface UsePromptBuilderParams {
  selectedStyle: MotionStyle;
  onSelectStyle: (style: MotionStyle) => void;
  aspectRatio: AspectRatio;
  onChangeAspectRatio: (ratio: AspectRatio) => void;
}

export function usePromptBuilder({
  selectedStyle,
  onSelectStyle,
  aspectRatio,
  onChangeAspectRatio,
}: UsePromptBuilderParams) {
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

  const applyPreset = useCallback(
    (presetId: string) => {
      const preset = QUICK_BRIEF_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      const foundStyle = MOTION_STYLES.find((s) => s.id === preset.styleId);
      if (foundStyle) onSelectStyle(foundStyle);
      onChangeAspectRatio(preset.aspectRatio);
      setDurationSec(preset.durationSec);
      setTopic(preset.topic);
      setTargetAudience(preset.audience);
    },
    [onChangeAspectRatio, onSelectStyle]
  );

  const loadDraft = useCallback(
    (draft: SavedDraft) => {
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
    },
    [onChangeAspectRatio, onSelectStyle]
  );

  const createDraftEntry = useCallback((): SavedDraft => {
    const trimmedTopic = topic.trim();
    const cleanTitle = trimmedTopic
      ? trimmedTopic.slice(0, 56) + (trimmedTopic.length > 56 ? '…' : '')
      : `Draft ${selectedStyle.name}`;

    return {
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
  }, [
    antiSlideEnforcement,
    aspectRatio,
    durationSec,
    generatedPrompt,
    includeInlineStyleRules,
    includeIntonationCues,
    includeRunningText,
    includeSfx,
    includeTimecodes,
    selectedStyle,
    targetAudience,
    topic,
    ttsTarget,
    voEnabled,
    voLanguage,
    voTone,
  ]);

  return {
    durationSec,
    setDurationSec,
    topic,
    setTopic,
    targetAudience,
    setTargetAudience,
    voEnabled,
    setVoEnabled,
    voLanguage,
    setVoLanguage,
    voTone,
    setVoTone,
    ttsTarget,
    setTtsTarget,
    includeTimecodes,
    setIncludeTimecodes,
    includeIntonationCues,
    setIncludeIntonationCues,
    includeSfx,
    setIncludeSfx,
    includeRunningText,
    setIncludeRunningText,
    antiSlideEnforcement,
    setAntiSlideEnforcement,
    includeInlineStyleRules,
    setIncludeInlineStyleRules,
    generatedPrompt,
    phase2Prompt,
    sceneCount,
    applyPreset,
    loadDraft,
    createDraftEntry,
  };
}
