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
    shortDesc: 'Hook 3 detik pertama, cut cepat & punchline visual.',
    briefSummary:
      'Retensi tinggi dengan hook pembuka kuat, tempo cepat, dan penekanan momen viral.',
    promptDirective:
      'Buka 0–3 detik pertama langsung dengan cuplikan video clip asli paling memancing rasa penasaran (hook visual + audio asli yang kuat), lalu potong cepat ke adegan motion graphic untuk mempertegas klaim, angka, atau konteks, dan selang-seling kembali ke cuplikan reaksi/klimaks video clip asli dengan ritme cut cepat (1,5–3 detik per beat).',
  },
  {
    id: 'meme-comedy',
    label: 'Meme & Komedi',
    shortDesc: 'Timing komedi, freeze-frame punchline & zoom reaksi.',
    briefSummary:
      'Menjaga timing komedi dan ekspresi asli clip dengan sisipan grafis hiperbolis.',
    promptDirective:
      'Pertahankan timing komedi, ekspresi wajah, dan intonasi suara asli dari video clip pada momen setup dan punchline; sisipkan adegan motion graphic sebagai reaksi visual, label komedi, freeze-frame zoom-in, atau ilustrasi hiperbolis yang memperkuat kelucuan tanpa memotong punchline audio asli.',
  },
  {
    id: 'education-insight',
    label: 'Edukasi & Insight',
    shortDesc: 'Pembicara/footage asli diselingi diagram & visual konsep.',
    briefSummary:
      'Menjelaskan konsep kompleks dengan memadukan pembicara/footage asli dan diagram motion graphic.',
    promptDirective:
      'Tampilkan cuplikan video clip asli saat pembicara atau subjek menyampaikan poin inti dan contoh nyata, lalu beralih mulus ke adegan motion graphic (diagram, angka, peta, atau ilustrasi konsep) untuk memvisualisasikan penjelasan tersebut, sebelum kembali ke cuplikan video clip asli untuk penekanan kesimpulan.',
  },
  {
    id: 'debate-controversy',
    label: 'Debat & Kontroversi',
    shortDesc: 'Sorot argumen tajam, kutipan klaim & perbandingan fakta.',
    briefSummary:
      'Menjaga tensi argumen dengan sorotan kutipan, perbandingan dua sisi, dan reaksi clip.',
    promptDirective:
      'Tampilkan cuplikan video clip asli saat pernyataan tajam, pertanyaan kritis, atau adu argumen diucapkan dengan intonasi aslinya; potong ke adegan motion graphic untuk menyorot kutipan kunci, perbandingan dua sisi, timeline fakta, atau data pendukung, lalu kembali ke ekspresi/respons di video clip asli.',
  },
  {
    id: 'story-emotional',
    label: 'Cerita & Emosional',
    shortDesc: 'Jaga napas emosi suara asli, transisi halus & atmosferik.',
    briefSummary:
      'Menjaga keutuhan emosi suara asli dengan visual motion graphic penguat suasana.',
    promptDirective:
      'Hormati jeda napas, getar suara, dan momen emosional pada cuplikan video clip asli tanpa memotong kalimat secara kasar; gunakan adegan motion graphic sebagai penguat suasana, kilas balik visual, atau metafora puitis di sela-sela cuplikan video clip asli dengan transisi lembut yang tetap bergerak.',
  },
  {
    id: 'deep-talk-philosophy',
    label: 'Deep Talk & Filosofi',
    shortDesc: 'Refleksi mendalam, kutipan kontemplatif & ruang visual tenang.',
    briefSummary:
      'Memberi ruang cerna kontemplatif antara suara reflektif clip dan tipografi/metafora visual.',
    promptDirective:
      'Biarkan suara asli dan momen perenungan dari video clip mengalir utuh pada kalimat-kalimat reflektif; selingi dengan adegan motion graphic kontemplatif (tipografi editorial, metafora visual minimalis, atau ilustrasi simbolik) untuk memberi ruang cerna bagi penonton sebelum kembali ke cuplikan video clip asli.',
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
    shortDesc: 'Bergantian seimbang antara cuplikan clip asli dan motion graphic.',
    promptRule:
      'Bagi komposisi visual secara seimbang (~50% cuplikan video clip asli, ~50% adegan motion graphic) dengan pola selang-seling dinamis di sepanjang durasi video.',
  },
  {
    id: 'clip-heavy',
    label: 'Dominan Video Clip',
    ratioLabel: '~65% Clip · 35% Motion',
    shortDesc: 'Cuplikan clip asli lebih dominan; motion graphic di momen kunci.',
    promptRule:
      'Jadikan cuplikan video clip asli sebagai tulang punggung visual (~65% durasi) agar ekspresi dan aksi asli tetap dominan, sementara adegan motion graphic (~35% durasi) disisipkan pada hook pembuka, visualisasi poin penting, overlay data/kutipan, dan penutup.',
  },
  {
    id: 'motion-heavy',
    label: 'Dominan Motion',
    ratioLabel: '~35% Clip · 65% Motion',
    shortDesc: 'Motion graphic dominan; cuplikan clip muncul di hook & klimaks.',
    promptRule:
      'Jadikan adegan motion graphic sebagai panggung visual utama (~65% durasi) sementara audio suara tetap memakai audio asli video clip secara kontinu, dan tampilkan cuplikan video clip asli (~35% durasi) pada momen hook, reaksi kunci, bukti visual, dan klimaks agar tetap terasa hybrid.',
  },
] as const;

export const HYBRID_CLIP_BALANCE_MAP: Record<
  HybridClipBalance,
  HybridClipBalanceOption
> = Object.fromEntries(
  HYBRID_CLIP_BALANCES.map((item) => [item.id, item])
) as Record<HybridClipBalance, HybridClipBalanceOption>;
