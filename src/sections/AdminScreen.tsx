import { ArrowLeft, Users, Gift, TrendingUp, Calendar, Check, Play, AlertCircle, Sparkles, Plus, Trophy, BarChart3 } from 'lucide-react';
import { useStore } from '@/store';
import type { Sorteo } from '@/types';

interface AdminScreenProps {
  onBack: () => void;
  onSelectSorteo: (sorteo: Sorteo) => void;
  onCrearSorteo: () => void;
  onVerGanadores: () => void;
  onVerEstadisticas: () => void;
}

export function AdminScreen({ onBack, onSelectSorteo, onCrearSorteo, onVerGanadores, onVerEstadisticas }: AdminScreenProps) {
  const { sorteos, participaciones, ganadores, user } = useStore();

  // Verificar si es admin
  const esAdmin = user?.email === 'admin@hiperdelpollo.com';

  const stats = {
    totalSorteos: sorteos.length,
    sorteosActivos: sorteos.filter(s => s.estado === 'activo').length,
    totalParticipaciones: participaciones.length,
    totalGanadores: ganadores.length,
    totalParticipantes: new Set(participaciones.map(p => p.userId)).size
  };

  const sorteosParaSortear = sorteos.filter(s => 
    s.estado === 'activo' && 
    participaciones.filter(p => p.sorteoId === s.id).length >= 3
  );

  if (!esAdmin) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-pollo-marron-oscuro mb-2">Acceso denegado</h2>
          <p className="text-pollo-marron/60 mb-6">No tenés permisos para acceder al panel de administración.</p>
          <button onClick={onBack} className="btn-primary">
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-pollo-marron to-pollo-marron-oscuro px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-pollo-lg relative overflow-hidden">
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full" />
        
        <div className="relative z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Panel Admin</h1>
              <p className="text-white/80 text-sm">Gestión de sorteos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-pollo-marron-claro/20">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-pollo-amarillo" />
              <span className="text-xs text-pollo-marron/60">Total Sorteos</span>
            </div>
            <p className="text-2xl font-black text-pollo-marron-oscuro">{stats.totalSorteos}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-pollo-marron-claro/20">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-xs text-pollo-marron/60">Activos</span>
            </div>
            <p className="text-2xl font-black text-pollo-marron-oscuro">{stats.sorteosActivos}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-pollo-marron-claro/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-pollo-dorado" />
              <span className="text-xs text-pollo-marron/60">Participaciones</span>
            </div>
            <p className="text-2xl font-black text-pollo-marron-oscuro">{stats.totalParticipaciones}</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-pollo-marron-claro/20">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-pollo-marron-claro" />
              <span className="text-xs text-pollo-marron/60">Participantes</span>
            </div>
            <p className="text-2xl font-black text-pollo-marron-oscuro">{stats.totalParticipantes}</p>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div>
          <h2 className="text-lg font-bold text-pollo-marron-oscuro mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={onCrearSorteo}
              className="p-4 bg-gradient-to-br from-pollo-amarillo to-pollo-amarillo/80 rounded-2xl text-white flex flex-col items-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-center">Crear Sorteo</span>
            </button>
            
            <button
              onClick={onVerGanadores}
              className="p-4 bg-gradient-to-br from-pollo-marron-claro to-pollo-dorado rounded-2xl text-white flex flex-col items-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-center">Ver Ganadores</span>
            </button>
            
            <button
              onClick={onVerEstadisticas}
              className="p-4 bg-gradient-to-br from-pollo-marron to-pollo-marron-oscuro rounded-2xl text-white flex flex-col items-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-center">Estadísticas</span>
            </button>
          </div>
        </div>

        {/* Sorteos para sortear */}
        <div>
          <h2 className="text-lg font-bold text-pollo-marron-oscuro mb-4">Sorteos listos para realizar</h2>
          
          {sorteosParaSortear.length === 0 ? (
            <div className="p-6 bg-white/40 rounded-2xl border border-pollo-marron-claro/20 text-center">
              <div className="w-16 h-16 bg-pollo-marron-claro/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-7 h-7 text-pollo-marron/40" />
              </div>
              <p className="text-pollo-marron/60">No hay sorteos listos para realizar</p>
              <p className="text-sm text-pollo-marron/40 mt-1">Necesitan al menos 3 participantes</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sorteosParaSortear.map((sorteo) => {
                const participantesCount = participaciones.filter(p => p.sorteoId === sorteo.id).length;
                
                return (
                  <div 
                    key={sorteo.id}
                    onClick={() => onSelectSorteo(sorteo)}
                    className="card-premium cursor-pointer hover:shadow-floating transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        Listo para sortear
                      </span>
                      <div className="flex items-center gap-1 text-sm text-pollo-marron/60">
                        <Users className="w-4 h-4" />
                        <span>{participantesCount} participantes</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-pollo-amarillo to-pollo-marron-claro rounded-xl flex items-center justify-center flex-shrink-0">
                        <Gift className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-pollo-marron-oscuro">{sorteo.titulo}</h3>
                        <p className="text-sm text-pollo-marron/60 line-clamp-1">{sorteo.descripcion}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Play className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-semibold">Click para realizar sorteo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Todos los sorteos */}
        <div>
          <h2 className="text-lg font-bold text-pollo-marron-oscuro mb-4">Todos los sorteos</h2>
          <div className="space-y-3">
            {sorteos.map((sorteo) => {
              const participantesCount = participaciones.filter(p => p.sorteoId === sorteo.id).length;
              
              return (
                <div 
                  key={sorteo.id}
                  className="card-pollo"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${
                      sorteo.estado === 'activo' ? 'bg-green-500' :
                      sorteo.estado === 'proximo' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}>
                      {sorteo.estado === 'activo' ? 'Activo' :
                       sorteo.estado === 'proximo' ? 'Próximo' : 'Finalizado'}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-pollo-marron/50">
                      <Users className="w-3.5 h-3.5" />
                      <span>{participantesCount}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-pollo-marron-oscuro">{sorteo.titulo}</h3>
                  <p className="text-sm text-pollo-marron/60">Sorteo: {new Date(sorteo.fechaSorteo).toLocaleDateString('es-AR')}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
