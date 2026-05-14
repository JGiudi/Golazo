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
  error?: boolean;
}

export default function Input({ label, placeholder, type = 'text', icon, className = '', rightIcon, value, onChange, error }: InputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</label>}
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
          className={`w-full bg-surface border-2 ${error ? 'border-red-500/50 focus:border-red-500' : 'border-surface-light focus:border-brand'} rounded-xl py-4 ${icon ? 'pl-12' : 'px-4'} pr-12 focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-brand'} transition-colors text-white placeholder-gray-500`}
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
