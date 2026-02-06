import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, CreditCard, Calendar, MapPin, LogOut, Edit2, Check } from 'lucide-react';
import { useStore } from '@/store';

interface PerfilScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export function PerfilScreen({ onBack, onLogout }: PerfilScreenProps) {
  const { user, participaciones, notificaciones } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const misParticipaciones = participaciones.filter(p => p.userId === user?.id);
  const misNotificaciones = notificaciones.filter(n => n.userId === user?.id && !n.leida);

  const handleLogout = () => {
    onLogout();
    setShowLogoutConfirm(false);
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
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-black text-white">
                {user?.nombre.charAt(0)}{user?.apellido.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">
                {user?.nombre} {user?.apellido}
              </h1>
              <p className="text-white/80 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-pollo-marron-claro/20">
            <p className="text-2xl font-black text-pollo-marron-oscuro">{misParticipaciones.length}</p>
            <p className="text-xs text-pollo-marron/60">Participaciones</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-pollo-marron-claro/20">
            <p className="text-2xl font-black text-pollo-marron-oscuro">
              {misParticipaciones.filter(p => p.estado === 'ganador').length}
            </p>
            <p className="text-xs text-pollo-marron/60">Premios</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-pollo-marron-claro/20">
            <p className="text-2xl font-black text-pollo-marron-oscuro">{misNotificaciones.length}</p>
            <p className="text-xs text-pollo-marron/60">Notificaciones</p>
          </div>
        </div>

        {/* Datos personales */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-pollo-marron-oscuro">Mis Datos</h2>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1 text-sm text-pollo-marron font-semibold"
            >
              {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              {isEditing ? 'Guardar' : 'Editar'}
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-pollo-marron-claro/20">
              <div className="w-10 h-10 bg-pollo-amarillo/20 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-pollo-amarillo" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-pollo-marron/50">Nombre completo</p>
                <p className="font-semibold text-pollo-marron-oscuro">{user?.nombre} {user?.apellido}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-pollo-marron-claro/20">
              <div className="w-10 h-10 bg-pollo-marron-claro/20 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-pollo-marron-claro" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-pollo-marron/50">Email</p>
                <p className="font-semibold text-pollo-marron-oscuro">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-pollo-marron-claro/20">
              <div className="w-10 h-10 bg-pollo-dorado/20 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-pollo-dorado" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-pollo-marron/50">Teléfono</p>
                <p className="font-semibold text-pollo-marron-oscuro">{user?.telefono}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-pollo-marron-claro/20">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-pollo-marron/50">DNI</p>
                <p className="font-semibold text-pollo-marron-oscuro">{user?.dni}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-pollo-marron-claro/20">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-pollo-marron/50">Fecha de nacimiento</p>
                <p className="font-semibold text-pollo-marron-oscuro">
                  {new Date(user?.fechaNacimiento || '').toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-pollo-marron-claro/20">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-pollo-marron/50">Ciudad</p>
                <p className="font-semibold text-pollo-marron-oscuro">{user?.ciudad}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cerrar sesión */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 font-semibold hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full animate-scale-in">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-pollo-marron-oscuro text-center mb-2">
              ¿Cerrar sesión?
            </h3>
            <p className="text-pollo-marron/60 text-center mb-6">
              Vas a salir de tu cuenta. ¿Estás seguro?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-pollo-marron border-2 border-pollo-marron-claro/30"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-red-500"
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
