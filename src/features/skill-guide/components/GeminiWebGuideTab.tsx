'use client';

import Image from 'next/image';
import {
  LuArrowUpRight,
  LuCheck,
  LuCopy,
  LuExternalLink,
  LuTriangleAlert,
  LuWandSparkles,
  LuZoomIn,
} from 'react-icons/lu';
import {
  GEMINI_FAILURE_SCREENSHOT,
  GEMINI_INSTALL_PROMPTS,
  REPO_LINKS,
} from '@/lib/constants';
import type { GeminiScreenshotRef } from '@/types';
import GeminiRecoveryTimeline from './GeminiRecoveryTimeline';

interface GeminiWebGuideTabProps {
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
  onZoomScreenshot: (shot: GeminiScreenshotRef) => void;
}

function renderBreakableUrl(url: string) {
  const protocolIndex = url.indexOf('://');
  const prefix = protocolIndex !== -1 ? url.slice(0, protocolIndex + 3) : '';
  const pathPart = protocolIndex !== -1 ? url.slice(protocolIndex + 3) : url;
  const segments = pathPart.split('/');

  return (
    <>
      {prefix}
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          className={
            index === segments.length - 1 && segment.length <= 20
              ? 'whitespace-nowrap'
              : undefined
          }
        >
          {segment}
          {index < segments.length - 1 && (
            <>
              /
              <wbr />
            </>
          )}
        </span>
      ))}
    </>
  );
}

export default function GeminiWebGuideTab({
  copiedId,
  onCopy,
  onZoomScreenshot,
}: GeminiWebGuideTabProps) {
  return (
    <div className="mt-10 space-y-8">
      {/* Primary Step: Install both skills directly via prompt in Mode Tugas */}
      <div className="rounded-lg border border-zinc-800 bg-[#111114]/90 p-5 sm:p-7">
        <div className="flex flex-col gap-4 border-b border-zinc-800/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[#33E092]/30 bg-[#33E092]/10 px-2.5 py-1 font-mono text-xs font-medium text-[#33E092]">
              <LuWandSparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Langkah Utama · Mode Tugas</span>
            </span>
            <h3 className="mt-2.5 font-display text-lg sm:text-xl font-bold text-zinc-50">
              Pasang Skill bang-motion &amp; lemo-opuscar Lewat Prompt
            </h3>
            <p className="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-400">
              Buka Gemini Web, pastikan mode di bawah kolom input berada di{' '}
              <strong className="font-medium text-zinc-200">Mode Tugas</strong>{' '}
              (bukan Obrolan), lalu kirim kedua prompt berikut satu per satu:
            </p>
          </div>

          <a
            href={REPO_LINKS.geminiWeb}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md bg-[#33E092] px-4 py-2.5 text-sm font-semibold text-[#09090B] transition-colors hover:bg-[#0CCE6B] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <span>Buka Gemini Web (Mode Tugas)</span>
            <LuExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {GEMINI_INSTALL_PROMPTS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-4 rounded-lg border border-zinc-800 bg-[#18181B]/60 p-4 sm:p-5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-zinc-50">
                    <span className="mr-2 font-mono text-sm text-[#33E092] tabular-nums">
                      {item.stepNumber}.
                    </span>
                    Install Skill {item.skillName}
                  </h4>
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-sm font-mono text-xs text-zinc-400 transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                  >
                    <span>{item.repoName}</span>
                    <LuArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                </div>

                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>

                <div className="mt-3 rounded-md border border-zinc-800 bg-[#09090B] px-3.5 py-3 font-mono text-xs sm:text-sm leading-relaxed text-[#33E092]">
                  <span>Tolong install skill ini </span>
                  <span className="inline-block max-w-full break-words">
                    {renderBreakableUrl(item.repoUrl)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onCopy(item.id, item.prompt)}
                  className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-md bg-[#33E092] px-4 py-2 text-xs sm:text-sm font-semibold text-[#09090B] transition-colors hover:bg-[#0CCE6B] whitespace-nowrap sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  {copiedId === item.id ? (
                    <>
                      <LuCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Prompt Tersalin</span>
                    </>
                  ) : (
                    <>
                      <LuCopy className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Salin Prompt {item.skillName}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Failure Callout: What happens if the first prompt fails */}
      <div className="rounded-lg border border-zinc-800 bg-[#111114]/90 p-5 sm:p-7">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          <div className="min-w-0 space-y-3 lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 font-mono text-xs font-medium text-red-300">
              <LuTriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Jika Prompt Pertama Gagal</span>
            </span>

            <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-50">
              Gemini Web Tidak Bisa Mengunduh &amp; Memasang Skill?
            </h3>

            <p className="text-sm leading-relaxed text-zinc-400">
              Jika prompt pertama gagal karena Gemini Web belum bisa mengunduh
              dan memasang skill-nya (muncul pesan{' '}
              <strong className="font-medium text-zinc-200">
                &ldquo;Gagal menginstal repositori karena kendala koneksi
                internet&rdquo;
              </strong>{' '}
              atau akses internet untuk komputer jarak jauh sedang nonaktif
              seperti pada gambar di samping), lanjutkan ke 5 langkah aktivasi
              di bawah ini.
            </p>

            <p className="text-xs leading-relaxed text-zinc-300">
              Klik gambar di samping untuk memperbesar tampilan pesan error dari
              Gemini Web.
            </p>
          </div>

          <figure className="lg:col-span-5">
            <button
              type="button"
              onClick={() => onZoomScreenshot(GEMINI_FAILURE_SCREENSHOT)}
              aria-label={`Perbesar gambar ${GEMINI_FAILURE_SCREENSHOT.title}`}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-md border border-zinc-800 bg-[#09090B] text-left transition-colors hover:border-[#33E092]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <Image
                src={GEMINI_FAILURE_SCREENSHOT.src}
                alt={GEMINI_FAILURE_SCREENSHOT.title}
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-contain p-2 transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <span className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-[#09090B]/90 px-2.5 py-1 text-xs font-medium text-zinc-100">
                <LuZoomIn
                  className="h-3.5 w-3.5 text-[#33E092]"
                  aria-hidden="true"
                />
                <span>Perbesar</span>
              </span>
            </button>
          </figure>
        </div>
      </div>

      {/* 5-Step Recovery Timeline */}
      <GeminiRecoveryTimeline
        copiedId={copiedId}
        onCopy={onCopy}
        onZoomScreenshot={onZoomScreenshot}
      />
    </div>
  );
}
