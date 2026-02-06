import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Sparkles } from 'lucide-react';
import { useStore } from '@/store';

interface LoginScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  onRegister: () => void;
}

export function LoginScreen({ onBack, onSuccess, onRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const login = useStore(state => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        onSuccess();
      } else {
        setError('Email o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intenta de nuevo.');
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
      <div className="relative z-10 px-6 pt-12 pb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-pollo-marron-claro/20"
        >
          <ArrowLeft className="w-5 h-5 text-pollo-marron" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pb-8 relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-pollo-amarillo to-pollo-marron-claro rounded-2xl rotate-6 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-pollo-amarillo to-pollo-marron-claro rounded-2xl flex items-center justify-center shadow-pollo">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-pollo-marron-oscuro">
            Bienvenido de vuelta
          </h1>
          <p className="text-pollo-marron/60 mt-1">
            Iniciá sesión para participar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-pollo-marron-oscuro mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pollo-marron/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="input-pollo pl-12"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-pollo pl-12 pr-12"
                required
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

          <div className="flex justify-end">
            <button type="button" className="text-sm text-pollo-marron font-semibold hover:text-pollo-dorado transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary text-lg py-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          {/* Demo credentials */}
          <div className="p-4 bg-pollo-amarillo/10 rounded-xl border border-pollo-amarillo/30">
            <p className="text-xs text-pollo-marron/70 text-center mb-2 font-semibold">
              Credenciales de prueba:
            </p>
            <div className="text-xs text-pollo-marron/60 text-center space-y-1">
              <p><strong>Admin:</strong> admin@hiperdelpollo.com / admin123</p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center pt-6">
          <p className="text-pollo-marron/60">
            ¿No tenés cuenta?{' '}
            <button
              onClick={onRegister}
              className="text-pollo-marron font-bold hover:text-pollo-dorado transition-colors"
            >
              Registrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
