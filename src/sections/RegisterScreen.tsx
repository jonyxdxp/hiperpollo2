import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone, Calendar, MapPin, CreditCard, Check, Sparkles } from 'lucide-react';
import { useStore } from '@/store';

interface RegisterScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  onLogin: () => void;
}

export function RegisterScreen({ onBack, onSuccess, onLogin }: RegisterScreenProps) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    dni: '',
    fechaNacimiento: '',
    ciudad: ''
  });
  
  const register = useStore(state => state.register);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.password) {
      setError('Completá todos los campos');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.telefono || !formData.dni || !formData.fechaNacimiento || !formData.ciudad) {
      setError('Completá todos los campos');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await register(formData);
      if (success) {
        onSuccess();
      } else {
        setError('El email ya está registrado');
        setStep(1);
      }
    } catch (err) {
      setError('Error al registrar. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pollo-amarillo/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-56 h-56 bg-pollo-marron-claro/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-12 pb-4">
        <button
          onClick={step === 1 ? onBack : () => setStep(1)}
          className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-pollo-marron-claro/20"
        >
          <ArrowLeft className="w-5 h-5 text-pollo-marron" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pb-8 relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto relative mb-3">
            <div className="absolute inset-0 bg-gradient-to-br from-pollo-amarillo to-pollo-marron-claro rounded-xl rotate-6 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-pollo-amarillo to-pollo-marron-claro rounded-xl flex items-center justify-center shadow-pollo">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-pollo-marron-oscuro">
            Crear Cuenta
          </h1>
          <p className="text-pollo-marron/60 mt-1 text-sm">
            Paso {step} de 2
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-6">
          <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-pollo-amarillo' : 'bg-pollo-marron-claro/30'}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-pollo-amarillo' : 'bg-pollo-marron-claro/30'}`} />
        </div>

        {/* Form */}
        <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit} className="space-y-4 flex-1">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-pollo-marron-oscuro mb-2">
                    Nombre
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pollo-marron/40" />
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => updateField('nombre', e.target.value)}
                      placeholder="Juan"
                      className="input-pollo pl-10 text-sm py-3.5"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-pollo-marron-oscuro mb-2">
                    Apellido
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pollo-marron/40" />
                    <input
                      type="text"
                      value={formData.apellido}
                      onChange={(e) => updateField('apellido', e.target.value)}
                      placeholder="Pérez"
                      className="input-pollo pl-10 text-sm py-3.5"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-pollo-marron-oscuro mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pollo-marron/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="tu@email.com"
                    className="input-pollo pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-pollo-marron-oscuro mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pollo-marron/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="input-pollo pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pollo-marron/40"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-lg py-4 mt-4"
              >
                Continuar
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-pollo-marron-oscuro mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pollo-marron/40" />
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => updateField('telefono', e.target.value)}
                    placeholder="+54 9 11 1234-5678"
                    className="input-pollo pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-pollo-marron-oscuro mb-2">
                  DNI
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pollo-marron/40" />
                  <input
                    type="text"
                    value={formData.dni}
                    onChange={(e) => updateField('dni', e.target.value)}
                    placeholder="12.345.678"
                    className="input-pollo pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-pollo-marron-oscuro mb-2">
                  Fecha de Nacimiento
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pollo-marron/40" />
                  <input
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => updateField('fechaNacimiento', e.target.value)}
                    className="input-pollo pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-pollo-marron-oscuro mb-2">
                  Ciudad
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pollo-marron/40" />
                  <input
                    type="text"
                    value={formData.ciudad}
                    onChange={(e) => updateField('ciudad', e.target.value)}
                    placeholder="Buenos Aires"
                    className="input-pollo pl-12"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-pollo-amarillo/10 rounded-xl">
                <Check className="w-5 h-5 text-pollo-amarillo flex-shrink-0 mt-0.5" />
                <p className="text-xs text-pollo-marron/70">
                  Al registrarte, aceptás los términos y condiciones y la política de privacidad de Hiper del Pollo.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary text-lg py-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Crear Cuenta'
                )}
              </button>
            </>
          )}
        </form>

        {/* Footer */}
        <div className="text-center pt-6">
          <p className="text-pollo-marron/60">
            ¿Ya tenés cuenta?{' '}
            <button
              onClick={onLogin}
              className="text-pollo-marron font-bold hover:text-pollo-dorado transition-colors"
            >
              Iniciá sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
