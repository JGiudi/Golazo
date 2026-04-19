
import React, { useState, useEffect } from 'react';
import { RankingPlayer, MatchScoreDetail, PlayerTier, RankingScope } from '../types';
import { TrendingUp, Shield, Zap, Crown, Star, Hexagon, Map, Globe, Building2, MapPin, Trophy, ChevronRight } from 'lucide-react';

// --- MOCK DATA GENERATOR ---

const generateHistory = (count: number, baseSkill: number): MatchScoreDetail[] => {
  return Array.from({ length: count }).map((_, i) => {
    const won = Math.random() > 0.4;
    const draw = !won && Math.random() > 0.5;
    
    const resultPts = won ? 30 : draw ? 15 : 5;
    const isMvp = Math.random() > (0.95 - (baseSkill / 100)); 
    const perfPts = isMvp ? 20 : 0;
    const bonusPts = Math.random() > 0.8 ? 10 : 0;

    return {
      matchId: `m-${i}`,
      date: new Date(new Date().setDate(new Date().getDate() - (i * 3))), 
      totalPoints: 20 + resultPts + perfPts + bonusPts,
      breakdown: {
        base: 20,
        result: resultPts,
        performance: perfPts,
        bonus: bonusPts
      },
      isBest8: false 
    };
  });
};

const MOCK_PLAYERS_RAW = [
  { id: 'me', name: 'Nico G.', avatarUrl: 'https://picsum.photos/100/100?random=99', position: 'FWD', historyCount: 12, skill: 45 },
  { id: 'p2', name: 'El Turco', avatarUrl: 'https://picsum.photos/100/100?random=30', position: 'DEL', historyCount: 12, skill: 80 }, // Top player
  { id: 'p3', name: 'Chino', avatarUrl: 'https://picsum.photos/100/100?random=31', position: 'MED', historyCount: 10, skill: 60 },
  { id: 'p4', name: 'Colo', avatarUrl: 'https://picsum.photos/100/100?random=32', position: 'DEF', historyCount: 14, skill: 20 },
  { id: 'p5', name: 'Migue', avatarUrl: 'https://picsum.photos/100/100?random=36', position: 'DEL', historyCount: 6, skill: 30 },
  { id: 'p6', name: 'Javi', avatarUrl: 'https://picsum.photos/100/100?random=45', position: 'GK', historyCount: 11, skill: 55 },
  { id: 'p7', name: 'Rolo', avatarUrl: 'https://picsum.photos/100/100?random=60', position: 'MID', historyCount: 12, skill: 75 },
  { id: 'p8', name: 'Tito', avatarUrl: 'https://picsum.photos/100/100?random=61', position: 'DEF', historyCount: 12, skill: 70 },
];

// --- LOGIC HELPERS ---

const calculateBest8 = (history: MatchScoreDetail[]) => {
  const sorted = [...history].sort((a, b) => b.totalPoints - a.totalPoints);
  const top8Ids = new Set(sorted.slice(0, 8).map(m => m.matchId));
  
  const processedHistory = history.map(m => ({
    ...m,
    isBest8: top8Ids.has(m.matchId)
  })).sort((a, b) => b.date.getTime() - a.date.getTime());

  const totalPoints = sorted.slice(0, 8).reduce((sum, m) => sum + m.totalPoints, 0);
  return { processedHistory, totalPoints };
};

const getTier = (points: number): PlayerTier => {
  if (points > 800) return 'Leyenda';
  if (points > 600) return 'Capitán';
  if (points > 400) return 'Titular';
  if (points > 200) return 'Promesa';
  return 'Novato';
};

// NEW AESTHETIC CONFIG - PREMIUM METALLIC & SPORTS
const TIER_STYLES: Record<PlayerTier, any> = {
  'Leyenda': {
    id: 'leyenda',
    label: 'LEYENDA',
    nextTier: null,
    // Iridescent / Holographic dark
    bg: 'bg-gradient-to-br from-slate-900 via-purple-950 to-black',
    border: 'border-purple-500/50',
    textGradient: 'bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent',
    iconColor: 'text-purple-400',
    accent: 'bg-purple-500',
    icon: Crown,
    min: 801, max: 1200
  },
  'Capitán': {
    id: 'capitan',
    label: 'CAPITÁN',
    nextTier: 'Leyenda',
    // Realistic Gold
    bg: 'bg-gradient-to-br from-amber-950 via-black to-amber-950',
    border: 'border-yellow-600/50',
    textGradient: 'bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300 bg-clip-text text-transparent',
    iconColor: 'text-amber-400',
    accent: 'bg-amber-500',
    icon: Shield,
    min: 601, max: 800
  },
  'Titular': {
    id: 'titular',
    label: 'TITULAR',
    nextTier: 'Capitán',
    // Sterling Silver
    bg: 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800',
    border: 'border-slate-400/50',
    textGradient: 'bg-gradient-to-r from-slate-300 via-white to-slate-300 bg-clip-text text-transparent',
    iconColor: 'text-slate-300',
    accent: 'bg-slate-400',
    icon: Star,
    min: 401, max: 600
  },
  'Promesa': {
    id: 'promesa',
    label: 'PROMESA',
    nextTier: 'Titular',
    // Oxidized Bronze
    bg: 'bg-gradient-to-br from-[#2a1810] via-black to-[#2a1810]',
    border: 'border-orange-700/50',
    textGradient: 'bg-gradient-to-r from-orange-400 via-orange-200 to-orange-400 bg-clip-text text-transparent',
    iconColor: 'text-orange-400',
    accent: 'bg-orange-600',
    icon: TrendingUp,
    min: 201, max: 400
  },
  'Novato': {
    id: 'novato',
    label: 'NOVATO',
    nextTier: 'Promesa',
    // Matte Carbon
    bg: 'bg-pitch-900',
    border: 'border-gray-700',
    textGradient: 'text-gray-400',
    iconColor: 'text-gray-500',
    accent: 'bg-gray-600',
    icon: Hexagon,
    min: 0, max: 200
  }
};

const SCOPES: { id: RankingScope; label: string; icon: any }[] = [
  { id: 'local', label: 'Local', icon: MapPin },
  { id: 'district', label: 'Distrito', icon: Building2 },
  { id: 'provincial', label: 'Provincial', icon: Map },
  { id: 'national', label: 'Nacional', icon: Globe },
];

export const RankingsView: React.FC = () => {
  const [players, setPlayers] = useState<RankingPlayer[]>([]);
  const [scope, setScope] = useState<RankingScope>('local');
  const [isChangingScope, setIsChangingScope] = useState(false);

  useEffect(() => {
    setIsChangingScope(true);
    const timeout = setTimeout(() => {
      const processed = MOCK_PLAYERS_RAW.map((p, idx) => {
        let handicap = 0;
        if (scope === 'district') handicap = 5;
        if (scope === 'provincial') handicap = 15;
        if (scope === 'national') handicap = 30;
        
        const scopeSkill = Math.max(10, p.skill - (handicap * Math.random()));
        const rawHistory = generateHistory(p.historyCount, scopeSkill);
        const { processedHistory, totalPoints } = calculateBest8(rawHistory);
        return {
          id: p.id,
          name: p.name,
          avatarUrl: p.avatarUrl,
          position: p.position,
          matchHistory: processedHistory,
          totalSeasonPoints: totalPoints,
          tier: getTier(totalPoints)
        };
      });
      setPlayers(processed.sort((a, b) => b.totalSeasonPoints - a.totalSeasonPoints));
      setIsChangingScope(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [scope]);

  const myPlayer = players.find(p => p.id === 'me');
  const tierConfig = myPlayer ? TIER_STYLES[myPlayer.tier] : TIER_STYLES['Novato'];
  const nextTierConfig = tierConfig.nextTier ? TIER_STYLES[tierConfig.nextTier] : null;
  
  const currentPoints = myPlayer?.totalSeasonPoints || 0;
  const range = tierConfig.max - tierConfig.min;
  const progress = currentPoints - tierConfig.min;
  const progressPercent = Math.min(100, Math.max(0, (progress / range) * 100));

  const top8Scores = myPlayer 
    ? [...myPlayer.matchHistory].filter(m => m.isBest8).sort((a, b) => b.totalPoints - a.totalPoints)
    : [];
  const gridSlots = Array.from({ length: 8 }).map((_, i) => top8Scores[i] || null);
  const myRank = players.findIndex(p => p.id === 'me') + 1;

  return (
    <div className="pb-24 pt-2 space-y-6 overflow-x-hidden">
      
      {/* --- SCOPE TABS (Clean & Sharp) --- */}
      <div className="px-4 pt-2 sticky top-0 z-30 bg-pitch-950/95 backdrop-blur border-b border-white/5 pb-3">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {SCOPES.map((s) => (
            <button
              key={s.id}
              onClick={() => setScope(s.id)}
              className={`
                relative pb-2 uppercase font-display font-bold tracking-widest text-sm transition-colors shrink-0
                ${scope === s.id ? 'text-white' : 'text-gray-600 hover:text-gray-400'}
              `}
            >
              <div className="flex items-center gap-2">
                <s.icon className={`w-4 h-4 ${scope === s.id ? 'text-neon-500' : 'text-gray-600'}`} />
                {s.label}
              </div>
              {scope === s.id && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-500 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {isChangingScope ? (
        <div className="h-[60vh] flex items-center justify-center">
           <div className="w-8 h-8 border-2 border-neon-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* --- HERO CARD (Sports Card Style) --- */}
          {myPlayer && (
            <div className="px-4 animate-fade-in-up">
               <div className={`relative rounded-xl overflow-hidden border ${tierConfig.border} ${tierConfig.bg} shadow-2xl`}>
                  
                  {/* Abstract Background lines */}
                  <div className="absolute inset-0 opacity-10" 
                       style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}>
                  </div>

                  {/* Content Grid */}
                  <div className="relative z-10 flex flex-col">
                    
                    {/* Top Bar: Rank & Tier */}
                    <div className="flex justify-between items-center p-4 border-b border-white/5 bg-black/20">
                        <div className="flex items-center gap-2">
                          <tierConfig.icon className={`w-5 h-5 ${tierConfig.iconColor}`} />
                          <span className={`font-display font-bold text-xl tracking-widest italic ${tierConfig.textGradient}`}>
                            {tierConfig.label}
                          </span>
                        </div>
                        <div className="flex flex-col items-end leading-none">
                          <span className="text-[9px] text-gray-500 font-bold uppercase">RANK</span>
                          <span className="font-display font-bold text-2xl text-white">#{myRank}</span>
                        </div>
                    </div>

                    {/* Main Stats Area */}
                    <div className="p-5 flex items-center gap-5">
                        {/* Avatar with Metallic Border */}
                        <div className={`w-20 h-20 rounded-full p-[2px] bg-gradient-to-b from-white/20 to-black shadow-lg`}>
                           <img src={myPlayer.avatarUrl} className="w-full h-full rounded-full object-cover border border-black" />
                        </div>
                        
                        {/* Points Display */}
                        <div className="flex-1">
                           <div className="flex items-baseline gap-1">
                              <span className={`text-5xl font-display font-bold italic ${tierConfig.textGradient} drop-shadow-sm`}>
                                {currentPoints}
                              </span>
                              <span className="text-xs font-bold text-gray-500 uppercase">PTS</span>
                           </div>
                           
                           {/* Progress Bar (Minimalist) */}
                           {nextTierConfig && (
                             <div className="mt-2">
                               <div className="flex justify-between text-[9px] font-bold uppercase text-gray-500 mb-1">
                                  <span>Progreso</span>
                                  <span className={tierConfig.iconColor}>{Math.floor(tierConfig.max - currentPoints)} para {nextTierConfig.label}</span>
                               </div>
                               <div className="h-1.5 bg-gray-800 w-full rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${tierConfig.accent} shadow-[0_0_10px_rgba(255,255,255,0.3)]`} 
                                    style={{ width: `${progressPercent}%` }}
                                  />
                               </div>
                             </div>
                           )}
                        </div>
                    </div>

                    {/* Best 8 Grid (Tactical Slots) */}
                    <div className="bg-black/40 p-3 flex justify-between items-center border-t border-white/5">
                       <span className="text-[9px] font-bold text-gray-600 uppercase w-12 leading-tight">Mejores 8 Partidos</span>
                       <div className="flex gap-1.5">
                          {gridSlots.map((score, idx) => (
                            <div 
                              key={idx} 
                              className={`
                                w-6 h-8 skew-x-[-10deg] flex items-center justify-center border-b-2
                                ${score 
                                  ? `bg-gradient-to-b from-gray-800 to-gray-900 border-neon-500 text-white` 
                                  : 'bg-gray-900/50 border-gray-800'
                                }
                              `}
                            >
                              {score && <span className="text-[10px] font-bold skew-x-[10deg]">{score.totalPoints}</span>}
                            </div>
                          ))}
                       </div>
                    </div>

                  </div>
               </div>
            </div>
          )}

          {/* --- LEADERBOARD (Clean Table) --- */}
          <div className="px-4 pb-6 animate-fade-in-up delay-75">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 pl-1">
              Tabla de Posiciones
            </h3>

            <div className="flex flex-col gap-1">
              {players.map((player, idx) => {
                const rank = idx + 1;
                const isTop3 = rank <= 3;
                const isMe = player.id === 'me';
                
                let rankColor = "text-gray-500";
                let bgClass = "bg-pitch-900 border-transparent";
                let trophyIcon = null;

                if (rank === 1) {
                  rankColor = "text-amber-400";
                  bgClass = "bg-gradient-to-r from-amber-950/40 to-pitch-900 border-amber-500/30";
                  trophyIcon = <Trophy className="w-4 h-4 text-amber-400" />;
                } else if (rank === 2) {
                  rankColor = "text-slate-300";
                  bgClass = "bg-gradient-to-r from-slate-800/40 to-pitch-900 border-slate-500/30";
                } else if (rank === 3) {
                  rankColor = "text-orange-400";
                  bgClass = "bg-gradient-to-r from-orange-950/40 to-pitch-900 border-orange-500/30";
                }

                if (isMe) {
                   bgClass = "bg-pitch-800 border-neon-500/50 shadow-[0_0_15px_rgba(34,197,94,0.05)]";
                }

                return (
                  <div 
                    key={player.id}
                    className={`
                      flex items-center p-3 rounded border border-l-2 transition-all
                      ${bgClass}
                      ${isTop3 ? 'border-l-4' : 'border-l-transparent'}
                      ${rank === 1 ? 'border-l-amber-500' : rank === 2 ? 'border-l-slate-400' : rank === 3 ? 'border-l-orange-500' : ''}
                    `}
                  >
                    {/* Rank Number */}
                    <div className={`w-8 font-display font-bold text-xl italic text-center ${rankColor}`}>
                      {rank}
                    </div>

                    {/* Avatar */}
                    <div className="relative mx-3">
                       <img src={player.avatarUrl} className="w-10 h-10 rounded object-cover bg-gray-800" />
                       {trophyIcon && (
                         <div className="absolute -top-2 -right-2 bg-black rounded-full p-0.5 border border-gray-800">
                           {trophyIcon}
                         </div>
                       )}
                    </div>

                    {/* Name & Tier */}
                    <div className="flex-1">
                      <div className={`font-bold text-sm uppercase tracking-wide ${isMe ? 'text-white' : 'text-gray-300'}`}>
                        {player.name} {isMe && <span className="text-neon-500 text-[10px] ml-1">(Tú)</span>}
                      </div>
                      <div className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1">
                         {player.tier}
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right px-2">
                      <div className={`font-display font-bold text-xl italic ${isMe ? 'text-neon-400' : 'text-white'}`}>
                        {player.totalSeasonPoints}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
