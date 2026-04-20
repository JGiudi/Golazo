import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6">
      <h1 className="font-display text-5xl md:text-7xl text-electric-green tracking-wide">
        GOLAZO
      </h1>
      <p className="font-sans text-dark-surface bg-goal-yellow/10 border border-goal-yellow/30 rounded-lg px-4 py-2 text-center max-w-md">
        Estructura base Next.js 14. Elegí un flujo para empezar.
      </p>
      <nav className="flex flex-wrap gap-4 justify-center text-sm">
        <Link
          href="/login"
          className="text-electric-green underline underline-offset-4"
        >
          Login
        </Link>
        <Link
          href="/registro"
          className="text-electric-green underline underline-offset-4"
        >
          Registro
        </Link>
        <Link
          href="/home"
          className="text-electric-green underline underline-offset-4"
        >
          Jugador
        </Link>
        <Link
          href="/dashboard"
          className="text-electric-green underline underline-offset-4"
        >
          Dueño
        </Link>
      </nav>
    </main>
  );
}
