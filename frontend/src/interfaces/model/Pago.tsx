import { Colegiado, defaultColegiado } from "./Colegiado"
import { defaultTarifa, Tarifa } from "./Tarifa";

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
  id_metodo_pago: MetodoPago,
  id_tarifa: Tarifa
}

export const defaultPago: Pago = {
  id: 0,
  fecha_pago: "",
  monto_pago: 0,
  numero_operacion: "",
  meses: "",
  observacion: "",
  id_colegiado: defaultColegiado,
  id_metodo_pago: defaultMetodoPago,
  id_tarifa: defaultTarifa
};

export default {defaultPago}