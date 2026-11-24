import type {
  AspectRatio,
  DurationSec,
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
    'Optimalkan untuk ElevenLabs: gunakan tanda baca natural, jeda elipsis (...) seperlunya, dan hindari singkatan ambigu agar pelafalan stabil.',
  capcut:
    'Optimalkan untuk CapCut Voice / TTS: pecah menjadi kalimat pendek per 3–5 detik agar ritme bacaan rapi.',
  general:
    'Format bersih siap salin ke layanan Voice Over pihak ketiga mana pun (ElevenLabs, CapCut, Murf, atau rekaman suara manual).',
};

export function estimateSceneCount(durationSec: DurationSec): number {
  if (durationSec <= 15) return 4;
  if (durationSec <= 30) return 6;
  if (durationSec <= 45) return 8;
  return 10;
}

export function buildMotionPrompt(config: PromptConfig): string {
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

    const voLines = [
      `## ${nextStep}. ALUR 2 TAHAP DENGAN VOICE OVER (WAJIB DIIKUTI)`,
      '**PENTING — JANGAN LANGSUNG MEMBUAT FILE VIDEO (.MP4) ATAU FILE HTML TERLEBIH DAHULU!**',
      '',
      '### TAHAP 1 (KERJAKAN SEKARANG, LALU BERHENTI & TUNGGU):',
      `1. Buatkan **Naskah Voice Over** lengkap dalam ${langLabel} untuk durasi ~${config.durationSec} detik (~${Math.round(config.durationSec * 2.3)}–${Math.round(config.durationSec * 2.7)} kata).`,
      `   - Gaya Narasi: ${TONE_LABELS[config.voiceOver.tone]}.`,
      `   - Kompatibilitas TTS Pihak Ketiga: ${TTS_TARGET_NOTES[config.voiceOver.ttsTarget]}`,
    ];

    if (config.voiceOver.includeTimecodes) {
      voLines.push(
        '   - Sertakan timecode presisi per segmen (contoh: [00:00 - 00:04]) agar mudah ditinjau.'
      );
    }
    if (config.voiceOver.includeIntonationCues) {
      voLines.push(
        '   - Sertakan catatan jeda & intonasi, LALU berikan juga satu blok **"Naskah Bersih Siap Tempel ke TTS"** tanpa tag apa pun agar saya bisa langsung meng-generate audio VO.'
      );
    }

    voLines.push(
      `2. Sajikan **Ringkasan Storyboard (${sceneCount} Adegan)** dalam bentuk tabel (Adegan | Perkiraan Timecode | Visual & Gerak Kamera | Daftar SFX | Teks Layar).`,
      '3. **BERHENTI DI TAHAP INI.** Minta saya untuk men-generate audio Voice Over terlebih dahulu di layanan pihak ketiga menggunakan naskah di atas, lalu **meng-upload file audio Voice Over (.mp3 / .wav)** tersebut ke chat Mode Tugas ini.',
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
