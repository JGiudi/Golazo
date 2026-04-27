'use client';

import { Camera, ChevronRight, User, Mail, Phone, Footprints, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import Button from '@/components/ui/Button';

export default function MisDatosPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg text-white pb-32">
      <Header variant="back" onBack={() => router.back()} title="MIS DATOS" />

      <div className="max-w-2xl mx-auto px-6 mt-8 space-y-10">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative group cursor-pointer">
            <div className="w-28 h-28 rounded-full border-4 border-surface-light p-1 overflow-hidden group-hover:border-brand transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-brand rounded-full flex items-center justify-center border-2 border-bg">
              <Camera className="w-4 h-4 text-bg" />
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cambiar foto de perfil</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-brand uppercase tracking-[0.2em] mb-4">INFORMACIÓN PERSONAL</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  defaultValue="Joaquín Giudice"
                  className="w-full bg-surface/50 border border-surface-light rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-brand focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  defaultValue="joaquin@example.com"
                  readOnly
                  className="w-full bg-surface-light/30 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="tel" 
                  defaultValue="+54 11 1234 5678"
                  className="w-full bg-surface/50 border border-surface-light rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-brand focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <h3 className="text-[10px] font-black text-brand uppercase tracking-[0.2em] mt-8 mb-4">PERFIL DE JUGADOR</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">POSICIÓN</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select className="w-full bg-surface/50 border border-surface-light rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-brand focus:outline-none transition-colors appearance-none">
                  <option>Arquero</option>
                  <option>Defensor</option>
                  <option selected>Mediocampista</option>
                  <option>Delantero</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">PIERNA HÁBIL</label>
              <div className="relative">
                <Footprints className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select className="w-full bg-surface/50 border border-surface-light rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-brand focus:outline-none transition-colors appearance-none">
                  <option selected>Diestro</option>
                  <option>Zurdo</option>
                  <option>Ambidiestro</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-8 pb-4">
          <Button fullWidth className="h-16 shadow-[0_10px_30px_rgba(0,230,118,0.3)]">
            GUARDAR CAMBIOS
          </Button>
        </div>
      </div>
    </div>
  );
}
