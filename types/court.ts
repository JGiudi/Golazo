export interface Court {
  id: string;
  nombre: string;
  deporte: string;
  direccion: string;
  ciudad: string;
  precio_hora: number;
  fotos?: string;
  techada?: boolean;
  sintetico?: boolean;
  turns_available_today?: number;
  distance?: string;
  image_url?: string;
  active?: number; // 0: inactivo, 1: activo
  hora_apertura?: string; // Ej: "07:00"
  hora_cierre?: string; // Ej: "23:00"
}

export interface TimeSlot {
  id: string;
  cancha_id: string;
  dia: number; // 0-6 (Domingo a Sábado)
  hora_apertura: string;
  hora_cierre: string;
}
