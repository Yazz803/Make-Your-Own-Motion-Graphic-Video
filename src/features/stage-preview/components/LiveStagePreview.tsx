'use client';

import { useState } from 'react';
import {
  LuCode,
  LuDownload,
  LuMonitor,
  LuPlay,
  LuRotateCcw,
  LuSmartphone,
  LuSquare,
  LuTrash2,
} from 'react-icons/lu';
import { STAGE_DEMO_HTML } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { AspectRatio } from '@/types';

interface LiveStagePreviewProps {
  aspectRatio: AspectRatio;
  onChangeAspectRatio: (ratio: AspectRatio) => void;
}

const ASPECT_RATIO_OPTIONS = [
  { id: '9:16', label: '9:16', Icon: LuSmartphone },
  { id: '16:9', label: '16:9', Icon: LuMonitor },
  { id: '1:1', label: '1:1', Icon: LuSquare },
] as const;

export default function LiveStagePreview({
  aspectRatio,
  onChangeAspectRatio,
}: LiveStagePreviewProps) {
  const [htmlCode, setHtmlCode] = useState<string>(
    STAGE_DEMO_HTML[aspectRatio]
  );
  const [hasCustomCode, setHasCustomCode] = useState<boolean>(false);
  const [replayKey, setReplayKey] = useState<number>(0);

  const activeHtml = hasCustomCode ? htmlCode : STAGE_DEMO_HTML[aspectRatio];

  const handleCodeChange = (val: string) => {
    setHasCustomCode(true);
    setHtmlCode(val);
  };

  const handleLoadDemo = () => {
    setHasCustomCode(false);
    setHtmlCode(STAGE_DEMO_HTML[aspectRatio]);
    setReplayKey((k) => k + 1);
  };

  const handleClear = () => {
    setHasCustomCode(true);
    setHtmlCode('');
  };

  const handleDownloadHtml = () => {
    const content = activeHtml.trim();
    if (!content) return;
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `motion-graphic-studio-${aspectRatio.replace(':', 'x')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const stageAspectClass =
    aspectRatio === '9:16'
      ? 'aspect-[9/16] w-full max-w-[300px] sm:max-w-[330px]'
      : aspectRatio === '1:1'
        ? 'aspect-square w-full max-w-[440px]'
        : 'aspect-video w-full';

  return (
    <section
      id="preview"
      className="scroll-mt-16 border-t border-zinc-800/80 py-16 sm:py-20 lg:py-24"
    >
      <div
        data-tour-target="preview"
        className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl [text-wrap:balance]">
              Live Stage Preview HTML
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
              Jika Mode Tugas Gemini Web juga memberikan berkas{' '}
              <code className="font-mono text-zinc-200">index.html</code>{' '}
              (misalnya dari{' '}
              <code className="font-mono text-zinc-200">@bang-motion</code>),
              tempel kodenya di sini untuk menguji rasio 9:16, 16:9, atau 1:1
              dan mengunduhnya.
            </p>
          </div>

          {/* Aspect ratio switcher */}
          <div className="inline-flex items-center gap-1.5 self-start rounded-md border border-zinc-800 bg-[#111114]/90 p-1 md:self-auto">
            {ASPECT_RATIO_OPTIONS.map(({ id, label, Icon }) => {
              const active = aspectRatio === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onChangeAspectRatio(id);
                    setReplayKey((k) => k + 1);
                  }}
                  className={cn(
                    'inline-flex min-h-[38px] items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                    active
                      ? 'bg-[#33E092] font-semibold text-[#09090B]'
                      : 'text-zinc-300 hover:text-[#33E092]'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-column stage & code workspace */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Code input pane */}
          <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-[#111114]/90 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <LuCode className="h-4 w-4 text-[#33E092]" aria-hidden="true" />
                <span>Kode HTML Motion Graphic</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleLoadDemo}
                  className="inline-flex min-h-[34px] items-center gap-1.5 rounded-md border border-zinc-800 bg-[#18181B] px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-[#33E092]/60 hover:text-[#33E092] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  <LuPlay className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Muat Demo</span>
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Bersihkan kode HTML"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 bg-[#18181B] text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  <LuTrash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <textarea
              aria-label="Editor tempel kode HTML hasil Gemini Web"
              value={activeHtml}
              onChange={(e) => handleCodeChange(e.target.value)}
              spellCheck={false}
              placeholder="Tempel seluruh kode <!DOCTYPE html>... dari Gemini Web di sini untuk langsung melihat pratinjau animasinya."
              className="min-h-[320px] flex-1 resize-none bg-[#09090B] p-4 font-mono text-xs leading-relaxed text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#33E092] lg:min-h-[460px]"
            />
          </div>

          {/* Sandboxed Stage Viewport */}
          <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-[#111114]/90 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 px-4 py-3">
              <div className="font-mono text-xs text-zinc-400 tabular-nums">
                Stage {aspectRatio} · {hasCustomCode ? 'Kode Kustom' : 'Demo Bawaan'}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReplayKey((k) => k + 1)}
                  className="inline-flex min-h-[34px] items-center gap-1.5 rounded-md border border-zinc-800 bg-[#18181B] px-3 py-1 text-xs font-medium text-zinc-200 transition-colors hover:border-[#33E092]/60 hover:text-[#33E092] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Putar Ulang</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadHtml}
                  disabled={!activeHtml.trim()}
                  className="inline-flex min-h-[34px] items-center gap-1.5 rounded-md bg-[#33E092] px-3 py-1 text-xs font-semibold text-[#09090B] transition-colors hover:bg-[#0CCE6B] disabled:opacity-40 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  <LuDownload className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Unduh .html</span>
                </button>
              </div>
            </div>

            <div className="flex min-h-[380px] flex-1 items-center justify-center bg-[#070709] p-5 sm:p-8 lg:min-h-[460px]">
              {activeHtml.trim() ? (
                <div
                  className={cn(
                    'relative mx-auto overflow-hidden rounded-md border border-zinc-800 bg-black shadow-2xl',
                    stageAspectClass
                  )}
                >
                  <iframe
                    key={`${aspectRatio}-${replayKey}`}
                    title="Pratinjau Motion Graphic"
                    srcDoc={activeHtml}
                    sandbox="allow-scripts"
                    className="h-full w-full border-0"
                  />
                </div>
              ) : (
                <div className="max-w-sm text-center">
                  <p className="text-sm font-medium text-zinc-200">
                    Stage pratinjau kosong
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                    Tempel kode HTML hasil Gemini Web di kolom editor, atau klik
                    Muat Demo untuk melihat contoh animasi bawaan.
                  </p>
                  <button
                    type="button"
                    onClick={handleLoadDemo}
                    className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-md bg-[#33E092] px-4 py-2 text-xs font-semibold text-[#09090B] hover:bg-[#0CCE6B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                  >
                    <LuPlay className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Muat Contoh Animasi</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
