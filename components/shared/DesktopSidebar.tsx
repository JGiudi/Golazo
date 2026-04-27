'use client';

import { Home, Users, Calendar, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DesktopSidebar() {
  const pathname = usePathname();
  
  const getActiveTab = () => {
    if (pathname?.includes('/buscar')) return 'buscar';
    if (pathname?.includes('/equipos')) return 'equipos';
    if (pathname?.includes('/reservas')) return 'reservas';
    return 'inicio';
  };
  
  const activeTab = getActiveTab();

  const tabs = [
    { id: 'inicio', icon: Home, label: 'INICIO', href: '/home' },
    { id: 'buscar', icon: Search, label: 'BUSCAR', href: '/buscar' },
    { id: 'equipos', icon: Users, label: 'EQUIPOS', href: '/equipos' },
    { id: 'reservas', icon: Calendar, label: 'RESERVAS', href: '/reservas' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-surface/50 backdrop-blur-xl border-r border-white/5 p-6 z-40">
      <div className="mb-12 mt-4 text-center">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-brand drop-shadow-[0_0_15px_rgba(0,230,118,0.2)]">
          GOLAZO
        </h1>
        <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase">
          Player Panel
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
                  layoutId="sidebar-active"
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
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Powered By</p>
          <div className="text-sm font-black italic tracking-tighter text-white">VELOCITY</div>
        </div>
      </div>
    </aside>
  );
}
