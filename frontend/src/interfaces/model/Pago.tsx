import { Colegiado } from "./Colegiado"
import { MetodoPago } from "./MetodoPago"
import { TipoPago } from "./TipoPago"

export interface Pago {
  id: number
  fecha_pago: string,
  monto_pago: number,
  numero_operacion: string,
  meses: number,
  observacion: string,
  id_colegiado: Colegiado,
  id_tipo_pago: TipoPago,
  id_metodo_pago: MetodoPago
}