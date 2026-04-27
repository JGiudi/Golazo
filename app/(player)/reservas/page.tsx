'use client';

import { Calendar, MapPin, Clock, ChevronRight, Search, Zap } from 'lucide-react';
import Header from '@/components/shared/Header';
import { motion } from 'motion/react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/lib/context';

export default function ReservasPage() {
  const router = useRouter();
  const { hasReservation, isLoggedIn } = useAppContext();
  
  const activeReservations = [
    {
      id: 1,
      court: 'La Cancha de Palermo',
      date: 'HOY, 14 MAY',
      time: '21:00',
      type: 'Fútbol 5',
      address: 'Av. Casares 3501, CABA',
      status: 'CONFIRMADA',
      image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <Header 
        onProfileClick={() => isLoggedIn ? router.push('/perfil') : router.push('/login')} 
        title="MIS RESERVAS" 
        isLoggedIn={isLoggedIn} 
      />

      <div className="mt-8 px-6">
        {!hasReservation ? (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 space-y-6 text-center"
          >
            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center border-2 border-surface-light mb-2">
               <Calendar className="w-8 h-8 text-gray-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black uppercase italic tracking-tighter">SIN RESERVAS</h3>
              <p className="text-gray-500 text-[10px] font-bold max-w-[200px] mx-auto uppercase tracking-widest">AÚN NO TENÉS PARTIDOS AGENDADOS.</p>
            </div>
            <Button onClick={() => router.push('/buscar')} className="w-full max-w-[240px]">
              BUSCAR CANCHA
            </Button>
          </motion.div>
        ) : (
          /* List State */
          <div className="space-y-6">
            <h3 className="text-[9px] font-black text-brand uppercase tracking-[0.2em]">PRÓXIMOS PARTIDOS</h3>
            <div className="space-y-4">
              {activeReservations.map((res) => (
                <motion.div 
                  key={res.id}
                  onClick={() => router.push('/canchas/1')}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-surface/50 border border-white/5 rounded-3xl overflow-hidden group cursor-pointer active:scale-[0.98] transition-all"
                >
                  <div className="h-28 relative">
                    <img src={res.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Venue" />
                    <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 right-4 bg-brand text-bg px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg">
                      {res.status}
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <h4 className="text-xl font-black italic tracking-tighter uppercase leading-none">{res.court}</h4>
                        <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{res.type}</p>
                      </div>
                      <div className="bg-surface-light/50 p-1.5 rounded-lg">
                        <Zap className="w-4 h-4 text-brand" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-2 border-y border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand" />
                        <span className="text-[10px] font-black text-gray-200 uppercase">{res.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand" />
                        <span className="text-[10px] font-black text-gray-200 uppercase">{res.time} HS</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-1.5 overflow-hidden">
                          <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          <span className="text-[9px] font-bold text-gray-500 uppercase truncate pr-4">{res.address}</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-brand transition-colors shrink-0" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button 
              onClick={() => router.push('/buscar')}
              className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-gray-500 font-black text-[9px] uppercase tracking-[0.2em] hover:border-brand/30 hover:text-brand transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              RESERVAR OTRO TURNO
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
