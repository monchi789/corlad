export interface Colegiado {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  celular: string;
  correo: string;
  estado_activo: boolean;
  foto_colegiado?: File | string | null; // Mantener como string para los datos
  dni_colegiado: string;
  numero_colegiatura: string;
  numero_colegiatura_anterior?: string;
  fecha_colegiatura: string;
  sexo_colegiado: string;
  fecha_nacimiento: string;
  estado_civil: string;
  direccion: string;
}

export const defaultColegiado: Colegiado = {
  id: 0,
  nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  celular: "",
  correo: "",
  estado_activo: false,
  foto_colegiado: null,
  dni_colegiado: "",
  numero_colegiatura: "",
  numero_colegiatura_anterior: "",
  fecha_colegiatura: "",
  sexo_colegiado: "",
  fecha_nacimiento: "",
  estado_civil: "",
  direccion: ""
};

export interface DetalleColegiado {
  id: number,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  correo: string,
  estado: boolean,
  foto_colegiado: string,
  numero_colegiatura: string
}

export const defaultDetalleColegiado: DetalleColegiado = {
  id: 0,
  nombre:"",
  apellido_paterno: "",
  apellido_materno: "",
  correo: "",
  estado: false,
  foto_colegiado: "",
  numero_colegiatura: ""
}
