'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Clock, Filter, Lock } from 'lucide-react';
import Header from '@/components/shared/Header';
import { motion } from 'motion/react';

export default function CalendarioPage() {
  const [selectedDate, setSelectedDate] = useState('Hoy, 24 Oct');
  
  const hours = ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  const courts = ['CANCHA 1 (T)', 'CANCHA 2 (D)', 'CANCHA 3 (T)'];

  // Mock schedule data: [courtIndex][hourIndex]
  const schedule = [
    // Cancha 1
    [
      { type: 'available' },
      { type: 'confirmed', player: 'Martín P.', team: 'Los Pibes' },
      { type: 'confirmed', player: 'Juan C.', team: '' },
      { type: 'blocked', reason: 'Mantenimiento' },
      { type: 'pending', player: 'Torneo F5', team: '' },
      { type: 'available' },
    ],
    // Cancha 2
    [
      { type: 'confirmed', player: 'Santi G.', team: 'Escuela' },
      { type: 'confirmed', player: 'Santi G.', team: 'Escuela' },
      { type: 'available' },
      { type: 'available' },
      { type: 'confirmed', player: 'Equipo B', team: '' },
      { type: 'confirmed', player: 'Equipo B', team: '' },
    ],
    // Cancha 3
    [
      { type: 'available' },
      { type: 'available' },
      { type: 'pending', player: 'Reservas Wpp', team: '' },
      { type: 'available' },
      { type: 'available' },
      { type: 'blocked', reason: 'Cierre' },
    ]
  ];

  const getStatusStyle = (type: string) => {
    switch(type) {
      case 'confirmed': return 'bg-brand/10 border-brand/40 text-brand';
      case 'pending': return 'bg-accent-yellow/10 border-accent-yellow/40 text-accent-yellow';
      case 'blocked': return 'bg-surface-light border-surface-light/50 text-gray-500';
      default: return 'bg-surface border-white/5 hover:border-white/20 text-gray-600 transition-colors cursor-pointer';
    }
  };

  return (
    <div className="min-h-screen bg-bg text-white pb-32">
      <div className="pt-8 px-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div className="space-y-1">
             <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">AGENDA</h1>
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Grilla de Ocupación</p>
           </div>
           
           <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex-1 md:w-auto flex items-center justify-between bg-surface border border-surface-light rounded-2xl px-4 py-2">
                 <button className="p-2 text-gray-400 hover:text-brand transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                 <span className="text-sm font-black uppercase tracking-widest">{selectedDate}</span>
                 <button className="p-2 text-gray-400 hover:text-brand transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
              <button className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center border border-surface-light hover:border-brand/50 transition-colors shrink-0">
                 <Filter className="w-5 h-5 text-gray-400" />
              </button>
           </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 pt-2">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">CONFIRMADO</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-yellow" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">SEÑADO / PENDIENTE</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-surface-light" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">BLOQUEADO</span>
           </div>
        </div>

        {/* Grid Schedule */}
        <div className="bg-surface/30 border border-surface-light rounded-[32px] overflow-hidden mt-6 overflow-x-auto">
           <div className="min-w-[800px]">
             {/* Header Row (Courts) */}
             <div className="grid grid-cols-[80px_1fr_1fr_1fr] border-b border-surface-light/50 bg-surface/50">
                <div className="p-4 flex items-center justify-center border-r border-surface-light/50">
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                {courts.map((court, i) => (
                  <div key={i} className="p-4 flex items-center justify-center border-r border-surface-light/50 last:border-0">
                     <span className="text-xs font-black uppercase tracking-widest">{court}</span>
                  </div>
                ))}
             </div>

             {/* Time Rows */}
             {hours.map((hour, hIndex) => (
                <div key={hour} className="grid grid-cols-[80px_1fr_1fr_1fr] border-b border-surface-light/30 last:border-0">
                   {/* Hour Label */}
                   <div className="p-4 flex items-center justify-center border-r border-surface-light/50 bg-surface/20">
                      <span className="text-xs font-black italic text-gray-400">{hour}</span>
                   </div>

                   {/* Court Slots for this hour */}
                   {courts.map((_, cIndex) => {
                      const slot = schedule[cIndex][hIndex];
                      return (
                         <div key={cIndex} className="p-2 border-r border-surface-light/30 last:border-0">
                            <motion.div 
                              whileHover={{ scale: slot.type === 'available' ? 0.98 : 1 }}
                              className={`h-24 rounded-2xl border flex flex-col justify-center p-3 relative overflow-hidden ${getStatusStyle(slot.type)}`}
                            >
                               {slot.type === 'available' && (
                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">+ NUEVO</span>
                                 </div>
                               )}
                               
                               {slot.type !== 'available' && (
                                 <div className="space-y-1 relative z-10">
                                    {slot.type === 'blocked' ? (
                                      <div className="flex flex-col items-center justify-center h-full gap-1 opacity-50">
                                         <Lock className="w-4 h-4" />
                                         <span className="text-[8px] font-black uppercase tracking-widest">{slot.reason}</span>
                                      </div>
                                    ) : (
                                      <>
                                        <div className="flex items-center gap-1.5">
                                           {slot.type === 'confirmed' && <CheckCircle2 className="w-3 h-3 text-brand" />}
                                           <span className="text-[10px] font-black uppercase tracking-widest">{slot.player}</span>
                                        </div>
                                        {slot.team && (
                                           <p className="text-[8px] font-bold uppercase tracking-widest opacity-70 line-clamp-1">{slot.team}</p>
                                        )}
                                      </>
                                    )}
                                 </div>
                               )}
                            </motion.div>
                         </div>
                      );
                   })}
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
