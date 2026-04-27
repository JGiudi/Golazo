'use client';

import { MapPin, Search, Trophy, Map as MapIcon, ChevronDown, CloudRain, SlidersHorizontal, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Header from '@/components/shared/Header';
import { useAppContext } from '@/lib/context';

export default function PlayerHomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAppContext();
  const isSearchBlocked = !isLoggedIn;

  const categories = ['Todos', 'Futbol 5', 'Futbol 7', 'Padel', 'Futbol 11', 'Tenis', 'Basquet', 'Voley'];
  const [selectedLocation, setSelectedLocation] = useState('Palermo, Buenos Aires');
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
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const locations = [
    'Palermo, Buenos Aires',
    'San Isidro, Buenos Aires',
    'Beccar, Buenos Aires',
    'Vicente Lopez, Buenos Aires',
    'Olivos, Buenos Aires',
    'Martínez, Buenos Aires',
    'Belgrano, CABA',
    'Recoleta, CABA'
  ];

  const allCourts = [
    {
      id: 1,
      name: 'LA CANCHA DE PALERMO',
      price: '$12.500',
      distance: '2.4 km',
      type: 'Futbol 5',
      category: 'Futbol 5',
      location: 'Palermo, Buenos Aires',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
      turnsToday: 3,
      isRoofed: true,
      isSynthetic: true
    },
    {
      id: 2,
      name: 'STADIUM BECCAR',
      price: '$15.000',
      distance: '1.2 km',
      type: 'Futbol 7',
      category: 'Futbol 7',
      location: 'Beccar, Buenos Aires',
      image: 'https://images.unsplash.com/photo-1544698310-74ea2d1ef84b?q=80&w=800&auto=format&fit=crop',
      turnsToday: 5,
      isRoofed: false,
      isSynthetic: true
    },
    {
      id: 3,
      name: 'PADEL HUB PRO',
      price: '$18.000',
      distance: '0.8 km',
      type: 'Padel',
      category: 'Padel',
      location: 'San Isidro, Buenos Aires',
      image: 'https://images.unsplash.com/photo-1626225963770-856bb89371d9?q=80&w=800&auto=format&fit=crop',
      turnsToday: 2,
      isRoofed: true,
      isSynthetic: false
    },
    {
      id: 4,
      name: 'SAN ISIDRO FOOTBALL',
      price: '$10.000',
      distance: '4.5 km',
      type: 'Futbol 5',
      category: 'Futbol 5',
      location: 'San Isidro, Buenos Aires',
      image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop',
      turnsToday: 4,
      isRoofed: false,
      isSynthetic: true
    }
  ];

  const filteredLocations = locations.filter(loc => 
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredCourts = allCourts.filter(court => {
    const matchesLocation = court.location === selectedLocation;
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         court.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || court.category === selectedCategory;
    const matchesRoofed = !filterConfig.roofed || court.isRoofed;
    const matchesSynthetic = !filterConfig.synthetic || court.isSynthetic;
    
    return matchesLocation && matchesSearch && matchesCategory && matchesRoofed && matchesSynthetic;
  });

  useEffect(() => {
    if (containerRef.current && scrollRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      setDragConstraints({ right: 0, left: -(scrollWidth - containerWidth + 32) });
    }
  }, []);
  
  return (
    <div className="space-y-8">
      <Header 
        onProfileClick={() => isLoggedIn ? router.push('/perfil') : router.push('/login')} 
        isLoggedIn={isLoggedIn} 
      />

      <div className="space-y-4 relative">
        {/* Block Overlay for non-logged users */}
        {isSearchBlocked && (
          <div 
            className="absolute inset-0 z-50 cursor-pointer" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push('/login');
            }}
          />
        )}
        
        {/* Location Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsLocationOpen(!isLocationOpen);
              if (!isLocationOpen) setLocationSearch('');
            }}
            className="w-full bg-surface-light/30 p-4 rounded-xl flex items-center justify-between group hover:bg-surface-light/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapPin className="text-brand w-5 h-5" />
              <span className="text-sm font-bold text-gray-200">{selectedLocation}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isLocationOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsLocationOpen(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-surface border-2 border-surface-light rounded-2xl overflow-hidden z-50 shadow-2xl flex flex-col max-h-[300px]"
                >
                  <div className="p-3 border-b border-surface-light/50">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <input 
                        type="text"
                        placeholder="Buscar zona..."
                        autoFocus
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        className="w-full bg-surface-light/30 border-none py-2 pl-9 pr-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand/50 text-white placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-y-auto custom-scrollbar">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setSelectedLocation(loc);
                            setIsLocationOpen(false);
                          }}
                          className={`w-full px-5 py-4 text-left text-sm font-bold transition-colors border-b border-surface-light/50 last:border-0 hover:bg-brand/10 ${selectedLocation === loc ? 'text-brand' : 'text-gray-300'}`}
                        >
                          {loc}
                        </button>
                      ))
                    ) : (
                      <div className="px-5 py-8 text-center text-gray-500 text-sm italic">
                        No se encontraron zonas...
                      </div>
                    )}
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

        {/* Filter Quick Tags */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 pt-1">
                 <button 
                   onClick={() => setFilterConfig({...filterConfig, roofed: !filterConfig.roofed})}
                   className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${filterConfig.roofed ? 'bg-brand/10 border-brand text-brand' : 'bg-surface/50 border-surface-light text-gray-500'}`}
                 >
                    <CloudRain className="w-3 h-3" />
                    TECHADAS
                 </button>
                 <button 
                   onClick={() => setFilterConfig({...filterConfig, synthetic: !filterConfig.synthetic})}
                   className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${filterConfig.synthetic ? 'bg-brand/10 border-brand text-brand' : 'bg-surface/50 border-surface-light text-gray-500'}`}
                 >
                    SINTÉTICO
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Categories with Drag */}
      <div className="-mx-6">
        <div className="relative px-6">
          {isSearchBlocked && (
            <div 
              className="absolute inset-0 z-50 cursor-pointer" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push('/login');
              }}
            />
          )}
          <div ref={containerRef} className="overflow-hidden pb-1 cursor-grab active:cursor-grabbing">
            <motion.div 
              ref={scrollRef}
              drag="x"
              dragConstraints={dragConstraints}
              dragElastic={0.1}
              className="flex gap-2 w-max"
            >
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${selectedCategory === cat ? 'bg-brand text-bg' : 'bg-surface text-gray-500 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black italic uppercase leading-none tracking-tighter">CANCHAS</h2>
          <h2 className="text-3xl font-black italic uppercase text-brand leading-none tracking-tighter">
            {searchQuery || selectedCategory !== 'Todos' ? 'ENCONTRADAS' : 'DESTACADAS'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCourts.length > 0 ? (
              filteredCourts.map((court) => (
                <motion.div 
                  key={court.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-surface rounded-3xl overflow-hidden shadow-2xl group flex flex-col border border-white/5"
                >
                  <div className="cursor-pointer" onClick={() => router.push(`/canchas/${court.id}`)}>
                    <div className="relative aspect-4/3 overflow-hidden">
                      <img 
                        src={court.image} 
                        alt={court.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-accent-yellow text-bg text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-tighter">
                         {court.turnsToday} Turnos hoy
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent opacity-60" />
                    </div>
                    
                    <div className="p-5 pb-0 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="text-lg font-black italic uppercase leading-tight tracking-tight">{court.name}</h3>
                          <div className="flex gap-3">
                            <div className="flex items-center gap-1 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                              <Trophy className="w-2.5 h-2.5" />
                              {court.type}
                            </div>
                            <div className="flex items-center gap-1 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                              <MapIcon className="w-2.5 h-2.5" />
                              {court.distance}
                            </div>
                          </div>
                        </div>
                        <div className="text-xl font-black text-brand italic tracking-tighter">
                          {court.price}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <Button fullWidth onClick={() => router.push(`/canchas/${court.id}`)} className="h-12 text-[10px]">
                      RESERVAR AHORA
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4">
                <p className="text-gray-500 font-bold italic text-sm">No encontramos canchas con esos filtros...</p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}>
                  LIMPIAR FILTROS
                </Button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Promo Card - only show if not logged in */}
      {!isLoggedIn && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface rounded-3xl p-8 space-y-6 relative overflow-hidden"
        >
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-brand/10 blur-3xl rounded-full" />
          
          <div className="space-y-1 relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tight">TU PROXIMO PARTIDO</h2>
            <h2 className="text-3xl font-black uppercase text-brand tracking-tight">EMPIEZA ACÁ</h2>
          </div>
          
          <p className="text-gray-400 font-medium leading-relaxed max-w-[80%] relative z-10">
            Unite a la comunidad deportiva mas grande.
            Reservá canchas, armá partidos y medí tu rendimiento
          </p>
          
          <div className="flex flex-col items-center gap-4 pt-4 relative z-10">
            <Button onClick={() => router.push('/registro')} className="w-full">
              Crear cuenta gratis
            </Button>
            <button 
              onClick={() => router.push('/login')}
              className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-brand transition-colors underline underline-offset-4 decoration-surface-light"
            >
              Ya tengo cuenta, ingresar
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
