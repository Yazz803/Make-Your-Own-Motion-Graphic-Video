'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { LuArrowDown, LuArrowRight } from 'react-icons/lu';
import { HERO_GALLERY_IMAGE, MOTION_STYLES } from '@/lib/constants';
import {
  gsap,
  REDUCED_MOTION_QUERY,
  STUDIO_EASE,
  useGSAP,
} from '@/lib/gsap-config';
import type { AspectRatio, MotionStyle } from '@/types';
import WorkflowStrip from './WorkflowStrip';

interface HeroSectionProps {
  selectedStyle: MotionStyle;
  aspectRatio: AspectRatio;
}

export default function HeroSection({
  selectedStyle,
  aspectRatio,
}: HeroSectionProps) {
  const [failedHeroUrl, setFailedHeroUrl] = useState<string | null>(null);

  const heroScopeRef = useRef<HTMLElement | null>(null);
  const heroMediaRef = useRef<HTMLDivElement | null>(null);
  const heroImageWrapRef = useRef<HTMLDivElement | null>(null);
  const hasMountedStyleRef = useRef<boolean>(false);

  const heroImageSrc =
    failedHeroUrl === selectedStyle.imageUrl
      ? HERO_GALLERY_IMAGE
      : selectedStyle.imageUrl;

  // Orchestrated GSAP hero entrance, subtle parallax, and workflow strip stagger
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(REDUCED_MOTION_QUERY, () => {
        const tl = gsap.timeline({
          defaults: { ease: STUDIO_EASE.smooth },
        });

        tl.from('.hero-reveal', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.075,
          clearProps: 'transform,opacity',
        }).from(
          '.hero-showcase',
          {
            y: 18,
            opacity: 0,
            scale: 0.985,
            duration: 0.65,
            clearProps: 'transform,opacity',
          },
          '-=0.42'
        );

        if (heroImageWrapRef.current && heroMediaRef.current) {
          gsap.fromTo(
            heroImageWrapRef.current,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: heroMediaRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        gsap.from('.workflow-step', {
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: STUDIO_EASE.smooth,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.workflow-strip',
            start: 'top 90%',
            once: true,
          },
        });
      });
    },
    { scope: heroScopeRef }
  );

  // Subtle cross-settle when active style changes
  useGSAP(
    () => {
      if (!hasMountedStyleRef.current) {
        hasMountedStyleRef.current = true;
        return;
      }
      if (!heroMediaRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(REDUCED_MOTION_QUERY, () => {
        gsap.fromTo(
          heroMediaRef.current,
          { opacity: 0.78, scale: 0.99 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.32,
            ease: STUDIO_EASE.snappy,
            clearProps: 'transform,opacity',
          }
        );
      });
    },
    { dependencies: [selectedStyle.id] }
  );

  return (
    <section ref={heroScopeRef} className="relative py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          {/* Left Column: Typographic Hierarchy */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="hero-reveal text-xs sm:text-sm font-medium text-zinc-400">
              {MOTION_STYLES.length} Gaya Visual · @bang-motion · @lemo-opuscar
              · Mode Tugas Gemini Web
            </p>

            <h1 className="hero-reveal mt-4 font-display text-4xl font-bold leading-[1.06] tracking-tight text-zinc-50 sm:text-5xl lg:text-[54px] [text-wrap:balance]">
              Buat video motion graphic MP4 langsung lewat Mode Tugas Gemini
              Web.
            </h1>

            <p className="hero-reveal mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
              Jelajahi seluruh gaya visual resmi dari bang-motion dan
              lemo-opuscar, susun prompt otomatis berawalan{' '}
              <code className="font-mono text-zinc-200">@bang-motion</code> atau{' '}
              <code className="font-mono text-zinc-200">@lemo-opuscar</code>,
              lalu produksi naskah VO, SFX, running text per kata, hingga video
              MP4 dengan akun Gemini Web milikmu.
            </p>

            <div className="hero-reveal mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#studio"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-[#F2B705] px-6 py-3 text-sm font-semibold text-[#09090B] transition-colors duration-150 hover:bg-[#FFD038] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <span>Mulai Buat Prompt</span>
                <LuArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href="#panduan"
                className="inline-flex min-h-[46px] items-center gap-2 px-2 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50 whitespace-nowrap"
              >
                <span>Cara Pasang Skill (Keahlian)</span>
                <LuArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Matching-height Visual Showcase showing real repo preview of selected style */}
          <div className="hero-showcase lg:col-span-6">
            <div
              ref={heroMediaRef}
              className="relative flex h-full min-h-[300px] sm:min-h-[380px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#121215]"
            >
              <div
                ref={heroImageWrapRef}
                className="absolute -inset-y-4 inset-x-0 will-change-transform"
              >
                <Image
                  key={heroImageSrc}
                  src={heroImageSrc}
                  alt={`Foto resmi gaya visual ${selectedStyle.name} dari ${selectedStyle.repo}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  onError={() => setFailedHeroUrl(selectedStyle.imageUrl)}
                  className="object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Bottom scrim metadata & quick style switch */}
              <div className="relative mt-auto p-5 sm:p-6">
                <p className="font-mono text-xs text-zinc-300 tabular-nums">
                  Gaya Aktif ·{' '}
                  <span className="text-[#F2B705]">
                    {selectedStyle.skillHandle}
                  </span>{' '}
                  · Layout {aspectRatio}
                </p>
                <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-zinc-50">
                    {selectedStyle.name}
                  </h2>
                  <a
                    href="#katalog"
                    className="text-xs sm:text-sm font-medium text-[#F2B705] hover:underline underline-offset-4 whitespace-nowrap"
                  >
                    Jelajahi semua {MOTION_STYLES.length} gaya
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <WorkflowStrip />
      </div>
    </section>
  );
}
