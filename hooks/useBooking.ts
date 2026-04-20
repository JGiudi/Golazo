'use client';

import { useCallback, useState } from 'react';

type BookingStatus = 'idle' | 'loading' | 'error' | 'success';

/**
 * Placeholder para flujo de reserva (cancha / partido).
 * Conectá con Server Actions o API routes y Supabase.
 */
export function useBooking() {
  const [status, setStatus] = useState<BookingStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  return {
    status,
    error,
    reset,
    setStatus,
    setError,
  };
}
