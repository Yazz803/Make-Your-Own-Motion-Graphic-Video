import type { HybridClipBalance, VideoClipCategory } from '@/types';

export interface VideoClipCategoryOption {
  id: VideoClipCategory;
  label: string;
  shortDesc: string;
  briefSummary: string;
  promptDirective: string;
}

export interface HybridClipBalanceOption {
  id: HybridClipBalance;
  label: string;
  ratioLabel: string;
  shortDesc: string;
  promptRule: string;
}

export const VIDEO_CLIP_CATEGORIES: readonly VideoClipCategoryOption[] = [
  {
    id: 'viral-hook',
    label: 'Viral & Hook',
    shortDesc: 'Hook 3 detik pertama, ritme dinamis & punchline visual.',
    briefSummary:
      'Retensi tinggi dengan hook pembuka kuat, tempo dinamis di jeda alami, dan penekanan momen viral.',
    promptDirective:
      'Pertahankan pembuka 0–3 detik pertama dengan visual video clip asli (atau overlay hook motion graphic di atas footage asli) agar langsung memancing rasa penasaran, lalu beralih ke adegan motion graphic pada jeda klausa/kalimat untuk mempertegas klaim, angka, atau konteks, dan kembali ke video clip asli pada momen reaksi/klimaks mengikuti jeda alami ucapan.',
  },
  {
    id: 'meme-comedy',
    label: 'Meme & Komedi',
    shortDesc: 'Timing komedi, freeze-frame punchline & zoom reaksi.',
    briefSummary:
      'Menjaga timing komedi dan ekspresi asli clip dengan sisipan grafis hiperbolis di jeda alami.',
    promptDirective:
      'Pertahankan timing komedi, ekspresi wajah, dan intonasi suara asli dari video clip pada momen setup dan punchline; sisipkan adegan motion graphic pada jeda alami sebagai reaksi visual, label komedi, freeze-frame zoom-in, atau ilustrasi hiperbolis yang memperkuat kelucuan tanpa memotong punchline audio asli.',
  },
  {
    id: 'education-insight',
    label: 'Edukasi & Insight',
    shortDesc: 'Pembicara/footage asli diselingi diagram & visual konsep.',
    briefSummary:
      'Menjelaskan konsep kompleks dengan memadukan pembicara/footage asli dan diagram motion graphic.',
    promptDirective:
      'Tampilkan video clip asli saat pembicara atau subjek menyampaikan poin inti dan contoh nyata, lalu beralih mulus ke adegan motion graphic pada jeda kalimat/klausa (diagram, angka, peta, atau ilustrasi konsep) untuk memvisualisasikan penjelasan tersebut, sebelum kembali ke video clip asli untuk penekanan kesimpulan.',
  },
  {
    id: 'debate-controversy',
    label: 'Debat & Kontroversi',
    shortDesc: 'Sorot argumen tajam, kutipan klaim & perbandingan fakta.',
    briefSummary:
      'Menjaga tensi argumen dengan sorotan kutipan, perbandingan dua sisi, dan reaksi clip.',
    promptDirective:
      'Tampilkan video clip asli saat pernyataan tajam, pertanyaan kritis, atau adu argumen diucapkan dengan intonasi aslinya; beralih ke adegan motion graphic pada jeda kalimat untuk menyorot kutipan kunci, perbandingan dua sisi, timeline fakta, atau data pendukung, lalu kembali ke ekspresi/respons di video clip asli.',
  },
  {
    id: 'story-emotional',
    label: 'Cerita & Emosional',
    shortDesc: 'Jaga napas emosi suara asli, transisi halus & atmosferik.',
    briefSummary:
      'Menjaga keutuhan emosi suara asli dengan visual motion graphic penguat suasana.',
    promptDirective:
      'Hormati jeda napas, getar suara, dan momen emosional pada video clip asli tanpa memotong kalimat secara kasar; gunakan adegan motion graphic pada jeda alami sebagai penguat suasana, kilas balik visual, atau metafora puitis di sela-sela tampilan video clip asli dengan transisi lembut yang tetap bergerak.',
  },
  {
    id: 'deep-talk-philosophy',
    label: 'Deep Talk & Filosofi',
    shortDesc: 'Refleksi mendalam, kutipan kontemplatif & ruang visual tenang.',
    briefSummary:
      'Memberi ruang cerna kontemplatif antara suara reflektif clip dan tipografi/metafora visual.',
    promptDirective:
      'Biarkan suara asli dan momen perenungan dari video clip mengalir utuh pada kalimat-kalimat reflektif; selingi pada jeda alami dengan adegan motion graphic kontemplatif (tipografi editorial, metafora visual minimalis, atau ilustrasi simbolik) untuk memberi ruang cerna bagi penonton sebelum kembali ke video clip asli.',
  },
] as const;

export const VIDEO_CLIP_CATEGORY_MAP: Record<
  VideoClipCategory,
  VideoClipCategoryOption
> = Object.fromEntries(
  VIDEO_CLIP_CATEGORIES.map((item) => [item.id, item])
) as Record<VideoClipCategory, VideoClipCategoryOption>;

export const HYBRID_CLIP_BALANCES: readonly HybridClipBalanceOption[] = [
  {
    id: 'balanced',
    label: 'Seimbang',
    ratioLabel: '~50% Clip · 50% Motion',
    shortDesc: 'Proporsional antara clip asli & motion graphic di jeda alami.',
    promptRule:
      'Bagi porsi visual secara proporsional (~50% menampilkan video clip asli, ~50% adegan motion graphic) dengan perpindahan segmen yang fleksibel mengikuti jeda alami kalimat/napas pembicara (bukan pembagian detik yang kaku).',
  },
  {
    id: 'clip-heavy',
    label: 'Dominan Video Clip',
    ratioLabel: '~65% Clip · 35% Motion',
    shortDesc: 'Clip asli lebih dominan; motion graphic di jeda poin kunci.',
    promptRule:
      'Tampilkan video clip asli lebih dominan (~65% total durasi) agar ekspresi dan aksi asli tetap menjadi pusat perhatian, sementara adegan motion graphic (~35% total durasi) masuk pada jeda kalimat yang tepat untuk memvisualisasikan poin penting, data, atau penekanan.',
  },
  {
    id: 'motion-heavy',
    label: 'Dominan Motion',
    ratioLabel: '~35% Clip · 65% Motion',
    shortDesc: 'Motion graphic dominan; clip asli di pembuka & penekanan.',
    promptRule:
      'Jadikan adegan motion graphic sebagai visual utama (~65% total durasi) di atas audio asli video clip yang tetap mengalir utuh, dan tampilkan video clip asli (~35% total durasi) pada segmen pembuka, reaksi kunci, atau penekanan kalimat tanpa memotong ucapan di tengah kalimat.',
  },
] as const;

export const HYBRID_CLIP_BALANCE_MAP: Record<
  HybridClipBalance,
  HybridClipBalanceOption
> = Object.fromEntries(
  HYBRID_CLIP_BALANCES.map((item) => [item.id, item])
) as Record<HybridClipBalance, HybridClipBalanceOption>;
