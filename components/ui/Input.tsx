import { forwardRef, type InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = '', ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`w-full rounded-lg border border-white/10 bg-pitch-black px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-electric-green focus:outline-none focus:ring-1 focus:ring-electric-green ${className}`}
      {...props}
    />
  );
});
