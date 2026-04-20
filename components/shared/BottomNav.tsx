'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/home', label: 'Inicio' },
  { href: '/buscar', label: 'Buscar' },
  { href: '/partidos', label: 'Partidos' },
  { href: '/perfil', label: 'Perfil' },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-dark-surface/95 px-2 py-2 backdrop-blur-md md:hidden">
      <ul className="mx-auto flex max-w-lg justify-between">
        {items.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex min-w-[4rem] flex-col items-center rounded-lg px-2 py-1 text-[10px] font-sans uppercase tracking-wide ${
                  active ? 'text-electric-green' : 'text-gray-500'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
