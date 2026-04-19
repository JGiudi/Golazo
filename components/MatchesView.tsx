
import React, { useState, useEffect } from 'react';
import { Match, MatchLevel, MatchFormat, Field, PlayerProfileData } from '../types';
import { generateMatchDescription } from '../services/geminiService';
import { MapPin, Plus, Clock, Users, Lock, Globe, Crown, UserPlus, Check, X, ExternalLink, Trash2, Shield, Zap, AlertTriangle, LogOut, Filter } from 'lucide-react';
import { Button } from './Button';
import { PlayerProfileModal } from './PlayerProfileModal';

// Dummy Data for Squad Builder with FUT Stats
const MY_FRIENDS = [
  { id: 'f1', name: 'El Turco', position: 'DEL', rating: 88, avatar: 'https://picsum.photos/100/100?random=30' },
  { id: 'f2', name: 'Chino', position: 'MED', rating: 82, avatar: 'https://picsum.photos/100/100?random=31' },
  { id: 'f3', name: 'Colo', position: 'DEF', rating: 85, avatar: 'https://picsum.photos/100/100?random=32' },
  { id: 'f4', name: 'Lucho', position: 'POR', rating: 79, avatar: 'https://picsum.photos/100/100?random=33' },
  { id: 'f5', name: 'Javi', position: 'MED', rating: 76, avatar: 'https://picsum.photos/100/100?random=34' },
  { id: 'f6', name: 'Gonza', position: 'DEF', rating: 81, avatar: 'https://picsum.photos/100/100?random=35' },
  { id: 'f7', name: 'Migue', position: 'DEL', rating: 90, avatar: 'https://picsum.photos/100/100?random=36' },
  { id: 'f8', name: 'Tato', position: 'MED', rating: 75, avatar: 'https://picsum.photos/100/100?random=37' },
];

const MY_GROUPS = [
  { id: 'g1', name: 'Los del Martes', count: 8, avatar: 'https://picsum.photos/100/100?random=40', color: 'from-blue-900 to-blue-600' },
  { id: 'g2', name: 'Ex-Compañeros', count: 5, avatar: 'https://picsum.photos/100/100?random=41', color: 'from-red-900 to-red-600' },
];

const DUMMY_MATCHES: Match[] = [
  {
    id: '1',
    title: 'Fútbol 5 - Champions Night',
    description: 'Partido picado, nivel medio-alto. Se corre todo.',
    location: 'El Templo, Palermo',
    date: new Date(new Date().setHours(20, 0, 0, 0)),
    format: '5v5',
    maxPlayers: 10,
    currentPlayers: 8,
    pricePerPerson: 2500,
    level: 'Competitivo',
    organizer: 'Nico G.',
    surface: 'Sintético',
    paymentMethods: ['Transferencia'],
    registeredPlayers: [
      { name: 'Nico G.', position: 'FWD', avatar: 'https://picsum.photos/50/50?random=1', team: 'A' },
      { name: 'Maxi', position: 'MID', avatar: 'https://picsum.photos/50/50?random=2', team: 'A' },
      { name: 'Juan', position: 'DEF', avatar: 'https://picsum.photos/50/50?random=3', team: 'B' },
      { name: 'Pedro', position: 'GK', avatar: 'https://picsum.photos/50/50?random=10', team: 'B' },
      { name: 'Lucas', position: 'MID', avatar: 'https://picsum.photos/50/50?random=11', team: 'A' },
      { name: 'Mati', position: 'DEF', avatar: 'https://picsum.photos/50/50?random=12', team: 'B' },
      { name: 'Sebas', position: 'FWD', avatar: 'https://picsum.photos/50/50?random=13', team: 'A' },
      { name: 'Leo', position: 'GK', avatar: 'https://picsum.photos/50/50?random=14', team: 'B' },
    ],
    isPrivate: false,
    isBookedField: true
  },
  {
    id: '3',
    title: 'Entrenamiento Táctico',
    description: 'Solo invitados. Probando jugadas para el domingo.',
    location: 'Solis, Capital',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    format: '5v5',
    maxPlayers: 10,
    currentPlayers: 3,
    pricePerPerson: 3000,
    level: 'Intermedio',
    organizer: 'Tú',
    surface: 'Parquet',
    paymentMethods: ['Efectivo'],
    registeredPlayers: [
       { name: 'Tú', position: 'FWD', avatar: 'https://picsum.photos/50/50?random=6', team: 'A' },
       { name: 'Leo', position: 'GK', avatar: 'https://picsum.photos/50/50?random=5', team: 'A' },
       { name: 'Fede', position: 'DEF', avatar: 'https://picsum.photos/50/50?random=7', team: 'B' }
    ],
    isPrivate: true,
    isBookedField: false
  },
  {
    id: '2',
    title: 'Domingo de Chill',
    description: 'Para mover las piernas y reírse un rato. Tercer tiempo obligatorio.',
    location: 'Club Parque',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    format: '7v7',
    maxPlayers: 14,
    currentPlayers: 9,
    pricePerPerson: 1800,
    level: 'Amistoso',
    organizer: 'Sofi M.',
    surface: 'Césped Natural',
    paymentMethods: ['Efectivo', 'Transferencia'],
    registeredPlayers: [
      { name: 'Sofi M.', position: 'MID', avatar: 'https://picsum.photos/50/50?random=4', team: 'A' },
      { name: 'Leo', position: 'GK', avatar: 'https://picsum.photos/50/50?random=5', team: 'B' }
    ],
    isPrivate: false,
    isBookedField: true
  },
];

type FilterType = 'all' | 'today' | 'week' | 'competitive' | 'mine';

interface MatchesViewProps {
  pendingBooking?: Field | null;
  onClearBooking?: () => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({ pendingBooking, onClearBooking }) => {
  const [matches, setMatches] = useState<Match[]>(DUMMY_MATCHES);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  
  // Profile Modal State
  const [viewingPlayer, setViewingPlayer] = useState<PlayerProfileData | null>(null);

  // Form State
  const [location, setLocation] = useState('');
  const [format, setFormat] = useState<MatchFormat>('5v5');
  const [level, setLevel] = useState<MatchLevel>('Amistoso');
  const [price, setPrice] = useState(2000);
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  
  const activeMatch = matches.find(m => m.id === selectedMatchId) || null;
  const amIInMatch = activeMatch?.registeredPlayers.some(p => p.name === 'Tú');

  useEffect(() => {
    if (pendingBooking) {
      setIsCreateModalOpen(true);
      setLocation(pendingBooking.name);
      setPrice(Math.ceil(pendingBooking.pricePerHour / 10)); 
      setFormat(pendingBooking.type as MatchFormat);
      setIsPrivate(true); 
    }
  }, [pendingBooking]);

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    if (onClearBooking) onClearBooking();
    setLocation('');
    setGeneratedDesc('');
    setIsPrivate(false);
  };

  const handleCreateMatch = () => {
    const maxP = format === '5v5' ? 10 : format === '7v7' ? 14 : format === '9v9' ? 18 : 22;
    const finalLocation = pendingBooking ? pendingBooking.name : location;
    
    const initialPlayers: { name: string; position: string; avatar: string; team?: 'A' | 'B' }[] = [
      { name: 'Tú', position: '?', avatar: 'https://picsum.photos/50/50?random=99', team: 'A' }
    ];

    const newMatch: Match = {
      id: Math.random().toString(),
      title: `${format} - ${level.toUpperCase()}`,
      description: generatedDesc || 'Partido organizado desde Golazo App',
      location: finalLocation,
      date: new Date(),
      format: format,
      maxPlayers: maxP,
      currentPlayers: initialPlayers.length,
      pricePerPerson: price,
      level: level,
      organizer: 'Tú',
      surface: pendingBooking ? (pendingBooking.amenities[0] as any) : 'Sintético',
      paymentMethods: ['Efectivo', 'Transferencia'],
      registeredPlayers: initialPlayers,
      isPrivate: isPrivate,
      isBookedField: !!pendingBooking
    };
    
    setMatches([newMatch, ...matches]);
    handleCloseCreateModal();
    setSelectedMatchId(newMatch.id);
  };

  // --- Helper for Profile Modal Data (SIMPLIFIED) ---
  const openPlayerProfile = (player: { name: string; avatar: string; position: string }) => {
    const rating = Math.floor(Math.random() * 40) + 50; // 50-90 for casuals
    
    const isFwd = player.position === 'FWD' || player.position === 'DEL';
    const isDef = player.position === 'DEF';
    const isGk = player.position === 'GK' || player.position === 'POR';

    // Simple stats 0-100
    const attributes = {
        attack: isFwd ? 85 : isDef ? 40 : 60,
        defense: isDef ? 85 : isFwd ? 30 : 60,
        technique: Math.floor(Math.random() * 50) + 40,
        physical: Math.floor(Math.random() * 50) + 40,
    };
    
    // Randomize slightly
    attributes.attack += Math.floor(Math.random() * 20) - 10;
    attributes.defense += Math.floor(Math.random() * 20) - 10;
    
    const tags = [];
    if (rating > 80) tags.push('Crack');
    if (Math.random() > 0.5) tags.push('Puntual');
    if (isFwd) tags.push('Goleador');
    if (isDef) tags.push('Rustico');
    if (isGk) tags.push('Atajador');
    if (tags.length === 0) tags.push('Buen Compañero');

    const mockStats = {
        matches: Math.floor(Math.random() * 50),
        goals: isFwd ? Math.floor(Math.random() * 30) : Math.floor(Math.random() * 5),
        mvp: Math.floor(Math.random() * 5),
        rating: rating,
        attributes: attributes,
        reputation: Math.floor(Math.random() * 40) + 60 // 60-100 random rep
    };
    
    const mockForm: ('W' | 'L' | 'D')[] = Array.from({length: 5}).map(() => {
        const r = Math.random();
        return r > 0.5 ? 'W' : r > 0.2 ? 'L' : 'D';
    });

    setViewingPlayer({
        name: player.name,
        avatar: player.avatar,
        position: player.position || '?',
        tier: mockStats.rating > 75 ? 'Titular' : 'Promesa',
        stats: mockStats,
        form: mockForm,
        isFriend: MY_FRIENDS.some(f => f.name === player.name),
        tags: tags,
        reliability: mockStats.reputation
    });
  };

  // --- Squad Management Logic ---
  const getNextBalancedTeam = (currentRoster: Match['registeredPlayers']) => {
    const countA = currentRoster.filter(p => p.team === 'A').length;
    const countB = currentRoster.filter(p => p.team === 'B').length;
    return countA <= countB ? 'A' : 'B';
  };

  const addFriendToMatch = (friendId: string) => {
    if (!activeMatch) return;
    const friend = MY_FRIENDS.find(f => f.id === friendId);
    if (!friend) return;

    if (activeMatch.registeredPlayers.some(p => p.name === friend.name)) return;
    if (activeMatch.currentPlayers >= activeMatch.maxPlayers) return;

    const nextTeam = getNextBalancedTeam(activeMatch.registeredPlayers);

    setMatches(prev => prev.map(m => {
      if (m.id !== activeMatch.id) return m;
      return {
        ...m,
        currentPlayers: m.currentPlayers + 1,
        registeredPlayers: [...m.registeredPlayers, {
          name: friend.name,
          avatar: friend.avatar,
          position: friend.position,
          team: nextTeam
        }]
      };
    }));
  };

  const addGroupToMatch = (groupId: string) => {
    if (!activeMatch) return;
    const group = MY_GROUPS.find(g => g.id === groupId);
    if (!group) return;

    const slotsAvailable = activeMatch.maxPlayers - activeMatch.currentPlayers;
    const playersToAddCount = Math.min(group.count, slotsAvailable);
    if (playersToAddCount <= 0) return;

    let newPlayers = [...activeMatch.registeredPlayers];
    for (let i = 0; i < playersToAddCount; i++) {
        const nextTeam = getNextBalancedTeam(newPlayers);
        newPlayers.push({
            name: `J. ${group.name.split(' ')[0]} ${i+1}`,
            avatar: `https://picsum.photos/50/50?random=${200+i}`,
            position: '?',
            team: nextTeam
        });
    }

    setMatches(prev => prev.map(m => {
        if (m.id !== activeMatch.id) return m;
        return {
            ...m,
            currentPlayers: newPlayers.length,
            registeredPlayers: newPlayers
        };
    }));
  };

  const removePlayer = (playerName: string, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent opening profile modal
      if (!activeMatch) return;
      // Note: Allow owner to remove themselves (cancel match logic would handle this usually)
      
      setMatches(prev => prev.map(m => {
          if (m.id !== activeMatch.id) return m;
          return {
              ...m,
              currentPlayers: m.currentPlayers - 1,
              registeredPlayers: m.registeredPlayers.filter(p => p.name !== playerName)
          };
      }));
  };

  const handleJoinRequest = (match: Match) => {
    if (match.level === 'Competitivo') {
      alert('Solicitud enviada al capitán.');
    } else {
       // Add user to match
       setMatches(prev => prev.map(m => {
          if (m.id !== match.id) return m;
          return {
             ...m,
             currentPlayers: m.currentPlayers + 1,
             registeredPlayers: [...m.registeredPlayers, {
                name: 'Tú',
                avatar: 'https://picsum.photos/50/50?random=99',
                position: '?',
                team: getNextBalancedTeam(m.registeredPlayers)
             }]
          };
       }));
       // Alert is confusing here if we instantly update UI, removing alert
    }
  };

  const handleLeaveMatch = (match: Match) => {
    const now = new Date();
    const matchDate = new Date(match.date);
    // Calculate hours difference: (MatchTime - Now) / ms / sec / min
    const diffHours = (matchDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 4) {
       const confirmed = window.confirm(
         `⚠️ ¡ALERTA DE FAIR PLAY!\n\nFaltan menos de 4 horas para el partido.\nSi te bajas ahora, tu reputación bajará considerablemente (-15 puntos) y quedarás marcado como "Poco Confiable".\n\n¿Estás seguro de abandonar a tu equipo?`
       );
       if (!confirmed) return;
    } else {
       const confirmed = window.confirm(`¿Seguro que quieres bajarte del partido? Liberarás tu cupo.`);
       if (!confirmed) return;
    }

    // Remove User
    setMatches(prev => prev.map(m => {
        if (m.id !== match.id) return m;
        return {
            ...m,
            currentPlayers: m.currentPlayers - 1,
            registeredPlayers: m.registeredPlayers.filter(p => p.name !== 'Tú')
        };
    }));
    
    if (diffHours < 4) {
        alert("Te has bajado del partido. Tu reputación ha disminuido.");
    }
  };

  const getLevelBadgeStyle = (level: MatchLevel) => {
    switch (level) {
      case 'Competitivo': return 'bg-red-600 text-white';
      case 'Intermedio': return 'bg-yellow-500 text-black';
      default: return 'bg-neon-500 text-black';
    }
  };

  // Filtering logic
  const filteredMatches = matches.filter(m => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'today') return m.date.getDate() === new Date().getDate();
    if (activeFilter === 'week') return true; // Simplified for mock
    if (activeFilter === 'competitive') return m.level === 'Competitivo';
    if (activeFilter === 'mine') return m.registeredPlayers.some(p => p.name === 'Tú') || m.organizer === 'Tú';
    return true;
  });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const isOwnerA = a.organizer === 'Tú';
    const isOwnerB = b.organizer === 'Tú';
    if (isOwnerA && !isOwnerB) return -1;
    if (!isOwnerA && isOwnerB) return 1;
    return a.date.getTime() - b.date.getTime();
  });

  return (
    <div className="pb-24 pt-4 px-4 space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-3xl font-display font-bold text-white tracking-wide uppercase italic">Partidos Activos</h2>
        <Button onClick={() => setIsCreateModalOpen(true)} size="sm" className="uppercase font-bold text-xs tracking-widest skew-x-[-10deg]">
          <span className="skew-x-[10deg] flex items-center"><Plus className="w-4 h-4 mr-1" /> Crear</span>
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
         <button 
            onClick={() => setActiveFilter('all')}
            className={`flex items-center whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border transition-colors ${activeFilter === 'all' ? 'bg-neon-500 text-black border-neon-500' : 'bg-pitch-900 text-gray-400 border-gray-700'}`}
         >
            Todos
         </button>
         <button 
            onClick={() => setActiveFilter('today')}
            className={`flex items-center whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border transition-colors ${activeFilter === 'today' ? 'bg-neon-500 text-black border-neon-500' : 'bg-pitch-900 text-gray-400 border-gray-700'}`}
         >
            Hoy
         </button>
         <button 
            onClick={() => setActiveFilter('competitive')}
            className={`flex items-center whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border transition-colors ${activeFilter === 'competitive' ? 'bg-red-600 text-white border-red-600' : 'bg-pitch-900 text-gray-400 border-gray-700'}`}
         >
            Competitivo
         </button>
         <button 
            onClick={() => setActiveFilter('mine')}
            className={`flex items-center whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border transition-colors ${activeFilter === 'mine' ? 'bg-gold-500 text-black border-gold-500' : 'bg-pitch-900 text-gray-400 border-gray-700'}`}
         >
            Mis Partidos
         </button>
      </div>

      <div className="grid gap-5">
        {sortedMatches.length === 0 ? (
           <div className="text-center py-10 text-gray-500">
              <Filter className="w-8 h-8 mx-auto mb-2 opacity-50"/>
              <p className="text-sm font-bold uppercase">No se encontraron partidos con este filtro</p>
           </div>
        ) : (
           sortedMatches.map((match) => {
            const missingCount = match.maxPlayers - match.currentPlayers;
            const isOwner = match.organizer === 'Tú';
            
            return (
              <div 
                key={match.id} 
                className={`
                  relative p-5 rounded-r-xl border-l-[6px] shadow-2xl overflow-hidden group transition-all duration-300
                  ${isOwner 
                    ? 'bg-gradient-to-r from-pitch-900 to-pitch-800 border-gold-500 shadow-[0_0_20px_rgba(245,158,11,0.15)]' 
                    : 'bg-pitch-900 border-neon-500 shadow-black'
                  }
                `}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                   <div className={`text-7xl font-display font-bold uppercase leading-none ${isOwner ? 'text-gold-500' : 'text-white'}`}>
                     {isOwner ? 'CAPT' : 'GOL'}
                   </div>
                </div>
                
                <div className="absolute top-0 right-0 flex flex-col items-end">
                  {isOwner && (
                     <div className="bg-gold-500 text-black px-3 py-1 rounded-bl-lg flex items-center z-20 shadow-lg mb-1">
                       <Crown className="w-3 h-3 mr-1 fill-black"/>
                       <span className="text-[9px] uppercase font-bold tracking-wider">Mi Partido</span>
                     </div>
                  )}
                  {match.isPrivate && (
                     <div className={`px-2 py-1 rounded-l flex items-center z-20 ${isOwner ? 'bg-black/80 border border-gold-500/30' : 'bg-black/60'}`}>
                       <Lock className={`w-3 h-3 mr-1 ${isOwner ? 'text-gold-500' : 'text-gray-400'}`}/>
                       <span className={`text-[9px] uppercase font-bold tracking-wider ${isOwner ? 'text-gold-500' : 'text-gray-300'}`}>PRIVADO</span>
                     </div>
                  )}
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3 mt-2">
                    <div>
                      <div className={`inline-flex px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest mb-2 skew-x-[-10deg] ${getLevelBadgeStyle(match.level)}`}>
                        <span className="skew-x-[10deg]">{match.level}</span>
                      </div>
                      <h3 className={`text-xl font-display font-bold uppercase italic tracking-wide leading-tight max-w-[80%] ${isOwner ? 'text-gold-400' : 'text-white'}`}>
                        {match.title}
                      </h3>
                    </div>
                    <div className="text-right pt-4">
                      <div className={`font-display font-bold text-2xl leading-none ${isOwner ? 'text-gold-400' : 'text-neon-400'}`}>
                        ${match.pricePerPerson}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">x Persona</div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 font-medium">{match.description}</p>

                  <div className="flex flex-col sm:flex-row gap-3 mb-5 border-t border-white/10 pt-3">
                    <div className="flex items-center text-gray-300 text-sm">
                      <MapPin className={`w-3.5 h-3.5 mr-2 ${isOwner ? 'text-gold-500' : 'text-neon-500'}`} />
                      <span className="font-bold text-xs uppercase">{match.location}</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <Clock className={`w-3.5 h-3.5 mr-2 ${isOwner ? 'text-gold-500' : 'text-neon-500'}`} />
                      <span className="font-bold text-xs uppercase">
                        {match.date.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' })} - {match.date.getHours()}:00 hs
                      </span>
                    </div>
                  </div>

                  <div className="bg-black/40 p-3 rounded border border-white/5 flex items-center justify-between mb-4 backdrop-blur-sm">
                    <div className="flex flex-col flex-1 mr-4">
                      <div className="flex justify-between items-end mb-1.5">
                         <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Formación: {match.format}</span>
                         <span className="text-[10px] font-bold text-gray-400">{match.currentPlayers}/{match.maxPlayers}</span>
                      </div>
                      <div className="flex gap-1 h-4 w-full">
                        {Array.from({ length: match.maxPlayers }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 h-full skew-x-[-15deg] transition-all duration-500 ${
                              i < match.currentPlayers 
                                ? (isOwner ? 'bg-gold-600/80 border-r border-black/50' : 'bg-gray-700 border-r border-black/50')
                                : (isOwner ? 'bg-gold-500 animate-pulse' : 'bg-neon-500 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]')
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-right min-w-[60px]">
                      {missingCount > 0 ? (
                        <>
                          <span className="block text-3xl font-display font-bold text-white leading-none">{missingCount}</span>
                          <span className={`text-[9px] uppercase font-bold tracking-wider ${isOwner ? 'text-gold-500' : 'text-neon-500'}`}>Lugares</span>
                        </>
                      ) : (
                        <span className={`font-display font-bold text-xl uppercase ${isOwner ? 'text-gold-500' : 'text-neon-500'}`}>FULL</span>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={() => setSelectedMatchId(match.id)}
                    className={`w-full uppercase tracking-widest font-bold text-sm rounded-none skew-x-[-3deg] active:skew-x-[-1deg] ${
                      isOwner 
                        ? 'bg-gold-500 text-black hover:bg-gold-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                        : ''
                    }`}
                    variant={missingCount === 0 && !isOwner ? 'secondary' : 'primary'}
                  >
                    <span className="skew-x-[3deg]">{isOwner ? 'Gestionar Mi Partido' : (missingCount === 0 ? 'Ver Detalles' : 'Ver Ficha Técnica')}</span>
                  </Button>
                </div>
              </div>
            );
           })
        )}
      </div>

      {/* Detail Modal */}
      {activeMatch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
          <div className={`bg-pitch-900 w-full max-w-lg rounded-xl border flex flex-col h-[85dvh] shadow-2xl overflow-hidden ${activeMatch.organizer === 'Tú' ? 'border-gold-500' : 'border-gray-700'}`}>
            
            <div className="p-5 border-b border-white/10 bg-pitch-950 shrink-0 z-10">
              <div className="flex justify-between items-start">
                <div>
                   <div className="flex gap-2 mb-2">
                     <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 ${getLevelBadgeStyle(activeMatch.level)}`}>
                      {activeMatch.level}
                     </span>
                     {activeMatch.isPrivate && (
                       <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-gray-700 text-gray-300 flex items-center">
                         <Lock className="w-3 h-3 mr-1" /> Privado
                       </span>
                     )}
                   </div>
                   <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase italic tracking-wide mt-1 leading-none">{activeMatch.title}</h2>
                </div>
                <button onClick={() => setSelectedMatchId(null)} className="text-gray-500 hover:text-white p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-pitch-900 custom-scrollbar">
              {/* Map Area */}
              <div className="rounded-lg overflow-hidden border border-gray-700 relative h-32 group bg-black cursor-pointer shadow-inner shrink-0">
                  <img src="https://picsum.photos/seed/map/600/200?grayscale" alt="Mapa Táctico" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center animate-pulse bg-black/50 ${activeMatch.organizer === 'Tú' ? 'border-gold-500/50' : 'border-neon-500/50'}`}>
                        <div className={`w-2 h-2 rounded-full ${activeMatch.organizer === 'Tú' ? 'bg-gold-500 shadow-[0_0_10px_#f59e0b]' : 'bg-neon-500 shadow-[0_0_10px_#22c55e]'}`}></div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 bg-black/80 px-2 py-0.5 rounded border ${activeMatch.organizer === 'Tú' ? 'text-gold-500 border-gold-500/30' : 'text-neon-500 border-neon-500/30'}`}>
                        <MapPin className="w-3 h-3 inline mr-1"/>
                        {activeMatch.location}
                    </span>
                  </div>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeMatch.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-[2px]"
                  >
                    <div className={`px-4 py-2 font-bold text-xs uppercase skew-x-[-10deg] flex items-center hover:scale-105 transition-transform ${activeMatch.organizer === 'Tú' ? 'bg-gold-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-neon-500 text-black shadow-[0_0_15px_rgba(74,222,128,0.5)]'}`}>
                       <ExternalLink className="w-3 h-3 mr-2 skew-x-[10deg]" />
                       <span className="skew-x-[10deg]">Abrir en Google Maps</span>
                    </div>
                  </a>
              </div>

              {/* Roster - Split View */}
              <div>
                 <div className="flex justify-between items-end mb-3 border-b border-gray-800 pb-1">
                   <h4 className={`font-display font-bold text-xl uppercase tracking-wider ${activeMatch.organizer === 'Tú' ? 'text-gold-500' : 'text-neon-500'}`}>Formación</h4>
                   <span className="text-xs text-gray-400 font-bold">{activeMatch.currentPlayers} / {activeMatch.maxPlayers}</span>
                 </div>
                 
                 <div className="flex gap-4 relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black border border-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-display font-bold italic text-white shadow-lg">VS</div>
                    
                    {/* Team A */}
                    <div className="flex-1 space-y-2">
                      <div className="text-[10px] font-bold uppercase text-center mb-2 text-gray-500 bg-black/30 py-1 rounded">Equipo A</div>
                      {activeMatch.registeredPlayers.filter(p => p.team === 'A' || !p.team).map((player, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => openPlayerProfile(player)}
                          className="flex items-center bg-pitch-800/50 p-2 rounded border border-gray-800 gap-2 relative group cursor-pointer hover:bg-pitch-800 transition-colors hover:border-neon-500/30"
                        >
                           <img src={player.avatar} alt={player.name} className="w-6 h-6 rounded bg-gray-700" />
                           <div className="flex-1 min-w-0">
                              <span className="text-white font-bold text-xs block uppercase truncate">{player.name}</span>
                           </div>
                           {activeMatch.organizer === 'Tú' && player.name !== 'Tú' && (
                             <button onClick={(e) => removePlayer(player.name, e)} className="absolute -right-1 -top-1 bg-red-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                               <X className="w-2 h-2 text-white"/>
                             </button>
                           )}
                        </div>
                      ))}
                    </div>

                    {/* Team B */}
                    <div className="flex-1 space-y-2">
                      <div className="text-[10px] font-bold uppercase text-center mb-2 text-gray-500 bg-black/30 py-1 rounded">Equipo B</div>
                      {activeMatch.registeredPlayers.filter(p => p.team === 'B').map((player, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => openPlayerProfile(player)}
                          className="flex items-center bg-pitch-800/50 p-2 rounded border border-gray-800 gap-2 flex-row-reverse text-right relative group cursor-pointer hover:bg-pitch-800 transition-colors hover:border-neon-500/30"
                        >
                           <img src={player.avatar} alt={player.name} className="w-6 h-6 rounded bg-gray-700" />
                           <div className="flex-1 min-w-0">
                              <span className="text-white font-bold text-xs block uppercase truncate">{player.name}</span>
                           </div>
                           {activeMatch.organizer === 'Tú' && (
                             <button onClick={(e) => removePlayer(player.name, e)} className="absolute -left-1 -top-1 bg-red-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                               <X className="w-2 h-2 text-white"/>
                             </button>
                           )}
                        </div>
                      ))}
                    </div>
                 </div>
              </div>

              {/* OWNER MANAGEMENT SECTION */}
              {activeMatch.organizer === 'Tú' && (
                  <div className="bg-gray-900/80 border border-gold-500/50 p-4 rounded-xl mt-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between items-center mb-4 border-b border-gold-500/20 pb-2">
                      <label className="text-sm text-gold-500 uppercase font-bold tracking-widest flex items-center font-display italic">
                        <Zap className="w-4 h-4 mr-2 fill-gold-500"/> Centro de Fichajes
                      </label>
                      <span className="text-[9px] text-black font-bold bg-gold-500 px-2 py-0.5 rounded skew-x-[-10deg]">
                        <span className="skew-x-[10deg]">{activeMatch.currentPlayers} EN PLANTILLA</span>
                      </span>
                    </div>
                    
                    <div className="space-y-5">
                      {/* Quick Groups */}
                      <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 tracking-wide">Clubes & Grupos</p>
                          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                            {MY_GROUPS.map(group => (
                              <button 
                                key={group.id}
                                onClick={() => addGroupToMatch(group.id)}
                                disabled={activeMatch.currentPlayers >= activeMatch.maxPlayers}
                                className={`
                                  relative w-40 h-16 rounded-lg overflow-hidden shrink-0 transition-transform active:scale-95 border-2 group
                                  bg-gradient-to-br ${group.color} border-white/20 hover:border-white/60
                                `}
                              >
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                                <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full p-0.5 shadow-lg">
                                  <img src={group.avatar} className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="absolute bottom-2 right-2 text-right">
                                   <div className="text-white font-display font-bold text-lg leading-none uppercase italic drop-shadow-md">{group.name.split(' ')[0]}</div>
                                   <div className="text-[9px] text-white/80 font-bold bg-black/50 px-1 rounded inline-block">+{group.count} JUGADORES</div>
                                </div>
                              </button>
                            ))}
                          </div>
                      </div>

                      {/* Individual Friends */}
                      <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 tracking-wide">Agentes Libres (Amigos)</p>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {MY_FRIENDS.map(friend => {
                                const isAdded = activeMatch.registeredPlayers.some(p => p.name === friend.name);
                                return (
                                  <button 
                                    key={friend.id}
                                    onClick={() => addFriendToMatch(friend.id)}
                                    disabled={isAdded || activeMatch.currentPlayers >= activeMatch.maxPlayers}
                                    className={`
                                      relative rounded-lg border-2 transition-all duration-300 group overflow-hidden
                                      flex flex-col items-center pt-2 pb-1
                                      ${isAdded 
                                        ? 'border-gold-500 bg-gradient-to-b from-gold-600/20 to-black shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                                        : 'border-gray-700 bg-pitch-900 opacity-70 grayscale hover:grayscale-0 hover:scale-105 hover:border-gray-500'
                                      }
                                    `}
                                  >
                                      <div className="absolute top-1 left-1.5 text-left z-10 leading-none">
                                        <div className={`font-display font-bold text-lg ${isAdded ? 'text-gold-400' : 'text-gray-400'}`}>{friend.rating}</div>
                                        <div className="text-[8px] font-bold uppercase text-gray-500">{friend.position}</div>
                                      </div>

                                      <div className="w-12 h-12 rounded-full border-2 border-black/50 overflow-hidden shadow-lg z-0 bg-gray-800 mb-1">
                                        <img src={friend.avatar} className="w-full h-full object-cover" />
                                      </div>

                                      <div className={`w-full text-center font-display font-bold uppercase text-sm tracking-wide truncate px-1 ${isAdded ? 'text-white' : 'text-gray-400'}`}>
                                        {friend.name}
                                      </div>

                                      {isAdded && (
                                        <div className="absolute inset-0 border-2 border-gold-500 rounded-lg animate-pulse-slow pointer-events-none"></div>
                                      )}
                                      {isAdded && (
                                        <div className="absolute top-1 right-1 bg-gold-500 rounded-full p-0.5 shadow-lg">
                                          <Check className="w-2 h-2 text-black stroke-[3]"/>
                                        </div>
                                      )}
                                  </button>
                                );
                            })}
                          </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-black/60 p-2 rounded border border-gray-800 flex items-center justify-center gap-2">
                       <Shield className="w-3 h-3 text-gray-500"/>
                       <span className="text-[9px] text-gray-400 font-mono uppercase">Auto-balance de equipos activo</span>
                    </div>
                  </div>
              )}

            </div>

            <div className="p-4 border-t border-gray-800 bg-pitch-950 shrink-0 z-10 pb-6 sm:pb-4">
              {activeMatch.organizer !== 'Tú' && (
                  amIInMatch ? (
                    <Button 
                      onClick={() => handleLeaveMatch(activeMatch)}
                      className="w-full uppercase tracking-widest font-bold skew-x-[-2deg]"
                      variant="danger"
                    >
                       <span className="skew-x-[2deg] flex items-center justify-center">
                         <LogOut className="w-4 h-4 mr-2"/> Bajarme del Equipo
                       </span>
                    </Button>
                  ) : (
                     activeMatch.currentPlayers < activeMatch.maxPlayers ? (
                        <Button 
                            onClick={() => handleJoinRequest(activeMatch)}
                            className="w-full uppercase tracking-widest font-bold skew-x-[-2deg]"
                            variant={activeMatch.level === 'Competitivo' ? 'outline' : 'primary'}
                          >
                            <span className="skew-x-[2deg]">
                              {activeMatch.level === 'Competitivo' ? 'Solicitar Fichaje al Capitán' : `Confirmar Asistencia ($${activeMatch.pricePerPerson})`}
                            </span>
                          </Button>
                      ) : (
                        <Button disabled variant="secondary" className="w-full uppercase font-bold text-gray-500">
                          Lista de Espera Llena
                        </Button>
                      )
                  )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-pitch-900 border border-gray-700 w-full max-w-md rounded-xl p-6 space-y-5 relative animate-fade-in-up shadow-2xl max-h-[90dvh] overflow-y-auto custom-scrollbar">
             <button 
              onClick={handleCloseCreateModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="border-b border-neon-500/50 pb-2">
              <h3 className="text-2xl font-display font-bold text-white uppercase italic tracking-wide">
                {pendingBooking ? 'Confirmar Partido' : 'Organizar Partido'}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-black/40 p-3 rounded border border-gray-800">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase flex items-center">
                    {isPrivate ? <Lock className="w-3 h-3 mr-1"/> : <Globe className="w-3 h-3 mr-1"/>}
                    {isPrivate ? 'Partido Privado' : 'Partido Público'}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">
                    {isPrivate ? 'Solo con invitación o link' : 'Visible para todos en la app'}
                  </span>
                </div>
                <button 
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors relative ${isPrivate ? 'bg-gray-700' : 'bg-neon-500'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isPrivate ? 'translate-x-0' : 'translate-x-6'}`} />
                </button>
              </div>

              <div>
                <label className="text-[10px] text-neon-500 uppercase font-bold tracking-wider ml-1 mb-1 flex items-center">
                   <MapPin className="w-3 h-3 mr-1"/>
                   {pendingBooking ? 'Cancha Reservada' : 'Ubicación'}
                </label>
                <input 
                  type="text" 
                  className={`w-full bg-black border rounded-none p-3 text-white font-bold focus:outline-none transition-colors ${
                    pendingBooking 
                      ? 'border-neon-500/50 text-gray-400 cursor-not-allowed' 
                      : 'border-gray-700 focus:border-neon-500 focus:ring-1 focus:ring-neon-500'
                  }`}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  readOnly={!!pendingBooking}
                />
              </div>

              <Button onClick={handleCreateMatch} className="w-full rounded-none uppercase tracking-widest font-bold skew-x-[-2deg]" disabled={!location}>
                <span className="skew-x-[2deg]">{pendingBooking ? 'Confirmar Reserva y Crear' : 'Crear Partido'}</span>
              </Button>
              <p className="text-[9px] text-center text-gray-500">Podrás convocar jugadores en el siguiente paso.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Player Profile Modal */}
      <PlayerProfileModal 
        player={viewingPlayer} 
        isOpen={!!viewingPlayer} 
        onClose={() => setViewingPlayer(null)} 
      />
    </div>
  );
};
