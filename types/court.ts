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
  active?: boolean;
  hora_apertura?: string;
  hora_cierre?: string;
}

export interface TimeSlot {
  id: string;
  cancha_id: string;
  dia: number;
  hora_apertura: string;
  hora_cierre: string;
}
