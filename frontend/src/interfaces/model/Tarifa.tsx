export interface Tarifa {
  id: number
  nombre_tarifa: string,
  descripcion_tarifa: string,
  precio_tarifa: number | string,
  es_mensualidad: boolean
}

export const defaultTarifa: Tarifa = {
  id: 0,
  nombre_tarifa: "",
  descripcion_tarifa: "",
  precio_tarifa: '',
  es_mensualidad: false
}