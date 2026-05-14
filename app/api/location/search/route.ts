import { NextResponse } from 'next/server';

// Lista de códigos de países de habla hispana (ISO 3166-1 alpha-2)
const HISPANIC_CODES = ['ar', 'bo', 'cl', 'co', 'cr', 'cu', 'do', 'ec', 'sv', 'es', 'gt', 'hn', 'mx', 'ni', 'pa', 'py', 'pe', 'uy', 've', 'pr'];

// Nombres de países en español para el fallback (normalizados para búsqueda)
const HISPANIC_NAMES = [
  'argentina', 'bolivia', 'chile', 'colombia', 'costa rica', 'cuba', 
  'ecuador', 'el salvador', 'españa', 'guatemala', 'honduras', 
  'mexico', 'méxico', 'nicaragua', 'panama', 'panamá', 'paraguay', 
  'peru', 'perú', 'puerto rico', 'republica dominicana', 'república dominicana', 'uruguay', 'venezuela'
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const preferredCountry = searchParams.get('country')?.toLowerCase() || 'ar';

    if (!query || query.length < 3) {
      return NextResponse.json({ results: [] });
    }

    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;

    // 1. INTENTO CON MAPBOX
    if (mapboxToken) {
      try {
        const countries = HISPANIC_CODES.join(',');
        const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&types=place,locality,neighborhood&country=${countries}&language=es&limit=10`;
        
        const response = await fetch(mapboxUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            const results = data.features.map((f: any) => ({
              id: f.id,
              nombre: f.text,
              provincia: f.context?.find((c: any) => c.id.startsWith('region'))?.text || '',
              pais: f.context?.find((c: any) => c.id.startsWith('country'))?.text || '',
              full_name: f.place_name
            }));
            return NextResponse.json({ results });
          }
        }
      } catch (error) {
        console.error('Mapbox API Error:', error);
      }
    }

    // 2. FALLBACK CON PHOTON (Búsqueda más amplia y filtrado manual)
    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=30`;
    const response = await fetch(photonUrl);
    
    if (response.ok) {
      const data = await response.json();
      if (data.features) {
        const results = data.features
          .map((f: any) => {
            const p = f.properties;
            const country = (p.country || '').toLowerCase();
            
            // Verificamos si es un país hispano
            const isHispanic = HISPANIC_NAMES.some(name => country.includes(name));
            if (!isHispanic) return null;

            // Filtrar solo ciudades, localidades o distritos (evitar calles o puntos de interés)
            const allowedTypes = ['city', 'town', 'locality', 'district', 'village', 'state', 'region'];
            if (p.type && !allowedTypes.includes(p.type)) return null;

            return {
              id: `ph-${p.osm_id || Math.random()}`,
              nombre: p.name,
              provincia: p.state || p.county || '',
              pais: p.country || '',
              full_name: `${p.name}, ${p.state || p.country}`,
              isPreferred: country.includes(preferredCountry === 'ar' ? 'argentina' : preferredCountry)
            };
          })
          .filter((r: any) => r !== null)
          .sort((a: any, b: any) => {
            // Prioridad 1: País preferido
            if (a.isPreferred && !b.isPreferred) return -1;
            if (!a.isPreferred && b.isPreferred) return 1;
            return 0;
          })
          .slice(0, 8);

        return NextResponse.json({ results });
      }
    }

    return NextResponse.json({ results: [] });
  } catch (error) {
    console.error('General Search Error:', error);
    return NextResponse.json({ results: [], error: 'Internal Server Error' }, { status: 500 });
  }
}
