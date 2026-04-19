
import React from 'react';
import { X, MessageCircle, UserPlus, Share2, Ban, ThumbsUp, Activity, Shield, Zap, Circle, AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { PlayerProfileData } from '../types';

interface PlayerProfileModalProps {
  player: PlayerProfileData | null;
  isOpen: boolean;
  onClose: () => void;
}

const SimpleStatBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
  <div className="mb-3">
    <div className="flex justify-between items-end mb-1">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="text-xs font-bold text-white font-mono">{value}/100</span>
    </div>
    <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
      <div 
        className={`h-full rounded-full ${colorClass} shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-all duration-1000`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({ player, isOpen, onClose }) => {
  if (!isOpen || !player) return null;

  const getFormColor = (result: 'W' | 'L' | 'D') => {
    switch(result) {
      case 'W': return 'bg-neon-500 text-black border-neon-400';
      case 'D': return 'bg-gray-600 text-white border-gray-500';
      case 'L': return 'bg-red-600 text-white border-red-500';
      default: return 'bg-gray-800';
    }
  };

  const getVerdict = () => {
    if (player.stats.rating >= 85) return { text: 'CRACK TOTAL', color: 'text-gold-500' };
    if (player.stats.rating >= 75) return { text: 'JUEGA BIEN', color: 'text-neon-500' };
    if (player.stats.rating >= 60) return { text: 'CUMPLIDOR', color: 'text-gray-300' };
    return { text: 'PRINCIPIANTE', color: 'text-gray-500' };
  };

  const getReputationStatus = (rep: number) => {
    if (rep >= 90) return { text: 'PROFESIONAL', color: 'text-neon-500', bar: 'bg-neon-500', icon: Shield };
    if (rep >= 75) return { text: 'CUMPLIDOR', color: 'text-blue-400', bar: 'bg-blue-500', icon: ThumbsUp };
    if (rep >= 50) return { text: 'IRREGULAR', color: 'text-yellow-500', bar: 'bg-yellow-500', icon: Activity };
    return { text: 'FANTASMA', color: 'text-red-500', bar: 'bg-red-600', icon: AlertTriangle };
  };

  const verdict = getVerdict();
  const reputation = player.stats.reputation || 85; // Default to 85 if undefined
  const repStatus = getReputationStatus(reputation);
  const RepIcon = repStatus.icon;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-sm bg-pitch-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden relative flex flex-col max-h-[95dvh]">
        
        {/* Header / Close */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-black/50 hover:bg-black rounded-full text-white border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. HERO SECTION */}
        <div className="relative h-40 shrink-0">
           <div className="absolute inset-0 bg-gradient-to-b from-pitch-800 to-pitch-950"></div>
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
           
           {/* Profile Summary */}
           <div className="absolute bottom-0 w-full p-4 flex items-end gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-pitch-950 shadow-xl overflow-hidden bg-gray-800 shrink-0">
                 <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
              </div>
              <div className="mb-1 flex-1 min-w-0">
                <h2 className="font-display font-bold text-3xl text-white uppercase italic tracking-wide leading-none truncate">{player.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-white font-bold uppercase border border-gray-700">{player.position}</span>
                   <span className={`text-[10px] font-bold uppercase ${verdict.color} tracking-wide`}>{verdict.text}</span>
                </div>
              </div>
              <div className="mb-2">
                 <div className="w-12 h-12 bg-black/50 border border-gold-500 rounded flex flex-col items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <span className="text-2xl font-display font-bold text-gold-500 leading-none">{player.stats.rating}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. CONTENT */}
        <div className="px-5 pb-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
           
           {/* COMMUNITY TAGS */}
           <div className="flex flex-wrap gap-2">
              {player.tags.map(tag => (
                <span key={tag} className="bg-pitch-900 border border-gray-700 rounded px-2 py-1 text-[10px] font-bold text-gray-300 uppercase tracking-wide">
                   #{tag}
                </span>
              ))}
           </div>

           {/* REPUTATION METER (New System) */}
           <div className="bg-pitch-900 border border-gray-800 rounded-xl p-4 relative overflow-hidden">
              <div className="flex justify-between items-center mb-2 relative z-10">
                 <div className="flex items-center gap-2">
                    <RepIcon className={`w-4 h-4 ${repStatus.color}`} />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nivel de Compromiso</span>
                 </div>
                 <span className={`text-xs font-bold uppercase ${repStatus.color}`}>{repStatus.text}</span>
              </div>
              
              <div className="relative h-3 bg-black rounded-full overflow-hidden border border-gray-700 z-10">
                 <div className={`h-full rounded-full transition-all duration-1000 ${repStatus.bar} shadow-[0_0_10px_currentColor]`} style={{ width: `${reputation}%` }}></div>
              </div>
              <div className="flex justify-between mt-1 relative z-10">
                 <span className="text-[9px] text-gray-600 font-bold">0%</span>
                 <span className="text-[9px] text-gray-600 font-bold">100%</span>
              </div>
              
              {/* Warning text if low */}
              {reputation < 50 && (
                <div className="mt-2 text-[9px] text-red-400 bg-red-900/20 border border-red-900/50 p-2 rounded flex items-start gap-2">
                   <AlertTriangle className="w-3 h-3 shrink-0" />
                   <span>Este jugador suele cancelar partidos a último momento.</span>
                </div>
              )}
           </div>

           {/* SIMPLE STATS (BARS) */}
           <div className="bg-pitch-900/50 border border-gray-800 rounded-xl p-4">
               <SimpleStatBar 
                  label="Ataque / Definición" 
                  value={player.stats.attributes.attack} 
                  colorClass="bg-gradient-to-r from-blue-600 to-blue-400" 
               />
               <SimpleStatBar 
                  label="Defensa / Marca" 
                  value={player.stats.attributes.defense} 
                  colorClass="bg-gradient-to-r from-red-600 to-red-400" 
               />
               <SimpleStatBar 
                  label="Técnica / Buen Pie" 
                  value={player.stats.attributes.technique} 
                  colorClass="bg-gradient-to-r from-purple-600 to-purple-400" 
               />
               <SimpleStatBar 
                  label="Físico / Recorrido" 
                  value={player.stats.attributes.physical} 
                  colorClass="bg-gradient-to-r from-yellow-600 to-yellow-400" 
               />
           </div>

           {/* BASIC STATS ROW */}
           <div className="grid grid-cols-3 gap-2">
              <div className="bg-pitch-900 border border-gray-800 rounded p-2 text-center">
                 <span className="block font-display font-bold text-lg text-white">{player.stats.matches}</span>
                 <span className="block text-[8px] font-bold text-gray-500 uppercase">Partidos</span>
              </div>
              <div className="bg-pitch-900 border border-gray-800 rounded p-2 text-center">
                 <span className="block font-display font-bold text-lg text-neon-500">{player.stats.goals}</span>
                 <span className="block text-[8px] font-bold text-gray-500 uppercase">Goles</span>
              </div>
              <div className="bg-pitch-900 border border-gray-800 rounded p-2 text-center">
                 <span className="block font-display font-bold text-lg text-gold-500">{player.stats.mvp}</span>
                 <span className="block text-[8px] font-bold text-gray-500 uppercase">MVP</span>
              </div>
           </div>

           {/* FORM GUIDE */}
           <div>
              <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Racha (Últimos 5)</span>
              </div>
              <div className="flex gap-1">
                 {player.form.map((res, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-1 h-6 rounded-sm flex items-center justify-center text-[10px] font-bold border ${getFormColor(res)}`}
                    >
                      {res}
                    </div>
                 ))}
              </div>
           </div>

           {/* ACTIONS */}
           <div className="grid grid-cols-2 gap-3 pt-2">
              <Button variant="primary" className="w-full text-xs uppercase font-bold skew-x-0 rounded h-10">
                 <MessageCircle className="w-4 h-4 mr-2" /> Mensaje
              </Button>
              {player.isFriend ? (
                <Button variant="secondary" className="w-full text-xs uppercase font-bold skew-x-0 rounded h-10" disabled>
                   <UserPlus className="w-4 h-4 mr-2" /> Amigo
                </Button>
              ) : (
                <Button variant="outline" className="w-full text-xs uppercase font-bold skew-x-0 rounded h-10">
                   <UserPlus className="w-4 h-4 mr-2" /> Agregar
                </Button>
              )}
           </div>
           
           <div className="flex justify-center gap-6 pt-2 border-t border-gray-800">
              <button className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors">
                 <Share2 className="w-3 h-3" />
                 <span className="text-[9px] font-bold uppercase">Compartir</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                 <Ban className="w-3 h-3" />
                 <span className="text-[9px] font-bold uppercase">Reportar</span>
              </button>
           </div>

        </div>
      </div>
    </div>
  );
};
