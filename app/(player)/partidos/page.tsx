'use client';

import { Search, MapPin, Users, Plus, Trophy, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import Button from '@/components/ui/Button';
import { motion } from 'motion/react';

export default function PartidosPage() {
  const router = useRouter();

  const openMatches = [
    {
      id: 1,
      organizer: 'Martín',
      venue: 'La Cancha de Palermo',
      date: 'Hoy, 20:00 hs',
      type: 'Fútbol 5',
      level: 'Amateur / Intermedio',
      missingPlayers: 2,
      pricePerPlayer: '$2.500',
      image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      organizer: 'Nico',
      venue: 'Tie Break Club',
      date: 'Mañana, 19:30 hs',
      type: 'Fútbol 7',
      level: 'Competitivo',
      missingPlayers: 1,
      pricePerPlayer: '$3.000',
      image: 'https://images.unsplash.com/photo-1518605336397-90db35f59991?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      organizer: 'Sebastián',
      venue: 'San Isidro Football',
      date: 'Jueves, 21:00 hs',
      type: 'Fútbol 5',
      level: 'Principiante',
      missingPlayers: 4,
      pricePerPlayer: '$2.000',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    }
  ];

  return (
    <div className="min-h-screen bg-bg text-white pb-32">
      <Header 
        onProfileClick={() => router.push('/perfil')} 
        isLoggedIn={true} 
      />

      <div className="max-w-7xl mx-auto px-6 mt-6 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-black italic uppercase leading-none tracking-tighter">
              PARTIDOS <span className="text-brand">ABIERTOS</span>
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Sumate a jugar ahora mismo
            </p>
          </div>
          <Button 
            icon={<Plus className="w-5 h-5" />} 
            className="shadow-[0_10px_30px_rgba(0,230,118,0.2)] w-full md:w-auto"
          >
            ORGANIZAR PARTIDO
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por zona o nivel..." 
            className="w-full bg-surface border border-surface-light py-4 px-12 rounded-2xl focus:border-brand focus:outline-none transition-colors text-sm font-bold placeholder-gray-500"
          />
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {openMatches.map((match, i) => (
            <motion.div 
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface/50 border border-surface-light rounded-[32px] overflow-hidden group hover:border-brand/50 transition-colors flex flex-col"
            >
              {/* Image Header */}
              <div className="h-32 w-full relative overflow-hidden">
                <img 
                  src={match.image} 
                  alt={match.venue}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/80 to-transparent" />
                
                {/* Missing Players Badge */}
                <div className="absolute top-4 right-4 bg-brand text-bg px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-[0_0_15px_rgba(0,230,118,0.4)]">
                  <Users className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">FALTAN {match.missingPlayers}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6 relative -mt-8 z-10">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">{match.venue}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5 text-accent-yellow" />
                      {match.date}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface-light/30 rounded-xl p-3 flex flex-col gap-1 border border-white/5">
                      <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">MODALIDAD</span>
                      <span className="text-xs font-bold text-white">{match.type}</span>
                    </div>
                    <div className="bg-surface-light/30 rounded-xl p-3 flex flex-col gap-1 border border-white/5">
                      <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">NIVEL</span>
                      <span className="text-xs font-bold text-white line-clamp-1">{match.level}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-surface-light/50">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">ORGANIZA {match.organizer}</span>
                    <p className="text-lg font-black italic text-brand tracking-tighter">{match.pricePerPlayer} <span className="text-[10px] text-gray-500 not-italic tracking-normal">c/u</span></p>
                  </div>
                  <Button size="sm" className="px-6 text-[10px] h-10">
                    SUMARME
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
