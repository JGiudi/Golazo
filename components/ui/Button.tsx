import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({
  className = '',
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-sans font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50';
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-electric-green text-pitch-black hover:bg-electric-green/90 focus-visible:outline-electric-green',
    secondary:
      'bg-dark-surface text-white border border-white/10 hover:bg-white/5 focus-visible:outline-goal-yellow',
    ghost: 'bg-transparent text-electric-green hover:bg-white/5 focus-visible:outline-electric-green',
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
