
import React, { useState } from 'react';
import { Settings, Edit, CreditCard, Shield, LogOut, Star, User, Bell, Lock, QrCode, Shirt, Zap, ThumbsUp, Activity, X, Check, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Button } from './Button';
import { PlayerProfileData, Transaction } from '../types';

// Mock User Data
const USER_PROFILE = {
  name: 'Nico G.',
  fullName: 'Nicolás González',
  position: 'DEL',
  number: 10,
  rating: 88,
  matchesPlayed: 142,
  goals: 89,
  mvp: 12,
  tier: 'Titular',
  avatar: 'https://picsum.photos/100/100?random=99',
  balance: 4500,
  club: 'Los Galácticos',
  // Simplified attributes
  attributes: { attack: 90, defense: 45, technique: 85, physical: 80 },
  tags: ['Velocista', 'Goleador', 'Puntual'],
  reputation: 98 // High reputation
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'payment', amount: 2500, description: 'Reserva El Templo', date: new Date(new Date().setDate(new Date().getDate() - 1)), status: 'completed', method: 'Mercado Pago' },
  { id: 't2', type: 'deposit', amount: 5000, description: 'Carga de Saldo', date: new Date(new Date().setDate(new Date().getDate() - 3)), status: 'completed', method: 'Tarjeta Crédito' },
  { id: 't3', type: 'payment', amount: 1800, description: 'Partido Club Parque', date: new Date(new Date().setDate(new Date().getDate() - 7)), status: 'completed', method: 'Wallet' },
];

// Simple bar for stats
const SimpleStatBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
  <div className="mb-2">
    <div className="flex justify-between items-end mb-1">
      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="text-[10px] font-bold text-white font-mono">{value}</span>
    </div>
    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
      <div 
        className={`h-full rounded-full ${colorClass}`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);


export const ProfileView: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  
  // Local state for editing form (mock)
  const [editForm, setEditForm] = useState({
    name: USER_PROFILE.name,
    position: USER_PROFILE.position,
    number: USER_PROFILE.number
  });

  const handleSaveProfile = () => {
    // In a real app, this would update the backend
    setIsEditModalOpen(false);
    alert('Perfil actualizado con éxito');
  };

  return (
    <div className="pb-24 pt-2 space-y-6 animate-fade-in-up">
      
      {/* Header Title */}
      <div className="px-4 pt-2 border-b border-white/5 pb-4 flex justify-between items-end sticky top-0 bg-pitch-950/95 backdrop-blur z-30">
         <div>
            <h2 className="text-3xl font-display font-bold text-white uppercase italic tracking-wide leading-none">Mi Ficha</h2>
            <span className="text-[10px] text-neon-500 font-bold uppercase tracking-widest">Perfil de Jugador</span>
         </div>
         <button className="text-gray-400 hover:text-white transition-colors">
            <Settings className="w-6 h-6" />
         </button>
      </div>

      <div className="px-4 space-y-6">
        
        {/* 1. HERO PLAYER CARD */}
        <div className="relative w-full aspect-[1.8/1] rounded-2xl overflow-hidden shadow-2xl group">
           {/* Background & Effects */}
           <div className="absolute inset-0 bg-gradient-to-br from-pitch-900 via-black to-pitch-950"></div>
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-neon-500/20 blur-[50px] rounded-full"></div>
           
           {/* Card Content */}
           <div className="absolute inset-0 p-6 flex items-center gap-6">
              {/* Avatar & Rating */}
              <div className="relative shrink-0">
                 <div className="w-24 h-24 rounded-full border-4 border-pitch-800 shadow-xl overflow-hidden relative z-10">
                    <img src={USER_PROFILE.avatar} alt="Avatar" className="w-full h-full object-cover" />
                 </div>
                 {/* Rating Badge */}
                 <div className="absolute -top-2 -right-2 z-20 bg-pitch-950 border-2 border-gold-500 text-gold-500 w-10 h-10 flex items-center justify-center rounded-lg shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    <span className="font-display font-bold text-xl">{USER_PROFILE.rating}</span>
                 </div>
                 {/* Captain Armband Visual */}
                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20 bg-neon-500 text-black text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-lg">
                    {USER_PROFILE.tier}
                 </div>
              </div>

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-start">
                    <div>
                        <div className="text-4xl font-display font-bold text-white uppercase italic leading-none tracking-wide">
                            {editForm.name}
                        </div>
                        <div className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                            <Shirt className="w-3 h-3" /> {USER_PROFILE.club}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-5xl font-display font-bold text-gray-700 group-hover:text-neon-500/20 transition-colors select-none">
                            {editForm.number}
                        </div>
                    </div>
                 </div>
                 
                 {/* Stats Row (Simple Bars) */}
                 <div className="mt-3 grid grid-cols-2 gap-x-4">
                    <SimpleStatBar label="Ataque" value={USER_PROFILE.attributes.attack} colorClass="bg-blue-500" />
                    <SimpleStatBar label="Defensa" value={USER_PROFILE.attributes.defense} colorClass="bg-red-500" />
                 </div>
              </div>
           </div>
           
           {/* Edit Trigger */}
           <button 
             onClick={() => setIsEditModalOpen(true)}
             className="absolute bottom-3 right-3 p-2 bg-black/50 hover:bg-neon-500 hover:text-black text-white rounded-full backdrop-blur border border-white/10 transition-all"
           >
              <Edit className="w-4 h-4" />
           </button>
        </div>

        {/* REPUTATION CARD (New) */}
        <div className="bg-gradient-to-r from-neon-900/30 to-pitch-900 border border-neon-500/30 p-4 rounded-xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-neon-500/20 border border-neon-500 flex items-center justify-center text-neon-500">
                  <Shield className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reputación Fair Play</div>
                  <div className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
                     PROFESIONAL <span className="text-neon-500 text-xs">(Impecable)</span>
                  </div>
               </div>
            </div>
            <div className="text-right">
               <div className="text-3xl font-display font-bold text-neon-500">{USER_PROFILE.reputation}%</div>
            </div>
        </div>

        {/* 2. DIGITAL ID (GOLAZO PASS) */}
        <button 
          onClick={() => setIsWalletModalOpen(true)}
          className="w-full relative h-48 rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] text-left"
        >
           {/* Card Background */}
           <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-multiply"></div>
           
           {/* Card Content */}
           <div className="absolute inset-0 p-5 flex flex-col justify-between text-black">
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6" strokeWidth={2.5} />
                    <span className="font-display font-bold text-xl tracking-widest italic">GOLAZO PASS</span>
                 </div>
                 <div className="opacity-70">
                    <QrCode className="w-10 h-10" />
                 </div>
              </div>
              
              <div className="flex justify-between items-end">
                 <div className="font-mono text-xs font-bold tracking-widest opacity-80">
                    **** **** **** 1092
                 </div>
                 <div className="text-right">
                    <span className="block text-[9px] font-bold uppercase opacity-70">Saldo Disponible</span>
                    <span className="block text-3xl font-display font-bold">${USER_PROFILE.balance}</span>
                 </div>
              </div>
           </div>

           {/* Shine Effect */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
        </button>

        {/* 3. CAREER STATS */}
        <div className="grid grid-cols-3 gap-3">
           <div className="bg-pitch-900 border border-gray-800 rounded-xl p-3 flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl font-display font-bold text-white">{USER_PROFILE.matchesPlayed}</span>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Partidos</span>
           </div>
           <div className="bg-pitch-900 border border-gray-800 rounded-xl p-3 flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl font-display font-bold text-neon-500">{USER_PROFILE.goals}</span>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Goles</span>
           </div>
           <div className="bg-pitch-900 border border-gray-800 rounded-xl p-3 flex flex-col items-center justify-center shadow-lg">
              <div className="flex items-center gap-1">
                 <span className="text-2xl font-display font-bold text-gold-500">{USER_PROFILE.mvp}</span>
                 <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
              </div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">MVP</span>
           </div>
        </div>

        {/* 4. MENU LIST */}
        <div className="bg-pitch-900 border border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-800">
           {[
             { icon: User, label: 'Editar Datos Personales', sub: 'Nombre, Peso, Altura', onClick: () => setIsEditModalOpen(true) },
             { icon: Shirt, label: 'Mi Vestuario', sub: 'Camisetas, Botines, Dorsal' },
             { icon: CreditCard, label: 'Métodos de Pago', sub: 'Tarjetas, Mercado Pago', onClick: () => setIsWalletModalOpen(true) },
             { icon: Bell, label: 'Notificaciones', sub: 'Alertas de partido' },
             { icon: Lock, label: 'Privacidad y Seguridad', sub: 'Contraseña, Biometría' },
           ].map((item, idx) => (
             <button 
               key={idx} 
               onClick={item.onClick}
               className="w-full p-4 flex items-center gap-4 hover:bg-gray-800 transition-colors group text-left"
             >
                <div className="w-10 h-10 rounded-full bg-black border border-gray-700 flex items-center justify-center group-hover:border-neon-500 transition-colors">
                   <item.icon className="w-5 h-5 text-gray-400 group-hover:text-neon-500" />
                </div>
                <div className="flex-1">
                   <div className="font-bold text-white text-sm uppercase tracking-wide">{item.label}</div>
                   <div className="text-[10px] text-gray-500 font-bold uppercase">{item.sub}</div>
                </div>
                <div className="text-gray-600 group-hover:text-white transition-colors">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
             </button>
           ))}
           
           <button className="w-full p-4 flex items-center gap-4 hover:bg-red-900/20 transition-colors group text-left">
                <div className="w-10 h-10 rounded-full bg-black border border-gray-700 flex items-center justify-center group-hover:border-red-500 transition-colors">
                   <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                   <div className="font-bold text-red-500 text-sm uppercase tracking-wide">Cerrar Sesión</div>
                </div>
           </button>
        </div>

        {/* Footer Version */}
        <div className="text-center py-4">
           <span className="text-[10px] text-gray-600 font-mono uppercase">Golazo App v1.0.2 (Beta)</span>
        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-pitch-950 border border-gray-700 rounded-xl p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
               <h3 className="text-xl font-display font-bold text-white uppercase italic">Editar Perfil</h3>
               <button onClick={() => setIsEditModalOpen(false)}><X className="w-6 h-6 text-gray-500 hover:text-white"/></button>
            </div>
            
            <div className="space-y-4">
               <div>
                 <label className="text-[10px] font-bold text-neon-500 uppercase tracking-widest mb-1 block">Nombre de Jugador</label>
                 <input 
                   type="text" 
                   value={editForm.name}
                   onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                   className="w-full bg-black border border-gray-700 p-3 text-white font-bold focus:border-neon-500 focus:outline-none"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Posición</label>
                    <select 
                      value={editForm.position}
                      onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                      className="w-full bg-black border border-gray-700 p-3 text-white font-bold focus:border-neon-500 focus:outline-none"
                    >
                      <option value="DEL">Delantero</option>
                      <option value="MED">Mediocampista</option>
                      <option value="DEF">Defensor</option>
                      <option value="GK">Arquero</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Dorsal</label>
                    <input 
                      type="number" 
                      value={editForm.number}
                      onChange={(e) => setEditForm({...editForm, number: parseInt(e.target.value)})}
                      className="w-full bg-black border border-gray-700 p-3 text-white font-bold focus:border-neon-500 focus:outline-none"
                    />
                  </div>
               </div>
            </div>

            <Button onClick={handleSaveProfile} className="w-full uppercase font-bold tracking-widest">Guardar Cambios</Button>
          </div>
        </div>
      )}

      {/* WALLET MODAL */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-pitch-950 border border-gray-700 rounded-xl flex flex-col max-h-[80vh]">
             <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-pitch-900 rounded-t-xl">
               <div>
                 <h3 className="text-xl font-display font-bold text-white uppercase italic tracking-wide">Billetera</h3>
                 <div className="text-[10px] font-bold text-gray-500 uppercase">Historial de Transacciones</div>
               </div>
               <button onClick={() => setIsWalletModalOpen(false)}><X className="w-6 h-6 text-gray-500 hover:text-white"/></button>
             </div>

             <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {MOCK_TRANSACTIONS.map((t) => (
                   <div key={t.id} className="bg-black p-3 rounded border border-gray-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${t.type === 'deposit' ? 'bg-neon-500/10 border-neon-500 text-neon-500' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>
                            {t.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                         </div>
                         <div>
                            <div className="text-sm font-bold text-white uppercase">{t.description}</div>
                            <div className="text-[10px] font-bold text-gray-500 uppercase">{t.date.toLocaleDateString()} · {t.method}</div>
                         </div>
                      </div>
                      <div className={`font-mono font-bold text-lg ${t.type === 'deposit' ? 'text-neon-500' : 'text-white'}`}>
                         {t.type === 'deposit' ? '+' : '-'}${t.amount}
                      </div>
                   </div>
                ))}
             </div>
             
             <div className="p-4 border-t border-gray-800">
                <Button variant="secondary" className="w-full uppercase font-bold text-xs">Cargar Saldo</Button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};
