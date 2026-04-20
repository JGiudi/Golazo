import type { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-dark-surface/80 p-4 shadow-lg backdrop-blur ${className}`}
      {...props}
    />
  );
}
