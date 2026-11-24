'use client';

import Image from 'next/image';
import { LuDownload, LuX } from 'react-icons/lu';
import { Modal } from '@/components/ui';
import { DEVELOPER_SUPPORT } from '@/lib/constants';

interface QrisLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QrisLightboxModal({
  isOpen,
  onClose,
}: QrisLightboxModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy="qris-modal-title"
      maxWidthClassName="max-w-md"
      backdropClassName="bg-black/85"
      panelClassName="max-h-[92vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5">
        <div>
          <h3
            id="qris-modal-title"
            className="font-display text-base font-bold text-zinc-50"
          >
            QRIS Support Developer
          </h3>
          <p className="mt-0.5 font-mono text-xs text-zinc-400 tabular-nums">
            {DEVELOPER_SUPPORT.qrisMerchantName} · NMID{' '}
            {DEVELOPER_SUPPORT.qrisNmid}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup pratinjau QRIS"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
        >
          <LuX className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="relative aspect-[3/4] max-h-[62vh] w-full bg-[#09090B]">
        <Image
          src={DEVELOPER_SUPPORT.qrisImageSrc}
          alt={`QRIS Support Developer ${DEVELOPER_SUPPORT.name}`}
          fill
          sizes="(max-width: 640px) 100vw, 448px"
          className="object-contain p-3"
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-zinc-800 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-400">
          Scan lewat e-wallet atau mobile banking Indonesia.
        </p>
        <a
          href={DEVELOPER_SUPPORT.qrisImageSrc}
          download={DEVELOPER_SUPPORT.qrisDownloadName}
          className="inline-flex min-h-[40px] shrink-0 items-center justify-center gap-2 rounded-md bg-[#33E092] px-4 py-2 text-xs font-semibold text-[#09090B] transition-colors hover:bg-[#0CCE6B] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
        >
          <LuDownload className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Unduh QRIS</span>
        </a>
      </div>
    </Modal>
  );
}
