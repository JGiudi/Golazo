'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { Court } from '@/types/court';

interface UseCourtsFilters {
  category?: string;
  searchQuery?: string;
  zone?: string;
  roofed?: boolean;
  synthetic?: boolean;
}

export function useCourts(filters: UseCourtsFilters) {
  const [courts, setCourts] = useState<Court[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourts() {
      setIsLoading(true);
      setError(null);

      const supabase = createBrowserClient();

      try {
        let query = supabase
          .from('canchas')
          .select('*')
          .eq('active', true);

        if (filters.category && filters.category !== 'Todos') {
          query = query.ilike('deporte', `%${filters.category}%`);
        }

        if (filters.zone && filters.zone !== 'Todas') {
          query = query.ilike('ciudad', `%${filters.zone}%`);
        }

        if (filters.roofed) {
          query = query.eq('techada', true);
        }
        if (filters.synthetic) {
          query = query.eq('sintetico', true);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;

        let filteredData = data as any[];
        if (filters.searchQuery) {
          const search = filters.searchQuery.toLowerCase();
          filteredData = filteredData.filter(c =>
            c.nombre.toLowerCase().includes(search) ||
            c.deporte.toLowerCase().includes(search)
          );
        }

        const processedData = filteredData.map(c => ({
          ...c,
          image_url: c.fotos || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
          distance: `${(Math.random() * 5).toFixed(1)} km`,
          turns_available_today: Math.floor(Math.random() * 6)
        }));

        setCourts(processedData);
      } catch (err: any) {
        console.error('Error fetching courts:', err);
        setError(err.message);

        const mockData: Court[] = [
          {
            id: '1',
            nombre: 'LA CANCHA DE PALERMO',
            precio_hora: 12500,
            deporte: 'Futbol 5',
            ciudad: 'Palermo',
            direccion: 'Palermo, Buenos Aires',
            image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
            turns_available_today: 3,
            techada: true,
            sintetico: true
          }
        ];
        setCourts(mockData);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourts();
  }, [filters.category, filters.searchQuery, filters.zone, filters.roofed, filters.synthetic]);

  return { courts, isLoading, error };
}
