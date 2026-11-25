import {
  ELEVENLABS_V4_ALL_TAGS,
  ELEVENLABS_V4_STABILITY_PERCENT,
  ELEVENLABS_V4_TAG_FORMAT,
  ELEVENLABS_V4_TAG_GROUPS,
  HYBRID_CLIP_BALANCE_MAP,
  VIDEO_CLIP_CATEGORY_MAP,
} from '@/lib/constants';
import type {
  AspectRatio,
  DurationSec,
  HybridClipConfig,
  MotionStyle,
  PromptConfig,
  TtsTarget,
  VoTone,
} from '@/types';

const ASPECT_RATIO_SPECS: Record<
  AspectRatio,
  { label: string; resolution: string; platform: string; framingNote: string }
> = {
  '9:16': {
    label: 'Vertikal (9:16)',
    resolution: '1080 × 1920 px',
    platform: 'TikTok, Instagram Reels, YouTube Shorts',
    framingNote:
      'Susun komposisi vertikal yang aman dari area UI bawah/kanan (safe zone 15% bawah & 12% atas), teks dan running text besar mudah dibaca di layar ponsel.',
  },
  '16:9': {
    label: 'Lanskap (16:9)',
    resolution: '1920 × 1080 px',
    platform: 'YouTube, Presentasi Layar Lebar, Landing Page',
    framingNote:
      'Manfaatkan ruang horizontal sinematik (rule of thirds) dengan gerak pan kiri-kanan dan area bawah yang bersih untuk running text.',
  },
  '1:1': {
    label: 'Persegi (1:1)',
    resolution: '1080 × 1080 px',
    platform: 'Feed Instagram, LinkedIn, Carousel Video',
    framingNote:
      'Pusatkan titik fokus (focal anchor) di tengah kanvas dengan margin seimbang di keempat sisi.',
  },
};

const TONE_LABELS: Record<VoTone, string> = {
  santai: 'Santai, percakapan akrab, natural (seperti kreator edukasi modern)',
  formal: 'Formal, jernih, kredibel, dan terstruktur',
  storytelling: 'Storytelling sinematik, mengalir, membangun rasa ingin tahu',
  enerjik: 'Enerjik, cepat, hook kuat di 3 detik pertama untuk retensi tinggi',
};

const TTS_TARGET_NOTES: Record<TtsTarget, string> = {
  elevenlabs:
    'Optimalkan untuk ElevenLabs V4: WAJIB menyisipkan Audio Tags resmi ElevenLabs V4 (format persis dengan tanda kurung siku [...]) langsung di dalam naskah Voice Over secara kontekstual, gunakan tanda baca natural, dan hindari singkatan ambigu agar pelafalan stabil.',
  capcut:
    'Optimalkan untuk CapCut Voice / TTS: pecah menjadi kalimat pendek per 3–5 detik agar ritme bacaan rapi.',
  general:
    'Format bersih siap salin ke layanan Voice Over pihak ketiga mana pun (ElevenLabs V4, CapCut, Murf, atau rekaman suara manual).',
};

const DEFAULT_HYBRID_CLIP: HybridClipConfig = {
  category: 'viral-hook',
  balance: 'balanced',
  clipFocusNote: '',
  includeSfx: true,
  includeRunningText: true,
};

export function estimateSceneCount(durationSec: DurationSec): number {
  if (durationSec <= 15) return 4;
  if (durationSec <= 30) return 6;
  if (durationSec <= 45) return 8;
  return 10;
}

function buildHybridMotionPrompt(config: PromptConfig): string {
  const ratio = ASPECT_RATIO_SPECS[config.aspectRatio];
  const sceneCount = estimateSceneCount(config.durationSec);
  const hybrid = config.hybridClip ?? DEFAULT_HYBRID_CLIP;
  const categoryMeta =
    VIDEO_CLIP_CATEGORY_MAP[hybrid.category] ??
    VIDEO_CLIP_CATEGORY_MAP['viral-hook'];
  const balanceMeta =
    HYBRID_CLIP_BALANCE_MAP[hybrid.balance] ??
    HYBRID_CLIP_BALANCE_MAP.balanced;
  const cleanTopic =
    config.topic.trim() ||
    '[Tulis konteks, pesan utama, atau bagian video clip yang ingin ditonjolkan di sini]';
  const cleanFocusNote = hybrid.clipFocusNote.trim();
  const cleanAudience = config.targetAudience.trim() || 'Penonton umum digital';
  const skillTag = config.style.skillHandle;

  const sections: string[] = [];

  sections.push(
    `${skillTag} Gunakan keahlian ${skillTag} (mode Tugas) untuk merancang dan memproduksi video **Hybrid (Motion Graphic + Cuplikan Video Clip Asli)** sesuai spesifikasi di bawah ini menggunakan file video clip yang saya upload di chat ini.`
  );

  const briefLines = [
    '## 1. BRIEF PRODUKSI HYBRID',
    '- Mode Produksi: Hybrid (Perpaduan Cuplikan Video Clip Asli + Adegan Motion Graphic)',
    `- Kategori Video Clip: ${categoryMeta.label} — ${categoryMeta.briefSummary}`,
    `- Komposisi Visual Hybrid: ${balanceMeta.label} (${balanceMeta.ratioLabel})`,
    `- Topik / Konteks Video: ${cleanTopic}`,
  ];
  if (cleanFocusNote) {
    briefLines.push(`- Catatan Momen / Fokus Clip: ${cleanFocusNote}`);
  }
  briefLines.push(
    `- Target Audiens: ${cleanAudience}`,
    `- Gaya Visual Motion Graphic: ${config.style.name} (${config.style.station} · ${config.style.stylePath})`,
    `- Rasio Aspek & Resolusi: ${ratio.label} (${ratio.resolution} — untuk ${ratio.platform})`,
    `- Target Durasi Total: ${config.durationSec} detik (sekitar ${sceneCount} babak/adegan bergantian antara cuplikan clip & motion graphic)`,
    `- Catatan Framing: ${ratio.framingNote}`
  );
  sections.push(briefLines.join('\n'));

  if (config.includeInlineStyleRules) {
    sections.push(
      [
        '## 2. PANDUAN GAYA VISUAL & ARAHAN KAMERA',
        config.style.promptDirective,
        `- Palet Warna Referensi: ${config.style.palette.join(', ')}`,
        `- Bahasa Kamera: ${config.style.cameraGrammar}`,
      ].join('\n')
    );
  } else {
    sections.push(
      [
        '## 2. REFERENSI GAYA DARI KEAHLIAN TERPASANG',
        `Ikuti definisi gaya "${config.style.name}" (${config.style.stylePath}) dari keahlian ${skillTag} dengan palet utama ${config.style.palette.join(', ')}.`,
      ].join('\n')
    );
  }

  let nextStep = 3;

  if (config.antiSlideEnforcement) {
    sections.push(
      [
        `## ${nextStep}. ATURAN ANTI-SLIDE (WAJIB DIPATUHI)`,
        '- DILARANG membuat tampilan seperti presentasi PowerPoint (kotak teks statis yang sekadar fade-in lalu fade-out).',
        '- Pastikan ada gerakan visual setiap detik: kamera terus bergerak halus (drift/pan/zoom), elemen latar memiliki paralaks, dan transisi antar babak memakai match-cut, whip blur, atau elemen persisten yang berubah bentuk.',
        '- Gunakan kurva easing sinematik dan hook visual kuat pada 3 detik pertama.',
      ].join('\n')
    );
    nextStep += 1;
  }

  const hybridAudioFeatures: string[] = [];
  if (hybrid.includeSfx) {
    hybridAudioFeatures.push(
      '- **WAJIB Sound Effect (SFX):** Tambahkan lapisan efek suara (whoosh transisi antara cuplikan clip & motion graphic, pop/click kemunculan objek, riser/impact pada klimaks) yang di-mix halus & proporsional di bawah suara asli video clip agar ucapan tetap jernih.'
    );
  }
  if (hybrid.includeRunningText) {
    hybridAudioFeatures.push(
      `- **WAJIB Running Text Per Kata (Word-by-Word Synced Captions):** Transkripsikan ucapan dari audio asli video clip yang di-upload, lalu tampilkan running text / teks berjalan yang sinkron tepat pada **setiap kata yang diucapkan** (highlight aktif per kata mengikuti timestamp audio clip), dengan tipografi kontras tinggi di area aman (safe zone) rasio ${config.aspectRatio}.`
    );
  }

  sections.push(
    [
      `## ${nextStep}. ATURAN HYBRID, AUDIO ASLI CLIP & EKSEKUSI LANGSUNG (.MP4)`,
      '**PENTING — TIDAK PERLU MEMBUAT NASKAH VO BARU ATAU MEMINTA UPLOAD AUDIO VO TERPISAH!**',
      `- **Sumber Suara / Voice (Audio Asli Video Clip):** Gunakan **100% suara/voice asli dari file video clip yang saya upload** di chat Mode Tugas ini sebagai trek audio utama yang mengalir kontinu dari awal hingga akhir (baik saat visual menampilkan cuplikan video clip asli maupun saat visual beralih ke adegan motion graphic).`,
      `- **WAJIB Hybrid Visual (Jangan Full Motion Graphic):** Hasil akhir **HARUS** memadukan **beberapa cuplikan visual dari video clip asli yang di-upload** dengan **adegan motion graphic** bergaya "${config.style.name}" — **DILARANG** membuat 100% full motion graphic tanpa menampilkan cuplikan video clip asli, dan **DILARANG** hanya menempel teks di atas video mentah tanpa adegan motion graphic penuh.`,
      `- **Komposisi & Porsi Cuplikan:** ${balanceMeta.promptRule}`,
      `- **Arahan Kategori "${categoryMeta.label}":** ${categoryMeta.promptDirective}`,
      `- **Integrasi Footage Clip ke Gaya Visual:** Perlakukan cuplikan video clip asli sebagai layer footage sinematik (sesuaikan framing ke rasio ${config.aspectRatio}, gunakan punch-in/zoom halus, split-screen, frame-in-frame, atau overlay grafis berpalet ${config.style.palette.slice(0, 3).join(', ')}), lalu hubungkan ke adegan motion graphic dengan transisi bermakna (match-cut, whip blur, zoom-through, atau wipe objek).`,
      '',
      '### LANGKAH EKSEKUSI DI MODE TUGAS:',
      '1. **Analisis Video Clip yang Di-upload:** Dengarkan audio suara asli dan pindai momen visual terbaik dari video clip yang saya upload (jika saya belum melampirkan file video clip pada pesan ini, minta saya meng-upload file video clip terlebih dahulu sebelum merender).',
      `2. **Susun Ringkasan Storyboard Hybrid (${sceneCount} Adegan):** Sajikan tabel singkat (Adegan | Perkiraan Timecode | Jenis Visual: Cuplikan Clip Asli / Motion Graphic | Timestamp Clip / Aksi Kamera | Daftar SFX | Teks Layar).`,
      `3. **Langsung Render Video Hybrid Final (\`.mp4\`):** Produksi dan render video final dalam format **\`.mp4\`** (${ratio.resolution}, rasio ${config.aspectRatio}, target durasi ~${config.durationSec} detik atau mengikuti potongan terbaik video clip) menggunakan keahlian ${skillTag} dengan perpaduan cuplikan video clip asli + adegan motion graphic yang sinkron penuh dengan audio asli video clip.`,
      ...hybridAudioFeatures,
    ].join('\n')
  );

  return sections.join('\n\n');
}

export function buildMotionPrompt(config: PromptConfig): string {
  if (config.productionMode === 'hybrid-clip') {
    return buildHybridMotionPrompt(config);
  }

  const ratio = ASPECT_RATIO_SPECS[config.aspectRatio];
  const sceneCount = estimateSceneCount(config.durationSec);
  const cleanTopic =
    config.topic.trim() ||
    '[Tulis topik atau ide utama video motion graphic kamu di sini]';
  const cleanAudience = config.targetAudience.trim() || 'Penonton umum digital';
  const skillTag = config.style.skillHandle;

  const sections: string[] = [];

  // Mandatory skill invocation handle at the very beginning of the prompt
  sections.push(
    `${skillTag} Gunakan keahlian ${skillTag} (mode Tugas) untuk merancang dan memproduksi video motion graphic profesional sesuai spesifikasi di bawah ini.`
  );

  // Brief
  sections.push(
    [
      '## 1. BRIEF PRODUKSI',
      `- Topik / Ide Video: ${cleanTopic}`,
      `- Target Audiens: ${cleanAudience}`,
      `- Gaya Visual Utama: ${config.style.name} (${config.style.station} · ${config.style.stylePath})`,
      `- Rasio Aspek & Resolusi: ${ratio.label} (${ratio.resolution} — untuk ${ratio.platform})`,
      `- Target Durasi Total: ${config.durationSec} detik (sekitar ${sceneCount} babak/adegan terukur)`,
      `- Catatan Framing: ${ratio.framingNote}`,
    ].join('\n')
  );

  // Style rules
  if (config.includeInlineStyleRules) {
    sections.push(
      [
        '## 2. PANDUAN GAYA VISUAL & ARAHAN KAMERA',
        config.style.promptDirective,
        `- Palet Warna Referensi: ${config.style.palette.join(', ')}`,
        `- Bahasa Kamera: ${config.style.cameraGrammar}`,
      ].join('\n')
    );
  } else {
    sections.push(
      [
        '## 2. REFERENSI GAYA DARI KEAHLIAN TERPASANG',
        `Ikuti definisi gaya "${config.style.name}" (${config.style.stylePath}) dari keahlian ${skillTag} dengan palet utama ${config.style.palette.join(', ')}.`,
      ].join('\n')
    );
  }

  let nextStep = 3;

  if (config.antiSlideEnforcement) {
    sections.push(
      [
        `## ${nextStep}. ATURAN ANTI-SLIDE (WAJIB DIPATUHI)`,
        '- DILARANG membuat tampilan seperti presentasi PowerPoint (kotak teks statis yang sekadar fade-in lalu fade-out).',
        '- Pastikan ada gerakan visual setiap detik: kamera terus bergerak halus (drift/pan/zoom), elemen latar memiliki paralaks, dan transisi antar babak memakai match-cut atau elemen persisten yang berubah bentuk.',
        '- Gunakan kurva easing sinematik dan hook visual kuat pada 3 detik pertama.',
      ].join('\n')
    );
    nextStep += 1;
  }

  // Audio, SFX & Running Text requirements
  const audioFeatures: string[] = [];
  if (config.voiceOver.includeSfx) {
    audioFeatures.push(
      '- **WAJIB Sound Effect (SFX):** Tambahkan lapisan efek suara (whoosh transisi, pop/click kemunculan objek, paper/mechanical texture sesuai gaya visual, riser/impact pada klimaks) yang di-mix halus & proporsional agar tidak menenggelamkan suara narasi.'
    );
  }
  if (config.voiceOver.enabled && config.voiceOver.includeRunningText) {
    audioFeatures.push(
      '- **WAJIB Running Text Per Kata (Word-by-Word Synced Captions):** Tampilkan running text / teks berjalan yang sinkron tepat pada **setiap kata yang diucapkan** berdasarkan file audio Voice Over (highlight aktif per kata mengikuti timestamp audio), dengan tipografi kontras tinggi dan berada di area aman (safe zone) rasio aspek.'
    );
  }

  if (config.voiceOver.enabled) {
    const langLabel =
      config.voiceOver.language === 'id'
        ? 'Bahasa Indonesia alami'
        : 'English (natural spoken rhythm)';

    const isElevenLabsV4 = config.voiceOver.ttsTarget === 'elevenlabs';

    const voLines = [
      `## ${nextStep}. ALUR 2 TAHAP DENGAN VOICE OVER (WAJIB DIIKUTI)`,
      '**PENTING — JANGAN LANGSUNG MEMBUAT FILE VIDEO (.MP4) ATAU FILE HTML TERLEBIH DAHULU!**',
      '',
      '### TAHAP 1 (KERJAKAN SEKARANG, LALU BERHENTI & TUNGGU):',
      `1. Buatkan **Naskah Voice Over** lengkap dalam ${langLabel} untuk durasi ~${config.durationSec} detik (~${Math.round(config.durationSec * 2.3)}–${Math.round(config.durationSec * 2.7)} kata).`,
      `   - Gaya Narasi: ${TONE_LABELS[config.voiceOver.tone]}.`,
      `   - Kompatibilitas TTS Pihak Ketiga: ${TTS_TARGET_NOTES[config.voiceOver.ttsTarget]}`,
    ];

    if (isElevenLabsV4) {
      voLines.push(
        `   - **WAJIB Audio Tags ElevenLabs V4 (${ELEVENLABS_V4_ALL_TAGS.length} Tag Resmi):** Naskah Voice Over **HARUS** menyisipkan tag audio resmi ElevenLabs V4 secara kontekstual sesuai emosi, ritme, dan adegan (pilih yang paling relevan, jangan memaksakan semua tag sekaligus, dan **DILARANG** mengarang tag di luar daftar resmi berikut). ${ELEVENLABS_V4_TAG_FORMAT}`,
        ...ELEVENLABS_V4_TAG_GROUPS.map(
          (group) => `     - ${group.label}: ${group.tags.join(', ')}`
        )
      );
    }

    if (config.voiceOver.includeTimecodes) {
      voLines.push(
        '   - Sertakan timecode presisi per segmen (contoh: [00:00 - 00:04]) agar mudah ditinjau.'
      );
    }
    if (config.voiceOver.includeIntonationCues) {
      if (isElevenLabsV4) {
        voLines.push(
          '   - Sertakan catatan jeda & intonasi, LALU berikan juga satu blok **"Naskah Siap Tempel ke ElevenLabs V4"** yang bersih dari timecode/label adegan namun **WAJIB mempertahankan Audio Tags `[...]`** di dalam teks agar saya bisa langsung meng-generate audio VO.'
        );
      } else {
        voLines.push(
          '   - Sertakan catatan jeda & intonasi, LALU berikan juga satu blok **"Naskah Bersih Siap Tempel ke TTS"** tanpa tag apa pun agar saya bisa langsung meng-generate audio VO.'
        );
      }
    }

    const ttsStepInstruction = isElevenLabsV4
      ? `di **ElevenLabs V4** (pastikan slider **Stability** diatur ke **${ELEVENLABS_V4_STABILITY_PERCENT}%** pada rentang Creative → Robust)`
      : 'di layanan pihak ketiga';

    voLines.push(
      `2. Sajikan **Ringkasan Storyboard (${sceneCount} Adegan)** dalam bentuk tabel (Adegan | Perkiraan Timecode | Visual & Gerak Kamera | Daftar SFX | Teks Layar).`,
      `3. **BERHENTI DI TAHAP INI.** Minta saya untuk men-generate audio Voice Over terlebih dahulu ${ttsStepInstruction} menggunakan naskah di atas, lalu **meng-upload file audio Voice Over (.mp3 / .wav)** tersebut ke chat Mode Tugas ini.`,
      '',
      '### TAHAP 2 (SETELAH SAYA UPLOAD FILE AUDIO VOICE OVER):',
      `- Begitu saya mengunggah file audio Voice Over, langsung analisis timestamp setiap kata dari audio tersebut dan render **video motion graphic final dalam format \`.mp4\`** (${ratio.resolution}, ${config.aspectRatio}) yang 100% sinkron dengan durasi serta ritme audio VO yang saya upload.`,
      ...audioFeatures
    );

    sections.push(voLines.join('\n'));
  } else {
    const directLines = [
      `## ${nextStep}. OUTPUT VIDEO MOTION GRAPHIC (TANPA VOICE OVER)`,
      `1. Sajikan ringkasan **Storyboard (${sceneCount} Adegan)** secara singkat.`,
      `2. Langsung buat dan render **video motion graphic final dalam format \`.mp4\`** (${ratio.resolution}, rasio ${config.aspectRatio}, durasi ~${config.durationSec} detik) menggunakan keahlian ${skillTag} dengan seluruh pesan disampaikan melalui tipografi kinetik dan visual bergerak.`,
      ...audioFeatures,
    ];
    sections.push(directLines.join('\n'));
  }

  return sections.join('\n\n');
}

export function buildPhase2FollowUpPrompt(config: {
  style: MotionStyle;
  aspectRatio: AspectRatio;
  includeSfx: boolean;
  includeRunningText: boolean;
}): string {
  const parts = [
    `${config.style.skillHandle} Ini file audio Voice Over yang sudah saya generate dan upload.`,
    `Silakan langsung proses dan buat **video motion graphic final dalam format .mp4** sesuai gaya visual "${config.style.name}" (${config.aspectRatio}) dan storyboard yang sudah disepakati sebelumnya.`,
  ];

  const reqs: string[] = [
    '- Sinkronkan durasi total video dan seluruh pergantian adegan tepat mengikuti file audio Voice Over yang saya upload.',
  ];
  if (config.includeSfx) {
    reqs.push(
      '- Tambahkan **Sound Effect (SFX)** yang sesuai di setiap transisi, kemunculan objek, dan penekanan visual dengan volume seimbang di bawah suara VO.'
    );
  }
  if (config.includeRunningText) {
    reqs.push(
      '- Tambahkan **Running Text / subtitle kinetik yang sinkron untuk setiap kata yang diucapkan** berdasarkan audio Voice Over tersebut (word-by-word highlight) pada area aman layar.'
    );
  }

  return `${parts.join(' ')}\n\nPastikan hal berikut terpenuhi:\n${reqs.join('\n')}`;
}
