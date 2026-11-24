import type { AspectRatio, DurationSec, MotionStyle } from './motion';

export type VoTone = 'santai' | 'formal' | 'storytelling' | 'enerjik';

export type VoLanguage = 'id' | 'en';

export type TtsTarget = 'elevenlabs' | 'capcut' | 'general';

export interface VoiceOverConfig {
  enabled: boolean;
  language: VoLanguage;
  tone: VoTone;
  ttsTarget: TtsTarget;
  includeTimecodes: boolean;
  includeIntonationCues: boolean;
  includeSfx: boolean;
  includeRunningText: boolean;
}

export interface PromptConfig {
  style: MotionStyle;
  aspectRatio: AspectRatio;
  durationSec: DurationSec;
  topic: string;
  targetAudience: string;
  voiceOver: VoiceOverConfig;
  antiSlideEnforcement: boolean;
  includeInlineStyleRules: boolean;
}

export type StudioConfigSnapshot = Omit<PromptConfig, 'style'> & {
  styleId: string;
};

export interface SavedDraft {
  id: string;
  createdAt: string;
  title: string;
  styleId: string;
  styleName: string;
  skillHandle: '@bang-motion' | '@lemo-opuscar';
  aspectRatio: AspectRatio;
  durationSec: DurationSec;
  voEnabled: boolean;
  prompt: string;
  configSnapshot: StudioConfigSnapshot;
}
