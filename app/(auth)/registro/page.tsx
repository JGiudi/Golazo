'use client';

import { Trophy, Home as Stadium, User, Mail, Lock, Phone, MapPin, RefreshCcw, ChevronDown, AlertCircle, CheckCircle2, Search, X } from 'lucide-react';
import { useState, useRef, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Header from '@/components/shared/Header';
import { signUp, signInWithGoogle } from '@/lib/supabase/actions';
import { COUNTRY_PREFIXES, isValidNickname } from '@/lib/constants';
import { useLocationSearch } from '@/hooks/useLocationSearch';

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  // Step 1: Role, Step 2: Form
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_PREFIXES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  
  const [selectedLevel, setSelectedLevel] = useState('Intermedio');
  const [selectedSports, setSelectedSports] = useState<string[]>(['Futbol 5']);
  
  // Ubicaciones dinámicas
  const [locationInput, setLocationInput] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const { results: locationResults, isLoading: isLocationLoading } = useLocationSearch(locationInput, selectedCountry.code.toLowerCase(), selectedLocation);
  const [showLocationResults, setShowLocationResults] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const levels = ['Principiante', 'Intermedio', 'Pro'];
  const sports = ['Futbol 5', 'Futbol 7', 'Padel', 'Tenis', 'Futbol 11', 'Basquet'];

  useEffect(() => {
    if (locationResults.length > 0 && locationInput.length > 2 && locationInput !== selectedLocation) {
      setShowLocationResults(true);
    } else {
      setShowLocationResults(false);
    }
  }, [locationResults, locationInput, selectedLocation]);

  const toggleSport = (sport: string) => {
    setSelectedSports(prev => 
      prev.includes(sport) 
        ? prev.filter(s => s !== sport) 
        : [...prev, sport]
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const errors: string[] = [];

    if (!nickname) errors.push('nickname');
    if (!email) errors.push('email');
    if (!password) errors.push('password');
    if (!phone) errors.push('phone');
    if (!selectedLocation) errors.push('location');
    
    if (errors.length > 0) {
      setError('Por favor, completa todos los campos obligatorios.');
      setFieldErrors(errors);
      return;
    }

    if (!isValidNickname(nickname)) {
      setError('El apodo contiene palabras no permitidas. Por favor, elegí otro.');
      setFieldErrors(['nickname']);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setFieldErrors(['password', 'confirmPassword']);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setFieldErrors(['password']);
      return;
    }

    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 7) { 
      setError('Ingresá un número de teléfono válido.');
      setFieldErrors(['phone']);
      return;
    }

    if (selectedSports.length === 0) {
      setError('Elegí al menos un deporte.');
      setFieldErrors(['sports']);
      return;
    }

    setFieldErrors([]);
    startTransition(async () => {
      const fullPhone = `${selectedCountry.prefix}${phoneClean}`;
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('nickname', nickname);
      formData.append('phone', fullPhone);
      formData.append('location', selectedLocation);
      formData.append('level', selectedLevel);
      formData.append('sport', selectedSports.join(', '));

      const result = await signUp(formData);
      if (result?.error) {
        setError(result.error);
        if (result.error.includes('correo')) setFieldErrors(['email']);
        if (result.error.includes('apodo')) setFieldErrors(['nickname']);
      } else {
        setSuccess(true);
      }
    });
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const result = await signInWithGoogle();
    if (result?.error) setError(result.error);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-surface border-2 border-brand/20 rounded-[40px] p-10 text-center space-y-6 max-w-sm w-full shadow-[0_0_50px_rgba(0,230,118,0.05)]">
          <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto text-brand mb-2">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tighter">¡CASI LISTO!</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enviamos un enlace de confirmación a <span className="text-white font-bold">{email}</span>.
              Revisá tu bandeja de entrada para activar tu cuenta.
            </p>
          </div>
          <Button fullWidth onClick={() => router.push('/login')} variant="outline">
            VOLVER AL INICIO
          </Button>
        </div>
      </div>
    );
  }

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
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      <Header variant="back" onBack={() => setStep(1)} title="GOLAZO" />
      <div className="space-y-1 px-6">
        <h2 className="text-6xl font-black uppercase tracking-tighter leading-none italic">CREAR<br /><span className="text-brand">CUENTA</span></h2>
        <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em]">COMENZÁ TU CARRERA PROFESIONAL</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-6 px-6">
        {error && (
          <div className="bg-transparent border-2 border-red-500 rounded-xl p-4 flex items-center gap-3 text-white text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <p>{error}</p>
          </div>
        )}

        <Input
          label="APODO"
          placeholder="Como te dicen en la cancha"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          icon={<User className="w-5 h-5" />}
          error={fieldErrors.includes('nickname')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 relative">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">UBICACIÓN</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscá tu ciudad..."
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onFocus={() => locationResults.length > 0 && setShowLocationResults(true)}
                className={`w-full bg-surface border-2 ${fieldErrors.includes('location') ? 'border-red-500/50 focus:border-red-500' : 'border-surface-light focus:border-brand'} rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:ring-1 ${fieldErrors.includes('location') ? 'focus:ring-red-500' : 'focus:ring-brand'} transition-colors text-white placeholder-gray-500 text-sm`}
              />
              {isLocationLoading && <RefreshCcw className="absolute right-4 top-1/2 -translate-y-1/2 text-brand w-4 h-4 animate-spin" />}
              {!isLocationLoading && locationInput && (
                <X onClick={() => { setLocationInput(''); setSelectedLocation(''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 cursor-pointer hover:text-white" />
              )}
            </div>
            <AnimatePresence>
              {showLocationResults && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-50 top-full left-0 right-0 mt-2 bg-surface border-2 border-surface-light rounded-xl overflow-hidden shadow-2xl">
                  {locationResults.map((loc) => (
                    <button key={loc.id} type="button" onClick={() => { setSelectedLocation(`${loc.nombre}, ${loc.provincia}`); setLocationInput(`${loc.nombre}, ${loc.provincia}`); setShowLocationResults(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-brand/10 transition-colors border-b border-surface-light last:border-0">
                      <p className="font-bold text-white">{loc.nombre}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{loc.provincia}{loc.pais && ` (${loc.pais})`}</p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">TELÉFONO</label>
            <div className="flex gap-2">
              <div className="relative">
                <button type="button" onClick={() => setIsCountryOpen(!isCountryOpen)} className={`h-[58px] bg-surface border-2 ${fieldErrors.includes('phone') ? 'border-red-500/50' : 'border-surface-light'} rounded-xl px-3 flex items-center gap-2 hover:border-brand/50 transition-colors`}>
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isCountryOpen && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute z-50 bottom-full mb-2 left-0 bg-surface border-2 border-surface-light rounded-xl overflow-y-auto max-h-48 shadow-2xl min-w-[140px]">
                      {COUNTRY_PREFIXES.map((country) => (
                        <button key={country.code} type="button" onClick={() => { setSelectedCountry(country); setIsCountryOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand/10 transition-colors border-b border-surface-light last:border-0">
                          <span className="text-xl">{country.flag}</span>
                          <div className="text-left">
                            <p className="text-xs font-bold text-white">{country.prefix}</p>
                            <p className="text-[9px] text-gray-500 uppercase tracking-tighter">{country.name}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative flex-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="tel" placeholder="Número sin prefijo" value={phone} onChange={(e) => setPhone(e.target.value)} className={`w-full bg-surface border-2 ${fieldErrors.includes('phone') ? 'border-red-500/50 focus:border-red-500' : 'border-surface-light focus:border-brand'} rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 ${fieldErrors.includes('phone') ? 'focus:ring-red-500' : 'focus:ring-brand'} transition-colors text-white placeholder-gray-500 text-sm`} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nivel de Juego</label>
          <div className="flex gap-2">
            {levels.map((lvl) => (
              <button key={lvl} type="button" onClick={() => setSelectedLevel(lvl)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedLevel === lvl ? 'bg-brand/10 border-brand text-brand' : 'bg-surface border-surface-light text-gray-500'}`}>
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Deporte Principal (Seleccioná uno o más)</label>
          <div className={`border-2 ${fieldErrors.includes('sports') ? 'border-red-500/30' : 'border-transparent'} rounded-2xl -m-1 p-1`}>
            <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
              <motion.div 
                drag="x" 
                dragConstraints={containerRef} 
                dragElastic={0.2} 
                className="flex gap-2 w-max px-1"
              >
                {sports.map((sport) => (
                  <button
                    key={sport}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSport(sport);
                    }}
                    className={`whitespace-nowrap px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedSports.includes(sport) ? 'bg-brand/10 border-brand text-brand' : 'bg-surface border-surface-light text-gray-500'}`}
                  >
                    {sport}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <Input label="EMAIL" placeholder="tu@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail className="w-5 h-5" />} error={fieldErrors.includes('email')} />
        <Input label="CONTRASEÑA" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock className="w-5 h-5" />} error={fieldErrors.includes('password')} />
        <Input label="CONFIRMAR CONTRASEÑA" placeholder="••••••••" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} icon={<RefreshCcw className="w-5 h-5" />} error={fieldErrors.includes('confirmPassword')} />

        <Button fullWidth type="submit" disabled={isPending} className="mt-4 shadow-[0_0_30px_rgba(0,230,118,0.15)] h-14">
          {isPending ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
        </Button>
      </form>
      <div className="text-center pt-4">
        <p className="text-sm font-medium text-gray-500">¿Ya tenés cuenta? <button onClick={() => router.push('/login')} className="text-brand font-black uppercase tracking-wider ml-1">INGRESAR</button></p>
      </div>
    </div>
  );
}
