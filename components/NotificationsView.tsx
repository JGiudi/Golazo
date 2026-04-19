
import React, { useState } from 'react';
import { Notification } from '../types';
import { Bell, Info, Shield, AlertTriangle, Check, Trash2, ChevronRight } from 'lucide-react';
import { Button } from './Button';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'invite',
    title: 'Invitación a Partido',
    message: 'Nico te ha convocado para "Fútbol 5 - Champions Night" hoy a las 20:00hs.',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1)),
    isRead: false,
    actionLabel: 'Ver Ficha'
  },
  {
    id: '2',
    type: 'match_alert',
    title: 'Recordatorio de Partido',
    message: 'Faltan 2 horas para tu partido en El Templo. No olvides tus botines.',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    isRead: false
  },
  {
    id: '3',
    type: 'reputation',
    title: 'Reputación Actualizada',
    message: '¡Buena racha! Tu reputación ha subido a 98% (Profesional) por asistencia perfecta este mes.',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    isRead: true
  },
  {
    id: '4',
    type: 'system',
    title: 'Mantenimiento Programado',
    message: 'La app estará en mantenimiento el martes de 03:00 a 05:00 AM.',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
    isRead: true
  }
];

export const NotificationsView: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'invite': return <Bell className="w-5 h-5 text-gold-500" />;
      case 'match_alert': return <AlertTriangle className="w-5 h-5 text-neon-500" />;
      case 'reputation': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'system': return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  const getBorderColor = (type: Notification['type']) => {
    switch (type) {
      case 'invite': return 'border-gold-500/50';
      case 'match_alert': return 'border-neon-500/50';
      case 'reputation': return 'border-blue-500/50';
      default: return 'border-gray-700';
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white tracking-wide uppercase italic leading-none">Alertas Tácticas</h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Centro de Notificaciones</p>
        </div>
        <button 
          onClick={handleMarkAllRead}
          className="text-[10px] font-bold uppercase text-neon-500 hover:text-white transition-colors bg-pitch-900 px-3 py-1 rounded border border-gray-700"
        >
          Marcar todo leídos
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 opacity-50">
            <div className="w-16 h-16 bg-pitch-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-800">
              <Bell className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-white font-bold uppercase">Sin novedades</h3>
            <p className="text-xs text-gray-500">Estás al día con tus alertas.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id}
              className={`relative bg-pitch-900 p-4 rounded-xl border-l-4 shadow-lg group transition-all hover:bg-pitch-800 ${getBorderColor(notif.type)} ${notif.isRead ? 'opacity-70' : 'opacity-100'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-black border border-gray-800`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-display font-bold text-lg uppercase tracking-wide leading-none ${notif.isRead ? 'text-gray-400' : 'text-white'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[9px] font-mono text-gray-600 font-bold ml-2 shrink-0">
                      {notif.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-medium leading-snug mb-3">
                    {notif.message}
                  </p>
                  
                  {notif.actionLabel && (
                    <Button size="sm" variant="secondary" className="text-xs py-1 h-8 uppercase font-bold tracking-wider skew-x-0">
                      {notif.actionLabel} <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
                
                <button 
                  onClick={() => handleDelete(notif.id)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              
              {!notif.isRead && (
                 <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-500 animate-pulse shadow-[0_0_5px_#22c55e]"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
