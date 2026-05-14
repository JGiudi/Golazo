'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';

type AuthState = {
  loading: boolean;
  userId: string | null;
};

/**
 * Hook base para sesión Supabase en el cliente.
 * Mantiene la sesión sincronizada con onAuthStateChange.
 */
export function useAuth(): AuthState {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient();
    
    // Carga inicial del usuario
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
      setLoading(false);
    };

    void getUser();

    // Listener para cambios de estado (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { loading, userId };
}

