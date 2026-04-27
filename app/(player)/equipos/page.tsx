'use client';

import { Users as UsersIcon, Plus, Trophy, Shield, ChevronRight, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Header from '@/components/shared/Header';
import { useAppContext } from '@/lib/context';

export default function EquiposPage() {
  const router = useRouter();
  const { isLoggedIn } = useAppContext();

  const myTeams = [
    {
      id: 1,
      name: 'LOS GALÁCTICOS',
      members: 12,
      rank: 'DIVISIÓN A',
      wins: 24,
      image: 'https://images.unsplash.com/photo-1518605336397-90db35f59991?q=80&w=300&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <Header 
        title="EQUIPOS" 
        subtitle={isLoggedIn ? "TUS ESCUADRAS" : "COMUNIDAD GOLAZO"} 
        onProfileClick={() => router.push('/perfil')}
        isLoggedIn={isLoggedIn}
      />

      <div className="mt-8 space-y-8 px-6">
        {!isLoggedIn ? (
          /* Guest State */
          <div className="flex flex-col items-center justify-center py-16 space-y-8 text-center bg-surface/30 rounded-[32px] border border-white/5 border-dashed p-6">
            <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center border border-white/10 text-gray-600">
               <UsersIcon className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">ARMÁ TU EQUIPO</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                REGISTRATE PARA CREAR ESCUADRAS Y DOMINAR EL TERRENO.
              </p>
            </div>
            <Button onClick={() => router.push('/login')} className="w-full">
              UNIRSE A LA COMUNIDAD
            </Button>
          </div>
        ) : (
          /* Logged State */
          <div className="space-y-8">
            {/* My Teams List */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <h3 className="text-[9px] font-black text-brand uppercase tracking-[0.2em]">MIS EQUIPOS</h3>
                 <button className="flex items-center gap-1.5 text-brand font-black text-[8px] uppercase tracking-widest">
                    <Plus className="w-3.5 h-3.5" />
                    NUEVO EQUIPO
                 </button>
              </div>

              <div className="space-y-4">
                {myTeams.map((team) => (
                  <motion.div 
                    key={team.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-surface/50 border border-white/5 rounded-3xl p-5 group cursor-pointer hover:bg-surface-light/30 transition-all active:scale-[0.98]"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-brand/20 p-0.5 shrink-0">
                         <img src={team.image} className="w-full h-full object-cover rounded-lg" alt="Team" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex justify-between items-start">
                           <h4 className="text-xl font-black italic tracking-tighter uppercase leading-none truncate pr-2">{team.name}</h4>
                           <Shield className="w-4 h-4 text-brand shrink-0" />
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="flex items-center gap-1 text-gray-500 text-[8px] font-bold uppercase tracking-widest">
                              <User className="w-2.5 h-2.5" />
                              {team.members} MIEMBROS
                           </div>
                           <div className="flex items-center gap-1 text-accent-yellow text-[8px] font-bold uppercase tracking-widest">
                              <Trophy className="w-2.5 h-2.5" />
                              {team.wins} WIN
                           </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                         <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-brand transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Explora Reclutamiento */}
            <div className="bg-linear-to-br from-surface to-bg border border-white/5 rounded-[32px] p-6 space-y-4 relative overflow-hidden">
               <div className="relative z-10 space-y-4">
                  <div className="w-10 h-10 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center">
                     <Trophy className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="text-xl font-black italic tracking-tighter uppercase leading-tight">BUSCO EQUIPO</h3>
                  <p className="text-gray-500 text-[10px] font-medium leading-relaxed uppercase">
                    ¿SOS UN AGENTE LIBRE? PUBLICÁ TU PERFIL Y DEJÁ QUE LOS EQUIPOS TE RECLUTEN.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full text-[9px] font-black h-11 tracking-widest">
                    EXPLORAR MERCADO
                  </Button>
               </div>
               <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12 scale-125">
                  <Shield className="w-40 h-40 text-white" />
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
