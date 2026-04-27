'use client';

import { 
  BarChart3, Calendar, Clock, DollarSign, 
  Plus, TrendingUp, Users, MoreVertical, 
  MessageCircle, Phone, Bell, Zap, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Header from '@/components/shared/Header';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'RECAUDACIÓN HOY', value: '$145.000', icon: DollarSign, color: 'text-brand', meta: 'Meta: $200k', progress: 72 },
    { label: 'OCUPACIÓN HOY', value: '85%', icon: BarChart3, color: 'text-accent-yellow', meta: 'Horario Pico', progress: 85 },
  ];

  const [agenda, setAgenda] = useState([
    { 
      id: 1,
      time: '19:00', 
      title: 'CANCHA 1 (TECHADA)', 
      player: 'Martín P.', 
      team: '+ 10', 
      status: 'Confirmado', 
      price: '$18.000',
      statusColor: 'bg-brand',
      source: 'app'
    },
    { 
      id: 2,
      time: '20:00', 
      title: 'CANCHA 2 (DESCUBIERTA)', 
      player: 'Torneo Interno', 
      status: 'Pendiente', 
      price: '$15.000',
      statusColor: 'bg-accent-yellow',
      source: 'wpp'
    },
    { 
      id: 3,
      time: '21:00', 
      title: 'CANCHA 1 (TECHADA)', 
      isAvailable: true 
    },
    { 
      id: 4,
      time: '22:00', 
      title: 'CANCHA 2 (DESCUBIERTA)', 
      isAvailable: true 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [formData, setFormData] = useState({
    player: '',
    price: '',
    source: 'wpp'
  });

  const handleOpenModal = (slot: any) => {
    setSelectedSlot(slot);
    setFormData({ player: '', price: '18000', source: 'wpp' });
    setIsModalOpen(true);
  };

  const handleAddReservation = () => {
    if (!formData.player) return;

    setAgenda(prev => prev.map(item => {
      if (item.id === selectedSlot?.id) {
        return {
          ...item,
          isAvailable: false,
          player: formData.player,
          price: `$${Number(formData.price).toLocaleString('es-AR')}`,
          status: 'Confirmado',
          statusColor: 'bg-brand',
          source: formData.source
        };
      }
      return item;
    }));

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg text-white pb-32">
      {/* Quick Reservation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-surface border-t border-white/10 rounded-t-[40px] z-[51] pb-10 overflow-hidden"
            >
              <div className="p-8 space-y-8">
                 <div className="flex justify-between items-center">
                    <div className="space-y-1">
                       <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none text-brand">CARGA RÁPIDA</h3>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedSlot?.title || 'Nuevo Turno'} {selectedSlot ? `- ${selectedSlot.time}HS` : ''}</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">NOMBRE DEL JUGADOR</label>
                       <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input 
                            type="text" 
                            placeholder="Ej: Juan Perez"
                            value={formData.player}
                            onChange={(e) => setFormData({...formData, player: e.target.value.toUpperCase()})}
                            className="w-full bg-surface-light border border-white/5 py-4 pl-12 pr-4 rounded-2xl focus:border-brand focus:outline-none transition-all font-bold placeholder:text-gray-600"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">PRECIO ($)</label>
                          <div className="relative">
                             <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                             <input 
                               type="number" 
                               value={formData.price}
                               onChange={(e) => setFormData({...formData, price: e.target.value})}
                               className="w-full bg-surface-light border border-white/5 py-4 pl-12 pr-4 rounded-2xl focus:border-brand focus:outline-none transition-all font-bold"
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">ORIGEN</label>
                          <div className="flex gap-2">
                             <button 
                               onClick={() => setFormData({...formData, source: 'wpp'})}
                               className={`flex-1 h-[58px] rounded-2xl border flex items-center justify-center transition-all ${formData.source === 'wpp' ? 'bg-brand/10 border-brand text-brand' : 'bg-surface-light border-white/5 text-gray-500 hover:text-white'}`}
                             >
                                <MessageCircle className="w-5 h-5" />
                             </button>
                             <button 
                               onClick={() => setFormData({...formData, source: 'call'})}
                               className={`flex-1 h-[58px] rounded-2xl border flex items-center justify-center transition-all ${formData.source === 'call' ? 'bg-brand/10 border-brand text-brand' : 'bg-surface-light border-white/5 text-gray-500 hover:text-white'}`}
                             >
                                <Phone className="w-5 h-5" />
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>

                 <Button fullWidth onClick={handleAddReservation} disabled={!formData.player} className="h-14">
                    CONFIRMAR RESERVA
                 </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="pt-8 px-6 space-y-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
           <div className="space-y-1">
             <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">MI DASHBOARD</h1>
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">CENTRAL PARK F5</p>
           </div>
           <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center border border-surface-light cursor-pointer hover:border-white/20 transition-colors">
              <Bell className="w-6 h-6 text-brand" />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Today Stat */}
          <div className="md:col-span-1 relative overflow-hidden rounded-[32px] bg-brand/10 border border-brand/20 p-8 flex flex-col justify-center">
             <div className="space-y-2">
                <p className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">RESERVAS HOY</p>
                <div className="flex items-baseline gap-3">
                   <h3 className="text-6xl font-black italic tracking-tighter leading-none text-white">12</h3>
                   <div className="flex items-center gap-1 text-brand font-black text-xs uppercase italic">
                      <TrendingUp className="w-4 h-4" />
                      +3 vs ayer
                   </div>
                </div>
             </div>
             <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
                <Calendar className="w-40 h-40 text-brand" />
             </div>
          </div>

          {/* Stats Grid */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
             {stats.map((stat, i) => (
               <div key={i} className="bg-surface/50 border border-surface-light rounded-[32px] p-6 space-y-4 flex flex-col justify-center">
                  <div className="flex justify-between items-center">
                     <div className={`w-10 h-10 rounded-xl bg-bg flex items-center justify-center border border-white/5 ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
                     <h4 className="text-2xl font-black italic tracking-tighter uppercase text-white">{stat.value}</h4>
                  </div>
                  <div className="space-y-2 pt-2">
                     <div className="flex justify-between items-center">
                       <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{stat.meta}</p>
                       <p className="text-[8px] font-bold text-white uppercase tracking-widest">{stat.progress}%</p>
                     </div>
                     <div className="h-1.5 bg-bg rounded-full overflow-hidden border border-white/5">
                        <div className={`h-full rounded-full ${i === 1 ? 'bg-accent-yellow' : 'bg-brand'}`} style={{ width: `${stat.progress}%` }} />
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Quick Action Button for Mobile / General */}
        <div className="md:hidden">
          <Button fullWidth onClick={() => handleOpenModal(null)} icon={<Zap className="w-5 h-5" />} className="h-14">
            CARGA RÁPIDA (WPP / TEL)
          </Button>
        </div>

        {/* Agenda Section */}
        <div className="space-y-6 pt-6">
           <div className="flex justify-between items-end border-b border-surface-light pb-4">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">AGENDA DE HOY</h3>
              <button className="text-brand text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors">
                 Ver Calendario Completo
              </button>
           </div>

           <div className="grid gap-4">
              {agenda.map((item, i) => (
                <div key={i} className="bg-surface border border-surface-light rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 group transition-all">
                   <div className="flex items-center gap-4 md:w-32">
                      <span className="text-3xl font-black italic tracking-tighter text-brand leading-none">{item.time}</span>
                      <div className="h-12 w-[1px] bg-surface-light hidden md:block" />
                   </div>

                   {item.isAvailable ? (
                     <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{item.title}</p>
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-accent-yellow animate-pulse" />
                             <h4 className="text-sm font-black italic tracking-widest text-accent-yellow uppercase">Disponible</h4>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <button onClick={() => handleOpenModal(item)} className="w-full md:w-auto bg-surface-light border border-white/5 px-6 py-3 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:border-brand transition-colors flex items-center justify-center gap-2">
                              <Plus className="w-4 h-4" />
                              NUEVA RESERVA
                           </button>
                        </div>
                     </div>
                   ) : (
                     <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                        <div className="space-y-1">
                           <div className="flex items-center gap-2">
                              <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{item.title}</p>
                              {(item as any).source && (
                                <div className="text-[8px] font-black text-gray-400 bg-surface-light border border-white/5 px-2 py-0.5 rounded-md flex items-center gap-1.5 uppercase tracking-widest">
                                  {(item as any).source === 'wpp' ? <MessageCircle className="w-3 h-3 text-green-500" /> : ((item as any).source === 'app' ? <Zap className="w-3 h-3 text-brand" /> : <Phone className="w-3 h-3 text-blue-500" />)}
                                  {(item as any).source}
                                </div>
                              )}
                           </div>
                           <h4 className="text-xl font-black italic tracking-tighter uppercase leading-tight">{item.player} <span className="text-gray-500 text-sm ml-1 font-bold">{item.team || ''}</span></h4>
                        </div>
                        
                        <div className="flex items-center justify-between md:justify-end gap-6 border-t border-surface-light md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                           <div className="flex flex-col items-start md:items-end space-y-1">
                              <span className="text-lg font-black italic tracking-tighter text-white">{item.price}</span>
                              <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1 ${item.statusColor === 'bg-brand' ? 'bg-brand/10 text-brand border border-brand/20' : 'bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20'}`}>
                                 {item.statusColor === 'bg-brand' && <CheckCircle2 className="w-3 h-3" />}
                                 {item.status}
                              </div>
                           </div>
                           <button className="w-10 h-10 bg-surface-light rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                              <MoreVertical className="w-5 h-5" />
                           </button>
                        </div>
                     </div>
                   )}
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
