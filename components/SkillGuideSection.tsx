'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Terminal,
  Wand2,
  X,
} from 'lucide-react';
import { REPO_LINKS } from '@/lib/motion-styles';
import {
  CLI_COMMANDS,
  GEMINI_SCREENSHOT_REFS,
  GEMINI_WEB_INSTALL_STEPS,
  INSTALL_SKILL_PROMPT,
} from '@/lib/skill-guides';

type GuideTab = 'gemini-web' | 'cli-local';

export default function SkillGuideSection() {
  const [activeTab, setActiveTab] = useState<GuideTab>('gemini-web');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [zoomedShot, setZoomedShot] = useState<
    (typeof GEMINI_SCREENSHOT_REFS)[number] | null
  >(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <section
      id="panduan"
      className="border-t border-zinc-800/80 bg-[#0C0C0F] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header + Path Switch */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#F2B705]">
              04. Panduan Instalasi Skill
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl [text-wrap:balance]">
              Cara memasang skill bang-motion &amp; lemo-opuscar di Gemini Web
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
              Pada tampilan Gemini Web terbaru, Gem telah dialihkan ke menu{' '}
              <strong className="font-medium text-zinc-200">Keahlian</strong>{' '}
              dan tidak lagi memakai mode Canvas. Cukup unduh ZIP kedua
              repositori lalu unggah di{' '}
              <strong className="font-medium text-zinc-200">Mode Tugas</strong>.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Pilih jalur instalasi skill"
            className="inline-flex items-center gap-1 self-start rounded-lg border border-zinc-800 bg-zinc-950 p-1 md:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'gemini-web'}
              onClick={() => setActiveTab('gemini-web')}
              className={`inline-flex min-h-[40px] items-center gap-2 rounded-md px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'gemini-web'
                  ? 'bg-zinc-800 text-zinc-50'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Wand2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Gemini Web (Mode Tugas)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'cli-local'}
              onClick={() => setActiveTab('cli-local')}
              className={`inline-flex min-h-[40px] items-center gap-2 rounded-md px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'cli-local'
                  ? 'bg-zinc-800 text-zinc-50'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Terminal className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Gemini CLI / Lokal</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Gemini Web (ZIP Download + Mode Tugas + Keahlian) */}
        {activeTab === 'gemini-web' && (
          <div className="mt-10 space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Steps list */}
              <div className="divide-y divide-zinc-800/80 rounded-xl border border-zinc-800 bg-[#121215] px-5 sm:px-7 lg:col-span-7">
                {GEMINI_WEB_INSTALL_STEPS.map((step) => (
                  <div key={step.number} className="py-6">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-sm font-semibold text-[#F2B705] tabular-nums">
                        {step.number}.
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-base sm:text-lg font-semibold text-zinc-50">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                          {step.description}
                        </p>
                        {step.tip && (
                          <p className="mt-2.5 text-xs leading-relaxed text-zinc-300">
                            Catatan: {step.tip}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Card: Download ZIPs + Copy Install Prompt */}
              <div className="flex flex-col justify-between gap-6 rounded-xl border border-zinc-800 bg-[#121215] p-5 sm:p-6 lg:col-span-5">
                <div className="space-y-6">
                  {/* Step A: Download both ZIPs */}
                  <div>
                    <h3 className="font-display text-base font-semibold text-zinc-50">
                      1. Unduh File ZIP Kedua Repositori
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                      Simpan kedua berkas ZIP di bawah ini ke perangkatmu tanpa
                      perlu diekstrak terlebih dahulu.
                    </p>

                    <div className="mt-3.5 space-y-2.5">
                      <a
                        href={REPO_LINKS.bangMotionZip}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[46px] items-center justify-between gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-[#F2B705] hover:text-[#F2B705]"
                      >
                        <span className="min-w-0 truncate">
                          <span className="font-mono text-xs text-zinc-400 block">
                            bangtutorial/bang-motion
                          </span>
                          <span>Download bang-motion.zip</span>
                        </span>
                        <Download
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                      </a>

                      <a
                        href={REPO_LINKS.lemoOpuscarZip}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[46px] items-center justify-between gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-[#F2B705] hover:text-[#F2B705]"
                      >
                        <span className="min-w-0 truncate">
                          <span className="font-mono text-xs text-zinc-400 block">
                            lemomo-ai/lemo-opuscar
                          </span>
                          <span>Download lemo-opuscar.zip</span>
                        </span>
                        <Download
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Step B: Copy exact installation prompt */}
                  <div className="border-t border-zinc-800/80 pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-zinc-50">
                        2. Prompt Instalasi di Mode Tugas
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('install-skill-prompt', INSTALL_SKILL_PROMPT)
                        }
                        className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-[#F2B705] px-3 py-1.5 text-xs font-semibold text-[#09090B] transition-colors hover:bg-[#FFD038] whitespace-nowrap shrink-0"
                      >
                        {copiedId === 'install-skill-prompt' ? (
                          <>
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Salin Prompt</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                      Upload kedua file ZIP ke kolom input{' '}
                      <strong className="font-medium text-zinc-200">
                        Mode Tugas
                      </strong>{' '}
                      Gemini Web, lalu kirim teks berikut:
                    </p>

                    <div className="mt-3 rounded-lg border border-zinc-800 bg-[#09090B] px-4 py-3.5 font-mono text-sm font-medium text-[#F2B705]">
                      {INSTALL_SKILL_PROMPT}
                    </div>
                  </div>
                </div>

                {/* Launch Gemini Web */}
                <div className="space-y-3 border-t border-zinc-800/80 pt-5">
                  <a
                    href={REPO_LINKS.geminiWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#F2B705] px-4 py-2.5 text-sm font-semibold text-[#09090B] transition-colors hover:bg-[#FFD038]"
                  >
                    <span>Buka Gemini Web (Pilih Mode Tugas)</span>
                    <ExternalLink
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  </a>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
                    <a
                      href={REPO_LINKS.bangMotion}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-zinc-100"
                    >
                      <span>Repo bang-motion</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    <a
                      href={REPO_LINKS.lemoOpuscar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-zinc-100"
                    >
                      <span>Repo lemo-opuscar</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual UI Reference Screenshots from Gemini Web */}
            <div className="rounded-xl border border-zinc-800 bg-[#121215] p-5 sm:p-6">
              <div className="max-w-2xl">
                <h3 className="font-display text-base sm:text-lg font-semibold text-zinc-50">
                  Panduan Visual Antarmuka Gemini Web Terbaru
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  Klik gambar mana pun untuk memperbesar letak Mode Tugas dan
                  menu Keahlian (Keterampilan).
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {GEMINI_SCREENSHOT_REFS.map((shot) => (
                  <figure key={shot.src} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setZoomedShot(shot)}
                      className="group relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-800 bg-[#09090B] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
                      aria-label={`Perbesar gambar ${shot.title}`}
                    >
                      <Image
                        src={shot.src}
                        alt={shot.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                      />
                    </button>
                    <figcaption className="mt-2.5">
                      <p className="text-xs font-semibold text-zinc-100">
                        {shot.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                        {shot.caption}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Gemini CLI / Local FFmpeg Rendering */}
        {activeTab === 'cli-local' && (
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {CLI_COMMANDS.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#121215] p-5 sm:p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs text-zinc-400">
                    <span className="font-mono text-zinc-300">
                      {item.repoName}
                    </span>
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-100"
                    >
                      <span>Buka GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-semibold text-zinc-50">
                    {item.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {item.note}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-[#09090B] px-4 py-3">
                    <code className="overflow-x-auto font-mono text-xs text-[#F2B705] whitespace-nowrap">
                      {item.command}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.command)}
                      aria-label={`Salin perintah ${item.repoName}`}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-800 text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-50"
                    >
                      {copiedId === item.id ? (
                        <Check
                          className="h-4 w-4 text-[#F2B705]"
                          aria-hidden="true"
                        />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-zinc-800 bg-[#121215] p-5 sm:p-6 lg:col-span-2">
              <h3 className="font-display text-base font-semibold text-zinc-100">
                Kebutuhan Lingkungan Lokal (Untuk Jalur Terminal)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Jika kamu menjalankan skill di terminal lokal (Gemini CLI /
                Claude Code) untuk merender video MP4 tanpa Gemini Web, pastikan
                perangkat sudah memasang{' '}
                <strong className="font-medium text-zinc-200">
                  Node.js 18+
                </strong>
                ,{' '}
                <strong className="font-medium text-zinc-200">
                  Python 3.10+
                </strong>
                , dan{' '}
                <strong className="font-medium text-zinc-200">FFmpeg</strong>.
                Untuk alur paling praktis tanpa instalasi lokal, cukup gunakan
                tab{' '}
                <strong className="font-medium text-zinc-200">
                  Gemini Web (Mode Tugas)
                </strong>
                .
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Screenshot Lightbox Modal */}
      {zoomedShot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomedShot.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setZoomedShot(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#121215]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5">
              <h4 className="font-display text-sm sm:text-base font-semibold text-zinc-50">
                {zoomedShot.title}
              </h4>
              <button
                type="button"
                onClick={() => setZoomedShot(null)}
                aria-label="Tutup pratinjau gambar"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-50"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="relative aspect-[16/10] w-full bg-[#09090B]">
              <Image
                src={zoomedShot.src}
                alt={zoomedShot.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>
            <p className="border-t border-zinc-800 px-5 py-3.5 text-xs sm:text-sm text-zinc-400">
              {zoomedShot.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
