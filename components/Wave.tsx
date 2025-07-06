// components/Wave.tsx
import React from 'react';

export interface WaveProps {
  /** Either provide a variant or a custom path */
  variant?: 'geometric' | 'hero' | 'smooth';
  path?: string;
  viewBox?: string;
  height?: string;
  top?: boolean;
  flip?: boolean;
  offsetClass?: string;
}

const VARIANTS: Record<
  NonNullable<WaveProps['variant']>,
  { viewBox: string; path: string; height: string }
> = {
  geometric: {
    viewBox: '0 0 1200 120',
    path: 'M0,0 C300,120 900,0 1200,100 L1200,0 L0,0 Z',
    height: 'h-12',
  },
  hero: {
    viewBox: '0 0 1200 120',
    path: 'M0,0 C400,100 800,20 1200,100 L1200,0 L0,0 Z',
    height: 'h-12',
  },
  smooth: {
    viewBox: '0 0 1200 120',
    path: 'M0,0 C300,80 900,40 1200,100 L1200,0 L0,0 Z',
    height: 'h-12',
  },
};

export default function Wave({
  variant,
  path,
  viewBox,
  height,
  top = true,
  flip = false,
  offsetClass = '',
}: WaveProps) {
  const selected = variant ? VARIANTS[variant] : null;
  const resolvedPath = path || selected?.path || '';
  const resolvedViewBox = viewBox || selected?.viewBox || '0 0 1200 120';
  const resolvedHeight = height || selected?.height || 'h-12';

  return (
    <div
      className={`w-full overflow-hidden ${top ? '' : 'rotate-180'} ${resolvedHeight} ${offsetClass}`}
    >
      <svg
        viewBox={resolvedViewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full text-accent-gold-light ${flip ? 'scale-x-[-1]' : ''}`}
        preserveAspectRatio="none"
      >
        <path d={resolvedPath} fill="currentColor" />
      </svg>
    </div>
  );
}
