'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { Court, TimeSlot } from '@/types/court';

export function useCourt(id: string) {
  const [court, setCourt] = useState<Court | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchCourtData() {
      setIsLoading(true);
      const supabase = createBrowserClient();

      try {
        const { data: courtRaw, error: courtError } = await supabase
          .from('canchas')
          .select('*')
          .eq('id', id)
          .eq('active', true)
          .single();

        if (courtError) throw courtError;
        if (!courtRaw) throw new Error('Cancha no encontrada');

        const courtData = courtRaw as any;
        const processedCourt: Court = {
          ...courtData,
          image_url: courtData.fotos || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
        };
        setCourt(processedCourt);

        const { data: slotsDataRaw, error: slotsError } = await supabase
          .from('horarios')
          .select('id, cancha_id, dia, hora_apertura, hora_cierre')
          .eq('cancha_id', id);

        if (slotsError) {
          console.warn('Error fetching slots:', slotsError);
          setSlots([]);
        } else {
          setSlots((slotsDataRaw as any[]) || []);
        }

      } catch (err: any) {
        console.error('Error fetching court detail:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourtData();
  }, [id]);

  return { court, slots, isLoading, error };
}
