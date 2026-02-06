import { useEffect, useState } from 'react';
import { Gift, Ticket, Bell, ChevronRight, Sparkles, Trophy, Calendar, Users } from 'lucide-react';
import { useStore } from '@/store';
import type { Sorteo } from '@/types';

interface HomeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { user, sorteos, participaciones, notificaciones } = useStore();
  const [greeting, setGreeting] = useState('');
  
  const sorteosActivos = sorteos.filter(s => s.estado === 'activo');
  const misParticipaciones = participaciones.filter(p => p.userId === user?.id);
  const notificacionesNoLeidas = notificaciones.filter(n => !n.leida && n.userId === user?.id);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  return (
    <div className="min-h-screen w-full pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-pollo-amarillo to-pollo-marron-claro px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-pollo-lg relative overflow-hidden">
        {/* Decorations */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full" />
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-white/10 rounded-full" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/80 text-sm font-medium">{greeting}</p>
              <h1 className="text-2xl font-black text-white">
                {user?.nombre} {user?.apellido}
              </h1>
            </div>
            <button 
              onClick={() => onNavigate('notificaciones')}
              className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Bell className="w-5 h-5 text-white" />
              {notificacionesNoLeidas.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white font-bold flex items-center justify-center">
                  {notificacionesNoLeidas.length}
                </span>
              )}
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Ticket className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-xs">Mis Participaciones</span>
              </div>
              <p className="text-2xl font-black text-white">{misParticipaciones.length}</p>
            </div>
            <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Gift className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-xs">Sorteos Activos</span>
              </div>
              <p className="text-2xl font-black text-white">{sorteosActivos.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Sorteos Activos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-pollo-marron-oscuro">Sorteos Activos</h2>
            <button 
              onClick={() => onNavigate('sorteos')}
              className="text-sm text-pollo-marron font-semibold flex items-center gap-1"
            >
              Ver todos <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {sorteosActivos.slice(0, 2).map((sorteo) => (
              <SorteoCard key={sorteo.id} sorteo={sorteo} onClick={() => onNavigate('sorteo-detail', sorteo)} />
            ))}
          </div>
        </div>

        {/* Próximos Sorteos */}
        <div>
          <h2 className="text-lg font-bold text-pollo-marron-oscuro mb-4">Próximos Sorteos</h2>
          <div className="bg-gradient-to-r from-pollo-marron-claro/20 to-pollo-amarillo/20 rounded-2xl p-5 border border-pollo-marron-claro/30">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pollo-marron-claro to-pollo-dorado rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-pollo-marron-oscuro">Sorteo Día de la Madre</h3>
                <p className="text-sm text-pollo-marron/60">Inicia el 1 de febrero</p>
              </div>
              <Sparkles className="w-5 h-5 text-pollo-dorado" />
            </div>
          </div>
        </div>

        {/* Ganadores Anteriores */}
        <div>
          <h2 className="text-lg font-bold text-pollo-marron-oscuro mb-4">Ganadores Anteriores</h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-pollo-marron-claro/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-pollo-marron-oscuro">Sorteo Fin de Año 2024</p>
                <p className="text-xs text-pollo-marron/60">3 ganadores</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                <span className="w-6 h-6 bg-yellow-500 rounded-full text-xs text-white font-bold flex items-center justify-center">1</span>
                <span className="text-sm font-medium text-pollo-marron-oscuro">María G. - Auto 0km</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="w-6 h-6 bg-gray-400 rounded-full text-xs text-white font-bold flex items-center justify-center">2</span>
                <span className="text-sm font-medium text-pollo-marron-oscuro">Carlos R. - Moto 0km</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
                <span className="w-6 h-6 bg-orange-500 rounded-full text-xs text-white font-bold flex items-center justify-center">3</span>
                <span className="text-sm font-medium text-pollo-marron-oscuro">Ana L. - Voucher $100k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SorteoCard({ sorteo, onClick }: { sorteo: Sorteo; onClick: () => void }) {
  const { verificarParticipacion, user } = useStore();
  const yaParticipa = user ? verificarParticipacion(sorteo.id) : false;
  
  return (
    <div 
      onClick={onClick}
      className="card-pollo cursor-pointer hover:shadow-pollo-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-gradient-to-br from-pollo-amarillo to-pollo-marron-claro rounded-xl flex items-center justify-center flex-shrink-0">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-pollo-marron-oscuro truncate">{sorteo.titulo}</h3>
            {yaParticipa && (
              <span className="badge-pollo flex-shrink-0">Participando</span>
            )}
          </div>
          <p className="text-sm text-pollo-marron/60 line-clamp-2 mt-1">{sorteo.descripcion}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-xs text-pollo-marron/50">
              <Users className="w-3.5 h-3.5" />
              <span>{sorteo.participantes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-pollo-marron/50">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(sorteo.fechaSorteo).toLocaleDateString('es-AR')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
