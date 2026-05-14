'use client';

import { Trophy, Map as MapIcon, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Court } from '@/types/court';

interface CourtCardProps {
  court: Court;
}

export default function CourtCard({ court }: CourtCardProps) {
  const router = useRouter();

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-surface rounded-3xl overflow-hidden shadow-2xl group flex flex-col border border-white/5 h-full"
    >
      <div 
        className="cursor-pointer flex-1" 
        onClick={() => router.push(`/canchas/${court.id}`)}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-light/10">
          <img 
            src={court.image_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'} 
            alt={court.nombre} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80';
            }}
          />
          {/* Badge dinámico: Solo aparece si quedan pocos turnos (ej: <= 5) */}
          {court.turns_available_today && court.turns_available_today > 0 && court.turns_available_today <= 5 && (
            <div className="absolute top-4 left-4 z-20 bg-accent-yellow text-bg text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tighter whitespace-nowrap shadow-2xl animate-pulse-subtle">
               {court.turns_available_today} Turnos hoy
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-40 z-10" />
        </div>
        
        <div className="p-5 pb-0 space-y-4">
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1">
              <h3 className="text-lg font-black italic uppercase leading-tight tracking-tight">{court.nombre}</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                  <Trophy className="w-2.5 h-2.5" />
                  {court.deporte}
                </div>
                {court.direccion && (
                  <div className="flex items-center gap-1 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                    <MapIcon className="w-2.5 h-2.5" />
                    {court.direccion.split(',')[0]}
                  </div>
                )}
              </div>
            </div>
            <div className="text-xl font-black text-brand italic tracking-tighter whitespace-nowrap">
              ${court.precio_hora?.toLocaleString('es-AR')}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <Button 
          fullWidth 
          onClick={() => router.push(`/canchas/${court.id}`)} 
          className="h-12 text-[10px]"
          icon={<ChevronRight className="w-4 h-4" />}
        >
          RESERVAR AHORA
        </Button>
      </div>
    </motion.div>
  );
}
