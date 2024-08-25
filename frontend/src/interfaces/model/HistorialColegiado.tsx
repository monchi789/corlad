import { Colegiado, defaultColegiado, defaultDetalleColegiado, DetalleColegiado } from "./Colegiado"
import { defaultEspecialidad, Especialidad } from "./Especialidad"
import { defaultEstadoColegiatura, EstadoColegiatura } from "./EstadoColegiatura"

export interface HistorialColegiado {
  id: number
  id_colegiado: Colegiado
  id_especialidad: Especialidad,
  id_estado_colegiatura: EstadoColegiatura
  universidad: string,
  denominacion_bachiller: string,
  denominacion_titulo: string,
  titulo_fecha: string
  fecha_bachiller: string
}

export const defaultHistorialColegiado: HistorialColegiado = {
  id: 0,
  id_colegiado: defaultColegiado,
  id_especialidad: defaultEspecialidad,
  id_estado_colegiatura: defaultEstadoColegiatura,
  universidad: "",
  denominacion_bachiller: "",
  denominacion_titulo: "",
  titulo_fecha: "",
  fecha_bachiller: ""
}

export interface HistorialDetalleColegiado {
  id_colegiado: DetalleColegiado,
  id_especialidad: Especialidad,
  id_estado_colegiatura: EstadoColegiatura
}

export const defaultHistorialDetalleColegiado = {
  id_colegiado: defaultDetalleColegiado,
  id_especialidad: defaultEspecialidad,
  id_estado_colegiatura: defaultEstadoColegiatura
}
