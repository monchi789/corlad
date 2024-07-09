import { Colegiado, defaultColegiado, DetalleColegiado } from "./Colegiado"
import { defaultEspecialidad, Especialidad } from "./Especialidad"

export interface HistorialColegiado {
  id: number
  id_colegiado: Colegiado
  id_especialidad: Especialidad,
  universidad: string,
  denominacion_bachiller: string,
  denominacion_titulo: string,
  titulo_fecha: string
}

export interface HistorialDetalleColegiado {
  id_colegiado: DetalleColegiado,
  id_especialidad: Especialidad
};

export const defaultHistorialDetalleColegiado = {
  id_colegiado: defaultColegiado,
  id_especialidad: defaultEspecialidad
};
