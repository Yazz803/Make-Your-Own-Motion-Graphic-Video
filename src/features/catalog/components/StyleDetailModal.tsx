'use client';

import { LuArrowUpRight, LuX } from 'react-icons/lu';
import { Modal } from '@/components/ui';
import type { MotionStyle } from '@/types';
import StylePreviewThumb from './StylePreviewThumb';

interface StyleDetailModalProps {
  style: MotionStyle | null;
  onClose: () => void;
  onUseStyle: (style: MotionStyle) => void;
}

export default function StyleDetailModal({
  style,
  onClose,
  onUseStyle,
}: StyleDetailModalProps) {
  return (
    <Modal
      isOpen={style !== null}
      onClose={onClose}
      ariaLabelledBy="style-modal-title"
      maxWidthClassName="max-w-2xl"
      panelClassName="max-h-[90vh] overflow-y-auto"
    >
      {style && (
        <>
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 sm:px-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="font-mono text-[#33E092]">
                  {style.skillHandle}
                </span>
                <span aria-hidden="true">·</span>
                <span>{style.station}</span>
              </div>
              <h3
                id="style-modal-title"
                className="mt-0.5 font-display text-xl font-bold text-zinc-50"
              >
                {style.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup jendela detail"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <LuX className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="p-5 sm:p-6">
            <div className="overflow-hidden rounded-lg border border-zinc-800">
              <StylePreviewThumb style={style} />
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-zinc-300">
                  Bahasa Visual &amp; Tekstur
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {style.visualLanguage}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-300">
                  Pola Gerak Kamera &amp; Transisi
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {style.cameraGrammar}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t border-zinc-800/80 pt-5 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-300">
                    Cocok Digunakan Untuk
                  </h4>
                  <p className="mt-1.5 text-sm text-zinc-400">
                    {style.bestFor.join(' · ')}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-300">
                    Palet Referensi
                  </h4>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {style.palette.map((hex) => (
                      <div
                        key={hex}
                        className="flex items-center gap-1.5 font-mono text-xs text-zinc-400"
                      >
                        <span
                          style={{ backgroundColor: hex }}
                          className="h-3.5 w-3.5 rounded-sm border border-white/15"
                        />
                        <span>{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={style.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-sm text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <span>Lihat sumber di GitHub ({style.stylePath})</span>
                <LuArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onUseStyle(style)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#33E092] px-5 py-2.5 text-sm font-semibold text-[#09090B] transition-colors hover:bg-[#0CCE6B] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                Gunakan di Studio Prompt
              </button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
