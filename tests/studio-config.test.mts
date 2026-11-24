import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { MOTION_STYLES, QUICK_BRIEF_PRESETS } from '@/lib/constants';
import {
  DEFAULT_STUDIO_CONFIG,
  parseStudioConfig,
  resolveMotionStyleById,
  STUDIO_CONFIG_STORAGE_KEY,
} from '@/lib/studio-config';

const ROOT = process.cwd();

describe('studio-config localStorage persistence', () => {
  it('defines a stable storage key and valid default configuration', () => {
    assert.equal(STUDIO_CONFIG_STORAGE_KEY, 'motion_graphic_studio_config_v1');
    assert.equal(DEFAULT_STUDIO_CONFIG.styleId, MOTION_STYLES[0].id);
    assert.equal(DEFAULT_STUDIO_CONFIG.aspectRatio, '9:16');
    assert.equal(DEFAULT_STUDIO_CONFIG.durationSec, 30);
    assert.equal(DEFAULT_STUDIO_CONFIG.topic, QUICK_BRIEF_PRESETS[0].topic);
    assert.equal(
      DEFAULT_STUDIO_CONFIG.targetAudience,
      QUICK_BRIEF_PRESETS[0].audience
    );
    assert.equal(DEFAULT_STUDIO_CONFIG.voiceOver.enabled, true);
    assert.equal(DEFAULT_STUDIO_CONFIG.voiceOver.ttsTarget, 'elevenlabs');
  });

  it('falls back to defaults when raw storage is null or malformed JSON', () => {
    assert.deepEqual(parseStudioConfig(null), DEFAULT_STUDIO_CONFIG);
    assert.deepEqual(parseStudioConfig(''), DEFAULT_STUDIO_CONFIG);
    assert.deepEqual(parseStudioConfig('{broken-json'), DEFAULT_STUDIO_CONFIG);
    assert.deepEqual(parseStudioConfig('[]'), DEFAULT_STUDIO_CONFIG);
  });

  it('restores valid persisted settings including empty strings and false flags', () => {
    const customStyle = MOTION_STYLES[MOTION_STYLES.length - 1];
    const saved = {
      styleId: customStyle.id,
      aspectRatio: '16:9',
      durationSec: 60,
      topic: '',
      targetAudience: '',
      voiceOver: {
        enabled: false,
        language: 'en',
        tone: 'formal',
        ttsTarget: 'capcut',
        includeTimecodes: false,
        includeIntonationCues: false,
        includeSfx: false,
        includeRunningText: false,
      },
      antiSlideEnforcement: false,
      includeInlineStyleRules: false,
    };

    const parsed = parseStudioConfig(JSON.stringify(saved));
    assert.deepEqual(parsed, saved);
  });

  it('sanitizes invalid fields individually while preserving valid sibling fields', () => {
    const validStyle = MOTION_STYLES[2];
    const partialCorrupt = {
      styleId: validStyle.id,
      aspectRatio: '4:3',
      durationSec: 999,
      topic: 'Topik kustom tersimpan',
      targetAudience: 12345,
      voiceOver: {
        enabled: 'yes',
        language: 'en',
        tone: 'invalid-tone',
        ttsTarget: 'general',
        includeTimecodes: false,
      },
      antiSlideEnforcement: false,
    };

    const parsed = parseStudioConfig(JSON.stringify(partialCorrupt));
    assert.equal(parsed.styleId, validStyle.id);
    assert.equal(parsed.aspectRatio, DEFAULT_STUDIO_CONFIG.aspectRatio);
    assert.equal(parsed.durationSec, DEFAULT_STUDIO_CONFIG.durationSec);
    assert.equal(parsed.topic, 'Topik kustom tersimpan');
    assert.equal(parsed.targetAudience, DEFAULT_STUDIO_CONFIG.targetAudience);
    assert.equal(
      parsed.voiceOver.enabled,
      DEFAULT_STUDIO_CONFIG.voiceOver.enabled
    );
    assert.equal(parsed.voiceOver.language, 'en');
    assert.equal(parsed.voiceOver.tone, DEFAULT_STUDIO_CONFIG.voiceOver.tone);
    assert.equal(parsed.voiceOver.ttsTarget, 'general');
    assert.equal(parsed.voiceOver.includeTimecodes, false);
    assert.equal(
      parsed.voiceOver.includeIntonationCues,
      DEFAULT_STUDIO_CONFIG.voiceOver.includeIntonationCues
    );
    assert.equal(parsed.antiSlideEnforcement, false);
    assert.equal(
      parsed.includeInlineStyleRules,
      DEFAULT_STUDIO_CONFIG.includeInlineStyleRules
    );
  });

  it('resolves motion style by id with safe fallback', () => {
    const target = MOTION_STYLES[5];
    assert.equal(resolveMotionStyleById(target.id).id, target.id);
    assert.equal(
      resolveMotionStyleById('non-existent-style').id,
      MOTION_STYLES[0].id
    );
  });

  it('wires useStudioConfig into MotionWorkspace and usePromptBuilder', () => {
    const workspace = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/workspace/components/MotionWorkspace.tsx'
      ),
      'utf8'
    );
    const builder = fs.readFileSync(
      path.join(ROOT, 'src/features/prompt-studio/hooks/usePromptBuilder.ts'),
      'utf8'
    );

    assert.match(workspace, /useStudioConfig/);
    assert.match(builder, /useStudioConfig/);
  });
});
