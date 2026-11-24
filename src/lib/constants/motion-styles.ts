import type { MotionStyle, QuickBriefPreset } from '@/types';
import { BANG_MOTION_STYLES } from './bang-motion-styles';
import { LEMO_OPUSCAR_STYLES } from './lemo-opuscar-styles';

export const MOTION_STYLES: MotionStyle[] = [
  ...BANG_MOTION_STYLES,
  ...LEMO_OPUSCAR_STYLES,
];

export const BANG_MOTION_COUNT = BANG_MOTION_STYLES.length;
export const LEMO_OPUSCAR_COUNT = LEMO_OPUSCAR_STYLES.length;

export const ALL_STATIONS: string[] = Array.from(
  new Set(MOTION_STYLES.map((s) => s.station))
);

export const QUICK_BRIEF_PRESETS: QuickBriefPreset[] = [
  {
    id: 'ai-explainer',
    label: 'Explainer Cara Kerja AI',
    styleId: 'bm-cartoon-collage',
    aspectRatio: '9:16',
    durationSec: 30,
    topic:
      'Bagaimana AI memahami bahasa manusia hanya dalam hitungan milidetik — dari teks menjadi token, lalu menjadi prediksi kata berikutnya.',
    audience: 'Penonton umum TikTok & Reels yang suka edukasi teknologi ringan',
  },
  {
    id: 'coffee-promo',
    label: 'Opener Brand Kopi',
    styleId: 'bm-grainy-gradient',
    aspectRatio: '9:16',
    durationSec: 15,
    topic:
      'Video opener promosi kopi seduh dingin (cold brew) artisan "Kopi Pagi": menyorot proses seduh 16 jam, rasa halus tanpa asam berlebih, dan ajakan coba botol pertama.',
    audience: 'Pekerja kreatif usia 22-35 tahun di Instagram Reels',
  },
  {
    id: 'spice-route',
    label: 'Sejarah Jalur Rempah',
    styleId: 'bm-vintage-sketch',
    aspectRatio: '16:9',
    durationSec: 45,
    topic:
      'Kisah singkat bagaimana cengkih dan pala dari Kepulauan Maluku mengubah peta pelayaran dunia pada abad ke-16.',
    audience: 'Penonton YouTube dokumenter & pecinta sejarah Nusantara',
  },
  {
    id: 'lens-teardown',
    label: 'Bedah Kamera Smartphone',
    styleId: 'lo-teardown',
    aspectRatio: '16:9',
    durationSec: 30,
    topic:
      'Membedah cara kerja lensa periskop 5x zoom pada smartphone modern: prisma pemantul cahaya, susunan elemen kaca, hingga sensor penstabil OIS.',
    audience: 'Penggemar gadget, videografer, dan reviewer teknologi',
  },
];
