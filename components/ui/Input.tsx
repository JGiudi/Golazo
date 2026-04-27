import { ReactNode } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
  className?: string;
  rightIcon?: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, placeholder, type = 'text', icon, className = '', rightIcon, value, onChange }: InputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-surface border-2 border-surface-light rounded-xl py-4 ${icon ? 'pl-12' : 'px-4'} pr-12 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors text-white placeholder-gray-500`}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
