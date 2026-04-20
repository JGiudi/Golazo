import type { HTMLAttributes } from 'react';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'green' | 'yellow' | 'neutral';
};

export function Badge({
  className = '',
  tone = 'neutral',
  ...props
}: BadgeProps) {
  const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
    green: 'bg-electric-green/15 text-electric-green border-electric-green/40',
    yellow: 'bg-goal-yellow/15 text-goal-yellow border-goal-yellow/40',
    neutral: 'bg-white/5 text-gray-300 border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-sans font-medium ${tones[tone]} ${className}`}
      {...props}
    />
  );
}
