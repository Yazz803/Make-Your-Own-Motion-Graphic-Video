'use client';

import { useEffect, useRef } from 'react';

interface IsometricCubeCanvasProps {
  animated: boolean;
}

interface CubeCoord {
  x: number;
  y: number;
  z: number;
}

// Stepped modular cluster of isometric cubes matching the reference hero wireframe
const CUBE_CLUSTER: CubeCoord[] = [
  // Base layer (z = 0)
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 2, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 1, y: 1, z: 0 },
  { x: 2, y: 1, z: 0 },
  { x: 0, y: 2, z: 0 },
  { x: 1, y: 2, z: 0 },
  // Middle layer (z = 1)
  { x: 0, y: 0, z: 1 },
  { x: 1, y: 0, z: 1 },
  { x: 0, y: 1, z: 1 },
  { x: 1, y: 1, z: 1 },
  // Top accent cube (z = 2)
  { x: 0, y: 0, z: 2 },
];

const CUBE_VERTICES: [number, number, number][] = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 1, 1],
];

const CUBE_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

export default function IsometricCubeCanvas({
  animated,
}: IsometricCubeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReduced = mediaQuery.matches;

    let width = 420;
    let height = 360;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let rafId = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = Math.max(260, Math.floor(rect?.width ?? 420));
      height = Math.max(260, Math.floor(rect?.height ?? 360));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (
      vx: number,
      vy: number,
      vz: number,
      scale: number,
      cx: number,
      cy: number,
      yawOffset: number,
      pitchOffset: number
    ) => {
      // Center cluster around (1.2, 1.2, 0.9)
      const x = vx - 1.25;
      const y = vy - 1.25;
      const z = vz - 0.85;

      const cosY = Math.cos(yawOffset);
      const sinY = Math.sin(yawOffset);
      const rx = x * cosY - y * sinY;
      const ry = x * sinY + y * cosY;

      const isoAngle = Math.PI / 6 + pitchOffset;
      const cosA = Math.cos(isoAngle);
      const sinA = Math.sin(isoAngle);

      const sx = cx + (rx - ry) * cosA * scale;
      const sy = cy + ((rx + ry) * sinA - z * 1.02) * scale;
      return { sx, sy };
    };

    const draw = (now: number) => {
      const t = now / 1000;
      const activeMotion = animated && !prefersReduced;

      if (activeMotion) {
        smoothX += (pointerX - smoothX) * 0.06;
        smoothY += (pointerY - smoothY) * 0.06;
      } else {
        smoothX = 0;
        smoothY = 0;
      }

      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width, height) * 0.175;
      const floatY = activeMotion ? Math.sin(t * 1.15) * 4 : 0;
      const yawOffset = activeMotion
        ? Math.sin(t * 0.45) * 0.06 + smoothX * 0.14
        : 0;
      const pitchOffset = activeMotion ? smoothY * 0.06 : 0;

      const cx = width * 0.52;
      const cy = height * 0.54 + floatY;

      // Deduplicate shared edges across adjacent cubes
      const edgeMap = new Map<
        string,
        { x1: number; y1: number; x2: number; y2: number; depth: number }
      >();

      for (const cube of CUBE_CLUSTER) {
        for (const [aIdx, bIdx] of CUBE_EDGES) {
          const va = CUBE_VERTICES[aIdx];
          const vb = CUBE_VERTICES[bIdx];
          const ax = cube.x + va[0];
          const ay = cube.y + va[1];
          const az = cube.z + va[2];
          const bx = cube.x + vb[0];
          const by = cube.y + vb[1];
          const bz = cube.z + vb[2];

          const keyA = `${ax},${ay},${az}`;
          const keyB = `${bx},${by},${bz}`;
          const edgeKey = keyA < keyB ? `${keyA}|${keyB}` : `${keyB}|${keyA}`;
          if (edgeMap.has(edgeKey)) continue;

          const p1 = project(ax, ay, az, scale, cx, cy, yawOffset, pitchOffset);
          const p2 = project(bx, by, bz, scale, cx, cy, yawOffset, pitchOffset);
          const depth = (ax + ay + az + bx + by + bz) / 2;
          edgeMap.set(edgeKey, {
            x1: p1.sx,
            y1: p1.sy,
            x2: p2.sx,
            y2: p2.sy,
            depth,
          });
        }
      }

      // Directional emerald glow gradient from upper-left dark zinc to lower-right #33E092
      const minX = cx - scale * 2.4;
      const minY = cy - scale * 2.4;
      const maxX = cx + scale * 2.4;
      const maxY = cy + scale * 2.2;

      const strokeGrad = ctx.createLinearGradient(minX, minY, maxX, maxY);
      strokeGrad.addColorStop(0, 'rgba(161, 161, 170, 0.22)');
      strokeGrad.addColorStop(0.4, 'rgba(51, 224, 146, 0.48)');
      strokeGrad.addColorStop(0.75, 'rgba(51, 224, 146, 0.88)');
      strokeGrad.addColorStop(1, 'rgba(12, 206, 107, 1)');

      ctx.lineWidth = 1.35;
      ctx.lineCap = 'round';
      ctx.strokeStyle = strokeGrad;

      ctx.beginPath();
      for (const edge of edgeMap.values()) {
        ctx.moveTo(edge.x1, edge.y1);
        ctx.lineTo(edge.x2, edge.y2);
      }
      ctx.stroke();

      // Subtle emerald vertex highlights on front-most lower-right corners
      ctx.fillStyle = 'rgba(51, 224, 146, 0.65)';
      for (const edge of edgeMap.values()) {
        if (edge.depth > 3.2) {
          ctx.fillRect(edge.x2 - 1, edge.y2 - 1, 2, 2);
        }
      }

      if (activeMotion) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handlePointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const handleMotionChange = () => {
      prefersReduced = mediaQuery.matches;
      window.cancelAnimationFrame(rafId);
      draw(performance.now());
    };

    resize();
    draw(performance.now());

    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [animated]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Ilustrasi wireframe kubus 3D isometrik hijau emerald"
      role="img"
      className="h-full w-full"
    />
  );
}
