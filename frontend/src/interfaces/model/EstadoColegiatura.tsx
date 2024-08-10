export interface EstadoColegiatura {
  id_estado_colegiatura: number,
  fecha_inicio_colegiatura: string,
  fecha_final_colegiatura: string,
  estado_colegiatura: boolean
}

export const defaultEstadoColegiatura = {
  id_estado_colegiatura: 0,
  fecha_inicio_colegiatura: "",
  fecha_final_colegiatura: "",
  estado_colegiatura: false
}