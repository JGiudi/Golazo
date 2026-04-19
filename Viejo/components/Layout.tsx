
import React from 'react';
import { ViewState } from '../types';
import { Trophy, Search, Calendar, MessageCircle, User, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  
  const unreadNotifications = 3; // Mock count

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: React.ElementType, label: string }) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => onNavigate(view)}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-neon-400' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <Icon className={`w-6 h-6 transition-transform ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-neon-500 selection:text-black">
      {/* Header Mobile */}
      <header className="sticky top-0 z-40 bg-pitch-950/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3" onClick={() => onNavigate(ViewState.MATCHES)}>
          {/* Hexagon Logo */}
          <div className="relative w-9 h-10 flex items-center justify-center group cursor-pointer">
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-neon-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" />
             </svg>
             <span className="absolute inset-0 flex items-center justify-center text-black font-display font-bold text-xl pt-0.5 select-none">G</span>
          </div>
          
          <h1 className="text-2xl font-display font-bold tracking-wider text-white italic cursor-pointer">
            GOLAZO
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button 
            onClick={() => onNavigate(ViewState.NOTIFICATIONS)}
            className="relative p-1 text-gray-400 hover:text-white transition-colors"
          >
            <Bell className={`w-6 h-6 ${currentView === ViewState.NOTIFICATIONS ? 'text-neon-500 fill-neon-500/20' : ''}`} />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-[9px] font-bold flex items-center justify-center rounded-full border border-black text-white animate-pulse">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Clickable Profile Avatar */}
          <button 
            onClick={() => onNavigate(ViewState.PROFILE)}
            className={`w-8 h-8 rounded-full bg-gray-800 border overflow-hidden ring-2 ring-transparent hover:ring-neon-500 transition-all cursor-pointer relative active:scale-95 ${currentView === ViewState.PROFILE ? 'border-neon-500 ring-neon-500/50' : 'border-gray-700'}`}
          >
            <img src="https://picsum.photos/100/100?random=99" alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto min-h-[calc(100vh-140px)] relative z-10">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-pitch-950/95 backdrop-blur-xl border-t border-white/5 h-20 pb-2 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-3xl mx-auto h-full flex items-center justify-around px-2">
          <NavItem view={ViewState.MATCHES} icon={Search} label="Partidos" />
          <NavItem view={ViewState.FIELDS} icon={Calendar} label="Canchas" />
          <NavItem view={ViewState.RANKINGS} icon={Trophy} label="Ranking" />
          <NavItem view={ViewState.CHAT} icon={MessageCircle} label="Chats" />
        </div>
      </nav>
    </div>
  );
};
