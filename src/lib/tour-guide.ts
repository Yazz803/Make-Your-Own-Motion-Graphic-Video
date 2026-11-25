import { MOTION_STYLES } from '@/lib/constants';
import type {
  TourGuideStatus,
  TourGuideStep,
  TourGuideStorageState,
  TourPlacement,
  TourStepId,
} from '@/types';

export const TOUR_GUIDE_STORAGE_KEY = 'motion_graphic_studio_tour_v1';
export const TOUR_GUIDE_VERSION = 1;

export const TOUR_GUIDE_STEPS: readonly TourGuideStep[] = [
  {
    id: 'navbar',
    targetId: 'navbar',
    badge: 'Bagian Atas · Navigasi',
    title: 'Navigasi & Kontrol Cepat',
    description:
      'Gunakan bilah atas untuk melompat cepat ke Katalog Gaya, Studio Prompt, Live Preview, atau Panduan Skill. Di sisi kanan tersedia tombol jeda animasi latar kosmik, tautan GitHub, tombol Buka Gemini Web, serta ikon informasi ini untuk mengulang tur kapan saja.',
    tip: 'Klik ikon informasi (i) di Navbar kapan pun kamu ingin memutar ulang panduan ini.',
    preferredPlacement: 'bottom',
  },
  {
    id: 'hero',
    targetId: 'hero',
    badge: 'Pengenalan Utama',
    title: 'Ringkasan Studio & Gaya Aktif',
    description:
      'Motion Graphic Studio membantu kamu menyusun prompt siap pakai untuk Mode Tugas Gemini Web agar menghasilkan video motion graphic MP4. Gunakan tombol Mulai Buat Prompt atau Cara Pasang Skill, dan pantau gaya serta rasio aktif di bawah kubus 3D.',
    preferredPlacement: 'bottom',
  },
  {
    id: 'workflow',
    targetId: 'workflow',
    badge: 'Alur Produksi',
    title: 'Alur Kerja 4 Langkah',
    description:
      'Ikuti alur dua tahap agar audio dan visual sinkron: pilih gaya visual, buat naskah Voice Over dan storyboard dulu di Gemini Web, buat audio VO lalu unggah ke chat yang sama, dan biarkan Gemini merender video MP4 lengkap dengan SFX serta running text per kata.',
    preferredPlacement: 'bottom',
  },
  {
    id: 'catalog',
    targetId: 'catalog',
    badge: 'Eksplorasi Gaya',
    title: `Katalog ${MOTION_STYLES.length} Gaya Visual`,
    description:
      'Jelajahi seluruh gaya resmi dari @bang-motion dan @lemo-opuscar lewat matriks 17 kategori stasiun, filter repositori, atau kolom pencarian. Klik kartu gaya di bawahnya untuk melihat detail palet dan aturan kamera, atau langsung pakai di Studio Prompt.',
    preferredPlacement: 'bottom',
  },
  {
    id: 'studio-form',
    targetId: 'studio-form',
    badge: 'Penyusun Prompt',
    title: 'Formulir Studio Prompt',
    description:
      'Atur seluruh kebutuhan videomu di sini: pilih contoh brief cepat, ganti gaya visual lewat modal katalog, tentukan rasio aspek (9:16, 16:9, 1:1) dan durasi, pilih mode Full Motion Graphic atau Hybrid (Motion Graphic + Video Clip), isi topik serta target penonton, lalu sesuaikan pengaturan audio dan aturan Anti-Slide.',
    tip: 'Seluruh pengaturan aktif di formulir ini otomatis tersimpan di browser.',
    preferredPlacement: 'right',
  },
  {
    id: 'studio-output',
    targetId: 'studio-output',
    badge: 'Hasil & Draft',
    title: 'Prompt Siap Tempel & Draft',
    description:
      'Prompt otomatis dirakit dengan awalan @handle keahlian yang dipilih. Klik Salin Prompt atau Salin & Buka Gemini untuk langsung menempelkannya ke Mode Tugas Gemini Web, dan gunakan Simpan Draft atau Draft Tersimpan untuk menyimpan variasi prompt.',
    preferredPlacement: 'left',
  },
  {
    id: 'preview',
    targetId: 'preview',
    badge: 'Pratinjau Kode',
    title: 'Live Stage Preview HTML',
    description:
      'Jika Gemini Web menghasilkan berkas index.html (misalnya dari @bang-motion), tempel kodenya di panel editor kiri untuk menguji animasi secara langsung dalam rasio 9:16, 16:9, atau 1:1, memutar ulang animasi, atau mengunduh berkas .html.',
    preferredPlacement: 'top',
  },
  {
    id: 'panduan',
    targetId: 'panduan',
    badge: 'Persiapan Gemini',
    title: 'Panduan Instalasi Skill',
    description:
      'Sebelum menjalankan prompt, pasang dulu skill @bang-motion dan @lemo-opuscar. Pilih tab Gemini Web (Mode Tugas) untuk mengunduh file ZIP dan menyalin prompt instalasi ke menu Keahlian, atau tab Gemini CLI / Lokal untuk pemasangan lewat terminal.',
    preferredPlacement: 'top',
  },
  {
    id: 'support',
    targetId: 'support',
    badge: 'Dukungan & Komunitas',
    title: 'Support Developer',
    description:
      'Jika alat ini membantu alur produksi videomu, kamu dapat mendukung pengembangan berikutnya lewat kode QRIS (bisa diperbesar atau diunduh) maupun terhubung dengan developer melalui kanal media sosial dan repositori GitHub.',
    preferredPlacement: 'top',
  },
  {
    id: 'footer',
    targetId: 'footer',
    badge: 'Bagian Bawah · Referensi',
    title: 'Sumber Resmi & Navigasi Bawah',
    description:
      'Di bagian paling bawah halaman tersedia tautan langsung ke repositori sumber bang-motion, lemo-opuscar, Gemini Web, serta navigasi cepat antar bagian. Kamu sudah siap mulai membuat video motion graphic pertamamu!',
    preferredPlacement: 'top',
  },
] as const;

export const DEFAULT_TOUR_GUIDE_STATE: TourGuideStorageState = {
  version: TOUR_GUIDE_VERSION,
  status: 'pending',
  lastStepIndex: 0,
  updatedAt: null,
};

export const DEFAULT_TOUR_GUIDE_STATE_RAW = JSON.stringify(
  DEFAULT_TOUR_GUIDE_STATE
);

const VALID_STATUSES = new Set<TourGuideStatus>([
  'pending',
  'completed',
  'skipped',
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function clampTourStepIndex(index: number): number {
  if (!Number.isFinite(index)) return 0;
  const maxIndex = Math.max(0, TOUR_GUIDE_STEPS.length - 1);
  return Math.min(Math.max(Math.trunc(index), 0), maxIndex);
}

export function parseTourGuideState(raw: string | null): TourGuideStorageState {
  if (!raw) return DEFAULT_TOUR_GUIDE_STATE;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return DEFAULT_TOUR_GUIDE_STATE;
  }

  if (!isPlainObject(parsed)) return DEFAULT_TOUR_GUIDE_STATE;
  if (parsed.version !== TOUR_GUIDE_VERSION) return DEFAULT_TOUR_GUIDE_STATE;

  const status =
    typeof parsed.status === 'string' &&
    VALID_STATUSES.has(parsed.status as TourGuideStatus)
      ? (parsed.status as TourGuideStatus)
      : DEFAULT_TOUR_GUIDE_STATE.status;

  const lastStepIndex =
    typeof parsed.lastStepIndex === 'number'
      ? clampTourStepIndex(parsed.lastStepIndex)
      : DEFAULT_TOUR_GUIDE_STATE.lastStepIndex;

  const updatedAt =
    typeof parsed.updatedAt === 'string' && parsed.updatedAt.trim().length > 0
      ? parsed.updatedAt
      : null;

  return {
    version: TOUR_GUIDE_VERSION,
    status,
    lastStepIndex,
    updatedAt,
  };
}

export interface TourRectBox {
  top: number;
  left: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
}

export interface TourViewportSize {
  width: number;
  height: number;
}

export interface TourPopoverSize {
  width: number;
  height: number;
}

export interface TourPopoverPosition {
  top: number;
  left: number;
  placement: TourPlacement | 'docked';
}

export function computeSpotlightRect(
  targetRect: TourRectBox | null,
  viewport: TourViewportSize,
  stepId: TourStepId
): TourRectBox | null {
  if (!targetRect) return null;
  if (targetRect.width <= 0 || targetRect.height <= 0) return null;
  if (targetRect.bottom <= 0 || targetRect.top >= viewport.height) return null;

  const pad = stepId === 'navbar' ? 2 : 6;
  const minTop = stepId === 'navbar' ? 2 : 68;
  const maxBottom = viewport.height - 6;

  const left = Math.max(4, targetRect.left - pad);
  const right = Math.min(viewport.width - 4, targetRect.right + pad);
  const top = Math.max(minTop, targetRect.top - pad);
  const bottom = Math.min(maxBottom, targetRect.bottom + pad);

  const width = right - left;
  const height = bottom - top;
  if (width <= 12 || height <= 12) return null;

  return {
    top,
    left,
    width,
    height,
    right,
    bottom,
  };
}

export function computeTourPopoverPosition(
  targetRect: TourRectBox | null,
  popoverSize: TourPopoverSize,
  viewport: TourViewportSize,
  preferredPlacement: TourPlacement,
  stepId: TourStepId
): TourPopoverPosition {
  const edgePad = viewport.width < 640 ? 12 : 16;
  const gap = 12;
  const topSafe = stepId === 'navbar' ? 12 : 74;

  const maxLeft = Math.max(edgePad, viewport.width - popoverSize.width - edgePad);
  const maxTop = Math.max(topSafe, viewport.height - popoverSize.height - edgePad);

  const clampLeft = (x: number) => Math.min(Math.max(x, edgePad), maxLeft);
  const clampTop = (y: number) => Math.min(Math.max(y, topSafe), maxTop);

  if (!targetRect) {
    return {
      top: clampTop((viewport.height - popoverSize.height) / 2),
      left: clampLeft((viewport.width - popoverSize.width) / 2),
      placement: 'docked',
    };
  }

  const isMobile = viewport.width < 640;
  const candidates: TourPlacement[] = isMobile
    ? preferredPlacement === 'top'
      ? ['top', 'bottom']
      : ['bottom', 'top']
    : Array.from(
        new Set<TourPlacement>([
          preferredPlacement,
          'bottom',
          'top',
          'right',
          'left',
        ])
      );

  for (const placement of candidates) {
    if (placement === 'bottom') {
      const top = targetRect.bottom + gap;
      if (top + popoverSize.height <= viewport.height - edgePad && top >= topSafe) {
        return {
          top,
          left: clampLeft(
            targetRect.left + targetRect.width / 2 - popoverSize.width / 2
          ),
          placement: 'bottom',
        };
      }
    }

    if (placement === 'top') {
      const top = targetRect.top - gap - popoverSize.height;
      if (top >= topSafe && top + popoverSize.height <= viewport.height - edgePad) {
        return {
          top,
          left: clampLeft(
            targetRect.left + targetRect.width / 2 - popoverSize.width / 2
          ),
          placement: 'top',
        };
      }
    }

    if (placement === 'right' && !isMobile) {
      const left = targetRect.right + gap;
      if (left + popoverSize.width <= viewport.width - edgePad) {
        return {
          top: clampTop(targetRect.top + 12),
          left,
          placement: 'right',
        };
      }
    }

    if (placement === 'left' && !isMobile) {
      const left = targetRect.left - gap - popoverSize.width;
      if (left >= edgePad) {
        return {
          top: clampTop(targetRect.top + 12),
          left,
          placement: 'left',
        };
      }
    }
  }

  return {
    top: maxTop,
    left: isMobile
      ? clampLeft((viewport.width - popoverSize.width) / 2)
      : maxLeft,
    placement: 'docked',
  };
}
