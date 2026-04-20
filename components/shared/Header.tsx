import Link from 'next/link';

type HeaderProps = {
  title?: string;
};

export function Header({ title = 'Golazo' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-pitch-black/90 px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-wide text-electric-green">
          {title}
        </Link>
        <nav className="flex gap-3 text-xs font-sans text-gray-400">
          <Link href="/home" className="hover:text-electric-green">
            Jugador
          </Link>
          <Link href="/dashboard" className="hover:text-electric-green">
            Dueño
          </Link>
        </nav>
      </div>
    </header>
  );
}
