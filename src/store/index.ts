import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AppState, User, Sorteo, Participacion, Notificacion, Ganador, RegisterData } from '@/types';

// Datos de ejemplo - Sorteos
const sorteosEjemplo: Sorteo[] = [
  {
    id: '1',
    titulo: 'Sorteo Aniversario 2025',
    descripcion: 'Celebramos nuestro aniversario con increíbles premios. Participá y ganá una canasta de productos exclusivos de Hiper del Pollo.',
    imagen: '/sorteo-aniversario.jpg',
    fechaInicio: '2025-01-01',
    fechaFin: '2025-02-28',
    fechaSorteo: '2025-03-01',
    estado: 'activo',
    participantes: 1247,
    maxParticipantes: 5000,
    requisitos: ['Ser mayor de 18 años', 'Residir en Argentina', 'Tener DNI válido'],
    premios: [
      { id: 'p1', puesto: 1, nombre: 'Canasta Premium Aniversario', descripcion: 'Canasta con los mejores productos', imagen: '', valor: '$150.000' },
      { id: 'p2', puesto: 2, nombre: 'Voucher $80.000', descripcion: 'Voucher de compra', imagen: '', valor: '$80.000' },
      { id: 'p3', puesto: 3, nombre: 'Voucher $40.000', descripcion: 'Voucher de compra', imagen: '', valor: '$40.000' }
    ],
    edadMinima: 18,
    requisitosPersonalizados: [],
    terminosCondiciones: 'Términos y condiciones del sorteo...',
    creadoPor: 'admin@hiperdelpollo.com',
    fechaCreacion: '2024-12-15'
  },
  {
    id: '2',
    titulo: 'Sorteo Día de la Madre',
    descripcion: 'Un regalo especial para mamá. Participá por una canasta de productos gourmet y de cuidado personal.',
    imagen: '/sorteo-madre.jpg',
    fechaInicio: '2025-02-01',
    fechaFin: '2025-05-10',
    fechaSorteo: '2025-05-11',
    estado: 'proximo',
    participantes: 0,
    requisitos: ['Ser mayor de 18 años', 'Residir en Argentina'],
    premios: [
      { id: 'p4', puesto: 1, nombre: 'Spa Day + Canasta Gourmet', descripcion: 'Día de spa para dos', imagen: '', valor: '$120.000' },
      { id: 'p5', puesto: 2, nombre: 'Canasta de Cuidado Personal', descripcion: 'Productos premium', imagen: '', valor: '$70.000' },
      { id: 'p6', puesto: 3, nombre: 'Voucher $35.000', descripcion: 'Voucher de compra', imagen: '', valor: '$35.000' }
    ],
    edadMinima: 18,
    requisitosPersonalizados: [],
    terminosCondiciones: 'Términos y condiciones del sorteo...',
    creadoPor: 'admin@hiperdelpollo.com',
    fechaCreacion: '2025-01-10'
  },
  {
    id: '3',
    titulo: 'Sorteo Fin de Año 2024',
    descripcion: 'El gran sorteo de fin de año con premios increíbles.',
    imagen: '/sorteo-fin-anio.jpg',
    fechaInicio: '2024-11-01',
    fechaFin: '2024-12-20',
    fechaSorteo: '2024-12-30',
    estado: 'finalizado',
    participantes: 3456,
    requisitos: ['Ser mayor de 18 años'],
    premios: [
      { id: 'p7', puesto: 1, nombre: 'Auto 0km', descripcion: 'Fiat Cronos 0km', imagen: '', valor: '$25.000.000' },
      { id: 'p8', puesto: 2, nombre: 'Moto 0km', descripcion: 'Honda Wave 0km', imagen: '', valor: '$3.500.000' },
      { id: 'p9', puesto: 3, nombre: 'Voucher $100.000', descripcion: 'Voucher de compra', imagen: '', valor: '$100.000' }
    ],
    edadMinima: 18,
    requisitosPersonalizados: [],
    terminosCondiciones: 'Términos y condiciones del sorteo...',
    creadoPor: 'admin@hiperdelpollo.com',
    fechaCreacion: '2024-10-01'
  }
];

// Usuario admin de ejemplo
const adminUser: User = {
  id: 'admin-1',
  nombre: 'Administrador',
  apellido: 'Hiper del Pollo',
  email: 'admin@hiperdelpollo.com',
  telefono: '1234567890',
  dni: '00000000',
  fechaNacimiento: '1990-01-01',
  ciudad: 'Ciudad',
  createdAt: '2024-01-01'
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      isAuthenticated: false,
      esAdmin: false,

      // Sorteos
      sorteos: sorteosEjemplo,
      sorteoActivo: null,

      // Participaciones
      participaciones: [],

      // Notificaciones
      notificaciones: [],

      // Ganadores
      ganadores: [],

      // Actions
      login: async (email: string, password: string) => {
        // Simulación de login
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email === 'admin@hiperdelpollo.com' && password === 'admin123') {
          set({ 
            user: adminUser, 
            isAuthenticated: true, 
            esAdmin: true 
          });
          return true;
        }
        
        // Usuario normal de ejemplo
        const usuariosGuardados = JSON.parse(localStorage.getItem('hiperdelpollo-users') || '[]');
        const usuario = usuariosGuardados.find((u: any) => u.email === email && u.password === password);
        
        if (usuario) {
          const { password, ...userWithoutPassword } = usuario;
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true, 
            esAdmin: false 
          });
          return true;
        }
        
        return false;
      },

      register: async (userData: RegisterData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: `user-${Date.now()}`,
          nombre: userData.nombre,
          apellido: userData.apellido,
          email: userData.email,
          telefono: userData.telefono,
          dni: userData.dni,
          fechaNacimiento: userData.fechaNacimiento,
          ciudad: userData.ciudad,
          createdAt: new Date().toISOString()
        };
        
        // Guardar en localStorage
        const usuarios = JSON.parse(localStorage.getItem('hiperdelpollo-users') || '[]');
        
        if (usuarios.some((u: any) => u.email === userData.email)) {
          return false;
        }
        
        usuarios.push({ ...newUser, password: userData.password });
        localStorage.setItem('hiperdelpollo-users', JSON.stringify(usuarios));
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          esAdmin: false 
        });
        
        return true;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          esAdmin: false 
        });
      },

      cargarSorteos: () => {
        // Los sorteos ya están cargados en el estado inicial
      },

      seleccionarSorteo: (sorteo: Sorteo | null) => {
        set({ sorteoActivo: sorteo });
      },

      participarEnSorteo: async (sorteoId: string) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const { user, participaciones, sorteos } = get();
        if (!user) return false;
        
        const yaParticipa = participaciones.some(
          p => p.sorteoId === sorteoId && p.userId === user.id
        );
        
        if (yaParticipa) return false;
        
        const nuevaParticipacion: Participacion = {
          id: `part-${Date.now()}`,
          userId: user.id,
          sorteoId: sorteoId,
          fechaParticipacion: new Date().toISOString(),
          numeroTicket: `T${Date.now().toString(36).toUpperCase()}`,
          estado: 'activo'
        };
        
        // Actualizar contador de participantes
        const nuevosSorteos = sorteos.map(s => 
          s.id === sorteoId 
            ? { ...s, participantes: s.participantes + 1 }
            : s
        );
        
        // Crear notificación de confirmación
        const sorteo = sorteos.find(s => s.id === sorteoId);
        const nuevaNotificacion: Notificacion = {
          id: `notif-${Date.now()}`,
          userId: user.id,
          tipo: 'confirmacion',
          titulo: '¡Participación confirmada!',
          mensaje: `Ya estás participando en el sorteo "${sorteo?.titulo}". ¡Mucha suerte!`,
          fecha: new Date().toISOString(),
          leida: false,
          sorteoId: sorteoId
        };
        
        set({ 
          participaciones: [...participaciones, nuevaParticipacion],
          sorteos: nuevosSorteos,
          notificaciones: [nuevaNotificacion, ...get().notificaciones]
        });
        
        return true;
      },

      verificarParticipacion: (sorteoId: string) => {
        const { user, participaciones } = get();
        if (!user) return false;
        
        return participaciones.some(
          p => p.sorteoId === sorteoId && p.userId === user.id
        );
      },

      marcarNotificacionLeida: (id: string) => {
        const { notificaciones } = get();
        set({
          notificaciones: notificaciones.map(n =>
            n.id === id ? { ...n, leida: true } : n
          )
        });
      },

      realizarSorteo: (sorteoId: string) => {
        const { participaciones, sorteos } = get();
        
        const participantesSorteo = participaciones.filter(p => p.sorteoId === sorteoId);
        const sorteo = sorteos.find(s => s.id === sorteoId);
        
        if (!sorteo || participantesSorteo.length < 3) {
          return [];
        }
        
        // Mezclar participantes aleatoriamente
        const mezclados = [...participantesSorteo].sort(() => Math.random() - 0.5);
        const ganadoresSeleccionados = mezclados.slice(0, 3);
        
        // Obtener datos de usuarios
        const usuarios = JSON.parse(localStorage.getItem('hiperdelpollo-users') || '[]');
        
        const nuevosGanadores: Ganador[] = ganadoresSeleccionados.map((p, index) => {
          const usuarioData = usuarios.find((u: any) => u.id === p.userId);
          const { password, ...usuario } = usuarioData || {};
          
          return {
            id: `ganador-${Date.now()}-${index}`,
            userId: p.userId,
            sorteoId: sorteoId,
            puesto: index + 1,
            premio: sorteo.premios[index],
            fechaGanado: new Date().toISOString(),
            notificado: false,
            usuario: usuario || {
              id: p.userId,
              nombre: 'Usuario',
              apellido: 'Desconocido',
              email: 'unknown@email.com',
              telefono: '',
              dni: '',
              fechaNacimiento: '',
              ciudad: '',
              createdAt: ''
            }
          };
        });
        
        // Crear notificaciones para ganadores
        const notificacionesGanadores: Notificacion[] = nuevosGanadores.map(g => ({
          id: `notif-ganador-${Date.now()}-${g.puesto}`,
          userId: g.userId,
          tipo: 'ganador',
          titulo: `¡Felicidades! ${g.puesto}° Puesto`,
          mensaje: `¡Ganaste el ${g.puesto}° puesto en el sorteo "${sorteo.titulo}"! Tu premio: ${g.premio.nombre}. Te contactaremos pronto.`,
          fecha: new Date().toISOString(),
          leida: false,
          sorteoId: sorteoId
        }));
        
        // Actualizar estado de participaciones
        const nuevasParticipaciones = participaciones.map(p => {
          const ganador = nuevosGanadores.find(g => g.userId === p.userId && g.sorteoId === p.sorteoId);
          if (ganador) {
            return { ...p, estado: 'ganador' as const, puesto: ganador.puesto };
          }
          return p;
        });
        
        // Actualizar estado del sorteo
        const sorteosActualizados = sorteos.map(s => 
          s.id === sorteoId ? { ...s, estado: 'finalizado' as const } : s
        );
        
        set({
          ganadores: [...get().ganadores, ...nuevosGanadores],
          notificaciones: [...notificacionesGanadores, ...get().notificaciones],
          participaciones: nuevasParticipaciones,
          sorteos: sorteosActualizados
        });
        
        return nuevosGanadores;
      },

      // Nuevas acciones de administrador
      crearSorteo: (sorteoData: Omit<Sorteo, 'id' | 'creadoPor' | 'fechaCreacion' | 'participantes'>) => {
        const { user, sorteos } = get();
        const nuevoSorteo: Sorteo = {
          ...sorteoData,
          id: `sorteo-${Date.now()}`,
          creadoPor: user?.email || 'admin@hiperdelpollo.com',
          fechaCreacion: new Date().toISOString(),
          participantes: 0
        };
        
        set({ sorteos: [...sorteos, nuevoSorteo] });
        return nuevoSorteo;
      },

      actualizarSorteo: (sorteoId, sorteoData) => {
        const { sorteos } = get();
        const sorteoIndex = sorteos.findIndex(s => s.id === sorteoId);
        
        if (sorteoIndex === -1) return false;
        
        const sorteosActualizados = [...sorteos];
        sorteosActualizados[sorteoIndex] = {
          ...sorteosActualizados[sorteoIndex],
          ...sorteoData
        };
        
        set({ sorteos: sorteosActualizados });
        return true;
      },

      eliminarSorteo: (sorteoId: string) => {
        const { sorteos } = get();
        const sorteosFiltrados = sorteos.filter(s => s.id !== sorteoId);
        
        if (sorteosFiltrados.length === sorteos.length) return false;
        
        set({ sorteos: sorteosFiltrados });
        return true;
      },

      obtenerGanadoresPorSorteo: (sorteoId: string) => {
        const { ganadores } = get();
        return ganadores.filter(g => g.sorteoId === sorteoId);
      },

      obtenerEstadisticasSorteo: (sorteoId: string) => {
        const { participaciones, sorteos } = get();
        const participacionesSorteo = participaciones.filter(p => p.sorteoId === sorteoId);
        
        // Calcular participaciones por día
  // Calcular participaciones por día
        const participacionesPorDia: { fecha: string; cantidad: number }[] = [];
        const participacionesPorFecha = new Map<string, number>();
        
        participacionesSorteo.forEach(p => {
          const fecha = new Date(p.fechaParticipacion).toISOString().split('T')[0];
          participacionesPorFecha.set(fecha, (participacionesPorFecha.get(fecha) || 0) + 1);
        });
        
        participacionesPorFecha.forEach((cantidad, fecha) => {
          participacionesPorDia.push({ fecha, cantidad });
        });
        
        participacionesPorDia.sort((a: { fecha: string; cantidad: number }, b: { fecha: string; cantidad: number }) => a.fecha.localeCompare(b.fecha));
        
        // Calcular participantes únicos
        const participantesUnicos = new Set(participacionesSorteo.map(p => p.userId)).size;
        
        // Calcular tasa de conversión (participaciones / participantes únicos)
        const tasaConversion = participantesUnicos > 0 
          ? participacionesSorteo.length / participantesUnicos 
          : 0;
        
        // Comparación con sorteos anteriores (simulado)
        const sorteosFinalizados = sorteos.filter(s => s.estado === 'finalizado' && s.id !== sorteoId);
        const promedioAnterior = sorteosFinalizados.length > 0
          ? sorteosFinalizados.reduce((sum: number, s: Sorteo) => sum + s.participantes, 0) / sorteosFinalizados.length
          : 0;
        const comparacion = promedioAnterior > 0 
          ? ((participacionesSorteo.length - promedioAnterior) / promedioAnterior) * 100 
          : 0;
        
        return {
          totalParticipantes: participacionesSorteo.length,
          participantesUnicos,
          tasaConversion: Math.round(tasaConversion * 100) / 100,
          participacionesPorDia,
          comparacionSorteosAnteriores: Math.round(comparacion * 100) / 100
        };
      },

      obtenerEstadisticasGenerales: () => {
        const { sorteos, participaciones } = get();
        
        const totalSorteos = sorteos.length;
        const sorteosActivos = sorteos.filter(s => s.estado === 'activo').length;
        const sorteosFinalizados = sorteos.filter(s => s.estado === 'finalizado').length;
        const totalParticipaciones = participaciones.length;
        const totalParticipantesUnicos = new Set(participaciones.map(p => p.userId)).size;
        
        const promedioParticipacionesPorSorteo = totalSorteos > 0 
          ? Math.round(totalParticipaciones / totalSorteos) 
          : 0;
        
        // Sorteos con mayor participación
        const sorteosConMayorParticipacion = sorteos
          .map(s => ({
            sorteoId: s.id,
            titulo: s.titulo,
            participaciones: participaciones.filter(p => p.sorteoId === s.id).length
          }))
          .sort((a, b) => b.participaciones - a.participaciones)
          .slice(0, 5);
        
        return {
          totalSorteos,
          sorteosActivos,
          sorteosFinalizados,
          totalParticipaciones,
          totalParticipantesUnicos,
          promedioParticipacionesPorSorteo,
          sorteosConMayorParticipacion
        };
      }
    }),
    {
      name: 'hiperdelpollo-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        esAdmin: state.esAdmin,
        participaciones: state.participaciones,
        notificaciones: state.notificaciones,
        ganadores: state.ganadores,
        sorteos: state.sorteos
      })
    }
  )
);
