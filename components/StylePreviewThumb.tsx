'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { MotionStyle } from '@/lib/motion-styles';

interface StylePreviewThumbProps {
  style: MotionStyle;
  priority?: boolean;
}

export default function StylePreviewThumb({
  style,
  priority = false,
}: StylePreviewThumbProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const showFallback = failedUrl === style.imageUrl;

  const [bg = '#121215', , accent = '#F2B705'] = style.palette;

  return (
    <div
      style={{ backgroundColor: bg }}
      className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900"
    >
      {!showFallback ? (
        <Image
          src={style.imageUrl}
          alt={`Pratinjau resmi ${style.name} dari repositori ${style.repo}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          referrerPolicy="no-referrer"
          onError={() => setFailedUrl(style.imageUrl)}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-between bg-[#121215] p-5 text-zinc-100">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            {style.station}
          </span>
          <div>
            <div
              style={{ backgroundColor: accent }}
              className="mb-2 h-1 w-10"
            />
            <div className="font-display text-lg font-bold tracking-tight">
              {style.name}
            </div>
            <div className="mt-0.5 font-mono text-[10px] text-zinc-400">
              {style.skillHandle}
            </div>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
    </div>
  );
}
