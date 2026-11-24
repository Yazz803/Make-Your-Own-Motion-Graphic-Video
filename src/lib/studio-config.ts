import { MOTION_STYLES, QUICK_BRIEF_PRESETS } from '@/lib/constants';
import type {
  AspectRatio,
  DurationSec,
  MotionStyle,
  StudioConfigSnapshot,
  TtsTarget,
  VoLanguage,
  VoTone,
} from '@/types';

export const STUDIO_CONFIG_STORAGE_KEY = 'motion_graphic_studio_config_v1';

export const DEFAULT_STUDIO_CONFIG: StudioConfigSnapshot = {
  styleId: MOTION_STYLES[0].id,
  aspectRatio: '9:16',
  durationSec: 30,
  topic: QUICK_BRIEF_PRESETS[0].topic,
  targetAudience: QUICK_BRIEF_PRESETS[0].audience,
  voiceOver: {
    enabled: true,
    language: 'id',
    tone: 'storytelling',
    ttsTarget: 'elevenlabs',
    includeTimecodes: true,
    includeIntonationCues: true,
    includeSfx: true,
    includeRunningText: true,
  },
  antiSlideEnforcement: true,
  includeInlineStyleRules: true,
};

export const DEFAULT_STUDIO_CONFIG_RAW = JSON.stringify(DEFAULT_STUDIO_CONFIG);

const VALID_STYLE_IDS = new Set<string>(MOTION_STYLES.map((s) => s.id));
const VALID_ASPECT_RATIOS = new Set<AspectRatio>(['9:16', '16:9', '1:1']);
const VALID_DURATIONS = new Set<DurationSec>([15, 30, 45, 60]);
const VALID_VO_LANGUAGES = new Set<VoLanguage>(['id', 'en']);
const VALID_VO_TONES = new Set<VoTone>([
  'santai',
  'formal',
  'storytelling',
  'enerjik',
]);
const VALID_TTS_TARGETS = new Set<TtsTarget>([
  'elevenlabs',
  'capcut',
  'general',
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function resolveMotionStyleById(styleId: string): MotionStyle {
  return MOTION_STYLES.find((s) => s.id === styleId) ?? MOTION_STYLES[0];
}

export function parseStudioConfig(raw: string | null): StudioConfigSnapshot {
  if (!raw) return DEFAULT_STUDIO_CONFIG;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return DEFAULT_STUDIO_CONFIG;
  }

  if (!isPlainObject(parsed)) return DEFAULT_STUDIO_CONFIG;

  const voRaw = isPlainObject(parsed.voiceOver) ? parsed.voiceOver : {};
  const defaultVo = DEFAULT_STUDIO_CONFIG.voiceOver;

  return {
    styleId:
      typeof parsed.styleId === 'string' && VALID_STYLE_IDS.has(parsed.styleId)
        ? parsed.styleId
        : DEFAULT_STUDIO_CONFIG.styleId,
    aspectRatio:
      typeof parsed.aspectRatio === 'string' &&
      VALID_ASPECT_RATIOS.has(parsed.aspectRatio as AspectRatio)
        ? (parsed.aspectRatio as AspectRatio)
        : DEFAULT_STUDIO_CONFIG.aspectRatio,
    durationSec:
      typeof parsed.durationSec === 'number' &&
      VALID_DURATIONS.has(parsed.durationSec as DurationSec)
        ? (parsed.durationSec as DurationSec)
        : DEFAULT_STUDIO_CONFIG.durationSec,
    topic:
      typeof parsed.topic === 'string'
        ? parsed.topic
        : DEFAULT_STUDIO_CONFIG.topic,
    targetAudience:
      typeof parsed.targetAudience === 'string'
        ? parsed.targetAudience
        : DEFAULT_STUDIO_CONFIG.targetAudience,
    voiceOver: {
      enabled:
        typeof voRaw.enabled === 'boolean' ? voRaw.enabled : defaultVo.enabled,
      language:
        typeof voRaw.language === 'string' &&
        VALID_VO_LANGUAGES.has(voRaw.language as VoLanguage)
          ? (voRaw.language as VoLanguage)
          : defaultVo.language,
      tone:
        typeof voRaw.tone === 'string' &&
        VALID_VO_TONES.has(voRaw.tone as VoTone)
          ? (voRaw.tone as VoTone)
          : defaultVo.tone,
      ttsTarget:
        typeof voRaw.ttsTarget === 'string' &&
        VALID_TTS_TARGETS.has(voRaw.ttsTarget as TtsTarget)
          ? (voRaw.ttsTarget as TtsTarget)
          : defaultVo.ttsTarget,
      includeTimecodes:
        typeof voRaw.includeTimecodes === 'boolean'
          ? voRaw.includeTimecodes
          : defaultVo.includeTimecodes,
      includeIntonationCues:
        typeof voRaw.includeIntonationCues === 'boolean'
          ? voRaw.includeIntonationCues
          : defaultVo.includeIntonationCues,
      includeSfx:
        typeof voRaw.includeSfx === 'boolean'
          ? voRaw.includeSfx
          : defaultVo.includeSfx,
      includeRunningText:
        typeof voRaw.includeRunningText === 'boolean'
          ? voRaw.includeRunningText
          : defaultVo.includeRunningText,
    },
    antiSlideEnforcement:
      typeof parsed.antiSlideEnforcement === 'boolean'
        ? parsed.antiSlideEnforcement
        : DEFAULT_STUDIO_CONFIG.antiSlideEnforcement,
    includeInlineStyleRules:
      typeof parsed.includeInlineStyleRules === 'boolean'
        ? parsed.includeInlineStyleRules
        : DEFAULT_STUDIO_CONFIG.includeInlineStyleRules,
  };
}
