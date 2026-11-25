import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import {
  ELEVENLABS_V4_ALL_TAGS,
  ELEVENLABS_V4_STABILITY_PERCENT,
  ELEVENLABS_V4_TAG_GROUPS,
  HYBRID_CLIP_BALANCES,
  MOTION_STYLES,
} from '@/lib/constants';
import {
  buildHybridPhase2FollowUpPrompt,
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

  it('keeps Full Motion Graphic prompt identical to legacy default prompt', () => {
    const baseConfig = {
      style: sampleStyle,
      aspectRatio: '9:16' as const,
      durationSec: 30 as const,
      topic: 'Cara kerja baterai solid-state',
      targetAudience: 'Penonton TikTok edukasi teknologi',
      voiceOver: {
        enabled: true,
        language: 'id' as const,
        tone: 'storytelling' as const,
        ttsTarget: 'elevenlabs' as const,
        includeTimecodes: true,
        includeIntonationCues: true,
        includeSfx: true,
        includeRunningText: true,
      },
      antiSlideEnforcement: true,
      includeInlineStyleRules: true,
    };

    const legacyPrompt = buildMotionPrompt(baseConfig);
    const explicitFullPrompt = buildMotionPrompt({
      ...baseConfig,
      productionMode: 'full-motion',
    });

    assert.equal(explicitFullPrompt, legacyPrompt);
  });

  it('builds Hybrid (Motion Graphic + Video Clip) prompt using original clip audio, flexible duration, and auto-cut silence without VO upload', () => {
    const prompt = buildMotionPrompt({
      style: sampleStyle,
      aspectRatio: '9:16',
      durationSec: 30,
      topic: 'Sorot argumen utama pembicara lalu visualisasikan datanya',
      targetAudience: 'Penonton Reels & TikTok',
      productionMode: 'hybrid-clip',
      hybridClip: {
        balance: 'balanced',
        reviewBeforeRender: true,
        autoCutSilence: true,
        clipFocusNote: 'Pakai detik 00:03-00:11 sebagai hook pembuka',
        includeSfx: true,
        includeRunningText: true,
      },
      voiceOver: {
        enabled: true,
        language: 'id',
        tone: 'storytelling',
        ttsTarget: 'elevenlabs',
        includeTimecodes: true,
        includeIntonationCues: true,
        includeSfx: false,
        includeRunningText: false,
      },
      antiSlideEnforcement: true,
      includeInlineStyleRules: true,
    });

    assert.ok(prompt.startsWith(sampleStyle.skillHandle));
    assert.match(prompt, /## 1\. BRIEF PRODUKSI HYBRID/);
    assert.match(prompt, /Komposisi Visual Hybrid: Seimbang/);
    assert.match(prompt, /Auto-Cut Jeda Hening \(Dead Air\): Aktif/);
    assert.match(prompt, /Catatan Momen \/ Fokus Clip: Pakai detik 00:03-00:11/);
    assert.match(prompt, /Durasi Video Final \(Fleksibel\)/);
    assert.match(prompt, /boleh lebih pendek/);
    assert.match(prompt, /lebih panjang/);
    assert.match(prompt, /TIDAK PERLU MEMBUAT NASKAH VO BARU ATAU MEMINTA UPLOAD AUDIO VO TERPISAH/);
    assert.match(prompt, /WAJIB Auto-Cut Jeda Hening \(Dead Air\) & Sambungan Audio Halus/);
    assert.match(prompt, /audio crossfade halus/);
    assert.match(prompt, /WAJIB Transisi Hanya di Jeda Alami & Semulus Mungkin/);
    assert.match(prompt, /\*\*DILARANG\*\* membuat 100% full motion graphic/);
    assert.match(prompt, /\*\*beberapa cuplikan visual dari video clip asli\*\*/);
    assert.match(prompt, /ALUR 2 TAHAP HYBRID: REVIEW TRANSKRIP & STORYBOARD DULU/);
    assert.match(prompt, /BERHENTI DI TAHAP INI/);
    assert.match(prompt, /Sound Effect \(SFX\)/);
    assert.match(prompt, /Running Text Per Kata/);
    assert.doesNotMatch(prompt, /Kategori Video Clip/);
    assert.doesNotMatch(prompt, /potongan terbaik/);
    assert.doesNotMatch(prompt, /momen visual terbaik/);
    assert.doesNotMatch(prompt, /Target Durasi Total: 30 detik/);
    assert.doesNotMatch(prompt, /ALUR 2 TAHAP DENGAN VOICE OVER/);
    assert.doesNotMatch(prompt, /ElevenLabs V4/);
    assert.doesNotMatch(prompt, /meng-upload file audio Voice Over/);
  });

  it('supports direct 1-turn Hybrid render mode and Hybrid phase 2 follow-up prompt without ambiguity', () => {
    const directPrompt = buildMotionPrompt({
      style: sampleStyle,
      aspectRatio: '16:9',
      durationSec: 60,
      topic: 'Diskusi filosofi kerja',
      targetAudience: 'Penonton YouTube',
      productionMode: 'hybrid-clip',
      hybridClip: {
        balance: 'clip-heavy',
        reviewBeforeRender: false,
        autoCutSilence: true,
        clipFocusNote: '',
        includeSfx: true,
        includeRunningText: true,
      },
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

    assert.match(directPrompt, /ALUR EKSEKUSI LANGSUNG 1 GILIRAN \(\.MP4\)/);
    assert.match(directPrompt, /DILARANG BERHENTI HANYA DI TABEL STORYBOARD/);
    assert.match(directPrompt, /pangkas jeda hening/);
    assert.doesNotMatch(directPrompt, /BERHENTI DI TAHAP INI/);
    assert.doesNotMatch(directPrompt, /potongan terbaik/);

    const hybridPhase2 = buildHybridPhase2FollowUpPrompt({
      style: sampleStyle,
      aspectRatio: '9:16',
      autoCutSilence: true,
      includeSfx: true,
      includeRunningText: true,
    });
    assert.ok(hybridPhase2.startsWith(sampleStyle.skillHandle));
    assert.match(hybridPhase2, /Transkrip dan pembagian segmen Storyboard Hybrid/);
    assert.match(hybridPhase2, /boleh lebih pendek atau lebih panjang/);
    assert.match(hybridPhase2, /auto-cut jeda hening/);
    assert.match(hybridPhase2, /jeda alami kalimat/);
    assert.match(hybridPhase2, /Sound Effect \(SFX\)/);
    assert.match(hybridPhase2, /Running Text/);
    assert.doesNotMatch(hybridPhase2, /audio Voice Over/);
  });

  it('supports all 3 hybrid balances and autoCutSilence toggle in prompt-engine', () => {
    assert.equal(HYBRID_CLIP_BALANCES.length, 3);

    for (const balance of HYBRID_CLIP_BALANCES) {
      const prompt = buildMotionPrompt({
        style: sampleStyle,
        aspectRatio: '16:9',
        durationSec: 45,
        topic: '   ',
        targetAudience: '',
        productionMode: 'hybrid-clip',
        hybridClip: {
          balance: balance.id,
          reviewBeforeRender: true,
          autoCutSilence: false,
          clipFocusNote: '   ',
          includeSfx: false,
          includeRunningText: false,
        },
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
        antiSlideEnforcement: false,
        includeInlineStyleRules: false,
      });

      assert.ok(prompt.includes(balance.promptRule));
      assert.match(prompt, /Auto-Cut Jeda Hening \(Dead Air\): Nonaktif/);
      assert.doesNotMatch(prompt, /WAJIB Auto-Cut Jeda Hening/);
      assert.doesNotMatch(prompt, /Kategori Video Clip/);
      assert.doesNotMatch(prompt, /potongan terbaik/);
      assert.doesNotMatch(prompt, /momen visual terbaik/);
      assert.doesNotMatch(prompt, /Catatan Momen \/ Fokus Clip/);
      assert.doesNotMatch(prompt, /ATURAN ANTI-SLIDE/);
      assert.doesNotMatch(prompt, /Sound Effect \(SFX\)/);
      assert.doesNotMatch(prompt, /Running Text Per Kata/);
    }
  });

  it('renders Full Motion Graphic and Hybrid choices above topic label, hides duration & clip category in Hybrid, and wires Auto-Cut UI', () => {
    const controlsForm = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/prompt-studio/components/PromptControlsForm.tsx'
      ),
      'utf8'
    );
    const hybridControls = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/prompt-studio/components/HybridClipControlsSection.tsx'
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

    const fullIdx = controlsForm.indexOf('Full Motion Graphic');
    const hybridIdx = controlsForm.indexOf(
      'Hybrid (Motion Graphic + Video Clip)'
    );
    const topicIdx = controlsForm.indexOf(
      'Ide atau Topik Video Motion Graphic'
    );

    assert.ok(fullIdx !== -1, 'Full Motion Graphic option must exist');
    assert.ok(hybridIdx !== -1, 'Hybrid option must exist');
    assert.ok(topicIdx !== -1, 'Topic label must exist');
    assert.ok(
      fullIdx < topicIdx && hybridIdx < topicIdx,
      'Mode choices must appear above "Ide atau Topik Video Motion Graphic"'
    );

    assert.match(controlsForm, /\{!isHybridMode && \([\s\S]*Target Durasi Video/);
    assert.match(controlsForm, /HybridClipControlsSection/);
    assert.doesNotMatch(hybridControls, /Kategori Video Clip/);
    assert.match(hybridControls, /HYBRID_CLIP_BALANCES/);
    assert.match(hybridControls, /Review Transkrip Dulu/);
    assert.match(hybridControls, /Auto-Cut Jeda Hening \(Dead Air\)/);
    assert.equal(/rounded-full/.test(hybridControls.replace(/rounded-full bg-\[#09090B\]|rounded-full border/g, '')), false);
    assert.match(outputPanel, /Alur Hybrid di Gemini Web/);
    assert.match(outputPanel, /Durasi fleksibel · Hybrid/);
    assert.match(outputPanel, /Tidak perlu upload audio VO terpisah/);
  });
});
