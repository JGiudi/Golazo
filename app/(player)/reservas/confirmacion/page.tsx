'use client';

import { Check, Calendar, Clock, MapPin, Share2, ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function ConfirmacionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg text-white flex flex-col relative overflow-hidden pb-32 md:pb-0">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <motion.div 
           initial={{ opacity: 0, scale: 0.5 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/10 blur-[100px] rounded-full"
         />
      </div>

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-6 pt-20 relative z-10">
        
        {/* Success Animation & Header */}
        <div className="flex flex-col items-center text-center space-y-6 mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-24 h-24 bg-brand rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,230,118,0.5)] border-4 border-bg relative"
          >
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="absolute inset-0 rounded-full border-2 border-brand animate-ping"
             />
             <Check className="w-12 h-12 text-bg" strokeWidth={3} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">
              ¡RESERVA CONFIRMADA!
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              Tu partido en LA CANCHA DE PALERMO ya está listo
            </p>
          </motion.div>
        </div>

        {/* Ticket Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-surface/50 backdrop-blur-xl border border-surface-light rounded-[32px] p-6 space-y-6 relative overflow-hidden"
        >
           {/* Ticket Cutouts */}
           <div className="absolute top-1/2 -left-3 w-6 h-6 bg-bg rounded-full -translate-y-1/2 border-r border-surface-light" />
           <div className="absolute top-1/2 -right-3 w-6 h-6 bg-bg rounded-full -translate-y-1/2 border-l border-surface-light" />
           <div className="absolute top-1/2 left-4 right-4 h-px border-t border-dashed border-surface-light -translate-y-1/2" />

           <div className="grid grid-cols-2 gap-4 pb-4">
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><Calendar className="w-3 h-3" /> FECHA</p>
                 <p className="text-sm font-bold">Hoy, 14 de Oct</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><Clock className="w-3 h-3" /> HORARIO</p>
                 <p className="text-sm font-bold">21:00 HS</p>
              </div>
              <div className="space-y-1 col-span-2 pt-2">
                 <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><MapPin className="w-3 h-3" /> UBICACIÓN</p>
                 <p className="text-sm font-bold truncate">Serrano 3501, Palermo, CABA</p>
              </div>
           </div>

           <div className="pt-8 flex justify-between items-end">
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Nº RESERVA</p>
                 <p className="text-sm font-bold text-gray-400">#GLZ-4892A</p>
              </div>
              <div className="text-right space-y-1">
                 <p className="text-[9px] font-black text-brand uppercase tracking-widest">PAGADO</p>
                 <p className="text-2xl font-black italic tracking-tighter text-white">$12.500</p>
              </div>
           </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 space-y-4"
        >
          <Button 
            fullWidth 
            onClick={() => router.push('/perfil/historial')}
            icon={<ChevronRight className="w-5 h-5" />}
            className="h-14 shadow-[0_10px_30px_rgba(0,230,118,0.2)]"
          >
            VER MIS PARTIDOS
          </Button>
          <div className="grid grid-cols-2 gap-4">
             <Button 
               variant="outline" 
               onClick={() => router.push('/home')}
               icon={<Home className="w-4 h-4" />}
             >
               INICIO
             </Button>
             <Button 
               variant="outline" 
               className="border-white/10 text-white hover:border-white/30"
               icon={<Share2 className="w-4 h-4" />}
             >
               COMPARTIR
             </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
