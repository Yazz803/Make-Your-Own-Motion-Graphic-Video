import {
  BANG_MOTION_COUNT,
  LEMO_OPUSCAR_COUNT,
  MOTION_STYLES,
} from '@/lib/constants';

const WORKFLOW_STEPS = [
  {
    index: '01',
    title: `Pilih dari ${MOTION_STYLES.length} Gaya Visual`,
    desc: `Lengkap ${BANG_MOTION_COUNT} gaya @bang-motion dan ${LEMO_OPUSCAR_COUNT} gaya @lemo-opuscar dalam rasio 9:16, 16:9, atau 1:1.`,
  },
  {
    index: '02',
    title: 'Buat Naskah VO Dulu',
    desc: 'Kirim prompt di Mode Tugas Gemini Web untuk menghasilkan naskah VO & storyboard sebelum render video.',
  },
  {
    index: '03',
    title: 'Upload Audio VO ke Gemini',
    desc: 'Generate audio VO di layanan pihak ketiga, lalu unggah file audio tersebut ke chat Mode Tugas yang sama.',
  },
  {
    index: '04',
    title: 'Render MP4 + SFX & Teks',
    desc: 'Gemini langsung menghasilkan video MP4 sinkron penuh dengan Sound Effect dan running text per kata.',
  },
] as const;

export default function WorkflowStrip() {
  return (
    <div className="workflow-strip mt-12 grid grid-cols-1 gap-6 border-t border-zinc-800/80 pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {WORKFLOW_STEPS.map((item) => (
        <div key={item.index} className="workflow-step space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-[#F2B705] tabular-nums">
              {item.index}.
            </span>
            <h3 className="font-display text-sm font-semibold text-zinc-100">
              {item.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
