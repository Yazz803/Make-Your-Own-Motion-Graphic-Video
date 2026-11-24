'use client';

import Image from 'next/image';
import { LuX } from 'react-icons/lu';
import { Modal } from '@/components/ui';
import type { GeminiScreenshotRef } from '@/types';

interface ScreenshotLightboxModalProps {
  screenshot: GeminiScreenshotRef | null;
  onClose: () => void;
}

export default function ScreenshotLightboxModal({
  screenshot,
  onClose,
}: ScreenshotLightboxModalProps) {
  return (
    <Modal
      isOpen={screenshot !== null}
      onClose={onClose}
      ariaLabel={screenshot?.title}
      maxWidthClassName="max-w-4xl"
      backdropClassName="bg-black/85"
    >
      {screenshot && (
        <>
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5">
            <h4 className="font-display text-sm sm:text-base font-semibold text-zinc-50">
              {screenshot.title}
            </h4>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau gambar"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-50"
            >
              <LuX className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="relative aspect-[16/10] w-full bg-[#09090B]">
            <Image
              src={screenshot.src}
              alt={screenshot.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              referrerPolicy="no-referrer"
              className="object-contain"
            />
          </div>
          <p className="border-t border-zinc-800 px-5 py-3.5 text-xs sm:text-sm text-zinc-400">
            {screenshot.caption}
          </p>
        </>
      )}
    </Modal>
  );
}
