export interface Tarifa {
  id: number
  nombre_tarifa: string,
  precio_tarifa: number,
}

export const defaultTarifa: Tarifa = {
  id: 0,
  nombre_tarifa: "",
  precio_tarifa: 0
}