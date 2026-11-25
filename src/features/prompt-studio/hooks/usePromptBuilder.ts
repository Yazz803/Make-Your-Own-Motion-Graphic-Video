'use client';

import { type SetStateAction, useCallback, useMemo } from 'react';
import { useStudioConfig } from '@/hooks';
import { MOTION_STYLES, QUICK_BRIEF_PRESETS } from '@/lib/constants';
import {
  buildHybridPhase2FollowUpPrompt,
  buildMotionPrompt,
  buildPhase2FollowUpPrompt,
  estimateSceneCount,
} from '@/lib/prompt-engine';
import { parseStudioConfig } from '@/lib/studio-config';
import type {
  AspectRatio,
  DurationSec,
  HybridClipBalance,
  MotionStyle,
  ProductionMode,
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
  const { config, updateConfig } = useStudioConfig();

  const {
    durationSec,
    topic,
    targetAudience,
    productionMode,
    hybridClip,
    voiceOver,
    antiSlideEnforcement,
    includeInlineStyleRules,
  } = config;

  const {
    enabled: voEnabled,
    language: voLanguage,
    tone: voTone,
    ttsTarget,
    includeTimecodes,
    includeIntonationCues,
    includeSfx,
    includeRunningText,
  } = voiceOver;

  const setDurationSec = useCallback(
    (next: DurationSec) => {
      updateConfig((prev) => ({ ...prev, durationSec: next }));
    },
    [updateConfig]
  );

  const setTopic = useCallback(
    (next: string) => {
      updateConfig((prev) => ({ ...prev, topic: next }));
    },
    [updateConfig]
  );

  const setTargetAudience = useCallback(
    (next: string) => {
      updateConfig((prev) => ({ ...prev, targetAudience: next }));
    },
    [updateConfig]
  );

  const setProductionMode = useCallback(
    (next: ProductionMode) => {
      updateConfig((prev) => ({ ...prev, productionMode: next }));
    },
    [updateConfig]
  );

  const setHybridBalance = useCallback(
    (next: HybridClipBalance) => {
      updateConfig((prev) => ({
        ...prev,
        hybridClip: { ...prev.hybridClip, balance: next },
      }));
    },
    [updateConfig]
  );

  const setHybridReviewBeforeRender = useCallback(
    (next: SetStateAction<boolean>) => {
      updateConfig((prev) => ({
        ...prev,
        hybridClip: {
          ...prev.hybridClip,
          reviewBeforeRender:
            typeof next === 'function'
              ? next(prev.hybridClip.reviewBeforeRender)
              : next,
        },
      }));
    },
    [updateConfig]
  );

  const setHybridAutoCutSilence = useCallback(
    (next: boolean) => {
      updateConfig((prev) => ({
        ...prev,
        hybridClip: { ...prev.hybridClip, autoCutSilence: next },
      }));
    },
    [updateConfig]
  );

  const setHybridClipFocusNote = useCallback(
    (next: string) => {
      updateConfig((prev) => ({
        ...prev,
        hybridClip: { ...prev.hybridClip, clipFocusNote: next },
      }));
    },
    [updateConfig]
  );

  const setHybridIncludeSfx = useCallback(
    (next: boolean) => {
      updateConfig((prev) => ({
        ...prev,
        hybridClip: { ...prev.hybridClip, includeSfx: next },
      }));
    },
    [updateConfig]
  );

  const setHybridIncludeRunningText = useCallback(
    (next: boolean) => {
      updateConfig((prev) => ({
        ...prev,
        hybridClip: { ...prev.hybridClip, includeRunningText: next },
      }));
    },
    [updateConfig]
  );

  const setVoEnabled = useCallback(
    (next: SetStateAction<boolean>) => {
      updateConfig((prev) => ({
        ...prev,
        voiceOver: {
          ...prev.voiceOver,
          enabled:
            typeof next === 'function' ? next(prev.voiceOver.enabled) : next,
        },
      }));
    },
    [updateConfig]
  );

  const setVoLanguage = useCallback(
    (next: VoLanguage) => {
      updateConfig((prev) => ({
        ...prev,
        voiceOver: { ...prev.voiceOver, language: next },
      }));
    },
    [updateConfig]
  );

  const setVoTone = useCallback(
    (next: VoTone) => {
      updateConfig((prev) => ({
        ...prev,
        voiceOver: { ...prev.voiceOver, tone: next },
      }));
    },
    [updateConfig]
  );

  const setTtsTarget = useCallback(
    (next: TtsTarget) => {
      updateConfig((prev) => ({
        ...prev,
        voiceOver: { ...prev.voiceOver, ttsTarget: next },
      }));
    },
    [updateConfig]
  );

  const setIncludeTimecodes = useCallback(
    (next: boolean) => {
      updateConfig((prev) => ({
        ...prev,
        voiceOver: { ...prev.voiceOver, includeTimecodes: next },
      }));
    },
    [updateConfig]
  );

  const setIncludeIntonationCues = useCallback(
    (next: boolean) => {
      updateConfig((prev) => ({
        ...prev,
        voiceOver: { ...prev.voiceOver, includeIntonationCues: next },
      }));
    },
    [updateConfig]
  );

  const setIncludeSfx = useCallback(
    (next: boolean) => {
      updateConfig((prev) => ({
        ...prev,
        voiceOver: { ...prev.voiceOver, includeSfx: next },
      }));
    },
    [updateConfig]
  );

  const setIncludeRunningText = useCallback(
    (next: boolean) => {
      updateConfig((prev) => ({
        ...prev,
        voiceOver: { ...prev.voiceOver, includeRunningText: next },
      }));
    },
    [updateConfig]
  );

  const setAntiSlideEnforcement = useCallback(
    (next: boolean) => {
      updateConfig((prev) => ({ ...prev, antiSlideEnforcement: next }));
    },
    [updateConfig]
  );

  const setIncludeInlineStyleRules = useCallback(
    (next: boolean) => {
      updateConfig((prev) => ({ ...prev, includeInlineStyleRules: next }));
    },
    [updateConfig]
  );

  const generatedPrompt = useMemo(
    () =>
      buildMotionPrompt({
        style: selectedStyle,
        aspectRatio,
        durationSec,
        topic,
        targetAudience,
        productionMode,
        hybridClip,
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
      productionMode,
      hybridClip,
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
      productionMode === 'hybrid-clip'
        ? buildHybridPhase2FollowUpPrompt({
            style: selectedStyle,
            aspectRatio,
            autoCutSilence: hybridClip.autoCutSilence,
            includeSfx: hybridClip.includeSfx,
            includeRunningText: hybridClip.includeRunningText,
          })
        : buildPhase2FollowUpPrompt({
            style: selectedStyle,
            aspectRatio,
            includeSfx,
            includeRunningText,
          }),
    [
      productionMode,
      selectedStyle,
      aspectRatio,
      hybridClip.autoCutSilence,
      hybridClip.includeSfx,
      hybridClip.includeRunningText,
      includeSfx,
      includeRunningText,
    ]
  );

  const sceneCount = estimateSceneCount(durationSec);

  const applyPreset = useCallback(
    (presetId: string) => {
      const preset = QUICK_BRIEF_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      const foundStyle = MOTION_STYLES.find((s) => s.id === preset.styleId);
      if (foundStyle) onSelectStyle(foundStyle);
      onChangeAspectRatio(preset.aspectRatio);
      updateConfig((prev) => ({
        ...prev,
        styleId: foundStyle ? foundStyle.id : prev.styleId,
        aspectRatio: preset.aspectRatio,
        durationSec: preset.durationSec,
        topic: preset.topic,
        targetAudience: preset.audience,
      }));
    },
    [onChangeAspectRatio, onSelectStyle, updateConfig]
  );

  const loadDraft = useCallback(
    (draft: SavedDraft) => {
      const sanitized = parseStudioConfig(JSON.stringify(draft.configSnapshot));
      const foundStyle = MOTION_STYLES.find((s) => s.id === sanitized.styleId);
      if (foundStyle) onSelectStyle(foundStyle);
      onChangeAspectRatio(sanitized.aspectRatio);
      updateConfig(() => sanitized);
    },
    [onChangeAspectRatio, onSelectStyle, updateConfig]
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
      productionMode,
      voEnabled,
      prompt: generatedPrompt,
      configSnapshot: {
        styleId: selectedStyle.id,
        aspectRatio,
        durationSec,
        topic,
        targetAudience,
        productionMode,
        hybridClip,
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
    hybridClip,
    includeInlineStyleRules,
    includeIntonationCues,
    includeRunningText,
    includeSfx,
    includeTimecodes,
    productionMode,
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
    productionMode,
    setProductionMode,
    hybridClip,
    setHybridBalance,
    setHybridReviewBeforeRender,
    setHybridAutoCutSilence,
    setHybridClipFocusNote,
    setHybridIncludeSfx,
    setHybridIncludeRunningText,
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
