import type { HybridClipBalance } from '@/types';

export interface HybridClipBalanceOption {
  id: HybridClipBalance;
  label: string;
  ratioLabel: string;
  shortDesc: string;
  promptRule: string;
}

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
      'Jadikan adegan motion graphic sebagai visual utama (~65% total durasi) di atas audio asli video clip yang tetap mengalir mulus, dan tampilkan video clip asli (~35% total durasi) pada segmen pembuka, reaksi kunci, atau penekanan kalimat tanpa memotong ucapan di tengah kalimat.',
  },
] as const;

export const HYBRID_CLIP_BALANCE_MAP: Record<
  HybridClipBalance,
  HybridClipBalanceOption
> = Object.fromEntries(
  HYBRID_CLIP_BALANCES.map((item) => [item.id, item])
) as Record<HybridClipBalance, HybridClipBalanceOption>;
