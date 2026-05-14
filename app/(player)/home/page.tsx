'use client';

import { MapPin, Search, Trophy, Map as MapIcon, ChevronDown, CloudRain, SlidersHorizontal, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Header from '@/components/shared/Header';
import CourtCard from '@/components/shared/CourtCard';
import { useAppContext } from '@/lib/context';
import { useCourts } from '@/hooks/useCourts';
import { searchLocations, reverseGeocode, LocationResult } from '@/lib/location';

export default function PlayerHomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAppContext();

  const categories = ['Todos', 'Futbol 5', 'Futbol 7', 'Padel', 'Futbol 11', 'Tenis', 'Basquet', 'Voley'];
  const [selectedLocation, setSelectedLocation] = useState('Palermo');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [filterConfig, setFilterConfig] = useState({
    roofed: false,
    synthetic: false,
  });
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });
  const [locations, setLocations] = useState<LocationResult[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      if (locationSearch.length < 3) return;
      const results = await searchLocations(locationSearch);
      setLocations(results);
    };

    const timer = setTimeout(fetchLocations, 400);
    return () => clearTimeout(timer);
  }, [locationSearch]);

  const { courts, isLoading } = useCourts({
    category: selectedCategory,
    searchQuery,
    zone: selectedLocation,
    roofed: filterConfig.roofed,
    synthetic: filterConfig.synthetic
  });

  useEffect(() => {
    if (containerRef.current && scrollRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      setDragConstraints({ right: 0, left: -(scrollWidth - containerWidth + 32) });
    }
  }, []);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const city = await reverseGeocode(latitude, longitude);
        if (city) {
          setSelectedLocation(city);
          setIsLocationOpen(false);
        } else {
          alert('No pudimos determinar tu ciudad exacta, probá buscándola manualmente.');
        }
      } catch (error) {
        console.error('Error en geolocalización:', error);
        alert('Error al obtener tu ciudad');
      }
    });
  };

  return (
    <div className="min-h-screen bg-bg text-white pb-20 overflow-x-hidden">
      <Header
        onProfileClick={() => isLoggedIn ? router.push('/perfil') : router.push('/login')}
        isLoggedIn={isLoggedIn}
      />

      <div className="px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black italic uppercase leading-none tracking-tighter">
            GOLAZO
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-1">Encontrá tu cancha</p>
        </div>

        {/* Search & Location Bar */}
        <div className="space-y-4">
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="w-full bg-surface border-2 border-surface-light p-4 rounded-xl flex items-center justify-between group hover:border-brand/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="text-brand w-4 h-4" />
                </div>
                <span className="font-bold text-sm italic uppercase">{selectedLocation}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLocationOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsLocationOpen(false)}
                    className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-surface border-2 border-surface-light rounded-2xl overflow-hidden z-50 shadow-2xl flex flex-col max-h-[350px]"
                  >
                    <div className="p-3 space-y-3 border-b border-surface-light/50">
                      <button
                        onClick={handleUseMyLocation}
                        className="w-full flex items-center gap-2 text-brand font-black italic uppercase text-[10px] tracking-widest p-2 hover:bg-brand/10 rounded-lg transition-colors"
                      >
                        <MapPin className="w-3 h-3" />
                        Usar mi ubicación actual
                      </button>

                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Buscar ciudad (ej: Palermo)..."
                          autoFocus
                          value={locationSearch}
                          onChange={(e) => setLocationSearch(e.target.value)}
                          className="w-full bg-surface-light/30 border-none py-2 pl-9 pr-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand/50 text-white placeholder-gray-500"
                        />
                      </div>
                    </div>

                    <div className="overflow-y-auto custom-scrollbar">
                      {locations.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => {
                            setSelectedLocation(loc.name);
                            setIsLocationOpen(false);
                            setLocationSearch('');
                          }}
                          className={`w-full px-5 py-4 text-left text-sm font-bold transition-colors border-b border-surface-light/50 last:border-0 hover:bg-brand/10 ${selectedLocation === loc.name ? 'text-brand' : 'text-gray-300'}`}
                        >
                          <div className="flex flex-col">
                            <span>{loc.name}</span>
                            <div className="flex items-center gap-1.5 opacity-50">
                              {loc.context && (
                                <span className="text-[8px] uppercase tracking-tighter truncate max-w-[200px]">{loc.context}</span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="¿Dónde querés jugar hoy?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border-2 border-surface-light py-4 px-12 rounded-xl focus:border-brand focus:outline-none transition-colors italic text-xs md:text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 rounded-xl border-2 flex items-center justify-center transition-all ${showFilters ? 'bg-brand border-brand text-bg' : 'bg-surface border-surface-light text-gray-400 hover:border-brand/50 hover:text-brand'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-surface/50 border border-white/5 rounded-2xl p-4 flex gap-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setFilterConfig(prev => ({ ...prev, roofed: !prev.roofed }))}
                      className={`w-10 h-5 rounded-full relative transition-colors ${filterConfig.roofed ? 'bg-brand' : 'bg-surface-light'}`}
                    >
                      <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${filterConfig.roofed ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase italic tracking-widest text-gray-400 group-hover:text-white transition-colors">Techada</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setFilterConfig(prev => ({ ...prev, synthetic: !prev.synthetic }))}
                      className={`w-10 h-5 rounded-full relative transition-colors ${filterConfig.synthetic ? 'bg-brand' : 'bg-surface-light'}`}
                    >
                      <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${filterConfig.synthetic ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase italic tracking-widest text-gray-400 group-hover:text-white transition-colors">Sintético</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories */}
        <div ref={containerRef} className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none">
          <motion.div
            ref={scrollRef}
            drag="x"
            dragConstraints={dragConstraints}
            className="flex gap-3 whitespace-nowrap"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-brand text-bg shadow-[0_0_20px_rgba(0,230,118,0.3)]' : 'bg-surface text-gray-400 hover:bg-surface-light border border-white/5'}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Court Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">
              Canchas <span className="text-brand">Destacadas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                <div className="col-span-full py-20 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-500 font-bold italic animate-pulse">BUSCANDO CANCHAS...</p>
                </div>
              ) : courts.length > 0 ? (
                courts.map((court) => (
                  <CourtCard key={court.id} court={court} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center space-y-4">
                  <p className="text-gray-500 font-bold italic">No encontramos canchas con esos filtros...</p>
                  <Button variant="outline" onClick={() => {
                    setSelectedCategory('Todos');
                    setSearchQuery('');
                    setSelectedLocation('Palermo');
                  }}>
                    LIMPIAR FILTROS
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
