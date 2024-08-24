import { Colegiado, defaultColegiado } from "./Colegiado"

export interface TipoPago {
  id: number,
  nombre_tipo_pago: string
}

export const defaultTipoPago = {
  id: 0,
  nombre_tipo_pago: ""
};

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
  monto_pago: number,
  numero_operacion: string,
  meses: string,
  observacion: string,
  id_colegiado: Colegiado,
  id_tipo_pago: TipoPago,
  id_metodo_pago: MetodoPago
}

export const defaultPago: Pago = {
  id: 0,
  fecha_pago: "",
  monto_pago: 0,
  numero_operacion: "",
  meses: "",
  observacion: "",
  id_colegiado: defaultColegiado,
  id_tipo_pago: defaultTipoPago,
  id_metodo_pago: defaultMetodoPago
};

export default {defaultPago}