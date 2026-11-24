'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { IconType } from 'react-icons';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaThreads,
  FaWhatsapp,
} from 'react-icons/fa6';
import {
  LuArrowUpRight,
  LuDownload,
  LuExternalLink,
  LuZoomIn,
} from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
import { DEVELOPER_SUPPORT } from '@/lib/constants';
import type { SocialPlatformId } from '@/types';
import QrisLightboxModal from './QrisLightboxModal';

const SOCIAL_ICONS: Record<SocialPlatformId, IconType> = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  whatsapp: FaWhatsapp,
  threads: FaThreads,
  facebook: FaFacebook,
};

export default function SupportDeveloperSection() {
  const [qrisModalOpen, setQrisModalOpen] = useState(false);

  return (
    <section
      id="support"
      className="scroll-mt-16 border-t border-zinc-800/80 bg-[#09090B]/60 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl [text-wrap:balance]">
            Support Developer
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
            Motion Graphic Studio dikembangkan dan dirawat secara terbuka oleh{' '}
            <strong className="font-medium text-zinc-200">
              {DEVELOPER_SUPPORT.name}
            </strong>
            . Jika alat ini membantu alur produksi videomu, kamu bisa mendukung
            pengembangan berikutnya lewat QRIS atau terhubung melalui kanal
            sosial di bawah ini.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: QRIS Card */}
          <div className="flex flex-col justify-between gap-5 rounded-lg border border-zinc-800 bg-[#111114]/90 p-5 sm:p-6 lg:col-span-5">
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-zinc-50">
                Dukungan via QRIS
              </h3>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-400">
                Scan kode QRIS di bawah ini menggunakan aplikasi e-wallet atau
                mobile banking Indonesia mana pun.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setQrisModalOpen(true)}
              aria-label="Perbesar gambar QRIS Support Developer"
              className="group relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-md border border-zinc-800 bg-[#09090B] text-left transition-colors hover:border-[#33E092]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <Image
                src={DEVELOPER_SUPPORT.qrisImageSrc}
                alt={`QRIS Support Developer ${DEVELOPER_SUPPORT.name}`}
                fill
                sizes="(max-width: 640px) 280px, 300px"
                className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <span className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-[#09090B]/90 px-2.5 py-1 text-xs font-medium text-zinc-100">
                <LuZoomIn
                  className="h-3.5 w-3.5 text-[#33E092]"
                  aria-hidden="true"
                />
                <span>Perbesar</span>
              </span>
            </button>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-zinc-800/90 bg-[#09090B] px-3.5 py-2.5 text-xs">
                <span className="font-medium text-zinc-200">
                  {DEVELOPER_SUPPORT.qrisMerchantName}
                </span>
                <span className="font-mono text-[#33E092] tabular-nums">
                  NMID {DEVELOPER_SUPPORT.qrisNmid}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setQrisModalOpen(true)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#33E092] px-4 py-2.5 text-sm font-semibold text-[#09090B] transition-colors duration-150 hover:bg-[#0CCE6B] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  <LuZoomIn className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Perbesar QRIS</span>
                </button>

                <a
                  href={DEVELOPER_SUPPORT.qrisImageSrc}
                  download={DEVELOPER_SUPPORT.qrisDownloadName}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-zinc-800 bg-[#18181B] px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-[#33E092]/60 hover:text-[#33E092] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  <LuDownload className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Unduh QRIS</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Social Media Links + Project Repository */}
          <div className="flex flex-col justify-between gap-6 rounded-lg border border-zinc-800 bg-[#111114]/90 p-5 sm:p-6 lg:col-span-7">
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-zinc-50">
                Terhubung dengan Developer
              </h3>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-400">
                Punya masukan fitur, laporan bug, atau ingin berkolaborasi?
                Ikuti dan hubungi melalui kanal sosial media berikut.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {DEVELOPER_SUPPORT.socialLinks.map((item) => {
                  const Icon = SOCIAL_ICONS[item.id];
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[64px] items-center justify-between gap-3 rounded-md border border-zinc-800 bg-[#18181B]/80 px-4 py-3 transition-colors duration-150 hover:border-[#33E092]/60 hover:bg-[#18181B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-[#09090B] text-[#33E092] transition-colors group-hover:border-[#33E092]/50">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-zinc-100 transition-colors group-hover:text-[#33E092]">
                            {item.platform}
                          </span>
                          <span className="block font-mono text-xs text-zinc-400 whitespace-nowrap">
                            {item.handle}
                          </span>
                        </div>
                      </div>
                      <LuArrowUpRight
                        className="h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-[#33E092]"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-800/80 pt-5">
              <div className="flex flex-col gap-3 rounded-md border border-zinc-800 bg-[#09090B] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-400">
                    Repositori Open Source Proyek Ini
                  </p>
                  <p className="mt-0.5 font-mono text-xs font-medium text-zinc-100 sm:text-sm">
                    Yazz803/
                    <wbr />
                    Make-Your-Own-Motion-Graphic-Video
                  </p>
                </div>
                <a
                  href={DEVELOPER_SUPPORT.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-md border border-zinc-800 bg-[#18181B] px-4 py-2 text-xs sm:text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-[#33E092]/60 hover:text-[#33E092] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                >
                  <SiGithub className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Buka di GitHub</span>
                  <LuExternalLink
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QrisLightboxModal
        isOpen={qrisModalOpen}
        onClose={() => setQrisModalOpen(false)}
      />
    </section>
  );
}
