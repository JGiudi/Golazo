'use client';

import { Bell, Users, Calendar, CloudRain, History, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import Button from '@/components/ui/Button';
import { motion } from 'motion/react';

export default function NotificacionesPage() {
  const router = useRouter();

  const recentNotifications = [
    {
      id: 1,
      type: 'team',
      title: 'Invitación de equipo',
      subtitle: 'Los Galácticos te invitaron a unirte.',
      time: 'AHORA',
      icon: Users,
      color: 'bg-brand/10 text-brand',
      accentColor: 'bg-brand',
      actions: true
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Recordatorio',
      subtitle: 'Partido hoy 20:00 - La Cancha de Palermo',
      time: '2H',
      icon: Calendar,
      color: 'bg-accent-yellow/10 text-accent-yellow',
      accentColor: 'bg-accent-yellow'
    }
  ];

  const pastNotifications = [
    {
      id: 3,
      type: 'weather',
      title: 'Alerta clima',
      subtitle: 'Probabilidad de lluvia para tu turno de mañana. Asegúrate de revisar las canchas techadas disponibles.',
      time: 'AYER',
      icon: CloudRain,
      color: 'bg-red-500/10 text-red-500',
      accentColor: 'bg-red-500'
    },
    {
      id: 4,
      type: 'summary',
      title: 'Resumen semanal',
      subtitle: 'Has jugado 3 partidos esta semana. ¡Mantén el ritmo!',
      time: '3D',
      icon: History,
      color: 'bg-gray-500/10 text-gray-500',
      accentColor: 'bg-gray-500'
    }
  ];

  return (
    <div className="min-h-screen bg-bg text-white pb-12">
      <Header variant="back" onBack={() => router.back()} title="NOTIFICACIONES" showAvatar={false} />

      <div className="max-w-2xl mx-auto px-6 mt-8 space-y-10">
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-accent-yellow uppercase tracking-[0.2em]">RECIENTES</h3>
          <div className="space-y-4">
            {recentNotifications.map((n) => (
              <motion.div 
                key={n.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface/50 border border-surface-light rounded-[32px] p-6 relative overflow-hidden group"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${n.accentColor}`} />
                <div className="flex gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-surface-light/50 shrink-0 ${n.color}`}>
                    <n.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-black italic tracking-tighter uppercase">{n.title}</h4>
                      <span className="text-[10px] font-black text-gray-500">{n.time}</span>
                    </div>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed">
                      {n.type === 'team' ? (
                        <>
                          <span className="text-brand font-bold">{n.subtitle.split(' ')[0]} {n.subtitle.split(' ')[1]}</span>
                          {n.subtitle.substring(n.subtitle.indexOf(' te invitaron'))}
                        </>
                      ) : n.subtitle}
                    </p>
                    
                    {n.actions && (
                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <Button size="sm" className="h-10 text-[10px] uppercase font-black">ACEPTAR</Button>
                        <button className="bg-surface-light/50 hover:bg-surface-light transition-colors text-[10px] font-black uppercase rounded-xl">RECHAZAR</button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">ANTERIORES</h3>
          <div className="space-y-4">
            {pastNotifications.map((n) => (
              <motion.div 
                key={n.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-surface/30 border border-surface-light/50 rounded-[32px] p-6 relative overflow-hidden group"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${n.accentColor} opacity-50`} />
                <div className="flex gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center opacity-70 shrink-0 ${n.color}`}>
                    <n.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-black italic tracking-tighter uppercase text-gray-300">{n.title}</h4>
                      <span className="text-[10px] font-black text-gray-500">{n.time}</span>
                    </div>
                    <p className="text-gray-500 text-xs font-medium leading-relaxed">
                      {n.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tip Pro Card */}
        <div className="relative rounded-[40px] overflow-hidden group h-64 mt-8">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop" 
            alt="Stadium" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end gap-3">
             <div className="space-y-1">
                <span className="text-brand font-black text-[10px] uppercase tracking-[0.3em]">TIP PRO</span>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">EVITÁ LA LLUVIA</h3>
             </div>
             <p className="text-gray-300 text-xs font-medium max-w-[80%] leading-relaxed">
               Reservá canchas techadas hoy y obtené un 15% de descuento en tu próximo turno.
             </p>
             <div className="pt-2">
                <button className="bg-white text-bg px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
                  VER CANCHAS
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
