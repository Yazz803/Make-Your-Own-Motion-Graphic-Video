import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import {
  ELEVENLABS_V4_ALL_TAGS,
  ELEVENLABS_V4_STABILITY_PERCENT,
  ELEVENLABS_V4_TAG_GROUPS,
  MOTION_STYLES,
} from '@/lib/constants';
import {
  buildMotionPrompt,
  buildPhase2FollowUpPrompt,
  estimateSceneCount,
} from '@/lib/prompt-engine';

const ROOT = process.cwd();
const sampleStyle = MOTION_STYLES[0];
const elevenLabsTagsDoc = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, 'docs/eleven-labs/tags-eleven-labs-v4.json'),
    'utf8'
  )
) as {
  all_tags: string[];
  categories: Record<string, string[]>;
  total_tags: number;
};

describe('prompt-engine', () => {
  it('estimates scene counts accurately by duration', () => {
    assert.equal(estimateSceneCount(15), 4);
    assert.equal(estimateSceneCount(30), 6);
    assert.equal(estimateSceneCount(45), 8);
    assert.equal(estimateSceneCount(60), 10);
  });

  it('builds a 2-phase ElevenLabs V4 VO prompt requiring all official audio tags', () => {
    const prompt = buildMotionPrompt({
      style: sampleStyle,
      aspectRatio: '9:16',
      durationSec: 30,
      topic: 'Cara kerja baterai solid-state',
      targetAudience: 'Penonton TikTok edukasi teknologi',
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
    });

    assert.ok(prompt.startsWith(sampleStyle.skillHandle));
    assert.match(prompt, /## 1\. BRIEF PRODUKSI/);
    assert.match(prompt, /## 2\. PANDUAN GAYA VISUAL & ARAHAN KAMERA/);
    assert.match(prompt, /## 3\. ATURAN ANTI-SLIDE/);
    assert.match(prompt, /## 4\. ALUR 2 TAHAP DENGAN VOICE OVER/);
    assert.match(prompt, /TAHAP 1/);
    assert.match(prompt, /TAHAP 2/);
    assert.match(prompt, /Sound Effect \(SFX\)/);
    assert.match(prompt, /Running Text Per Kata/);
    assert.match(prompt, /ElevenLabs V4/);
    assert.doesNotMatch(prompt, /tanpa tag apa pun/);
    assert.match(prompt, /Naskah Siap Tempel ke ElevenLabs V4/);

    assert.equal(elevenLabsTagsDoc.all_tags.length, elevenLabsTagsDoc.total_tags);
    for (const tag of elevenLabsTagsDoc.all_tags) {
      assert.ok(
        prompt.includes(tag),
        `Expected ElevenLabs V4 prompt to include tag ${tag}`
      );
    }
  });

  it('still requires ElevenLabs V4 tags even when intonation cues checkbox is off', () => {
    const prompt = buildMotionPrompt({
      style: sampleStyle,
      aspectRatio: '16:9',
      durationSec: 30,
      topic: 'Sejarah semikonduktor',
      targetAudience: 'Penonton YouTube teknologi',
      voiceOver: {
        enabled: true,
        language: 'id',
        tone: 'formal',
        ttsTarget: 'elevenlabs',
        includeTimecodes: false,
        includeIntonationCues: false,
        includeSfx: true,
        includeRunningText: true,
      },
      antiSlideEnforcement: true,
      includeInlineStyleRules: true,
    });

    assert.match(prompt, /ElevenLabs V4/);
    for (const tag of elevenLabsTagsDoc.all_tags) {
      assert.ok(
        prompt.includes(tag),
        `Expected ElevenLabs V4 prompt to include tag ${tag} even without intonation cues`
      );
    }
  });

  it('keeps clean tag-free TTS block for non-ElevenLabs targets (capcut/general)', () => {
    const prompt = buildMotionPrompt({
      style: sampleStyle,
      aspectRatio: '9:16',
      durationSec: 30,
      topic: 'Tips produktivitas pagi',
      targetAudience: 'Pekerja remote',
      voiceOver: {
        enabled: true,
        language: 'id',
        tone: 'santai',
        ttsTarget: 'capcut',
        includeTimecodes: true,
        includeIntonationCues: true,
        includeSfx: true,
        includeRunningText: true,
      },
      antiSlideEnforcement: true,
      includeInlineStyleRules: true,
    });

    assert.match(prompt, /Naskah Bersih Siap Tempel ke TTS/);
    assert.match(prompt, /tanpa tag apa pun/);
    assert.doesNotMatch(prompt, /\[witch voice\]/);
    assert.doesNotMatch(prompt, /\[drunken voice\]/);
  });

  it('builds a direct MP4 prompt when VO is disabled and omits inline rules when toggled off', () => {
    const prompt = buildMotionPrompt({
      style: sampleStyle,
      aspectRatio: '16:9',
      durationSec: 15,
      topic: '   ',
      targetAudience: '',
      voiceOver: {
        enabled: false,
        language: 'en',
        tone: 'enerjik',
        ttsTarget: 'general',
        includeTimecodes: false,
        includeIntonationCues: false,
        includeSfx: false,
        includeRunningText: true,
      },
      antiSlideEnforcement: false,
      includeInlineStyleRules: false,
    });

    assert.match(prompt, /\[Tulis topik atau ide utama video motion graphic kamu di sini\]/);
    assert.match(prompt, /Penonton umum digital/);
    assert.match(prompt, /## 2\. REFERENSI GAYA DARI KEAHLIAN TERPASANG/);
    assert.match(prompt, /## 3\. OUTPUT VIDEO MOTION GRAPHIC \(TANPA VOICE OVER\)/);
    assert.doesNotMatch(prompt, /ATURAN ANTI-SLIDE/);
    assert.doesNotMatch(prompt, /Running Text Per Kata/);
    assert.doesNotMatch(prompt, /Sound Effect \(SFX\)/);
  });

  it('builds phase 2 follow-up prompt with optional SFX and running text', () => {
    const followUp = buildPhase2FollowUpPrompt({
      style: sampleStyle,
      aspectRatio: '1:1',
      includeSfx: true,
      includeRunningText: false,
    });

    assert.ok(followUp.startsWith(sampleStyle.skillHandle));
    assert.match(followUp, /1:1/);
    assert.match(followUp, /Sound Effect \(SFX\)/);
    assert.doesNotMatch(followUp, /Running Text/);
  });

  it('exposes ElevenLabs V4 label, 40 tags parity, and Stability 60% guidance in PromptStudio UI', () => {
    assert.equal(ELEVENLABS_V4_STABILITY_PERCENT, 60);
    assert.deepEqual(ELEVENLABS_V4_ALL_TAGS, elevenLabsTagsDoc.all_tags);
    assert.equal(
      ELEVENLABS_V4_TAG_GROUPS.reduce((sum, g) => sum + g.tags.length, 0),
      elevenLabsTagsDoc.total_tags
    );

    const voControls = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/prompt-studio/components/VoiceOverControlsSection.tsx'
      ),
      'utf8'
    );
    const elevenLabsGuidance = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/prompt-studio/components/ElevenLabsV4Guidance.tsx'
      ),
      'utf8'
    );
    const outputPanel = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/prompt-studio/components/PromptOutputPanel.tsx'
      ),
      'utf8'
    );
    const promptStudio = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/prompt-studio/components/PromptStudio.tsx'
      ),
      'utf8'
    );

    assert.match(voControls, />ElevenLabs V4</);
    assert.doesNotMatch(voControls, />ElevenLabs</);
    assert.match(voControls, /<ElevenLabsV4Guidance\s*\/>/);
    assert.match(elevenLabsGuidance, /Stability/);
    assert.match(elevenLabsGuidance, /ELEVENLABS_V4_STABILITY_PERCENT/);
    assert.match(elevenLabsGuidance, /Creative/);
    assert.match(elevenLabsGuidance, /Natural/);
    assert.match(elevenLabsGuidance, /Robust/);
    assert.match(promptStudio, /ttsTarget=\{builder\.ttsTarget\}/);
    assert.match(outputPanel, /ElevenLabs V4/);
    assert.match(outputPanel, /Stability/);
    assert.match(outputPanel, /ELEVENLABS_V4_STABILITY_PERCENT/);
  });
});
