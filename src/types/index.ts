// Tipos de usuario
export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  fechaNacimiento: string;
  ciudad: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Tipos de sorteos
export interface Sorteo {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  fechaInicio: string;
  fechaFin: string;
  fechaSorteo: string;
  premios: Premio[];
  estado: 'activo' | 'finalizado' | 'proximo';
  participantes: number;
  maxParticipantes?: number;
  requisitos: string[];
  // Nuevos campos para administración
  edadMinima: number;
  edadMaxima?: number;
  requisitosPersonalizados: RequisitoPersonalizado[];
  terminosCondiciones: string;
  creadoPor: string;
  fechaCreacion: string;
}

export interface RequisitoPersonalizado {
  id: string;
  tipo: 'texto' | 'numero' | 'fecha' | 'checkbox' | 'select';
  label: string;
  descripcion?: string;
  requerido: boolean;
  opciones?: string[];
}

export interface Premio {
  id: string;
  puesto: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  valor: string;
}

// Tipos de participación
export interface Participacion {
  id: string;
  userId: string;
  sorteoId: string;
  fechaParticipacion: string;
  numeroTicket: string;
  estado: 'activo' | 'ganador' | 'descalificado';
  puesto?: number;
}

// Tipos de notificación
export interface Notificacion {
  id: string;
  userId: string;
  tipo: 'confirmacion' | 'ganador' | 'recordatorio' | 'sistema';
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
  sorteoId?: string;
}

// Tipos de ganador
export interface Ganador {
  id: string;
  userId: string;
  sorteoId: string;
  puesto: number;
  premio: Premio;
  fechaGanado: string;
  notificado: boolean;
  usuario: User;
}

// Tipos para el store
export interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  
  // Sorteos
  sorteos: Sorteo[];
  sorteoActivo: Sorteo | null;
  cargarSorteos: () => void;
  seleccionarSorteo: (sorteo: Sorteo | null) => void;
  
  // Participaciones
  participaciones: Participacion[];
  participarEnSorteo: (sorteoId: string) => Promise<boolean>;
  verificarParticipacion: (sorteoId: string) => boolean;
  
  // Notificaciones
  notificaciones: Notificacion[];
  marcarNotificacionLeida: (id: string) => void;
  
  // Admin
  esAdmin: boolean;
  realizarSorteo: (sorteoId: string) => Ganador[];
  ganadores: Ganador[];
  
  // Nuevas acciones de administrador
  crearSorteo: (sorteoData: Omit<Sorteo, 'id' | 'creadoPor' | 'fechaCreacion' | 'participantes'>) => Sorteo;
  actualizarSorteo: (sorteoId: string, sorteoData: Partial<Sorteo>) => boolean;
  eliminarSorteo: (sorteoId: string) => boolean;
  obtenerGanadoresPorSorteo: (sorteoId: string) => Ganador[];
  obtenerEstadisticasSorteo: (sorteoId: string) => EstadisticasSorteo;
  obtenerEstadisticasGenerales: () => EstadisticasGenerales;
}

export interface EstadisticasSorteo {
  totalParticipantes: number;
  participantesUnicos: number;
  tasaConversion: number;
  participacionesPorDia: { fecha: string; cantidad: number }[];
  comparacionSorteosAnteriores: number;
}

export interface EstadisticasGenerales {
  totalSorteos: number;
  sorteosActivos: number;
  sorteosFinalizados: number;
  totalParticipaciones: number;
  totalParticipantesUnicos: number;
  promedioParticipacionesPorSorteo: number;
  sorteosConMayorParticipacion: { sorteoId: string; titulo: string; participaciones: number }[];
}

export interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
  dni: string;
  fechaNacimiento: string;
  ciudad: string;
}

// Tipos de navegación
export type Screen = 
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
  | 'admin-sorteo';
