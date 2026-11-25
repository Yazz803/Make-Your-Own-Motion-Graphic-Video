import type { AspectRatio, DurationSec, MotionStyle } from './motion';

export type ProductionMode = 'full-motion' | 'hybrid-clip';

export type HybridClipBalance = 'balanced' | 'clip-heavy' | 'motion-heavy';

export interface HybridClipConfig {
  balance: HybridClipBalance;
  reviewBeforeRender: boolean;
  autoCutSilence: boolean;
  clipFocusNote: string;
  includeSfx: boolean;
  includeRunningText: boolean;
}

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
  productionMode?: ProductionMode;
  hybridClip?: HybridClipConfig;
  voiceOver: VoiceOverConfig;
  antiSlideEnforcement: boolean;
  includeInlineStyleRules: boolean;
}

export type StudioConfigSnapshot = Omit<
  PromptConfig,
  'style' | 'productionMode' | 'hybridClip'
> & {
  styleId: string;
  productionMode: ProductionMode;
  hybridClip: HybridClipConfig;
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
  productionMode?: ProductionMode;
  voEnabled: boolean;
  prompt: string;
  configSnapshot: StudioConfigSnapshot;
}
