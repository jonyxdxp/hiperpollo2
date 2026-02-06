import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Gift, Trophy, Play, Check, Crown, Medal, Award, AlertCircle } from 'lucide-react';
import { useStore } from '@/store';
import type { Sorteo, Ganador } from '@/types';

interface AdminSorteoScreenProps {
  sorteo: Sorteo;
  onBack: () => void;
}

export function AdminSorteoScreen({ sorteo, onBack }: AdminSorteoScreenProps) {
  const { participaciones, realizarSorteo, ganadores } = useStore();
  const [isSorting, setIsSorting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sorteoGanadores, setSorteoGanadores] = useState<Ganador[]>([]);
  const [confetti, setConfetti] = useState<number[]>([]);

  const participantesSorteo = participaciones.filter(p => p.sorteoId === sorteo.id);
  const ganadoresExistentes = ganadores.filter(g => g.sorteoId === sorteo.id);

  useEffect(() => {
    if (ganadoresExistentes.length > 0) {
      setSorteoGanadores(ganadoresExistentes);
      setShowResults(true);
    }
  }, []);

  const handleRealizarSorteo = async () => {
    if (participantesSorteo.length < 3) {
      return;
    }

    setIsSorting(true);
    
    // Simular animación de sorteo
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const nuevosGanadores = realizarSorteo(sorteo.id);
    setSorteoGanadores(nuevosGanadores);
    setIsSorting(false);
    setShowResults(true);
    
    // Generar confeti
    setConfetti(Array.from({ length: 50 }, (_, i) => i));
    
    // Limpiar confeti después
    setTimeout(() => setConfetti([]), 3000);
  };

  const getPositionIcon = (puesto: number) => {
    switch (puesto) {
      case 1: return <Crown className="w-6 h-6 text-yellow-600" />;
      case 2: return <Medal className="w-5 h-5 text-gray-600" />;
      case 3: return <Award className="w-5 h-5 text-orange-600" />;
      default: return <Trophy className="w-5 h-5 text-pollo-dorado" />;
    }
  };

  const getPositionColor = (puesto: number) => {
    switch (puesto) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-pollo-amarillo to-pollo-marron-claro';
    }
  };

  return (
    <div className="min-h-screen w-full pb-24 relative">
      {/* Confetti */}
      {confetti.map((i) => (
        <div
          key={i}
          className={`confetti confetti-${(i % 5) + 1}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random()}s`
          }}
        />
      ))}

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
          
          <h1 className="text-2xl font-black text-white mb-1">Realizar Sorteo</h1>
          <p className="text-white/80 text-sm">{sorteo.titulo}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {!showResults ? (
          <>
            {/* Info Card */}
            <div className="card-premium mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pollo-amarillo to-pollo-marron-claro rounded-xl flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-pollo-marron-oscuro">{sorteo.titulo}</h2>
                  <p className="text-sm text-pollo-marron/60">{sorteo.descripcion}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-pollo-amarillo/10 rounded-xl p-3 text-center">
                  <Users className="w-5 h-5 text-pollo-amarillo mx-auto mb-1" />
                  <p className="text-xl font-bold text-pollo-marron-oscuro">{participantesSorteo.length}</p>
                  <p className="text-xs text-pollo-marron/60">Participantes</p>
                </div>
                <div className="bg-pollo-marron-claro/10 rounded-xl p-3 text-center">
                  <Trophy className="w-5 h-5 text-pollo-marron-claro mx-auto mb-1" />
                  <p className="text-xl font-bold text-pollo-marron-oscuro">3</p>
                  <p className="text-xs text-pollo-marron/60">Ganadores</p>
                </div>
              </div>
            </div>

            {/* Premios */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-pollo-marron-oscuro mb-3">Premios a sortear</h3>
              <div className="space-y-3">
                {sorteo.premios.map((premio) => (
                  <div key={premio.id} className="card-pollo flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getPositionColor(premio.puesto)} rounded-xl flex items-center justify-center`}>
                      {getPositionIcon(premio.puesto)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-pollo-marron-oscuro">{premio.nombre}</p>
                      <p className="text-sm text-pollo-dorado font-semibold">{premio.valor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            {participantesSorteo.length >= 3 ? (
              <button
                onClick={handleRealizarSorteo}
                disabled={isSorting}
                className="w-full btn-primary text-lg py-5 flex items-center justify-center gap-3"
              >
                {isSorting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sorteando...
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" />
                    Realizar Sorteo
                  </>
                )}
              </button>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 font-semibold">No hay suficientes participantes</p>
                <p className="text-sm text-red-500">Se necesitan al menos 3 participantes</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Results */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-soft">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-black text-pollo-marron-oscuro">¡Ganadores!</h2>
              <p className="text-pollo-marron/60">Sorteo realizado exitosamente</p>
            </div>

            <div className="space-y-4">
              {sorteoGanadores.map((ganador) => (
                <div 
                  key={ganador.id}
                  className="card-premium relative overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${ganador.puesto * 200}ms` }}
                >
                  <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${getPositionColor(ganador.puesto)}`} />
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${getPositionColor(ganador.puesto)} rounded-xl flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl font-black text-white">#{ganador.puesto}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {getPositionIcon(ganador.puesto)}
                        <span className="text-xs font-bold text-pollo-marron/60 uppercase">
                          {ganador.puesto === 1 ? 'Primer' : ganador.puesto === 2 ? 'Segundo' : 'Tercer'} Puesto
                        </span>
                      </div>
                      <h3 className="font-bold text-pollo-marron-oscuro text-lg">
                        {ganador.usuario.nombre} {ganador.usuario.apellido}
                      </h3>
                      <p className="text-sm text-pollo-marron/60">{ganador.usuario.email}</p>
                      <p className="text-sm text-pollo-marron/60">{ganador.usuario.telefono}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-pollo-marron-claro/20">
                    <p className="text-xs text-pollo-marron/50 mb-1">PREMIO GANADO:</p>
                    <p className="font-bold text-pollo-marron-oscuro">{ganador.premio.nombre}</p>
                    <p className="text-sm text-pollo-dorado font-semibold">{ganador.premio.valor}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Notificaciones enviadas */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-green-700">Notificaciones enviadas</p>
                  <p className="text-sm text-green-600">Los ganadores fueron notificados por email y WhatsApp</p>
                </div>
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full btn-secondary text-lg py-4 mt-6"
            >
              Volver al Panel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
