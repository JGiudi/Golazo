'use client';

import { Home, Users, Calendar, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  
  // Convertimos las rutas al tab activo
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
                layoutId="nav-glow-indicator"
                className="absolute -top-1 w-10 h-10 bg-brand/10 blur-xl rounded-full -z-10"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
