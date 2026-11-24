'use client';

import { useEffect, useRef } from 'react';

interface StarfieldCanvasProps {
  animated: boolean;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  phase: number;
  speed: number;
}

interface ConstellationEdge {
  a: number;
  b: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  maxLife: number;
  hue: 'cyan' | 'indigo';
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export default function StarfieldCanvas({ animated }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReduced = mediaQuery.matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let stars: Star[] = [];
    let edges: ConstellationEdge[] = [];
    let shootingStars: ShootingStar[] = [];
    let rafId = 0;
    let lastTime = performance.now();
    let nextMeteorIn = 2.4;

    const buildScene = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = createSeededRandom(20261124);
      const starCount = Math.min(130, Math.max(55, Math.floor((width * height) / 14500)));
      stars = Array.from({ length: starCount }, () => ({
        x: rand() * width,
        y: rand() * height,
        radius: 0.65 + rand() * 1.15,
        baseAlpha: 0.16 + rand() * 0.48,
        phase: rand() * Math.PI * 2,
        speed: 0.4 + rand() * 0.9,
      }));

      // Sparse geometric constellation clusters matching the cosmic portfolio backdrop
      edges = [];
      const maxDist = Math.min(150, Math.max(95, width * 0.11));
      for (let i = 0; i < stars.length; i += 3) {
        let links = 0;
        for (let j = i + 1; j < stars.length && links < 2; j += 1) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > 36 && dist < maxDist && rand() > 0.58) {
            edges.push({ a: i, b: j });
            links += 1;
          }
        }
      }

      // Seed one subtle static streak when reduced motion is active
      shootingStars = prefersReduced || !animated
        ? [
            {
              x: width * 0.72,
              y: height * 0.22,
              vx: 1,
              vy: 0.55,
              length: 68,
              life: 0.45,
              maxLife: 1,
              hue: 'cyan',
            },
          ]
        : [];
    };

    const spawnMeteor = () => {
      const startX = width * (0.15 + Math.random() * 0.7);
      const startY = height * (0.05 + Math.random() * 0.45);
      const speed = 260 + Math.random() * 140;
      const angle = Math.PI * (0.14 + Math.random() * 0.12);
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 56 + Math.random() * 44,
        life: 0,
        maxLife: 0.85 + Math.random() * 0.45,
        hue: Math.random() > 0.4 ? 'cyan' : 'indigo',
      });
    };

    const drawFrame = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const t = now / 1000;

      ctx.clearRect(0, 0, width, height);

      // Constellation lines
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.085)';
      ctx.beginPath();
      for (const edge of edges) {
        const s1 = stars[edge.a];
        const s2 = stars[edge.b];
        ctx.moveTo(s1.x, s1.y);
        ctx.lineTo(s2.x, s2.y);
      }
      ctx.stroke();

      // Stars
      for (const star of stars) {
        const twinkle =
          animated && !prefersReduced
            ? 0.72 + 0.28 * Math.sin(t * star.speed + star.phase)
            : 1;
        ctx.fillStyle = `rgba(244, 244, 245, ${(star.baseAlpha * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shooting stars
      if (animated && !prefersReduced) {
        nextMeteorIn -= dt;
        if (nextMeteorIn <= 0) {
          spawnMeteor();
          nextMeteorIn = 3.2 + Math.random() * 4.5;
        }
      }

      for (let i = shootingStars.length - 1; i >= 0; i -= 1) {
        const m = shootingStars[i];
        if (animated && !prefersReduced) {
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          m.life += dt;
        }

        const progress = m.life / m.maxLife;
        if (progress >= 1) {
          shootingStars.splice(i, 1);
          continue;
        }

        const fade = Math.sin(progress * Math.PI);
        const mag = Math.hypot(m.vx, m.vy) || 1;
        const tailX = m.x - (m.vx / mag) * m.length;
        const tailY = m.y - (m.vy / mag) * m.length;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        grad.addColorStop(
          1,
          m.hue === 'cyan'
            ? `rgba(56, 189, 248, ${(0.75 * fade).toFixed(3)})`
            : `rgba(129, 140, 248, ${(0.7 * fade).toFixed(3)})`
        );

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      }

      if (animated && !prefersReduced) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    };

    const handleMotionChange = () => {
      prefersReduced = mediaQuery.matches;
      window.cancelAnimationFrame(rafId);
      buildScene();
      drawFrame(performance.now());
    };

    buildScene();
    drawFrame(performance.now());

    window.addEventListener('resize', buildScene);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', buildScene);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [animated]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
