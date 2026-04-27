'use client';

import { ArrowLeft, MapPin, Calendar, Clock, CheckCircle2, XCircle, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import Button from '@/components/ui/Button';

export default function ReservasDetallePage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const players = [
    { name: 'Joaquín', role: 'TITULAR', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop' },
    { name: 'Santi', role: 'TITULAR', image: 'https://i.pravatar.cc/150?u=2' },
    { name: 'Franco', role: 'TITULAR', image: 'https://i.pravatar.cc/150?u=3' },
    { name: 'Tute', role: 'TITULAR', image: 'https://i.pravatar.cc/150?u=4' },
    { name: 'Lichi', role: 'TITULAR', image: 'https://i.pravatar.cc/150?u=5' },
  ];

  return (
    <div className="min-h-screen bg-bg text-white pb-24">
      <Header variant="back" onBack={() => router.back()} onProfileClick={() => router.push('/perfil')} title="DETALLE DE RESERVA" />

      <div className="max-w-5xl mx-auto px-6 mt-6">
        {/* Status Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-brand/10 border border-brand/30 px-6 py-2 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse shadow-[0_0_8px_#00E676]" />
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em] italic">CONFIRMADO</span>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-12 md:items-start">
          {/* Left Column (Desktop) / Top Column (Mobile) */}
          <div className="space-y-8">
            {/* Custom Header Area (Titular) */}
            <div className="relative overflow-hidden rounded-[32px] bg-surface/50 border border-surface-light p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl border-2 border-brand p-0.5 overflow-hidden">
                    <img src={players[0].image} className="w-full h-full object-cover rounded-xl" alt="Titular" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-brand text-bg px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">
                    TITULAR
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-brand uppercase tracking-widest">TITULAR</p>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">{players[0].name}</h2>
                </div>
              </div>
              {/* Faded Background Icon */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-12">
                <Calendar className="w-32 h-32 text-white" />
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface/50 border border-surface-light rounded-[32px] p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-brand" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">CANCHA</p>
                  <h3 className="text-xl font-black italic tracking-tighter uppercase">Cancha 1</h3>
                </div>
              </div>

              <div className="bg-surface/50 border border-surface-light rounded-[32px] p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-accent-yellow/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent-yellow" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">FECHA & HORA</p>
                  <h3 className="text-xl font-black italic tracking-tighter uppercase leading-tight">24 Oct — 20:00</h3>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">UBICACIÓN</h3>
              <div className="h-40 bg-surface border border-surface-light rounded-3xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-50"
                    alt="Map"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,230,118,0.5)] border-4 border-bg">
                        <MapPin className="text-bg w-6 h-6" />
                    </div>
                  </div>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop) / Bottom Column (Mobile) */}
          <div className="space-y-8 mt-8 md:mt-0">
            {/* Amount Card */}
            <div className="bg-surface/50 border border-surface-light rounded-[32px] p-8 flex justify-between items-center relative overflow-hidden">
               <div className="space-y-1">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">MONTO TOTAL</p>
                 <h3 className="text-4xl font-black italic tracking-tighter uppercase">$12.500 <span className="text-gray-600 text-xs tracking-widest not-italic">ARS</span></h3>
               </div>
               <div className="w-14 h-14 bg-surface-light rounded-2xl flex items-center justify-center">
                  <div className="w-8 h-8 opacity-20 relative">
                     <div className="absolute inset-0 border-2 border-white rounded-md" />
                     <div className="absolute top-2 left-2 w-4 h-2 bg-white rounded-sm" />
                  </div>
               </div>
            </div>

            {/* Team List Preview */}
            <div className="space-y-6 bg-surface/30 p-6 md:p-8 rounded-[32px] border border-surface-light/50">
               <h3 className="text-lg font-black uppercase italic tracking-tighter">TU EQUIPO</h3>
               <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {players.map((p, i) => (
                    <div key={i} className="flex-shrink-0 group">
                       <div className="w-14 h-14 rounded-2xl border-2 border-surface-light p-0.5 transition-colors group-hover:border-brand">
                          <img src={p.image} className="w-full h-full object-cover rounded-xl" alt={p.name} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <Button fullWidth icon={<Share2 className="w-5 h-5" />} className="bg-accent-yellow text-bg shadow-[0_0_20px_rgba(255,235,59,0.2)]">
                COMPARTIR CON EL EQUIPO
              </Button>
              <button className="w-full bg-red-500/10 border border-red-500/20 py-5 rounded-2xl flex items-center justify-center gap-3 group hover:bg-red-500/20 transition-colors">
                <XCircle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-black uppercase text-red-500 tracking-widest">CANCELAR RESERVA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
