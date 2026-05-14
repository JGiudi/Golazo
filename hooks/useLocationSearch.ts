import { useState, useEffect } from 'react';

export interface LocationResult {
  id: string;
  nombre: string;
  provincia: string;
  pais: string;
  full_name: string;
}

/**
 * Hook para buscar ubicaciones a través de nuestra API local.
 * Esto permite centralizar la lógica y ocultar tokens de API.
 */
export function useLocationSearch(input: string, preferredCountryCode: string = 'ar', selectedLocation: string = '') {
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const query = input.trim();
      
      // Solo buscar si hay más de 2 caracteres y no es la ubicación ya seleccionada
      if (query.length > 2 && query !== selectedLocation) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/location/search?q=${encodeURIComponent(query)}&country=${preferredCountryCode}`);
          const data = await response.json();
          
          if (data.results) {
            setResults(data.results);
          } else {
            setResults([]);
          }
        } catch (err) {
          console.error('Error fetching locations:', err);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else if (query.length <= 2) {
        setResults([]);
      }
    }, 500); // Debounce de 500ms para no saturar la API

    return () => clearTimeout(timer);
  }, [input, selectedLocation, preferredCountryCode]);

  return { results, isLoading };
}
