'use client';

import { LayoutDashboard, Calendar, DollarSign, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function OwnerBottomNav() {
  const pathname = usePathname();
  
  const getActiveTab = () => {
    if (pathname?.includes('/calendario')) return 'calendario';
    if (pathname?.includes('/finanzas')) return 'finanzas';
    if (pathname?.includes('/configuracion')) return 'configuracion';
    return 'dashboard';
  };
  
  const activeTab = getActiveTab();

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'PANEL', href: '/dashboard' },
    { id: 'calendario', icon: Calendar, label: 'AGENDA', href: '/calendario' },
    { id: 'finanzas', icon: DollarSign, label: 'FINANZAS', href: '/finanzas' },
    { id: 'configuracion', icon: Settings, label: 'AJUSTES', href: '#' },
  ];

  return (
    <div className="pb-8 pt-4 px-6 bg-linear-to-t from-bg via-bg/95 to-bg/80 backdrop-blur-xl border-t border-white/5 rounded-t-[32px]">
      <div className="flex justify-between items-center px-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className="flex flex-col items-center gap-1.5 min-w-[56px] relative"
          >
            <tab.icon 
              className={`w-5 h-5 transition-all duration-300 ${activeTab === tab.id ? 'text-brand scale-110 drop-shadow-[0_0_8px_rgba(0,230,118,0.5)]' : 'text-gray-500'}`} 
            />
            <span className={`text-[8px] font-black tracking-[0.2em] transition-colors ${activeTab === tab.id ? 'text-brand' : 'text-gray-600'}`}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div 
                layoutId="owner-nav-glow-indicator"
                className="absolute -top-1 w-10 h-10 bg-brand/10 blur-xl rounded-full -z-10"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function OwnerDesktopSidebar() {
  const pathname = usePathname();
  
  const getActiveTab = () => {
    if (pathname?.includes('/calendario')) return 'calendario';
    if (pathname?.includes('/finanzas')) return 'finanzas';
    if (pathname?.includes('/configuracion')) return 'configuracion';
    return 'dashboard';
  };
  
  const activeTab = getActiveTab();

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'PANEL', href: '/dashboard' },
    { id: 'calendario', icon: Calendar, label: 'AGENDA', href: '/calendario' },
    { id: 'finanzas', icon: DollarSign, label: 'FINANZAS', href: '/finanzas' },
    { id: 'configuracion', icon: Settings, label: 'AJUSTES', href: '#' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-surface/50 backdrop-blur-xl border-r border-white/5 p-6 z-40">
      <div className="mb-12 mt-4 text-center">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-brand drop-shadow-[0_0_15px_rgba(0,230,118,0.2)]">
          GOLAZO
        </h1>
        <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase mt-1">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-4 mt-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all relative group ${isActive ? 'bg-brand/10 text-brand' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="owner-sidebar-active"
                  className="absolute inset-0 bg-brand/10 rounded-2xl border border-brand/30 -z-10"
                />
              )}
              <tab.icon className={`w-6 h-6 ${isActive ? 'text-brand' : 'text-gray-500 group-hover:text-white transition-colors'}`} />
              <span className={`text-sm font-black tracking-widest uppercase ${isActive ? 'text-brand' : ''}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="bg-surface border border-white/5 rounded-2xl p-4 text-center">
           <div className="w-10 h-10 rounded-full bg-brand/20 mx-auto flex items-center justify-center mb-3">
              <span className="text-brand font-black text-sm italic">MP</span>
           </div>
           <p className="text-[10px] text-gray-400 font-bold tracking-widest">Martín P.</p>
           <p className="text-[9px] text-brand font-black uppercase tracking-[0.2em]">DUEÑO</p>
        </div>
      </div>
    </aside>
  );
}
