'use client';

import { LuX } from 'react-icons/lu';
import { Modal } from '@/components/ui';
import type { MotionStyle } from '@/types';
import StyleDetailContent from './StyleDetailContent';

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
      panelClassName="max-h-[90vh] overflow-y-auto overscroll-contain"
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

          <StyleDetailContent style={style} onUseStyle={onUseStyle} />
        </>
      )}
    </Modal>
  );
}
