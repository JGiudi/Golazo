'use client';

import { ChevronRight, Trophy, Target, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function HistorialPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'proximos' | 'pasados'>('pasados');

  const pastMatches = [
    {
      id: 1,
      date: '20 OCT',
      venue: 'La Cancha de Palermo',
      result: '5-3',
      goals: '2',
      type: 'FÚTBOL 5 • AMISTOSO',
      status: 'VICTORIA',
      statusColor: 'text-brand bg-brand/10',
      accentColor: 'bg-brand'
    },
    {
      id: 2,
      date: '15 OCT',
      venue: 'Tie Break Club',
      result: '2-2',
      goals: '0',
      type: 'FÚTBOL 7 • TORNEO AFA',
      status: 'EMPATE',
      statusColor: 'text-accent-yellow bg-accent-yellow/10',
      accentColor: 'bg-accent-yellow',
      suffix: '(PENALES)'
    }
  ];

  return (
    <div className="min-h-screen bg-bg text-white pb-12">
      <Header variant="back" onBack={() => router.back()} title="MI HISTORIAL" showAvatar={false} />

      <div className="max-w-2xl mx-auto px-6 space-y-8 mt-4">
        {/* Toggle Tabs */}
        <div className="bg-surface/50 p-1.5 rounded-2xl flex border border-surface-light">
          <button 
            onClick={() => setActiveTab('proximos')}
            className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'proximos' ? 'bg-brand text-bg shadow-[0_4px_12px_rgba(0,230,118,0.3)]' : 'text-gray-500 hover:text-white'}`}
          >
            PRÓXIMOS
          </button>
          <button 
            onClick={() => setActiveTab('pasados')}
            className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'pasados' ? 'bg-brand text-bg shadow-[0_4px_12px_rgba(0,230,118,0.3)]' : 'text-gray-500 hover:text-white'}`}
          >
            PASADOS
          </button>
        </div>

        {/* Match List */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {activeTab === 'pasados' ? (
                pastMatches.map((match) => (
                  <div key={match.id} className="bg-surface/50 border border-surface-light rounded-[32px] p-6 relative overflow-hidden group hover:border-surface-light/80 transition-colors cursor-pointer">
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${match.accentColor}`} />
                    
                    <div className="flex justify-between items-start mb-4">
                       <div className="space-y-1">
                          <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">{match.date}</span>
                          <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">{match.venue}</h3>
                       </div>
                       <div className={`${match.statusColor} px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest`}>
                          {match.status}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-6">
                       <div className="bg-bg/50 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
                          <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">RESULTADO</span>
                          <div className="text-4xl font-black italic tracking-tighter text-brand">
                             {match.result}
                          </div>
                          {match.suffix && (
                            <span className="text-[8px] font-black text-accent-yellow uppercase tracking-widest mt-1 italic">{match.suffix}</span>
                          )}
                       </div>
                       <div className="bg-bg/50 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
                          <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">GOLES</span>
                          <div className="text-4xl font-black italic tracking-tighter text-white">
                             {match.goals}
                          </div>
                       </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                       <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{match.type}</span>
                       <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-brand transition-colors" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center space-y-4">
                   <div className="w-20 h-20 bg-surface-light rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                      <Target className="w-10 h-10 text-gray-500" />
                   </div>
                   <p className="text-gray-500 font-bold uppercase italic text-sm">No tenés partidos próximos agendados</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
