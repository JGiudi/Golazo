'use client';

import { useEffect, useState } from 'react';

import { createBrowserClient } from '@/lib/supabase/client';

type AuthState = {
  loading: boolean;
  userId: string | null;
};

/**
 * Hook base para sesión Supabase en el cliente.
 * Amplía con listeners de auth cuando conectes login/registro.
 */
export function useAuth(): AuthState {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const supabase = createBrowserClient();
        const { data } = await supabase.auth.getUser();
        if (!cancelled) {
          setUserId(data.user?.id ?? null);
        }
      } catch {
        if (!cancelled) setUserId(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, userId };
}
