const HISPANIC_COUNTRY_CODES = 'AR,BO,CL,CO,CR,CU,DO,EC,SV,GT,HN,MX,NI,PA,PY,PE,PR,ES,UY,VE';

const HISPANIC_COUNTRY_NAMES = [
  'Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba',
  'Dominican Republic', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras',
  'Mexico', 'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'Puerto Rico',
  'Spain', 'Uruguay', 'Venezuela'
];

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export interface LocationResult {
  name: string;
  id: string;
  type: string;
  context?: string;
}

function cleanLocationName(name: string): string {
  if (!name) return '';
  return name
    .replace(/\b(city|district|town|locality|village|municipality|partido|departamento|municipio)\b/gi, '')
    .replace(/[·•|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function searchLocations(query: string): Promise<LocationResult[]> {
  if (!query || query.length < 3) return [];

  try {
    if (MAPBOX_TOKEN) {
      const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?types=place,locality,neighborhood&language=es&country=${HISPANIC_COUNTRY_CODES}&access_token=${MAPBOX_TOKEN}`;
      const response = await fetch(mapboxUrl);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        return data.features.map((f: any) => {
          const contextParts = f.context ? f.context.map((c: any) => cleanLocationName(c.text)) : [];
          return {
            name: cleanLocationName(f.text),
            id: f.id,
            type: f.place_type[0],
            context: contextParts.filter(Boolean).join(', ')
          };
        });
      }
    }

    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=en`;
    const response = await fetch(photonUrl);
    const data = await response.json();

    if (data.features) {
      return data.features
        .filter((f: any) => {
          const country = f.properties.country;
          const type = f.properties.type;
          const isHispanic = HISPANIC_COUNTRY_NAMES.includes(country);
          const isAllowedType = ['city', 'town', 'locality', 'district', 'state'].includes(type);
          return isHispanic && isAllowedType;
        })
        .map((f: any) => {
          const rawName = f.properties.name || f.properties.city || f.properties.state;
          const state = f.properties.state;
          const country = f.properties.country;
          const context = [cleanLocationName(state), cleanLocationName(country)].filter(Boolean).join(', ');

          return {
            name: cleanLocationName(rawName),
            id: `${f.properties.osm_id || Math.random()}`,
            type: f.properties.type,
            context: context
          };
        });
    }
  } catch (error) {
    console.error('Error searching locations:', error);
  }

  return [];
}

export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const photonUrl = `https://photon.komoot.io/reverse?lon=${lon}&lat=${lat}`;
    const response = await fetch(photonUrl);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const prop = data.features[0].properties;
      const rawResult = prop.city || prop.locality || prop.name || prop.state;
      return cleanLocationName(rawResult);
    }
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
  }
  return null;
}
