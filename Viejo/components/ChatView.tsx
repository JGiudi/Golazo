
import React, { useState } from 'react';
import { ChatConversation, ChatMessage, PlayerProfileData } from '../types';
import { ArrowLeft, Send, MoreVertical, Users, Lock, Search, Phone, Video, Plus, MapPin, BarChart2, ClipboardList, Image as ImageIcon, Mic, X, ChevronRight, Bell, Ban, LogOut, Star, Shield } from 'lucide-react';
import { PlayerProfileModal } from './PlayerProfileModal';

// --- MOCK DATA ---

const CONTACTS = [
  { id: 'c1', name: 'El Turco', status: 'online', position: 'DEL', avatar: 'https://picsum.photos/100/100?random=30' },
  { id: 'c2', name: 'Chino', status: 'playing', position: 'MED', avatar: 'https://picsum.photos/100/100?random=31' },
  { id: 'c3', name: 'Colo', status: 'offline', position: 'DEF', avatar: 'https://picsum.photos/100/100?random=32' },
  { id: 'c4', name: 'Lucho', status: 'online', position: 'POR', avatar: 'https://picsum.photos/100/100?random=33' },
  { id: 'c5', name: 'Migue', status: 'playing', position: 'DEL', avatar: 'https://picsum.photos/100/100?random=36' },
];

const CONVERSATIONS: ChatConversation[] = [
  {
    id: '1',
    name: 'LOS GALÁCTICOS',
    lastMessage: 'Nico: Llevo las pecheras negras.',
    time: '18:30',
    unread: 3,
    avatarUrl: 'https://picsum.photos/50/50?random=20',
    isGroup: true
  },
  {
    id: '2',
    name: 'JUAN PÉREZ',
    lastMessage: 'Transferencia enviada.',
    time: 'AYER',
    unread: 0,
    avatarUrl: 'https://picsum.photos/50/50?random=21',
    isGroup: false
  },
];

const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', senderId: '2', senderName: 'Nico', text: 'Buenas gente, ¿quién confirma para hoy?', timestamp: new Date(new Date().setHours(10, 30)), isMe: false },
  { id: '2', senderId: '3', senderName: 'Maxi', text: 'Yo estoy! Llevo auto.', timestamp: new Date(new Date().setHours(10, 35)), isMe: false },
  { id: '3', senderId: '1', senderName: 'Yo', text: 'Cuenten conmigo. Nos vemos 20hs en la cancha 2.', timestamp: new Date(new Date().setHours(10, 40)), isMe: true },
];

const MOCK_GROUP_MEMBERS = [
  { name: 'Nico G.', role: 'Admin', status: 'online', avatar: 'https://picsum.photos/50/50?random=1', position: 'DEL' },
  { name: 'Maxi', role: 'Jugador', status: 'offline', avatar: 'https://picsum.photos/50/50?random=2', position: 'MID' },
  { name: 'Juan', role: 'Jugador', status: 'playing', avatar: 'https://picsum.photos/50/50?random=3', position: 'DEF' },
  { name: 'Pedro', role: 'Jugador', status: 'online', avatar: 'https://picsum.photos/50/50?random=10', position: 'GK' },
  { name: 'Tú', role: 'Jugador', status: 'online', avatar: 'https://picsum.photos/50/50?random=99', position: 'DEL' },
];

const PLAYER_STATS = {
  matches: 42,
  goals: 15,
  mvp: 3,
  rating: 84
};

type Tab = 'chats' | 'contacts';

export const ChatView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chats');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [tempContactChat, setTempContactChat] = useState<ChatConversation | null>(null);
  
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [showTools, setShowTools] = useState(false);

  // Profile Modal State
  const [viewingPlayer, setViewingPlayer] = useState<PlayerProfileData | null>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: '1',
      senderName: 'Yo',
      text: inputText,
      timestamp: new Date(),
      isMe: true
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleBack = () => {
    if (showChatInfo) {
      setShowChatInfo(false);
    } else {
      setSelectedChatId(null);
      setTempContactChat(null);
    }
  };

  const handleContactClick = (contact: typeof CONTACTS[0]) => {
    openPlayerProfile({
      name: contact.name,
      avatar: contact.avatar,
      position: contact.position
    }, true);
  };

  const openChatWithContact = (contact: typeof CONTACTS[0]) => {
     const existingChat = CONVERSATIONS.find(c => c.name === contact.name.toUpperCase());
     if (existingChat) {
        setSelectedChatId(existingChat.id);
     } else {
        setTempContactChat({
          id: `temp-${contact.id}`,
          name: contact.name,
          lastMessage: '',
          time: '',
          unread: 0,
          avatarUrl: contact.avatar,
          isGroup: false
        });
        setSelectedChatId(`temp-${contact.id}`);
     }
  }

  const openPlayerProfile = (player: { name: string; avatar: string; position: string }, isFriend: boolean) => {
    const rating = Math.floor(Math.random() * 40) + 50; // 50-90 for casuals
    
    const isFwd = player.position === 'FWD' || player.position === 'DEL';
    const isDef = player.position === 'DEF';
    
    // Simple stats 0-100
    const attributes = {
        attack: isFwd ? 80 : isDef ? 40 : 60,
        defense: isDef ? 80 : isFwd ? 30 : 60,
        technique: Math.floor(Math.random() * 50) + 40,
        physical: Math.floor(Math.random() * 50) + 40,
    };
    
    const tags = ['Puntual', 'Buen Compañero'];
    if (isFwd) tags.push('Goleador');

    const mockStats = {
        matches: Math.floor(Math.random() * 50),
        goals: Math.floor(Math.random() * 20),
        mvp: Math.floor(Math.random() * 5),
        rating: rating,
        attributes: attributes
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
        isFriend: isFriend,
        tags: tags,
        reliability: 95
    });
  };

  // --- RENDER HELPERS ---
  const renderStatusIndicator = (status: string) => {
    if (status === 'online') return <div className="w-3 h-3 rounded-full bg-neon-500 border-2 border-pitch-900 shadow-[0_0_8px_#22c55e]"></div>;
    if (status === 'playing') return <div className="w-3 h-3 rounded-full bg-gold-500 border-2 border-pitch-900 shadow-[0_0_8px_#f59e0b]"></div>;
    return <div className="w-3 h-3 rounded-full bg-gray-500 border-2 border-pitch-900"></div>;
  };

  const renderStatusText = (status: string) => {
    if (status === 'online') return <span className="text-neon-500">En Línea</span>;
    if (status === 'playing') return <span className="text-gold-500 font-bold animate-pulse">EN PARTIDO</span>;
    return <span className="text-gray-500">Desconectado</span>;
  };

  // --- MAIN LIST VIEW ---
  if (!selectedChatId) {
    return (
      <div className="pb-24 pt-2 px-0 h-full flex flex-col">
        <div className="px-4 pt-2 pb-4 border-b border-white/5 sticky top-0 bg-pitch-950/95 backdrop-blur z-20">
           <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide mb-4 pl-1">COMUNICACIONES</h2>
           <div className="flex p-1 bg-black/40 rounded-lg border border-gray-800">
              <button 
                onClick={() => setActiveTab('chats')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${activeTab === 'chats' ? 'bg-pitch-800 text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Chats Activos
              </button>
              <button 
                onClick={() => setActiveTab('contacts')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${activeTab === 'contacts' ? 'bg-pitch-800 text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Vestuario (Amigos)
              </button>
           </div>
        </div>

        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder={activeTab === 'chats' ? "Buscar conversación..." : "Buscar jugador..."}
              className="w-full bg-pitch-900 border border-gray-800 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-neon-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
          {activeTab === 'chats' && CONVERSATIONS.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChatId(chat.id)}
              className="bg-pitch-900/50 p-3 rounded-xl border border-gray-800/50 flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer group hover:bg-pitch-800 hover:border-gray-700"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden border border-gray-700">
                   <img src={chat.avatarUrl} alt={chat.name} className="w-full h-full object-cover" />
                </div>
                {chat.unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neon-500 text-pitch-950 text-[10px] font-bold px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-pitch-900 z-10">
                    {chat.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-bold text-white truncate font-display text-base uppercase tracking-wide group-hover:text-neon-400 transition-colors">
                    {chat.name}
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono font-bold">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${chat.unread > 0 ? 'text-white font-medium' : 'text-gray-500'}`}>
                  {chat.isGroup && <Users className="w-3 h-3 inline mr-1 align-text-bottom text-gray-400"/>}
                  {chat.lastMessage}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-500"></div>
              </div>
            </div>
          ))}

          {activeTab === 'contacts' && CONTACTS.map(contact => (
             <div 
               key={contact.id}
               onClick={() => handleContactClick(contact)}
               className="bg-pitch-900 p-3 rounded-xl border border-gray-800 flex items-center gap-4 cursor-pointer hover:bg-pitch-800 transition-colors group"
             >
                <div className="relative shrink-0">
                   <img src={contact.avatar} className={`w-12 h-12 rounded-full object-cover border-2 ${contact.status === 'playing' ? 'border-gold-500' : 'border-gray-700'}`} />
                   <div className="absolute bottom-0 right-0">
                      {renderStatusIndicator(contact.status)}
                   </div>
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-center">
                      <h3 className="font-bold text-white text-base uppercase font-display tracking-wide group-hover:text-neon-400 transition-colors">{contact.name}</h3>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-400">{contact.position}</span>
                   </div>
                   <div className="text-[10px] font-bold uppercase tracking-wide mt-0.5">
                      {renderStatusText(contact.status)}
                   </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); openChatWithContact(contact); }}
                  className="p-2 bg-pitch-800 rounded-full border border-gray-700 text-neon-500 hover:bg-neon-500 hover:text-black transition-colors z-10"
                >
                   <Send className="w-4 h-4 skew-x-[-2deg]" />
                </button>
             </div>
          ))}
        </div>
        
        {/* Profile Modal */}
        <PlayerProfileModal 
           player={viewingPlayer} 
           isOpen={!!viewingPlayer} 
           onClose={() => setViewingPlayer(null)} 
        />
      </div>
    );
  }

  // --- DETAIL VIEW & INFO VIEW ---
  let activeConversation = CONVERSATIONS.find(c => c.id === selectedChatId);
  if (!activeConversation && tempContactChat && tempContactChat.id === selectedChatId) {
    activeConversation = tempContactChat;
  }
  
  if (!activeConversation) {
      activeConversation = { 
        id: 'error',
        name: 'Chat', 
        lastMessage: '',
        time: '',
        unread: 0,
        avatarUrl: 'https://picsum.photos/50/50',
        isGroup: false 
      };
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-pitch-950 fixed inset-0 z-50">
      <div className="bg-pitch-950/90 backdrop-blur border-b border-white/10 p-3 pt-safe flex items-center justify-between z-20 shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-gray-400 hover:text-white p-1 -ml-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setShowChatInfo(true)}
          >
             <div className="w-9 h-9 rounded-full bg-gray-800 overflow-hidden border border-gray-600 group-hover:border-neon-500 transition-colors">
                <img src={activeConversation.avatarUrl || 'https://picsum.photos/50/50'} className="w-full h-full object-cover" />
             </div>
             <div>
                <h3 className="font-bold text-white font-display text-lg uppercase italic tracking-wide leading-none flex items-center gap-2 group-hover:text-neon-400 transition-colors">
                  {activeConversation.name}
                  {activeConversation.isGroup && <div className="bg-gray-800 px-1 rounded text-[8px] text-gray-400 not-italic font-sans">GRUPO</div>}
                </h3>
                <span className="text-[9px] text-neon-500 font-bold uppercase flex items-center gap-1 mt-0.5">
                  <Lock className="w-2 h-2" /> Encriptado
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                </span>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
           <button className="hover:text-neon-500 transition-colors"><Phone className="w-5 h-5" /></button>
           <button className="hover:text-neon-500 transition-colors"><Video className="w-5 h-5" /></button>
           <button className="hover:text-white transition-colors" onClick={() => setShowChatInfo(true)}><MoreVertical className="w-5 h-5" /></button>
        </div>
      </div>

      {showChatInfo ? (
        <div className="flex-1 overflow-y-auto bg-black animate-fade-in-up custom-scrollbar">
           <div className="flex flex-col items-center pt-8 pb-6 bg-gradient-to-b from-pitch-900 to-black border-b border-gray-800">
              <div className="w-32 h-32 rounded-full border-4 border-pitch-800 shadow-2xl overflow-hidden mb-4 relative">
                <img src={activeConversation.avatarUrl} className="w-full h-full object-cover" />
                {activeConversation.isGroup && (
                  <div className="absolute bottom-0 right-0 bg-pitch-800 p-1.5 rounded-full border border-gray-700">
                    <Users className="w-5 h-5 text-neon-500" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-display font-bold text-white uppercase italic tracking-wide mb-1">{activeConversation.name}</h2>
              <span className="text-gray-500 text-xs font-bold uppercase">
                {activeConversation.isGroup ? `Grupo · ${MOCK_GROUP_MEMBERS.length} participantes` : 'Jugador · Delantero'}
              </span>
           </div>

           <div className="p-4 space-y-6">
              <div className="bg-pitch-900 rounded-xl p-4 border border-gray-800">
                <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-2">Descripción</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {activeConversation.isGroup 
                    ? "Grupo oficial del equipo. Se habla de táctica, asados y tercer tiempo. Prohibido bajarse el mismo día."
                    : "Jugador rápido, buen remate de media distancia. Disponible los martes y jueves."
                  }
                </p>
              </div>

              {!activeConversation.isGroup && (
                <div className="bg-pitch-900 rounded-xl border border-gray-800 overflow-hidden">
                   <div className="bg-black/40 p-3 border-b border-gray-800 flex justify-between items-center">
                      <h4 className="text-[10px] text-gray-500 uppercase font-bold">Reporte de Ojeador</h4>
                      <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                   </div>
                   <div className="grid grid-cols-2 divide-x divide-gray-800">
                      <div className="p-4 text-center">
                         <div className="text-3xl font-display font-bold text-white">{PLAYER_STATS.matches}</div>
                         <div className="text-[9px] text-gray-500 uppercase font-bold">Partidos</div>
                      </div>
                      <div className="p-4 text-center">
                         <div className="text-3xl font-display font-bold text-neon-500">{PLAYER_STATS.goals}</div>
                         <div className="text-[9px] text-gray-500 uppercase font-bold">Goles</div>
                      </div>
                      <div className="p-4 text-center border-t border-gray-800">
                         <div className="text-3xl font-display font-bold text-gold-500">{PLAYER_STATS.mvp}</div>
                         <div className="text-[9px] text-gray-500 uppercase font-bold">MVP</div>
                      </div>
                      <div className="p-4 text-center border-t border-gray-800">
                         <div className="text-3xl font-display font-bold text-white">{PLAYER_STATS.rating}</div>
                         <div className="text-[9px] text-gray-500 uppercase font-bold">Calif. Media</div>
                      </div>
                   </div>
                </div>
              )}

              <div>
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="text-[10px] text-gray-500 uppercase font-bold">Multimedia y Archivos</h4>
                    <button className="text-neon-500 text-[10px] font-bold uppercase">Ver Todo</button>
                 </div>
                 <div className="grid grid-cols-4 gap-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="aspect-square bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                        <img src={`https://picsum.photos/200/200?random=${100+i}`} className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                 </div>
              </div>

              {activeConversation.isGroup && (
                <div>
                  <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-2">
                    {MOCK_GROUP_MEMBERS.length} Integrantes
                  </h4>
                  <div className="bg-pitch-900 rounded-xl border border-gray-800 divide-y divide-gray-800/50">
                    {MOCK_GROUP_MEMBERS.map((member, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => openPlayerProfile({ name: member.name, avatar: member.avatar, position: member.position }, member.name !== 'Tú')}
                        className="p-3 flex items-center gap-3 cursor-pointer hover:bg-pitch-800 transition-colors"
                      >
                        <img src={member.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                        <div className="flex-1">
                           <div className="flex justify-between">
                             <span className="text-sm text-white font-bold uppercase">{member.name} {member.name === 'Tú' && '(Tú)'}</span>
                             {member.role === 'Admin' && <span className="text-[9px] bg-neon-500/20 text-neon-500 px-1.5 rounded border border-neon-500/30 font-bold uppercase">Admin</span>}
                           </div>
                           <span className="text-[10px] uppercase font-bold mt-0.5 block">{renderStatusText(member.status)}</span>
                        </div>
                      </div>
                    ))}
                    <button className="w-full p-3 text-center text-neon-500 text-xs font-bold uppercase hover:bg-gray-800 transition-colors">
                       + Añadir Participantes
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-4 pb-8">
                 <button className="w-full bg-pitch-900 border border-gray-800 p-4 rounded-xl flex items-center gap-3 text-gray-300 font-bold text-xs uppercase hover:bg-gray-800 transition-colors">
                    <Bell className="w-4 h-4 text-gray-500" /> Silenciar Notificaciones
                 </button>
                 <button className="w-full bg-pitch-900 border border-gray-800 p-4 rounded-xl flex items-center gap-3 text-red-500 font-bold text-xs uppercase hover:bg-red-900/20 hover:border-red-900/50 transition-colors">
                    {activeConversation.isGroup ? <LogOut className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                    {activeConversation.isGroup ? 'Salir del Grupo' : 'Bloquear Jugador'}
                 </button>
              </div>

           </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a] relative custom-scrollbar">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
            
            <div className="text-center py-4">
              <span className="bg-pitch-900 text-gray-500 text-[10px] px-3 py-1 rounded-full font-bold border border-gray-800 uppercase">Hoy</span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} relative z-10`}>
                {!msg.isMe && activeConversation.isGroup && (
                  <div className="w-6 h-6 rounded-full bg-gray-700 mr-2 overflow-hidden border border-gray-600 mt-1">
                      <img src={`https://picsum.photos/seed/${msg.senderId}/50/50`} className="w-full h-full object-cover" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] p-3 shadow-md relative ${
                    msg.isMe 
                      ? 'bg-gradient-to-br from-neon-900/40 to-pitch-900 border border-neon-500/30 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-pitch-800 border border-gray-700 text-gray-200 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {!msg.isMe && activeConversation.isGroup && (
                    <p className="text-[9px] font-bold mb-1 text-neon-500 uppercase tracking-wider">{msg.senderName}</p>
                  )}
                  <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
                  <div className={`text-[9px] text-right mt-1 font-mono font-bold ${msg.isMe ? 'text-neon-500/60' : 'text-gray-500'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {msg.isMe && <span className="ml-1">✓✓</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showTools && (
            <div className="bg-pitch-900 border-t border-gray-800 p-4 grid grid-cols-4 gap-4 animate-fade-in-up z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                <button className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-neon-500 group-hover:text-black transition-colors">
                      <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase text-center">Ubicación</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-neon-500 group-hover:text-black transition-colors">
                      <BarChart2 className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase text-center">Encuesta</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-neon-500 group-hover:text-black transition-colors">
                      <ClipboardList className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase text-center">Táctica</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-neon-500 group-hover:text-black transition-colors">
                      <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase text-center">Galería</span>
                </button>
            </div>
          )}

          <div className="p-3 bg-pitch-950 border-t border-gray-800 flex items-end gap-2 pb-8 md:pb-3 z-30 shrink-0">
            <button 
              onClick={() => setShowTools(!showTools)}
              className={`p-3 rounded-full transition-colors ${showTools ? 'bg-white text-black rotate-45' : 'bg-gray-800 text-neon-500 hover:bg-gray-700'}`}
            >
              <Plus className="w-5 h-5 transition-transform" />
            </button>
            
            <div className="flex-1 bg-pitch-900 border border-gray-700 rounded-2xl flex items-center px-1 focus-within:border-neon-500 focus-within:ring-1 focus-within:ring-neon-500/30 transition-all">
              <input 
                type="text"
                className="w-full bg-transparent text-white px-3 py-3 text-sm focus:outline-none font-medium placeholder-gray-600 max-h-24"
                placeholder="Escribir mensaje táctico..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="p-2 text-gray-500 hover:text-white">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={handleSend}
              className={`p-3 rounded-full transition-all shadow-lg ${inputText.trim() ? 'bg-neon-500 text-black hover:scale-105' : 'bg-gray-800 text-gray-500'}`}
              disabled={!inputText.trim()}
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </>
      )}
      
      {/* Profile Modal */}
      <PlayerProfileModal 
         player={viewingPlayer} 
         isOpen={!!viewingPlayer} 
         onClose={() => setViewingPlayer(null)} 
      />
    </div>
  );
};
