export interface Recurso {
  _id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  capacidadMaxima: number;
  entradasDisponibles: number;
  participantes?: Array<{
    _id?: string;
    nombre: string;
    email: string;
  }>;
}

export interface RecursoFormulario {
  nombre: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  capacidadMaxima: number;
  entradasDisponibles: number;
}

export interface Recurso {
  _id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  capacidadMaxima: number;
  entradasDisponibles: number;
  imagen?: string; // imagen miniatura del evento
}