import { useState } from 'react';
import { ArrowLeft, Bell, Gift, Trophy, AlertCircle, Info } from 'lucide-react';
import { useStore } from '@/store';

interface NotificacionesScreenProps {
  onBack: () => void;
  onSelectSorteo: (sorteo: any) => void;
}

export function NotificacionesScreen({ onBack, onSelectSorteo }: NotificacionesScreenProps) {
  const { user, notificaciones, marcarNotificacionLeida, sorteos } = useStore();
  const [filter, setFilter] = useState<'todas' | 'no-leidas'>('todas');

  const misNotificaciones = notificaciones
    .filter(n => n.userId === user?.id)
    .filter(n => filter === 'todas' || !n.leida)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'confirmacion': return <Gift className="w-5 h-5 text-green-600" />;
      case 'ganador': return <Trophy className="w-5 h-5 text-yellow-600" />;
      case 'recordatorio': return <AlertCircle className="w-5 h-5 text-blue-600" />;
      default: return <Info className="w-5 h-5 text-pollo-marron" />;
    }
  };

  const getBgColor = (tipo: string) => {
    switch (tipo) {
      case 'confirmacion': return 'bg-green-100';
      case 'ganador': return 'bg-yellow-100';
      case 'recordatorio': return 'bg-blue-100';
      default: return 'bg-pollo-amarillo/20';
    }
  };

  const handleNotificationClick = (notificacion: any) => {
    if (!notificacion.leida) {
      marcarNotificacionLeida(notificacion.id);
    }
    if (notificacion.sorteoId) {
      const sorteo = sorteos.find(s => s.id === notificacion.sorteoId);
      if (sorteo) {
        onSelectSorteo(sorteo);
      }
    }
  };

  return (
    <div className="min-h-screen w-full pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-pollo-amarillo to-pollo-marron-claro px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-pollo-lg relative overflow-hidden">
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full" />
        
        <div className="relative z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          <h1 className="text-2xl font-black text-white mb-2">Notificaciones</h1>
          <p className="text-white/80 text-sm">
            {misNotificaciones.filter(n => !n.leida).length} sin leer
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(['todas', 'no-leidas'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-pollo-amarillo to-pollo-marron-claro text-white shadow-md'
                  : 'bg-white/60 text-pollo-marron border border-pollo-marron-claro/30'
              }`}
            >
              {f === 'todas' ? 'Todas' : 'Sin leer'}
            </button>
          ))}
        </div>

        {/* Notificaciones List */}
        <div className="space-y-3">
          {misNotificaciones.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-pollo-marron-claro/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-pollo-marron/40" />
              </div>
              <p className="text-pollo-marron/60">No tenés notificaciones</p>
            </div>
          ) : (
            misNotificaciones.map((notificacion) => (
              <div 
                key={notificacion.id}
                onClick={() => handleNotificationClick(notificacion)}
                className={`p-4 rounded-2xl cursor-pointer transition-all hover:shadow-md ${
                  notificacion.leida 
                    ? 'bg-white/40 border border-pollo-marron-claro/10' 
                    : 'bg-white/80 border border-pollo-amarillo/30 shadow-sm'
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 ${getBgColor(notificacion.tipo)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {getIcon(notificacion.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-bold text-pollo-marron-oscuro ${!notificacion.leida ? 'text-base' : 'text-sm'}`}>
                        {notificacion.titulo}
                      </h3>
                      {!notificacion.leida && (
                        <span className="w-2.5 h-2.5 bg-pollo-amarillo rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-sm text-pollo-marron/70 mt-1 leading-relaxed">
                      {notificacion.mensaje}
                    </p>
                    <p className="text-xs text-pollo-marron/40 mt-2">
                      {new Date(notificacion.fecha).toLocaleDateString('es-AR', { 
                        day: 'numeric', 
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
