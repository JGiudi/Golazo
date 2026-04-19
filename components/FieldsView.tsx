
import React, { useState, useEffect } from 'react';
import { Field } from '../types';
import { MapPin, Star, CreditCard, Wind, Shield, Zap, Copy, X, Clock, Calendar, Smartphone, Landmark } from 'lucide-react';
import { Button } from './Button';

const FIELDS: Field[] = [
  {
    id: '1',
    name: 'EL MONUMENTAL',
    location: 'Av. Libertador 1200',
    type: '5v5',
    pricePerHour: 4500,
    rating: 4.8,
    imageUrl: 'https://picsum.photos/400/300?random=3',
    amenities: ['Sintético Caucho', 'Techado', 'Vestuarios Pro']
  },
  {
    id: '2',
    name: 'LA JAULA',
    location: 'Calle Brandsen 805',
    type: '7v7',
    pricePerHour: 6000,
    rating: 4.5,
    imageUrl: 'https://picsum.photos/400/300?random=4',
    amenities: ['Cemento', 'Luz LED', 'Parrilla']
  },
  {
    id: '3',
    name: 'COMPLEJO PRO',
    location: 'Comodoro Rivadavia 1500',
    type: '5v5',
    pricePerHour: 5000,
    rating: 4.2,
    imageUrl: 'https://picsum.photos/400/300?random=5',
    amenities: ['Alfombra', 'Bar', 'Estacionamiento']
  }
];

const HOURS = ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
const PAYMENT_METHODS = [
  { id: 'mp', name: 'Mercado Pago', icon: Smartphone, color: 'text-blue-400', border: 'border-blue-500/50' },
  { id: 'transfer', name: 'Transferencia', icon: Copy, color: 'text-yellow-400', border: 'border-yellow-500/50' },
  { id: 'card', name: 'Tarjeta Débito/Crédito', icon: CreditCard, color: 'text-white', border: 'border-gray-500' },
];

// Helper to generate next 7 days
const getNextDays = () => {
  const days = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      fullDate: d,
      dayName: d.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '').toUpperCase(),
      dayNumber: d.getDate(),
      isToday: i === 0
    });
  }
  return days;
};

interface FieldsViewProps {
  onBook?: (field: Field) => void;
}

export const FieldsView: React.FC<FieldsViewProps> = ({ onBook }) => {
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const nextDays = getNextDays();

  const handleInitiateBooking = (field: Field) => {
    setSelectedField(field);
    setSelectedDay(new Date()); // Reset to today
    setSelectedHour(null);
    setSelectedPayment(null);
  };

  const handleConfirmPayment = () => {
    if (!selectedField || !selectedHour || !selectedPayment) return;
    setIsProcessing(true);
    
    // Simulate external payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      if (onBook) onBook(selectedField);
      setSelectedField(null);
    }, 2500);
  };

  const getSurfaceIcon = (amenity: string) => {
    if (amenity.includes('Sintético')) return <Zap className="w-3 h-3 mr-1 text-neon-500" />;
    if (amenity.includes('Techado')) return <Wind className="w-3 h-3 mr-1 text-blue-400" />;
    return <Shield className="w-3 h-3 mr-1 text-gray-400" />;
  };

  // Check if selected day matches
  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-3xl font-display font-bold text-white tracking-wide uppercase">SEDE DEL PARTIDO</h2>
        <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Seleccionar campo de juego</p>
      </div>
      
      <div className="grid gap-6">
        {FIELDS.map((field) => (
          <div key={field.id} className="bg-pitch-900 border border-gray-800 relative group overflow-hidden">
            {/* Technical header */}
            <div className="bg-black/50 border-b border-gray-800 p-2 flex justify-between items-center backdrop-blur-sm absolute top-0 w-full z-10">
              <div className="flex items-center gap-2">
                 <div className={`px-2 py-0.5 text-[10px] font-bold uppercase skew-x-[-10deg] bg-neon-500 text-black`}>
                   <span className="skew-x-[10deg]">{field.type}</span>
                 </div>
                 <span className="text-[10px] text-gray-400 font-mono">ID: {field.id}02-X</span>
              </div>
              <div className="flex items-center text-neon-400 text-xs font-bold">
                <Star className="w-3 h-3 fill-current mr-1" /> {field.rating}
              </div>
            </div>

            {/* Image Area (Darkened) */}
            <div className="h-48 w-full relative opacity-60 group-hover:opacity-80 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-t from-pitch-900 via-transparent to-black/80 z-0"></div>
              <img src={field.imageUrl} alt={field.name} className="w-full h-full object-cover grayscale contrast-125" />
            </div>
            
            {/* Info Body */}
            <div className="p-4 relative -mt-8 z-10">
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-2xl font-display font-bold text-white uppercase italic tracking-wider leading-none">{field.name}</h3>
              </div>

              <div className="flex items-center text-gray-400 text-xs mb-4 font-bold uppercase tracking-wide border-l-2 border-neon-500 pl-2">
                <MapPin className="w-3 h-3 mr-1" /> {field.location}
              </div>

              {/* Tech Specs Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {field.amenities.map(amenity => (
                  <div key={amenity} className="bg-pitch-950 border border-gray-800 p-2 flex items-center text-[10px] text-gray-300 font-bold uppercase">
                    {getSurfaceIcon(amenity)}
                    {amenity}
                  </div>
                ))}
              </div>
              
              {/* Footer Action */}
              <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-700">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Precio Turno</span>
                  <span className="text-xl font-display font-bold text-white">
                    ${field.pricePerHour}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleInitiateBooking(field)}
                  className="skew-x-[-5deg] rounded-none border-l-4 border-l-neon-500"
                  variant="secondary"
                >
                  <span className="skew-x-[5deg] flex items-center uppercase tracking-widest text-xs">
                    Reservar <CreditCard className="w-3 h-3 ml-2" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Configuration Modal */}
      {selectedField && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-pitch-950 border border-gray-700 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up max-h-[90dvh] overflow-y-auto custom-scrollbar">
            
            {/* Header */}
            <div className="bg-black p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 z-10">
               <div>
                 <h3 className="text-white font-display font-bold text-xl uppercase italic tracking-wide">{selectedField.name}</h3>
                 <div className="flex items-center text-neon-500 text-[10px] font-bold uppercase">
                    <Calendar className="w-3 h-3 mr-1"/> 
                    {selectedDay.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                 </div>
               </div>
               <button onClick={() => setSelectedField(null)} className="text-gray-400 hover:text-white bg-gray-800 p-1 rounded-full"><X className="w-5 h-5"/></button>
            </div>

            <div className="p-5 space-y-6">

               {/* 1. Date Selection */}
               <div className="space-y-2">
                  <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest flex items-center">
                    <Calendar className="w-3 h-3 mr-1"/> Seleccionar Fecha
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {nextDays.map((dayObj) => {
                      const active = isSameDay(selectedDay, dayObj.fullDate);
                      return (
                        <button
                          key={dayObj.dayNumber}
                          onClick={() => setSelectedDay(dayObj.fullDate)}
                          className={`
                            flex flex-col items-center justify-center px-3 py-2 rounded min-w-[60px] transition-all border
                            ${active 
                              ? 'bg-neon-500 text-black border-neon-400 shadow-[0_0_10px_rgba(34,197,94,0.4)]' 
                              : 'bg-pitch-900 text-gray-400 border-gray-700 hover:bg-pitch-800 hover:text-white'
                            }
                          `}
                        >
                          <span className="text-[10px] font-bold uppercase">{dayObj.dayName}</span>
                          <span className="text-lg font-display font-bold leading-none">{dayObj.dayNumber}</span>
                        </button>
                      )
                    })}
                  </div>
               </div>
               
               {/* 2. Time Selection */}
               <div className="space-y-2">
                  <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest flex items-center">
                    <Clock className="w-3 h-3 mr-1"/> Seleccionar Horario
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {HOURS.map((hour, idx) => {
                      // Mock Logic: Some hours taken randomly based on day
                      const isTaken = (idx + selectedDay.getDate()) % 3 === 0; 
                      return (
                        <button
                          key={hour}
                          disabled={isTaken}
                          onClick={() => setSelectedHour(hour)}
                          className={`
                            px-4 py-3 rounded font-mono font-bold text-sm transition-all border min-w-[80px]
                            ${isTaken 
                              ? 'bg-gray-900 text-gray-700 border-gray-800 cursor-not-allowed decoration-slice line-through' 
                              : selectedHour === hour 
                                ? 'bg-neon-500 text-black border-neon-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' 
                                : 'bg-pitch-900 text-white border-gray-700 hover:border-gray-500'
                            }
                          `}
                        >
                          {hour}
                        </button>
                      )
                    })}
                  </div>
               </div>

               {/* 3. Price Breakdown */}
               <div className="bg-gray-900/50 p-4 rounded border border-gray-800 space-y-3">
                  <div className="flex justify-between items-center">
                     <span className="text-gray-400 text-xs font-bold uppercase">Precio Cancha</span>
                     <span className="text-white font-mono font-bold">${selectedField.pricePerHour}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-neon-500 text-xs font-bold uppercase">Seña Requerida (50%)</span>
                     <span className="text-neon-500 font-mono font-bold">${selectedField.pricePerHour / 2}</span>
                  </div>
                  <div className="h-px bg-gray-800 w-full my-1"></div>
                  <div className="flex justify-between items-end">
                     <span className="text-white text-sm font-display font-bold uppercase tracking-wide">Total a Pagar Ahora</span>
                     <span className="text-2xl font-display font-bold text-white leading-none">${selectedField.pricePerHour / 2}</span>
                  </div>
               </div>

               {/* 4. Payment Method */}
               <div className="space-y-2">
                  <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest flex items-center">
                    <Landmark className="w-3 h-3 mr-1"/> Método de Pago
                  </label>
                  <div className="grid gap-2">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`
                          flex items-center justify-between p-3 rounded border transition-all
                          ${selectedPayment === method.id 
                            ? `bg-pitch-800 ${method.border} shadow-lg` 
                            : 'bg-pitch-900 border-gray-800 hover:border-gray-600'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <method.icon className={`w-5 h-5 ${method.color}`} />
                          <span className="text-xs font-bold uppercase text-white">{method.name}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPayment === method.id ? 'border-neon-500' : 'border-gray-600'}`}>
                           {selectedPayment === method.id && <div className="w-2 h-2 bg-neon-500 rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>
               </div>
               
               {/* Action Button */}
               <Button 
                 onClick={handleConfirmPayment} 
                 isLoading={isProcessing}
                 disabled={!selectedHour || !selectedPayment}
                 className="w-full uppercase font-bold tracking-widest skew-x-[-2deg] py-4 text-lg shadow-lg"
               >
                 <span className="skew-x-[2deg] flex items-center justify-center">
                   {isProcessing ? 'Procesando Pago...' : 'Pagar Seña y Reservar'}
                 </span>
               </Button>
               
               <p className="text-[9px] text-center text-gray-500 font-mono uppercase">
                 Al confirmar serás redirigido para completar la transacción.
               </p>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};
