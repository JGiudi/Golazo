'use client';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Header from '@/components/shared/Header';
import { useAppContext } from '@/lib/context';

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    router.push('/home');
  };

  return (
    <div className="space-y-12">
      <Header variant="back" title="GOLAZO" />

      {/* Hero Text */}
      <div className="space-y-1 px-8">
        <p className="text-accent-yellow font-black uppercase text-[10px] sm:text-sm tracking-widest italic">
          EL TUNEL HACIA LA CANCHA
        </p>
        <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter leading-none">BIENVENIDO</h2>
      </div>

      {/* Form */}
      <div className="space-y-6 px-6">
        <Input 
          label="TU CORREO"
          placeholder="email@ejemplo.com"
          icon={<Mail className="w-5 h-5" />}
        />
        
        <div className="space-y-1">
          <Input 
            label="CONTRASEÑA"
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            icon={<Lock className="w-5 h-5" />}
            rightIcon={
              showPassword ? 
              <EyeOff onClick={() => setShowPassword(false)} className="w-5 h-5" /> : 
              <Eye onClick={() => setShowPassword(true)} className="w-5 h-5" />
            }
          />
          <div className="flex justify-end">
            <button className="text-[10px] font-black uppercase text-accent-yellow tracking-wider">
              ¿OLVIDASTE TU CONTRASEÑA?
            </button>
          </div>
        </div>

        <Button fullWidth onClick={handleLoginSuccess} className="mt-4 sm:mt-8">
          INGRESAR
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 py-4 px-6">
        <div className="flex-1 h-px bg-surface-light" />
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">O CONTINUÁ CON</span>
        <div className="flex-1 h-px bg-surface-light" />
      </div>

      {/* Social Login */}
      <div className="px-6">
        <Button variant="outline" fullWidth className="gap-4 font-bold border-surface-light">
          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
             <span className="text-[10px] text-black font-black">G</span>
          </div>
          GOOGLE ACCOUNT
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center pt-8">
        <p className="text-sm font-medium text-gray-500">
          ¿No tenés cuenta? {' '}
          <button onClick={() => router.push('/registro')} className="text-brand font-black uppercase tracking-wider ml-1">
            REGISTRATE GRATIS
          </button>
        </p>
      </div>
    </div>
  );
}
