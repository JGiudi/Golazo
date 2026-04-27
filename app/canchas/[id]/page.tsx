'use client';

import { ArrowLeft, Share2, MapPin, Calendar, Clock, CreditCard, ChevronRight, Wind, Shield, Users as UsersIcon, Car, Coffee, Utensils, Wifi, Smartphone, Banknote, ShieldCheck, Zap } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Header from '@/components/shared/Header';
import { useAppContext } from '@/lib/context';

export default function CourtDetailPage() {
  const router = useRouter();
  const { setHasReservation, reservationData, setReservationData, isLoggedIn } = useAppContext();
  
  // Step 1: Detail, Step 2: Review
  const [step, setStep] = useState<1 | 2>(1);

  // Court Detail State
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedTime, setSelectedTime] = useState('21:00');
  const [isSplitPayment, setIsSplitPayment] = useState(false);
  const [splitCount, setSplitCount] = useState(10);
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });
  const [activeImage, setActiveImage] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const gallery = [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518605336397-90db35f59991?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544698310-74ea2d1ef84b?q=80&w=1200&auto=format&fit=crop',
  ];

  const amenities = [
    { icon: Wind, label: 'Techada' },
    { icon: UsersIcon, label: 'Vestuarios' },
    { icon: Car, label: 'Parking' },
    { icon: Coffee, label: 'Buffet' },
    { icon: Wifi, label: 'Wi-Fi' },
    { icon: Utensils, label: 'Parrilla' },
  ];

  const paymentMethods = [
    { icon: Banknote, label: 'Efectivo en cancha', color: 'text-green-500' },
    { icon: Smartphone, label: 'Mercado Pago (Link)', color: 'text-blue-500' },
    { icon: ShieldCheck, label: 'Transferencia', color: 'text-brand' },
  ];

  const days = [
    { label: 'HOY', day: 14, month: 'OCT' },
    { label: 'MAR', day: 15, month: 'OCT' },
    { label: 'MIE', day: 16, month: 'OCT' },
    { label: 'JUE', day: 17, month: 'OCT' },
    { label: 'VIE', day: 18, month: 'OCT' },
    { label: 'SAB', day: 19, month: 'OCT' },
  ];

  const times = [
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  useEffect(() => {
    if (step === 1 && containerRef.current && scrollRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      setDragConstraints({ right: 0, left: -(scrollWidth - containerWidth) });
    }
  }, [step]);

  const handleReserveClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    setReservationData({ isSplit: isSplitPayment, splitCount });
    setStep(2);
  };

  const handleConfirmReservation = () => {
    setHasReservation(true);
    router.push('/reservas/confirmacion');
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-bg text-white pb-40 md:pb-12">
        <Header 
          variant="back" 
          onBack={() => router.back()} 
          onProfileClick={() => router.push('/perfil')} 
          title="DETALLE" 
          isLoggedIn={isLoggedIn}
        />

        <div className="md:grid md:grid-cols-2 md:gap-12 md:px-12 mt-2">
          {/* Left Column (Desktop) */}
          <div className="space-y-8">
            {/* Hero Gallery */}
            <div className="relative h-[45vh] w-full overflow-hidden px-4 md:px-0">
              <div className="h-full w-full rounded-[32px] overflow-hidden relative shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    src={gallery[activeImage]} 
                    alt="Cancha" 
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
                
                {/* Gallery Indicators */}
                <div className="absolute bottom-6 right-6 flex gap-1.5 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10">
                  {gallery.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? 'bg-brand w-4' : 'bg-white/40'}`}
                    />
                  ))}
                </div>

                <button className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform">
                  <Share2 className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-brand/20 border border-brand/40 px-2.5 py-0.5 rounded text-[9px] font-black text-brand uppercase tracking-widest">
                      FUTBOL 5
                    </span>
                    <span className="text-accent-yellow font-black text-[10px] uppercase tracking-widest">
                      $12.500 / HORA
                    </span>
                  </div>
                  <h2 className="text-3xl font-black uppercase leading-none tracking-tighter italic">
                    LA CANCHA<br />
                    DE PALERMO
                  </h2>
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5 text-brand" />
                    Serrano 3501, Palermo
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 md:px-0 space-y-8">
              {/* Amenities Grid */}
              <div className="flex flex-wrap gap-4 pb-2">
                {amenities.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 shrink-0 w-[calc(33%-1rem)] md:w-auto">
                    <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center border border-white/5">
                        <item.icon className="w-5 h-5 text-brand" />
                    </div>
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">UBICACIÓN</h3>
                <div className="h-40 bg-surface border border-white/5 rounded-3xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                      className="w-full h-full object-cover opacity-50"
                      alt="Map"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,230,118,0.5)] border-4 border-bg">
                          <MapPin className="text-bg w-6 h-6" />
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop) */}
          <div className="p-6 md:p-0 space-y-8 px-4 md:px-0 md:sticky md:top-8">
            {/* Date Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">FECHA</h3>
                <span className="text-[8px] text-brand font-bold uppercase tracking-widest">Octubre 2024</span>
              </div>
              <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
                <motion.div 
                  ref={scrollRef}
                  drag="x"
                  dragConstraints={dragConstraints}
                  className="flex gap-2.5 w-max"
                >
                  {days.map((item) => (
                    <button
                      key={item.day}
                      onClick={() => setSelectedDay(item.day)}
                      className={`flex-shrink-0 w-16 flex flex-col items-center justify-center py-3 rounded-2xl border transition-all ${
                        selectedDay === item.day 
                          ? 'bg-brand border-brand text-bg shadow-[0_10px_20px_rgba(0,230,118,0.2)]' 
                          : 'bg-surface border-white/5 text-gray-500 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="text-[8px] font-black uppercase mb-1">{item.label}</span>
                      <span className="text-xl font-black italic">{item.day}</span>
                    </button>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">HORARIOS DISPONIBLES</h3>
              <div className="grid grid-cols-3 gap-2.5">
                {times.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-3.5 rounded-xl text-[10px] font-black transition-all border ${
                      selectedTime === t 
                        ? 'bg-accent-yellow border-accent-yellow text-bg' 
                        : 'bg-surface border-white/5 text-gray-500 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {t} HS
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Methods Info */}
            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">MÉTODOS DE PAGO</h3>
               <div className="bg-surface border border-white/5 rounded-3xl p-5 space-y-4">
                  {paymentMethods.map((pm, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                       <div className="w-10 h-10 bg-surface-light rounded-xl flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors">
                          <pm.icon className={`w-5 h-5 ${pm.color}`} />
                       </div>
                       <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{pm.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Split Payment */}
            <div className="bg-linear-to-br from-surface to-bg border border-white/5 rounded-3xl p-5 relative overflow-hidden group">
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-brand" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black uppercase tracking-widest">DIVIDIR PAGO</h4>
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Automatico para el equipo</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsSplitPayment(!isSplitPayment)}
                    className={`w-12 h-6 rounded-full border transition-all relative flex items-center px-1 ${
                      isSplitPayment ? 'bg-brand border-brand' : 'bg-surface-light border-white/10'
                    }`}
                  >
                    <motion.div 
                      layout
                      className={`w-4 h-4 bg-white rounded-full ${isSplitPayment ? 'ml-auto' : ''}`} 
                    />
                  </button>
                </div>

                {isSplitPayment && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="pt-4 border-t border-white/5 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">JUGADORES</p>
                      <p className="text-[10px] font-bold text-white uppercase italic">Incluyéndote</p>
                    </div>
                    <div className="flex items-center gap-4 bg-surface-light px-4 py-2 rounded-xl">
                      <button onClick={() => setSplitCount(Math.max(2, splitCount - 1))} className="text-brand font-black text-lg">-</button>
                      <span className="text-sm font-black italic w-6 text-center">{splitCount}</span>
                      <button onClick={() => setSplitCount(Math.min(22, splitCount + 1))} className="text-brand font-black text-lg">+</button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Desktop Sticky Button Placeholder */}
            <div className="hidden md:block">
              <Button 
                fullWidth 
                onClick={handleReserveClick} 
                className="h-16 shadow-[0_10px_30px_rgba(0,230,118,0.3)] text-sm" 
                icon={<ChevronRight className="w-5 h-5" />}
              >
                CONFIRMAR Y RESERVAR
              </Button>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Footer (Mobile Only) */}
        <div className="fixed md:hidden bottom-0 left-0 right-0 p-4 bg-bg/80 backdrop-blur-xl border-t border-white/5 z-50">
          <div className="max-w-md mx-auto">
            <Button 
              fullWidth 
              onClick={handleReserveClick} 
              className="h-14 shadow-[0_10px_30px_rgba(0,230,118,0.3)]" 
              icon={<ChevronRight className="w-5 h-5" />}
            >
              CONFIRMAR Y RESERVAR
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Review Reservation
  return (
    <div className="min-h-screen bg-bg text-white pb-32">
      <Header variant="back" onBack={() => setStep(1)} title="REVISAR RESERVA" />

      <div className="px-6 md:px-12 space-y-8 mt-6">
        {/* Status Header */}
        <div className="text-center space-y-2">
           <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-brand">¡CASI LISTO!</h2>
           <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">Revisá los detalles antes de pagar</p>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-12 items-start max-w-5xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Venue Hero Card */}
            <div className="relative h-[30vh] w-full overflow-hidden rounded-[40px] shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop" 
                alt="Venue" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
              <div className="absolute top-6 left-6 bg-accent-yellow text-bg text-[10px] font-black px-3 py-1 rounded">
                FÚTBOL 5
              </div>
              <div className="absolute bottom-6 left-8 space-y-2">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">LA CANCHA DE PALERMO</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                  <MapPin className="w-4 h-4 text-brand" />
                  Palermo, CABA
                </div>
              </div>
            </div>

            {/* Date Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface/50 border border-surface-light rounded-3xl p-6 flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-brand" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">FECHA</p>
                    <p className="text-sm font-bold">Hoy, {selectedDay} de Oct</p>
                  </div>
              </div>
              <div className="bg-surface/50 border border-surface-light rounded-3xl p-6 flex items-center gap-4">
                  <Clock className="w-5 h-5 text-brand" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">HORARIO</p>
                    <p className="text-sm font-bold">{selectedTime}</p>
                  </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8 mt-8 md:mt-0 md:bg-surface/30 md:p-8 md:rounded-[40px] md:border md:border-white/5">
            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">DETALLE DEL PAGO</h3>
              <div className="bg-surface border border-surface-light rounded-[32px] p-8 space-y-6">
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="text-sm font-bold">Cancha</span>
                    <span className="text-sm font-black italic">$12.000</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="text-sm font-bold">Servicio</span>
                    <span className="text-sm font-black italic">$500</span>
                  </div>
                  <div className="pt-6 border-t border-surface-light/50 flex justify-between items-end">
                    <span className="text-lg font-black italic tracking-tighter uppercase">TOTAL A PAGAR</span>
                    <span className="text-4xl font-black italic tracking-tighter text-brand shadow-[0_0_20px_rgba(0,230,118,0.2)]">
                      $12.500
                    </span>
                  </div>

                  {reservationData.isSplit && (
                    <div className="mt-6 bg-brand/5 border border-brand/20 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <Zap className="w-4 h-4 text-brand fill-brand" />
                          <span className="text-xs font-bold text-brand uppercase tracking-widest italic">Pago dividido ({reservationData.splitCount} personas)</span>
                      </div>
                      <span className="text-xs font-black italic">${(12500 / reservationData.splitCount).toFixed(0)} c/u</span>
                    </div>
                  )}
              </div>
            </div>

            {/* Payment Methods Placeholder */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">MÉTODO DE PAGO</h3>
              <div className="bg-surface/30 border border-surface-light/50 border-dashed rounded-2xl p-6 text-center">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Tarjeta vinculada: **** 4421</p>
              </div>
            </div>

            {/* Desktop Button Placeholder */}
            <div className="hidden md:flex flex-col gap-4 mt-8">
              <Button 
                fullWidth 
                onClick={handleConfirmReservation} 
                className="h-16 shadow-[0_0_30px_rgba(0,230,118,0.3)] text-sm" 
                icon={<ChevronRight className="w-5 h-5" />}
              >
                PAGAR Y CONFIRMAR
              </Button>
              <p className="text-[9px] text-center font-bold text-gray-600 uppercase tracking-[0.2em]">TRANSACCIÓN SEGURA ENCRIPTADA POR SSL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Fixed Button (Mobile Only) */}
      <div className="fixed md:hidden bottom-0 left-0 right-0 p-6 bg-bg/80 backdrop-blur-xl border-t border-surface-light/30 z-30 flex flex-col items-center gap-4">
        <Button 
          fullWidth 
          onClick={handleConfirmReservation} 
          className="h-16 shadow-[0_0_30px_rgba(0,230,118,0.3)]" 
          icon={<ChevronRight className="w-5 h-5" />}
        >
          PAGAR Y CONFIRMAR
        </Button>
        <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em]">TRANSACCIÓN SEGURA ENCRIPTADA POR SSL</p>
      </div>
    </div>
  );
}
