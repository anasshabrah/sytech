// components/Wave.tsx
import React from 'react';

interface WaveProps {
  /** one of 'geometric', 'hero', 'smooth' */
  variant: 'geometric' | 'hero' | 'smooth';
  /** true → position at top (default), false → at bottom */
  top?: boolean;
  /** true → rotate 180° */
  flip?: boolean;
  /** additional offset classes, e.g. '-top-1', '-bottom-1' */
  offsetClass?: string;
  /** override fill color */
  fill?: string;
  /** override height class */
  height?: string;
}

const VARIANTS: Record<WaveProps['variant'], { viewBox: string; path: string; height: string }> = {
  geometric: {
    viewBox: '0 0 1200 40',
    path: 'M0,40 C200,0 400,80 600,40 C800,0 1000,80 1200,40 L1200,0 L0,0 Z',
    height: 'h-8',
  },
  hero: {
    viewBox: '0 0 1200 40',
    path: 'M0,40 C300,0 900,80 1200,40 L1200,0 L0,0 Z',
    height: 'h-8',
  },
  smooth: {
    viewBox: '0 0 1440 80',
    path: 'M0,32 C360,96 1080,0 1440,32 L1440,0 L0,0 Z',
    height: 'h-16',
  },
};

export default function Wave({
  variant,
  top = true,
  flip = false,
  offsetClass = '',
  fill = 'var(--accent-gold-light)',
  height,
}: WaveProps) {
  const { viewBox, path, height: defaultHeight } = VARIANTS[variant];
  const heightClass = height ?? defaultHeight;
  const positionClass = top ? 'top-0' : 'bottom-0';
  const rotateClass = flip ? 'rotate-180' : '';

  return (
    <div
      className={`absolute ${positionClass} left-0 w-full overflow-hidden leading-[0] ${rotateClass} z-0 ${offsetClass}`}
      aria-hidden
    >
      <svg className={`block w-full ${heightClass}`} viewBox={viewBox} preserveAspectRatio="none">
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}
