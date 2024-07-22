import { defaultEscuela, Escuela } from "./Escuela";

export interface Especialidad {
  id: number,
  id_escuela: Escuela,
  nombre_especialidad: string
  nombre_escuela: string
}

export const defaultEspecialidad = {
  id: 0,
  id_escuela: defaultEscuela,
  nombre_especialidad: "",
  nombre_escuela: ""
}
