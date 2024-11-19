import { Colegiado, defaultColegiado } from "./Colegiado"

export interface MetodoPago {
  id: number,
  nombre_metodo_pago: string
}

export const defaultMetodoPago = {
  id: 0,
  nombre_metodo_pago: ""
};

export interface Pago {
  id: number
  fecha_pago: string,
  monto_total?: number,
  numero_operacion: string
  numero_recibo: string
  meses_pagados?: string[],
  observacion: string,
  id_colegiado: Colegiado,
  id_metodo_pago: MetodoPago,
  tarifas: number[]
}

export const defaultPago: Pago = {
  id: 0,
  fecha_pago: "",
  numero_operacion: "",
  observacion: "",
  numero_recibo: "",
  id_colegiado: defaultColegiado,
  id_metodo_pago: defaultMetodoPago,
  tarifas: []
};

export default {defaultPago}
