'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  icon,
  disabled = false,
  type = 'button',
  size = 'md'
}: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 rounded-xl font-bold uppercase transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed";
  
  const sizes = {
    sm: "py-2 px-4 text-[10px]",
    md: "py-4 px-6 text-sm",
    lg: "py-5 px-8 text-base"
  };

  const variants = {
    primary: "bg-brand text-bg neon-glow",
    secondary: "bg-white text-bg",
    outline: "border-2 border-surface-light bg-transparent text-white",
    ghost: "bg-transparent text-white underline underline-offset-8 decoration-surface-light"
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
}
