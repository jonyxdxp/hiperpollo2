import { useState, useEffect } from 'react';
import { WelcomeScreen } from '@/sections/WelcomeScreen';
import { LoginScreen } from '@/sections/LoginScreen';
import { RegisterScreen } from '@/sections/RegisterScreen';
import { HomeScreen } from '@/sections/HomeScreen';
import { SorteosScreen } from '@/sections/SorteosScreen';
import { SorteoDetailScreen } from '@/sections/SorteoDetailScreen';
import { MisParticipacionesScreen } from '@/sections/MisParticipacionesScreen';
import { NotificacionesScreen } from '@/sections/NotificacionesScreen';
import { PerfilScreen } from '@/sections/PerfilScreen';
import { AdminScreen } from '@/sections/AdminScreen';
import { AdminSorteoScreen } from '@/sections/AdminSorteoScreen';
import { CrearSorteoScreen } from '@/sections/CrearSorteoScreen';
import { GanadoresScreen } from '@/sections/GanadoresScreen';
import { EstadisticasScreen } from '@/sections/EstadisticasScreen';
import { BottomNav } from '@/components/BottomNav';
import { useStore } from '@/store';
import type { Sorteo } from '@/types';
import './App.css';

type Screen = 
  | 'welcome' 
  | 'login' 
  | 'register' 
  | 'home' 
  | 'sorteos' 
  | 'sorteo-detail' 
  | 'mis-participaciones' 
  | 'notificaciones' 
  | 'perfil'
  | 'admin'
  | 'admin-sorteo'
  | 'crear-sorteo'
  | 'ganadores'
  | 'estadisticas';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedSorteo, setSelectedSorteo] = useState<Sorteo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, esAdmin, logout } = useStore();

  // Simular tiempo de carga de la aplicacion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Verificar si hay sesión iniciada al cargar
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentScreen('home');
    }
  }, [isAuthenticated]);

  const navigateTo = (screen: string, params?: any) => {
    const targetScreen = screen as Screen;
    if (targetScreen === 'sorteo-detail' && params) {
      setSelectedSorteo(params);
    }
    if (targetScreen === 'admin-sorteo' && params) {
      setSelectedSorteo(params);
    }
    setCurrentScreen(targetScreen);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('welcome');
  };

  // Pantalla de carga
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-pollo-amarillo/20 to-pollo-dorado/10">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 animate-bounce">
            <img 
              src="/logo-hiperdelpollo.png" 
              alt="Hiper del Pollo Logo" 
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-black text-pollo-marron-oscuro mb-2">Hiper del Pollo</h1>
          <p className="text-pollo-marron/70 text-lg font-medium mb-8">Cargando...</p>
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-pollo-amarillo rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 bg-pollo-dorado rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-pollo-marron-claro rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  // Renderizar la pantalla actual
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onLogin={() => navigateTo('login')}
            onRegister={() => navigateTo('register')}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onBack={() => navigateTo('welcome')}
            onSuccess={() => navigateTo('home')}
            onRegister={() => navigateTo('register')}
          />
        );

      case 'register':
        return (
          <RegisterScreen
            onBack={() => navigateTo('welcome')}
            onSuccess={() => navigateTo('home')}
            onLogin={() => navigateTo('login')}
          />
        );

      case 'home':
        return (
          <HomeScreen
            onNavigate={navigateTo}
          />
        );

      case 'sorteos':
        return (
          <SorteosScreen
            onBack={() => navigateTo('home')}
            onSelectSorteo={(sorteo) => navigateTo('sorteo-detail', sorteo)}
          />
        );

      case 'sorteo-detail':
        if (!selectedSorteo) return null;
        return (
          <SorteoDetailScreen
            sorteo={selectedSorteo}
            onBack={() => navigateTo('sorteos')}
          />
        );

      case 'mis-participaciones':
        return (
          <MisParticipacionesScreen
            onBack={() => navigateTo('home')}
            onSelectSorteo={(sorteo) => navigateTo('sorteo-detail', sorteo)}
          />
        );

      case 'notificaciones':
        return (
          <NotificacionesScreen
            onBack={() => navigateTo('home')}
            onSelectSorteo={(sorteo) => navigateTo('sorteo-detail', sorteo)}
          />
        );

      case 'perfil':
        return (
          <PerfilScreen
            onBack={() => navigateTo('home')}
            onLogout={handleLogout}
          />
        );

      case 'admin':
        return (
          <AdminScreen
            onBack={() => navigateTo('home')}
            onSelectSorteo={(sorteo) => navigateTo('admin-sorteo', sorteo)}
            onCrearSorteo={() => navigateTo('crear-sorteo')}
            onVerGanadores={() => navigateTo('ganadores')}
            onVerEstadisticas={() => navigateTo('estadisticas')}
          />
        );

      case 'admin-sorteo':
        if (!selectedSorteo) return null;
        return (
          <AdminSorteoScreen
            sorteo={selectedSorteo}
            onBack={() => navigateTo('admin')}
          />
        );

      case 'crear-sorteo':
        return (
          <CrearSorteoScreen
            onBack={() => navigateTo('admin')}
          />
        );

      case 'ganadores':
        return (
          <GanadoresScreen
            onBack={() => navigateTo('admin')}
          />
        );

      case 'estadisticas':
        return (
          <EstadisticasScreen
            onBack={() => navigateTo('admin')}
          />
        );

      default:
        return <WelcomeScreen onLogin={() => navigateTo('login')} onRegister={() => navigateTo('register')} />;
    }
  };

  // Determinar si mostrar la navegación inferior
  const showBottomNav = [
    'home', 
    'sorteos', 
    'mis-participaciones', 
    'notificaciones', 
    'perfil', 
    'admin'
  ].includes(currentScreen) && ![
    'crear-sorteo',
    'ganadores',
    'estadisticas',
    'admin-sorteo'
  ].includes(currentScreen);

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-gradient-to-b from-pollo-amarillo-claro to-pollo-crema relative">
      {/* Main content */}
      <main className={`transition-all duration-300 ${showBottomNav ? 'pb-20' : ''}`}>
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          isAdmin={esAdmin}
        />
      )}
    </div>
  );
}

export default App;
