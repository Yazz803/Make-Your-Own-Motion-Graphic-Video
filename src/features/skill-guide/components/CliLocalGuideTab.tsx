'use client';

import { LuArrowUpRight, LuCheck, LuCopy } from 'react-icons/lu';
import { CLI_COMMANDS } from '@/lib/constants';

interface CliLocalGuideTabProps {
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
}

export default function CliLocalGuideTab({
  copiedId,
  onCopy,
}: CliLocalGuideTabProps) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {CLI_COMMANDS.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#121215] p-5 sm:p-6"
        >
          <div>
            <div className="flex items-center justify-between gap-3 text-xs text-zinc-400">
              <span className="font-mono text-zinc-300">{item.repoName}</span>
              <a
                href={item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-100"
              >
                <span>Buka GitHub</span>
                <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
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
                onClick={() => onCopy(item.id, item.command)}
                aria-label={`Salin perintah ${item.repoName}`}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-800 text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-50"
              >
                {copiedId === item.id ? (
                  <LuCheck
                    className="h-4 w-4 text-[#F2B705]"
                    aria-hidden="true"
                  />
                ) : (
                  <LuCopy className="h-4 w-4" aria-hidden="true" />
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
          Jika kamu menjalankan skill di terminal lokal (Gemini CLI / Claude
          Code) untuk merender video MP4 tanpa Gemini Web, pastikan perangkat
          sudah memasang{' '}
          <strong className="font-medium text-zinc-200">Node.js 18+</strong>,{' '}
          <strong className="font-medium text-zinc-200">Python 3.10+</strong>,
          dan <strong className="font-medium text-zinc-200">FFmpeg</strong>.
          Untuk alur paling praktis tanpa instalasi lokal, cukup gunakan tab{' '}
          <strong className="font-medium text-zinc-200">
            Gemini Web (Mode Tugas)
          </strong>
          .
        </p>
      </div>
    </div>
  );
}
