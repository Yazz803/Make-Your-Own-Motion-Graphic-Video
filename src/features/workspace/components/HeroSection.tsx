'use client';

import { useRef } from 'react';
import {
  LuArrowDown,
  LuArrowRight,
  LuLayers,
  LuPlay,
  LuWandSparkles,
} from 'react-icons/lu';
import { SiGithub, SiGooglegemini } from 'react-icons/si';
import { MOTION_STYLES, REPO_LINKS } from '@/lib/constants';
import {
  gsap,
  REDUCED_MOTION_QUERY,
  STUDIO_EASE,
  useGSAP,
} from '@/lib/gsap-config';
import type { AspectRatio, MotionStyle } from '@/types';
import IsometricCubeCanvas from './IsometricCubeCanvas';
import WorkflowStrip from './WorkflowStrip';

interface HeroSectionProps {
  selectedStyle: MotionStyle;
  aspectRatio: AspectRatio;
  ambientMotion: boolean;
}

export default function HeroSection({
  selectedStyle,
  aspectRatio,
  ambientMotion,
}: HeroSectionProps) {
  const heroScopeRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(REDUCED_MOTION_QUERY, () => {
        const tl = gsap.timeline({
          defaults: { ease: STUDIO_EASE.smooth },
        });

        tl.from('.hero-reveal', {
          y: 18,
          opacity: 0,
          duration: 0.55,
          stagger: 0.07,
          clearProps: 'transform,opacity',
        }).from(
          '.hero-showcase',
          {
            y: 16,
            opacity: 0,
            scale: 0.985,
            duration: 0.6,
            clearProps: 'transform,opacity',
          },
          '-=0.38'
        );

        gsap.from('.workflow-step', {
          y: 14,
          opacity: 0,
          duration: 0.45,
          stagger: 0.07,
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

  return (
    <section ref={heroScopeRef} className="relative py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div
          data-tour-target="hero"
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12"
        >
          {/* Left Column: Squared Geometric Display Typography + Pipe Subtitle + Inline Links */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <h1 className="hero-reveal font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-zinc-50 sm:text-5xl lg:text-[52px] [text-wrap:balance]">
              Buat video motion graphic MP4 lewat Mode Tugas Gemini Web.
            </h1>

            <p className="hero-reveal mt-4 text-sm sm:text-base font-medium text-zinc-300">
              {MOTION_STYLES.length} Gaya Visual | @bang-motion &amp;
              @lemo-opuscar | Naskah VO → Audio → MP4
            </p>

            <p className="hero-reveal mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-zinc-400">
              Jelajahi seluruh gaya visual resmi dari bang-motion dan
              lemo-opuscar, susun prompt otomatis berawalan{' '}
              <code className="font-mono text-zinc-200">@bang-motion</code> atau{' '}
              <code className="font-mono text-zinc-200">@lemo-opuscar</code>,
              lalu produksi naskah VO, SFX, running text per kata, hingga video
              MP4 dengan akun Gemini Web milikmu.
            </p>

            <div className="hero-reveal mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href="#studio"
                className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#33E092] px-5 py-2.5 text-sm font-semibold text-[#09090B] transition-colors duration-150 hover:bg-[#0CCE6B] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <span>Mulai Buat Prompt</span>
                <LuArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href="#panduan"
                className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-zinc-800 bg-[#111114]/90 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-[#33E092] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <span>Cara Pasang Skill</span>
                <LuArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            {/* Inline monochrome icon + label links matching reference hero link row */}
            <div className="hero-reveal mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-zinc-300 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5">
              <a
                href="#katalog"
                className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <LuLayers className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                <span>Katalog {MOTION_STYLES.length} Gaya</span>
              </a>
              <a
                href="#preview"
                className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <LuPlay className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                <span>Live Preview</span>
              </a>
              <a
                href="#panduan"
                className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <LuWandSparkles
                  className="h-4 w-4 text-zinc-400"
                  aria-hidden="true"
                />
                <span>Panduan Skill</span>
              </a>
              <a
                href={REPO_LINKS.bangMotion}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <SiGithub className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                <span>bang-motion</span>
              </a>
              <a
                href={REPO_LINKS.lemoOpuscar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <SiGithub className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                <span>lemo-opuscar</span>
              </a>
              <a
                href={REPO_LINKS.geminiWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-[#33E092] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                <SiGooglegemini
                  className="h-4 w-4 text-zinc-400"
                  aria-hidden="true"
                />
                <span>Gemini Web</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Isometric Wireframe Emerald Cube Cluster */}
          <div className="hero-showcase flex flex-col items-center lg:col-span-5">
            <div className="relative h-[290px] w-full max-w-[440px] sm:h-[340px]">
              <IsometricCubeCanvas animated={ambientMotion} />
            </div>

            <div className="mt-2 flex w-full max-w-[440px] flex-wrap items-center justify-between gap-2 rounded-md border border-zinc-800/90 bg-[#111114]/85 px-3.5 py-2.5 text-xs">
              <span className="font-mono text-zinc-300 tabular-nums">
                Gaya Aktif:{' '}
                <span className="text-[#33E092]">
                  {selectedStyle.skillHandle}
                </span>{' '}
                · {selectedStyle.name} · {aspectRatio}
              </span>
              <a
                href="#katalog"
                className="rounded-sm font-medium text-[#33E092] hover:underline underline-offset-4 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E092] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              >
                Ganti gaya
              </a>
            </div>
          </div>
        </div>

        <WorkflowStrip />
      </div>
    </section>
  );
}
