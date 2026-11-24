'use client';

import { useRef, useState } from 'react';
import { LuExternalLink, LuMenu, LuX } from 'react-icons/lu';
import { NAV_LINKS, REPO_LINKS } from '@/lib/constants';
import {
  gsap,
  REDUCED_MOTION_QUERY,
  STUDIO_EASE,
  useGSAP,
} from '@/lib/gsap-config';

export default function Navbar() {
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
      className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#09090B]/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="font-display text-base sm:text-lg font-bold tracking-tight text-zinc-50 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] rounded-sm"
        >
          Motion Graphic Studio
        </a>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 text-zinc-400 transition-colors duration-150 hover:text-zinc-50 focus-visible:outline-none focus-visible:text-[#F2B705]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action (+ mobile menu toggle on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={REPO_LINKS.geminiWeb}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] items-center gap-2 rounded-lg bg-[#F2B705] px-4 py-2 text-xs sm:text-sm font-semibold text-[#09090B] transition-colors duration-150 hover:bg-[#FFD038] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <span>Buka Gemini Web</span>
            <LuExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
          >
            {mobileOpen ? (
              <LuX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <LuMenu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Subtle GSAP ScrollTrigger timeline progress hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-transparent"
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-[#F2B705]/90 will-change-transform"
        />
      </div>

      {mobileOpen && (
        <nav
          ref={mobileMenuRef}
          aria-label="Navigasi seluler"
          className="border-t border-zinc-800 bg-[#09090B] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-zinc-50"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
