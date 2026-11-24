import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { MOTION_STYLES } from '@/lib/constants';
import {
  buildMotionPrompt,
  buildPhase2FollowUpPrompt,
  estimateSceneCount,
} from '@/lib/prompt-engine';

const sampleStyle = MOTION_STYLES[0];

describe('prompt-engine', () => {
  it('estimates scene counts accurately by duration', () => {
    assert.equal(estimateSceneCount(15), 4);
    assert.equal(estimateSceneCount(30), 6);
    assert.equal(estimateSceneCount(45), 8);
    assert.equal(estimateSceneCount(60), 10);
  });

  it('builds a 2-phase VO prompt starting with the style skill handle', () => {
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
    assert.match(prompt, /Naskah Bersih Siap Tempel ke TTS/);
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
});
