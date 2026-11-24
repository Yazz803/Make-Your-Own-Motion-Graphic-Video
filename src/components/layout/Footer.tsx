import { LuArrowUpRight } from 'react-icons/lu';
import { SiGithub, SiGooglegemini } from 'react-icons/si';
import { FOOTER_ANCHOR_LINKS, REPO_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer
      data-tour-target="footer"
      className="relative z-10 border-t border-zinc-800/80 bg-[#09090B]/90 py-10"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left: Built-with / Source attribution row matching reference footer */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <span className="font-medium text-zinc-400">
              Sumber &amp; Platform:
            </span>

            <a
              href={REPO_LINKS.bangMotion}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm font-medium text-zinc-100 transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <SiGithub className="h-4 w-4 text-zinc-300" aria-hidden="true" />
              <span>bang-motion</span>
            </a>

            <a
              href={REPO_LINKS.lemoOpuscar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm font-medium text-zinc-100 transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <SiGithub className="h-4 w-4 text-zinc-300" aria-hidden="true" />
              <span>lemo-opuscar</span>
            </a>

            <a
              href={REPO_LINKS.geminiWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm font-medium text-zinc-100 transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <SiGooglegemini
                className="h-4 w-4 text-[#33E092]"
                aria-hidden="true"
              />
              <span>Gemini Web</span>
            </a>
          </div>

          {/* Right: Copyright & runtime note */}
          <p className="text-xs text-zinc-400">
            Copyright © Motion Graphic Studio {new Date().getFullYear()} ·
            Berjalan di Mode Tugas Gemini Web pengguna
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-zinc-800/60 pt-5 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_ANCHOR_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-sm transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={REPO_LINKS.projectRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm font-mono text-xs text-zinc-300 transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <SiGithub
              className="h-3.5 w-3.5 shrink-0 text-zinc-400"
              aria-hidden="true"
            />
            <span>
              Yazz803/
              <wbr />
              Make-Your-Own-Motion-Graphic-Video
            </span>
            <LuArrowUpRight
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
