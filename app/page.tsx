'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('/home');
    }, 950);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen relative overflow-hidden bg-bg">
      {/* vignette + glow (como el diseño) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,230,118,0.22)_0%,rgba(0,230,118,0.08)_32%,rgba(11,14,17,0.0)_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-7xl tracking-wide text-brand drop-shadow-[0_0_45px_rgba(0,230,118,0.65)]">
          GOLAZO
        </h1>
        <p className="mt-6 max-w-xs font-sans text-sm text-gray-300/90">
          Tu próximo partido, a un toque de distancia
        </p>

        <div className="mt-16 h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-pulse bg-brand" />
        </div>

        <div className="mt-14 text-[10px] font-sans uppercase tracking-[0.2em] text-gray-600">
          powered by vercel
        </div>
      </div>
    </main>
  );
}
