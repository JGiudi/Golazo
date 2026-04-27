'use client';

import { User, Settings, LogOut, ChevronRight, Shield, Bell, HelpCircle, CreditCard, Gamepad2, Info, Trophy } from 'lucide-react';
import Header from '@/components/shared/Header';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/lib/context';

export default function PerfilPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useAppContext();

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push('/home'); // O a discovery
  };

  const menuItems = [
    { id: 'datos', icon: User, label: 'Mis Datos', color: 'text-brand' },
    { id: 'partidos', icon: Trophy, label: 'Mis Partidos', color: 'text-brand' },
    { id: 'notificaciones', icon: Bell, label: 'Notificaciones', color: 'text-brand', badge: '2' },
    { id: 'pago', icon: CreditCard, label: 'Métodos de Pago', color: 'text-brand' },
    { id: 'preferencias', icon: Gamepad2, label: 'Preferencias de Juego', color: 'text-brand' },
    { id: 'ayuda', icon: Info, label: 'Ayuda y Soporte', color: 'text-brand' },
  ];

  const stats = [
    { value: '42', label: 'PARTIDOS', border: 'border-brand' },
    { value: '85', label: 'GOLES', border: 'border-brand' },
    { value: '98%', label: 'KARMA', border: 'border-accent-yellow' },
  ];

  return (
    <div className="min-h-screen bg-bg text-white pb-12">
      <Header variant="back" onBack={() => router.back()} title="MI PERFIL" showAvatar={false} />

      <div className="px-6 flex flex-col items-center mt-8 space-y-6">
        {/* Avatar Square Glowing */}
        <div className="relative group">
          <div className="w-36 h-36 rounded-3xl p-0.5 bg-brand/20 border-2 border-brand shadow-[0_0_40px_rgba(0,230,118,0.2)] overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop" 
               className="w-full h-full object-cover rounded-[22px]" 
               alt="Joaquin Profile" 
             />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-accent-yellow text-bg font-black text-[9px] px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
             LEYENDA
          </div>
        </div>

        {/* User Info */}
        <div className="text-center space-y-1 pt-2">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">JOAQUÍN</h2>
          <p className="text-gray-500 font-bold text-xs uppercase tracking-widest italic">Socio #8292-X</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 w-full pt-4">
          {stats.map((stat, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className={`bg-surface/50 rounded-2xl p-4 flex flex-col items-center justify-center border-l-4 ${stat.border} border-t border-r border-b border-surface-light`}
            >
               <span className="text-2xl font-black italic tracking-tighter text-brand">{stat.value}</span>
               <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Menu List */}
        <div className="w-full bg-surface/40 border border-surface-light rounded-[32px] overflow-hidden mt-6">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className={`w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors border-b border-surface-light last:border-0 group`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center relative ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-surface">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-sm font-bold text-gray-300 uppercase tracking-wide group-hover:text-white transition-colors">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-brand transition-colors" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center gap-3 py-5 rounded-[24px] border-2 border-red-500/20 bg-red-500/5 text-red-500 font-black text-sm uppercase tracking-[0.2em] hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          CERRAR SESIÓN
        </button>
      </div>
    </div>
  );
}
