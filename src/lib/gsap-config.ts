'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const STUDIO_EASE = {
  smooth: 'power3.out',
  snappy: 'power2.out',
  expo: 'expo.out',
} as const;

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, useGSAP };
