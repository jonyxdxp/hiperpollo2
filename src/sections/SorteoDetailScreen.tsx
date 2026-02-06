import { useState } from 'react';
import { ArrowLeft, Gift, Calendar, Users, Check, Sparkles, Trophy, AlertCircle, Clock, Share2 } from 'lucide-react';
import { useStore } from '@/store';
import type { Sorteo } from '@/types';

interface SorteoDetailScreenProps {
  sorteo: Sorteo;
  onBack: () => void;
}

export function SorteoDetailScreen({ sorteo, onBack }: SorteoDetailScreenProps) {
  const { user, verificarParticipacion, participarEnSorteo } = useStore();
  const [isParticipating, setIsParticipating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const yaParticipa = user ? verificarParticipacion(sorteo.id) : false;

  const handleParticipar = async () => {
    if (!user) {
      setError('Debes iniciar sesión para participar');
      return;
    }

    setIsParticipating(true);
    setError('');

    try {
      const success = await participarEnSorteo(sorteo.id);
      if (success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setError('Ya estás participando en este sorteo');
      }
    } catch (err) {
      setError('Error al participar. Intenta de nuevo.');
    } finally {
      setIsParticipating(false);
    }
  };

  const getMedalColor = (puesto: number) => {
    switch (puesto) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-pollo-amarillo to-pollo-marron-claro';
    }
  };

  return (
    <div className="min-h-screen w-full pb-32">
      {/* Header Image */}
      <div className="relative h-64 bg-gradient-to-br from-pollo-amarillo to-pollo-marron-claro">
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-12 left-6 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-pollo-marron" />
        </button>

        {/* Share button */}
        <button className="absolute top-12 right-6 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
          <Share2 className="w-5 h-5 text-pollo-marron" />
        </button>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Gift className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute bottom-4 left-6">
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white ${
            sorteo.estado === 'activo' ? 'bg-green-500' :
            sorteo.estado === 'proximo' ? 'bg-blue-500' : 'bg-gray-500'
          }`}>
            {sorteo.estado === 'activo' ? 'Sorteo Activo' :
             sorteo.estado === 'proximo' ? 'Próximamente' : 'Finalizado'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-6 relative z-10">
        <div className="card-premium">
          <h1 className="text-2xl font-black text-pollo-marron-oscuro mb-2">{sorteo.titulo}</h1>
          <p className="text-pollo-marron/70 leading-relaxed">{sorteo.descripcion}</p>

          {/* Stats */}
          <div className="flex gap-4 mt-6">
            <div className="flex-1 bg-pollo-amarillo/10 rounded-xl p-3 text-center">
              <Users className="w-5 h-5 text-pollo-amarillo mx-auto mb-1" />
              <p className="text-lg font-bold text-pollo-marron-oscuro">{sorteo.participantes.toLocaleString()}</p>
              <p className="text-xs text-pollo-marron/60">Participantes</p>
            </div>
            <div className="flex-1 bg-pollo-marron-claro/10 rounded-xl p-3 text-center">
              <Calendar className="w-5 h-5 text-pollo-marron-claro mx-auto mb-1" />
              <p className="text-lg font-bold text-pollo-marron-oscuro">
                {new Date(sorteo.fechaSorteo).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
              </p>
              <p className="text-xs text-pollo-marron/60">Fecha del sorteo</p>
            </div>
            <div className="flex-1 bg-pollo-dorado/10 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-pollo-dorado mx-auto mb-1" />
              <p className="text-lg font-bold text-pollo-marron-oscuro">
                {Math.ceil((new Date(sorteo.fechaFin).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
              </p>
              <p className="text-xs text-pollo-marron/60">Días restantes</p>
            </div>
          </div>
        </div>

        {/* Requisitos */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-pollo-marron-oscuro mb-3">Requisitos</h2>
          <div className="space-y-2">
            {sorteo.requisitos.map((requisito, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-pollo-marron-claro/20">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-pollo-marron-oscuro">{requisito}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Premios */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-pollo-marron-oscuro mb-3">Premios</h2>
          <div className="space-y-3">
            {sorteo.premios.map((premio) => (
              <div 
                key={premio.id}
                className="card-pollo relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${getMedalColor(premio.puesto)}`} />
                
                <div className="flex items-center gap-4 pl-3">
                  <div className={`w-14 h-14 bg-gradient-to-br ${getMedalColor(premio.puesto)} rounded-xl flex items-center justify-center shadow-md`}>
                    {premio.puesto === 1 ? <Trophy className="w-7 h-7 text-white" /> :
                     premio.puesto === 2 ? <Trophy className="w-6 h-6 text-white" /> :
                     <Sparkles className="w-6 h-6 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${getMedalColor(premio.puesto)}`}>
                        {premio.puesto}° PUESTO
                      </span>
                    </div>
                    <h3 className="font-bold text-pollo-marron-oscuro mt-1">{premio.nombre}</h3>
                    <p className="text-sm text-pollo-marron/60">{premio.descripcion}</p>
                    <p className="text-sm font-bold text-pollo-dorado mt-1">{premio.valor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-pollo-marron-claro/20 p-4 safe-area-bottom">
        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        
        {showSuccess && (
          <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm text-center flex items-center justify-center gap-2 animate-slide-up">
            <Check className="w-4 h-4" />
            ¡Participación confirmada! Te enviamos un email y WhatsApp.
          </div>
        )}

        {sorteo.estado === 'activo' && (
          <button
            onClick={handleParticipar}
            disabled={yaParticipa || isParticipating}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              yaParticipa
                ? 'bg-green-500 text-white cursor-default'
                : 'btn-primary'
            }`}
          >
            {isParticipating ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : yaParticipa ? (
              <>
                <Check className="w-5 h-5" />
                Ya estás participando
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Participar Ahora
              </>
            )}
          </button>
        )}

        {sorteo.estado === 'proximo' && (
          <button
            disabled
            className="w-full py-4 rounded-2xl font-bold text-lg bg-gray-200 text-gray-500 cursor-not-allowed"
          >
            Próximamente
          </button>
        )}

        {sorteo.estado === 'finalizado' && (
          <button
            disabled
            className="w-full py-4 rounded-2xl font-bold text-lg bg-gray-200 text-gray-500 cursor-not-allowed"
          >
            Sorteo Finalizado
          </button>
        )}
      </div>
    </div>
  );
}
