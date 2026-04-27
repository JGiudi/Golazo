'use client';

import { Trophy, Home as Stadium, User, Mail, Lock, Phone, MapPin, RefreshCcw, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Header from '@/components/shared/Header';
import { useAppContext } from '@/lib/context';

export default function RegisterPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useAppContext();
  
  // Step 1: Role, Step 2: Form
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [selectedLevel, setSelectedLevel] = useState('Intermedio');
  const [selectedSport, setSelectedSport] = useState('Futbol 5');
  const [selectedLocation, setSelectedLocation] = useState('Palermo, Buenos Aires');
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const levels = ['Principiante', 'Intermedio', 'Pro'];
  const sports = ['Futbol 5', 'Futbol 7', 'Padel', 'Tenis', 'Futbol 11', 'Basquet'];
  const locationsList = [
    'Palermo, Buenos Aires',
    'San Isidro, Buenos Aires',
    'Beccar, Buenos Aires',
    'Pilar, Buenos Aires',
    'Tigre, Buenos Aires',
    'Martínez, Buenos Aires',
    'Olivos, Buenos Aires'
  ];

  useEffect(() => {
    if (step === 2 && containerRef.current && scrollRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      setDragConstraints({ right: 0, left: -(scrollWidth - containerWidth) });
    }
  }, [step]);

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
    router.push('/home');
  };

  if (step === 1) {
    return (
      <div className="space-y-12 pb-12">
        <Header variant="back" title="GOLAZO" onBack={() => router.push('/home')} />

        <div className="px-6 space-y-12">
          <h1 className="text-4xl font-black uppercase text-center leading-tight tracking-tighter">
            ¿CÓMO QUERÉS{'\n'}USAR <span className="text-brand italic">GOLAZO?</span>
          </h1>

          <div className="space-y-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(2)}
              className="w-full bg-surface border-2 border-brand rounded-[32px] p-8 flex items-center gap-6 text-left relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 bg-surface-light rounded-2xl flex items-center justify-center text-brand">
                <Trophy className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tight">SOY JUGADOR</h2>
                <p className="text-gray-400 text-sm leading-tight">Reservá canchas, armá equipos y jugá.</p>
              </div>
            </motion.button>

            <div className="w-full bg-surface/50 border-2 border-surface-light opacity-60 rounded-[32px] p-8 flex items-center gap-6 text-left relative overflow-hidden">
              <div className="w-16 h-16 bg-surface-light/50 rounded-2xl flex items-center justify-center text-gray-500">
                <Stadium className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-black uppercase tracking-tight text-gray-400">TENGO UNA CANCHA</h2>
                  <div className="bg-accent-yellow text-bg text-[10px] font-black px-2 py-1 rounded-sm uppercase transform rotate-2">
                    MUY PRONTO
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-tight">Gestioná tus turnos y aumentá tus reservas.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center px-12">
          <p className="text-xs font-medium text-gray-500 leading-relaxed uppercase tracking-widest">
            Próximamente podrás registrar tu cancha y empezar a recibir reservas directamente desde la app.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      <Header variant="back" onBack={() => setStep(1)} title="GOLAZO" />

      {/* Hero Text */}
      <div className="space-y-1 px-6">
        <h2 className="text-6xl font-black uppercase tracking-tighter leading-none italic">CREAR<br/><span className="text-brand">CUENTA</span></h2>
        <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em]">COMENZÁ TU CARRERA PROFESIONAL</p>
      </div>

      {/* Form */}
      <div className="space-y-6 px-6">
        <Input 
          label="APODO"
          placeholder="Como te dicen en la cancha"
          icon={<User className="w-5 h-5" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">UBICACIÓN</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-surface border-2 border-surface-light rounded-xl py-4 pl-12 pr-12 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors text-white appearance-none cursor-pointer text-sm"
              >
                {locationsList.map(loc => (
                  <option key={loc} value={loc} className="bg-surface text-white">
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <Input 
            label="NÚMERO DE TELÉFONO"
            placeholder="+54 9 11 ..."
            type="tel"
            icon={<Phone className="w-5 h-5" />}
          />
        </div>

        {/* Nivel de Juego */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nivel de Juego</label>
          <div className="flex gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedLevel === lvl ? 'bg-brand/10 border-brand text-brand' : 'bg-surface border-surface-light text-gray-500'}`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Deporte Favorito */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Deporte Principal</label>
          <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div 
              ref={scrollRef}
              drag="x"
              dragConstraints={dragConstraints}
              dragElastic={0.1}
              className="flex gap-2 w-max"
            >
              {sports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`whitespace-nowrap px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedSport === sport ? 'bg-brand/10 border-brand text-brand' : 'bg-surface border-surface-light text-gray-500'}`}
                >
                  {sport}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
        
        <Input 
          label="EMAIL"
          placeholder="tu@email.com"
          type="email"
          icon={<Mail className="w-5 h-5" />}
        />
        
        <Input 
          label="CONTRASEÑA"
          placeholder="••••••••"
          type="password"
          icon={<Lock className="w-5 h-5" />}
        />

        <Input 
          label="CONFIRMAR CONTRASEÑA"
          placeholder="••••••••"
          type="password"
          icon={<RefreshCcw className="w-5 h-5" />}
        />

        <div className="flex items-center gap-3 py-1">
          <div className="w-5 h-5 rounded-md border-2 border-surface-light flex items-center justify-center cursor-pointer hover:border-brand transition-colors">
            <div className="w-2 h-2 bg-brand rounded-sm opacity-0 hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
            Acepto los <span className="text-brand underline underline-offset-2">términos y condiciones</span>
          </p>
        </div>

        <Button fullWidth onClick={handleRegisterSuccess} className="mt-4 shadow-[0_0_30px_rgba(0,230,118,0.15)] h-14">
          CREAR CUENTA
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 py-2 px-6">
        <div className="flex-1 h-px bg-surface-light" />
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">O REGISTRATE CON</span>
        <div className="flex-1 h-px bg-surface-light" />
      </div>

      {/* Social Login */}
      <div className="px-6">
        <Button variant="outline" fullWidth className="gap-4 font-bold border-surface-light h-14">
          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
             <span className="text-[10px] text-black font-black">G</span>
          </div>
          CONTINUAR CON GOOGLE
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center pt-4">
        <p className="text-sm font-medium text-gray-500">
          ¿Ya tenés cuenta? {' '}
          <button onClick={() => router.push('/login')} className="text-brand font-black uppercase tracking-wider ml-1">
            INGRESAR
          </button>
        </p>
      </div>
    </div>
  );
}
