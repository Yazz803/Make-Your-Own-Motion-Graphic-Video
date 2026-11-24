'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import {
  LuArrowUpRight,
  LuExternalLink,
  LuMenu,
  LuOrbit,
  LuPause,
  LuX,
} from 'react-icons/lu';
import { SiGithub } from 'react-icons/si';
import { NAV_LINKS, REPO_LINKS } from '@/lib/constants';
import {
  gsap,
  REDUCED_MOTION_QUERY,
  STUDIO_EASE,
  useGSAP,
} from '@/lib/gsap-config';

interface NavbarProps {
  ambientMotion: boolean;
  onToggleAmbientMotion: () => void;
}

export default function Navbar({
  ambientMotion,
  onToggleAmbientMotion,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(REDUCED_MOTION_QUERY, () => {
        if (progressRef.current) {
          gsap.fromTo(
            progressRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.15,
              },
            }
          );
        }
      });
    },
    { scope: headerRef }
  );

  useGSAP(
    () => {
      if (!mobileOpen || !mobileMenuRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(REDUCED_MOTION_QUERY, () => {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.2, ease: STUDIO_EASE.snappy }
        );
      });
    },
    { dependencies: [mobileOpen] }
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#09090B]/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-2 sm:gap-4 xl:gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand mark + wordmark */}
        <a
          href="#top"
          className="group inline-flex items-center gap-2 sm:gap-2.5 font-display text-sm sm:text-lg xl:text-xl font-bold tracking-tight text-zinc-50 whitespace-nowrap shrink-0 rounded-sm transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
        >
          <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-800/90 bg-[#09090B] p-1 transition-colors group-hover:border-[#33E092]/60">
            <Image
              src="/assets/images/logo-mark.png"
              alt=""
              width={28}
              height={28}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span>Motion Graphic Studio</span>
        </a>

        {/* Zone 2: 4 centered navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden lg:flex items-center gap-4 xl:gap-7 text-sm font-medium text-zinc-300"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 rounded-sm px-1 py-1 text-zinc-300 transition-colors duration-150 hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] focus-visible:text-[#33E092]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Circular emerald ambient toggle + GitHub repo + primary Gemini Web CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleAmbientMotion}
            aria-pressed={ambientMotion}
            aria-label={
              ambientMotion
                ? 'Jeda animasi latar kosmik'
                : 'Aktifkan animasi latar kosmik'
            }
            title={
              ambientMotion
                ? 'Animasi latar kosmik aktif (klik untuk jeda)'
                : 'Animasi latar kosmik dijeda (klik untuk aktifkan)'
            }
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-zinc-800 bg-[#111114] text-[#33E092] transition-colors duration-150 hover:border-[#33E092]/60 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            {ambientMotion ? (
              <LuOrbit className="h-4 w-4" aria-hidden="true" />
            ) : (
              <LuPause className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <a
            href={REPO_LINKS.projectRepo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repositori GitHub Motion Graphic Studio"
            title={`Repositori GitHub (${REPO_LINKS.projectRepoSlug})`}
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 bg-[#111114] text-zinc-300 transition-colors duration-150 hover:border-[#33E092]/60 hover:bg-zinc-900 hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <SiGithub className="h-4 w-4" aria-hidden="true" />
          </a>

          <a
            href={REPO_LINKS.geminiWeb}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[36px] sm:min-h-[38px] items-center gap-1.5 sm:gap-2 rounded-md bg-[#33E092] px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#09090B] transition-colors duration-150 hover:bg-[#0CCE6B] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <span className="sm:hidden">Gemini Web</span>
            <span className="hidden sm:inline">Buka Gemini Web</span>
            <LuExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md border border-zinc-800 bg-[#111114] text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            {mobileOpen ? (
              <LuX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <LuMenu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Scroll progress hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-zinc-800/40"
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-[#33E092]/90 will-change-transform"
        />
      </div>

      {mobileOpen && (
        <nav
          ref={mobileMenuRef}
          aria-label="Navigasi seluler"
          className="border-t border-zinc-800 bg-[#09090B] px-4 py-3 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={REPO_LINKS.projectRepo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-1 flex min-h-[44px] items-center justify-between gap-2 border-t border-zinc-800/80 px-3 pt-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            >
              <span className="inline-flex items-center gap-2">
                <SiGithub className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                <span>Repositori GitHub</span>
              </span>
              <LuArrowUpRight
                className="h-4 w-4 text-zinc-400"
                aria-hidden="true"
              />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
