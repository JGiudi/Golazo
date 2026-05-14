'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import { createBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface ReservationData {
  isSplit: boolean;
  splitCount: number;
}

interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  hasReservation: boolean;
  setHasReservation: (value: boolean) => void;
  reservationData: ReservationData;
  setReservationData: (data: ReservationData) => void;
  adminUser: string | null;
  setAdminUser: (user: string | null) => void;
  hasSeenSplash: boolean;
  setHasSeenSplash: (value: boolean) => void;
  refreshSession: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasReservation, setHasReservation] = useState(false);
  const [reservationData, setReservationData] = useState<ReservationData>({ isSplit: false, splitCount: 10 });
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);
  const router = useRouter();
  
  const supabase = createBrowserClient();

  const refreshSession = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    router.refresh();
  }, [router, supabase]);

  useEffect(() => {
    // Sincronización inicial
    const syncSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    void syncSession();

    // Listener para cambios de estado
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      // Si hay un cambio de sesión real, forzamos el refresh de Next.js
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        setIsLoggedIn: (value: boolean) => {
          if (!value) setUser(null);
        },
        hasReservation,
        setHasReservation,
        reservationData,
        setReservationData,
        adminUser,
        setAdminUser,
        hasSeenSplash,
        setHasSeenSplash,
        refreshSession
      }}
    >
      {!loading && children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
