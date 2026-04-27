import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';

import './globals.css';
import { AppProvider } from '@/lib/context';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Golazo',
  description: 'Organizá partidos, canchas y tu equipo.',
};

import SplashScreen from '@/components/shared/SplashScreen';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body>
        <AppProvider>
          <SplashScreen />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
