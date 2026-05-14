'use client';

import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Header from '@/components/shared/Header';
import { signIn, signInWithGoogle } from '@/lib/supabase/actions';
import { useAppContext } from '@/lib/context';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshSession } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Capturar errores provenientes de la URL (ej: fallos en callback de Google)
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const result = await signIn(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        await refreshSession();
        router.push('/home');
      }
    });
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const result = await signInWithGoogle();
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="space-y-12">
      <Header variant="back" title="GOLAZO" />

      <div className="space-y-1 px-8">
        <p className="text-accent-yellow font-black uppercase text-[10px] sm:text-sm tracking-widest italic">
          EL TUNEL HACIA LA CANCHA
        </p>
        <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter leading-none">BIENVENIDO</h2>
      </div>

      <form onSubmit={handleLogin} className="space-y-6 px-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <Input
          label="TU CORREO"
          placeholder="email@ejemplo.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5" />}
        />

        <div className="space-y-1">
          <Input
            label="CONTRASEÑA"
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-5 h-5" />}
            rightIcon={
              showPassword ?
                <EyeOff onClick={() => setShowPassword(false)} className="w-5 h-5" /> :
                <Eye onClick={() => setShowPassword(true)} className="w-5 h-5" />
            }
          />
          <div className="flex justify-end">
            <button type="button" className="text-[10px] font-black uppercase text-accent-yellow tracking-wider">
              ¿OLVIDASTE TU CONTRASEÑA?
            </button>
          </div>
        </div>

        <Button
          fullWidth
          type="submit"
          disabled={isPending}
          className="mt-4 sm:mt-8 h-14"
        >
          {isPending ? 'INGRESANDO...' : 'INGRESAR'}
        </Button>
      </form>

      <div className="flex items-center gap-4 py-4 px-6">
        <div className="flex-1 h-px bg-surface-light" />
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">O CONTINUÁ CON</span>
        <div className="flex-1 h-px bg-surface-light" />
      </div>

      <div className="px-6">
        <Button
          variant="outline"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={isPending}
          className="gap-4 font-bold border-surface-light h-14"
        >
          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
            <span className="text-[10px] text-black font-black">G</span>
          </div>
          GOOGLE ACCOUNT
        </Button>
      </div>

      <div className="text-center pt-8">
        <p className="text-sm font-medium text-gray-500">
          ¿No tenés cuenta? {' '}
          <button
            type="button"
            onClick={() => router.push('/registro')}
            className="text-brand font-black uppercase tracking-wider ml-1"
          >
            REGISTRATE GRATIS
          </button>
        </p>
      </div>
    </div>
  );
}
