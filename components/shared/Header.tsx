'use client';

import { ArrowLeft, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  variant?: 'home' | 'back';
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onProfileClick?: () => void;
  showAvatar?: boolean;
  isLoggedIn?: boolean;
}

export default function Header({ 
  variant = 'home', 
  title = 'GOLAZO', 
  subtitle = 'ENCONTRÁ TU CANCHA',
  onBack,
  onProfileClick,
  showAvatar = true,
  isLoggedIn = false
}: HeaderProps) {
  const router = useRouter();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else if (isLoggedIn) {
      router.push('/perfil');
    } else {
      router.push('/login');
    }
  };

  const renderAvatar = () => {
    if (!showAvatar) return null;
    
    return (
      <div 
        onClick={handleProfileClick}
        className="relative cursor-pointer group"
      >
        <div className="w-12 h-12 bg-surface border-2 border-surface-light rounded-full flex items-center justify-center overflow-hidden hover:border-brand/50 transition-colors">
           {isLoggedIn ? (
             <img 
               src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop" 
               className="w-full h-full object-cover" 
               alt="Joaquin Profile" 
             />
           ) : (
             <User className="w-6 h-6 text-gray-600" />
           )}
        </div>
        {isLoggedIn && (
          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-brand rounded-full border-2 border-bg shadow-[0_0_10px_#00E676]" />
        )}
      </div>
    );
  };

  if (variant === 'back') {
    return (
      <div className="flex justify-between items-center py-4 -mx-6 px-6 md:mx-0 md:px-0 sticky md:static top-0 bg-bg/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none z-50">
        <button 
          onClick={handleBack} 
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          VOLVER
        </button>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black italic text-brand tracking-tighter uppercase">{title}</h1>
          {renderAvatar()}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center py-4 -mx-6 px-6 md:mx-0 md:px-0 sticky md:static top-0 bg-bg/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none z-50">
      <div className="space-y-0">
        <h1 className="text-4xl font-black italic text-brand tracking-tighter uppercase leading-none">{title}</h1>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mt-1">{subtitle}</p>
      </div>
      
      {renderAvatar()}
    </div>
  );
}
