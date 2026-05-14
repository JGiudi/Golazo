'use client';

import { MapPin, Search, Trophy, Map as MapIcon, ChevronDown, SlidersHorizontal, ChevronLeft, Calendar, Clock, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Header from '@/components/shared/Header';
import CourtCard from '@/components/shared/CourtCard';
import { useCourts } from '@/hooks/useCourts';
import { searchLocations, reverseGeocode, LocationResult } from '@/lib/location';

export default function BuscarPage() {
  const router = useRouter();

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
  const [locations, setLocations] = useState<LocationResult[]>([]);

  const categories = ['Todos', 'Futbol 5', 'Futbol 7', 'Padel', 'Futbol 11', 'Tenis', 'Basquet', 'Voley'];

  // Búsqueda dinámica en API de Ubicaciones
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

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const city = await reverseGeocode(latitude, longitude);
      if (city) {
        setSelectedLocation(city);
        setIsLocationOpen(false);
      }
    });
  };

  return (
    <div className="min-h-screen bg-bg text-white pb-20">
      <div className="px-6 py-6 sticky top-0 bg-bg/80 backdrop-blur-xl z-30 border-b border-white/5">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="w-10 h-10 bg-surface border border-white/5 rounded-xl flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-black italic uppercase tracking-tighter">Buscar Canchas</h1>
        </div>

        <div className="space-y-4">
          {/* Location Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="w-full bg-surface border-2 border-surface-light p-3.5 rounded-xl flex items-center justify-between group hover:border-brand/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <MapPin className="text-brand w-4 h-4" />
                <span className="font-bold text-xs italic uppercase">{selectedLocation}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
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
                          placeholder="Buscar ciudad..."
                          autoFocus
                          value={locationSearch}
                          onChange={(e) => setLocationSearch(e.target.value)}
                          className="w-full bg-surface-light/30 border-none py-2 pl-9 pr-4 rounded-lg text-sm focus:outline-none text-white"
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto">
                      <button
                        onClick={() => {
                          setSelectedLocation('Todas');
                          setIsLocationOpen(false);
                        }}
                        className={`w-full px-5 py-4 text-left text-sm font-bold transition-colors border-b border-surface-light/50 last:border-0 hover:bg-brand/10 ${selectedLocation === 'Todas' ? 'text-brand' : 'text-gray-300'}`}
                      >
                        TODAS LAS UBICACIONES
                      </button>
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
                placeholder="Nombre de la cancha o club..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border-2 border-surface-light py-4 px-12 rounded-xl focus:border-brand focus:outline-none transition-colors italic text-sm"
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
      </div>

      <div className="px-6 py-8 space-y-8">
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-brand text-bg shadow-[0_0_20px_rgba(0,230,118,0.3)]' : 'bg-surface text-gray-400 hover:bg-surface-light border border-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="col-span-full py-20 flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 font-bold italic animate-pulse tracking-widest text-xs">BUSCANDO CANCHAS...</p>
              </div>
            ) : courts.length > 0 ? (
              courts.map((court) => (
                <CourtCard key={court.id} court={court} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-surface border border-white/5 rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
                  <Search className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 font-bold italic uppercase tracking-tighter">No encontramos canchas</p>
                  <Button variant="outline" onClick={() => {
                    setSelectedCategory('Todos');
                    setSearchQuery('');
                    setSelectedLocation('Todas');
                    setFilterConfig({ roofed: false, synthetic: false });
                  }}>
                    LIMPIAR BÚSQUEDA
                  </Button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
